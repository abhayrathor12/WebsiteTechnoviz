// src/pages/WebinarPage.tsx
import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Update this path to match where your logo is stored
// Example options:
// - If in public folder: use src="/logo.png" directly in the img tag (no import needed)
// - If in src/assets: import it like below
import logo from "../public/logo.png"; // ← Change this path to your actual logo location

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
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("https://websitebackend.pythonanywhere.com/api/webinar/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: data.firstName,
          last_name: data.lastName,
          company_name: data.companyName,
          email: data.email,
          phone: data.phone,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const result = await response.json();

      // Redirect on success
      window.location.href = result.redirect_url;
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#203f78] to-[#1a335a] flex flex-col items-center justify-center px-4 py-8">
      {/* Subtle Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-48 h-48 bg-[#203f78]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-[#1a335a]/20 rounded-full blur-3xl" />
      </div>

      {/* Logo at the top */}
      <div className="relative z-10 mb-8 lg:mb-12 w-full max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center lg:justify-start"
        >
          <img
            src={logo}
            alt="Company Logo"
            className="h-12 sm:h-14 lg:h-16 object-contain"
          />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Register for Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ddaf26] to-[#f0c45c]">
                Upcoming Webinar
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-200 mb-6 max-w-md mx-auto lg:mx-0">
              Discover cutting-edge strategies to scale your digital business with exclusive insights and tools.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-2 text-[#ddaf26] font-semibold text-sm sm:text-base">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Seats Are Limited – Register Now!
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-2xl border border-white/50"
          >
            <div className="text-center mb-5">
              <h2 className="text-xl sm:text-2xl font-bold text-[#203f78]">Reserve Your Seat</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    {...register("firstName")}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-[#203f78] focus:ring-2 focus:ring-[#203f78]/20 outline-none"
                    placeholder="First Name *"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <input
                    {...register("lastName")}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-[#203f78] focus:ring-2 focus:ring-[#203f78]/20 outline-none"
                    placeholder="Last Name *"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                </div>
              </div>
              <input
                {...register("companyName")}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-[#203f78] focus:ring-2 focus:ring-[#203f78]/20 outline-none"
                placeholder="Company Name *"
              />
              {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
              <input
                {...register("email")}
                type="email"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-[#203f78] focus:ring-2 focus:ring-[#203f78]/20 outline-none"
                placeholder="Email Address *"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              <input
                {...register("phone")}
                type="tel"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-[#203f78] focus:ring-2 focus:ring-[#203f78]/20 outline-none"
                placeholder="Phone Number *"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#203f78] to-[#1a335a] text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all text-base"
              >
                {isSubmitting ? "Registering..." : "Reserve My Seat →"}
              </motion.button>
            </form>
            <p className="text-center text-xs text-gray-500 mt-4">
              Your info is secure and used only for this webinar.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WebinarPage;