// The evaluations, in unlock order. Slugs match the backend (portal/migrations/0005:
// only the Pre Assessment is left).
export const EVALUATIONS = [
  { slug: "pre-session", title: "Pre Assessment", short: "Pre Assessment" },
] as const;

export const PORTAL_BASE = "/masterportal";

/** Welcome video shown in the "Welcome" tab (just before Post Session).
 *  Paste a YouTube or Google Drive share link here (the Drive file must be shared as
 *  "Anyone with the link"). Empty = a "video coming soon" placeholder is shown. */
export const WELCOME_VIDEO_URL =
  "https://drive.google.com/file/d/1PROE8AMepRqinvT6vE7qgBGmMrzVkXsp/view?usp=sharing";

/** Turns a YouTube / Google Drive link into an embeddable URL; other links are used as-is. */
export function welcomeEmbedUrl(url: string): string {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0`;
  const drive = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/);
  if (drive) return `https://drive.google.com/file/d/${drive[1]}/preview`;
  return url;
}

export function evaluationTitle(slug: string | undefined): string {
  return EVALUATIONS.find((e) => e.slug === slug)?.title ?? "Evaluation";
}
