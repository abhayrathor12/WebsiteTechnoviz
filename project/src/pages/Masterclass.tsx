import SEO from "../components/SEO";
import { PAGE_SEO } from "../seo/pages.js";
import { useEffect, useState } from "react";
import type { FormEvent, ChangeEvent, ReactNode } from "react";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Bot,
  Brain,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Coffee,
  Cpu,
  Download,
  Factory,
  Globe,
  Layers,
  Lightbulb,
  Lock,
  LogIn,
  Mail,
  MapPin,
  MonitorPlay,
  Phone,
  Settings,
  ShieldCheck,
  Star,
  Timer,
  TrendingUp,
  User,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  createOrder,
  testRegister,
  verifyPayment,
  RegistrationData,
} from "../api";
import "./Masterclass.css";
import { loadRazorpayScript } from "../utils/razorpay";
import kapimage from "../public/kaps.webp";
import bookImage from "../public/booook.webp";
import techLogo from "../public/Techlogo.webp";
import siriLogo from "../public/siri.jpg";

// Razorpay checkout (loaded from checkout.razorpay.com by loadRazorpayScript)
type RazorpayInstance = {
  open: () => void;
  on: (event: "payment.failed", cb: (resp: { error?: { description?: string } }) => void) => void;
};
type RazorpayConstructor = new (options: Record<string, unknown>) => RazorpayInstance;

// TESTING ONLY: VITE_SKIP_PAYMENT=1 registers without Razorpay (real payment is the default)
const SKIP_PAYMENT = import.meta.env.VITE_SKIP_PAYMENT === "1";

const MASTERCLASS_NAME = "Smart Manufacturing & AI Masterclass 2026";
const EVENT_DATE = "Sat, 12 Dec 2026";
const PRICE_LABEL = "₹4,999";
const PRICE_TOTAL = "₹5,898.82";

const initialForm: RegistrationData = {
  name: "",
  email: "",
  phone: "",
  company_email: "",
  pin_code: "",
  company_name: "",
};

/* ---------------- Page data ---------------- */

const heroChips = [
  { icon: CalendarDays, label: EVENT_DATE },
  { icon: Clock, label: "10:00 AM – 5:30 PM IST" },
  { icon: Timer, label: "Full Day LIVE" },
  { icon: MonitorPlay, label: "Online Session" },
];

const heroIcons: LucideIcon[] = [Factory, Cpu, Brain, Bot];

const typewriterPhrases = ["Live Demos", "Practical System Showcase", "Certificate of Completion"];

type AgendaKind = "assessment" | "session" | "live" | "handson" | "workshop" | "break";

type AgendaItem = {
  start: string;
  end: string;
  title: string;
  learn?: string;
  kind: AgendaKind;
};

const agendaBlocks: { label: string; range: string; items: AgendaItem[] }[] = [
  {
    label: "Morning",
    range: "10:00 AM – 1:20 PM",
    items: [
      { start: "10:00", end: "10:10", kind: "assessment", title: "Pre-Assessment & Introduction", learn: "15–20 MCQs, participant expectations, manufacturing challenges" },
      { start: "10:10", end: "10:35", kind: "session", title: "Session 1: From Smart to Autonomous Manufacturing", learn: "Industry 1.0–5.0, Connected → Predictive → Intelligent → Agentic → Autonomous Manufacturing" },
      { start: "10:35", end: "11:15", kind: "session", title: "Session 2: AI & Predictive AI in Manufacturing", learn: "AI/ML basics, manufacturing data, supervised/unsupervised learning, Predictive AI architecture and use cases" },
      { start: "11:15", end: "11:35", kind: "live", title: "LIVE DEMO 1: Predictive AI", learn: "Machine/process data → anomaly detection → prediction → actionable insight" },
      { start: "11:35", end: "11:45", kind: "break", title: "Tea Break" },
      { start: "11:45", end: "12:25", kind: "session", title: "Session 3: Generative AI + RAG", learn: "LLM basics, manufacturing knowledge, RAG, embeddings, vector databases, Manufacturing AI Assistant" },
      { start: "12:25", end: "12:50", kind: "live", title: "LIVE DEMO 2: Manufacturing RAG Assistant", learn: "Manual/SOP → knowledge base → technical question → contextual answer" },
      { start: "12:50", end: "1:20", kind: "session", title: "Session 4: AI Agents for Manufacturing", learn: "Agent vs chatbot, tools, memory, reasoning, workflows, event-based agents, human-in-the-loop" },
    ],
  },
  {
    label: "Afternoon",
    range: "1:20 PM – 5:30 PM",
    items: [
      { start: "1:20", end: "2:20", kind: "break", title: "Lunch Break" },
      { start: "2:20", end: "2:50", kind: "session", title: "Session 5: AI + PLC / SCADA / IIoT Integration", learn: "OPC UA, MQTT, APIs, Edge, Historian, AI architecture, AI output to CMMS/MES/SCADA" },
      { start: "2:50", end: "3:10", kind: "live", title: "LIVE DEMO 3: Connected Industrial AI", learn: "PLC/SCADA data → AI analysis → RAG → Agent → maintenance action" },
      { start: "3:10", end: "3:45", kind: "handson", title: "PRACTICAL SYSTEM SHOWCASE: Build an AI Manufacturing Application", learn: "Participants build a working AI application step-by-step" },
      { start: "3:45", end: "4:15", kind: "workshop", title: "Manufacturing AI Use-Case Workshop", learn: "Teams identify real problems and develop AI solution concepts" },
      { start: "4:15", end: "4:25", kind: "break", title: "Tea Break" },
      { start: "4:25", end: "5:00", kind: "session", title: "Multi-Agent & Autonomous Manufacturing", learn: "Production + Quality + Maintenance Agents, orchestration, governance, journey toward autonomy" },
      { start: "5:00", end: "5:30", kind: "assessment", title: "Post-Assessment & Wrap-Up", learn: "Same MCQs, pre/post comparison, key takeaways, Q&A" },
    ],
  },
];

