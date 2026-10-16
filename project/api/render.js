// Server-side renderer for every page of the site (see the rewrite in vercel.json).
//
// The site is a React app, so the plain HTML file is an empty shell. This function
// fills that shell before it leaves the server:
//   - the right <title>, description, canonical and share-preview tags for the page,
//     so Google, LinkedIn and WhatsApp see them without running JavaScript
//   - the full text of blog posts, and the list of posts on /blogs
//   - a real 404 status for pages that don't exist
// React then starts in the browser and takes over the page exactly as before.

import {
  BLOG_API_URL,
  DEFAULT_IMAGE,
  LOCAL_BLOG_SEO,
  PAGE_SEO,
  PRODUCT_SEO,
  SERVICE_SEO,
  SITE_NAME,
  SITE_URL,
  withBrand,
} from "../src/seo/pages.js";

const API_TIMEOUT_MS = 5000;

const NOT_FOUND = {
  title: `Page Not Found | ${SITE_NAME}`,
  description: "The page you are looking for could not be found.",
  noindex: true,
};

// Canonical page paths, looked up case-insensitively (React Router ignores case too)
const PAGE_PATHS = new Map(Object.keys(PAGE_SEO).map((path) => [path.toLowerCase(), path]));

let cachedTemplate = null;

async function getTemplate(origin) {
  if (cachedTemplate) return cachedTemplate;
  // index.html is a static file, so Vercel serves it directly and doesn't loop back here
  const res = await fetch(`${origin}/index.html`);
  if (!res.ok) throw new Error(`Could not load index.html (${res.status})`);
  cachedTemplate = await res.text();
  return cachedTemplate;
}

async function fetchJson(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(API_TIMEOUT_MS) });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  return res.json();
}

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const absoluteUrl = (url) => (!url ? DEFAULT_IMAGE : url.startsWith("http") ? url : `${SITE_URL}${url}`);

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

// Blog bodies use simple Markdown: "## " headings, "- " bullet lists and **bold**
function bodyToHtml(body = "") {
  const inline = (text) => escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const html = [];
  let inList = false;
  for (const raw of body.split("\n")) {
    const line = raw.trim();
    const isItem = line.startsWith("- ");
    if (inList && !isItem) {
      html.push("</ul>");
      inList = false;
    }
    if (!line) continue;
    if (line.startsWith("### ")) html.push(`<h3>${inline(line.slice(4))}</h3>`);
    else if (line.startsWith("## ")) html.push(`<h2>${inline(line.slice(3))}</h2>`);
    else if (line.startsWith("# ")) html.push(`<h2>${inline(line.slice(2))}</h2>`);
    else if (isItem) {
      if (!inList) html.push("<ul>");
      inList = true;
      html.push(`<li>${inline(line.slice(2))}</li>`);
    } else html.push(`<p>${inline(line)}</p>`);
  }
  if (inList) html.push("</ul>");
  return html.join("\n");
}

const sortNewestFirst = (posts) =>
  [...posts].sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));

// Works out what this URL is and what to put in its HTML
async function resolvePage(path) {
  const pagePath = PAGE_PATHS.get(path.toLowerCase());

  if (pagePath === "/blogs") {
    const page = { ...PAGE_SEO[pagePath], path: pagePath };
    try {
      const apiPosts = (await fetchJson(`${BLOG_API_URL}/`)) || [];
      const localPosts = Object.entries(LOCAL_BLOG_SEO).map(([slug, post]) => ({
        slug,
        title: post.title,
        excerpt: post.description,
        publish_date: post.date,
      }));
      page.posts = sortNewestFirst([...apiPosts, ...localPosts]);
    } catch (err) {
      console.error("Blog list unavailable:", err.message);
      page.cacheSeconds = 60;
    }
    return page;
  }

  if (pagePath) return { ...PAGE_SEO[pagePath], path: pagePath };

  const [, section, slug, extra] = path.split("/");
  if (!slug || extra !== undefined) return null;

  if (section === "services" && SERVICE_SEO[slug]) return { ...SERVICE_SEO[slug], path };
  if (section === "products" && PRODUCT_SEO[slug]) return { ...PRODUCT_SEO[slug], path };

  if (section === "blogs") {
    const local = LOCAL_BLOG_SEO[slug];
    if (local) return { title: local.seoTitle, description: local.description, path, type: "article" };

    try {
      const post = await fetchJson(`${BLOG_API_URL}/${encodeURIComponent(slug)}/`);
      if (!post) return null;
      return {
        title: withBrand(post.seo_meta_title || post.title),
        description: post.seo_description || post.excerpt,
        path: `/blogs/${post.slug}`,
        image: post.featured_image,
        type: "article",
        post,
      };
    } catch (err) {
      // Backend slow or down: serve the normal page rather than a false 404
      console.error(`Blog "${slug}" unavailable:`, err.message);
      return { ...PAGE_SEO["/blogs"], path, cacheSeconds: 60 };
    }
  }

  return null;
}

