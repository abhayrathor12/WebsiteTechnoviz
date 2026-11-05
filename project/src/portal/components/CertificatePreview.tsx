import type { CertificateInfo } from "../api";

function formatDate(isoDate: string) {
  // "2026-11-21" -> "21 November 2026" (parsed as a plain date, no timezone shift)
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * On-screen copy of the certificate PDF (same layout as portal/certificate.py).
 * It's HTML, so viewing it doesn't count as a download.
 */
export default function CertificatePreview({ info }: { info: CertificateInfo }) {
  return (
    <div className="mp-cert" aria-label={`Certificate of completion for ${info.name}`}>
      <div className="mp-cert-frame">
      <div className="mp-cert-inner">
        <div className="mp-cert-band">
          <strong>CERTIFICATE OF COMPLETION</strong>
          <span>TECHNOVIZ AUTOMATION</span>
        </div>

        <div className="mp-cert-body">
          <p className="mp-cert-soft">This is to certify that</p>
          <p className="mp-cert-name">{info.name}</p>
          <p className="mp-cert-soft">has successfully completed all evaluations of the</p>
          <p className="mp-cert-course">Smart Manufacturing &amp; AI Masterclass 2026</p>
          <p className="mp-cert-small">conducted by Technoviz Automation</p>
        </div>

        <div className="mp-cert-footer">
          <div>
            <strong>{formatDate(info.completed_on)}</strong>
            <span>Date of Completion</span>
          </div>
          <div>
            <strong>Kapil Khurana</strong>
            <span>Trainer</span>
          </div>
        </div>

        <p className="mp-cert-id">Certificate ID: {info.certificate_id}</p>
      </div>
      </div>
    </div>
  );
}
