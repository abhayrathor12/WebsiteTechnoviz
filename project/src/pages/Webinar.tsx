// src/pages/WebinarPage.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import * as z from "zod";
import { Controller } from "react-hook-form";
import logo from "../public/logo.png";



const stateOptions = [
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
  { value: "Assam", label: "Assam" },
  { value: "Bihar", label: "Bihar" },
  { value: "Chhattisgarh", label: "Chhattisgarh" },
  { value: "Goa", label: "Goa" },
  { value: "Gujarat", label: "Gujarat" },
  { value: "Haryana", label: "Haryana" },
  { value: "Himachal Pradesh", label: "Himachal Pradesh" },
  { value: "Jharkhand", label: "Jharkhand" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Kerala", label: "Kerala" },
  { value: "Madhya Pradesh", label: "Madhya Pradesh" },
  { value: "Maharashtra", label: "Maharashtra" },
  { value: "West Bengal", label: "West Bengal" },
];

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  city: z.string().optional(),
});


type FormData = z.infer<typeof formSchema>;

const WebinarPage: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [countdown, setCountdown] = useState(6); // Add this state
  const [cityOptions, setCityOptions] = useState<
    { label: string; value: string }[]
  >([]);


  const {
    register,
    handleSubmit,
    control, // ✅ ADD THIS
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });


  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: "India" }),
    })
      .then(res => res.json())
      .then(data => {
        const cities = data.data.map((city: string) => ({
          label: city,
          value: city,
        }));
        setCityOptions(cities);
      })
      .catch(err => console.error("City fetch error:", err));
  }, []);


  // Auto-redirect after success modal is shown (4 seconds)
  useEffect(() => {
    if (status === "success") {
      setCountdown(6); // Reset countdown when success is triggered

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.href = "https://technovizautomation.com";
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer); // Cleanup on unmount
    }
  }, [status]);

  const onSubmit = async (data: FormData) => {
    setStatus("submitting");
    try {
      const response = await fetch(
        "https://websiteBackend.pythonanywhere.com/api/webinar/register/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: data.firstName,
            last_name: data.lastName,
            company_name: data.companyName,
            email: data.email,
            phone: data.phone,
            city: data.city,
          }),
        }
      );

      if (!response.ok) throw new Error("Registration failed");

      // Success → show modal
      setStatus("success");
    } catch (error) {
      setStatus("idle");
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#203f78] to-[#1a335a] px-3 sm:px-4 py-5 sm:py-6">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 w-40 sm:w-48 h-40 sm:h-48 bg-[#203f78]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-44 sm:w-56 h-44 sm:h-56 bg-[#1a335a]/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* LOGO */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-4"
          >
            {/* Styled website link - top left */}
            <a
              href="https://www.technovizautomation.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="animated-border-link flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200 text-xs font-medium tracking-wide"
            >
              {/* <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
              </svg> */}
              Technovizautomation.com
            </a>

            {/* Logo centered */}
            <img
              src={logo}
              alt="Company Logo"
              className="h-10 sm:h-14 lg:h-16 object-contain"
            />

            {/* Spacer to balance flex */}
            <div className="w-40" />
          </motion.div>

          {/* HEADING */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-6 sm:mb-8"
          >
            Register for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ddaf26] to-[#f0c45c]">
              Smart Manufacturing Webinar
            </span>
          </motion.h1>

          {/* CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-5 max-w-full sm:max-w-md mx-auto lg:mx-0">
                <h3 className="text-lg font-semibold text-[#ddaf26] mb-2">
                  What You’ll Learn
                </h3>

                <p className="text-sm text-gray-200 mb-3">
                  Join us for an insightful webinar on{" "}
                  <span className="font-semibold">
                    Smart Manufacturing Use Case Applications in IIoT and Industry
                    4.0auto
                  </span>
                  , where we explore how connected systems and data-driven
                  technologies are transforming modern factories.
                </p>

                <ul className="list-disc list-inside text-sm text-gray-200 space-y-2">
                  <li>
                    Explore <strong>practical real-world manufacturing use cases</strong>
                  </li>
                  <li>
                    Learn how <strong>OEE monitoring</strong> improves productivity
                  </li>
                  <li>
                    See how <strong>image processing & machine vision</strong> enable
                    automated inspection
                  </li>
                  <li>
                    Discover <strong>IIoT applications</strong> for connectivity
                  </li>
                  <li>
                    Gain insights into <strong>AI-based analytics</strong>
                  </li>
                  <li>
                    Understand how <strong>production dashboards</strong> give
                    shop-floor visibility
                  </li>
                </ul>

                <p className="text-sm text-gray-200 mt-3">
                  Walk away with a clear understanding of{" "}
                  <strong>measurable business value</strong>.
                </p>
              </div>

              <div className="flex justify-center lg:justify-start gap-2 mt-4 text-[#ddaf26] font-semibold text-sm">
                ⚡ Learn from real manufacturing use cases – Register now
              </div>
            </motion.div>

            {/* RIGHT FORM */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/95 rounded-2xl p-5 sm:p-6 shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-[#203f78] text-center mb-5">
                Reserve Your Seat
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    {...register("firstName")}
                    placeholder="First Name *"
                    className="input"
                  />
                  <input
                    {...register("lastName")}
                    placeholder="Last Name *"
                    className="input"
                  />
                </div>

                {/* CHANGE 1: Company + State side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    {...register("companyName")}
                    placeholder="Company Name *"
                    className="input"
                  />
                  <Controller
                    name="city"
                    control={control}
                    defaultValue={undefined}
                    render={({ field }) => (
                      <Select
                        options={cityOptions}
                        placeholder="Select City"
                        isSearchable={true}      // ✅ MUST
                        value={
                          cityOptions.find(c => c.value === field.value) || null
                        }
                        onChange={(option) => field.onChange(option?.value)}
                        menuPlacement="bottom"
                        menuPosition="fixed"
                        menuPortalTarget={document.body}
                        styles={{
                          control: (base) => ({
                            ...base,
                            minHeight: "40px",
                            borderRadius: "8px",
                          }),
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        }}
                      />
                    )}
                  />

                </div>

                {/* CHANGE 2: Professional email placeholder */}
                <input
                  {...register("email")}
                  placeholder="Work Email (e.g. name@company.com)"
                  className="input"
                />
                <p className="text-xs text-gray-500">
                  Please use your official / professional email if available
                </p>
                <input
                  {...register("phone")}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Phone Number *"
                  className="input"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                />

                <motion.button
                  type="submit"
                  disabled={isSubmitting || status === "submitting"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#203f78] to-[#1a335a] text-white font-semibold py-3 rounded-lg"
                >
                  {status === "submitting" ? "Registering..." : "Reserve My Seat →"}
                </motion.button>
              </form>

              <p className="text-center text-xs text-gray-500 mt-4">
                Your info is secure and used only for this webinar.
              </p>

              <div className="mt-5 pt-4 border-t flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm font-medium text-[#203f78]">
                <span>📞 +91 9999765380</span>
                <span>✉️ support@technovizautomation.com</span>
              </div>
            </motion.div>
          </div>
        </div>

        <style>
          {`

         @property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes spin-border {
  to { --angle: 360deg; }
}

.animated-border-link {
  position: relative;
  border: none !important;
  z-index: 0;
}

.animated-border-link::before {
  content: '';
  position: absolute;
  inset: -1.5px;
  border-radius: 9999px;
  padding: 1.5px;
  background: conic-gradient(
    from var(--angle),
    transparent 0deg,
    transparent 300deg,
    #ddaf26 330deg,
    #fff8e1 350deg,
    #ddaf26 360deg
  );
  animation: spin-border 2.5s linear infinite;
  z-index: -1;
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
          .input {
            width: 100%;
            padding: 0.65rem 0.75rem;
            font-size: 0.875rem;
            border-radius: 0.5rem;
            border: 1px solid #d1d5db;
          }
          .input:focus {
            border-color: #203f78;
            box-shadow: 0 0 0 2px rgba(32,63,120,.2);
            outline: none;
          }
        `}
        </style>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                You have successfully registered!
              </h3>

              <p className="text-gray-600 mb-6">
                Thank you for registering for the Smart Manufacturing Webinar.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = "https://technovizautomation.com"}
                className="bg-gradient-to-r from-[#203f78] to-[#1a335a] text-white font-semibold py-3 px-8 rounded-lg"
              >
                Continue to Website →
              </motion.button>

              <p className="text-xs text-gray-500 mt-4">
                (Auto-redirecting in {countdown} second{countdown !== 1 ? "s" : ""}...)
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WebinarPage;
