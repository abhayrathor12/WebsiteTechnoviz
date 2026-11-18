// The evaluations, in unlock order. Slugs match the backend (portal/migrations/0005:
// only the Pre Assessment is left).
export const EVALUATIONS = [
  { slug: "pre-session", title: "Pre Assessment", short: "Pre Assessment" },
] as const;

export const PORTAL_BASE = "/masterportal";

/** Welcome video shown in the "Welcome" tab (just before Post Session).
 *  Paste a YouTube link here (watch / youtu.be / embed links all work).
 *  Empty = a "video coming soon" placeholder is shown. */
export const WELCOME_VIDEO_URL = "";

/** Turns a YouTube link into an embeddable URL; other links are used as-is. */
export function welcomeEmbedUrl(url: string): string {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  return m ? `https://www.youtube-nocookie.com/embed/${m[1]}?rel=0` : url;
}

export function evaluationTitle(slug: string | undefined): string {
  return EVALUATIONS.find((e) => e.slug === slug)?.title ?? "Evaluation";
}
