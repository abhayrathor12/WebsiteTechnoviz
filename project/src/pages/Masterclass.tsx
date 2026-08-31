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
    label: "4 Hours LIVE",
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

// Session agenda — demo-driven format: Duration / Session / Demo & Coverage
const agenda = [
  { time: "20 Min", section: "From Smart to Autonomous Manufacturing", learn: "Connected → Predictive → Intelligent → Autonomous Factory, AI + OT architecture" },
  { time: "40 Min", section: "LIVE DEMO 1: Predictive AI", learn: "Machine/process data → AI model → anomaly/failure/quality prediction → actionable insights" },
  { time: "40 Min", section: "LIVE DEMO 2: Generative AI + RAG", learn: "Build a Manufacturing AI Assistant using manuals, SOPs and maintenance knowledge" },
  { time: "40 Min", section: "LIVE DEMO 3: AI Agents for Manufacturing", learn: "Build an AI Agent → analyse abnormality → recommend action → trigger workflow/report" },
  { time: "10 Min", section: "Break", learn: "Short break" },
  { time: "40 Min", section: "LIVE DEMO 4: AI + PLC/SCADA Integration", learn: "PLC/SCADA/IIoT data → AI analysis → recommendation → dashboard/SCADA/action" },
  { time: "20 Min", section: "Multi-Agent Autonomous Factory", learn: "Production + Quality + Maintenance AI Agents working together" },
  { time: "30 Min", section: "Interactive Exercise: Build Your AI Use Case", learn: "Problem → Data → AI → Action → Business Benefit" },
];

const agendaTotal = {
  time: "Total: 4 Hours",
  section: "Demo-Driven Masterclass",
  learn: "70%+ practical demos, use cases & interactive learning",
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
              <div className="mc-info-value">26<sup>TH</sup></div>
              <div className="mc-info-sublabel">SEPTEMBER 2026</div>
            </div>
            <div className="mc-info-box">
              <div className="mc-info-label">Time</div>
              <div className="mc-info-value">10:00 AM</div>
              <div className="mc-info-sublabel">IST (4 HOURS LIVE)</div>
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
                    <th className="mc-agenda-col-time">Duration</th>
                    <th className="mc-agenda-col-session">Session</th>
                    <th>Demo / Coverage</th>
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