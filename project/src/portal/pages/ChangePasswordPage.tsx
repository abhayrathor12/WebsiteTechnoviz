import { useState } from "react";
import type { FormEvent } from "react";

import { portalApi } from "../api";
import PasswordInput from "../components/PasswordInput";
import { useDialog } from "../DialogContext";

/** Logged-in users (participants and admin) change their password here. */
export default function ChangePasswordPage() {
  const dialog = useDialog();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  function showError(title: string, message: string) {
    dialog.alert({ title, message, tone: "warn" });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!current) return showError("Missing details", "Please enter your current password.");
    if (next.length < 8)
      return showError("Password too short", "The new password must be at least 8 characters.");
    if (next !== confirm)
      return showError("Passwords do not match", "Please type the same new password in both fields.");

    setBusy(true);
    const { data, error } = await portalApi.changePassword(current, next);
    setBusy(false);
    if (!data) {
      showError("Could not change the password", error || "Something went wrong. Please try again.");
      return;
    }
    setCurrent("");
    setNext("");
    setConfirm("");
    dialog.alert({ title: "Password changed", message: data.message, tone: "success" });
  }

  return (
    <div className="mp-page">
      <header className="mp-page-head">
        <p className="mp-eyebrow">Account</p>
        <h1>Change Password</h1>
        <p>Use at least 8 characters. Avoid a password that is only numbers or too common.</p>
      </header>

      <div className="mp-card mp-password-card">
        <form className="mp-form" onSubmit={handleSubmit} noValidate>
          <label className="mp-field">
            <span>Current Password</span>
            <PasswordInput
              autoComplete="current-password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="The password you log in with"
              disabled={busy}
            />
          </label>
          <label className="mp-field">
            <span>New Password</span>
            <PasswordInput
              autoComplete="new-password"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              placeholder="At least 8 characters"
              disabled={busy}
            />
          </label>
          <label className="mp-field">
            <span>Confirm New Password</span>
            <PasswordInput
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repeat the new password"
              disabled={busy}
            />
          </label>
          <button type="submit" className="mp-btn mp-btn--primary" disabled={busy}>
            {busy ? "Saving..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
