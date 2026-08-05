"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const editionCards = [
  {
    year: 2026,
    title: "The Biggest Edition Yet",
    titleFr: "La plus grande édition à ce jour",
    desc: "Uniting global leaders for impactful conversations and investments.",
    descFr: "Rassembler les dirigeants mondiaux pour des conversations et des investissements impactants.",
    image: "/news/edition_2026.png",
    isGrayscale: false,
  },
  {
    year: 2025,
    title: "Driving Global Investment",
    titleFr: "Propulser l'investissement mondial",
    desc: "Connecting capital with opportunity across the mining value chain.",
    descFr: "Connecter le capital aux opportunités dans toute la chaîne de valeur minière.",
    image: "/news/edition_2025.png",
    isGrayscale: false,
  },
  {
    year: 2024,
    title: "Critical Minerals Focus",
    titleFr: "Focus sur les minéraux critiques",
    desc: "Exploring the future of critical minerals and sustainable growth.",
    descFr: "Explorer l'avenir des minéraux critiques et de la croissance durable.",
    image: "/news/critical_minerals.png",
    isGrayscale: false,
  },
  {
    year: 2023,
    title: "Building New Partnerships",
    titleFr: "Bâtir de nouveaux partenariats",
    desc: "Strengthening relationships that drive the mining industry forward.",
    descFr: "Renforcer les relations qui font progresser l'industrie minière.",
    image: "/news/banner_1.png",
    isGrayscale: false,
  },
];



