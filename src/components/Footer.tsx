"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative w-full bg-[#f0f3f6] pt-14 pb-10 overflow-hidden text-left">
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] z-20" />

      {/* 3D Faceted Origami Vector Backdrop */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
        >
          <rect width="1440" height="600" fill="#f0f3f6" />
          <polygon points="0,0 500,0 380,600 0,600" fill="#ffffff" opacity="0.9" />
          <polygon points="500,0 980,0 900,600 380,600" fill="#f8fafc" opacity="0.75" />
          <polygon points="980,0 1440,0 1440,600 900,600" fill="#e4e9ee" opacity="0.65" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Top Footer Section: 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-neutral-300/70">
          {/* Column 1: Want to Join With Us CTA */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <span className="text-[#C6112F] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-1 block">
              {t("footer-questions", "WANT TO JOIN WITH US?")}
            </span>
            <div className="w-14 h-[2.5px] bg-[#C6112F] rounded-full mb-4" />

            <p className="text-neutral-700 text-xs sm:text-sm font-medium leading-relaxed mb-6 max-w-[380px]">
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

            <a
              href="#"
              className="bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs sm:text-sm font-extrabold tracking-wider px-6 py-3 rounded-lg uppercase inline-flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all"
            >
              <span>{t("nav-register", "REGISTER HERE")}</span>
              <svg
                className="w-4 h-4 text-white"
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
            </a>
          </div>

          {/* Column 2: INITIATIVES */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <h3 className="text-[#C6112F] font-extrabold text-xs sm:text-sm tracking-wider uppercase mb-1">
              {t("footer-initiatives", "INITIATIVES")}
            </h3>
            <div className="w-10 h-[2.5px] bg-[#C6112F] rounded-full mb-4" />

            <ul className="space-y-3 text-xs sm:text-sm font-bold text-neutral-700">
              <li>
                <Link href="/student" className="hover:text-[#C6112F] transition-colors">
                  {t("footer-link-student-sponsor", "Student Sponsorship")}
                </Link>
              </li>
              <li>
                <Link href="/sheco" className="hover:text-[#C6112F] transition-colors">
                  {t("footer-link-sheco", "SHE-CO")}
                </Link>
              </li>
              <li>
                <Link href="/student" className="hover:text-[#C6112F] transition-colors">
                  {t("footer-link-student-volunteer", "Student Volunteer")}
                </Link>
              </li>
              <li>
                <Link href="/newsflash" className="hover:text-[#C6112F] transition-colors">
                  {t("nav-newsflash", "THE Newsflash")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: ABOUT */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <h3 className="text-[#C6112F] font-extrabold text-xs sm:text-sm tracking-wider uppercase mb-1">
              {t("footer-about", "ABOUT")}
            </h3>
            <div className="w-10 h-[2.5px] bg-[#C6112F] rounded-full mb-4" />

            <ul className="space-y-3 text-xs sm:text-sm font-bold text-neutral-700">
              <li>
                <Link href="/about" className="hover:text-[#C6112F] transition-colors">
                  {t("nav-about-event", "About THE Event")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C6112F] transition-colors">
                  {t("footer-link-registration", "Registration Information")}
                </Link>
              </li>
              <li>
                <Link href="/travel" className="hover:text-[#C6112F] transition-colors">
                  {t("nav-travel", "Travel & Accommodations")}
                </Link>
              </li>
              <li>
                <Link href="/partnership" className="hover:text-[#C6112F] transition-colors">
                  {t("footer-link-our-sponsors", "Our Sponsors")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: PROGRAM */}
          <div className="lg:col-span-3 flex flex-col items-start text-left">
            <h3 className="text-[#C6112F] font-extrabold text-xs sm:text-sm tracking-wider uppercase mb-1">
              {t("footer-program", "PROGRAM")}
            </h3>
            <div className="w-10 h-[2.5px] bg-[#C6112F] rounded-full mb-4" />

            <ul className="space-y-3 text-xs sm:text-sm font-bold text-neutral-700">
              <li>
                <Link href="/student" className="hover:text-[#C6112F] transition-colors">
                  {t("footer-link-student-sponsor", "Student Sponsorship")}
                </Link>
              </li>
              <li>
                <Link href="/sheco" className="hover:text-[#C6112F] transition-colors">
                  {t("footer-link-sheco", "SHE-CO")}
                </Link>
              </li>
              <li>
                <Link href="/media" className="hover:text-[#C6112F] transition-colors">
                  {t("nav-media", "Recent Media")}
                </Link>
              </li>
              <li>
                <Link href="/newsflash" className="hover:text-[#C6112F] transition-colors">
                  {t("nav-newsflash", "THE Newsflash")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Legal Disclaimer */}
        <div className="pt-8 text-left">
          <h4 className="text-[#C6112F] font-extrabold text-xs sm:text-sm tracking-wider uppercase mb-2">
            © 2026 THE MINING INVESTMENT EVENT | {t("footer-disclaimer", "DISCLAIMER")}
          </h4>
          <p className="text-neutral-600 text-xs sm:text-[13px] leading-relaxed font-medium max-w-[1200px]">
            {t("footer-disclaimer-text", "This website, the events, information and materials pertaining to and associated with THE Mining Investment Event, are not and should not be construed as an offer to buy or sell, or as a solicitation of an offer to buy or sell, sponsor, advocate, endorse, promote or be construed as making any recommendation or providing investment or other advice for any regulated products, securities or investments.")}
          </p>
        </div>
      </div>
    </footer>
  );
}
