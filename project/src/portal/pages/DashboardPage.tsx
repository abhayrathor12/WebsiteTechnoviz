import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Award, CheckCircle2, Lock, PlayCircle } from "lucide-react";

import { useAuth } from "../AuthContext";
import { PORTAL_BASE } from "../constants";
import { useDialog } from "../DialogContext";
import { useProgress } from "../ProgressContext";

// "My Results": status and marks of every evaluation
export default function DashboardPage() {
  const { user } = useAuth();
  const { progress, loading, error, refresh } = useProgress();
  const dialog = useDialog();

  useEffect(() => {
    if (error && !progress) {
      dialog.alert({ title: "Could not load your results", message: error, tone: "warn" });
    }
  }, [error, progress, dialog]);

  const items = progress?.evaluations ?? [];
  const done = items.filter((e) => e.status === "done");
  const totalScore = done.reduce((sum, e) => sum + (e.score ?? 0), 0);
  const totalMax = done.reduce((sum, e) => sum + (e.total ?? 0), 0);

  return (
    <div className="mp-page">
      <header className="mp-page-head">
        <p className="mp-eyebrow">My Results</p>
        <h1>Welcome, {user?.name}</h1>
        <p>Complete the evaluations in order. Each one unlocks after you submit the previous one.</p>
      </header>

      {loading ? (
        <div className="mp-center mp-center--short">
          <div className="mp-spinner" aria-label="Loading" />
        </div>
      ) : error && !progress ? (
        <div className="mp-card mp-empty">
          <h2>Could not load your results</h2>
          <button className="mp-btn mp-btn--primary mp-btn--inline" onClick={refresh}>
            Try again
          </button>
        </div>
      ) : (
        <>
          <div className="mp-stats">
            <div className="mp-stat">
              <span>Completed</span>
              <strong>
                {done.length} / {items.length}
              </strong>
            </div>
            <div className="mp-stat">
              <span>Total marks</span>
              <strong>
                {totalScore} / {totalMax}
              </strong>
            </div>
            <div className="mp-stat">
              <span>Certificate</span>
              <strong>{progress?.all_done ? "Unlocked" : "Locked"}</strong>
            </div>
          </div>

          {progress?.all_done && (
            <div className="mp-card mp-card--accent mp-cta-card">
              <Award size={28} />
              <div>
                <h2>All evaluations completed!</h2>
                <p>Download your certificate and the LinkedIn guide.</p>
              </div>
              <Link to={`${PORTAL_BASE}/certificate`} className="mp-btn mp-btn--primary mp-btn--inline">
                Go to Certificate
              </Link>
            </div>
          )}

          <ul className="mp-results">
            {items.map((ev) => (
              <li key={ev.slug} className={`mp-result-row is-${ev.status}`}>
                <span className="mp-result-icon" aria-hidden>
                  {ev.status === "done" ? (
                    <CheckCircle2 size={20} />
                  ) : ev.status === "open" ? (
                    <PlayCircle size={20} />
                  ) : (
                    <Lock size={18} />
                  )}
                </span>
                <span className="mp-result-title">{ev.title}</span>
                <span className="mp-result-marks">
                  {ev.status === "done" ? (
                    <>
                      <strong>
                        {ev.score} / {ev.total}
                      </strong>{" "}
                      marks
                    </>
                  ) : ev.status === "open" ? (
                    "Not attempted"
                  ) : (
                    "Locked"
                  )}
                </span>
                <span className="mp-result-action">
                  {ev.status === "done" ? (
                    <Link to={`${PORTAL_BASE}/evaluation/${ev.slug}`} className="mp-link">
                      View answers
                    </Link>
                  ) : ev.status === "open" ? (
                    <Link
                      to={`${PORTAL_BASE}/evaluation/${ev.slug}`}
                      className="mp-btn mp-btn--primary mp-btn--small"
                    >
                      Start
                    </Link>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
