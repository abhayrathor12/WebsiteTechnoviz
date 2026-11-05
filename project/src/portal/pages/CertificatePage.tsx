import { useState } from "react";
import { Link } from "react-router-dom";
import { Award, CheckCircle2, Download, Eye, FileText, Lock } from "lucide-react";

import { useAuth } from "../AuthContext";
import { downloadFile } from "../api";
import CertificatePreview from "../components/CertificatePreview";
import Modal from "../components/Modal";
import { PORTAL_BASE } from "../constants";
import { useProgress } from "../ProgressContext";
import { useDialog } from "../DialogContext";

type FileKind = "certificate" | "linkedin";

const FILES: Record<FileKind, { path: string; filename: string; title: string; text: string }> = {
  certificate: {
    path: "/certificate/",
    filename: "Masterclass-Certificate.pdf",
    title: "Your Certificate",
    text: "Certificate of completion for the Smart Manufacturing & AI Masterclass 2026, with your name.",
  },
  linkedin: {
    path: "/linkedin-guide/",
    filename: "How-to-Share-on-LinkedIn.pdf",
    title: "LinkedIn Guide",
    text: "Step-by-step guide to add your certificate to LinkedIn and share it in a post.",
  },
};

export default function CertificatePage() {
  const { endSession } = useAuth();
  const { progress, loading, refresh } = useProgress();
  const dialog = useDialog();
  const [busy, setBusy] = useState<FileKind | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const downloaded: Record<FileKind, boolean> = {
    certificate: Boolean(progress?.certificate_downloaded),
    linkedin: Boolean(progress?.linkedin_downloaded),
  };

  async function handleDownload(kind: FileKind) {
    const other: FileKind = kind === "certificate" ? "linkedin" : "certificate";
    const isFinalDownload = downloaded[other];

    if (isFinalDownload) {
      const ok = await dialog.confirm({
        title: "This is your last download",
        message:
          `After this download you will be logged out automatically and your portal account will be ` +
          `closed. Make sure you have saved your ${FILES[other].title.toLowerCase()} on your device.`,
        tone: "warn",
        confirmText: "Download & finish",
      });
      if (!ok) return;
    }

    setBusy(kind);
    const err = await downloadFile(FILES[kind].path, FILES[kind].filename);
    if (err) {
      setBusy(null);
      dialog.alert({ title: "Download failed", message: err, tone: "warn" });
      return;
    }

    if (isFinalDownload) {
      // Both files downloaded: the backend has deactivated the account and logged it out.
      // Short pause so the browser finishes saving the file, then the popup on the login page.
      setTimeout(
        () =>
          endSession({
            title: "Congratulations! 🎉",
            message:
              "You have downloaded your certificate and the LinkedIn guide, so you have been logged " +
              "out and your portal account is now closed. If you want to access the portal again, " +
              "contact support@technovizautomation.com.",
            tone: "success",
          }),
        1200
      );
    } else {
      setBusy(null);
      refresh();
      dialog.alert({
        title: `${FILES[kind].title} downloaded`,
        message:
          `Now download the ${FILES[other].title.toLowerCase()} as well. After you download it, ` +
          `you will be logged out automatically and your portal account will be closed.`,
        tone: "success",
      });
    }
  }

  if (loading) {
    return (
      <div className="mp-center mp-center--short">
        <div className="mp-spinner" aria-label="Loading" />
      </div>
    );
  }

  if (!progress?.all_done) {
    return (
      <div className="mp-page">
        <header className="mp-page-head">
          <p className="mp-eyebrow">Completion</p>
          <h1>Certificate</h1>
        </header>
        <div className="mp-card mp-empty">
          <Lock size={32} className="mp-empty-icon" />
          <h2>Certificate locked</h2>
          <p>Complete all 7 evaluations to unlock your certificate and the LinkedIn guide.</p>
          <Link to={`${PORTAL_BASE}/dashboard`} className="mp-btn mp-btn--primary mp-btn--inline">
            Back to My Results
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mp-page">
      <header className="mp-page-head">
        <p className="mp-eyebrow">Completion</p>
        <h1>Congratulations! 🎉</h1>
        <p>You have completed all evaluations. Download your certificate and the LinkedIn guide.</p>
      </header>

      <div className="mp-downloads">
        {(Object.keys(FILES) as FileKind[]).map((kind) => (
          <div key={kind} className="mp-card mp-download">
            <div className="mp-download-icon" aria-hidden>
              {kind === "certificate" ? <Award size={28} /> : <FileText size={28} />}
            </div>
            <h2>{FILES[kind].title}</h2>
            <p>{FILES[kind].text}</p>
            {downloaded[kind] && (
              <span className="mp-downloaded">
                <CheckCircle2 size={16} /> Downloaded
              </span>
            )}
            <div className="mp-download-actions">
              {kind === "certificate" && progress.certificate && (
                <button
                  className="mp-btn mp-btn--ghost"
                  onClick={() => setPreviewOpen(true)}
                  disabled={busy !== null}
                >
                  <Eye size={17} /> View Certificate
                </button>
              )}
              <button
                className="mp-btn mp-btn--primary"
                onClick={() => handleDownload(kind)}
                disabled={busy !== null}
              >
                <Download size={17} />
                {busy === kind ? "Downloading..." : downloaded[kind] ? "Download again" : "Download PDF"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {progress.certificate && (
        <Modal
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          labelledBy="mp-cert-title"
          size="large"
          showClose
        >
          <h2 id="mp-cert-title" className="mp-preview-title">
            Your Certificate
          </h2>
          <CertificatePreview info={progress.certificate} />
          <div className="mp-dialog-actions">
            <button className="mp-btn mp-btn--ghost" onClick={() => setPreviewOpen(false)}>
              Close
            </button>
            <button
              className="mp-btn mp-btn--primary mp-btn--inline"
              onClick={() => {
                setPreviewOpen(false);
                handleDownload("certificate");
              }}
              disabled={busy !== null}
              data-autofocus
            >
              <Download size={17} /> Download PDF
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
