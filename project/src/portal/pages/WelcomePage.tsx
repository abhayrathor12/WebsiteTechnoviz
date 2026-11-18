import { PlayCircle } from "lucide-react";

import { WELCOME_VIDEO_URL, welcomeEmbedUrl } from "../constants";

/** "Welcome" tab: a welcome video. Always open for every participant. */
export default function WelcomePage() {
  return (
    <div className="mp-page">
      <header className="mp-page-head">
        <p className="mp-eyebrow">Welcome</p>
        <h1>Welcome Video</h1>
        <p>A short message from the Technoviz team.</p>
      </header>

      {WELCOME_VIDEO_URL ? (
        <div className="mp-card mp-video-card">
          <div className="mp-video-frame">
            <iframe
              src={welcomeEmbedUrl(WELCOME_VIDEO_URL)}
              title="Welcome video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      ) : (
        <div className="mp-card mp-empty">
          <PlayCircle size={32} className="mp-empty-icon" />
          <h2>Video coming soon</h2>
          <p>The welcome video will be available here shortly. Please check back later.</p>
        </div>
      )}
    </div>
  );
}
