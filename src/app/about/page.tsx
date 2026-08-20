"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import EventByTheNumbers from "@/components/EventByTheNumbers";
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
  "200 participating mining companies",
  "Invitation only — walk-ins not accepted",
  "Independently sponsored by various financial and industry groups as well as domestic and international governments",
  "1,400+ participants including issuers, investors and governments",
];

const quickFactsFr = [
  "La seule conférence mondiale de niveau I sur l'investissement minier au Canada",
  "Se tient annuellement à Québec, Canada",
  "200 sociétés minières participantes",
  "Sur invitation uniquement — les visiteurs sans invitation ne sont pas acceptés",
  "Parrainée indépendamment par divers groupes financiers et industriels ainsi que des gouvernements nationaux et internationaux",
  "1 400+ participants, y compris émetteurs, investisseurs et gouvernements",
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
      "An invitation-only gathering independently sponsored by various financial and industry groups as well as domestic and international governments.",
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

export default function AboutPage() {
  const { t, lang } = useLanguage();

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
            <div className="w-20 h-[3px] bg-[#C6112F] rounded-full mt-6" />
          </div>
        </section>

        {/* ═══════════════ SECTION 2: ABOUT LEAD + SIDEBAR ═══════════════ */}
        <section className="relative w-full bg-white py-16 sm:py-20 md:py-24 overflow-hidden">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
              {/* Left Column: Lead Content */}
              <div className="flex flex-col">
                <p className="text-base sm:text-lg md:text-xl font-normal text-neutral-800 leading-relaxed mb-6">
                  {lang === "FR" ? (
                    <>
                      <strong className="font-extrabold text-neutral-900">
                        L&apos;Événement d&apos;Investissement Minier—La seule conférence mondiale de niveau 1 sur l&apos;investissement minier au Canada© se tient annuellement à Québec, Canada.
                      </strong>{" "}
                      Il est détenu et associé de manière indépendante pour faciliter les réunions privées entre les sociétés minières, les investisseurs internationaux et diverses autorités minières et gouvernementales. La conférence offre une plate-forme pour entendre certains des leaders d&apos;opinion les plus influents du secteur. L&apos;Événement s&apos;engage à promouvoir la diversité, l&apos;égalité et la durabilité dans l&apos;industrie minière par l&apos;éducation et l&apos;innovation, soutenue par son programme unique de partenariat étudiant et l&apos;initiative THE SHE-Co.
                    </>
                  ) : (
                    <>
                      <strong className="font-extrabold text-neutral-900">
                        THE Mining Investment Event—Canada’s Only Tier 1 Global Mining Investment Conference© is held annually in Québec City, Canada.
                      </strong>{" "}
                      It is independently owned and partnered to facilitate privately arranged meetings among mining companies, international investors, and various mining and government authorities. The conference provides a platform to hear from some of the most influential thought leaders in the sector. THE Event is committed to promoting diversity, equality, and sustainability in the mining industry through education and innovation, supported by its unique Student Partnership Program and THE SHE-Co Initiative.
                    </>
                  )}
                </p>

                <p className="text-base sm:text-lg md:text-xl font-semibold text-neutral-800 leading-relaxed mb-8">
                  {t(
                    "about-body-2",
                    "THE Event is a founding member of International Mining Week (“IMW”), also taking place in Quebec City. IMW promotes other industry-focused conferences and activities that unite global mining companies, related businesses, supply chain experts, investors, and government officials in one location for discussions and collaborative meetings across the industry."
                  )}
                </p>

                {/* Quote Section Right Below */}
                <blockquote className="relative pl-6 sm:pl-8 border-l-4 border-[#C6112F] bg-[#fff5f6] rounded-r-2xl p-6 sm:p-8 my-4 mb-10 shadow-sm border border-neutral-200/60">
                  <p className="text-base sm:text-lg md:text-xl font-bold italic text-neutral-900 leading-relaxed mb-3">
                    “Some of the most important conversations around mining are happening at THE Mining Investment Event in Canada, where government, supply chains, Indigenous communities, investors, and companies can have meaningful discussions in private.”
                  </p>
                  <cite className="text-xs sm:text-sm font-black text-[#C6112F] uppercase tracking-wider not-italic block">
                    — Hon. Yvonne Rumbolt-Jones, former MP Labrador
                  </cite>
                </blockquote>

                {/* Featured Image */}
                <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] rounded-2xl overflow-hidden mb-10 group shadow-lg">
                  <img
                    src="/gallery%20photos/MAIN%20EVENT/MINING%20INVESTMENT%20EVENT%202026_DAY%201_MAIN%20EVENT-4.jpg"
                    alt="Delegates and industry leaders networking at THE Mining Investment Event"
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
                    href="/register"
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

        {/* ═══════════════ SECTION 3: THE EVENT BY THE NUMBERS ═══════════════ */}
        <section className="relative w-full bg-white dark:bg-[#09090b] py-16 sm:py-20 overflow-hidden transition-colors duration-300">
          <EventByTheNumbers />
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
                  <div className="w-10 h-[2px] bg-[#C6112F] rounded-full mb-4 group-hover:w-14 transition-all duration-300" />
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
