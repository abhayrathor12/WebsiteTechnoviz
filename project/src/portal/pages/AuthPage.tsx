import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import { useAuth } from "../AuthContext";
import { portalApi } from "../api";
import { useDialog } from "../DialogContext";

type Tab = "login" | "register";

export default function AuthPage() {
  const { login, notice, clearNotice } = useAuth();
  const dialog = useDialog();

  // Automatic logout (certificate downloaded, account deactivated, session ended) -> popup
  useEffect(() => {
    if (!notice) return;
    clearNotice();
    dialog.alert(notice);
  }, [notice, clearNotice, dialog]);
  const [tab, setTab] = useState<Tab>("login");
  const [busy, setBusy] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  /** Every message to the user is shown as a popup */
  function showError(title: string, message: string) {
    dialog.alert({ title, message, tone: "warn" });
  }

  function switchTab(next: Tab) {
    setTab(next);
    setPassword("");
    setConfirm("");
  }

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
          <>
            <p>
              Your account is deactivated right now because you have already downloaded your
              certificate. If you want to access the portal again, contact{" "}
              <a href="mailto:support@technovizautomation.com">support@technovizautomation.com</a>.
            </p>
            <p className="mp-dialog-note">
              If you just registered, please wait for activation.
            </p>
          </>
        ),
        tone: "warn",
      });
    } else {
      showError("Login failed", err.message);
    }
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return showError("Missing details", "Please enter your full name.");
    if (!/^\S+@\S+\.\S+$/.test(email.trim()))
      return showError("Invalid email", "Please enter a valid email address.");
    if (password.length < 8)
      return showError("Password too short", "Password must be at least 8 characters.");
    if (password !== confirm)
      return showError("Passwords do not match", "Please type the same password in both fields.");

    setBusy(true);
    const { data, error: err, status } = await portalApi.register(
      name.trim(),
      email.trim(),
      password
    );
    setBusy(false);
    if (!data) {
      const title =
        status === 403
          ? "Email not registered for the Masterclass"
          : status === 400 && err?.includes("already exists")
            ? "Account already exists"
            : "Registration failed";
      showError(title, err || "Something went wrong. Please try again.");
      return;
    }
    setTab("login");
    setPassword("");
    setConfirm("");
    dialog.alert({ title: "Registration successful", message: data.message, tone: "success" });
  }

  return (
    <div className="mp-auth">
      <section className="mp-auth-intro">
        <span className="mp-live-badge">Masterclass 2026</span>
        <h1>
          Smart Manufacturing <span>&amp; AI Masterclass</span>
        </h1>
        <p>
          Take your session evaluations, see your marks, and download your certificate once
          you complete all evaluations.
        </p>
        <ul>
          <li>Register with the same email you used to pay for the Masterclass</li>
          <li>Your account is activated by the admin before you can log in</li>
          <li>Evaluations unlock one by one as you complete them</li>
        </ul>
      </section>

      <section className="mp-auth-card">
        <div className="mp-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={tab === "login"}
            className={tab === "login" ? "is-active" : ""}
            onClick={() => switchTab("login")}
          >
            Login
          </button>
          <button
            role="tab"
            aria-selected={tab === "register"}
            className={tab === "register" ? "is-active" : ""}
            onClick={() => switchTab("register")}
          >
            Register
          </button>
        </div>

        {tab === "login" ? (
          <form className="mp-form" onSubmit={handleLogin} noValidate>
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
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                disabled={busy}
              />
            </label>
            <button type="submit" className="mp-btn mp-btn--primary" disabled={busy}>
              {busy ? "Logging in..." : "Login"}
            </button>
            <p className="mp-form-foot">
              New here?{" "}
              <button type="button" className="mp-link" onClick={() => switchTab("register")}>
                Create an account
              </button>
            </p>
          </form>
        ) : (
          <form className="mp-form" onSubmit={handleRegister} noValidate>
            <label className="mp-field">
              <span>Full Name</span>
              <input
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name to print on your certificate"
                disabled={busy}
              />
            </label>
            <label className="mp-field">
              <span>Email</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email used for the Masterclass payment"
                disabled={busy}
              />
            </label>
            <label className="mp-field">
              <span>Password</span>
              <input
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                disabled={busy}
              />
            </label>
            <label className="mp-field">
              <span>Confirm Password</span>
              <input
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat your password"
                disabled={busy}
              />
            </label>
            <button type="submit" className="mp-btn mp-btn--primary" disabled={busy}>
              {busy ? "Registering..." : "Register"}
            </button>
            <p className="mp-form-foot">
              Already registered?{" "}
              <button type="button" className="mp-link" onClick={() => switchTab("login")}>
                Login
              </button>
            </p>
          </form>
        )}
      </section>
    </div>
  );
}
