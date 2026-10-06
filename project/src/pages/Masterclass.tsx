import { useState, useEffect, FormEvent } from "react";
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

// Facts shown inline under the subtitle (replaces the old bottom footer strip)
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
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
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

// Session agenda — full-day format: Time / Session / Coverage & Activity
const agenda = [
  { time: "9:30–9:45", section: "Pre-Assessment & Introduction", learn: "15–20 MCQs, participant expectations, manufacturing challenges" },
  { time: "9:45–10:15", section: "Session 1: From Smart to Autonomous Manufacturing", learn: "Industry 1.0–5.0, Connected → Predictive → Intelligent → Agentic → Autonomous Manufacturing" },
  { time: "10:15–11:00", section: "Session 2: AI & Predictive AI in Manufacturing", learn: "AI/ML basics, manufacturing data, supervised/unsupervised learning, Predictive AI architecture and use cases" },
  { time: "11:00–11:20", section: "LIVE DEMO 1: Predictive AI", learn: "Machine/process data → anomaly detection → prediction → actionable insight" },
  { time: "11:20–11:30", section: "Tea Break", learn: "" },
  { time: "11:30–12:15", section: "Session 3: Generative AI + RAG", learn: "LLM basics, manufacturing knowledge, RAG, embeddings, vector databases, Manufacturing AI Assistant" },
  { time: "12:15–12:40", section: "LIVE DEMO 2: Manufacturing RAG Assistant", learn: "Manual/SOP → knowledge base → technical question → contextual answer" },
  { time: "12:40–1:15", section: "Session 4: AI Agents for Manufacturing", learn: "Agent vs chatbot, tools, memory, reasoning, workflows, event-based agents, human-in-the-loop" },
  { time: "1:15–2:00", section: "Lunch Break", learn: "" },
  { time: "2:00–2:30", section: "Session 5: AI + PLC / SCADA / IIoT Integration", learn: "OPC UA, MQTT, APIs, Edge, Historian, AI architecture, AI output to CMMS/MES/SCADA" },
  { time: "2:30–2:50", section: "LIVE DEMO 3: Connected Industrial AI", learn: "PLC/SCADA data → AI analysis → RAG → Agent → maintenance action" },
  { time: "2:50–4:05", section: "HANDS-ON PRACTICAL: Build an AI Manufacturing Application", learn: "Participants build a working AI application step-by-step" },
  { time: "4:05–4:15", section: "Tea Break", learn: "" },
  { time: "4:15–4:55", section: "Manufacturing AI Use-Case Workshop", learn: "Teams identify real problems and develop AI solution concepts" },
  { time: "4:55–5:15", section: "Multi-Agent & Autonomous Manufacturing", learn: "Production + Quality + Maintenance Agents, orchestration, governance, journey toward autonomy" },
  { time: "5:15–5:30", section: "Post-Assessment & Wrap-Up", learn: "Same MCQs, pre/post comparison, key takeaways, Q&A" },
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
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

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
      <div className="mc-card">
        {/* LEFT PANEL */}
        <div className="mc-left">
          <div className="mc-live-badge">
            <span className="mc-pulse" />
            LIVE Masterclass 2026
          </div>

          {/* Date / Time / Fee — now at the top of the left column */}
          <div className="mc-info-grid mc-info-grid--left">
            <div className="mc-info-box">
              <div className="mc-info-label">Date</div>
              <div className="mc-info-value">24<sup>TH</sup></div>
              <div className="mc-info-sublabel">SAT · OCTOBER 2026</div>
            </div>
            <div className="mc-info-box">
              <div className="mc-info-label">Time</div>
              <div className="mc-info-value">9:30 AM</div>
              <div className="mc-info-sublabel">IST (8 HOURS LIVE)</div>
            </div>
            <div className="mc-info-box mc-info-box--highlight">
              <div className="mc-info-label">Program Fee</div>
              <div className="mc-info-value mc-info-value--gold">₹4,999</div>
              <div className="mc-info-sublabel">+ GST</div>
            </div>
          </div>

          <div className="mc-speaker-visual">
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
                    <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="rgba(32,63,120,0.35)" strokeWidth="1.2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div className="mc-ring-outer" />
          </div>

          {/* Speaker info + facts — now pushed to the bottom of the column */}
          <div className="mc-speaker-info">
            <h2 className="mc-speaker-name">KAPIL KHURANA</h2>
            <p className="mc-speaker-meta">
              Certified SIRI Assessor (CSA)<br />
              Author – Digital Revolution: Industry 4.0 & IIoT<br />
              25+ Years of Industry Experience
            </p>
            <div className="mc-speaker-tags">
              <span>Industrial Automation</span>
              <span>Smart Manufacturing</span>
              <span>Digital Transformation</span>
            </div>
          </div>

          <div className="mc-facts-left">
            {facts.map((f) => (
              <span key={f.label} className="mc-fact">
                {f.icon}
                {f.label}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="mc-right">
          <div className="mc-header">
            <h1 className="mc-title">
              SMART MANUFACTURING <span className="mc-title-accent">& AI MASTERCLASS</span>
            </h1>
            <p className="mc-subtitle">
              From Industry 4.0 & 5.0 to AI-Driven Autonomous Factories
            </p>
          </div>

          <div className="mc-divider" />

          {/* AGENDA TABLE */}
          <div className="mc-agenda">
            <div className="mc-agenda-scroll">
              <table className="mc-agenda-table">
                <thead>
                  <tr>
                    <th className="mc-agenda-col-time">Time</th>
                    <th className="mc-agenda-col-session">Session</th>
                    <th>Coverage / Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {agenda.map((item, idx) => (
                    <tr key={idx}>
                      <td className="mc-agenda-col-time">{item.time}</td>
                      <td className="mc-agenda-col-session">{item.section}</td>
                      <td className="mc-agenda-col-learn">{item.learn}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="mc-agenda-total-row">
                    <td className="mc-agenda-col-time">{agendaTotal.time}</td>
                    <td className="mc-agenda-col-session">{agendaTotal.section}</td>
                    <td className="mc-agenda-col-learn">{agendaTotal.learn}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="mc-divider" />

          <form onSubmit={handleSubmit} className="mc-form">
            <div className="mc-form-row">
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
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="mc-overlay">
          <div className="mc-popup">
            <div className="mc-popup-icon">🎉</div>
            <h2>Registration Successful</h2>
            <p>Your seat for the Smart Manufacturing & AI Masterclass 2026 is confirmed.</p>
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