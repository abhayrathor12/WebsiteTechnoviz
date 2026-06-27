import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
    Activity,
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    Bot,
    Brain,
    Check,
    CheckCircle2,
    CircuitBoard,
    Coins,
    Eye,
    Factory,
    FileText,
    Gift,
    Glasses,
    Handshake,
    Landmark,
    Leaf,
    Lightbulb,
    Loader2,
    Mail,
    Megaphone,
    Phone,
    Presentation,
    Rocket,
    ShieldCheck,
    Timer,
    Trophy,
    Upload,
    User,
    UserCheck,
    Users,
    Wifi,
    X,
} from "lucide-react";
import technovizlogo from "../public/logo1.png"
import aurexlogo from "../public/aurex.png"

// ---------------------------------------------------------------------------
// Static content — sourced from the Ideathon 2026 poster
// ---------------------------------------------------------------------------

const HERO_BENEFITS = [
    { icon: Timer, label: "Reduce Downtime" },
    { icon: BadgeCheck, label: "Improve Quality" },
    { icon: Leaf, label: "Enhance Sustainability" },
    { icon: ShieldCheck, label: "Make Industry Smarter & Safer" },
] as const;

const INFO_FOCUS_AREAS = [
    { icon: Factory, label: "Industry 4.0 & Smart Manufacturing" },
    { icon: Brain, label: "AI / ML" },
    { icon: Wifi, label: "IIoT & Connected Factories" },
    { icon: Bot, label: "Robotics & Automation" },
    { icon: Glasses, label: "AR/VR & Digital Training" },
    { icon: ShieldCheck, label: "Industrial Cybersecurity" },
    { icon: Leaf, label: "Energy & Sustainability" },
    { icon: Activity, label: "Predictive Maintenance" },
    { icon: Eye, label: "Quality 4.0 & Vision Systems" },
    { icon: CircuitBoard, label: "Digital Transformation Technologies" },
] as const;

const WHY_PARTICIPATE = [
    { icon: Presentation, label: "Present to Industry Experts & Investors" },
    { icon: UserCheck, label: "Mentorship from Industry Professionals" },
    { icon: Megaphone, label: "Visibility Among Manufacturing Leaders" },
    { icon: Handshake, label: "Connect with Customers & Partners" },
    { icon: Coins, label: "Explore Funding & Incubation Opportunities" },
    { icon: Rocket, label: "Accelerate Your Innovation Journey" },
    { icon: Landmark, label: "Build Strategic Industry Relationships" },
    { icon: Trophy, label: "Win Recognition & Valuable Rewards" },
] as const;

const FOCUS_AREA_OPTIONS = [
    "AI/ML",
    "Industry 4.0",
    "Robotics",
    "IIoT",
    "Cybersecurity",
    "Sustainability",
    "Others",
] as const;

type FocusAreaOption = (typeof FOCUS_AREA_OPTIONS)[number];
type ParticipationType = "Individual" | "Team";

interface FormState {
    fullName: string;
    email: string;
    phone: string;
    participationType: ParticipationType;
    teamName: string;
    ideaTitle: string;
    focusAreas: FocusAreaOption[];
    ideaDescription: string;
}

