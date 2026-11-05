import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { getToken, portalApi, setToken, setUnauthorizedHandler } from "./api";
import type { PortalUser } from "./api";
import type { DialogTone } from "./DialogContext";

/** Shown as a popup on the login page after an automatic logout */
export interface Notice {
  title: string;
  message: string;
  tone: DialogTone;
}

export interface LoginError {
  message: string;
  status: number;
}

interface AuthState {
  user: PortalUser | null;
  /** true while checking a saved login on page load */
  checking: boolean;
  notice: Notice | null;
  login: (email: string, password: string) => Promise<LoginError | null>;
  logout: (notice?: Notice) => Promise<void>;
  /** clear the session locally (backend already logged the user out) */
  endSession: (notice?: Notice) => void;
  clearNotice: () => void;
}

const SESSION_ENDED: Notice = {
  title: "You have been logged out",
  message:
    "Your session has ended. Please log in again. If your account was deactivated, contact the admin.",
  tone: "info",
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PortalUser | null>(null);
  const [checking, setChecking] = useState<boolean>(() => Boolean(getToken()));
  const [notice, setNotice] = useState<Notice | null>(null);

  const endSession = useCallback((next?: Notice) => {
    setToken(null);
    setUser(null);
    setNotice(next ?? null);
  }, []);

  // Token rejected by the backend (e.g. the admin deactivated the account)
  useEffect(() => {
    setUnauthorizedHandler(() => endSession(SESSION_ENDED));
    return () => setUnauthorizedHandler(null);
  }, [endSession]);

  // Restore a saved login
  useEffect(() => {
    if (!getToken()) return;
    let cancelled = false;
    portalApi.me().then(({ data }) => {
      if (cancelled) return;
      if (data) setUser(data);
      setChecking(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { data, error, status } = await portalApi.login(email, password);
    if (!data) return { message: error || "Login failed.", status };
    setToken(data.token);
    setUser(data.user);
    setNotice(null);
    return null;
  }, []);

  const logout = useCallback(
    async (next?: Notice) => {
      await portalApi.logout();
      endSession(next);
    },
    [endSession]
  );

  const value = useMemo(
    () => ({
      user,
      checking,
      notice,
      login,
      logout,
      endSession,
      clearNotice: () => setNotice(null),
    }),
    [user, checking, notice, login, logout, endSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
