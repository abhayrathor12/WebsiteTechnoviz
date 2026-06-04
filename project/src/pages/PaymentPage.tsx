import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import * as z from "zod";
import { Controller } from "react-hook-form";
import logo from "../public/aurex.png";
import sumeet from "../public/summet.png";
// import mentorPhoto from "../public/sumeet.jpg";

const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    companyName: z.string().min(1, "Company / Startup name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    city: z.string().optional(),
});
declare global {
    interface Window {
        Razorpay: any;
    }
}
type FormData = z.infer<typeof formSchema>;

const WebinarPage: React.FC = () => {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
    const [countdown, setCountdown] = useState(6);
    const [cityOptions, setCityOptions] = useState<{ label: string; value: string }[]>([]);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        fetch("https://countriesnow.space/api/v0.1/countries/cities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country: "India" }),
        })
            .then((res) => res.json())
            .then((data) => {
                const cities = data.data.map((city: string) => ({
                    label: city,
                    value: city,
                }));
                setCityOptions(cities);
            })
            .catch((err) => console.error("City fetch error:", err));
    }, []);

    useEffect(() => {
        if (status === "success") {
            setCountdown(6);
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        window.location.href = "https://www.aurexventures.in";
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [status]);

    const onSubmit = async (data: FormData) => {

        setStatus("submitting");

        try {

            const orderRes = await fetch(
                "https://AurexBackend.pythonanywhere.com/api/create-order/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const orderData = await orderRes.json();

            const options = {
                method: {
                    upi: true,
                    card: true,
                    netbanking: true,
                    wallet: true,
                },
                key: orderData.key,

                amount: orderData.amount,

                currency: "INR",

                name: "Aurex Ventures",

                description: "Deal Smart Webinar",

                order_id: orderData.order_id,

                handler: async function (response: any) {

                    const verifyRes = await fetch(
                        "https://AurexBackend.pythonanywhere.com/api/verify-payment/",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type": "application/json",
                            },

                            body: JSON.stringify({

                                ...response,

                                registration_data: {

                                    first_name: data.firstName,
                                    last_name: data.lastName,
                                    company_name: data.companyName,
                                    email: data.email,
                                    phone: data.phone,
                                    city: data.city,

                                }

                            }),
                        }
                    );

                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {

                        setStatus("success");

                    } else {

                        alert("Payment verification failed");

                        setStatus("idle");
                    }
                },

                prefill: {

                    name: `${data.firstName} ${data.lastName}`,

                    email: data.email,

                    contact: data.phone,

                },

                theme: {
                    color: "#a8042b",
                },
            };

            const razorpay = new window.Razorpay(options);

            razorpay.open();

        } catch (error) {

            alert("Something went wrong");

            setStatus("idle");
        }
    };

    return (
        <>
            <div className="min-h-screen flex flex-col font-sans" style={{ background: "#f0f2f5" }}>

                {/* ── MAIN CONTENT ── */}
                <main className="flex-1 relative overflow-hidden bg-white">

                    {/* Red right panel - hidden on mobile */}
                    <div
                        className="hidden lg:block absolute top-0 right-0 bottom-0"
                        style={{ width: "48%", background: "#b8002e" }}
                    />

                    {/* White left panel with diagonal edge - hidden on mobile */}
                    <div
                        className="hidden lg:block absolute top-0 left-0 bottom-0 bg-white"
                        style={{
                            width: "60%",
                            clipPath: "polygon(0 0, 100% 0, 82% 100%, 0 100%)",
                            zIndex: 2,
                        }}
                    />

                    {/* Mobile background - solid white */}
                    <div className="lg:hidden absolute inset-0 bg-white" style={{ zIndex: 1 }} />

                    {/* Red geometric shapes - desktop only */}
                    <div className="hidden lg:block absolute top-0 right-0 bottom-0" style={{ width: "55%", zIndex: 3, pointerEvents: "none", overflow: "hidden" }}>
                        <svg
                            viewBox="0 0 700 580"
                            className="absolute top-0 right-0 w-full h-full"
                            preserveAspectRatio="xMaxYMin slice"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g transform="translate(490, 180) rotate(45)">
                                <rect x="-160" y="-160" width="320" height="320" rx="18" fill="#cc0033" />
                            </g>
                            <g transform="translate(390, 240) rotate(45)">
                                <rect x="-130" y="-130" width="260" height="260" rx="14" fill="#d40038" opacity="0.85" />
                            </g>
                            <g transform="translate(600, 60) rotate(45)">
                                <rect x="-100" y="-100" width="200" height="200" rx="12" fill="#a8002a" opacity="0.9" />
                            </g>
                            <circle cx="670" cy="30" r="180" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5" />
                            <circle cx="670" cy="30" r="130" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                            <circle cx="680" cy="570" r="200" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                            <g transform="translate(310, 60)" opacity="0.25">
                                <rect x="0" y="230" width="22" height="60" fill="white" rx="3" />
                                <rect x="32" y="200" width="22" height="90" fill="white" rx="3" />
                                <rect x="64" y="165" width="22" height="125" fill="white" rx="3" />
                                <rect x="96" y="130" width="22" height="160" fill="white" rx="3" />
                                <rect x="128" y="100" width="22" height="190" fill="white" rx="3" />
                                <rect x="160" y="65" width="22" height="225" fill="white" rx="3" />
                                <line x1="10" y1="230" x2="175" y2="50" stroke="white" strokeWidth="2.5" />
                                <polygon points="168,38 188,62 155,65" fill="white" />
                            </g>
                            {[...Array(5)].map((_, row) =>
                                [...Array(5)].map((_, col) => (
                                    <circle
                                        key={`${row}-${col}`}
                                        cx={30 + col * 110}
                                        cy={30 + row * 110}
                                        r="2.5"
                                        fill="rgba(255,255,255,0.18)"
                                    />
                                ))
                            )}
                        </svg>
                    </div>

                    {/* City skyline watermark - desktop only */}
                    <div className="hidden lg:block absolute bottom-0 left-0 pointer-events-none overflow-hidden" style={{ width: "50%", height: "140px", opacity: 0.045, zIndex: 1 }}>
                        <svg viewBox="0 0 800 200" className="w-full h-full" preserveAspectRatio="xMinYMax meet">
                            <rect x="0" y="80" width="40" height="120" fill="#1a2d5a" />
                            <rect x="50" y="60" width="30" height="140" fill="#1a2d5a" />
                            <rect x="90" y="40" width="50" height="160" fill="#1a2d5a" />
                            <rect x="150" y="20" width="35" height="180" fill="#1a2d5a" />
                            <rect x="155" y="5" width="25" height="20" fill="#1a2d5a" />
                            <rect x="195" y="50" width="60" height="150" fill="#1a2d5a" />
                            <rect x="265" y="70" width="40" height="130" fill="#1a2d5a" />
                            <rect x="315" y="30" width="45" height="170" fill="#1a2d5a" />
                            <rect x="370" y="55" width="35" height="145" fill="#1a2d5a" />
                            <rect x="415" y="45" width="55" height="155" fill="#1a2d5a" />
                            <rect x="480" y="65" width="30" height="135" fill="#1a2d5a" />
                            <rect x="520" y="35" width="45" height="165" fill="#1a2d5a" />
                            <rect x="575" y="75" width="35" height="125" fill="#1a2d5a" />
                            <rect x="620" y="50" width="50" height="150" fill="#1a2d5a" />
                        </svg>
                    </div>

                    {/* ── CONTENT GRID ── */}
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5 sm:py-6 grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-6 lg:gap-8 items-start" style={{ zIndex: 10 }}>

                        {/* ── LEFT: Hero Content ── */}
                        <div>

                            {/* Logo + Fee badge */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex items-center justify-between w-full gap-3 mb-5 "
                            >
                                <img
                                    src={logo}
                                    alt="Aurex Ventures"
                                    className="h-9 sm:h-14 object-contain"
                                />
                                <div className="flex items-center gap-0 rounded-full overflow-hidden shadow border border-[#a8042b]/20">
                                    <div className="bg-[#a8042b] flex items-center gap-1.5 px-3 sm:h-9 h-9">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-white text-[11px] font-bold uppercase tracking-wider">Registration Fee</span>
                                    </div>
                                    <div className="bg-[#fff8f8] border-l border-[#a8042b]/20 px-3 sm:h-9 h-9 flex items-center">
                                        <span className="text-[#a8042b] text-sm font-black">₹99</span>
                                    </div>
                                </div>
                            </motion.div>


                            {/* Heading */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="mb-4"
                            >
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-[#1a2d5a]">
                                    Register for
                                </h1>
                                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-[#a8042b]">
                                    Deal Smart
                                </h2>
                                <p className="text-[#1a2d5a]/70 text-base sm:text-lg font-medium mt-2 leading-snug">
                                    Master Valuation, Dilution &amp;<br className="hidden sm:block" /> Term Sheets Like an Investor
                                </p>
                            </motion.div>

                            {/* Event meta pills */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="flex flex-wrap gap-4 mb-5"
                            >
                                {[
                                    {
                                        icon: (
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                                            </svg>
                                        ),
                                        label: "31st May 2026",
                                        sub: "Sunday",
                                    },
                                    {
                                        icon: (
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                                            </svg>
                                        ),
                                        label: "7:00 – 9:00 PM",
                                        sub: "IST",
                                    },
                                    {
                                        icon: (
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path d="M12 1a3 3 0 100 6 3 3 0 000-6z" /><path d="M6 8a6 6 0 1112 0" /><path d="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2" />
                                            </svg>
                                        ),
                                        label: "Sumeet Agrawal",
                                        sub: "Live Webinar",
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2.5 border-r border-[#1a2d5a]/15 pr-4 last:border-r-0 last:pr-0">
                                        <div className="w-8 h-8 rounded-full bg-[#a8042b] flex items-center justify-center text-white flex-shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p className="text-[#1a2d5a] font-bold text-xs leading-tight">{item.label}</p>
                                            <p className="text-[#1a2d5a]/50 text-[10px]">{item.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>

                            {/* ── MENTOR CARD ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="relative w-full max-w-[520px]"
                            >
                                <div
                                    className="relative overflow-hidden rounded-[18px]"
                                    style={{
                                        height: "160px",
                                        background: "linear-gradient(90deg, #7b0017 0%, #a10020 100%)",
                                    }}
                                >
                                    {/* Right soft circle */}
                                    <div
                                        className="absolute"
                                        style={{
                                            width: "220px",
                                            height: "220px",
                                            borderRadius: "999px",
                                            background: "rgba(255,255,255,0.14)",
                                            top: "-28px",
                                            right: "-35px",
                                        }}
                                    />

                                    {/* Left content */}
                                    <div
                                        className="relative z-10 h-full flex flex-col justify-center"
                                        style={{
                                            paddingLeft: "22px",
                                            paddingTop: "14px",
                                            paddingBottom: "14px",
                                            width: "58%",
                                        }}
                                    >
                                        {/* Top small title */}
                                        <div className="flex items-center gap-2 mb-2">
                                            <span
                                                style={{
                                                    fontSize: "9px",
                                                    letterSpacing: "0.28em",
                                                    color: "rgba(255,255,255,0.75)",
                                                    fontWeight: 600,
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                Your Mentor
                                            </span>

                                            <div
                                                style={{
                                                    width: "42px",
                                                    height: "1px",
                                                    background: "rgba(255,255,255,0.35)",
                                                }}
                                            />
                                        </div>

                                        {/* Name */}
                                        <h2
                                            style={{
                                                color: "white",
                                                fontSize: "23px",
                                                fontWeight: 700,
                                                lineHeight: 1.1,
                                                marginBottom: "8px",
                                            }}
                                        >
                                            Sumeet Agrawal
                                        </h2>

                                        {/* Subtitle */}
                                        <p
                                            style={{
                                                color: "rgba(255,255,255,0.82)",
                                                fontSize: "11px",
                                                lineHeight: 1.45,
                                                margin: 0,
                                            }}
                                        >
                                            Investor & Startup Mentor
                                        </p>

                                        <p
                                            style={{
                                                color: "rgba(255,255,255,0.82)",
                                                fontSize: "11px",
                                                lineHeight: 1.45,
                                                marginTop: "1px",
                                            }}
                                        >
                                            20+ Years in Finance & Investments
                                        </p>

                                        {/* LinkedIn */}
                                        <a
                                            href="https://www.linkedin.com/in/sumeetagrawal/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center"
                                            style={{
                                                width: "28px",
                                                height: "28px",
                                                borderRadius: "6px",
                                                background: "#0077B5",
                                                marginTop: "12px",
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="white"
                                                style={{ width: "13px", height: "13px" }}
                                            >
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                                            </svg>
                                        </a>
                                    </div>

                                    {/* Right image */}
                                    <div
                                        className="absolute bottom-0 right-0 z-10"
                                        style={{
                                            width: "250px",
                                            height: "165px",
                                        }}
                                    >
                                        <img
                                            src={sumeet}
                                            alt="Sumeet Agrawal"
                                            className="w-full h-full"
                                            style={{
                                                objectFit: "contain",
                                                objectPosition: "bottom right",
                                            }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* ── RIGHT: Registration Form ── */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 sm:p-5 lg:mt-24 mt-18"
                            style={{ position: "relative", zIndex: 15 }}
                        >
                            <h2 className="text-base font-bold text-[#1a2d5a] text-center mb-0.5">Reserve Your Seat</h2>
                            <p className="text-center text-[10px] text-gray-400 mb-3">Your info is secure and used only for this webinar.</p>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    <div>
                                        <input {...register("firstName")} placeholder="First Name *" className="input" />
                                        {errors.firstName && <p className="text-[10px] text-red-500 mt-0.5">{errors.firstName.message}</p>}
                                    </div>
                                    <div>
                                        <input {...register("lastName")} placeholder="Last Name *" className="input" />
                                        {errors.lastName && <p className="text-[10px] text-red-500 mt-0.5">{errors.lastName.message}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    <div>
                                        <input {...register("companyName")} placeholder="Startup / Company *" className="input" />
                                        {errors.companyName && <p className="text-[10px] text-red-500 mt-0.5">{errors.companyName.message}</p>}
                                    </div>
                                    <Controller
                                        name="city"
                                        control={control}
                                        defaultValue={undefined}
                                        render={({ field }) => (
                                            <Select
                                                options={cityOptions}
                                                placeholder="Select City"
                                                isSearchable
                                                value={cityOptions.find((c) => c.value === field.value) || null}
                                                onChange={(option) => field.onChange(option?.value)}
                                                menuPlacement="bottom"
                                                menuPosition="fixed"
                                                menuPortalTarget={document.body}
                                                styles={{
                                                    control: (base) => ({
                                                        ...base,
                                                        minHeight: "36px",
                                                        borderRadius: "6px",
                                                        borderColor: "#d1d5db",
                                                        fontSize: "0.8125rem",
                                                        boxShadow: "none",
                                                        "&:hover": { borderColor: "#a8042b" },
                                                    }),
                                                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                                }}
                                            />
                                        )}
                                    />
                                </div>

                                <div>
                                    <input {...register("email")} placeholder="Work Email *" className="input" />
                                    {errors.email && <p className="text-[10px] text-red-500 mt-0.5">{errors.email.message}</p>}
                                    <p className="text-[9px] text-gray-400 mt-0.5 ml-1">Use your official / professional email if available</p>
                                </div>

                                <div>
                                    <input
                                        {...register("phone")}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        placeholder="Phone Number *"
                                        className="input"
                                        onInput={(e) => {
                                            (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.replace(/[^0-9]/g, "");
                                        }}
                                    />
                                    {errors.phone && <p className="text-[10px] text-red-500 mt-0.5">{errors.phone.message}</p>}
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting || status === "submitting"}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full text-white font-bold py-2.5 rounded-lg shadow-md text-sm tracking-wide"
                                    style={{ background: "linear-gradient(to right, #a8042b, #c2053a)" }}
                                >
                                    {status === "submitting" ? "Registering..." : "Reserve My Seat →"}
                                </motion.button>
                            </form>

                            <div className="mt-3 pt-2.5 border-t flex items-center justify-center gap-2 text-[10px] text-[#1a2d5a]/60 font-medium">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                                    <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                                </svg>
                                aurexventures.in
                            </div>
                        </motion.div>
                    </div >
                </main >

                {/* ── SESSION HIGHLIGHTS FOOTER BAR ── */}
                < motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    style={{ background: "#1a2d5a", position: "relative", zIndex: 10 }}
                >
                    <div style={{ height: "3px", background: "#a8042b" }} />

                    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4">
                        <div className="flex items-center gap-3 justify-center mb-3.5">
                            <div className="flex-1 h-px max-w-[60px]" style={{ background: "rgba(255,255,255,0.12)" }} />
                            <p className="text-white text-[10px] uppercase tracking-[0.25em] font-bold">Session Highlights</p>
                            <div className="flex-1 h-px max-w-[60px]" style={{ background: "rgba(255,255,255,0.12)" }} />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                            {[
                                {
                                    icon: (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                                        </svg>
                                    ),
                                    title: "Investor Mindset",
                                    desc: "Decode how investors think and decide",
                                },
                                {
                                    icon: (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                                            <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
                                        </svg>
                                    ),
                                    title: "Valuation Mastery",
                                    desc: "Pre-money vs Post-money explained simply",
                                },
                                {
                                    icon: (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
                                            <line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
                                        </svg>
                                    ),
                                    title: "Dilution Decoded",
                                    desc: "Understand dilution with clarity",
                                },
                                {
                                    icon: (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
                                            <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                                        </svg>
                                    ),
                                    title: "Term Sheet Essentials",
                                    desc: "Key clauses every founder must know",
                                },
                                {
                                    icon: (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
                                        </svg>
                                    ),
                                    title: "Red Flags",
                                    desc: "Spot what investors worry about",
                                },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-2.5">
                                    <div
                                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white"
                                        style={{ background: "#a8042b" }}
                                    >
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-xs leading-tight">{item.title}</p>
                                        <p className="text-[10px] mt-0.5 leading-snug" style={{ color: "rgba(255,255,255,0.55)" }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div >

                {/* ── PAGE FOOTER ── */}
                < footer className="bg-white text-center py-2.5 px-4 text-[10px] text-gray-400 border-t border-gray-200" >
                    For more information, please visit{" "}
                    <a
                        href="https://www.aurexventures.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline underline-offset-2 transition-colors"
                        style={{ color: "#a8042b" }}
                    >
                        www.aurexventures.in
                    </a>
                </footer >
            </div >

            {/* ── SUCCESS MODAL ── */}
            <AnimatePresence>
                {
                    status === "success" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 flex items-center justify-center z-50 p-4"
                            style={{ background: "rgba(0,0,0,0.6)" }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">You're Registered! 🎉</h3>
                                <p className="text-gray-600 text-sm mb-1.5">
                                    Thank you for registering for{" "}
                                    <span className="font-semibold" style={{ color: "#a8042b" }}>Deal Smart</span>.
                                </p>
                                <p className="text-gray-500 text-xs mb-5">
                                    See you on <strong>31st May 2026</strong> at <strong>7:00 PM</strong> IST!
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => (window.location.href = "https://www.aurexventures.in")}
                                    className="text-white font-semibold py-2.5 px-7 rounded-lg shadow text-sm"
                                    style={{ background: "linear-gradient(to right, #a8042b, #c2053a)" }}
                                >
                                    Continue to Website →
                                </motion.button>
                                <p className="text-[10px] text-gray-400 mt-3">
                                    (Auto-redirecting in {countdown} second{countdown !== 1 ? "s" : ""}...)
                                </p>
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence >

            <style>{`
        .input {
          width: 100%;
          padding: 0.5rem 0.65rem;
          font-size: 0.8125rem;
          border-radius: 0.375rem;
          border: 1px solid #d1d5db;
          background: #fff;
          color: #111827;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .input:focus {
          border-color: #a8042b;
          box-shadow: 0 0 0 2px rgba(168, 4, 43, 0.10);
          outline: none;
        }
        .input::placeholder { color: #9ca3af; }
      `}</style>
        </>
    );
};

export default WebinarPage;