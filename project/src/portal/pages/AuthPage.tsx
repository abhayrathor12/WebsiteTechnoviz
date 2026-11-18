import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import { useAuth } from "../AuthContext";
import { portalApi } from "../api";
import PasswordInput from "../components/PasswordInput";
import { useDialog } from "../DialogContext";

// Portal accounts are created automatically after the Masterclass payment
// (login details are emailed), so there is no Register form here.
type View = "login" | "forgot-email" | "forgot-otp" | "forgot-reset";

const OTP_SECONDS = 120;

function formatTimer(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export default function AuthPage() {
  const { login, notice, clearNotice } = useAuth();
  const dialog = useDialog();

  // Automatic logout (certificate downloaded, account deactivated, session ended) -> popup
  useEffect(() => {
    if (!notice) return;
    clearNotice();
    dialog.alert(notice);
  }, [notice, clearNotice, dialog]);

  const [view, setView] = useState<View>("login");
  const [busy, setBusy] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Forgot password
  const [otp, setOtp] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // OTP countdown
  useEffect(() => {
    if (view !== "forgot-otp" || secondsLeft <= 0) return;
    const id = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [view, secondsLeft]);

  /** Every message to the user is shown as a popup */
  function showError(title: string, message: string) {
    dialog.alert({ title, message, tone: "warn" });
  }

  function goTo(next: View) {
    setView(next);
    setPassword("");
    setOtp("");
    setNewPassword("");
    setConfirm("");
  }

  // ─── Login ───

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      showError("Missing details", "Please enter your email and password.");
      return;
    }
    setBusy(true);
    const err = await login(email.trim(), password);
    setBusy(false);
    if (!err) return;

    if (err.status === 403 && err.message.toLowerCase().includes("not active")) {
      dialog.alert({
        title: "Account not active",
        message: (
          <p>
            Your account is deactivated right now because you have already downloaded your
            certificate. If you want to access the portal again, contact{" "}
            <a href="mailto:support@technovizautomation.com">support@technovizautomation.com</a>.
          </p>
        ),
        tone: "warn",
      });
    } else {
      showError("Login failed", err.message);
    }
  }

  // ─── Forgot password ───

  async function sendOtp(e?: FormEvent) {
    e?.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      showError("Invalid email", "Please enter the email you used for the Masterclass.");
      return;
    }
    setBusy(true);
    const { data, error } = await portalApi.forgotPassword(email.trim());
    setBusy(false);
    if (!data) {
      showError("Could not send the OTP", error || "Something went wrong. Please try again.");
      return;
    }
    setOtp("");
    setSecondsLeft(data.expires_in || OTP_SECONDS);
    setView("forgot-otp");
    dialog.alert({ title: "OTP sent", message: data.message, tone: "info" });
  }

  async function handleVerify(e: FormEvent) {
    e.preventDefault();
    if (secondsLeft <= 0) {
      showError("OTP expired", "This OTP has expired. Please click Resend OTP to get a new one.");
      return;
    }
    if (!/^\d{6}$/.test(otp.trim())) {
      showError("Invalid OTP", "Please enter the 6-digit OTP from your email.");
      return;
    }
    setBusy(true);
    const { data, error } = await portalApi.verifyOtp(email.trim(), otp.trim());
    setBusy(false);
    if (!data) {
      showError("OTP not accepted", error || "Something went wrong. Please try again.");
      return;
    }
    setResetToken(data.reset_token);
    goTo("forgot-reset");
  }

  async function handleReset(e: FormEvent) {
    e.preventDefault();
    if (newPassword.length < 8)
      return showError("Password too short", "Password must be at least 8 characters.");
    if (newPassword !== confirm)
      return showError("Passwords do not match", "Please type the same password in both fields.");

    setBusy(true);
    const { data, error } = await portalApi.resetPassword(email.trim(), resetToken, newPassword);
    setBusy(false);
    if (!data) {
      showError("Could not change the password", error || "Something went wrong. Please try again.");
      if (error?.includes("start again")) goTo("forgot-email");
      return;
    }
    setResetToken("");
    goTo("login");
    dialog.alert({ title: "Password changed", message: data.message, tone: "success" });
  }

  const backToLogin = (
    <p className="mp-form-foot">
      <button type="button" className="mp-link" onClick={() => goTo("login")} disabled={busy}>
        Back to Login
      </button>
    </p>
  );

  return (
    <div className="mp-auth">
      <section className="mp-auth-intro">
        <span className="mp-live-badge">Masterclass 2026</span>
        <h1>
          Smart Manufacturing <span>&amp; AI Masterclass</span>
        </h1>
        <p>
          Watch the welcome video, take the Pre Assessment, see your marks, and download your
          certificate.
        </p>
        <ul>
          <li>Your login details are emailed to you after you register for the Masterclass</li>
          <li>The Pre Assessment opens when your webinar starts</li>
        </ul>
      </section>

      <section className="mp-auth-card">
        {view === "login" && (
          <form className="mp-form" onSubmit={handleLogin} noValidate>
            <div className="mp-auth-head">
              <h2>Login</h2>
              <p>Use the email and password from your Masterclass Portal email.</p>
            </div>
            <label className="mp-field">
              <span>Email</span>
              <input
                type="text"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                disabled={busy}
              />
            </label>
            <label className="mp-field">
              <span>Password</span>
              <PasswordInput
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                disabled={busy}
              />
            </label>
            <button
              type="button"
              className="mp-link mp-forgot-link"
              onClick={() => goTo("forgot-email")}
              disabled={busy}
            >
              Forgot password?
            </button>
            <button type="submit" className="mp-btn mp-btn--primary" disabled={busy}>
              {busy ? "Logging in..." : "Login"}
            </button>
          </form>
        )}

        {view === "forgot-email" && (
          <form className="mp-form" onSubmit={sendOtp} noValidate>
            <div className="mp-auth-head">
              <h2>Forgot password</h2>
              <p>Enter your email. We will send you an OTP to reset your password.</p>
            </div>
            <label className="mp-field">
              <span>Email</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email used for the Masterclass"
                disabled={busy}
              />
            </label>
            <button type="submit" className="mp-btn mp-btn--primary" disabled={busy}>
              {busy ? "Sending..." : "Send OTP"}
            </button>
            {backToLogin}
          </form>
        )}

        {view === "forgot-otp" && (
          <form className="mp-form" onSubmit={handleVerify} noValidate>
            <div className="mp-auth-head">
              <h2>Enter OTP</h2>
              <p>
                We sent a 6-digit OTP to <strong>{email.trim()}</strong>.
              </p>
            </div>
            <label className="mp-field">
              <span>OTP</span>
              <input
                className="mp-otp-input"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="••••••"
                disabled={busy}
                autoFocus
              />
            </label>
            <p className={`mp-otp-timer${secondsLeft <= 0 ? " is-expired" : ""}`}>
              {secondsLeft > 0 ? (
                <>
                  OTP expires in <strong>{formatTimer(secondsLeft)}</strong>
                </>
              ) : (
                "OTP expired. Please request a new one."
              )}
            </p>
            <button
              type="submit"
              className="mp-btn mp-btn--primary"
              disabled={busy || secondsLeft <= 0}
            >
              {busy ? "Checking..." : "Verify OTP"}
            </button>
            <p className="mp-form-foot">
              Didn&apos;t get it?{" "}
              <button
                type="button"
                className="mp-link"
                onClick={() => sendOtp()}
                disabled={busy || secondsLeft > 0}
                title={secondsLeft > 0 ? "Available when the current OTP expires" : undefined}
              >
                Resend OTP
              </button>
            </p>
            {backToLogin}
          </form>
        )}

        {view === "forgot-reset" && (
          <form className="mp-form" onSubmit={handleReset} noValidate>
            <div className="mp-auth-head">
              <h2>Set a new password</h2>
              <p>OTP verified. Choose a new password for {email.trim()}.</p>
            </div>
            <label className="mp-field">
              <span>New Password</span>
              <PasswordInput
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                disabled={busy}
                autoFocus
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
            {backToLogin}
          </form>
        )}
      </section>
    </div>
  );
}
