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

const impactStats = [
  {
    value: "50+",
    label: "SPEAKERS",
    labelFr: "CONFÉRENCIERS",
    icon: (
      <svg className="w-7 h-7 text-[#1a1f2c] dark:text-white" viewBox="0 0 24 24" fill="none">
        <path d="M11 5L6 9H3a1 1 0 00-1 1v4a1 1 0 001 1h3l5 4V5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.5 8.5a4 4 0 010 7" stroke="#C6112F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.5 6a7 7 0 010 12" stroke="#C6112F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: "500+",
    label: "INVESTORS",
    labelFr: "INVESTISSEURS",
    icon: (
      <svg className="w-7 h-7 text-[#1a1f2c] dark:text-white" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 20v-1a7 7 0 0114 0v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 16h6" stroke="#C6112F" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "300+",
    label: "MINING COMPANIES",
    labelFr: "SOCIÉTÉS MINIÈRES",
    icon: (
      <svg className="w-7 h-7 text-[#1a1f2c] dark:text-white" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10.5 12h3" stroke="#C6112F" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "50+",
    label: "COUNTRIES",
    labelFr: "PAYS",
    icon: (
      <svg className="w-7 h-7 text-[#1a1f2c] dark:text-white" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9 15.3 15.3 0 014-9z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3.6 9h16.8M3.6 15h16.8" stroke="#C6112F" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    value: "12,000+",
    label: "MEETINGS",
    labelFr: "RÉUNIONS",
    icon: (
      <svg className="w-7 h-7 text-[#1a1f2c] dark:text-white" viewBox="0 0 24 24" fill="none">
        <path d="M4 17l5-5 4 4 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 9h5v5" stroke="#C6112F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
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
                    HOME
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

              {/* Right Column - Dotted Globe Image */}
              <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(198,17,47,0.08),transparent_65%)] pointer-events-none rounded-full" />
                <div className="relative w-full max-w-[280px] xs:max-w-[340px] sm:w-[420px] md:w-[460px] lg:w-[480px] aspect-square flex items-center justify-center">
                  <Image
                    src="/image%2034.png"
                    alt="Mining Investment Event Globe"
                    width={600}
                    height={600}
                    priority
                    className="w-full h-full object-contain select-none"
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

            {/* Impact Stats Container */}
            <div className="w-full bg-white dark:bg-[#131b2e] border border-neutral-200/90 dark:border-[#233049] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs text-left mb-10">
              {/* Top Red Bar Accent */}
              <div className="w-7 h-[2.5px] bg-[#C6112F] rounded-full mb-3" />

              {/* Two-line Header Title */}
              <div className="mb-8">
                <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase block">
                  {isFr ? "NOTRE IMPACT" : "OUR IMPACT"}
                </span>
                <span className="text-neutral-500 dark:text-neutral-400 text-xs font-bold tracking-[0.25em] uppercase block mt-0.5">
                  {isFr ? "AU FIL DES ANS" : "OVER THE YEARS"}
                </span>
              </div>

              <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-0">
                {impactStats.map((stat, idx) => {
                  const isLast = idx === impactStats.length - 1;
                  return (
                    <div
                      key={stat.label}
                      className={`flex flex-col items-start text-left group ${!isLast ? "lg:border-r lg:border-neutral-200/80 dark:lg:border-[#233049] lg:pr-8" : ""
                        } ${idx !== 0 ? "lg:pl-8" : ""}`}
                    >
                      {/* Two-Tone Icon */}
                      <div className="mb-3 text-neutral-900 dark:text-white transform group-hover:scale-105 transition-transform duration-200">
                        {stat.icon}
                      </div>

                      {/* Value */}
                      <span className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] dark:text-white tracking-tight leading-none mb-2">
                        {stat.value}
                      </span>

                      {/* Label */}
                      <span className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.18em] text-neutral-400 dark:text-neutral-500 uppercase">
                        {isFr ? stat.labelFr : stat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4 Photo Thumbnails Gallery Row */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12">
              {[
                "/Mining Investment Post 2.avif",
                "/image%2015%20(2).avif",
                "/Mining Investment Post 3.avif",
                "/Mining Investment Post (1) 2.avif",
              ].map((imgSrc, index) => (
                <div
                  key={index}
                  className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border-2 border-[#C6112F]/60 shadow-sm group hover:border-[#C6112F] hover:shadow-md transition-all duration-300 bg-white"
                >
                  <Image
                    src={imgSrc}
                    alt={`Event photo ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
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
