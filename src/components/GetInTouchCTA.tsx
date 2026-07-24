"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function GetInTouchCTA() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-[460px] sm:min-h-[500px] flex items-center overflow-hidden bg-neutral-900">
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] z-20" />
      {/* Background Image: Mining Investment Post 2 */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/Mining%20Investment%20Post%202.avif"
          alt="Québec City panoramic skyline and Canadian flag"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Soft Left Gradient Overlay for Text Readability - Keeps Right Side Image Vivid */}
      <div className="absolute inset-y-0 left-0 w-full sm:w-[65%] lg:w-[50%] bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-0" />

      {/* Main Content Box */}
      <div className="relative z-10 max-w-[1240px] w-full mx-auto px-4 sm:px-6 md:px-8">
        <div className="max-w-[440px] flex flex-col items-start text-left py-12">
          <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
            {t("cta-tag", "HAVE A QUESTION?")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#1a1f2c] leading-[1.2] mb-3">
            {t("cta-title", "Get in Touch")}
          </h2>
          <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-4" />

          <p className="text-neutral-800 font-semibold text-xs sm:text-[13px] leading-relaxed mb-6">
            {t("cta-desc-prefix", "For more information about 'THE Event' programming or registration, please contact")}{" "}
            <a
              href="mailto:jchoi@irinc.ca"
              className="underline font-bold text-neutral-900 hover:text-[#C6112F] transition-colors"
            >
              jchoi@irinc.ca
            </a>{" "}
            {t("cta-desc-or", "or call")}{" "}
            <a
              href="tel:+19055153508"
              className="underline font-bold text-neutral-900 hover:text-[#C6112F] transition-colors"
            >
              +1-905-515-3508
            </a>
            .
          </p>

          {/* Red Action Button */}
          <Link
            href="/register"
            className="bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs sm:text-[13px] font-extrabold tracking-wider px-7 py-3.5 rounded-lg uppercase inline-flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all"
          >
            <span>{t("nav-register", "REGISTER HERE")}</span>
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.8" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 8.5L14 12L10.5 15.5M14 12H8.5"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
