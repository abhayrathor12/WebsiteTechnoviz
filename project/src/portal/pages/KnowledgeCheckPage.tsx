import { useCallback, useEffect, useState } from "react";
import { Check, CheckCircle2 } from "lucide-react";

import { portalApi } from "../api";
import type { KnowledgeAnswers, KnowledgeCheckData, KnowledgeQuestion } from "../api";
import { useProgress } from "../ProgressContext";
import { useDialog } from "../DialogContext";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Mirrors the backend checks so the user sees problems before saving. */
function firstProblem(questions: KnowledgeQuestion[], answers: KnowledgeAnswers): string | null {
  for (const [i, q] of questions.entries()) {
    const value = answers[q.key];
    if (q.type === "single" && !value) return `Please answer question ${i + 1}.`;
    if (q.type === "multi" && !(Array.isArray(value) && value.length))
      return `Please select at least one option in question ${i + 1}.`;
    if (q.type === "text" && q.required !== false && !String(value ?? "").trim())
      return `Please answer question ${i + 1}.`;
    if (q.other && value === q.other.when && !String(answers[q.other.key] ?? "").trim())
      return `Question ${i + 1}: ${q.other.label.toLowerCase()}.`;
  }
  return null;
}

/** "Knowledge Check" tab: Pre-Masterclass Questions. The tab is always open; the answers can be
 * submitted once and are shown read-only afterwards. */
