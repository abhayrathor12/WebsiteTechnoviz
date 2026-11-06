import SEO from "../components/SEO";
import { PAGE_SEO } from "../seo/pages.js";
import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import {
  createOrder,
  verifyPayment,
  RegistrationData,
} from "../api";
import "./Masterclass.css";
import { loadRazorpayScript } from "../utils/razorpay";
import kapimage from "../public/kaps.webp";

const initialForm: RegistrationData = {
  name: "",
  email: "",
  phone: "",
};

const facts = [
  {
    label: "7.5 Hours LIVE",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: "Limited Seats",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Certificate",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="6" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
  },
  {
    label: "Online Session",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

type AgendaItem = {
  start: string;
  end: string;
  section: string;
  learn?: string;
  kind?: "live" | "break";
};

const agendaBlocks: {
  label: string;
  range: string;
  items: AgendaItem[];
}[] = [
  {
    label: "Morning",
    range: "10:00 AM – 1:20 PM",
    items: [
      {
        start: "10:00",
        end: "10:10",
        section: "Pre-Assessment & Introduction",
        learn: "15–20 MCQs, participant expectations, manufacturing challenges",
      },
      {
        start: "10:10",
        end: "10:35",
        section: "Session 1: From Smart to Autonomous Manufacturing",
        learn: "Industry 1.0–5.0, Connected → Predictive → Intelligent → Agentic → Autonomous Manufacturing",
      },
      {
        start: "10:35",
        end: "11:15",
        section: "Session 2: AI & Predictive AI in Manufacturing",
        learn: "AI/ML basics, manufacturing data, supervised/unsupervised learning, Predictive AI architecture and use cases",
      },
      {
        start: "11:15",
        end: "11:35",
        section: "LIVE DEMO 1: Predictive AI",
        learn: "Machine/process data → anomaly detection → prediction → actionable insight",
        kind: "live",
      },
      {
        start: "11:35",
        end: "11:45",
        section: "Tea Break",
        kind: "break",
      },
      {
        start: "11:45",
        end: "12:25",
        section: "Session 3: Generative AI + RAG",
        learn: "LLM basics, manufacturing knowledge, RAG, embeddings, vector databases, Manufacturing AI Assistant",
      },
      {
        start: "12:25",
        end: "12:50",
        section: "LIVE DEMO 2: Manufacturing RAG Assistant",
        learn: "Manual/SOP → knowledge base → technical question → contextual answer",
        kind: "live",
      },
      {
        start: "12:50",
        end: "1:20",
        section: "Session 4: AI Agents for Manufacturing",
        learn: "Agent vs chatbot, tools, memory, reasoning, workflows, event-based agents, human-in-the-loop",
      },
    ],
  },
  {
    label: "Afternoon",
    range: "2:20 PM – 5:30 PM",
    items: [
      {
        start: "1:20",
        end: "2:20",
        section: "Lunch Break",
        kind: "break",
      },
      {
        start: "2:20",
        end: "2:50",
        section: "Session 5: AI + PLC / SCADA / IIoT Integration",
        learn: "OPC UA, MQTT, APIs, Edge, Historian, AI architecture, AI output to CMMS/MES/SCADA",
      },
      {
        start: "2:50",
        end: "3:10",
        section: "LIVE DEMO 3: Connected Industrial AI",
        learn: "PLC/SCADA data → AI analysis → RAG → Agent → maintenance action",
        kind: "live",
      },
      {
        start: "3:10",
        end: "3:45",
        section: "HANDS-ON PRACTICAL: Build an AI Manufacturing Application",
        learn: "Participants build a working AI application step-by-step",
        kind: "live",
      },
      {
        start: "3:45",
        end: "4:15",
        section: "Manufacturing AI Use-Case Workshop",
        learn: "Teams identify real problems and develop AI solution concepts",
      },
      {
        start: "4:15",
        end: "4:25",
        section: "Tea Break",
        kind: "break",
      },
      {
        start: "4:25",
        end: "5:00",
        section: "Multi-Agent & Autonomous Manufacturing",
        learn: "Production + Quality + Maintenance Agents, orchestration, governance, journey toward autonomy",
      },
      {
        start: "5:00",
        end: "5:30",
        section: "Post-Assessment & Wrap-Up",
        learn: "Same MCQs, pre/post comparison, key takeaways, Q&A",
      },
    ],
  },
];

const agendaTotal = {
  time: "Total: Full Day (10:00–5:30)",
  section: "Hands-On Masterclass",
  learn: "Live demos, hands-on practical & use-case workshop",
};

const clientLogos = [
  { name: "APL", src: "/clientlogo/Apl.png" },
  { name: "Carrier", src: "/clientlogo/carrier.png" },
  { name: "CDAC", src: "/clientlogo/cdac.png" },
  { name: "DRDO", src: "/clientlogo/DRDO.png" },
  { name: "Fabcon", src: "/clientlogo/Fabcon.jpeg" },
  { name: "Honda", src: "/clientlogo/Honda.png" },
  { name: "Jubilant", src: "/clientlogo/jubilent.png" },
  { name: "Maruti", src: "/clientlogo/Maruti.png" },
  { name: "MeitY", src: "/clientlogo/MEITT.png" },
  { name: "Multi", src: "/clientlogo/multi.png" },
  { name: "NALCO", src: "/clientlogo/nalco-1.png" },
  { name: "SMS", src: "/clientlogo/SMS.png" },
];

export default function Masterclass() {
  const [imgError, setImgError] = useState(false);
  const [form, setForm] = useState<RegistrationData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate(): string | null {
    if (!form.name.trim()) return "Please enter your name.";

    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      return "Please enter a valid email.";
    }

    if (!/^\d{10}$/.test(form.phone.trim())) {
      return "Please enter a valid 10-digit phone number.";
    }

    return null;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        setError(
          "Could not load payment gateway. Please check your connection and try again."
        );
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

        theme: {
          color: "#203f78",
        },

        handler: async (response: any) => {
          try {
            const [result, verifyError] = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              registration_data: form,
            });

            setLoading(false);

            if (verifyError || !result?.success) {
              setError(
                verifyError ||
                  result?.message ||
                  "Payment verification failed. Please contact support."
              );
              return;
            }

            setShowSuccess(true);
            setForm(initialForm);
          } catch {
            setLoading(false);
            setError(
              "Payment verification could not be completed. Please contact support."
            );
          }
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      });

      razorpay.on("payment.failed", () => {
        setLoading(false);
        setError("Payment failed. Please try again.");
      });

      razorpay.open();
    } catch {
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="mc-page">
      <SEO
        {...PAGE_SEO["/Smart-Manufacturing-AI-Masterclass"]}
        path="/Smart-Manufacturing-AI-Masterclass"
      />

      <div className="mc-shell">
        <div className="mc-content">

          {/* HEADER */}
          <header className="mc-topbar">
            <div className="mc-topbar-copy">
              <div className="mc-live-badge">
                <span className="mc-pulse" />
                LIVE Masterclass 2026
              </div>

              <h1 className="mc-title">
                Smart Manufacturing{" "}
                <span className="mc-title-accent">
                  &amp; AI Masterclass
                </span>
              </h1>

              <p className="mc-subtitle">
                From Industry 4.0 &amp; 5.0 to AI-Driven Autonomous Factories
              </p>
            </div>

            <dl className="mc-event-meta">
              <div>
                <dt>Date</dt>
                <dd>Sat, 21 Nov 2026</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>10:00 AM IST</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>7.5 Hours Live</dd>
              </div>
              <div>
                <dt>Fee</dt>
                <dd>₹4,999 <small>+ GST</small></dd>
              </div>
            </dl>
          </header>

          {/* TRAINER */}
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
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(32,63,120,0.35)"
                      strokeWidth="1.2"
                    >
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

          {/* =================================
              AGENDA - MOVED BEFORE SIRI
          ================================= */}
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
                          className={`mc-agenda-item${
                            item.kind === "live" ? " mc-agenda-item--live" : ""
                          }`}
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

          {/* =================================
              ABOUT SIRI - REDESIGNED
          ================================= */}
          <section
            className="mc-feature-section mc-siri-section"
            aria-labelledby="mc-siri-title"
          >
            <div className="mc-feature-heading">
              <span className="mc-feature-eyebrow">INDUSTRY 4.0</span>
              <h2 id="mc-siri-title" className="mc-section-title">
                About SIRI
              </h2>
              <p>
                Understand where your manufacturing organization stands on its
                Industry 4.0 journey and discover a structured path towards
                digital transformation.
              </p>
            </div>

            <div className="mc-siri-layout">
              <div
                className="mc-siri-visual"
                aria-label="Smart Industry Readiness Index"
              >
                <div className="mc-siri-brand">
                  <div className="mc-siri-mark" aria-hidden="true">
                    <span /><span /><span /><span />
                  </div>
                  <div className="mc-siri-logo-text">
                    <strong>SMART</strong>
                    <strong>INDUSTRY</strong>
                    <strong>READINESS</strong>
                    <strong>INDEX</strong>
                  </div>
                </div>

                <p className="mc-siri-tagline">
                  CATALYSING THE TRANSFORMATION OF MANUFACTURING
                </p>
                <span className="mc-siri-certified">Certified Framework</span>
              </div>

              <div className="mc-siri-copy">
                <h3>What is SIRI?</h3>
                <p>
                  The Smart Industry Readiness Index (SIRI) is a comprehensive
                  framework developed to help organizations assess their
                  Industry 4.0 readiness. It provides a structured approach to
                  evaluate and improve manufacturing capabilities in the
                  digital age.
                </p>

                <div className="mc-feature-points">
                  <div className="mc-feature-point">
                    <span className="mc-point-icon" aria-hidden="true">✓</span>
                    <div>
                      <h4>Assessment Framework</h4>
                      <p>
                        Systematic evaluation of digital transformation
                        readiness across multiple dimensions.
                      </p>
                    </div>
                  </div>

                  <div className="mc-feature-point">
                    <span className="mc-point-icon" aria-hidden="true">✓</span>
                    <div>
                      <h4>Global Standard</h4>
                      <p>
                        Internationally recognized benchmark for Industry 4.0
                        adoption.
                      </p>
                    </div>
                  </div>

                  <div className="mc-feature-point">
                    <span className="mc-point-icon" aria-hidden="true">✓</span>
                    <div>
                      <h4>Continuous Improvement</h4>
                      <p>
                        Roadmap for progressive enhancement of smart
                        manufacturing capabilities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mc-assessor-card">
              <div className="mc-assessor-icon" aria-hidden="true">✦</div>

              <div className="mc-assessor-copy">
                <span className="mc-feature-eyebrow">CERTIFIED EXPERTISE</span>
                <h3>Kapil Khurana</h3>
                <h4>Founder &amp; Director</h4>

                <div className="mc-assessor-credential">
                  <strong>SIRI Certified Assessor (CSA) | IIT Delhi</strong>
                  <p>
                    Certified in Smart Industry Readiness Index Assessment and
                    Implementation.
                  </p>
                </div>

                <p className="mc-assessor-description">
                  As a SIRI certified professional, Kapil Khurana brings
                  extensive expertise in Industry 4.0 transformation and smart
                  manufacturing implementations. His certification
                  demonstrates a deep understanding of digital readiness
                  assessment frameworks and strategic implementation
                  methodologies.
                </p>

                <ul className="mc-assessor-benefits">
                  <li>Leading digital transformation initiatives</li>
                  <li>Driving Industry 4.0 adoption strategies</li>
                  <li>Expertise in smart manufacturing excellence</li>
                </ul>
              </div>
            </div>
          </section>

          {/* =================================
              DIGITAL REVOLUTION BOOK
          ================================= */}
          <section
            className="mc-feature-section mc-book-section"
            aria-labelledby="mc-book-title"
          >
            <div className="mc-book-layout">
              <div
                className="mc-book-visual-wrap"
                aria-label="Digital Revolution book artwork"
              >
                <span className="mc-book-new">NEW</span>

                <div className="mc-book-cover">
                  <span className="mc-book-author">KAPIL KHURANA</span>
                  <div className="mc-book-cover-rule" />
                  <h3>DIGITAL<br />REVOLUTION</h3>
                  <p className="mc-book-cover-subtitle">
                    A GUIDE TO SUCCESS IN THE TECHNOLOGY-DRIVEN WORLD
                  </p>

                  <div className="mc-book-illustration" aria-hidden="true">
                    <div className="mc-book-illustration-screen">
                      <span /><span /><span />
                    </div>
                    <div className="mc-book-illustration-base" />
                  </div>

                  <div className="mc-book-cover-footer">
                    INDUSTRY 4.0 &amp; INDUSTRIAL IoT
                  </div>
                </div>

                <span className="mc-book-spine">DIGITAL REVOLUTION 4.0</span>
              </div>

              <div className="mc-book-content">
                <span className="mc-feature-eyebrow">FEATURED BOOK</span>

                <h2 id="mc-book-title">
                  Book <em>“Digital Revolution”</em>
                </h2>

                <h3 className="mc-book-industry">Industry 4.0</h3>

                <p className="mc-book-byline">
                  by <strong>Kapil Khurana</strong>
                  <span>•</span>
                  Technoviz Automation
                </p>

                <p className="mc-book-description">
                  Navigate the digital transformation reshaping our world.
                  From workplace evolution to global connectivity, discover
                  strategies to harness innovation while addressing the
                  challenges of technological disruption.
                </p>

                <div className="mc-book-topics">
                  <div className="mc-book-topic">
                    <span className="mc-book-topic-icon" aria-hidden="true">✧</span>
                    <div>
                      <h4>Digital Transformation</h4>
                      <p>Navigate the digital age</p>
                    </div>
                  </div>

                  <div className="mc-book-topic">
                    <span className="mc-book-topic-icon" aria-hidden="true">⌑</span>
                    <div>
                      <h4>Cyber Security</h4>
                      <p>Protect your digital assets</p>
                    </div>
                  </div>

                  <div className="mc-book-topic">
                    <span className="mc-book-topic-icon" aria-hidden="true">⚙</span>
                    <div>
                      <h4>Industrial Automation</h4>
                      <p>Future of manufacturing</p>
                    </div>
                  </div>

                  <div className="mc-book-topic">
                    <span className="mc-book-topic-icon" aria-hidden="true">↗</span>
                    <div>
                      <h4>Industry Evolution</h4>
                      <p>Stay ahead of trends</p>
                    </div>
                  </div>
                </div>

                <a className="mc-book-cta" href="#register">
                  Enquire About the Book <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <div className="mc-book-stats">
              <div className="mc-book-stat">
                <span className="mc-book-stat-icon" aria-hidden="true">☆</span>
                <strong>4.8/5</strong>
                <small>Rating</small>
              </div>

              <div className="mc-book-stat">
                <span className="mc-book-stat-icon" aria-hidden="true">♧</span>
                <strong>10K+</strong>
                <small>Readers</small>
              </div>

              <div className="mc-book-stat">
                <span className="mc-book-stat-icon" aria-hidden="true">♙</span>
                <strong>Bestseller</strong>
                <small>Status</small>
              </div>
            </div>
          </section>

        </div>

        {/* REGISTRATION - UNCHANGED */}
        <aside className="mc-side">
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

              {error && <p className="mc-error" role="alert">{error}</p>}

              <button type="submit" disabled={loading} className="mc-cta">
                {loading
                  ? "Processing Payment..."
                  : "Secure My Seat — ₹4,999 + GST"}
              </button>

              <p className="mc-secure-note">
                Secure payment via Razorpay
              </p>
            </form>
          </div>

          {/* CLIENT LOGO SLIDER - UNCHANGED */}
          <section className="mc-client-logos" aria-label="Our trusted clients">
            <h2 className="mc-client-logos-title">Our Trusted Clients</h2>

            <div className="mc-client-logos-viewport">
              <div className="mc-client-logos-track">
                {[0, 1].map((groupIndex) => (
                  <div
                    className="mc-client-logos-group"
                    key={groupIndex}
                    aria-hidden={groupIndex === 1}
                  >
                    {clientLogos.map((logo) => (
                      <img
                        key={logo.name}
                        src={logo.src}
                        alt={groupIndex === 0 ? logo.name : ""}
                        className="mc-client-logo"
                        loading="lazy"
                        decoding="async"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </aside>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="mc-overlay">
          <div
            className="mc-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mc-success-title"
          >
            <div className="mc-popup-icon">🎉</div>
            <h2 id="mc-success-title">Registration Successful</h2>
            <p>
              Your seat for the Smart Manufacturing &amp; AI Masterclass 2026 is confirmed.
            </p>
            <p>
              A confirmation will be sent to your email shortly.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="mc-cta mc-cta--small"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}