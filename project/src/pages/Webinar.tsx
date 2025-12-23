// src/pages/WebinarPage.tsx
import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import logo from "../public/logo.png";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type FormData = z.infer<typeof formSchema>;

const WebinarPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
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
          }),
        }
      );

      if (!response.ok) throw new Error("Registration failed");
      const result = await response.json();
      window.location.href = result.redirect_url;
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
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
          className="flex justify-center mb-4"
        >
          <img
            src={logo}
            alt="Company Logo"
            className="h-10 sm:h-14 lg:h-16 object-contain"
          />
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
                  4.0
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

              <input
                {...register("companyName")}
                placeholder="Company Name *"
                className="input"
              />
              <input
                {...register("email")}
                placeholder="Email Address *"
                className="input"
              />
              <input
                {...register("phone")}
                placeholder="Phone Number *"
                className="input"
              />

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#203f78] to-[#1a335a] text-white font-semibold py-3 rounded-lg"
              >
                {isSubmitting ? "Registering..." : "Reserve My Seat →"}
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
  );
};

export default WebinarPage;