export default function KnowledgeCheckPage() {
  const { refresh } = useProgress();
  const dialog = useDialog();

  const [data, setData] = useState<KnowledgeCheckData | null>(null);
  const [answers, setAnswers] = useState<KnowledgeAnswers>({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    const { data: res, error } = await portalApi.knowledgeCheck();
    if (res) {
      setData(res);
      setAnswers(res.answers ?? {});
    } else setLoadError(error || "Could not load the questions.");
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const setAnswer = (key: string, value: string | string[]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const toggleMulti = (key: string, option: string) =>
    setAnswers((prev) => {
      const current = Array.isArray(prev[key]) ? (prev[key] as string[]) : [];
      const next = current.includes(option) ? current.filter((o) => o !== option) : [...current, option];
      return { ...prev, [key]: next };
    });

  async function handleSave() {
    if (!data) return;
    const problem = firstProblem(data.questions, answers);
    if (problem) {
      dialog.alert({ title: "Please complete the form", message: problem, tone: "warn" });
      return;
    }
    const ok = await dialog.confirm({
      title: "Submit your answers?",
      message: "You can submit these answers only once. You will not be able to change them after this.",
      tone: "warn",
      confirmText: "Yes, submit",
      cancelText: "Review answers",
    });
    if (!ok) return;

    setSaving(true);
    const { data: res, error, status } = await portalApi.saveKnowledgeCheck(answers);
    setSaving(false);
    if (!res) {
      dialog.alert({
        title: "Could not submit",
        message: error || "Something went wrong. Please try again.",
        tone: "warn",
      });
      if (status === 409) load(); // already submitted (e.g. in another tab): show the saved answers
      return;
    }
    setData(res);
    setAnswers(res.answers ?? {});
    refresh(); // tick in the sidebar
    window.scrollTo({ top: 0, behavior: "smooth" });
    dialog.alert({
      title: "Thank you!",
      message: "Your answers are submitted. They help us make the session more relevant for you.",
      tone: "success",
    });
  }

  // Submitted once -> read-only
  const locked = Boolean(data?.submitted_at);

  const answeredCount = data
    ? data.questions.filter((q) => {
        const v = answers[q.key];
        return Array.isArray(v) ? v.length > 0 : Boolean(String(v ?? "").trim());
      }).length
    : 0;

  return (
    <div className="mp-page">
      <header className="mp-page-head">
        <p className="mp-eyebrow">Knowledge Check</p>
        <h1>Pre-Masterclass Questions</h1>
        <p>
          Tell us a little about your background and interests, so we can make the session more
          relevant, practical and interactive for you. There are no right or wrong answers.
        </p>
      </header>

      {loading ? (
        <div className="mp-center mp-center--short">
          <div className="mp-spinner" aria-label="Loading" />
        </div>
      ) : loadError || !data ? (
        <div className="mp-card mp-empty">
          <h2>Something went wrong</h2>
          <p>{loadError}</p>
          <button className="mp-btn mp-btn--primary mp-btn--inline" onClick={load}>
            Try again
          </button>
        </div>
      ) : (
        <>
          {data.submitted_at && (
            <div className="mp-alert mp-alert--success mp-kc-saved">
              <CheckCircle2 size={18} />
              <span>
                Submitted on {formatDate(data.submitted_at)}. Thank you! Your answers are saved below and
                can no longer be changed.
              </span>
            </div>
          )}

          <ol className="mp-qlist">
            {data.questions.map((q, i) => {
              const value = answers[q.key];
              const extra = q.other ?? q.detail;
              const showExtra =
                (q.other && value === q.other.when) ||
                (q.detail && typeof value === "string" && value !== "" && value !== q.detail.unless);
              return (
                <li key={q.key} className="mp-card">
                  <div className="mp-qitem-head">
                    <span className="mp-qnum">Q{i + 1}</span>
                    <p className="mp-qtext">
                      {q.text}
                      {q.type === "text" && q.required === false && (
                        <span className="mp-kc-optional"> (optional)</span>
                      )}
                    </p>
                  </div>
                  {q.hint && <p className="mp-kc-hint">{q.hint}</p>}

                  {q.type === "text" ? (
                    <label className="mp-field mp-kc-text">
                      <textarea
                        rows={3}
                        maxLength={1000}
                        value={String(value ?? "")}
                        onChange={(e) => setAnswer(q.key, e.target.value)}
                        placeholder={locked ? "No answer" : "Type your answer..."}
                        readOnly={locked}
                        disabled={saving}
                        aria-label={`Question ${i + 1}`}
                      />
                    </label>
                  ) : (
                    <div
                      className="mp-choices mp-kc-choices"
                      role={q.type === "single" ? "radiogroup" : "group"}
                      aria-label={`Question ${i + 1}`}
                    >
                      {(q.options ?? []).map((option) => {
                        const selected =
                          q.type === "multi"
                            ? Array.isArray(value) && value.includes(option)
                            : value === option;
                        return (
                          <label
                            key={option}
                            className={`mp-choice${selected ? " is-selected" : ""}${locked ? " is-locked" : ""}`}
                          >
                            <input
                              type={q.type === "multi" ? "checkbox" : "radio"}
                              name={`kc-${q.key}`}
                              checked={selected}
                              onChange={() =>
                                q.type === "multi" ? toggleMulti(q.key, option) : setAnswer(q.key, option)
                              }
                              disabled={saving || locked}
                            />
                            <span
                              className={`mp-kc-mark${q.type === "multi" ? " is-box" : ""}`}
                              aria-hidden
                            >
                              {selected && <Check size={13} strokeWidth={3} />}
                            </span>
                            <span>{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {extra && showExtra && (
                    <label className="mp-field mp-kc-text">
                      <span>
                        {extra.label}
                        {q.detail && <span className="mp-kc-optional"> (optional)</span>}
                      </span>
                      <input
                        type="text"
                        maxLength={1000}
                        value={String(answers[extra.key] ?? "")}
                        onChange={(e) => setAnswer(extra.key, e.target.value)}
                        readOnly={locked}
                        disabled={saving}
                      />
                    </label>
                  )}
                </li>
              );
            })}
          </ol>

          <div className="mp-card mp-kc-closing">
            <p>
              Your inputs will help us make the session more relevant, practical and interactive.
              {data.masterclass_when ? (
                <>
                  {" "}We look forward to having you with us on <strong>{data.masterclass_when}</strong>.
                </>
              ) : (
                " We look forward to having you with us at the Masterclass."
              )}
            </p>
            <p className="mp-kc-sign">
              Regards,
              <br />
              <strong>Kapil Khurana</strong>
              <br />
              Certified SIRI Assessor (CSA)
              <br />
              Author – Digital Revolution: Industry 4.0 &amp; IIoT
              <br />
              25+ Years of Industry Experience
              <br />
              Technoviz Automation Solutions Pvt. Ltd.
              <br />
              <a href="tel:+919999765380">+91-9999765380</a>
            </p>
          </div>

          {!locked && (
          <div className="mp-submitbar">
            <span>
              Answered <strong>{answeredCount}</strong> of {data.questions.length}
            </span>
            <button
              className="mp-btn mp-btn--primary mp-btn--inline"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Submitting..." : "Submit Answers"}
            </button>
          </div>
          )}
        </>
      )}
    </div>
  );
}
