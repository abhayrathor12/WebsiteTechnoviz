import { useState, FormEvent } from "react";
import { createOrder, verifyPayment, RegistrationData } from "../api";
import "./Masterclass.css";
import kapimage from "../public/kaps.png";
const RAZORPAY_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT_SRC;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const initialForm: RegistrationData = { name: "", email: "", phone: "" };

// Highlights listed in the registration card
const facts = [
  {
    label: "8 Hours LIVE",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: "Limited Seats",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Certificate",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="6" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
  },
  {
    label: "Online Session",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

// Session agenda — full-day format, split into Morning / Afternoon columns so
// all 16 slots fit on one screen. "live" = demo / hands-on (highlighted),
// "break" = rendered as a thin divider instead of a full row.
type AgendaItem = {
  start: string;
  end: string;
  section: string;
  learn?: string;
  kind?: "live" | "break";
};

const agendaBlocks: { label: string; range: string; items: AgendaItem[] }[] = [
  {
    label: "Morning",
    range: "9:30 – 1:15",
    items: [
      { start: "9:30", end: "9:45", section: "Pre-Assessment & Introduction", learn: "15–20 MCQs, participant expectations, manufacturing challenges" },
      { start: "9:45", end: "10:15", section: "Session 1: From Smart to Autonomous Manufacturing", learn: "Industry 1.0–5.0, Connected → Predictive → Intelligent → Agentic → Autonomous Manufacturing" },
      { start: "10:15", end: "11:00", section: "Session 2: AI & Predictive AI in Manufacturing", learn: "AI/ML basics, manufacturing data, supervised/unsupervised learning, Predictive AI architecture and use cases" },
      { start: "11:00", end: "11:20", section: "LIVE DEMO 1: Predictive AI", learn: "Machine/process data → anomaly detection → prediction → actionable insight", kind: "live" },
      { start: "11:20", end: "11:30", section: "Tea Break", kind: "break" },
      { start: "11:30", end: "12:15", section: "Session 3: Generative AI + RAG", learn: "LLM basics, manufacturing knowledge, RAG, embeddings, vector databases, Manufacturing AI Assistant" },
      { start: "12:15", end: "12:40", section: "LIVE DEMO 2: Manufacturing RAG Assistant", learn: "Manual/SOP → knowledge base → technical question → contextual answer", kind: "live" },
      { start: "12:40", end: "1:15", section: "Session 4: AI Agents for Manufacturing", learn: "Agent vs chatbot, tools, memory, reasoning, workflows, event-based agents, human-in-the-loop" },
    ],
  },
  {
    label: "Afternoon",
    range: "1:15 – 5:30",
    items: [
      { start: "1:15", end: "2:00", section: "Lunch Break", kind: "break" },
      { start: "2:00", end: "2:30", section: "Session 5: AI + PLC / SCADA / IIoT Integration", learn: "OPC UA, MQTT, APIs, Edge, Historian, AI architecture, AI output to CMMS/MES/SCADA" },
      { start: "2:30", end: "2:50", section: "LIVE DEMO 3: Connected Industrial AI", learn: "PLC/SCADA data → AI analysis → RAG → Agent → maintenance action", kind: "live" },
      { start: "2:50", end: "4:05", section: "HANDS-ON PRACTICAL: Build an AI Manufacturing Application", learn: "Participants build a working AI application step-by-step", kind: "live" },
      { start: "4:05", end: "4:15", section: "Tea Break", kind: "break" },
      { start: "4:15", end: "4:55", section: "Manufacturing AI Use-Case Workshop", learn: "Teams identify real problems and develop AI solution concepts" },
      { start: "4:55", end: "5:15", section: "Multi-Agent & Autonomous Manufacturing", learn: "Production + Quality + Maintenance Agents, orchestration, governance, journey toward autonomy" },
      { start: "5:15", end: "5:30", section: "Post-Assessment & Wrap-Up", learn: "Same MCQs, pre/post comparison, key takeaways, Q&A" },
    ],
  },
];

const agendaTotal = {
  time: "Total: Full Day (9:30–5:30)",
  section: "Hands-On Masterclass",
  learn: "Live demos, hands-on practical & use-case workshop",
};

export default function Masterclass() {
  const [imgError, setImgError] = useState(false);
  const [form, setForm] = useState<RegistrationData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate(): string | null {
    if (!form.name.trim()) return "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email.";
    if (!/^\d{10}$/.test(form.phone.trim())) return "Please enter a valid 10-digit phone number.";
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setError("Could not load payment gateway. Please check your connection and try again.");
      setLoading(false);
      return;
    }

    const [order, orderError] = await createOrder();
    if (orderError || !order) {
      setError(orderError || "Could not create order. Please try again.");
      setLoading(false);
      return;
    }

    const razorpay = new (window as any).Razorpay({
      key: order.key,
      amount: order.amount,
      currency: "INR",
      name: "Smart Manufacturing & AI Masterclass 2026",
      description: "Live Masterclass Registration",
      order_id: order.order_id,
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      theme: { color: "#203f78" },
      handler: async (response: any) => {
        const [result, verifyError] = await verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          registration_data: form,
        });

        setLoading(false);

        if (verifyError || !result?.success) {
          setError(
            verifyError || result?.message || "Payment verification failed. Please contact support."
          );
          return;
        }

        setShowSuccess(true);
        setForm(initialForm);
      },
      modal: {
        ondismiss: () => {
          window.location.reload();
        },
      },
    });

    razorpay.on("payment.failed", () => {
      setLoading(false);
      setError("Payment failed. Please try again.");
    });

    razorpay.open();
  }

  return (
    <div className="mc-page">
      <div className="mc-shell">
        {/* ─── TOP BAR — title + event details ─── */}
        <header className="mc-topbar">
          <div className="mc-topbar-copy">
            <div className="mc-live-badge">
              <span className="mc-pulse" />
              LIVE Masterclass 2026
            </div>
            <h1 className="mc-title">
              Smart Manufacturing <span className="mc-title-accent">&amp; AI Masterclass</span>
            </h1>
            <p className="mc-subtitle">From Industry 4.0 &amp; 5.0 to AI-Driven Autonomous Factories</p>
          </div>

          <dl className="mc-event-meta">
            <div>
              <dt>Date</dt>
              <dd>Sat, 24 Oct 2026</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd>9:30 AM IST</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>8 Hours Live</dd>
            </div>
            <div>
              <dt>Fee</dt>
              <dd>
                ₹4,999 <small>+ GST</small>
              </dd>
            </div>
          </dl>
        </header>

        <main className="mc-main">
          {/* ─── SIDE — trainer + registration ─── */}
          <aside className="mc-side">
            <div className="mc-speaker">
              <div className="mc-photo-ring">
                <div className="mc-photo-inner">
                  {!imgError && (
                    <img
                      src={kapimage}
                      alt="Kapil Khurana"
                      className="mc-speaker-img"
                      onError={() => setImgError(true)}
                    />
                  )}
                  {imgError && (
                    <div className="mc-photo-fallback">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(32,63,120,0.35)" strokeWidth="1.2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <div className="mc-speaker-text">
                <span className="mc-speaker-role">Your Trainer</span>
                <h2 className="mc-speaker-name">Kapil Khurana</h2>
                <p className="mc-speaker-meta">
                  Certified SIRI Assessor (CSA)
                  <br />
                  Author – Digital Revolution: Industry 4.0 &amp; IIoT
                  <br />
                  25+ Years of Industry Experience
                </p>
              </div>
              <div className="mc-speaker-tags">
                <span>Industrial Automation</span>
                <span>Smart Manufacturing</span>
                <span>Digital Transformation</span>
              </div>
            </div>

            <div id="register" className="mc-register">
              <div className="mc-register-head">
                <span className="mc-eyebrow">Registration</span>
                <div className="mc-price">
                  ₹4,999 <span>+ GST</span>
                </div>
              </div>

              <ul className="mc-includes">
                {facts.map((f) => (
                  <li key={f.label}>
                    {f.icon}
                    {f.label}
                  </li>
                ))}
              </ul>

              <form onSubmit={handleSubmit} className="mc-form">
                <div className="mc-form-fields">
                  <label className="mc-field">
                    <span className="mc-field-label">Full Name</span>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      disabled={loading}
                    />
                  </label>
                  <label className="mc-field">
                    <span className="mc-field-label">Email</span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      disabled={loading}
                    />
                  </label>
                  <label className="mc-field">
                    <span className="mc-field-label">Phone</span>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile"
                      disabled={loading}
                    />
                  </label>
                </div>

                {error && <p className="mc-error">{error}</p>}

                <button type="submit" disabled={loading} className="mc-cta">
                  {loading ? "Processing Payment..." : "Secure My Seat — ₹4,999 + GST"}
                </button>
                <p className="mc-secure-note">Secure payment via Razorpay</p>
              </form>
            </div>
          </aside>

          {/* ─── AGENDA — Morning / Afternoon side by side ─── */}
          <section id="agenda" className="mc-agenda">
            <div className="mc-agenda-head">
              <div className="mc-agenda-heading">
                <h2 className="mc-section-title">Full-Day Agenda</h2>
                <span className="mc-agenda-summary">
                  {agendaTotal.time} · {agendaTotal.section} · {agendaTotal.learn}
                </span>
              </div>
              <div className="mc-legend">
                <span>
                  <i className="mc-legend-swatch mc-legend-swatch--live" />
                  Live demo / hands-on
                </span>
                <span>
                  <i className="mc-legend-swatch mc-legend-swatch--break" />
                  Break
                </span>
              </div>
            </div>

            <div className="mc-agenda-cols">
              {agendaBlocks.map((block) => (
                <div key={block.label} className="mc-agenda-block">
                  <div className="mc-agenda-block-head">
                    <span>{block.label}</span>
                    <span className="mc-agenda-block-range">{block.range}</span>
                  </div>
                  <ol className="mc-agenda-list">
                    {block.items.map((item) =>
                      item.kind === "break" ? (
                        <li key={item.start} className="mc-agenda-break">
                          <span>
                            {item.section} · {item.start}–{item.end}
                          </span>
                        </li>
                      ) : (
                        <li
                          key={item.start}
                          className={`mc-agenda-item${item.kind === "live" ? " mc-agenda-item--live" : ""}`}
                        >
                          <span className="mc-agenda-time">
                            <b>{item.start}</b>
                            <small>{item.end}</small>
                          </span>
                          <div className="mc-agenda-body">
                            <div className="mc-agenda-session">{item.section}</div>
                            <div className="mc-agenda-coverage">{item.learn}</div>
                          </div>
                        </li>
                      )
                    )}
                  </ol>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="mc-overlay">
          <div className="mc-popup">
            <div className="mc-popup-icon">🎉</div>
            <h2>Registration Successful</h2>
            <p>Your seat for the Smart Manufacturing &amp; AI Masterclass 2026 is confirmed.</p>
            <p>A confirmation will be sent to your email shortly.</p>
            <button onClick={() => setShowSuccess(false)} className="mc-cta mc-cta--small">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