const agendaIcon: Record<AgendaKind, LucideIcon> = {
  assessment: ClipboardCheck,
  session: BookOpen,
  live: MonitorPlay,
  handson: Wrench,
  workshop: Users,
  break: Coffee,
};

const highlights: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Timer,
    title: "Full Day of Live Session",
    desc: "A full-day, instructor-led online masterclass from 10:00 AM to 5:30 PM IST, with live Q&A throughout the day.",
  },
  {
    icon: MonitorPlay,
    title: "Live Demos",
    desc: "Watch Predictive AI, a Manufacturing RAG Assistant and Connected Industrial AI working on real machine and process data.",
  },
  {
    icon: Wrench,
    title: "Practical System Showcase",
    desc: "Build a working AI manufacturing application step by step during the session, not just theory slides.",
  },
  {
    icon: Lightbulb,
    title: "Use-Case Workshop",
    desc: "Work in teams on real manufacturing problems and shape AI solution concepts you can take back to your plant.",
  },
  {
    icon: Layers,
    title: "PLC / SCADA / IIoT to AI",
    desc: "Learn how OPC UA, MQTT, Edge and Historians connect shop-floor data to AI, CMMS, MES and SCADA.",
  },
  {
    icon: Award,
    title: "Portal Access & Certificate",
    desc: "Get a personal portal login for the welcome video and Pre Assessment, and download your certificate there.",
  },
];

const trainerTags = ["Industrial Automation", "Smart Manufacturing", "Digital Transformation"];

const trainerBenefits = [
  "Leading digital transformation initiatives",
  "Driving Industry 4.0 adoption strategies",
  "Expertise in smart manufacturing excellence",
];

const siriPoints = [
  {
    icon: ClipboardCheck,
    title: "Assessment Framework",
    desc: "Systematic evaluation of digital transformation readiness across multiple dimensions.",
  },
  {
    icon: Globe,
    title: "Global Standard",
    desc: "Internationally recognized benchmark for Industry 4.0 adoption.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    desc: "Roadmap for progressive enhancement of smart manufacturing capabilities.",
  },
];

const bookTopics = [
  { icon: Zap, title: "Digital Transformation", desc: "Navigate the digital age" },
  { icon: ShieldCheck, title: "Cyber Security", desc: "Protect your digital assets" },
  { icon: Settings, title: "Industrial Automation", desc: "Future of manufacturing" },
  { icon: TrendingUp, title: "Industry Evolution", desc: "Stay ahead of trends" },
];

const bookStats = [
  { icon: Star, value: "4.8/5", label: "Rating" },
  { icon: Users, value: "10K+", label: "Readers" },
  { icon: Award, value: "Bestseller", label: "Status" },
];

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

const certificateSteps: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: LogIn, title: "Get your portal login", desc: "After registration you receive your Masterclass Portal login by email." },
  { icon: ClipboardCheck, title: "Complete the Pre Assessment", desc: "Attempt the Pre Assessment in the portal. It opens when the masterclass starts." },
  { icon: MonitorPlay, title: "Attend the masterclass", desc: `Join the full-day live session on ${EVENT_DATE}.` },
  { icon: Download, title: "Download your certificate", desc: "Once our team activates it, download your certificate from the Certificate tab." },
];

