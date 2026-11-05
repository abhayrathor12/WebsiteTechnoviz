// Master Portal — everything under /masterportal. Lazy-loaded from App.tsx,
// so visitors of the normal website never download this code.
import { Navigate, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";

import SEO from "../components/SEO";
import { PAGE_SEO } from "../seo/pages.js";
import { AuthProvider, useAuth } from "./AuthContext";
import { DialogProvider } from "./DialogContext";
import PortalLayout from "./components/PortalLayout";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import CertificatePage from "./pages/CertificatePage";
import EvaluationPage from "./pages/EvaluationPage";
import QuestionManagerPage from "./pages/admin/QuestionManagerPage";
import { PORTAL_BASE } from "./constants";
import "./portal.css";

function Loading() {
  return (
    <div className="mp-center">
      <div className="mp-spinner" aria-label="Loading" />
    </div>
  );
}

/** Where a logged-in user lands */
function homeFor(isAdmin: boolean) {
  return isAdmin ? `${PORTAL_BASE}/admin/pre-session` : `${PORTAL_BASE}/dashboard`;
}

function RequireAuth({ children }: { children: ReactNode }) {
  const { user, checking } = useAuth();
  if (checking) return <Loading />;
  if (!user) return <Navigate to={PORTAL_BASE} replace />;
  return <>{children}</>;
}

function RequireRole({ admin, children }: { admin: boolean; children: ReactNode }) {
  const { user } = useAuth();
  if (!user) return null;
  if (user.is_admin !== admin) return <Navigate to={homeFor(user.is_admin)} replace />;
  return <>{children}</>;
}

function Home() {
  const { user, checking } = useAuth();
  if (checking) return <Loading />;
  if (user) return <Navigate to={homeFor(user.is_admin)} replace />;
  return <AuthPage />;
}

export default function PortalApp() {
  return (
    <AuthProvider>
      <SEO {...PAGE_SEO["/masterportal"]} path="/masterportal" />
      <div className="mp-root">
        <DialogProvider>
        <Routes>
          <Route index element={<Home />} />

          <Route
            element={
              <RequireAuth>
                <PortalLayout />
              </RequireAuth>
            }
          >
            {/* Participant pages */}
            <Route
              path="dashboard"
              element={
                <RequireRole admin={false}>
                  <DashboardPage />
                </RequireRole>
              }
            />
            <Route
              path="evaluation/:slug"
              element={
                <RequireRole admin={false}>
                  <EvaluationPage />
                </RequireRole>
              }
            />
            <Route
              path="certificate"
              element={
                <RequireRole admin={false}>
                  <CertificatePage />
                </RequireRole>
              }
            />

            {/* Admin pages */}
            <Route
              path="admin/:slug"
              element={
                <RequireRole admin>
                  <QuestionManagerPage />
                </RequireRole>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to={PORTAL_BASE} replace />} />
        </Routes>
        </DialogProvider>
      </div>
    </AuthProvider>
  );
}
