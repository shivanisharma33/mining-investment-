"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const years = [2026, 2025, 2024, 2023];

const editionCards = [
  {
    year: "2026",
    title: "The Biggest Edition Yet",
    titleFr: "La plus grande édition à ce jour",
    desc: "Uniting global leaders for impactful conversations and investments.",
    descFr: "Rassembler les dirigeants mondiaux pour des conversations et des investissements impactants.",
    image: "/Mining Investment Post 2.avif",
    isGrayscale: false,
  },
  {
    year: "2025",
    title: "Driving Global Investment",
    titleFr: "Propulser l'investissement mondial",
    desc: "Connecting capital with opportunity across the mining value chain.",
    descFr: "Connecter le capital aux opportunités dans toute la chaîne de valeur minière.",
    image: "/image%2015%20(2).avif",
    isGrayscale: true,
  },
  {
    year: "2024",
    title: "Critical Minerals Focus",
    titleFr: "Focus sur les minéraux critiques",
    desc: "Exploring the future of critical minerals and sustainable growth.",
    descFr: "Explorer l'avenir des minéraux critiques et de la croissance durable.",
    image: "/Mining Investment Post 3.avif",
    isGrayscale: true,
  },
  {
    year: "2023",
    title: "Building New Partnerships",
    titleFr: "Bâtir de nouveaux partenariats",
    desc: "Strengthening relationships that drive the mining industry forward.",
    descFr: "Renforcer les relations qui font progresser l'industrie minière.",
    image: "/Mining Investment Post (1) 2.avif",
    isGrayscale: true,
  },
];

