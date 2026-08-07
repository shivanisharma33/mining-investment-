"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import QuickNavGrid from "@/components/QuickNavGrid";

const editionCards = [
  {
    year: 2027,
    title: "Upcoming Edition 2027",
    titleFr: "Édition à venir 2027",
    desc: "Canada's Tier 1 Global Mining Investment Conference in Quebec City.",
    descFr: "La première conférence mondiale d'investissement minier au Canada à Québec.",
    image: "/news/edition_2026.png",
    isGrayscale: false,
  },
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
  const [selectedYear, setSelectedYear] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const yearOptions = ["ALL", "2027", "2026", "2025", "2024", "2023"];

  const filteredCards = editionCards.filter((c) => {
    const matchesYearFilter =
      selectedYear === "ALL" ? true : c.year.toString() === selectedYear;
    const matchesSearch =
      searchQuery.trim() === ""
        ? true
        : c.year.toString().includes(searchQuery.trim()) ||
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYearFilter && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-[#0c0d12] text-neutral-900 dark:text-neutral-100 font-sans antialiased overflow-x-hidden pt-20 sm:pt-24">
        {/* Hero Section */}
        <section className="relative w-full bg-white dark:bg-[#0c0d12] pt-2 pb-8 md:pt-4 md:pb-10 overflow-hidden border-b border-neutral-100 dark:border-neutral-800">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column - Content */}
              <div className="lg:col-span-6 flex flex-col items-start text-left">
                {/* Breadcrumb */}
                <nav className="flex flex-wrap items-center gap-1.5 text-[10px] xs:text-[11px] md:text-xs font-bold tracking-[0.15em] text-neutral-500 dark:text-neutral-400 uppercase mb-4">
                  <Link href="/" className="hover:text-[#C6112F] transition-colors">
                    {isFr ? "ACCUEIL" : "HOME"}
                  </Link>
                  <span>›</span>
                  <span className="text-neutral-800 dark:text-white font-extrabold">
                    {isFr ? "ÉDITIONS PRÉCÉDENTES" : "PAST YEARS & EDITIONS"}
                  </span>
                </nav>

                {/* Eyebrow Label */}
                <span className="text-[#C6112F] text-xs md:text-sm font-extrabold tracking-[0.25em] uppercase mb-2 block">
                  {isFr ? "ÉDITIONS ET ARCHIVES" : "PAST YEARS ARCHIVE"}
                </span>

                {/* Main Headline */}
                <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[44px] leading-[1.15] font-black text-neutral-900 dark:text-white tracking-tight mb-3 max-w-[540px]">
                  {isFr
                    ? "Explorez des Années d'Excellence en Investissement Minier"
                    : "Explore Years of Mining Investment Excellence"}
                </h1>

                {/* Decorative Red Line */}
                <div className="w-16 sm:w-20 h-[3.5px] bg-[#C6112F] rounded-full mb-4" />

                {/* Description Subtext */}
                <p className="text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm md:text-base font-medium leading-relaxed mb-6 max-w-[480px]">
                  {isFr
                    ? "Revivez chaque édition à travers les programmes, les conférenciers, les entreprises participantes, les brochures et les rapports officiels."
                    : "Relive every edition through agendas, speakers, participating companies, brochures and official snapshot reports."}
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
                    className="w-full bg-[#f8fafc] dark:bg-neutral-900 text-neutral-800 dark:text-white text-xs sm:text-base font-medium placeholder-neutral-400 border border-neutral-300 dark:border-neutral-700 rounded-full py-3 sm:py-3.5 pl-5 sm:pl-6 pr-12 sm:pr-14 shadow-inner focus:outline-none focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 transition-all"
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

        {/* Quick 8-Button Navigation Grid */}
        <section className="pt-8 pb-4 bg-white dark:bg-[#0c0d12]">
          <QuickNavGrid />
        </section>

        {/* Editions Grid & Year Navigation Buttons */}
        <section className="pt-10 pb-16 bg-white dark:bg-[#0c0d12]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-12">
            {/* Section Header & Year Navigation Buttons (Requirement 29) */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
              <div>
                <span className="text-[#C6112F] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-2 block">
                  {isFr ? "ÉDITIONS ANNUELLES" : "SELECT A YEAR"}
                </span>
                <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-black text-[#1a1f2c] dark:text-white leading-[1.2] mb-3">
                  {isFr ? "Explorez Nos Éditions Précédentes" : "Explore Past Editions & Recaps"}
                </h2>
                <div className="w-16 h-[3.5px] bg-[#C6112F] rounded-full" />
              </div>

              {/* Year Navigation Pill Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {yearOptions.map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-wider transition-all duration-300 cursor-pointer ${
                      selectedYear === yr
                        ? "bg-[#C6112F] text-white shadow-md shadow-[#C6112F]/25 scale-105"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-[#C6112F]/10 hover:text-[#C6112F]"
                    }`}
                  >
                    {yr === "ALL" ? (isFr ? "TOUTES LES ANNEES" : "ALL YEARS") : yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Year Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {filteredCards.map((card) => {
                return (
                  <Link
                    key={card.year}
                    href={`/past-editions/${card.year}`}
                    className="group bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200/90 dark:border-neutral-800 overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-sm hover:shadow-2xl hover:border-[#C6112F] hover:-translate-y-1 relative"
                  >
                    {/* Top Photo */}
                    <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                      <Image
                        src={card.image}
                        alt={card.year.toString()}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Card Content Body */}
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        {/* Year */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
                            {card.year}
                          </span>
                          <span className="text-xs font-bold text-[#C6112F] uppercase tracking-wider">
                            Edition {card.year}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-bold text-[#C6112F] leading-snug mb-2">
                          {isFr ? card.titleFr : card.title}
                        </h3>

                        {/* Description */}
                        <p className="text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm font-medium leading-relaxed mb-6">
                          {isFr ? card.descFr : card.desc}
                        </p>
                      </div>

                      {/* View Archive Button */}
                      <div className="w-full pt-2">
                        <div className="w-full rounded-xl py-3 px-4 text-xs font-extrabold uppercase tracking-wider inline-flex items-center justify-between transition-all duration-200 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-[#C6112F] group-hover:bg-[#C6112F] group-hover:text-white group-hover:border-[#C6112F] shadow-xs">
                          <span>{isFr ? "VOIR L'ARCHIVE" : "EXPLORE RECAP"}</span>
                          <svg
                            className="w-4 h-4 fill-none stroke-current transform group-hover:translate-x-1 transition-transform"
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

            {/* Featured Snapshot Report Card (Requirement 30) */}
            <div className="bg-gradient-to-r from-[#0f1117] via-[#1a1f2c] to-[#0f1117] text-white rounded-3xl p-8 sm:p-12 border border-neutral-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-[#ff4d6d] text-xs font-extrabold tracking-widest uppercase mb-2 block">
                  OFFICIAL EVENT PUBLICATION
                </span>
                <h3 className="text-2xl sm:text-3xl font-black mb-3">
                  THE Snapshot Report
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed mb-4">
                  Read the official FlippingBook digital report featuring executive interviews, conference highlights, photo galleries, and market statistics.
                </p>
              </div>

              <a
                href="https://online.flippingbook.com/view/213558062/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase transition-all shadow-lg hover:scale-105 shrink-0 inline-flex items-center gap-3"
              >
                <span>Read Snapshot Report ↗</span>
              </a>
            </div>
          </div>
        </section>

        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}