export default function PastEditionsPage() {
  const { lang } = useLanguage();
  const isFr = lang === "FR";
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCards = editionCards.filter((c) =>
    searchQuery.trim() === "" ? true : c.year.toString().includes(searchQuery.trim())
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-neutral-900 font-sans antialiased overflow-x-hidden pt-20 sm:pt-24">
        {/* Hero Section */}
        <section className="relative w-full bg-white pt-2 pb-8 md:pt-4 md:pb-10 overflow-hidden border-b border-neutral-100">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column - Content */}
              <div className="lg:col-span-6 flex flex-col items-start text-left">
                {/* Breadcrumb */}
                <nav className="flex flex-wrap items-center gap-1.5 text-[10px] xs:text-[11px] md:text-xs font-bold tracking-[0.15em] text-neutral-500 uppercase mb-4">
                  <Link href="/" className="hover:text-[#C6112F] transition-colors">
                    {isFr ? "ACCUEIL" : "HOME"}
                  </Link>
                  <span>&lt;</span>
                  <span className="text-neutral-800 font-extrabold">
                    {isFr ? "ÉDITIONS PRÉCÉDENTES" : "PAST EDITIONS"}
                  </span>
                </nav>

                {/* Eyebrow Label */}
                <span className="text-[#C6112F] text-xs md:text-sm font-extrabold tracking-[0.25em] uppercase mb-2 block">
                  {isFr ? "ÉDITIONS PRÉCÉDENTES" : "PAST EDITIONS"}
                </span>

                {/* Main Headline */}
                <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[44px] leading-[1.15] font-black text-neutral-900 tracking-tight mb-3 max-w-[540px]">
                  {isFr
                    ? "Explorez des Années d'Excellence en Investissement Minier"
                    : "Explore Years of Mining Investment Excellence"}
                </h1>

                {/* Decorative Red Line */}
                <div className="w-16 sm:w-20 h-[3px] bg-[#C6112F] rounded-full mb-4" />

                {/* Description Subtext */}
                <p className="text-neutral-600 text-xs sm:text-sm md:text-base font-medium leading-relaxed mb-6 max-w-[480px]">
                  {isFr
                    ? "Revivez chaque édition à travers les programmes, les conférenciers, les entreprises participantes, les brochures et les commanditaires."
                    : "Relive every edition through agendas, speakers, participating companies, brochures and sponsors."}
                </p>

                {/* Search Bar Input */}
                <div className="relative w-full max-w-[460px]">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      isFr ? "Rechercher l'année de l'édition..." : "Search Edition Year..."
                    }
                    className="w-full bg-[#f8fafc] text-neutral-800 text-xs sm:text-base font-medium placeholder-neutral-400 border border-neutral-300 rounded-full py-3 sm:py-3.5 pl-5 sm:pl-6 pr-12 sm:pr-14 shadow-inner focus:outline-none focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 transition-all"
                  />
                  <button
                    type="button"
                    aria-label="Search"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-[#C6112F] transition-colors p-1"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 stroke-current"
                      fill="none"
                      strokeWidth="2.2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Right Column - Dotted Globe Image Covering Right Half */}
              <div className="lg:col-span-6 flex justify-center lg:justify-end relative w-full h-full min-h-[360px] sm:min-h-[440px] lg:min-h-[500px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(198,17,47,0.08),transparent_65%)] pointer-events-none rounded-full" />
                <div className="relative w-full h-full flex items-center justify-center lg:justify-end">
                  <img
                    src="/image%2034.webp"
                    alt="Mining Investment Event Globe"
                    className="w-full h-full max-h-[520px] lg:max-h-[580px] xl:max-h-[640px] object-contain object-center lg:object-right select-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Editions Grid & Impact Section */}
        <section className="pt-8 pb-12 md:pt-10 md:pb-16 bg-white">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-12">
            {/* Section Heading above Year Cards */}
            <div className="mb-8 text-left">
              <span className="text-[#C6112F] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-2 block">
                {isFr ? "ÉDITIONS ARCHIVÉES" : "ARCHIVED EDITIONS"}
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-black text-[#1a1f2c] leading-[1.2] mb-3">
                {isFr ? "Explorez Nos Éditions Précédentes" : "Explore Our Past Editions"}
              </h2>
              <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-6" />
              <p className="text-neutral-600 text-xs sm:text-base font-medium max-w-[680px] leading-relaxed">
                {isFr
                  ? "Sélectionnez une année ci-dessous pour consulter les ordres du jour, les conférenciers, les brochures, les entreprises et les commanditaires."
                  : "Select a year below to explore complete agendas, speakers, event brochures, participating companies, and sponsors."}
              </p>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {filteredCards.map((card) => {
                return (
                  <Link
                    key={card.year}
                    href={`/past-editions/${card.year}`}
                    className="group bg-white rounded-2xl border border-neutral-200/90 overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl hover:border-[#C6112F] hover:-translate-y-1"
                  >
                    {/* Top Photo */}
                    <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-neutral-100">
                      <Image
                        src={card.image}
                        alt={card.year.toString()}
                        fill
                        className={`object-cover transition-transform duration-500 group-hover:scale-105 ${card.isGrayscale ? "grayscale contrast-105" : ""
                          }`}
                      />
                    </div>

                    {/* Card Content Body */}
                    <div className="p-5 sm:p-6 flex flex-col items-start text-left flex-grow justify-between">
                      <div>
                        {/* Year */}
                        <span className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mb-2 block">
                          {card.year}
                        </span>

                        {/* Title */}
                        <h3 className="text-base sm:text-xl font-bold text-[#C6112F] leading-snug mb-2 sm:mb-3">
                          {isFr ? card.titleFr : card.title}
                        </h3>

                        {/* Description */}
                        <p className="text-neutral-600 text-xs sm:text-sm font-medium leading-relaxed mb-5 sm:mb-6">
                          {isFr ? card.descFr : card.desc}
                        </p>
                      </div>

                      {/* View Archive Button */}
                      <div className="w-full pt-2">
                        <div className="w-full rounded-xl py-3 px-4 text-xs font-extrabold uppercase tracking-wider inline-flex items-center justify-between transition-all duration-200 bg-white border border-[#C6112F]/40 text-[#C6112F] group-hover:bg-[#C6112F] group-hover:text-white group-hover:border-[#C6112F] shadow-sm">
                          <span>{isFr ? "VOIR L'ARCHIVE" : "VIEW ARCHIVE"}</span>
                          <svg
                            className="w-4 h-4 fill-none stroke-current transform group-hover:translate-x-0.5 transition-transform"
                            strokeWidth="2.2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* ════════ SINGLE 1-LINE HORIZONTAL STATS ROW (EXACT MATCH TO ALL PAGES) ════════ */}
            <div className="w-full max-w-[1240px] mx-auto mb-12">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 sm:gap-2 lg:gap-2.5">
                {/* Card 1: Qualified Investors */}
                <div className="bg-white dark:bg-[#141824] border border-neutral-200/90 dark:border-zinc-800 rounded-xl p-2 sm:p-2.5 flex items-center gap-1.5 sm:gap-2 shadow-2xs hover:shadow-md hover:border-[#C6112F]/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer overflow-hidden min-w-0">
                  <div className="relative w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-neutral-100 dark:bg-zinc-800/90 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
                    <div className="absolute -top-[1.5px] -right-[1.5px] w-3.5 h-3.5 border-t-2 border-r-2 border-[#C6112F] rounded-tr-full pointer-events-none" />
                    <i className="fi fi-rr-user-salary text-sm sm:text-base leading-none text-neutral-700 dark:text-zinc-200" />
                  </div>
                  <div className="w-[1px] h-7 sm:h-8 bg-[#C6112F]/30 shrink-0" />
                  <div className="flex flex-col items-start justify-center overflow-hidden min-w-0 flex-1">
                    <div className="text-sm sm:text-base xl:text-lg font-black text-neutral-900 dark:text-white leading-tight tracking-tight">350</div>
                    <span className="text-[#C6112F] font-medium text-[8px] sm:text-[9px] xl:text-[9.5px] tracking-tight uppercase leading-[1.1] mt-0.5 max-w-full">
                      {isFr ? (
                        <>
                          INVESTISSEURS<br />QUALIFIÉS
                        </>
                      ) : (
                        <>
                          QUALIFIED<br />INVESTORS
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Card 2: Companies Represented */}
                <div className="bg-white dark:bg-[#141824] border border-neutral-200/90 dark:border-zinc-800 rounded-xl p-2 sm:p-2.5 flex items-center gap-1.5 sm:gap-2 shadow-2xs hover:shadow-md hover:border-[#C6112F]/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer overflow-hidden min-w-0">
                  <div className="relative w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-neutral-100 dark:bg-zinc-800/90 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
                    <div className="absolute -top-[1.5px] -right-[1.5px] w-3.5 h-3.5 border-t-2 border-r-2 border-[#C6112F] rounded-tr-full pointer-events-none" />
                    <i className="fi fi-rs-building text-sm sm:text-base leading-none text-neutral-700 dark:text-zinc-200" />
                  </div>
                  <div className="w-[1px] h-7 sm:h-8 bg-[#C6112F]/30 shrink-0" />
                  <div className="flex flex-col items-start justify-center overflow-hidden min-w-0 flex-1">
                    <div className="text-sm sm:text-base xl:text-lg font-black text-neutral-900 dark:text-white leading-tight tracking-tight">200+</div>
                    <span className="text-[#C6112F] font-medium text-[8px] sm:text-[9px] xl:text-[9.5px] tracking-tight uppercase leading-[1.1] mt-0.5 max-w-full">
                      {isFr ? (
                        <>
                          SOCIÉTÉS<br />REPRÉSENTÉES
                        </>
                      ) : (
                        <>
                          COMPANIES<br />REPRESENTED
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Card 3: 1x1 Meeting Issuers */}
                <div className="bg-white dark:bg-[#141824] border border-neutral-200/90 dark:border-zinc-800 rounded-xl p-2 sm:p-2.5 flex items-center gap-1.5 sm:gap-2 shadow-2xs hover:shadow-md hover:border-[#C6112F]/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer overflow-hidden min-w-0">
                  <div className="relative w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-neutral-100 dark:bg-zinc-800/90 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
                    <div className="absolute -top-[1.5px] -right-[1.5px] w-3.5 h-3.5 border-t-2 border-r-2 border-[#C6112F] rounded-tr-full pointer-events-none" />
                    <i className="fi fi-rr-handshake text-sm sm:text-base leading-none text-neutral-700 dark:text-zinc-200" />
                  </div>
                  <div className="w-[1px] h-7 sm:h-8 bg-[#C6112F]/30 shrink-0" />
                  <div className="flex flex-col items-start justify-center overflow-hidden min-w-0 flex-1">
                    <div className="text-sm sm:text-base xl:text-lg font-black text-neutral-900 dark:text-white leading-tight tracking-tight">143</div>
                    <span className="text-[#C6112F] font-medium text-[8px] sm:text-[9px] xl:text-[9.5px] tracking-tight uppercase leading-[1.1] mt-0.5 max-w-full">
                      {isFr ? (
                        <>
                          RENCONTRES<br />1-À-1 ÉMETTEURS
                        </>
                      ) : (
                        <>
                          1X1 MEETING<br />ISSUERS
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Card 4: Presentations */}
                <div className="bg-white dark:bg-[#141824] border border-neutral-200/90 dark:border-zinc-800 rounded-xl p-2 sm:p-2.5 flex items-center gap-1.5 sm:gap-2 shadow-2xs hover:shadow-md hover:border-[#C6112F]/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer overflow-hidden min-w-0">
                  <div className="relative w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-neutral-100 dark:bg-zinc-800/90 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
                    <div className="absolute -top-[1.5px] -right-[1.5px] w-3.5 h-3.5 border-t-2 border-r-2 border-[#C6112F] rounded-tr-full pointer-events-none" />
                    <i className="fi fi-rr-chart-user text-sm sm:text-base leading-none text-neutral-700 dark:text-zinc-200" />
                  </div>
                  <div className="w-[1px] h-7 sm:h-8 bg-[#C6112F]/30 shrink-0" />
                  <div className="flex flex-col items-start justify-center overflow-hidden min-w-0 flex-1">
                    <div className="text-sm sm:text-base xl:text-lg font-black text-neutral-900 dark:text-white leading-tight tracking-tight">65</div>
                    <span className="text-[#C6112F] font-medium text-[8px] sm:text-[9px] xl:text-[9.5px] tracking-tight uppercase leading-[1.1] mt-0.5 max-w-full">
                      {isFr ? "PRÉSENTATIONS" : "PRESENTATIONS"}
                    </span>
                  </div>
                </div>

                {/* Card 5: Panels & Keynotes */}
                <div className="bg-white dark:bg-[#141824] border border-neutral-200/90 dark:border-zinc-800 rounded-xl p-2 sm:p-2.5 flex items-center gap-1.5 sm:gap-2 shadow-2xs hover:shadow-md hover:border-[#C6112F]/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer overflow-hidden min-w-0">
                  <div className="relative w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-neutral-100 dark:bg-zinc-800/90 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
                    <div className="absolute -top-[1.5px] -right-[1.5px] w-3.5 h-3.5 border-t-2 border-r-2 border-[#C6112F] rounded-tr-full pointer-events-none" />
                    <i className="fi fi-rs-circle-microphone text-sm sm:text-base leading-none text-neutral-700 dark:text-zinc-200" />
                  </div>
                  <div className="w-[1px] h-7 sm:h-8 bg-[#C6112F]/30 shrink-0" />
                  <div className="flex flex-col items-start justify-center overflow-hidden min-w-0 flex-1">
                    <div className="text-sm sm:text-base xl:text-lg font-black text-neutral-900 dark:text-white leading-tight tracking-tight">17</div>
                    <span className="text-[#C6112F] font-medium text-[8px] sm:text-[9px] xl:text-[9.5px] tracking-tight uppercase leading-[1.1] mt-0.5 max-w-full">
                      {isFr ? (
                        <>
                          PANELS ET<br />CONFÉRENCES
                        </>
                      ) : (
                        <>
                          PANELS &<br />KEYNOTES
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Card 6: Sponsors & Partners */}
                <div className="bg-white dark:bg-[#141824] border border-neutral-200/90 dark:border-zinc-800 rounded-xl p-2 sm:p-2.5 flex items-center gap-1.5 sm:gap-2 shadow-2xs hover:shadow-md hover:border-[#C6112F]/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer overflow-hidden min-w-0">
                  <div className="relative w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-neutral-100 dark:bg-zinc-800/90 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
                    <div className="absolute -top-[1.5px] -right-[1.5px] w-3.5 h-3.5 border-t-2 border-r-2 border-[#C6112F] rounded-tr-full pointer-events-none" />
                    <i className="fi fi-rr-circle-nodes text-sm sm:text-base leading-none text-neutral-700 dark:text-zinc-200" />
                  </div>
                  <div className="w-[1px] h-7 sm:h-8 bg-[#C6112F]/30 shrink-0" />
                  <div className="flex flex-col items-start justify-center overflow-hidden min-w-0 flex-1">
                    <div className="text-sm sm:text-base xl:text-lg font-black text-neutral-900 dark:text-white leading-tight tracking-tight">60+</div>
                    <span className="text-[#C6112F] font-medium text-[8px] sm:text-[9px] xl:text-[9.5px] tracking-tight uppercase leading-[1.1] mt-0.5 max-w-full">
                      {isFr ? (
                        <>
                          COMMANDITAIRES<br />& PARTENAIRES
                        </>
                      ) : (
                        <>
                          SPONSORS &<br />PARTNERS
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Card 7: 1x1 Meetings / 3 Days */}
                <div className="bg-white dark:bg-[#141824] border border-neutral-200/90 dark:border-zinc-800 rounded-xl p-2 sm:p-2.5 flex items-center gap-1.5 sm:gap-2 shadow-2xs hover:shadow-md hover:border-[#C6112F]/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer overflow-hidden min-w-0">
                  <div className="relative w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-neutral-100 dark:bg-zinc-800/90 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
                    <div className="absolute -top-[1.5px] -right-[1.5px] w-3.5 h-3.5 border-t-2 border-r-2 border-[#C6112F] rounded-tr-full pointer-events-none" />
                    <i className="fi fi-rr-coworking text-sm sm:text-base leading-none text-neutral-700 dark:text-zinc-200" />
                  </div>
                  <div className="w-[1px] h-7 sm:h-8 bg-[#C6112F]/30 shrink-0" />
                  <div className="flex flex-col items-start justify-center overflow-hidden min-w-0 flex-1">
                    <div className="text-sm sm:text-base xl:text-lg font-black text-neutral-900 dark:text-white leading-tight tracking-tight">3,500</div>
                    <span className="text-[#C6112F] font-medium text-[8px] sm:text-[9px] xl:text-[9.5px] tracking-tight uppercase leading-[1.1] mt-0.5 max-w-full">
                      {isFr ? (
                        <>
                          RÉUNIONS 1-À-1 /<br />3 JOURS
                        </>
                      ) : (
                        <>
                          1X1 MEETINGS /<br />3 DAYS
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Centered Explore All Edition Button */}
            <div className="flex justify-center">
              <Link
                href="/media"
                className="w-full sm:w-auto justify-center bg-[#C6112F] hover:bg-[#a80d26] border border-[#a80d26] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider px-6 sm:px-8 py-3.5 rounded-lg shadow-md hover:shadow-lg inline-flex items-center gap-3 transition-all duration-300 transform hover:-translate-y-0.5 text-center"
              >
                <span>{isFr ? "VOIR TOUTES LES ÉDITIONS" : "EXPLORE ALL EDITION"}</span>
                <svg
                  className="w-5 h-5 text-white shrink-0"
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
        <GetInTouchCTA />
        <Footer />
      </main>
    </>





  );
}