function headTags(page) {
  const url = `${SITE_URL}${page.path}`;
  const image = absoluteUrl(page.image);
  const type = page.type || "website";
  // data-default-seo: the React app removes these once it has added its own copies
  const tags = [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta data-default-seo name="description" content="${escapeHtml(page.description)}" />`,
    `<link data-default-seo rel="canonical" href="${escapeHtml(url)}" />`,
    page.noindex ? `<meta data-default-seo name="robots" content="noindex, follow" />` : "",
    `<meta data-default-seo property="og:type" content="${type}" />`,
    `<meta data-default-seo property="og:site_name" content="${SITE_NAME}" />`,
    `<meta data-default-seo property="og:url" content="${escapeHtml(url)}" />`,
    `<meta data-default-seo property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta data-default-seo property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta data-default-seo property="og:image" content="${escapeHtml(image)}" />`,
    `<meta data-default-seo name="twitter:card" content="summary_large_image" />`,
    `<meta data-default-seo name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta data-default-seo name="twitter:description" content="${escapeHtml(page.description)}" />`,
    `<meta data-default-seo name="twitter:image" content="${escapeHtml(image)}" />`,
  ];

  if (page.post) {
    const post = page.post;
    tags.push(`<meta data-default-seo property="article:published_time" content="${escapeHtml(post.publish_date)}" />`);
    const data = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: page.description,
      image,
      author: { "@type": "Organization", name: post.author, url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
      },
      datePublished: post.publish_date,
      keywords: (post.tags || []).join(", "),
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
    };
    // "<" escaped so text inside the JSON can never close the script tag
    tags.push(
      `<script data-default-seo type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`
    );
  }

  return tags.filter(Boolean).join("\n    ");
}

// Readable content shown until React loads; React replaces it on start-up
function bodyContent(page) {
  if (page.post) {
    const post = page.post;
    return `<article class="ssr">
  <p class="ssr-meta">${escapeHtml(formatDate(post.publish_date))} · ${escapeHtml(post.author)}</p>
  <h1>${escapeHtml(post.title)}</h1>
  <p class="ssr-lead">${escapeHtml(post.excerpt)}</p>
  ${post.featured_image ? `<img src="${escapeHtml(post.featured_image)}" alt="${escapeHtml(post.title)}" width="1200" height="630" />` : ""}
  ${bodyToHtml(post.body)}
  <p><a href="/blogs">More articles from ${SITE_NAME}</a></p>
</article>`;
  }

  if (page.posts) {
    const items = page.posts
      .map(
        (p) =>
          `<li><a href="/blogs/${escapeHtml(p.slug)}">${escapeHtml(p.title)}</a><p>${escapeHtml(p.excerpt)}</p></li>`
      )
      .join("\n    ");
    return `<section class="ssr">
  <h1>Industry 4.0 &amp; Smart Manufacturing Blog</h1>
  <ul>
    ${items}
  </ul>
</section>`;
  }

  return "";
}

const SSR_STYLE = `<style data-default-seo>
      .ssr{max-width:760px;margin:0 auto;padding:96px 20px 48px;font-family:Inter,system-ui,sans-serif;color:#1f2937;line-height:1.7}
      .ssr h1{color:#203f78;font-size:2.25rem;line-height:1.2;margin:0 0 16px}
      .ssr h2{color:#203f78;margin:32px 0 8px}
      .ssr img{width:100%;height:auto;border-radius:12px;margin:16px 0}
      .ssr a{color:#203f78}
      .ssr-meta{color:#6b7280;font-size:.9rem}
      .ssr-lead{font-size:1.15rem;color:#4b5563}
    </style>`;

function renderHtml(template, page) {
  // Drop the homepage defaults from index.html and put this page's tags in their place
  let html = template
    .replace(/<title>[\s\S]*?<\/title>\s*/, "")
    .replace(/<meta data-default-seo[^>]*>\s*/g, "")
    .replace("</head>", `    ${headTags(page)}\n  </head>`);

  const content = bodyContent(page);
  if (content) {
    html = html
      .replace("</head>", `    ${SSR_STYLE}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${content}</div>`);
  }
  return html;
}

export default async function handler(req, res) {
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const protocol = /^(localhost|127\.0\.0\.1)(:|$)/.test(host) ? "http" : "https";
  const origin = `${protocol}://${host}`;
  const requested = new URL(req.url, origin).searchParams.get("path") || "";
  const path = ("/" + requested).replace(/\/{2,}/g, "/").replace(/(.)\/$/, "$1");

  let template;
  try {
    template = await getTemplate(origin);
  } catch (err) {
    console.error(err);
    res.statusCode = 502;
    res.end("Temporarily unavailable");
    return;
  }

  let page;
  try {
    page = await resolvePage(path);
  } catch (err) {
    console.error(`Could not render ${path}:`, err);
    page = { ...PAGE_SEO["/"], path: "/", cacheSeconds: 60 };
  }

  const found = Boolean(page);
  if (!found) page = { ...NOT_FOUND, path };

  res.statusCode = found ? 200 : 404;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // Cached at Vercel's edge, so most visitors never wait for this function or the blog API
  const seconds = page.cacheSeconds || (found ? 600 : 60);
  res.setHeader("Cache-Control", `public, max-age=0, s-maxage=${seconds}, stale-while-revalidate=86400`);
  res.end(renderHtml(template, page));
}
