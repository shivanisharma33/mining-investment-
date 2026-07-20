"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

/* ───────── Animated Counter Hook ───────── */
function useCounter(target: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!startOnView) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const step = Math.ceil(target / (duration / 16));
          let current = 0;
          const id = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(id);
            }
            setCount(current);
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration, startOnView]);

  return { count, ref };
}

/* ───────── Quick Facts Data ───────── */
const quickFacts = [
  "Canada's Only Tier I Global Mining Investment Conference",
  "Held annually in Québec City, Canada",
  "Over 100 participating mining companies",
  "Invitation only — walk-ins not accepted",
  "Independently sponsored by Government of Québec",
  "800+ participants including issuers, investors & governments",
  "ESG and equality-focused programming",
];

const quickFactsFr = [
  "La seule conférence mondiale de niveau I sur l'investissement minier au Canada",
  "Se tient annuellement à Québec, Canada",
  "Plus de 100 sociétés minières participantes",
  "Sur invitation uniquement — les visiteurs sans invitation ne sont pas acceptés",
  "Parrainée indépendamment par le gouvernement du Québec",
  "800+ participants, y compris émetteurs, investisseurs et gouvernements",
  "Programmation axée sur l'ESG et l'égalité",
];

/* ───────── Feature Cards Data ───────── */
const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
      </svg>
    ),
    titleKey: "about-feat1-title",
    titleDefault: "Tier I Investment Conference",
    descKey: "about-feat1-desc",
    descDefault:
      "An invitation-only gathering independently sponsored by the Government of Québec, bringing together the world's most influential mining companies and investors.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    titleKey: "about-feat2-title",
    titleDefault: "Private 1-on-1 Meetings",
    descKey: "about-feat2-desc",
    descDefault:
      "Privately arranged meetings between mining companies, international investors, and various mining government authorities — curated well before doors open.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    titleKey: "about-feat3-title",
    titleDefault: "ESG & Sustainability",
    descKey: "about-feat3-desc",
    descDefault:
      "Committed to promoting sustainability via the Student Sponsorship and SHE-Co Initiatives, highlighting ESG innovation and equality in the mining sector.",
  },
];

/* ───────── Highlight List Data ───────── */
const highlights = [
  { key: "about-hl1", default: "Privately arranged 1-on-1 meetings between mining companies and international investors" },
  { key: "about-hl2", default: "Keynote speakers and industry thought leaders from across the globe" },
  { key: "about-hl3", default: "Promoting sustainability via the Student Sponsorship and SHE-Co Initiatives" },
  { key: "about-hl4", default: "Platform for ESG innovation and equality in the mining sector" },
  { key: "about-hl5", default: "Accredited investors, family offices, institutions, and sovereign funds" },
];

