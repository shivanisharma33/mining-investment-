"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function InternationalMiningWeekPage() {
  const { t, lang } = useLanguage();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const exploreCards = [
    {
      id: "partner-events",
      title: "Partner Events",
      desc: "Discover conferences, forums and activities happening all week.",
      href: "/agenda",
      iconPath: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
    },
    {
      id: "agenda",
      title: "Agenda",
      desc: "View the full schedule of events and plan your week.",
      href: "/agenda",
      iconPath: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
    },
    {
      id: "speakers",
      title: "Speakers",
      desc: "Explore the lineup of industry leaders and expert speakers.",
      href: "/speakers",
      iconPath: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
    },
    {
      id: "sponsors",
      title: "Sponsors",
      desc: "Meet our valued sponsors driving the mining industry forward.",
      href: "/sponsors",
      iconPath: "M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z",
    },
    {
      id: "brochure",
      title: "Brochure",
      desc: "Download the official brochure and share with your network.",
      href: "https://online.flippingbook.com/view/213558062/",
      isExternal: true,
      iconPath: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25",
    },
    {
      id: "about-imw",
      title: "About IMW",
      desc: "Learn more about International Mining Week.",
      href: "#about-imw-section",
      iconPath: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-[#f8fafc] dark:bg-[#090d16] transition-colors duration-300">
        {/* ═════════════════════════════════════════════════════════════
            HERO SECTION
        ═════════════════════════════════════════════════════════════ */}
        <section className="relative w-full min-h-[580px] sm:min-h-[640px] md:min-h-[680px] flex flex-col justify-between overflow-hidden bg-[#0a0d14] pt-24 sm:pt-28 pb-10">
          {/* Hero Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 opacity-95"
            style={{
              backgroundImage: `url('/imw_hero.png')`,
            }}
          >
            {/* Subtle Gradient Overlays - strong dark left vignette for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14]/90 via-transparent to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent max-w-[65%]" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 pt-10 sm:pt-14 pb-8 w-full my-auto text-left flex flex-col justify-between h-full">
            <div>
              {/* Tagline */}
              <span className="text-[#C6112F] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase block mb-4">
                INTERNATIONAL MINING WEEK
              </span>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
                One Week. <br />
                <span>Infinite Opportunities.</span>
              </h1>

              {/* Red Divider Line */}
              <div className="w-14 h-[3px] bg-[#C6112F] my-5 rounded-full" />

              {/* Description Paragraph */}
              <p className="text-neutral-200 text-sm sm:text-base md:text-lg font-normal max-w-xl leading-relaxed mb-8">
                The global mining industry comes together in Quebec City for a week of events, connections and opportunities.
              </p>

              {/* Combined Glass Button Container */}
              <div className="inline-flex items-center gap-2 p-1.5 rounded-xl border border-white/20 bg-black/40 backdrop-blur-md mb-12">
                <Link
                  href="/register"
                  className="px-6 py-3 rounded-lg bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2.5 shadow-md"
                >
                  <span>REGISTER NOW</span>
                  <span className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </Link>

                <Link
                  href="/agenda"
                  className="px-6 py-3 rounded-lg text-white hover:bg-white/10 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2.5"
                >
                  <span>VIEW PROGRAM</span>
                  <span className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            {/* Bottom Info Stat Strip */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 max-w-3xl">
              {/* Item 1 */}
              <div className="flex items-center gap-4">
                <svg className="w-9 h-9 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <div className="text-white text-xs sm:text-sm font-bold leading-tight">
                  <div>31 May -</div>
                  <div>4 June 2027</div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-center gap-4">
                <svg className="w-9 h-9 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <div className="text-white text-xs sm:text-sm font-bold leading-tight">
                  <div>Québec City,</div>
                  <div>Canada</div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-center gap-4">
                <svg className="w-9 h-9 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                <div className="text-white text-xs sm:text-sm font-bold leading-tight">
                  <div>15+ Partner Events</div>
                  <div>Across the Week</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            FOUNDING PARTNERS SECTION
        ═════════════════════════════════════════════════════════════ */}
        <section className="relative w-full py-8 sm:py-12 bg-white dark:bg-[#090d16] border-b border-neutral-300 dark:border-slate-800 transition-colors duration-300">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 text-center">
            {/* Title with red underline */}
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1e293b] dark:text-white uppercase tracking-[0.15em]">
              FOUNDING PARTNERS
            </h2>
            <div className="w-12 h-[2.5px] bg-[#C6112F] mx-auto mt-2 mb-6 sm:mb-8 rounded-full" />

            {/* Logos with Vertical Dividers */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-10 max-w-5xl mx-auto">
              {/* ITFA Logo */}
              <div className="flex items-center justify-center p-2 h-28 sm:h-36 md:h-40 w-auto max-w-[240px] sm:max-w-[300px] md:max-w-[340px]">
                <img
                  src="/founding_itfa.png"
                  alt="ITFA Logo"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Vertical Divider 1 */}
              <div className="hidden sm:block h-24 sm:h-32 md:h-36 w-[1.5px] bg-neutral-300/80" />

              {/* Association minière du Québec */}
              <div className="flex items-center justify-center p-2 h-28 sm:h-36 md:h-40 w-auto max-w-[280px] sm:max-w-[360px] md:max-w-[400px]">
                <img
                  src="/founding_amq.png"
                  alt="Association minière du Québec"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Vertical Divider 2 */}
              <div className="hidden sm:block h-24 sm:h-32 md:h-36 w-[1.5px] bg-neutral-300/80" />

              {/* THE Mining Investment Event Seal Logo */}
              <div className="flex items-center justify-center p-2 h-28 sm:h-36 md:h-40 w-auto max-w-[240px] sm:max-w-[300px] md:max-w-[340px]">
                <img
                  src="/founding_the_event.png"
                  alt="THE Mining Investment Event Logo"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            EXPLORE THE WEEK SECTION
        ═════════════════════════════════════════════════════════════ */}
        <section id="about-imw-section" className="relative w-full py-16 sm:py-24 bg-[#f8fafc] dark:bg-[#090d16] transition-colors duration-300">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="mb-10 text-left">
              <h2 className="text-xl sm:text-3xl font-extrabold text-[#1e293b] dark:text-white uppercase tracking-[0.15em]">
                EXPLORE THE WEEK
              </h2>
              <div className="w-14 h-[3px] bg-[#C6112F] mt-2.5 rounded-full" />
            </div>

            {/* 6 Cards Grid (3x2) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {exploreCards.map((card) => {
                const content = (
                  <div
                    key={card.id}
                    className="bg-[#edf0f3] dark:bg-[#131b2e] border border-neutral-300/80 dark:border-[#233049] rounded-xl p-6 sm:p-7 flex items-start gap-4 shadow-2xs hover:bg-[#C6112F] dark:hover:bg-[#C6112F] hover:border-[#910A22] hover:shadow-xl transition-all duration-300 group cursor-pointer h-full"
                  >
                    {/* Circle Icon Container */}
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#111827] dark:bg-[#1e293b] border border-[#C6112F]/60 flex items-center justify-center shrink-0 shadow-2xs transition-colors group-hover:bg-white">
                      <svg className="w-6 h-6 text-white group-hover:text-[#C6112F] transition-colors" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={card.iconPath} />
                      </svg>
                    </div>

                    {/* Card Content */}
                    <div className="text-left">
                      <h3 className="text-base sm:text-lg font-bold text-[#1e293b] dark:text-white group-hover:text-white transition-colors">
                        {card.title}
                      </h3>
                      <div className="w-7 h-[2px] bg-[#C6112F] group-hover:bg-white my-2 transition-colors" />
                      <p className="text-neutral-600 dark:text-slate-300 text-xs sm:text-sm font-normal group-hover:text-white/95 transition-colors leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                );

                return card.isExternal ? (
                  <a key={card.id} href={card.href} target="_blank" rel="noopener noreferrer" className="h-full">
                    {content}
                  </a>
                ) : (
                  <Link key={card.id} href={card.href} className="h-full">
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>



        {/* ═════════════════════════════════════════════════════════════
            FOOTER CTA & FOOTER
        ═════════════════════════════════════════════════════════════ */}
        <GetInTouchCTA />
      </main>
      <Footer />
    </>
  );
}
