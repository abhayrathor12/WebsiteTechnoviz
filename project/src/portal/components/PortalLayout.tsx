import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Award,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Lock,
  LogOut,
  Menu,
  PlayCircle,
  X,
} from "lucide-react";

import { useAuth } from "../AuthContext";
import { EVALUATIONS, PORTAL_BASE } from "../constants";
import { ProgressProvider, useProgress } from "../ProgressContext";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `mp-nav-link${isActive ? " is-active" : ""}`;

function LockedItem({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="mp-nav-link is-locked" aria-disabled="true" title="Locked">
      {icon}
      <span>{label}</span>
    </span>
  );
}

function ParticipantNav() {
  const { progress } = useProgress();
  const statusOf = (slug: string) =>
    progress?.evaluations.find((e) => e.slug === slug)?.status ?? "locked";

  return (
    <>
      <NavLink to={`${PORTAL_BASE}/dashboard`} className={linkClass}>
        <BarChart3 size={17} />
        <span>My Results</span>
      </NavLink>

      <p className="mp-nav-heading">Evaluations</p>
      {EVALUATIONS.map((ev) => {
        const state = statusOf(ev.slug);
        if (state === "locked") {
          return <LockedItem key={ev.slug} icon={<Lock size={17} />} label={ev.title} />;
        }
        return (
          <NavLink key={ev.slug} to={`${PORTAL_BASE}/evaluation/${ev.slug}`} className={linkClass}>
            {state === "done" ? (
              <CheckCircle2 size={17} className="mp-nav-done" />
            ) : (
              <PlayCircle size={17} />
            )}
            <span>{ev.title}</span>
          </NavLink>
        );
      })}

      <p className="mp-nav-heading">Completion</p>
      {progress?.all_done ? (
        <NavLink to={`${PORTAL_BASE}/certificate`} className={linkClass}>
          <Award size={17} />
          <span>Certificate</span>
        </NavLink>
      ) : (
        <LockedItem icon={<Lock size={17} />} label="Certificate" />
      )}
    </>
  );
}

function AdminNav() {
  return (
    <>
      <p className="mp-nav-heading">Manage Questions</p>
      {EVALUATIONS.map((ev) => (
        <NavLink key={ev.slug} to={`${PORTAL_BASE}/admin/${ev.slug}`} className={linkClass}>
          <ClipboardList size={17} />
          <span>{ev.title}</span>
        </NavLink>
      ))}
    </>
  );
}

function LayoutShell() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu after navigating
  useEffect(() => setMenuOpen(false), [pathname]);

  if (!user) return null;

  return (
    <div className="mp-shell">
      <header className="mp-mobilebar">
        <span className="mp-brand-mini">Masterclass Portal</span>
        <button
          className="mp-icon-btn"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {menuOpen && <div className="mp-backdrop" onClick={() => setMenuOpen(false)} />}

      <aside className={`mp-sidebar${menuOpen ? " is-open" : ""}`}>
        <div className="mp-brand">
          <span className="mp-brand-badge">{user.is_admin ? "Admin" : "Participant"}</span>
          <strong>Smart Manufacturing &amp; AI</strong>
          <span>Masterclass Portal</span>
        </div>

        <nav className="mp-nav">{user.is_admin ? <AdminNav /> : <ParticipantNav />}</nav>

        <div className="mp-userbox">
          <div className="mp-avatar" aria-hidden>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="mp-userinfo">
            <strong>{user.name}</strong>
            <span>{user.email}</span>
          </div>
          <button className="mp-icon-btn" onClick={() => logout()} title="Log out" aria-label="Log out">
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      <main className="mp-main">
        <Outlet />
      </main>
    </div>
  );
}

export default function PortalLayout() {
  const { user } = useAuth();
  if (!user) return null;
  // Participants get their progress loaded once and shared by the sidebar and pages
  return user.is_admin ? (
    <LayoutShell />
  ) : (
    <ProgressProvider>
      <LayoutShell />
    </ProgressProvider>
  );
}