export default function AboutPage() {
  const { t, lang } = useLanguage();

  const stat1 = useCounter(800);
  const stat2 = useCounter(100);
  const stat3 = useCounter(3);
  const stat4 = useCounter(50);

  const facts = lang === "FR" ? quickFactsFr : quickFacts;

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full">
        {/* ═══════════════ SECTION 1: HERO BANNER ═══════════════ */}
        <section className="relative w-full bg-[#0f1117] overflow-hidden">
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* Gradient wash */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#C6112F]/15 via-transparent to-transparent" />

          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-40 pb-14 sm:pb-18 md:pb-20">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 mb-6">
              <a href="/" className="hover:text-white transition-colors">
                {t("nav-home", "Home")}
              </a>
              <span className="text-[#C6112F]">›</span>
              <span className="text-neutral-500">{t("nav-about", "About")}</span>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white">{t("about-breadcrumb-event", "About THE Event")}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
              {t("about-hero-title-1", "About")}{" "}
              <span className="text-[#C6112F]">{t("about-hero-title-2", "THE Event")}</span>
            </h1>

            {/* Accent line */}
            <div className="w-20 h-[3px] bg-[#C6112F] mt-6" />
          </div>
        </section>

        {/* ═══════════════ SECTION 2: ABOUT LEAD + SIDEBAR ═══════════════ */}
        <section className="relative w-full bg-white py-16 sm:py-20 md:py-24 overflow-hidden">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
              {/* Left Column: Lead Content */}
              <div className="flex flex-col">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#1a1f2c] leading-snug mb-6">
                  {t(
                    "about-lead",
                    "THE Mining Investment EVENT is Canada's Only Tier I Global Mining Investment Conference, held annually in Québec City, Canada."
                  )}
                </p>

                <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-6" />

                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-5">
                  {t(
                    "about-body-1",
                    "THE Event hosts over 100 participating mining companies, is invitation only and is independently sponsored by the Government of Québec, and financial and mining communities at large. It is designed to specifically facilitate privately arranged meetings between mining companies, international investors, and various mining government authorities."
                  )}
                </p>

                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-8">
                  <span className="font-bold text-[#C6112F]">THE Event </span>
                  {t(
                    "about-body-2",
                    "is committed to promoting sustainability in the mining industry via education and innovation through its unique Student Sponsorship and SHE-Co Initiatives, highlighting ESG and equality issues, and providing a platform for some of the most influential thought leaders in the sector."
                  )}
                </p>

                {/* Blockquote Highlight */}
                <blockquote className="relative pl-5 border-l-4 border-[#C6112F] bg-[#fef2f2] rounded-r-lg py-4 pr-5 mb-8">
                  <p className="text-sm sm:text-base font-semibold text-[#1a1f2c] leading-relaxed">
                    {t(
                      "about-highlight",
                      "Independently sponsored by the Government of Québec, and the financial and mining communities at large."
                    )}
                  </p>
                </blockquote>

                {/* Highlight List */}
                <ul className="flex flex-col gap-3.5 mb-10">
                  {highlights.map((hl) => (
                    <li key={hl.key} className="flex items-start gap-3 group/hl">
                      <span className="mt-1 w-5 h-5 rounded-full bg-[#fef2f2] border border-[#C6112F]/20 flex items-center justify-center shrink-0 group-hover/hl:bg-[#C6112F] transition-colors duration-300">
                        <svg className="w-3 h-3 text-[#C6112F] group-hover/hl:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </span>
                      <span className="text-neutral-700 text-sm sm:text-[15px] leading-relaxed font-medium">
                        {t(hl.key, hl.default)}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Featured Image */}
                <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] rounded-2xl overflow-hidden mb-10 group shadow-lg">
                  <img
                    src="https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/40f4782a-7966-4213-851f-4a3aca6be7fe/DSC00269.jpg?format=1500w"
                    alt="Mining company executives and international investors in conversation"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C6112F] bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                      {t("about-figure-label", "Québec City · Est. Annual")}
                    </span>
                    <p className="text-white text-xs sm:text-sm font-medium mt-2.5 leading-relaxed max-w-[480px]">
                      {t(
                        "about-figure-caption",
                        "Privately arranged meetings between mining companies, international investors and government authorities."
                      )}
                    </p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#"
                    className="px-7 py-3.5 rounded-lg bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase inline-flex items-center gap-2.5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {t("hero-register", "Register Now")}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                  <a
                    href="/team"
                    className="px-7 py-3.5 rounded-lg border-2 border-[#C6112F] text-[#C6112F] hover:bg-[#C6112F] hover:text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase inline-flex items-center gap-2 transition-all duration-300"
                  >
                    {t("about-cta-team", "Meet THE Team")}
                  </a>
                </div>
              </div>

              {/* Right Column: Sidebar */}
              <div className="flex flex-col gap-6">
                {/* Quick Facts Card */}
                <div className="bg-[#f8fafc] border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                  <h3 className="text-lg font-black text-[#1a1f2c] tracking-tight mb-5 flex items-center gap-2.5">
                    <span className="w-1.5 h-6 bg-[#C6112F] rounded-full" />
                    {t("about-quick-facts", "Quick Facts")}
                  </h3>
                  <div className="flex flex-col gap-4">
                    {facts.map((fact, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 group/fact"
                      >
                        <span className="mt-1 w-5 h-5 rounded-full bg-white border border-neutral-200 flex items-center justify-center shrink-0 group-hover/fact:border-[#C6112F]/30 group-hover/fact:bg-[#fef2f2] transition-all duration-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C6112F]" />
                        </span>
                        <span className="text-neutral-700 text-sm leading-relaxed font-medium">
                          {fact}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Card */}
                <div className="bg-[#0f1117] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
                  {/* Subtle gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C6112F] via-[#e8354f] to-[#C6112F]" />
                  <h3 className="text-lg font-black text-white tracking-tight mb-4 flex items-center gap-2.5">
                    <span className="w-1.5 h-6 bg-[#C6112F] rounded-full" />
                    {t("about-contact-title", "Contact")}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {t(
                      "about-contact-body",
                      "For more information about 'THE Event' programming or registration, please contact"
                    )}{" "}
                    <a
                      href="mailto:jchoi@irinc.ca"
                      className="text-[#C6112F] hover:text-[#e8354f] hover:underline font-semibold transition-colors"
                    >
                      jchoi@irinc.ca
                    </a>{" "}
                    {t("about-contact-or", "or call")}{" "}
                    <a
                      href="tel:+19055153508"
                      className="text-[#C6112F] hover:text-[#e8354f] hover:underline font-semibold transition-colors"
                    >
                      +1-905-515-3508
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ SECTION 3: STATS STRIP ═══════════════ */}
        <section className="relative w-full bg-[#C6112F] py-14 sm:py-18 overflow-hidden">
          {/* Subtle pattern */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
              {/* Stat 1 */}
              <div ref={stat1.ref} className="flex flex-col items-center text-center">
                <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-none">
                  {stat1.count}<span className="text-white/60 text-3xl">+</span>
                </span>
                <div className="w-8 h-[2px] bg-white/30 rounded-full mt-3 mb-2" />
                <span className="text-white/80 text-xs sm:text-sm font-bold tracking-wider uppercase">
                  {t("stat-participants", "Participants")}
                </span>
              </div>

              {/* Stat 2 */}
              <div ref={stat2.ref} className="flex flex-col items-center text-center">
                <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-none">
                  {stat2.count}<span className="text-white/60 text-3xl">+</span>
                </span>
                <div className="w-8 h-[2px] bg-white/30 rounded-full mt-3 mb-2" />
                <span className="text-white/80 text-xs sm:text-sm font-bold tracking-wider uppercase">
                  {t("stat-companies", "Mining Companies")}
                </span>
              </div>

              {/* Stat 3 */}
              <div ref={stat3.ref} className="flex flex-col items-center text-center">
                <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-none">
                  {stat3.count}
                </span>
                <div className="w-8 h-[2px] bg-white/30 rounded-full mt-3 mb-2" />
                <span className="text-white/80 text-xs sm:text-sm font-bold tracking-wider uppercase">
                  {t("stat-days", "Days of Programming")}
                </span>
              </div>

              {/* Stat 4 */}
              <div ref={stat4.ref} className="flex flex-col items-center text-center">
                <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-none">
                  {stat4.count}<span className="text-white/60 text-3xl">+</span>
                </span>
                <div className="w-8 h-[2px] bg-white/30 rounded-full mt-3 mb-2" />
                <span className="text-white/80 text-xs sm:text-sm font-bold tracking-wider uppercase">
                  {t("stat-student-sponsors", "Student Sponsors")}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ SECTION 4: WHAT MAKES US DIFFERENT ═══════════════ */}
        <section className="relative w-full bg-[#f4f7fa] py-16 sm:py-20 md:py-24 overflow-hidden">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
                {t("about-diff-tag", "WHY THE EVENT")}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] tracking-tight mb-3">
                {t("about-diff-title", "What Makes Us Different")}
              </h2>
              <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mx-auto" />
            </div>

            {/* 3-Column Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feat, i) => (
                <div
                  key={i}
                  className="group relative bg-white border border-neutral-200 rounded-2xl p-7 sm:p-9 hover:border-[#C6112F]/30 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-8 right-8 h-[3px] bg-gradient-to-r from-transparent via-[#C6112F] to-transparent rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="w-14 h-14 rounded-2xl bg-[#fef2f2] border border-[#C6112F]/10 flex items-center justify-center text-[#C6112F] mb-5 group-hover:bg-[#C6112F] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#C6112F]/20 transition-all duration-300">
                    {feat.icon}
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-[#1a1f2c] mb-3 tracking-tight">
                    {t(feat.titleKey, feat.titleDefault)}
                  </h3>
                  <div className="w-10 h-[2px] bg-[#C6112F] mb-4 group-hover:w-14 transition-all duration-300" />
                  <p className="text-neutral-600 text-sm leading-relaxed font-medium">
                    {t(feat.descKey, feat.descDefault)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ SECTION 5 & 6: REUSE EXISTING COMPONENTS ═══════════════ */}
        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}