const formFields: {
  name: keyof RegistrationData;
  label: string;
  type: string;
  placeholder: string;
  icon: LucideIcon;
  inputMode?: "numeric";
  maxLength?: number;
}[] = [
  // Shown 2 per row (sm and up), in this order
  { name: "name", label: "Full Name", type: "text", placeholder: "Your full name", icon: User },
  { name: "phone", label: "Phone", type: "tel", placeholder: "10-digit mobile", icon: Phone, inputMode: "numeric", maxLength: 10 },
  { name: "email", label: "Email", type: "email", placeholder: "you@example.com", icon: Mail },
  { name: "company_name", label: "Company Name (Optional)", type: "text", placeholder: "Company name", icon: Building2 },
  { name: "company_email", label: "Company Email (Optional)", type: "email", placeholder: "Company email", icon: Mail },
  { name: "pin_code", label: "Pin Code (Optional)", type: "text", placeholder: "6-digit pin code", icon: MapPin, inputMode: "numeric", maxLength: 6 },
];

/* ---------------- Small building blocks ---------------- */

/** One line that types a phrase, pauses, erases it and types the next one.
 * A single element, so two phrases can never show on top of each other. */
function Typewriter({ phrases }: { phrases: string[] }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const phrase = phrases[phraseIndex];

  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      // No typing: just show each full phrase for a few seconds
      setLength(phrase.length);
      const t = window.setTimeout(() => setPhraseIndex((i) => (i + 1) % phrases.length), 3000);
      return () => window.clearTimeout(t);
    }
    let delay = deleting ? 35 : 75;
    if (!deleting && length === phrase.length) delay = 1800; // hold the full phrase
    if (deleting && length === 0) delay = 300; // short gap before the next phrase
    const t = window.setTimeout(() => {
      if (!deleting && length === phrase.length) setDeleting(true);
      else if (deleting && length === 0) {
        setDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      } else setLength((n) => n + (deleting ? -1 : 1));
    }, delay);
    return () => window.clearTimeout(t);
  }, [length, deleting, phrase, phrases.length]);

  return (
    <div className="h-8 flex items-center gap-2" aria-label={phrases.join(", ")}>
      <div className="w-2 h-2 rounded-full bg-[#203f78] flex-shrink-0" />
      <span className="text-[#203f78] font-bold text-sm sm:text-base lg:text-lg whitespace-nowrap" aria-hidden="true">
        {phrase.slice(0, length)}
        <span className="mc-caret ml-0.5 inline-block w-[2px] h-[1.1em] align-middle bg-[#ddaf26]" />
      </span>
    </div>
  );
}

function SectionTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-2xl sm:text-3xl font-bold text-[#203f78] ${className}`}>{children}</h2>
  );
}

