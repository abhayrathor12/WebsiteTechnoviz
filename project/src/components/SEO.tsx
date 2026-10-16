import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

import { DEFAULT_IMAGE, SITE_NAME, SITE_URL } from "../seo/pages.js";

export { SITE_URL, fitDescription, withBrand } from "../seo/pages.js";

interface SEOProps {
  title: string;
  description: string;
  /** Defaults to the current URL path */
  path?: string;
  image?: string;
  type?: "website" | "article";
  /** Keep this page out of Google (dashboards, error pages) */
  noindex?: boolean;
  /** Extra tags, e.g. structured data */
  children?: React.ReactNode;
}

const absolute = (url: string) => (url.startsWith("http") ? url : `${SITE_URL}${url}`);

/**
 * Sets the title, description, canonical URL and social share tags for a page.
 * Every page should render one of these.
 */
const SEO: React.FC<SEOProps> = ({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  children,
}) => {
  const { pathname } = useLocation();
  const url = `${SITE_URL}${path ?? pathname}`;
  const imageUrl = absolute(image);

  // index.html carries homepage tags for crawlers that don't run JavaScript.
  // Once React is running, remove them so they don't duplicate this page's tags.
  useEffect(() => {
    document.querySelectorAll("[data-default-seo]").forEach((el) => el.remove());
  }, []);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {children}
    </Helmet>
  );
};

export default SEO;