const INITIAL_FORM: FormState = {
    fullName: "",
    email: "",
    phone: "",
    participationType: "Individual",
    teamName: "",
    ideaTitle: "",
    focusAreas: [],
    ideaDescription: "",
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const MAX_PITCH_DECK_MB = 10;

const TOTAL_STEPS = 4;

const STEPS = [
    { id: 1, label: "Participant Details" },
    { id: 2, label: "Participation" },
    { id: 3, label: "Your Idea" },
    { id: 4, label: "Description & Deck" },
] as const;

type StepId = 1 | 2 | 3 | 4;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Ideathon() {
    const [form, setForm] = useState<FormState>(INITIAL_FORM);
    const [errors, setErrors] = useState<FormErrors>({});
    const [pitchDeck, setPitchDeck] = useState<File | null>(null);
    const [fileError, setFileError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [step, setStep] = useState<StepId>(1);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

    const toggleFocusArea = (option: FocusAreaOption) => {
        setForm((prev) => {
            const exists = prev.focusAreas.includes(option);
            return {
                ...prev,
                focusAreas: exists
                    ? prev.focusAreas.filter((item) => item !== option)
                    : [...prev.focusAreas, option],
            };
        });
        if (errors.focusAreas) setErrors((prev) => ({ ...prev, focusAreas: undefined }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (!file) {
            setPitchDeck(null);
            setFileError("");
            return;
        }
        if (file.type !== "application/pdf") {
            setFileError("Please upload a PDF file.");
            setPitchDeck(null);
            return;
        }
        if (file.size > MAX_PITCH_DECK_MB * 1024 * 1024) {
            setFileError(`File must be under ${MAX_PITCH_DECK_MB}MB.`);
            setPitchDeck(null);
            return;
        }
        setFileError("");
        setPitchDeck(file);
    };

    const removeFile = () => {
        setPitchDeck(null);
        setFileError("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // Step 1: Participant Details
    const validateStep1 = (): FormErrors => {
        const next: FormErrors = {};
        if (!form.fullName.trim()) next.fullName = "Full name is required.";
        if (!form.email.trim()) {
            next.email = "Email address is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            next.email = "Enter a valid email address.";
        }
        if (!form.phone.trim()) {
            next.phone = "Phone number is required.";
        } else if (!/^[+\d][\d\s-]{7,}$/.test(form.phone)) {
            next.phone = "Enter a valid phone number.";
        }
        return next;
    };

    // Step 2: Participation
    const validateStep2 = (): FormErrors => {
        const next: FormErrors = {};
        if (form.participationType === "Team" && !form.teamName.trim()) {
            next.teamName = "Team name is required for team entries.";
        }
        return next;
    };

    // Step 3: Your Idea
    const validateStep3 = (): FormErrors => {
        const next: FormErrors = {};
        if (!form.ideaTitle.trim()) next.ideaTitle = "Idea title is required.";
        if (form.focusAreas.length === 0) next.focusAreas = "Select at least one focus area.";
        return next;
    };

    // Step 4: Description & Deck
    const validateStep4 = (): FormErrors => {
        const next: FormErrors = {};
        if (!form.ideaDescription.trim()) {
            next.ideaDescription = "Idea description is required.";
        }
        return next;
    };

    const validateStep = (s: StepId): FormErrors => {
        switch (s) {
            case 1: return validateStep1();
            case 2: return validateStep2();
            case 3: return validateStep3();
            case 4: return validateStep4();
        }
    };

    const focusFirstError = (nextErrors: FormErrors) => {
        const firstKey = Object.keys(nextErrors)[0];
        document.getElementById(firstKey)?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const handleNext = () => {
        const nextErrors = validateStep(step);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) {
            focusFirstError(nextErrors);
            return;
        }
        setStep((prev) => (Math.min(prev + 1, TOTAL_STEPS) as StepId));
    };

    const handleBack = () => {
        setErrors({});
        setStep((prev) => (Math.max(prev - 1, 1) as StepId));
    };

    // Clears all form fields and resets to step 1 (does NOT touch isSubmitted)
    const clearForm = () => {
        setForm(INITIAL_FORM);
        setPitchDeck(null);
        setErrors({});
        setFileError("");
        setSubmitError("");
        setStep(1);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // Closes the success modal
    const closeModal = () => {
        setIsSubmitted(false);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const nextErrors = validateStep4();
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) {
            focusFirstError(nextErrors);
            return;
        }

        setIsSubmitting(true);
        setSubmitError("");

        try {
            const payload = new FormData();
            payload.append("full_name", form.fullName);
            payload.append("email", form.email);
            payload.append("phone", form.phone);
            payload.append("participation_type", form.participationType);
            payload.append("team_name", form.teamName);
            payload.append("idea_title", form.ideaTitle);
            payload.append("focus_areas", JSON.stringify(form.focusAreas));
            payload.append("idea_description", form.ideaDescription);
            if (pitchDeck) payload.append("pitch_deck", pitchDeck);

            const response = await fetch(
                "https://websiteBackend.pythonanywhere.com/api/ideathon-registration/",
                {
                    method: "POST",
                    body: payload,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            // Clear all fields first, then show the success modal
            clearForm();
            setIsSubmitted(true);
        } catch {
            setSubmitError("Something went wrong while submitting. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-white text-[#0B2447] antialiased"
            style={{
                fontFamily:
                    "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            {/* Clean, simple, highly-legible font for the whole page */}
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');`}</style>

            {/* ----------------------------------------------------------------- */}
            {/* SUCCESS MODAL — centered overlay                                  */}
            {/* ----------------------------------------------------------------- */}
            {isSubmitted && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
                    <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl text-center animate-in fade-in zoom-in duration-200">
                        {/* Close button */}
                        <div className="flex justify-end mb-2">
                            <button
                                onClick={closeModal}
                                className="text-[#9AA7B4] hover:text-[#0B2447] transition-colors"
                                aria-label="Close"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Icon */}
                        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#E9F7EF]">
                            <CheckCircle2 className="h-10 w-10 text-[#1F9D55]" />
                        </div>

                        {/* Heading */}
                        <h3 className="text-2xl font-bold text-[#0B2447]">You're Registered!</h3>

                        {/* Subtext */}
                        <p className="mt-3 text-base leading-relaxed text-[#5B6B7C]">
                            Thanks for bringing your idea to{" "}
                            <span className="font-semibold text-[#0B2447]">Ideathon 2026</span>. Keep an
                            eye on your email and phone — the TechnoViz Automation and Aurex Ventures
                            team will reach out with next steps.
                        </p>

                        {/* Divider */}
                        <div className="my-6 h-px bg-[#E3E8EE]" />

                        {/* CTA */}
                        <button
                            onClick={closeModal}
                            className="w-full rounded-xl bg-[#F2A900] py-3 text-sm font-bold uppercase tracking-wide text-[#0B2447] transition-colors hover:bg-[#FFC233]"
                        >
                            Register Another Idea
                        </button>

                        <p className="mt-4 text-sm text-[#9AA7B4]">
                            The form has been cleared and is ready for a new submission.
                        </p>
                    </div>
                </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* HERO  —  copy on the left, registration form on the right         */}
            {/* ----------------------------------------------------------------- */}
            <header className="relative overflow-hidden bg-[#0B2447] text-white">
                <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-6 lg:grid-cols-2 lg:items-start lg:gap-10 lg:px-12 lg:pt-6">

                    {/* LEFT: copy */}
                    <div>
                        {/* Brand bar */}
                        <div className="mb-8 flex w-fit flex-wrap items-center gap-6 rounded-2xl bg-white px-6 py-3 shadow-lg">
                            <img
                                src={technovizlogo}
                                alt="TechnoViz Logo"
                                className="h-12 w-auto object-contain"
                            />
                            <span className="hidden h-6 w-px bg-[#0B2447]/15 sm:block" />
                            <img
                                src={aurexlogo}
                                alt="Aurex Ventures Logo"
                                className="h-14 w-auto object-contain"
                            />
                        </div>

                        <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#F2A900]">
                            Ideathon 2026
                        </span>

                        <h1 className="mt-5 text-4xl font-extrabold uppercase leading-[1.1] tracking-tight sm:text-5xl">
                            Smart Manufacturing &amp;{" "}
                            <span className="text-[#F2A900]">Industrial Innovation</span>
                        </h1>

                        <div className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-base font-bold text-[#0B2447]">
                            From <span className="text-[#F2A900]">Idea</span> to Industry Impact
                        </div>

                        <p className="mt-6 max-w-md text-base text-white/70">
                            Do you have an innovative idea that can:
                        </p>

                        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {HERO_BENEFITS.map(({ icon: Icon, label }) => (
                                <div key={label} className="flex flex-col items-center gap-2 text-center">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20">
                                        <Icon className="h-5 w-5 text-[#F2A900]" />
                                    </div>
                                    <span className="text-sm font-medium text-white/80">{label}</span>
                                </div>
                            ))}
                        </div>

                        <p className="mt-8 max-w-md text-base text-white/70">
                            Bring your idea to life with the right platform, mentors, industry leaders and
                            investors.
                        </p>

                        {/* Mobile-only shortcut */}
                        <a
                            href="#register"
                            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#F2A900] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#0B2447] transition-colors hover:bg-[#FFC233] lg:hidden"
                        >
                            Register Now <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>

                    {/* RIGHT: registration form */}
                    <div id="register" className="lg:mt-6 lg:self-start">
                        <div className="rounded-3xl bg-white p-6 text-[#0B2447] shadow-2xl ring-1 ring-black/5 sm:p-8">
                            <>
                                <div className="mb-6">
                                    <span className="inline-flex items-center rounded-full bg-[#0B2447]/5 px-3 py-1 text-sm font-bold uppercase tracking-wide text-[#0B2447]">
                                        Register Now
                                    </span>
                                    <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0B2447]">
                                        Secure Your Spot
                                    </h2>
                                    <p className="mt-1.5 text-base text-[#5B6B7C]">
                                        Takes less than five minutes — and it&apos;s completely free.
                                    </p>
                                </div>

                                {/* Step indicator */}
                                <div className="mb-7 flex items-center gap-2">
                                    {STEPS.map(({ id, label }, index) => {
                                        const active = step === id;
                                        const complete = step > id;
                                        return (
                                            <div key={id} className="flex flex-1 items-center gap-2">
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${complete
                                                            ? "bg-[#0B2447] text-white"
                                                            : active
                                                                ? "bg-[#F2A900] text-[#0B2447]"
                                                                : "bg-[#EDF1F5] text-[#9AA7B4]"
                                                            }`}
                                                    >
                                                        {complete ? <Check className="h-3.5 w-3.5" /> : id}
                                                    </div>
                                                    <span
                                                        className={`hidden text-sm font-semibold leading-tight xl:inline ${active || complete ? "text-[#0B2447]" : "text-[#9AA7B4]"
                                                            }`}
                                                    >
                                                        {label}
                                                    </span>
                                                </div>
                                                {index < STEPS.length - 1 && (
                                                    <span
                                                        className={`h-px flex-1 ${complete ? "bg-[#0B2447]" : "bg-[#E3E8EE]"
                                                            }`}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                <form onSubmit={handleSubmit} noValidate className="space-y-7">

                                    {/* ── STEP 1: Participant Details ── */}
                                    {step === 1 && (
                                        <>
                                            <fieldset>
                                                <legend className="mb-4 text-sm font-bold uppercase tracking-wide text-[#0B2447]/70">
                                                    Participant Details
                                                </legend>
                                                <div className="grid gap-4 sm:grid-cols-2">
                                                    <div className="sm:col-span-2">
                                                        <label htmlFor="fullName" className="mb-1.5 block text-sm font-semibold text-[#0B2447]">
                                                            Full Name <span className="text-[#A91E2C]">*</span>
                                                        </label>
                                                        <div className="relative">
                                                            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5B6B7C]" />
                                                            <input
                                                                id="fullName"
                                                                type="text"
                                                                value={form.fullName}
                                                                onChange={(e) => updateField("fullName", e.target.value)}
                                                                placeholder="e.g. Aanya Sharma"
                                                                className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-3 text-base text-[#0B2447] placeholder:text-[#9AA7B4] focus:outline-none focus:ring-2 focus:ring-[#F2A900]/60 ${errors.fullName ? "border-[#A91E2C]" : "border-[#D7DEE7]"
                                                                    }`}
                                                            />
                                                        </div>
                                                        {errors.fullName && <FieldError message={errors.fullName} />}
                                                    </div>

                                                    <div>
                                                        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-[#0B2447]">
                                                            Email Address <span className="text-[#A91E2C]">*</span>
                                                        </label>
                                                        <div className="relative">
                                                            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5B6B7C]" />
                                                            <input
                                                                id="email"
                                                                type="email"
                                                                value={form.email}
                                                                onChange={(e) => updateField("email", e.target.value)}
                                                                placeholder="you@company.com"
                                                                className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-3 text-base text-[#0B2447] placeholder:text-[#9AA7B4] focus:outline-none focus:ring-2 focus:ring-[#F2A900]/60 ${errors.email ? "border-[#A91E2C]" : "border-[#D7DEE7]"
                                                                    }`}
                                                            />
                                                        </div>
                                                        {errors.email && <FieldError message={errors.email} />}
                                                    </div>

                                                    <div>
                                                        <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-[#0B2447]">
                                                            Phone Number <span className="text-[#A91E2C]">*</span>
                                                        </label>
                                                        <div className="relative">
                                                            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5B6B7C]" />
                                                            <input
                                                                id="phone"
                                                                type="tel"
                                                                value={form.phone}
                                                                onChange={(e) => updateField("phone", e.target.value)}
                                                                placeholder="+91 98765 43210"
                                                                className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-3 text-base text-[#0B2447] placeholder:text-[#9AA7B4] focus:outline-none focus:ring-2 focus:ring-[#F2A900]/60 ${errors.phone ? "border-[#A91E2C]" : "border-[#D7DEE7]"
                                                                    }`}
                                                            />
                                                        </div>
                                                        {errors.phone && <FieldError message={errors.phone} />}
                                                    </div>
                                                </div>
                                            </fieldset>

                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={handleNext}
                                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F2A900] py-3.5 text-sm font-bold uppercase tracking-wide text-[#0B2447] transition-colors hover:bg-[#FFC233]"
                                                >
                                                    Next: Participation <ArrowRight className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    {/* ── STEP 2: Participation ── */}
                                    {step === 2 && (
                                        <>
                                            <fieldset>
                                                <legend className="mb-4 text-sm font-bold uppercase tracking-wide text-[#0B2447]/70">
                                                    Participation
                                                </legend>

                                                <label className="mb-2 block text-sm font-semibold text-[#0B2447]">
                                                    Participation Type <span className="text-[#A91E2C]">*</span>
                                                </label>
                                                <div className="flex gap-3">
                                                    {(["Individual", "Team"] as ParticipationType[]).map((type) => {
                                                        const Icon = type === "Individual" ? User : Users;
                                                        const active = form.participationType === type;
                                                        return (
                                                            <button
                                                                key={type}
                                                                type="button"
                                                                onClick={() => updateField("participationType", type)}
                                                                aria-pressed={active}
                                                                className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-colors ${active
                                                                    ? "border-[#0B2447] bg-[#0B2447] text-white"
                                                                    : "border-[#D7DEE7] bg-white text-[#0B2447] hover:border-[#0B2447]/40"
                                                                    }`}
                                                            >
                                                                <Icon className="h-4 w-4" />
                                                                {type}
                                                            </button>
                                                        );
                                                    })}
                                                </div>

                                                {form.participationType === "Team" && (
                                                    <div className="mt-4">
                                                        <label htmlFor="teamName" className="mb-1.5 block text-sm font-semibold text-[#0B2447]">
                                                            Team Name <span className="text-[#A91E2C]">*</span>
                                                        </label>
                                                        <input
                                                            id="teamName"
                                                            type="text"
                                                            value={form.teamName}
                                                            onChange={(e) => updateField("teamName", e.target.value)}
                                                            placeholder="e.g. Circuit Breakers"
                                                            className={`w-full rounded-xl border bg-white px-3 py-2.5 text-base text-[#0B2447] placeholder:text-[#9AA7B4] focus:outline-none focus:ring-2 focus:ring-[#F2A900]/60 ${errors.teamName ? "border-[#A91E2C]" : "border-[#D7DEE7]"
                                                                }`}
                                                        />
                                                        {errors.teamName && <FieldError message={errors.teamName} />}
                                                    </div>
                                                )}
                                            </fieldset>

                                            <div className="flex gap-3">
                                                <button
                                                    type="button"
                                                    onClick={handleBack}
                                                    className="flex items-center justify-center gap-2 rounded-xl border border-[#D7DEE7] px-5 py-3.5 text-sm font-semibold text-[#0B2447] transition-colors hover:border-[#0B2447]/40"
                                                >
                                                    <ArrowLeft className="h-4 w-4" /> Back
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleNext}
                                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#F2A900] py-3.5 text-sm font-bold uppercase tracking-wide text-[#0B2447] transition-colors hover:bg-[#FFC233]"
                                                >
                                                    Next: Your Idea <ArrowRight className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    {/* ── STEP 3: Your Idea ── */}
                                    {step === 3 && (
                                        <>
                                            <fieldset>
                                                <legend className="mb-4 text-sm font-bold uppercase tracking-wide text-[#0B2447]/70">
                                                    Your Idea
                                                </legend>

                                                <div className="space-y-5">
                                                    <div>
                                                        <label htmlFor="ideaTitle" className="mb-1.5 block text-sm font-semibold text-[#0B2447]">
                                                            Idea Title <span className="text-[#A91E2C]">*</span>
                                                        </label>
                                                        <div className="relative">
                                                            <Lightbulb className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5B6B7C]" />
                                                            <input
                                                                id="ideaTitle"
                                                                type="text"
                                                                value={form.ideaTitle}
                                                                onChange={(e) => updateField("ideaTitle", e.target.value)}
                                                                placeholder="Give your idea a name"
                                                                className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-3 text-base text-[#0B2447] placeholder:text-[#9AA7B4] focus:outline-none focus:ring-2 focus:ring-[#F2A900]/60 ${errors.ideaTitle ? "border-[#A91E2C]" : "border-[#D7DEE7]"
                                                                    }`}
                                                            />
                                                        </div>
                                                        {errors.ideaTitle && <FieldError message={errors.ideaTitle} />}
                                                    </div>

                                                    <div id="focusAreas">
                                                        <label className="mb-1.5 block text-sm font-semibold text-[#0B2447]">
                                                            Focus Area <span className="text-[#A91E2C]">*</span>
                                                        </label>
                                                        <p className="mb-2.5 text-sm text-[#5B6B7C]">Select all that apply.</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {FOCUS_AREA_OPTIONS.map((option) => {
                                                                const active = form.focusAreas.includes(option);
                                                                return (
                                                                    <button
                                                                        key={option}
                                                                        type="button"
                                                                        onClick={() => toggleFocusArea(option)}
                                                                        aria-pressed={active}
                                                                        className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${active
                                                                            ? "border-[#F2A900] bg-[#FFF6E1] text-[#0B2447]"
                                                                            : "border-[#D7DEE7] bg-white text-[#5B6B7C] hover:border-[#0B2447]/30"
                                                                            }`}
                                                                    >
                                                                        {active && <Check className="h-3.5 w-3.5 text-[#B97900]" />}
                                                                        {option}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                        {errors.focusAreas && <FieldError message={errors.focusAreas} />}
                                                    </div>
                                                </div>
                                            </fieldset>

                                            <div className="flex gap-3">
                                                <button
                                                    type="button"
                                                    onClick={handleBack}
                                                    className="flex items-center justify-center gap-2 rounded-xl border border-[#D7DEE7] px-5 py-3.5 text-sm font-semibold text-[#0B2447] transition-colors hover:border-[#0B2447]/40"
                                                >
                                                    <ArrowLeft className="h-4 w-4" /> Back
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleNext}
                                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#F2A900] py-3.5 text-sm font-bold uppercase tracking-wide text-[#0B2447] transition-colors hover:bg-[#FFC233]"
                                                >
                                                    Next: Description <ArrowRight className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    {/* ── STEP 4: Description & Deck ── */}
                                    {step === 4 && (
                                        <>
                                            <fieldset>
                                                <legend className="mb-4 text-sm font-bold uppercase tracking-wide text-[#0B2447]/70">
                                                    Description &amp; Pitch Deck
                                                </legend>

                                                <div className="space-y-5">
                                                    <div>
                                                        <label htmlFor="ideaDescription" className="mb-1.5 block text-sm font-semibold text-[#0B2447]">
                                                            Brief Idea Description <span className="text-[#A91E2C]">*</span>
                                                        </label>
                                                        <p className="mb-2.5 text-sm text-[#5B6B7C]">
                                                            3–5 lines covering the problem you&apos;re solving and your proposed solution.
                                                        </p>
                                                        <textarea
                                                            id="ideaDescription"
                                                            rows={4}
                                                            value={form.ideaDescription}
                                                            onChange={(e) => updateField("ideaDescription", e.target.value)}
                                                            placeholder="Describe the problem and how your idea solves it..."
                                                            className={`w-full rounded-xl border bg-white px-3 py-2.5 text-base text-[#0B2447] placeholder:text-[#9AA7B4] focus:outline-none focus:ring-2 focus:ring-[#F2A900]/60 ${errors.ideaDescription ? "border-[#A91E2C]" : "border-[#D7DEE7]"
                                                                }`}
                                                        />
                                                        {errors.ideaDescription && <FieldError message={errors.ideaDescription} />}
                                                    </div>

                                                    <div>
                                                        <label className="mb-1.5 block text-sm font-semibold text-[#0B2447]">
                                                            Pitch Deck (PDF)
                                                        </label>
                                                        {!pitchDeck ? (
                                                            <label
                                                                htmlFor="pitchDeck"
                                                                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#D7DEE7] bg-white py-5 text-center text-sm text-[#5B6B7C] transition-colors hover:border-[#0B2447]/40"
                                                            >
                                                                <Upload className="h-4 w-4 flex-shrink-0" />
                                                                <span>Upload PDF, up to {MAX_PITCH_DECK_MB}MB</span>
                                                                <input
                                                                    ref={fileInputRef}
                                                                    id="pitchDeck"
                                                                    type="file"
                                                                    accept="application/pdf"
                                                                    onChange={handleFileChange}
                                                                    className="hidden"
                                                                />
                                                            </label>
                                                        ) : (
                                                            <div className="flex items-center justify-between rounded-xl border border-[#D7DEE7] bg-white px-4 py-3 text-sm">
                                                                <span className="flex items-center gap-2 truncate text-[#0B2447]">
                                                                    <FileText className="h-4 w-4 flex-shrink-0" />
                                                                    <span className="truncate">{pitchDeck.name}</span>
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    onClick={removeFile}
                                                                    className="flex-shrink-0 text-[#5B6B7C] transition-colors hover:text-[#A91E2C]"
                                                                    aria-label="Remove file"
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        )}
                                                        {fileError && <FieldError message={fileError} />}
                                                    </div>
                                                </div>
                                            </fieldset>

                                            {submitError && (
                                                <div className="flex items-center gap-2 rounded-xl border border-[#A91E2C]/30 bg-[#FDEDEE] px-4 py-3 text-sm text-[#A91E2C]">
                                                    <AlertCircle className="h-4 w-4 flex-shrink-0" /> {submitError}
                                                </div>
                                            )}

                                            <div className="flex gap-3">
                                                <button
                                                    type="button"
                                                    onClick={handleBack}
                                                    className="flex items-center justify-center gap-2 rounded-xl border border-[#D7DEE7] px-5 py-3.5 text-sm font-semibold text-[#0B2447] transition-colors hover:border-[#0B2447]/40"
                                                >
                                                    <ArrowLeft className="h-4 w-4" /> Back
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#F2A900] py-3.5 text-sm font-bold uppercase tracking-wide text-[#0B2447] transition-colors hover:bg-[#FFC233] disabled:cursor-not-allowed disabled:opacity-70"
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Register Now <ArrowRight className="h-4 w-4" />
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                            <p className="text-center text-sm text-[#5B6B7C]">
                                                By registering you agree to be contacted by TechnoViz Automation
                                                and Aurex Ventures about Ideathon 2026.
                                            </p>
                                        </>
                                    )}
                                </form>
                            </>
                        </div>
                    </div>
                </div>
            </header>

            {/* ----------------------------------------------------------------- */}
            {/* PARTNERSHIP / FREE REGISTRATION BANNER                            */}
            {/* ----------------------------------------------------------------- */}
            <section className="bg-[#11315F] text-white">
                <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-12">
                    <p className="max-w-2xl text-base leading-relaxed text-white/85">
                        <span className="font-bold text-[#F2A900]">TechnoViz Automation</span> in
                        collaboration with <span className="font-bold text-[#F08C97]">Aurex Ventures</span>{" "}
                        presents a platform for innovators, engineers, startups and visionaries.
                    </p>
                    <div className="flex items-center gap-4 border-t border-white/15 pt-6 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                        <Gift className="h-8 w-8 flex-shrink-0 text-[#F2A900]" />
                        <div>
                            <p className="text-sm uppercase tracking-wide text-white/70">Registration is</p>
                            <p className="text-xl font-extrabold leading-tight text-[#F2A900]">FREE!</p>
                            <p className="text-xs uppercase tracking-wide text-white/50">
                                No registration fee
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* FOCUS AREAS + WHY PARTICIPATE                                     */}
            {/* ----------------------------------------------------------------- */}
            <section className="bg-white py-20">
                <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:px-12">
                    {/* Focus areas */}
                    <div>
                        <span className="inline-flex items-center rounded-full bg-[#0B2447] px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-white">
                            Focus Areas
                        </span>
                        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            {INFO_FOCUS_AREAS.map(({ icon: Icon, label }) => (
                                <div key={label} className="flex items-start gap-3">
                                    <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#0B2447]" />
                                    <span className="text-base leading-snug text-[#1C2B3A]">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Why participate */}
                    <div>
                        <span className="inline-flex items-center rounded-full bg-[#F2A900] px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-[#0B2447]">
                            Why Participate?
                        </span>
                        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
                            {WHY_PARTICIPATE.map(({ icon: Icon, label }) => (
                                <div key={label} className="flex flex-col items-center gap-3 text-center">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#0B2447]/15">
                                        <Icon className="h-6 w-6 text-[#0B2447]" />
                                    </div>
                                    <span className="text-sm leading-snug text-[#5B6B7C]">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* FOOTER                                                             */}
            {/* ----------------------------------------------------------------- */}
            <footer className="bg-[#081B36] py-10 text-white">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-center sm:flex-row sm:text-left lg:px-12">
                    <p className="text-base font-bold uppercase tracking-wide sm:text-lg">
                        Your Idea. Our Platform. Industry Impact.
                    </p>
                    <p className="text-base text-white/80">
                        Don&apos;t just imagine the future.{" "}
                        <span className="font-bold text-[#F2A900]">Build it!</span>
                    </p>
                </div>
            </footer>
        </div>
    );
}

function FieldError({ message }: { message: string }) {
    return (
        <p className="mt-1.5 flex items-center gap-1 text-sm text-[#A91E2C]">
            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" /> {message}
        </p>
    );
}