const impactStats = [
  {
    value: "50+",
    label: "SPEAKERS",
    labelFr: "CONFÉRENCIERS",
    icon: (
      <svg className="w-8 h-8 text-neutral-900" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.287a6 6 0 010 7.427M11 6H7a2 2 0 00-2 2v8a2 2 0 002 2h4l5 5V1L11 6z" />
      </svg>
    ),
  },
  {
    value: "500+",
    label: "INVESTORS",
    labelFr: "INVESTISSEURS",
    icon: (
      <svg className="w-8 h-8 text-neutral-900" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    value: "300+",
    label: "MINING COMPANIES",
    labelFr: "SOCIÉTÉS MINIÈRES",
    icon: (
      <svg className="w-8 h-8 text-neutral-900" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7h-4V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM10 5h4v2h-4V5z" />
      </svg>
    ),
  },
  {
    value: "50+",
    label: "COUNTRIES",
    labelFr: "PAYS",
    icon: (
      <svg className="w-8 h-8 text-neutral-900" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9 15.3 15.3 0 014-9z" />
      </svg>
    ),
  },
  {
    value: "12,000+",
    label: "MEETINGS",
    labelFr: "RÉUNIONS",
    icon: (
      <svg className="w-8 h-8 text-neutral-900" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5L10 14.5L14.5 10M17 11.5L14 8.5L9.5 13M4 10l3-3 4 4M20 14l-3 3-4-4" />
      </svg>
    ),
  },
];

export default function PastEditionsPage() {
  const { lang } = useLanguage();
  const isFr = lang === "FR";

  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans antialiased overflow-x-hidden pt-20 sm:pt-24">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full bg-white pt-2 pb-16 md:pt-4 md:pb-20 overflow-hidden border-b border-neutral-100">
        <div className="max-w-[1320px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column - Content */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-1.5 text-[11px] md:text-xs font-bold tracking-[0.15em] text-neutral-500 uppercase mb-6">
                <Link href="/" className="hover:text-[#C6112F] transition-colors">
                  HOME
                </Link>
                <span>&lt;</span>
                <span className="text-neutral-800">
                  {isFr ? "ÉDITIONS PRÉCÉDENTES" : "PAST EDITION"}
                </span>
              </nav>

              {/* Eyebrow Label */}
              <span className="text-[#C6112F] text-xs md:text-sm font-extrabold tracking-[0.25em] uppercase mb-3 block">
                {isFr ? "ÉDITIONS PRÉCÉDENTES" : "PAST EDITIONS"}
              </span>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] leading-[1.15] font-black text-neutral-900 tracking-tight mb-4 max-w-[540px]">
                {isFr
                  ? "Explorez des Années d'Excellence en Investissement Minier"
                  : "Explore Years of Mining Investment Excellence"}
              </h1>

              {/* Decorative Red Line */}
              <div className="w-20 h-[3px] bg-[#C6112F] rounded-full mb-6" />

              {/* Description Subtext */}
              <p className="text-neutral-600 text-sm sm:text-base font-medium leading-relaxed mb-8 max-w-[480px]">
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
                  className="w-full bg-[#f4f6f8] text-neutral-800 text-sm sm:text-base font-medium placeholder-neutral-400 border border-neutral-300 rounded-full py-3.5 pl-6 pr-14 shadow-inner focus:outline-none focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 transition-all"
                />
                <button
                  type="button"
                  aria-label="Search"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-[#C6112F] transition-colors p-1"
                >
                  <svg
                    className="w-5 h-5 stroke-current"
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
              <div className="relative w-[320px] sm:w-[440px] md:w-[500px] lg:w-[540px] aspect-square flex items-center justify-center">
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

          {/* Bottom Interactive Metallic Year Timeline Navigation Bar */}
          <div className="mt-12 md:mt-16 w-full max-w-[1100px] mx-auto bg-gradient-to-b from-[#ffffff] via-[#f3f5f8] to-[#d4d9df] border border-[#a2aab4] rounded-2xl py-6 px-6 sm:px-12 shadow-[0_6px_16px_rgba(0,0,0,0.08),inset_0_1.5px_1px_rgba(255,255,255,0.95)]">
            <div className="relative w-full">
              
              {/* Connecting Horizontal Line */}
              <div className="absolute top-[34px] left-[10.5%] right-[10.5%] h-[1.5px] bg-[#8a94a0] z-0" />

              {/* Year Nodes Grid */}
              <div className="relative z-10 grid grid-cols-4 items-center justify-items-center">
                {years.map((year) => {
                  const isSelected = selectedYear === year;
                  return (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className="group flex flex-col items-center cursor-pointer focus:outline-none"
                    >
                      {/* Year Label Text */}
                      <span
                        className={`text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight mb-2.5 transition-all duration-200 ${
                          isSelected ? "text-neutral-950 scale-105" : "text-neutral-900 group-hover:text-[#C6112F]"
                        }`}
                      >
                        {year}
                      </span>

                      {/* Node Bullet Circle */}
                      <div className="relative flex items-center justify-center h-6">
                        {isSelected ? (
                          <div className="w-4.5 h-4.5 rounded-full bg-[#C6112F] shadow-[0_2px_8px_rgba(198,17,47,0.4)] border border-[#a50d26] transition-all transform scale-110" />
                        ) : (
                          <div className="w-4.5 h-4.5 rounded-full bg-[#dce1e7] border-2 border-[#78828e] group-hover:border-[#C6112F] group-hover:bg-[#C6112F]/20 transition-all" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editions Grid & Impact Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1320px] mx-auto px-6 md:px-12">
          
          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {editionCards.map((card) => {
              const yearNum = parseInt(card.year, 10);
              const isSelected = selectedYear === yearNum;

              return (
                <div
                  key={card.year}
                  onClick={() => setSelectedYear(yearNum)}
                  className={`group bg-white rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? "border-2 border-[#C6112F] shadow-lg ring-4 ring-[#C6112F]/10 transform -translate-y-1"
                      : "border border-neutral-200/90 shadow-sm hover:shadow-md hover:border-neutral-300 hover:-translate-y-0.5"
                  }`}
                >
                  {/* Top Photo */}
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-neutral-100">
                    <Image
                      src={card.image}
                      alt={card.year}
                      fill
                      className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                        card.isGrayscale ? "grayscale contrast-105" : ""
                      }`}
                    />
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 flex flex-col items-start text-left flex-grow justify-between">
                    <div>
                      {/* Year */}
                      <span className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mb-2 block">
                        {card.year}
                      </span>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-[#C6112F] leading-snug mb-3">
                        {isFr ? card.titleFr : card.title}
                      </h3>

                      {/* Description */}
                      <p className="text-neutral-600 text-xs sm:text-sm font-medium leading-relaxed mb-6">
                        {isFr ? card.descFr : card.desc}
                      </p>
                    </div>

                    {/* View Archive Button */}
                    <div className="w-full pt-2">
                      <div
                        className={`w-full rounded-xl py-3 px-4 text-xs font-extrabold uppercase tracking-wider inline-flex items-center justify-between transition-all duration-200 ${
                          isSelected
                            ? "bg-[#C6112F] text-white shadow-sm"
                            : "bg-white border border-[#C6112F]/40 text-[#C6112F] group-hover:bg-[#C6112F] group-hover:text-white group-hover:border-[#C6112F]"
                        }`}
                      >
                        <span>{isFr ? "VOIR L'ARCHIVE" : "VIEW ARCHIVE"}</span>
                        <svg
                          className="w-4 h-4 fill-none stroke-current"
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
                </div>
              );
            })}
          </div>

          {/* Impact Stats Container */}
          <div className="w-full bg-white border border-neutral-300/80 rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm text-left mb-16">
            <span className="text-[#C6112F] text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase mb-8 block">
              {isFr ? "NOTRE IMPACT AU FIL DES ANS" : "OUR IMPACT OVER THE YEARS"}
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-0">
              {impactStats.map((stat, idx) => {
                const isLast = idx === impactStats.length - 1;
                return (
                  <div
                    key={stat.label}
                    className={`flex flex-col items-start text-left ${
                      !isLast ? "lg:border-r lg:border-neutral-200/90 lg:pr-8" : ""
                    } ${idx !== 0 ? "lg:pl-8" : ""}`}
                  >
                    {/* Icon */}
                    <div className="mb-4 text-neutral-900">{stat.icon}</div>

                    {/* Value */}
                    <span className="text-3xl sm:text-4xl lg:text-[40px] font-black text-neutral-900 tracking-tight leading-none mb-3">
                      {stat.value}
                    </span>

                    {/* Label */}
                    <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.15em] text-[#C6112F] uppercase">
                      {isFr ? stat.labelFr : stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4 Photo Thumbnails Gallery Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
              className="bg-[#C6112F] hover:bg-[#a80d26] border border-[#a80d26] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider px-8 py-3.5 rounded-lg shadow-md hover:shadow-lg inline-flex items-center gap-3 transition-all duration-300 transform hover:-translate-y-0.5"
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
  );
}
