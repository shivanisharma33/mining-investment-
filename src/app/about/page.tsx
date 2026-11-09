"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

/* ───────── Quick Facts Data ───────── */
const quickFacts = [
  "Canada’s Only Tier 1 Global Mining Investment Conference©",
  "Held annually in Québec City, Canada",
  "200+ participating mining companies",
  "Invitation only — walk-ins not accepted",
  "Independently sponsored by various financial and industry groups as well as domestic and international governments",
  "1,400+ participants including issuers, investors and governments",
];

const quickFactsFr = [
  "La seule conférence mondiale de niveau 1 sur l'investissement minier au Canada©",
  "Se tient annuellement à Québec, Canada",
  "200+ sociétés minières participantes",
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
    titleDefault: "Tier 1 Investment Conference",
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
      "Privately arranged meetings between investors, mining companies and policy makers.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    titleKey: "about-feat3-title",
    titleDefault: "Sustainability",
    descKey: "about-feat3-desc",
    descDefault:
      "THE Event is committed to promoting diversity, equality and sustainability in the mining industry through education and innovation, supported by its unique Student Partnership Program and THE SHE-Co Initiative.",
  },
];

export default function AboutPage() {
  const { t, lang } = useLanguage();
  const isFr = lang === "FR";

  const facts = isFr ? quickFactsFr : quickFacts;

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

          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 pt-28 sm:pt-32 md:pt-36 lg:pt-[152px] xl:pt-[160px] pb-10 sm:pb-12 md:pb-14">
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
        <section className="relative w-full bg-white dark:bg-[#09090b] py-12 sm:py-14 md:py-16 overflow-hidden transition-colors duration-300">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
              {/* Left Column: Lead Content */}
              <div className="flex flex-col">
                <p className="text-base sm:text-lg md:text-xl font-normal text-neutral-800 dark:text-zinc-200 leading-relaxed mb-6">
                  {isFr ? (
                    <>
                      <strong className="font-extrabold text-neutral-900 dark:text-white">
                        THE Mining Investment Event—La seule conférence mondiale de niveau 1 sur l&apos;investissement minier au Canada© se tient annuellement à Québec, Canada.
                      </strong>{" "}
                      Il est détenu et associé de manière indépendante pour faciliter les réunions privées entre les sociétés minières, les investisseurs internationaux et diverses autorités minières et gouvernementales. La conférence offre une plate-forme pour entendre certains des leaders d&apos;opinion les plus influents du secteur. THE Event s&apos;engage à promouvoir la diversité, l&apos;égalité et la durabilité dans l&apos;industrie minière par l&apos;éducation et l&apos;innovation, soutenue par son programme unique de partenariat étudiant et l&apos;initiative THE SHE-Co.
                    </>
                  ) : (
                    <>
                      <strong className="font-extrabold text-neutral-900 dark:text-white">
                        THE Mining Investment Event—Canada’s Only Tier 1 Global Mining Investment Conference© is held annually in Québec City, Canada.
                      </strong>{" "}
                      It is independently owned and partnered to facilitate privately arranged meetings among mining companies, international investors and various mining and government authorities. The conference provides a platform to hear from some of the most influential thought leaders in the sector. THE Event is committed to promoting diversity, equality and sustainability in the mining industry through education and innovation, supported by its unique Student Partnership Program and THE SHE-Co Initiative.
                    </>
                  )}
                </p>

                <p className="text-base sm:text-lg md:text-xl font-semibold text-neutral-800 dark:text-zinc-200 leading-relaxed mb-8">
                  {t(
                    "about-body-2",
                    "THE Event is a founding member of International Mining Week (“IMW”), also taking place in Quebec City. IMW promotes other industry-focused conferences and activities that unite global mining companies, related businesses, supply chain experts, investors and government officials in one location for discussions and collaborative meetings across the industry."
                  )}
                  {" "}
                  <a
                    href="#international-mining-week"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#C6112F] hover:text-[#a80d26] dark:text-[#ff6b81] dark:hover:text-white uppercase tracking-wider transition-colors ml-1"
                  >
                    <span>{isFr ? "Découvrir l'IMW ↓" : "Explore IMW Section ↓"}</span>
                  </a>
                </p>

                {/* Quote Section Right Below */}
                <blockquote className="relative pl-6 sm:pl-8 border-l-4 border-[#C6112F] bg-[#fff5f6] dark:bg-[#18181b] rounded-r-2xl p-6 sm:p-8 my-4 mb-10 shadow-sm border border-neutral-200/60 dark:border-zinc-800 transition-colors">
                  <p className="text-base sm:text-lg md:text-xl font-bold italic text-neutral-900 dark:text-white leading-relaxed mb-3">
                    “Some of the most important conversations around mining are happening at THE Mining Investment Event in Canada, where government, supply chains, Indigenous communities, investors and companies can have meaningful discussions in private.”
                  </p>
                  <cite className="text-xs sm:text-sm font-black text-[#C6112F] dark:text-[#ff4d6d] uppercase tracking-wider not-italic block">
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
                <div className="bg-[#f8fafc] dark:bg-[#121215] border border-neutral-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm transition-colors">
                  <h3 className="text-lg font-black text-[#1a1f2c] dark:text-white tracking-tight mb-5 flex items-center gap-2.5">
                    <span className="w-1.5 h-6 bg-[#C6112F] rounded-full" />
                    {t("about-quick-facts", "Quick Facts")}
                  </h3>
                  <div className="flex flex-col gap-4">
                    {facts.map((fact, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 group/fact"
                      >
                        <span className="mt-1 w-5 h-5 rounded-full bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center shrink-0 group-hover/fact:border-[#C6112F]/30 group-hover/fact:bg-[#fef2f2] dark:group-hover/fact:bg-[#C6112F]/20 transition-all duration-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C6112F]" />
                        </span>
                        <span className="text-neutral-700 dark:text-zinc-300 text-sm leading-relaxed font-medium">
                          {fact}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Card */}
                <div className="bg-[#0f1117] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
                  {/* Subtle gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C6112F] via-[#e8354f] to-[#C6112F]" />
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-4 flex items-center gap-2.5">
                    <span className="w-1.5 h-6 bg-[#C6112F] rounded-full" />
                    {t("about-contact-title", "Contact")}
                  </h3>
                  <p className="text-neutral-200 text-base sm:text-lg leading-relaxed mb-5 font-normal">
                    {t(
                      "about-contact-body",
                      "For more information about 'THE Event' programming or registration, please contact"
                    )}
                  </p>

                  <div className="flex flex-col gap-3">
                    <a
                      href="mailto:jchoi@irinc.ca"
                      className="group/contact flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.07] hover:bg-[#C6112F]/20 border border-white/10 hover:border-[#C6112F]/60 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#C6112F]/20 border border-[#C6112F]/40 flex items-center justify-center text-[#ff4d6d] group-hover/contact:bg-[#C6112F] group-hover/contact:text-white transition-all shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex flex-col">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Email</span>
                        <span className="text-lg sm:text-xl font-bold text-white group-hover/contact:text-[#ff6b81] transition-colors break-all">
                          jchoi@irinc.ca
                        </span>
                      </div>
                    </a>

                    <a
                      href="tel:+19055153508"
                      className="group/contact flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.07] hover:bg-[#C6112F]/20 border border-white/10 hover:border-[#C6112F]/60 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#C6112F]/20 border border-[#C6112F]/40 flex items-center justify-center text-[#ff4d6d] group-hover/contact:bg-[#C6112F] group-hover/contact:text-white transition-all shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex flex-col">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                          {isFr ? "Téléphone" : "Phone"}
                        </span>
                        <span className="text-lg sm:text-xl font-bold text-white group-hover/contact:text-[#ff6b81] transition-colors whitespace-nowrap">
                          +1-905-515-3508
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ SECTION 3: INTERNATIONAL MINING WEEK (NEW SECTION) ═══════════════ */}
        <section
          id="international-mining-week"
          className="relative w-full bg-[#f8fafc] dark:bg-[#0c0f17] py-16 sm:py-20 md:py-24 border-t border-b border-neutral-200/90 dark:border-zinc-800 transition-colors duration-300"
        >
          {/* Subtle Background Accent Wash */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#C6112F]/[0.03] via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            {/* Section Header */}
            <div className="max-w-3xl mb-12 sm:mb-16">
              <span className="text-[#C6112F] text-xs sm:text-sm font-bold tracking-[0.22em] uppercase block mb-3">
                {isFr ? "INITIATIVE FONDATRICE & PARTENARIATS" : "FOUNDING INITIATIVE & PARTNERSHIPS"}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a1f2c] dark:text-white tracking-tight leading-tight mb-4">
                International Mining Week{" "}
                <span className="text-[#C6112F]">(“IMW”)</span>
              </h2>
              <div className="w-20 h-[3px] bg-[#C6112F] rounded-full mb-5" />
              <p className="text-base sm:text-lg text-neutral-700 dark:text-zinc-300 leading-relaxed font-normal">
                {isFr
                  ? "THE Event est un membre fondateur de la Semaine Internationale de la Mine (« IMW »), se déroulant également à Québec. L'IMW promeut d'autres conférences et activités axées sur l'industrie qui rassemblent des sociétés minières mondiales, des entreprises connexes, des experts de la chaîne d'approvisionnement, des investisseurs et des représentants gouvernementaux en un même lieu pour des discussions et réunions collaboratives dans l'ensemble du secteur."
                  : "THE Event is a founding member of International Mining Week (“IMW”), also taking place in Quebec City. IMW promotes other industry-focused conferences and activities that unite global mining companies, related businesses, supply chain experts, investors and government officials in one location for discussions and collaborative meetings across the industry."}
              </p>
            </div>

            {/* Launch & Vision Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Card 1: Launch & Backing */}
              <div className="bg-white dark:bg-[#121622] rounded-2xl p-7 sm:p-9 border border-neutral-200/90 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-[#C6112F]/40 transition-all duration-300">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-xl bg-[#C6112F]/10 dark:bg-[#C6112F]/20 text-[#C6112F] dark:text-[#ff6b81] flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m0 0l-4.5-4.5m4.5 4.5l-4.5-4.5" />
                      </svg>
                    </span>
                    <h3 className="text-xl font-bold text-[#1a1f2c] dark:text-white tracking-tight">
                      {isFr ? "Le Lancement & Les Partenaires Clés" : "The Launch & Strategic Support"}
                    </h3>
                  </div>

                  <p className="text-neutral-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {isFr ? (
                      <>
                        En octobre 2026, <strong>THE Event</strong> a lancé la « Semaine Internationale de la Mine » avec le soutien de l&apos;<strong>International Trade and Forfaiting Association (ITFA)</strong>, qui représente les droits et intérêts des banques, institutions financières et prestataires de services impliqués dans le risque commercial et l&apos;origination et distribution d&apos;actifs, et de l&apos;<strong>Association minière du Québec (AMQ)</strong> dont font partie certains des plus grands émetteurs miniers internationaux et fournisseurs adjacents tels que <strong>Rio Tinto, Glencore, Hecla Mining Company, IAMGOLD Corporation et Agnico Eagle</strong>.
                      </>
                    ) : (
                      <>
                        In October, 2026, <strong>THE Event</strong> launched “International Mining Week” with the support of the <strong>International Trade and Forfaiting Association (ITFA)</strong>, who represent the rights and interests of banks, financial institutions and service providers involved in trade risk and asset origination and distribution, and the <strong>Association Minière du Québec (AMQ)</strong> who count as members some of the largest international mining issuers and adjacent suppliers such as, <strong>Rio Tinto, Glencore, Hecla Mining Company, IAMGOLD Corporation and Agnico Eagle</strong>.
                      </>
                    )}
                  </p>
                </div>

                {/* Key Issuer Badges */}
                <div className="pt-4 border-t border-neutral-100 dark:border-zinc-800">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-zinc-400 mb-2">
                    {isFr ? "Membres Émetteurs & Fournisseurs Représentés" : "Represented Issuers & Adjacent Suppliers"}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Rio Tinto", "Glencore", "Hecla Mining Company", "IAMGOLD Corporation", "Agnico Eagle"].map((co, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-semibold rounded-md bg-neutral-100 dark:bg-zinc-800 text-neutral-800 dark:text-zinc-200 border border-neutral-200 dark:border-zinc-700"
                      >
                        {co}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 2: Vision & Coalition Expansion */}
              <div className="bg-white dark:bg-[#121622] rounded-2xl p-7 sm:p-9 border border-neutral-200/90 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-[#C6112F]/40 transition-all duration-300">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-xl bg-[#C6112F]/10 dark:bg-[#C6112F]/20 text-[#C6112F] dark:text-[#ff6b81] flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    <h3 className="text-xl font-bold text-[#1a1f2c] dark:text-white tracking-tight">
                      {isFr ? "La Vision & L'Élargissement 2027" : "The Vision & 2027 Expansion"}
                    </h3>
                  </div>

                  <p className="text-neutral-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {isFr ? (
                      <>
                        La vision de la Semaine Internationale de la Mine est de créer et développer des partenariats collaboratifs qui rassembleront des sociétés minières internationales, des entreprises adjacentes au secteur minier, des experts de la chaîne d&apos;approvisionnement, des investisseurs et des entités gouvernementales en un même lieu en parallèle de <strong>THE Event</strong>.
                      </>
                    ) : (
                      <>
                        The vision for International Mining Week is to create and grow collaborative partnerships that will bring together international mining companies, mining adjacent companies, supply chain expertise, investors and government entities in one location concurrent to <strong>THE Event</strong>.
                      </>
                    )}
                  </p>
                </div>

                {/* 2027 Partner Addition Callout */}
                <div className="p-4 rounded-xl bg-[#fff5f6] dark:bg-[#C6112F]/10 border border-[#C6112F]/20 dark:border-[#C6112F]/30">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#C6112F] mt-2 shrink-0" />
                    <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-zinc-100 leading-relaxed">
                      {isFr ? (
                        <>
                          <strong className="text-[#C6112F] dark:text-[#ff6b81]">Partenariat 2027 :</strong> L&apos;<strong>Association de l’exploration minière du Québec (AEMQ)</strong> rejoint le partenariat de la Semaine Internationale de la Mine en 2027, dont les membres comprennent de nombreuses sociétés minières et entreprises adjacentes participantes à THE Event.
                        </>
                      ) : (
                        <>
                          <strong className="text-[#C6112F] dark:text-[#ff6b81]">2027 Partnership:</strong> Joining the International Mining Week partnership in 2027 is the <strong>Association de l’exploration minière du Québec (AEMQ)</strong>, whose membership includes many of THE Event’s participating mining and mining adjacent companies.
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* In-Depth Editions Grid: 2026 Recap vs 2027 Outlook */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* International Mining Week 2026 Recap */}
              <div className="relative bg-white dark:bg-[#121622] rounded-2xl p-7 sm:p-9 border border-neutral-200/90 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-[#C6112F]/40 transition-all duration-300">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-zinc-800 text-[#C6112F] dark:text-[#ff6b81] text-xs font-black tracking-wider uppercase mb-4">
                    <span>{isFr ? "Édition Inaugurale 2026" : "2026 Inaugural Edition"}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#1a1f2c] dark:text-white tracking-tight mb-4">
                    {isFr ? "Symposium des Entreprises Autochtones & Sessions Clés" : "Indigenous Business Symposium & Key Plenaries"}
                  </h3>

                  <p className="text-neutral-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {isFr ? (
                      <>
                        La Semaine Internationale de la Mine 2026 a mis en avant un <strong>Symposium des entreprises autochtones</strong>, abordant des thématiques telles que <em>« La réconciliation par la propriété »</em> animée par <strong>Madame Yvonne Jones</strong>, ancienne députée du Labrador. Le <strong>ministre Jagrup Brar</strong>, ministre des Mines et des Minéraux critiques de la Colombie-Britannique, a prononcé le discours d&apos;ouverture des panels.
                      </>
                    ) : (
                      <>
                        International Mining Week 2026 featured an <strong>Indigenous Business Symposium</strong>, covering topics such as <em>“Reconciliation through Ownership”</em> hosted by <strong>Madame Yvonne Jones</strong>, the former Member of Parliament from Labrador. <strong>Minister Jagrup Brar</strong>, British Columbia Minister of Mines and Critical Minerals was the opening keynote for the panels.
                      </>
                    )}
                  </p>

                  {/* Panel participants list */}
                  <div className="mb-6 p-4 rounded-xl bg-neutral-50 dark:bg-[#161b29] border border-neutral-200/80 dark:border-zinc-800">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-zinc-400 block mb-2.5">
                      {isFr ? "Intervenants & Panélistes Notables" : "Notable Panel Participants"}
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-neutral-800 dark:text-zinc-200 font-medium">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C6112F] shrink-0" />
                        <span>Sebastian Labelle (Canada Dev Agency)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C6112F] shrink-0" />
                        <span>Brendan Bell (CEO, West Kitikmeot)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C6112F] shrink-0" />
                        <span>Ehren Cory (CEO, Canada Infra Bank)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C6112F] shrink-0" />
                        <span>The Hon. Sandy Silver (Former Premier, Yukon)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Plenary topics */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-zinc-400 block mb-2">
                      {isFr ? "Thématiques des Panels 2026" : "2026 Panel Focus Areas"}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        isFr ? "Investissement minier japonais" : "Japanese Mining Investment",
                        isFr ? "Enjeux climatiques & géopolitiques" : "Geopolitical Climate Issues for Investment",
                        isFr ? "Petits réacteurs modulaires (PRM)" : "Small Modular Reactors for Remote Mining",
                      ].map((topic, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs font-semibold rounded-lg bg-[#C6112F]/10 text-[#C6112F] dark:bg-[#C6112F]/20 dark:text-[#ff6b81]"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* International Mining Week 2027 & Beyond */}
              <div className="relative bg-white dark:bg-[#121622] rounded-2xl p-7 sm:p-9 border border-neutral-200/90 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-[#C6112F]/40 transition-all duration-300">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6112F]/10 text-[#C6112F] dark:bg-[#C6112F]/20 dark:text-[#ff6b81] text-xs font-black tracking-wider uppercase mb-4">
                    <span>{isFr ? "Vision 2027 & Au-Delà" : "2027 & Beyond Outlook"}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#1a1f2c] dark:text-white tracking-tight mb-4">
                    {isFr ? "Corridors Stratégiques, Marchés Émergents & Ring of Fire" : "Strategic Corridors, Emerging Markets & Ring of Fire"}
                  </h3>

                  <p className="text-neutral-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {isFr ? (
                      <>
                        La Semaine Internationale de la Mine 2027 continuera d&apos;offrir à notre public des sujets stimulants, notamment des panels pour discuter de l&apos;importance d&apos;acheminer les matières premières minières vers les marchés via les ports maritimes et le développement d&apos;un <strong>corridor maritime atlantique</strong>. Une session sur les marchés émergents sera également proposée par le <strong>gouvernement pakistanais</strong>, ainsi qu&apos;un panel sur le <strong>Ring of Fire</strong> consacré à l&apos;avenir du développement dans cette région de l&apos;Ontario.
                      </>
                    ) : (
                      <>
                        International Mining Week 2027 will continue to bring to our audience interesting topics including panels to discuss the importance of bringing mining commodities to market using the sea ports and the development of an <strong>Atlantic shipping corridor</strong>. There will also be an emerging market session put on by the <strong>Pakistani government</strong> and a <strong>Ring of Fire</strong> panel to discuss the future of development in that area of Ontario.
                      </>
                    )}
                  </p>

                  <p className="text-neutral-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {isFr ? (
                      <>
                        Ces séances plénières et d&apos;autres mettront en lumière les réalités géopolitiques actuelles et rappelleront l&apos;importance d&apos;investissements et de politiques adéquats pour garantir la durabilité et la stabilité du secteur minier.
                      </>
                    ) : (
                      <>
                        These and other plenary sessions will underline current geopolitical realities and reflect on the importance of proper investment and policy to secure sustainability and stability in the mining industry.
                      </>
                    )}
                  </p>

                  {/* Open Invitation Banner */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-neutral-900 to-[#1a1f2c] text-white shadow-md">
                    <div className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#C6112F] flex items-center justify-center shrink-0 mt-0.5 text-white">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </span>
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider text-[#ff6b81] block mb-1">
                          {isFr ? "Appel aux Partenaires 2027" : "Join the 2027 Initiative"}
                        </span>
                        <p className="text-xs sm:text-sm font-medium text-neutral-200 leading-relaxed">
                          {isFr
                            ? "Nous invitons d'autres entités gouvernementales, entreprises, associations représentatives, institutions financières, groupes communautaires miniers et juridictions à se joindre à cette initiative pour 2027 et au-delà."
                            : "We welcome other government entities, companies, representative associations, financial institutions, mining community groups and jurisdictions to join this initiative for 2027 and beyond."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </section>

        {/* ═══════════════ SECTION 4: WHAT MAKES US DIFFERENT ═══════════════ */}
        <section className="relative w-full bg-[#f4f7fa] dark:bg-[#09090b] py-16 sm:py-20 md:py-24 overflow-hidden transition-colors duration-300">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
                {t("about-diff-tag", "WHY THE EVENT")}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] dark:text-white tracking-tight mb-3">
                {t("about-diff-title", "What Makes Us Different")}
              </h2>
              <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mx-auto" />
            </div>

            {/* 3-Column Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feat, i) => (
                <div
                  key={i}
                  className="group relative bg-white dark:bg-[#121215] border border-neutral-200 dark:border-zinc-800 rounded-2xl p-7 sm:p-9 hover:border-[#C6112F]/30 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-8 right-8 h-[3px] bg-gradient-to-r from-transparent via-[#C6112F] to-transparent rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="w-14 h-14 rounded-2xl bg-[#fef2f2] dark:bg-[#C6112F]/15 border border-[#C6112F]/10 dark:border-[#C6112F]/30 flex items-center justify-center text-[#C6112F] mb-5 group-hover:bg-[#C6112F] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#C6112F]/20 transition-all duration-300">
                    {feat.icon}
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-[#1a1f2c] dark:text-white mb-3 tracking-tight">
                    {t(feat.titleKey, feat.titleDefault)}
                  </h3>
                  <div className="w-10 h-[2px] bg-[#C6112F] rounded-full mb-4 group-hover:w-14 transition-all duration-300" />
                  <p className="text-neutral-600 dark:text-zinc-400 text-sm leading-relaxed font-medium">
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
