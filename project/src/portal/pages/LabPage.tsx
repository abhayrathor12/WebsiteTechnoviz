import { FlaskConical } from "lucide-react";

/** "Lab" tab: placeholder for now. */
export default function LabPage() {
  return (
    <div className="mp-page">
      <header className="mp-page-head">
        <p className="mp-eyebrow">Lab</p>
        <h1>Lab</h1>
      </header>
      <div className="mp-card mp-empty">
        <FlaskConical size={32} className="mp-empty-icon" />
        <h2>Coming soon</h2>
        <p>The lab will be available here shortly. Please check back later.</p>
      </div>
    </div>
  );
}
