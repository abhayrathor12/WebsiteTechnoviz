import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Award, Check, Lock, X } from "lucide-react";

import { portalApi } from "../api";
import type { EvaluationResult, OpenEvaluation, OptionKey } from "../api";
import { EVALUATIONS, PORTAL_BASE, evaluationTitle } from "../constants";
import { useProgress } from "../ProgressContext";
import { useDialog } from "../DialogContext";

const KEYS: OptionKey[] = ["A", "B", "C", "D"];

function percent(score: number, total: number) {
  return total ? Math.round((score / total) * 100) : 0;
}

// ─── Result view ─────────────────────────────────────────

function ResultView({ result }: { result: EvaluationResult }) {
  const index = EVALUATIONS.findIndex((e) => e.slug === result.evaluation.slug);
  const next = EVALUATIONS[index + 1];
  const wrong = result.total - result.score;

  return (
    <>
      <div className="mp-card mp-score">
        <div className="mp-score-ring" aria-hidden>
          <strong>{percent(result.score, result.total)}%</strong>
        </div>
        <div className="mp-score-text">
          <h2>
            Your marks: {result.score} / {result.total}
          </h2>
          <p>
            {result.score} correct · {wrong} wrong · submitted on{" "}
            {new Date(result.submitted_at).toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
          {next ? (
            <Link
              to={`${PORTAL_BASE}/evaluation/${next.slug}`}
              className="mp-btn mp-btn--primary mp-btn--inline"
            >
              Go to {next.title}
            </Link>
          ) : (
            <Link to={`${PORTAL_BASE}/certificate`} className="mp-btn mp-btn--primary mp-btn--inline">
              <Award size={17} /> Get your certificate
            </Link>
          )}
        </div>
      </div>

      <h2 className="mp-section-title">Your answers</h2>
      <ol className="mp-qlist">
        {result.questions.map((q, i) => (
          <li key={q.id} className={`mp-card mp-answer${q.is_correct ? " is-right" : " is-wrong"}`}>
            <div className="mp-qitem-head">
              <span className="mp-qnum">Q{i + 1}</span>
              <p className="mp-qtext">{q.text}</p>
              <span className={`mp-verdict${q.is_correct ? " is-right" : " is-wrong"}`}>
                {q.is_correct ? <Check size={15} /> : <X size={15} />}
                {q.is_correct ? "Correct" : "Wrong"}
              </span>
            </div>
            <ul className="mp-qoptions">
              {KEYS.map((key) => {
                const isCorrect = key === q.correct;
                const isPicked = key === q.selected;
                const cls = isCorrect ? "is-correct" : isPicked ? "is-picked-wrong" : undefined;
                return (
                  <li key={key} className={cls}>
                    <span className="mp-opt-key">{key}</span>
                    <span>{q.options[key]}</span>
                    {isPicked && <span className="mp-your-tag">Your answer</span>}
                    {isCorrect && !isPicked && <span className="mp-your-tag">Correct answer</span>}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
    </>
  );
}

// ─── Page ────────────────────────────────────────────────

export default function EvaluationPage() {
  const { slug = "" } = useParams();
  const { refresh } = useProgress();
  const dialog = useDialog();

  const [data, setData] = useState<OpenEvaluation | EvaluationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<{ message: string; locked: boolean } | null>(null);
  const [answers, setAnswers] = useState<Record<number, OptionKey>>({});
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    setAnswers({});
    const { data: res, error, status } = await portalApi.evaluation(slug);
    if (res) setData(res);
    else {
      setData(null);
      setLoadError({ message: error || "Could not load the evaluation.", locked: status === 403 });
    }
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSubmit() {
    if (!data || data.status !== "open") return;
    const missing = data.questions.length - Object.keys(answers).length;
    if (missing > 0) {
      dialog.alert({
        title: "Some questions are not answered",
        message: `You still have ${missing} question${missing === 1 ? "" : "s"} to answer. Please answer all questions before submitting.`,
        tone: "warn",
      });
      return;
    }
    const ok = await dialog.confirm({
      title: "Submit your answers?",
      message: "You can submit this evaluation only once. You will not be able to change your answers after this.",
      tone: "warn",
      confirmText: "Yes, submit",
      cancelText: "Review answers",
    });
    if (!ok) return;

    setSubmitting(true);
    const { data: result, error } = await portalApi.submitEvaluation(slug, answers);
    setSubmitting(false);
    if (!result) {
      dialog.alert({
        title: "Could not submit",
        message: error || "Something went wrong. Please try again.",
        tone: "warn",
      });
      // Already submitted elsewhere (other tab): show the saved result
      if (error?.includes("already submitted")) load();
      return;
    }
    setData(result);
    refresh(); // unlocks the next evaluation in the sidebar
    window.scrollTo({ top: 0, behavior: "smooth" });

    const isLast = EVALUATIONS[EVALUATIONS.length - 1].slug === result.evaluation.slug;
    dialog.alert({
      title: "Evaluation submitted",
      message:
        `You scored ${result.score} out of ${result.total}. ` +
        (isLast
          ? "You have completed all evaluations. Your certificate is now unlocked!"
          : "The next evaluation is now unlocked. Scroll down to see your answers."),
      tone: "success",
    });
  }

  const title = data?.evaluation.title ?? evaluationTitle(slug);

  return (
    <div className="mp-page">
      <header className="mp-page-head">
        <p className="mp-eyebrow">{data?.status === "done" ? "Result" : "Evaluation"}</p>
        <h1>{title}</h1>
        {data?.status === "open" && data.questions.length > 0 && (
          <p>
            {data.questions.length} question{data.questions.length === 1 ? "" : "s"} · choose one
            answer for each · you can submit only once
          </p>
        )}
      </header>

      {loading ? (
        <div className="mp-center mp-center--short">
          <div className="mp-spinner" aria-label="Loading" />
        </div>
      ) : loadError ? (
        <div className="mp-card mp-empty">
          {loadError.locked && <Lock size={32} className="mp-empty-icon" />}
          <h2>{loadError.locked ? "This evaluation is locked" : "Something went wrong"}</h2>
          <p>{loadError.message}</p>
          {loadError.locked ? (
            <Link to={`${PORTAL_BASE}/dashboard`} className="mp-btn mp-btn--primary mp-btn--inline">
              Back to My Results
            </Link>
          ) : (
            <button className="mp-btn mp-btn--primary mp-btn--inline" onClick={load}>
              Try again
            </button>
          )}
        </div>
      ) : data?.status === "done" ? (
        <ResultView result={data} />
      ) : data && data.questions.length === 0 ? (
        <div className="mp-card mp-empty">
          <h2>No questions yet</h2>
          <p>This evaluation is not ready yet. Please check back later.</p>
        </div>
      ) : data ? (
        <>
          <ol className="mp-qlist">
            {data.questions.map((q, i) => (
              <li key={q.id} className="mp-card">
                <div className="mp-qitem-head">
                  <span className="mp-qnum">Q{i + 1}</span>
                  <p className="mp-qtext">{q.text}</p>
                </div>
                <div className="mp-choices" role="radiogroup" aria-label={`Question ${i + 1}`}>
                  {KEYS.map((key) => (
                    <label
                      key={key}
                      className={`mp-choice${answers[q.id] === key ? " is-selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        checked={answers[q.id] === key}
                        onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: key }))}
                        disabled={submitting}
                      />
                      <span className="mp-opt-key">{key}</span>
                      <span>{q.options[key]}</span>
                    </label>
                  ))}
                </div>
              </li>
            ))}
          </ol>

          <div className="mp-submitbar">
            <span>
              Answered <strong>{Object.keys(answers).length}</strong> of {data.questions.length}
            </span>
            <button
              className="mp-btn mp-btn--primary mp-btn--inline"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Answers"}
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
