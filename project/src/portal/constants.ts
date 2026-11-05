// The 7 evaluations, in unlock order. Slugs match the backend (portal/migrations/0002).
export const EVALUATIONS = [
  { slug: "pre-session", title: "Pre Session Evaluation", short: "Pre Session" },
  { slug: "session-1", title: "Session 1 Evaluation", short: "Session 1" },
  { slug: "session-2", title: "Session 2 Evaluation", short: "Session 2" },
  { slug: "session-3", title: "Session 3 Evaluation", short: "Session 3" },
  { slug: "session-4", title: "Session 4 Evaluation", short: "Session 4" },
  { slug: "session-5", title: "Session 5 Evaluation", short: "Session 5" },
  { slug: "post-session", title: "Post Session Evaluation", short: "Post Session" },
] as const;

export const PORTAL_BASE = "/masterportal";

export function evaluationTitle(slug: string | undefined): string {
  return EVALUATIONS.find((e) => e.slug === slug)?.title ?? "Evaluation";
}
