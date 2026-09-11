"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function GolfPage() {
  const { lang } = useLanguage();
  const isFr = lang === "FR";

  const pdfUrl = "/GOLF+SPONSORSHIP+BANNER[40].pdf";



  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-white dark:bg-[#0e1626] transition-colors duration-300">
        {/* ═══════ HERO SECTION WITH OUR GOLF DAY PHOTO ═══════ */}
        <section className="relative w-full min-h-[580px] sm:min-h-[640px] md:min-h-[700px] flex items-center justify-start overflow-hidden bg-neutral-950 pt-24 sm:pt-28">
          {/* Authentic Golf Day Photo Background */}
          <img
            src="/MINING INVESTMENT EVENT 2026_DAY 1_GOLF-19.jpg"
            alt="THE Iconic Golf Day - Le Tournoi Doré at Golf Club La Tempête"
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
            fetchPriority="high"
          />

          {/* Premium Gradient Overlays for Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/75 to-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 z-10" />

          {/* Main Hero Content */}
          <div className="relative z-20 max-w-[1240px] mx-auto w-full px-4 sm:px-6 md:px-8 pt-8 pb-14 sm:pb-16 flex flex-col justify-between h-full">
            <div className="max-w-2xl">
              {/* Host Venue Badge featuring Le Tempête Logo */}
              <div className="host-venue-capsule inline-flex items-center gap-3 px-4 py-2 rounded-full shadow-lg border border-neutral-200/80 mb-5 select-none">
                <span className="host-venue-text text-xs sm:text-sm font-black uppercase tracking-wider">
                  {isFr ? "Club Hôte" : "Host Venue"}
                </span>
                <span className="host-venue-divider w-[1.5px] h-4.5 shrink-0" />
                <img
                  src="/La+Tempete.webp"
                  alt="Club de Golf La Tempête"
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </div>

              {/* Title: THE Iconic Golf Day / Le Tournoi Doré */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-[1.08] drop-shadow-md">
                <span className="text-[#C6112F]">THE</span> ICONIC GOLF DAY
                <br />
                <span className="text-white/90 text-2xl sm:text-4xl md:text-5xl font-extrabold">
                  LE TOURNOI DORÉ
                </span>
              </h1>

              {/* Red Accent Line */}
              <div className="w-24 sm:w-28 h-[3.5px] bg-[#C6112F] my-4 sm:my-5 rounded-full shadow-xs" />

              {/* Subtitle */}
              <p className="text-xs sm:text-sm font-bold tracking-widest text-neutral-200 uppercase mb-6 sm:mb-8 drop-shadow-sm">
                {isFr
                  ? "L'Événement de Golf Exclusif · Golf Club La Tempête"
                  : "The Exclusive Golf Gathering · Golf Club La Tempête"}
              </p>

              {/* Action Buttons: Register 4some + PDF Banner */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
                {/* Register 4some Mail CTA */}
                <a
                  href="mailto:ada@irinc.ca?subject=Register%20Golf%204some%20-%20THE%20Iconic%20Golf%20Day"
                  className="inline-flex items-center gap-2.5 bg-[#C6112F] hover:bg-[#a80d26] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-lg uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#C6112F]/40 hover:scale-[1.03] cursor-pointer"
                >
                  <svg
                    className="w-4 h-4 text-white shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <span>
                    {isFr ? "INSCRIRE VOTRE 4SOME" : "REGISTER YOUR 4SOME"}
                  </span>
                </a>

                {/* View PDF Sponsorship Banner */}
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-white/15 hover:bg-white/25 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-lg uppercase tracking-wider transition-all duration-300 backdrop-blur-md border border-white/25 hover:border-white/40 shadow-md"
                >
                  <svg
                    className="w-4 h-4 text-[#ff4d6d] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                  <span>
                    {isFr
                      ? "BANNIÈRE DE COMMANDITE (PDF)"
                      : "SPONSORSHIP BANNER (PDF)"}
                  </span>
                </a>
              </div>

              {/* Event Date & Location Info Row */}
              <div className="flex flex-wrap items-center gap-6 text-white pt-3 border-t border-white/15 max-w-lg">
                {/* Date */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0">
                    <svg
                      className="w-5 h-5 text-[#ff3b5c]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <path strokeLinecap="round" d="M16 2v4M8 2v4M3 9h18" />
                      <circle cx="8" cy="14" r="1" fill="currentColor" />
                      <circle cx="12" cy="14" r="1" fill="currentColor" />
                      <circle cx="16" cy="14" r="1" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-xs sm:text-sm font-semibold leading-snug">
                    <span className="text-neutral-300">
                      {isFr ? "Lundi" : "Monday"}
                    </span>
                    <span className="font-bold text-white">
                      {isFr ? "1er Juin 2026" : "June 1, 2026"}
                    </span>
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="hidden sm:block h-9 w-[1px] bg-white/25" />

                {/* Location with Venue Name */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0">
                    <svg
                      className="w-5 h-5 text-[#ff3b5c]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col text-xs sm:text-sm font-semibold leading-snug">
                    <span className="text-neutral-300">Golf Club La Tempête</span>
                    <span className="font-bold text-white">Lévis, Québec</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ REGISTER YOUR 4SOME CALLOUT ═══════ */}
        <section className="relative w-full bg-gradient-to-r from-[#8a091e] via-[#C6112F] to-[#a80d26] text-white py-10 sm:py-12 shadow-md">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-center md:text-left">
              <span className="inline-block bg-white/20 text-white text-[11px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-2">
                {isFr ? "INSCRIPTION QUATUOR" : "FOURSOME REGISTRATION"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug mb-1">
                {isFr
                  ? "Contactez ada@irinc.ca pour inscrire votre 4some"
                  : "Contact ada@irinc.ca to register your 4some"}
              </h2>
              <p className="text-white/90 text-xs sm:text-sm font-medium">
                {isFr
                  ? "Réservez dès maintenant votre quatuor pour le tournoi officiel de golf de THE Event au prestigieux Golf Club La Tempête."
                  : "Secure your foursome now for THE Event's official tournament at the championship Golf Club La Tempête."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href="mailto:ada@irinc.ca?subject=Register%20Golf%204some%20-%20THE%20Iconic%20Golf%20Day"
                className="inline-flex items-center gap-2 bg-white hover:bg-neutral-100 text-[#C6112F] font-black text-xs sm:text-sm px-6 py-3.5 rounded-lg uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-105"
              >
                <svg
                  className="w-4 h-4 text-[#C6112F] shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <span>ada@irinc.ca</span>
              </a>
            </div>
          </div>
        </section>

        {/* ═══════ SPONSORSHIP BANNER PDF PRESENTATION (REPLACES LOGO CAROUSEL) ═══════ */}
        <section
          id="sponsorship-banner"
          className="relative w-full py-14 sm:py-18 bg-white dark:bg-[#0e1626] transition-colors duration-300"
        >
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-[#C6112F] text-xs font-black tracking-[0.25em] uppercase mb-2 block">
                {isFr
                  ? "BANNIÈRE OFFICIELLE DES PARTENAIRES"
                  : "OFFICIAL PARTNER BANNER"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1a1f2c] dark:text-white mb-3">
                <span className="text-[#C6112F]">THE</span> Iconic Golf Day
                Sponsorship Banner
              </h2>
              <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mx-auto mb-4" />
              <p className="text-neutral-600 dark:text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
                {isFr
                  ? "Consultez la bannière officielle de commandite et nos partenaires pour la journée de golf au Golf Club La Tempête."
                  : "Explore the official tournament sponsorship banner celebrating our partners at Golf Club La Tempête."}
              </p>
            </div>

            {/* Interactive PDF Banner Viewer Container */}
            <div className="w-full bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-300 dark:border-slate-800 shadow-2xl">
              {/* Top PDF Control Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-neutral-900 text-white border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#C6112F] flex items-center justify-center text-white shrink-0 font-black text-xs">
                    PDF
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white">
                      GOLF+SPONSORSHIP+BANNER[40].pdf
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      THE Iconic Golf Day · Official Sponsorship
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  {/* Download Button */}
                  <a
                    href={pdfUrl}
                    download="THE_Iconic_Golf_Day_Sponsorship_Banner.pdf"
                    className="inline-flex items-center gap-2 bg-[#C6112F] hover:bg-[#a80d26] text-white font-extrabold text-xs px-4 py-2 rounded-md uppercase tracking-wider transition-colors shadow-xs"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                    <span>{isFr ? "TÉLÉCHARGER" : "DOWNLOAD PDF"}</span>
                  </a>

                  {/* Open in New Tab */}
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-extrabold text-xs px-4 py-2 rounded-md uppercase tracking-wider transition-colors border border-neutral-700"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                    <span>{isFr ? "PLEIN ÉCRAN" : "EXPAND"}</span>
                  </a>
                </div>
              </div>

              {/* Embedded PDF iframe */}
              <div className="relative w-full h-[480px] sm:h-[620px] md:h-[720px] lg:h-[820px] bg-neutral-950">
                <iframe
                  src={`${pdfUrl}#view=FitH&toolbar=1`}
                  className="w-full h-full border-0"
                  title="THE Iconic Golf Day Sponsorship Banner PDF"
                />
              </div>
            </div>
          </div>
        </section>



        {/* ═══════ GET IN TOUCH & FOOTER ═══════ */}
        <GetInTouchCTA />
      </main>
      <Footer />
    </>
  );
}