/** Plain HTML/CSS sample certificate (no image file needed). */
function SampleCertificate() {
  return (
    <div className="relative mx-auto w-full max-w-xl bg-white p-2 sm:p-3 shadow-xl rounded-sm border border-gray-200">
      <div className="relative border-[3px] border-[#203f78] p-1">
        <div className="relative border border-[#ddaf26] px-5 py-6 sm:px-10 sm:py-8 text-center bg-gradient-to-br from-white via-white to-blue-50/40 overflow-hidden">
          {/* Corner accents */}
          <span className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-[#ddaf26]" aria-hidden="true" />
          <span className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-[#ddaf26]" aria-hidden="true" />
          <span className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-[#ddaf26]" aria-hidden="true" />
          <span className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-[#ddaf26]" aria-hidden="true" />

          {/* Sample watermark */}
          <span
            className="pointer-events-none absolute inset-0 flex items-center justify-center text-5xl sm:text-7xl font-black tracking-[0.3em] text-[#203f78]/[0.05] -rotate-12 select-none"
            aria-hidden="true"
          >
            SAMPLE
          </span>

          <img src={techLogo} alt="Technoviz Automation" className="mx-auto h-9 sm:h-11 w-auto object-contain" />

          <p className="mt-4 text-[10px] sm:text-xs font-semibold tracking-[0.35em] text-[#ddaf26] uppercase">
            Certificate
          </p>
          <h3 className="mt-1 text-xl sm:text-3xl font-bold text-[#203f78] font-serif">of Completion</h3>

          <p className="mt-4 text-[11px] sm:text-sm text-gray-500">This is to certify that</p>
          <p className="mt-2 text-lg sm:text-2xl font-semibold italic text-gray-800 font-serif border-b border-gray-300 inline-block px-6 pb-1">
            Participant Name
          </p>
          <p className="mt-3 text-[11px] sm:text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
            has successfully attended and completed the
            <br />
            <span className="font-bold text-[#203f78]">{MASTERCLASS_NAME}</span>
            <br />
            held online on {EVENT_DATE}.
          </p>

          <div className="mt-6 flex items-end justify-between gap-4">
            <div className="text-left">
              <p className="text-[11px] sm:text-sm font-semibold text-gray-800">{EVENT_DATE.replace("Sat, ", "")}</p>
              <p className="mt-1 border-t border-gray-400 pt-1 text-[9px] sm:text-[11px] text-gray-500 uppercase tracking-wider">Date</p>
            </div>

            <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#ddaf26] to-[#b88a12] flex items-center justify-center shadow-md ring-4 ring-[#ddaf26]/25">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>

            <div className="text-right">
              <p className="text-[11px] sm:text-sm font-semibold italic text-gray-800 font-serif">Kapil Khurana</p>
              <p className="mt-1 border-t border-gray-400 pt-1 text-[9px] sm:text-[11px] text-gray-500 uppercase tracking-wider">Founder &amp; Director</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Page ---------------- */

export default function Masterclass() {
  const [imgError, setImgError] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const [form, setForm] = useState<RegistrationData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name } = e.target;
    // Pin code accepts digits only
    const value = name === "pin_code" ? e.target.value.replace(/\D/g, "") : e.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate(): string | null {
    // Required fields
    if (!form.name.trim()) return "Please enter your name.";

    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      return "Please enter a valid email.";
    }

    if (!/^\d{10}$/.test(form.phone.trim())) {
      return "Please enter a valid 10-digit phone number.";
    }

    // Optional fields: only checked if the user filled them in
    const companyEmail = form.company_email?.trim() || "";
    if (companyEmail && !/^\S+@\S+\.\S+$/.test(companyEmail)) {
      return "Please enter a valid company email, or leave it blank.";
    }

    const pin = form.pin_code?.trim() || "";
    if (pin && !/^\d{6}$/.test(pin)) {
      return "Pin code must be 6 digits, or leave it blank.";
    }

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

    try {
      const registrationData: RegistrationData = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),

        // Optional fields
        company_email: form.company_email?.trim() || "",
        pin_code: form.pin_code?.trim() || "",
        company_name: form.company_name?.trim() || "",
      };

      // TESTING ONLY: register without payment. Needs VITE_SKIP_PAYMENT=1 here
      // and MASTERCLASS_SKIP_PAYMENT=1 on the backend. Never set on production.
      if (SKIP_PAYMENT) {
        const [result, testError] = await testRegister(registrationData);
        setLoading(false);
        if (testError || !result?.success) {
          setError(testError || result?.message || "Registration failed. Please try again.");
          return;
        }
        setShowSuccess(true);
        setForm(initialForm);
        return;
      }

      // Real payment: Razorpay checkout -> backend verifies the payment and saves the registration
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

      const RazorpayCheckout = (window as unknown as { Razorpay: RazorpayConstructor }).Razorpay;
      const razorpay = new RazorpayCheckout({
        key: order.key,
        amount: order.amount,
        currency: "INR",
        name: MASTERCLASS_NAME,
        description: "Live Masterclass Registration",
        order_id: order.order_id,
        prefill: {
          name: registrationData.name,
          email: registrationData.email,
          contact: registrationData.phone,
        },
        theme: { color: "#203f78" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          const [result, verifyError] = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            registration_data: registrationData,
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
          // User closed the payment window without paying
          ondismiss: () => setLoading(false),
        },
      });

      razorpay.on("payment.failed", (resp: { error?: { description?: string } }) => {
        setLoading(false);
        setError(resp.error?.description || "Payment failed. Please try again.");
      });

      razorpay.open();
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen pt-16 lg:pt-20">
      <SEO
        {...PAGE_SEO["/Smart-Manufacturing-AI-Masterclass"]}
        path="/Smart-Manufacturing-AI-Masterclass"
      />

      {/* Mobile: hero → form → sections. Desktop: content left, form sticky on the right. */}
      <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">

        {/* ================= HERO ================= */}
        <div className="order-1 lg:col-start-1 lg:row-start-1 relative overflow-hidden px-4 sm:px-6 lg:px-10 xl:px-16 pt-10 sm:pt-12 lg:pt-14 pb-4 space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ddaf26] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#203f78] shadow-sm">
            <span className="mc-pulse w-2 h-2 rounded-full bg-[#203f78]" aria-hidden="true" />
            LIVE Masterclass 2026
          </div>

          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mt-1" aria-hidden="true">
              {heroIcons.map((Icon, i) => (
                <div key={i} className={`absolute inset-0 flex items-center justify-center mc-icon-rotate-${i + 1}`}>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-[#203f78] to-[#2c5a9e] rounded-lg shadow-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                </div>
              ))}
            </div>

            <h1 className="flex-1 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#203f78] leading-tight">
              Smart Manufacturing &amp; AI Masterclass 2026
            </h1>
          </div>

          <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-700 font-semibold">
            From Industry 4.0 &amp; 5.0 to AI-Driven Autonomous Factories
          </h2>

          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            A full-day live masterclass on how AI is changing the shop floor: Predictive AI, Generative AI
            with RAG, AI Agents and connecting PLC / SCADA / IIoT data to AI. Learn through live demos, a
            practical system showcase and a real use-case workshop, led by an Industry 4.0 expert.
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3 pt-1 sm:pt-2">
            {heroChips.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#203f78]/20 text-xs sm:text-sm"
              >
                <Icon size={14} className="text-[#203f78]" />
                <span className="font-medium text-gray-700">{label}</span>
              </div>
            ))}
          </div>

          {/* Typewriter highlights (same as the SLM landing page, without the register button) */}
          <div className="pt-3 sm:pt-5 flex flex-col gap-2">
            <Typewriter phrases={typewriterPhrases} />
            <p className="text-xs sm:text-sm text-gray-600 italic flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#203f78]" />
              Limited seats · Live online session
            </p>
          </div>
        </div>

        {/* ================= REGISTRATION FORM (right, sticky) ================= */}
        {/* lg:pb-16 keeps the sticky form clear of the footer at the end of the page */}
        <aside className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:border-l border-gray-200/60 lg:pb-16">
          <div className="px-4 sm:px-6 py-8 lg:py-0 lg:pt-8 lg:px-8 xl:px-12 lg:sticky lg:top-24 flex justify-center">
            <div
              id="register"
              className="w-full max-w-[440px] bg-white rounded-2xl shadow-xl p-6 sm:p-7 border border-gray-200 scroll-mt-24"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold tracking-widest uppercase text-[#ddaf26]">Registration</p>
                  <h2 className="text-lg sm:text-xl font-bold text-[#203f78] mt-1">Secure Your Seat</h2>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-extrabold text-[#203f78] leading-none whitespace-nowrap">
                    {PRICE_LABEL} <span className="text-sm font-semibold text-gray-500">+ GST</span>
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">Total {PRICE_TOTAL}</p>
                </div>
              </div>

              <ul className="mt-3 grid grid-cols-2 gap-1.5 text-xs">
                {["Full Day LIVE", "Limited Seats", "Certificate", "Online Session"].map((item) => (
                  <li key={item} className="flex items-center gap-1.5 rounded-lg bg-blue-50/70 px-2.5 py-1.5 font-medium text-[#203f78]">
                    <CheckCircle2 size={13} className="flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <form onSubmit={handleSubmit} className="mt-4 space-y-3" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3">
                {formFields.map(({ name, label, type, placeholder, icon: Icon, inputMode, maxLength }) => (
                  <label key={name} className="block min-w-0">
                    <span className="block text-[13px] font-medium mb-1 text-gray-700">{label}</span>
                    <span className="relative block">
                      <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      <input
                        type={type}
                        name={name}
                        value={form[name] || ""}
                        onChange={handleChange}
                        placeholder={placeholder}
                        inputMode={inputMode}
                        maxLength={maxLength}
                        disabled={loading}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#203f78] focus:border-transparent transition-all disabled:bg-gray-50"
                      />
                    </span>
                  </label>
                ))}
                </div>

                {error && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-[#203f78] to-[#2c5a9e] text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <>
                      Secure My Seat – {PRICE_LABEL} + GST
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                  <Lock size={12} />
                  Secure payment via Razorpay
                </p>
              </form>

            </div>
          </div>
        </aside>

        {/* ================= CONTENT SECTIONS ================= */}
        <div className="order-3 lg:col-start-1 lg:row-start-2 px-4 sm:px-6 lg:px-4 xl:px-10 pt-4 pb-14 space-y-10 sm:space-y-12 text-gray-700">

          {/* OVERVIEW */}
          <section id="overview" className="rounded-2xl py-5 sm:p-8 scroll-mt-24">
            <SectionTitle className="mb-4">Overview</SectionTitle>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              The Smart Manufacturing &amp; AI Masterclass 2026 by Technoviz Automation takes you on the journey
              from Industry 4.0 and 5.0 to AI-driven autonomous factories. In one focused day you see how
              connected, predictive, intelligent and agentic manufacturing work in practice, and where AI fits
              into your existing PLC, SCADA and IIoT systems.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3 text-sm sm:text-base">
              The masterclass is built around doing, not just listening: live demos on real
              machine and process data, a practical system showcase where you build a working AI manufacturing
              application, and a use-case workshop on real plant problems. It is designed for manufacturing
              professionals, automation and maintenance engineers, plant leaders and students who want
              practical, job-ready AI skills.
            </p>
          </section>

          {/* AGENDA */}
          <section id="agenda" className="rounded-2xl py-5 sm:p-8 scroll-mt-24">
            <SectionTitle className="mb-3 sm:mb-4">Agenda</SectionTitle>
            <p className="text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8">
              Full-day agenda · {EVENT_DATE} · 10:00 AM – 5:30 PM IST
            </p>

            <div className="space-y-8">
              {agendaBlocks.map((block) => (
                <div key={block.label}>
                  <div className="flex items-center justify-between gap-3 border-b-2 border-[#203f78] pb-2 mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#203f78]">{block.label}</h3>
                    <span className="text-xs sm:text-sm font-semibold text-gray-500">{block.range}</span>
                  </div>

                  <ol className="divide-y divide-gray-200">
                    {block.items.map((item) => {
                      const Icon = agendaIcon[item.kind];
                      const isBreak = item.kind === "break";
                      const isLive = item.kind === "live" || item.kind === "handson";
                      return (
                        <li key={`${block.label}-${item.start}`} className="flex items-start gap-3 sm:gap-4 py-3 sm:py-4">
                          <span className="w-[72px] sm:w-24 flex-shrink-0 pt-1.5 text-xs sm:text-sm font-semibold text-gray-800 tabular-nums">
                            {item.start} – {item.end}
                          </span>
                          <span
                            className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center ${
                              isBreak
                                ? "bg-amber-50 text-amber-600 ring-1 ring-amber-200"
                                : isLive
                                ? "bg-[#ddaf26] text-white shadow-sm"
                                : "bg-[#203f78] text-white shadow-sm"
                            }`}
                            aria-hidden="true"
                          >
                            <Icon size={16} />
                          </span>
                          <div className="min-w-0 pt-1">
                            <p className={`text-sm sm:text-base font-semibold ${isBreak ? "text-gray-500" : "text-gray-900"}`}>
                              {item.title}
                            </p>
                            {item.learn && (
                              <p className="mt-0.5 text-xs sm:text-sm text-gray-600 leading-relaxed">{item.learn}</p>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-600">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#203f78]" /> Session / assessment</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#ddaf26]" /> Live demo / system showcase</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-50 ring-1 ring-amber-200" /> Break</span>
            </div>
          </section>

          {/* HIGHLIGHTS */}
          <section id="highlights" className="rounded-2xl py-5 sm:p-8 scroll-mt-24">
            <SectionTitle className="mb-8 sm:mb-12">Highlights</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {highlights.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col items-center text-center">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-6">
                    <div className="absolute inset-0 rounded-full border-2 border-red-300 opacity-40" />
                    <div className="absolute inset-2 rounded-full bg-[#203f78] flex items-center justify-center text-white shadow-lg">
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                  </div>
                  <h3 className="font-bold text-[#203f78] mb-2 sm:mb-3 text-sm sm:text-base">{title}</h3>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PROGRAM DIRECTOR (TRAINER) */}
          <section id="coordinator" className="rounded-2xl py-5 sm:p-8 scroll-mt-24">
            <SectionTitle className="mb-6 sm:mb-8">Program Director – Industry 4.0</SectionTitle>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                  <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" aria-hidden="true">
                    <circle cx="100" cy="100" r="95" fill="none" stroke="#203f78" strokeWidth="3" />
                  </svg>
                  <div className="absolute inset-3 rounded-full overflow-hidden bg-white border-4 border-gray-200 flex items-center justify-center">
                    {!imgError ? (
                      <img
                        src={kapimage}
                        className="w-full h-full object-cover object-top"
                        alt="Kapil Khurana"
                        onError={() => setImgError(true)}
                      />
                    ) : (
                      <User className="w-12 h-12 text-[#203f78]/40" />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold tracking-widest uppercase text-[#ddaf26] mb-2">Your Trainer</p>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                  Kapil Khurana is a Certified SIRI Assessor (CSA) and the author of
                  <span className="font-semibold text-[#203f78]"> "Digital Revolution: Industry 4.0 &amp; IIoT"</span>,
                  with 25+ years of industry experience in industrial automation, smart manufacturing and digital
                  transformation.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {trainerTags.map((tag) => (
                    <span key={tag} className="rounded-full bg-blue-50 border border-[#203f78]/15 px-3 py-1 text-xs font-medium text-[#203f78]">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setShowFullBio(!showFullBio)}
                  aria-expanded={showFullBio}
                  className="text-[#203f78] font-semibold flex items-center gap-2 hover:underline mb-4 text-sm sm:text-base"
                >
                  {showFullBio ? "See Less" : "Read more"}
                  <svg className={`w-4 h-4 transition-transform ${showFullBio ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showFullBio && (
                  <div className="space-y-4 text-gray-700 leading-relaxed mc-fade-in text-sm sm:text-base">
                    <p>
                      As a SIRI certified professional, Kapil Khurana brings extensive expertise in Industry 4.0
                      transformation and smart manufacturing implementations. His certification demonstrates a deep
                      understanding of digital readiness assessment frameworks and strategic implementation
                      methodologies.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-[#203f78] p-4 rounded-r-lg">
                      <h4 className="font-bold text-[#203f78] mb-2 flex items-center gap-2 text-sm sm:text-base">
                        <BadgeCheck className="w-5 h-5 flex-shrink-0" />
                        SIRI Certified Assessor (CSA) | IIT Delhi
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-700 mb-3">
                        Certified in Smart Industry Readiness Index Assessment and Implementation.
                      </p>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        {trainerBenefits.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="text-[#203f78] mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="mt-5 sm:mt-6 pt-4 border-t border-gray-200">
                  <h3 className="font-bold text-base sm:text-lg text-[#203f78] mb-1">Kapil Khurana</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Founder &amp; Director | Author | Certified SIRI Assessor (CSA) | 25+ Years of Industry Experience
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ABOUT SIRI */}
          <section id="siri" className="rounded-2xl py-5 sm:p-8 scroll-mt-24">
            <p className="text-[11px] font-bold tracking-widest uppercase text-[#ddaf26] mb-1">Industry 4.0</p>
            <SectionTitle className="mb-3">About SIRI</SectionTitle>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-6 sm:mb-8">
              Understand where your manufacturing organization stands on its Industry 4.0 journey and discover a
              structured path towards digital transformation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_260px] gap-5 sm:gap-6 items-stretch">
              <div className="bg-gray-50 rounded-xl p-5 sm:p-6 border border-gray-200">
                <h3 className="font-bold text-[#203f78] text-base sm:text-lg mb-2">What is SIRI?</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  The Smart Industry Readiness Index (SIRI) is a comprehensive framework developed to help
                  organizations assess their Industry 4.0 readiness. It provides a structured approach to evaluate
                  and improve manufacturing capabilities in the digital age.
                </p>
              </div>

              <div className="rounded-xl bg-white border border-gray-200 p-4 flex flex-col items-center justify-center text-center shadow-sm overflow-hidden">
                {/* the logo file has wide white margins, so it is scaled up inside the card */}
                <img
                  src={siriLogo}
                  alt="Smart Industry Readiness Index (SIRI) logo"
                  className="w-full h-auto object-contain scale-[1.4] my-4"
                  decoding="async"
                />
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#203f78] px-3 py-1 text-[11px] font-semibold text-white">
                  <BadgeCheck size={12} className="text-[#ddaf26]" />
                  Certified Framework
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-5 sm:mt-6">
              {siriPoints.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="w-11 h-11 rounded-full bg-[#203f78] flex items-center justify-center text-white shadow-md ring-4 ring-blue-100 mb-3">
                    <Icon size={20} />
                  </div>
                  <h4 className="font-bold text-[#203f78] text-sm sm:text-base mb-1">{title}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* BOOK */}
          <section id="book" className="rounded-2xl py-5 sm:p-8 scroll-mt-24">
            <p className="text-[11px] font-bold tracking-widest uppercase text-[#ddaf26] mb-1">Featured Book</p>
            <SectionTitle className="mb-6 sm:mb-8">Digital Revolution – Industry 4.0</SectionTitle>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start">
              <div className="relative flex-shrink-0 w-40 sm:w-48">
                <span className="absolute -top-2 -right-2 z-10 rounded-full bg-red-600 px-2.5 py-0.5 text-[10px] font-bold text-white shadow">NEW</span>
                <img
                  src={bookImage}
                  alt="Digital Revolution: Industry 4.0 & Industrial IoT by Kapil Khurana, front cover and spine"
                  className="w-full h-auto drop-shadow-xl"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600 mb-3">
                  by <strong className="text-[#203f78]">Kapil Khurana</strong> · Technoviz Automation
                </p>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-5">
                  Navigate the digital transformation reshaping our world. From workplace evolution to global
                  connectivity, discover strategies to harness innovation while addressing the challenges of
                  technological disruption.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  {bookTopics.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-center gap-3 rounded-lg bg-gray-50 border border-gray-200 px-3 py-2.5">
                      <span className="w-9 h-9 flex-shrink-0 rounded-full bg-[#203f78] text-white flex items-center justify-center">
                        <Icon size={16} />
                      </span>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-[#203f78]">{title}</h4>
                        <p className="text-xs text-gray-600">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="https://www.amazon.in/Digital-Revolution-Technology-Integration-Industrial/dp/B0D6YGJ1RR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#203f78] to-[#2c5a9e] text-white px-5 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] text-sm"
                >
                  Get Your Copy
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
              {bookStats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 rounded-xl bg-white border border-gray-200 p-3 sm:p-4 text-center sm:text-left shadow-sm">
                  <Icon className="w-6 h-6 text-[#ddaf26] flex-shrink-0" />
                  <div>
                    <p className="text-sm sm:text-base font-bold text-[#203f78]">{value}</p>
                    <p className="text-[11px] sm:text-xs text-gray-500">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CLIENTS */}
          <section id="clients" className="rounded-2xl py-5 sm:p-8 scroll-mt-24">
            <SectionTitle className="mb-2">Our Trusted Clients</SectionTitle>
            <p className="text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8">
              Organizations that trust Technoviz Automation for industrial automation and Industry 4.0.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
              {clientLogos.map((logo) => (
                <div
                  key={logo.name}
                  className="aspect-[3/2] rounded-xl bg-white border border-gray-200 flex items-center justify-center p-3 hover:border-[#203f78]/40 hover:shadow-md transition-all"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    title={logo.name}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* CERTIFICATE */}
          <section id="certificate" className="rounded-2xl py-5 sm:p-8 scroll-mt-24 relative">
            <div className="absolute top-0 left-0 w-10 h-10 sm:w-12 sm:h-12" aria-hidden="true">
              <div className="absolute top-0 left-0 w-10 sm:w-12 h-2 bg-[#203f78]" />
              <div className="absolute top-0 left-0 w-2 h-10 sm:h-12 bg-[#203f78]" />
            </div>

            <SectionTitle className="mb-6 sm:mb-8 pt-4">Certificate and Assessment</SectionTitle>

            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-[#203f78] mb-3 sm:mb-4">Assessment &amp; Eligibility</h3>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {[
                      ["Pre Assessment (Masterclass Portal)", "Must be completed"],
                      ["Live Masterclass", `Full day · ${EVENT_DATE}`],
                      ["Certificate", "Download from the portal"],
                    ].map(([label, value], i) => (
                      <tr key={label} className={i < 2 ? "border-b border-gray-300" : ""}>
                        <td className="p-3 sm:p-4 bg-gray-50 font-medium text-gray-700 text-xs sm:text-sm">{label}</td>
                        <td className="p-3 sm:p-4 text-gray-700 text-xs sm:text-sm">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-[#203f78] mb-3 sm:mb-4">How to get your certificate</h3>
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {certificateSteps.map(({ icon: Icon, title, desc }, i) => (
                  <li key={title} className="relative bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-start gap-3">
                    <span className="absolute -top-2.5 -left-2.5 w-6 h-6 bg-[#203f78] rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md">
                      {i + 1}
                    </span>
                    <span className="w-9 h-9 flex-shrink-0 rounded-full bg-white text-[#203f78] ring-1 ring-[#203f78]/20 flex items-center justify-center">
                      <Icon size={17} />
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-[#203f78]">{title}</h4>
                      <p className="mt-0.5 text-xs sm:text-sm text-gray-600 leading-relaxed">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="text-xs text-gray-600 mt-4 italic">
                *Certificates are issued by Technoviz Automation and are downloaded from the Masterclass Portal.
              </p>
            </div>

            <div className="mb-6 sm:mb-8">
              <SampleCertificate />
              <p className="text-xs text-gray-500 text-center mt-3 italic">Sample certificate</p>
            </div>

            <div className="absolute bottom-0 right-0 w-10 h-10 sm:w-12 sm:h-12" aria-hidden="true">
              <div className="absolute bottom-0 right-0 w-10 sm:w-12 h-2 bg-[#203f78]" />
              <div className="absolute bottom-0 right-0 w-2 h-10 sm:h-12 bg-[#203f78]" />
            </div>
          </section>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4">
          <div
            className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-center mc-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mc-success-title"
          >
            <div className="mx-auto w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
              <CheckCircle2 size={30} />
            </div>
            <h2 id="mc-success-title" className="text-xl font-bold text-[#203f78]">Registration Successful</h2>
            <p className="mt-2 text-sm text-gray-600">
              Your seat for the {MASTERCLASS_NAME} is confirmed.
            </p>
            <p className="mt-1 text-sm text-gray-600">A confirmation will be sent to your email shortly.</p>
            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="mt-6 w-full h-11 bg-gradient-to-r from-[#203f78] to-[#2c5a9e] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
