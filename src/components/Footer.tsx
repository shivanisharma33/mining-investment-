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

            <Link
              href="/register"
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
            </Link>

            {/* Social Media Icons */}
            <div className="mt-6 flex flex-col items-start gap-3">
              <span className="text-[11px] font-extrabold tracking-[0.2em] text-neutral-500 uppercase flex items-center gap-2">
                <span>{t("footer-follow-us", "FOLLOW US")}</span>
                <span className="h-[1.5px] w-7 bg-[#C6112F]/40 inline-block rounded-full" />
              </span>
              <div className="flex items-center gap-3">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="group relative w-10 h-10 rounded-xl bg-[#C6112F]/10 border border-[#C6112F]/30 flex items-center justify-center text-[#C6112F] shadow-sm hover:bg-[#C6112F] hover:text-white hover:border-[#C6112F] hover:shadow-[0_6px_20px_rgba(198,17,47,0.4)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>

                {/* X / Twitter */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  title="X (Twitter)"
                  className="group relative w-10 h-10 rounded-xl bg-[#C6112F]/10 border border-[#C6112F]/30 flex items-center justify-center text-[#C6112F] shadow-sm hover:bg-[#C6112F] hover:text-white hover:border-[#C6112F] hover:shadow-[0_6px_20px_rgba(198,17,47,0.4)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  title="Facebook"
                  className="group relative w-10 h-10 rounded-xl bg-[#C6112F]/10 border border-[#C6112F]/30 flex items-center justify-center text-[#C6112F] shadow-sm hover:bg-[#C6112F] hover:text-white hover:border-[#C6112F] hover:shadow-[0_6px_20px_rgba(198,17,47,0.4)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.69c0-2.47 1.47-3.83 3.72-3.83 1.08 0 2.2.19 2.2.19v2.42h-1.24c-1.23 0-1.61.76-1.61 1.54V12h2.73l-.44 3h-2.29v6.8c4.56-.93 8-4.96 8-9.8z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                  className="group relative w-10 h-10 rounded-xl bg-[#C6112F]/10 border border-[#C6112F]/30 flex items-center justify-center text-[#C6112F] shadow-sm hover:bg-[#C6112F] hover:text-white hover:border-[#C6112F] hover:shadow-[0_6px_20px_rgba(198,17,47,0.4)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com/@vidconferences?si=VVEfWLrZyKUbjTEY"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  title="YouTube"
                  className="group relative w-10 h-10 rounded-xl bg-[#C6112F]/10 border border-[#C6112F]/30 flex items-center justify-center text-[#C6112F] shadow-sm hover:bg-[#C6112F] hover:text-white hover:border-[#C6112F] hover:shadow-[0_6px_20px_rgba(198,17,47,0.4)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
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
