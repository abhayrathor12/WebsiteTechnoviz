import { useCallback, useEffect, useId, useState } from "react";
import type { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { Check, Pencil, Plus, Trash2 } from "lucide-react";

import { portalApi } from "../../api";
import type { AdminQuestion, OptionKey, QuestionInput } from "../../api";
import { evaluationTitle } from "../../constants";
import { useDialog } from "../../DialogContext";

const OPTIONS: { key: OptionKey; field: "option_a" | "option_b" | "option_c" | "option_d" }[] = [
  { key: "A", field: "option_a" },
  { key: "B", field: "option_b" },
  { key: "C", field: "option_c" },
  { key: "D", field: "option_d" },
];

const EMPTY: QuestionInput = {
  text: "",
  option_a: "",
  option_b: "",
  option_c: "",
  option_d: "",
  correct_option: "A",
};

// ─── Add / edit form ─────────────────────────────────────

interface FormProps {
  initial: QuestionInput;
  submitLabel: string;
  onSubmit: (q: QuestionInput) => Promise<string | null>;
  onCancel?: () => void;
}

function QuestionForm({ initial, submitLabel, onSubmit, onCancel }: FormProps) {
  const [q, setQ] = useState<QuestionInput>(initial);
  const [busy, setBusy] = useState(false);
  const radioName = useId(); // keeps each form's radio group separate
  const dialog = useDialog();

  function update<K extends keyof QuestionInput>(key: K, value: QuestionInput[K]) {
    setQ((prev) => ({ ...prev, [key]: value }));
  }

  function showError(message: string) {
    dialog.alert({ title: "Cannot save the question", message, tone: "warn" });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!q.text.trim()) return showError("Please write the question.");
    const empty = OPTIONS.find((o) => !q[o.field].trim());
    if (empty) return showError(`Please fill in option ${empty.key}.`);

    setBusy(true);
    const err = await onSubmit(q);
    setBusy(false);
    if (err) showError(err);
    else if (!onCancel) setQ(EMPTY); // "add" form: clear for the next question
  }

  return (
    <form className="mp-qform" onSubmit={handleSubmit} noValidate>
      <label className="mp-field">
        <span>Question</span>
        <textarea
          rows={3}
          value={q.text}
          onChange={(e) => update("text", e.target.value)}
          placeholder="Type the question"
          disabled={busy}
        />
      </label>

      <fieldset className="mp-qform-options" disabled={busy}>
        <legend>Options — select the correct answer</legend>
        {OPTIONS.map((o) => (
          <div
            key={o.key}
            className={`mp-qform-option${q.correct_option === o.key ? " is-correct" : ""}`}
          >
            <label className="mp-qform-radio" title="Mark as correct answer">
              <input
                type="radio"
                name={radioName}
                checked={q.correct_option === o.key}
                onChange={() => update("correct_option", o.key)}
              />
              <span>{o.key}</span>
            </label>
            <input
              type="text"
              value={q[o.field]}
              onChange={(e) => update(o.field, e.target.value)}
              placeholder={`Option ${o.key}`}
              aria-label={`Option ${o.key}`}
            />
            {q.correct_option === o.key && <span className="mp-correct-tag">Correct</span>}
          </div>
        ))}
      </fieldset>

      <div className="mp-qform-actions">
        {onCancel && (
          <button type="button" className="mp-btn mp-btn--ghost" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
        )}
        <button type="submit" className="mp-btn mp-btn--primary mp-btn--inline" disabled={busy}>
          {busy ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

// ─── Page ────────────────────────────────────────────────

export default function QuestionManagerPage() {
  const { slug = "" } = useParams();
  const [questions, setQuestions] = useState<AdminQuestion[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const dialog = useDialog();

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    const { data, error } = await portalApi.adminQuestions(slug);
    if (data) {
      setQuestions(data.questions);
      setAttempts(data.attempts_count);
    } else {
      setLoadError(error);
      dialog.alert({
        title: "Could not load the questions",
        message: error || "Something went wrong. Please try again.",
        tone: "warn",
      });
    }
    setLoading(false);
  }, [slug, dialog]);

  useEffect(() => {
    setEditingId(null);
    setShowAdd(false);
    load();
  }, [load]);

  async function handleCreate(q: QuestionInput) {
    const { data, error } = await portalApi.adminCreateQuestion(slug, q);
    if (!data) return error;
    setQuestions((prev) => [...prev, data]);
    dialog.alert({ title: "Question added", message: "The question was saved. You can add the next one.", tone: "success" });
    return null;
  }

  async function handleUpdate(id: number, q: QuestionInput) {
    const { data, error } = await portalApi.adminUpdateQuestion(id, q);
    if (!data) return error;
    setQuestions((prev) => prev.map((item) => (item.id === id ? data : item)));
    setEditingId(null);
    dialog.alert({ title: "Question updated", message: "Your changes were saved.", tone: "success" });
    return null;
  }

  const attemptsNote =
    attempts > 0
      ? `${attempts} participant${attempts === 1 ? " has" : "s have"} already submitted this ` +
        "evaluation. Changing questions now does not change their saved marks."
      : null;

  async function handleEdit(id: number) {
    if (attemptsNote) {
      await dialog.alert({ title: "Already attempted", message: attemptsNote, tone: "info" });
    }
    setEditingId(id);
    setShowAdd(false);
  }

  async function handleDelete(q: AdminQuestion, index: number) {
    const ok = await dialog.confirm({
      title: `Delete question ${index + 1}?`,
      message: (
        <>
          <p className="mp-dialog-quote">“{q.text}”<br />This cannot be undone.</p>
          {attemptsNote && <p className="mp-dialog-note">{attemptsNote}</p>}
        </>
      ),
      tone: "danger",
      confirmText: "Delete",
    });
    if (!ok) return;
    const { error, status } = await portalApi.adminDeleteQuestion(q.id);
    if (error && status !== 204) {
      dialog.alert({ title: "Could not delete the question", message: error, tone: "warn" });
      return;
    }
    setQuestions((prev) => prev.filter((item) => item.id !== q.id));
    dialog.alert({ title: "Question deleted", message: "The question was removed from this evaluation.", tone: "success" });
  }

  return (
    <div className="mp-page">
      <header className="mp-page-head mp-page-head--row">
        <div>
          <p className="mp-eyebrow">Manage Questions</p>
          <h1>{evaluationTitle(slug)}</h1>
          <p>
            {questions.length} question{questions.length === 1 ? "" : "s"} · each with 4 options
            and one correct answer
          </p>
        </div>
        {!showAdd && !loading && !loadError && (
          <button
            className="mp-btn mp-btn--primary mp-btn--inline"
            onClick={() => {
              setShowAdd(true);
              setEditingId(null);
            }}
          >
            <Plus size={17} /> Add Question
          </button>
        )}
      </header>

      {showAdd && (
        <div className="mp-card mp-card--accent">
          <h2>New Question</h2>
          <QuestionForm
            key={`add-${slug}`}
            initial={EMPTY}
            submitLabel="Save Question"
            onSubmit={handleCreate}
          />
          <button className="mp-link mp-close-add" onClick={() => setShowAdd(false)}>
            Done adding
          </button>
        </div>
      )}

      {loading ? (
        <div className="mp-center mp-center--short">
          <div className="mp-spinner" aria-label="Loading" />
        </div>
      ) : loadError ? (
        <div className="mp-card mp-empty">
          <h2>Could not load the questions</h2>
          <button className="mp-btn mp-btn--primary mp-btn--inline" onClick={load}>
            Try again
          </button>
        </div>
      ) : questions.length === 0 && !showAdd ? (
        <div className="mp-card mp-empty">
          <h2>No questions yet</h2>
          <p>Add the first question for this evaluation.</p>
          <button className="mp-btn mp-btn--primary mp-btn--inline" onClick={() => setShowAdd(true)}>
            <Plus size={17} /> Add Question
          </button>
        </div>
      ) : (
        <ol className="mp-qlist">
          {questions.map((q, i) => (
            <li key={q.id} className="mp-card mp-qitem">
              {editingId === q.id ? (
                <>
                  <h2>Edit Question {i + 1}</h2>
                  <QuestionForm
                    initial={q}
                    submitLabel="Save Changes"
                    onSubmit={(data) => handleUpdate(q.id, data)}
                    onCancel={() => setEditingId(null)}
                  />
                </>
              ) : (
                <>
                  <div className="mp-qitem-head">
                    <span className="mp-qnum">Q{i + 1}</span>
                    <p className="mp-qtext">{q.text}</p>
                    <div className="mp-qitem-actions">
                      <button
                        className="mp-tool-btn"
                        onClick={() => handleEdit(q.id)}
                        title="Edit"
                        aria-label={`Edit question ${i + 1}`}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="mp-tool-btn mp-tool-btn--danger"
                        onClick={() => handleDelete(q, i)}
                        title="Delete"
                        aria-label={`Delete question ${i + 1}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <ul className="mp-qoptions">
                    {OPTIONS.map((o) => (
                      <li
                        key={o.key}
                        className={q.correct_option === o.key ? "is-correct" : undefined}
                      >
                        <span className="mp-opt-key">{o.key}</span>
                        <span>{q[o.field]}</span>
                        {q.correct_option === o.key && <Check size={16} aria-label="Correct answer" />}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
