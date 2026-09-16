"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import AgendaPdfViewer from "@/components/AgendaPdfViewer";
import { useLanguage } from "@/context/LanguageContext";

const years = [2027, 2026, 2025, 2024, 2023, 2022];

export default function PastEdition2022Page() {
  const { lang } = useLanguage();
  const isFr = lang === "FR";
  const viewingEdition = 2022;

  const sidebarTabs = [
    {
      id: "overview",
      label: isFr ? "APERÇU" : "OVERVIEW",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      id: "agenda",
      label: isFr ? "Ordre du jour" : "Agenda",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: "brochures",
      label: isFr ? "Brochures" : "Brochures",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState<string>("overview");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-neutral-900 font-sans antialiased overflow-x-hidden pt-20 sm:pt-24">
        <div className="w-full max-w-[96%] xl:max-w-[1650px] 2xl:max-w-[1800px] mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6">
          {/* Outer Container Card */}
          <div className="bg-white border border-neutral-200/90 rounded-2xl shadow-sm overflow-hidden mb-8">
            {/* Breadcrumb Header Bar */}
            <div className="px-4 sm:px-8 py-3.5 sm:py-4 border-b border-neutral-200/80 bg-white flex flex-wrap items-center justify-between gap-2">
              <nav className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] xs:text-xs sm:text-sm font-bold tracking-wider text-neutral-500 uppercase">
                <Link href="/" className="hover:text-[#C6112F] transition-colors">
                  {isFr ? "ACCUEIL" : "HOME"}
                </Link>
                <span>&lt;</span>
                <Link
                  href="/past-editions"
                  className="hover:text-[#C6112F] transition-colors uppercase cursor-pointer"
                >
                  {isFr ? "ÉDITIONS PRÉCÉDENTES" : "PAST EDITIONS"}
                </Link>
                <span>&lt;</span>
                <span className="text-neutral-900 font-extrabold">{viewingEdition}</span>
              </nav>

              {/* Direct Year Switcher Pills */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 ml-auto">
                <Link
                  href="/past-editions"
                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-neutral-600 dark:text-neutral-300 hover:text-[#C6112F] hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  &larr; {isFr ? "Toutes les éditions" : "All Editions"}
                </Link>
                {years.map((yr) => (
                  <Link
                    key={yr}
                    href={`/past-editions/${yr}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black tracking-wider transition-all ${
                      viewingEdition === yr
                        ? "bg-[#C6112F] text-white shadow-xs scale-105"
                        : "bg-neutral-100 dark:bg-zinc-800 text-neutral-700 dark:text-zinc-200 hover:bg-[#C6112F]/10 hover:text-[#C6112F]"
                    }`}
                  >
                    {yr}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Pill Nav */}
            <div className="flex lg:hidden overflow-x-auto gap-2 p-4 bg-neutral-100 dark:bg-zinc-900 border-b border-neutral-200 dark:border-zinc-800 scrollbar-none">
              {sidebarTabs.map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#C6112F] text-white shadow-xs"
                        : "bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 text-neutral-700 dark:text-zinc-200 hover:bg-neutral-100 dark:hover:bg-zinc-700"
                    }`}
                  >
                    <span className={isSelected ? "text-white" : "text-[#C6112F]"}>
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Two-Column Grid: Left Sidebar & Right Detail Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[700px]">
              {/* ═══════════════ LEFT SIDEBAR (Desktop Only) ═══════════════ */}
              <div className="hidden lg:flex lg:col-span-3 border-r border-neutral-200/80 dark:border-zinc-800 bg-[#fdfefe] dark:bg-[#18181b] p-6 flex-col items-stretch">
                <div>
                  {/* Menu Item List */}
                  <div className="space-y-2 mb-6">
                    {sidebarTabs.map((tab) => {
                      const isSelected = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-lg text-xs sm:text-sm font-bold transition-all text-left cursor-pointer ${
                            isSelected
                              ? "bg-[#FCDDE1] text-[#8A1224] dark:bg-[#C6112F]/20 dark:text-rose-300 border-l-4 border-[#C6112F] shadow-xs"
                              : "text-neutral-600 dark:text-zinc-300 hover:bg-neutral-100/90 dark:hover:bg-zinc-800 hover:text-neutral-900 dark:hover:text-white"
                          }`}
                        >
                          <span className={isSelected ? "text-[#C6112F] dark:text-[#C6112F]" : "text-neutral-500 dark:text-zinc-400"}>
                            {tab.icon}
                          </span>
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Links Card */}
                <div className="mt-2 bg-[#f8f9fa] dark:bg-[#121215] border border-neutral-300/80 dark:border-zinc-800 rounded-2xl p-6 text-left shadow-xs">
                  <h4 className="text-lg sm:text-xl font-extrabold text-[#C6112F] tracking-tight mb-6">
                    {isFr ? "LIENS RAPIDES" : "QUICK LINKS"}
                  </h4>
                  <div className="space-y-4 text-xs sm:text-sm font-medium text-neutral-700 dark:text-zinc-300">
                    <a
                      href="/register"
                      className="flex items-center justify-between hover:text-[#C6112F] dark:hover:text-[#C6112F] transition-colors pb-3 border-b border-[#F5C2C7] dark:border-zinc-800"
                    >
                      <span>{isFr ? "S'inscrire maintenant" : "Register Now"}</span>
                      <svg className="w-5 h-5 text-neutral-500 dark:text-zinc-400 hover:text-[#C6112F] stroke-current shrink-0 ml-2 transition-colors" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>

                    <button
                      onClick={() => setActiveTab("agenda")}
                      className="w-full flex items-center justify-between hover:text-[#C6112F] dark:hover:text-[#C6112F] transition-colors pb-3 border-b border-[#F5C2C7] dark:border-zinc-800 text-left cursor-pointer"
                    >
                      <span>{isFr ? "Consulter l'ordre du jour" : "View Agenda"}</span>
                      <svg className="w-5 h-5 text-neutral-500 dark:text-zinc-400 hover:text-[#C6112F] stroke-current shrink-0 ml-2 transition-colors" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>

                    <button
                      onClick={() => setActiveTab("brochures")}
                      className="w-full flex items-center justify-between hover:text-[#C6112F] dark:hover:text-[#C6112F] transition-colors pb-3 border-b border-[#F5C2C7] dark:border-zinc-800 text-left cursor-pointer"
                    >
                      <span>{isFr ? "Télécharger la brochure" : "Download Brochure"}</span>
                      <svg className="w-5 h-5 text-neutral-500 dark:text-zinc-400 hover:text-[#C6112F] stroke-current shrink-0 ml-2 transition-colors" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>

                    <a
                      href="mailto:jchoi@irinc.ca"
                      className="flex items-center justify-between hover:text-[#C6112F] dark:hover:text-[#C6112F] transition-colors pb-3 border-b border-[#F5C2C7] dark:border-zinc-800"
                    >
                      <span>{isFr ? "Nous contacter" : "Contact Us"}</span>
                      <svg className="w-5 h-5 text-neutral-500 dark:text-zinc-400 hover:text-[#C6112F] stroke-current shrink-0 ml-2 transition-colors" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* ═══════════════ RIGHT MAIN CONTENT AREA ═══════════════ */}
              <div className="lg:col-span-9 p-4 xs:p-6 sm:p-8 md:p-10 flex flex-col justify-between text-left bg-white dark:bg-[#18181b]">
                {activeTab === "agenda" ? (
                  <div className="w-full">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block">
                          {isFr ? `ÉDITION ${viewingEdition}` : `${viewingEdition} EDITION`}
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight mb-2">
                          {isFr ? `Ordre du jour ${viewingEdition}` : `Event Agenda ${viewingEdition}`}
                        </h1>
                      </div>
                      <div className="flex items-center gap-3">
                        <a
                          href="/documents/2022-agenda.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-extrabold tracking-wider uppercase inline-flex items-center gap-2 shadow-xs transition-all"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span>{isFr ? "Plein Écran" : "Open PDF"}</span>
                        </a>
                        <a
                          href="/documents/2022-agenda.pdf"
                          download="THE_Event_2022_Agenda.pdf"
                          className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-extrabold tracking-wider uppercase border border-neutral-200 dark:border-neutral-700 inline-flex items-center gap-2 transition-all"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                          <span>{isFr ? "Télécharger" : "Download"}</span>
                        </a>
                      </div>
                    </div>
                    <p className="text-neutral-600 dark:text-zinc-300 text-sm sm:text-base font-medium leading-relaxed max-w-[720px] mb-8">
                      {isFr
                        ? "Consultez l'ordre du jour officiel avec les sessions, les conférenciers, les présentations d'entreprises et les tables rondes."
                        : "View the official complete agenda featuring keynote sessions, corporate presentations, and panel discussions for the 2022 edition."}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 md:gap-10 pb-8 mb-8 border-b border-neutral-200 text-xs sm:text-sm font-medium text-neutral-700">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#FCDDE1] flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <rect x="4" y="5" width="16" height="15" rx="2" />
                            <path d="M4 9.5h16M8 3v4M16 3v4" />
                          </svg>
                        </div>
                        <div>
                          <b className="block text-neutral-900 dark:text-white font-extrabold text-sm sm:text-base">
                            {isFr ? `Juin ${viewingEdition}` : `June ${viewingEdition}`}
                          </b>
                          <span className="text-neutral-500 text-xs">{isFr ? "Ordre du jour officiel" : "Official Event Agenda"}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#FCDDE1] flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <b className="block text-neutral-900 dark:text-white font-extrabold text-sm sm:text-base">Centre des congrès de Québec</b>
                          <span className="text-neutral-500 text-xs">{isFr ? "Ville de Québec, Canada" : "Québec City, Canada"}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#FCDDE1] flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <b className="block text-neutral-900 dark:text-white font-extrabold text-sm sm:text-base">PDF, 0.5 MB</b>
                          <span className="text-neutral-500 text-xs">{isFr ? "Document PDF • 4 Pages" : "PDF Document • 4 Pages"}</span>
                        </div>
                      </div>
                    </div>

                    <AgendaPdfViewer
                      pdfUrl="/documents/2022-agenda.pdf"
                      year={viewingEdition}
                      fileName="2022-agenda.pdf"
                      title={isFr ? `Ordre du jour de l'événement ${viewingEdition}` : `Event Agenda ${viewingEdition}`}
                      totalPages={4}
                      fileSize="0.5 MB"
                    />
                  </div>
                ) : activeTab === "brochures" ? (
                  <div className="w-full">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block">
                          {isFr ? `ÉDITION ${viewingEdition}` : `${viewingEdition} EDITION`}
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight mb-2">
                          {isFr ? `Brochure de l'événement ${viewingEdition}` : `Event Brochure ${viewingEdition}`}
                        </h1>
                      </div>
                      <div className="flex items-center gap-3">
                        <a
                          href="/documents/2022-brochure.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-extrabold tracking-wider uppercase inline-flex items-center gap-2 shadow-xs transition-all"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span>{isFr ? "Plein Écran" : "Open PDF"}</span>
                        </a>
                        <a
                          href="/documents/2022-brochure.pdf"
                          download="THE_Event_2022_Brochure.pdf"
                          className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-extrabold tracking-wider uppercase border border-neutral-200 dark:border-neutral-700 inline-flex items-center gap-2 transition-all"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                          <span>{isFr ? "Télécharger" : "Download"}</span>
                        </a>
                      </div>
                    </div>
                    <p className="text-neutral-600 dark:text-zinc-300 text-sm sm:text-base font-medium leading-relaxed max-w-[720px] mb-8">
                      {isFr
                        ? "Explorez la brochure officielle complète de l'événement pour découvrir les détails, les thèmes clés et la programmation."
                        : "Explore the official event brochure to discover event details, key themes, speaker highlights and sponsorship opportunities."}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 md:gap-10 pb-8 mb-8 border-b border-neutral-200 text-xs sm:text-sm font-medium text-neutral-700">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#FCDDE1] flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <rect x="4" y="5" width="16" height="15" rx="2" />
                            <path d="M4 9.5h16M8 3v4M16 3v4" />
                          </svg>
                        </div>
                        <div>
                          <b className="block text-neutral-900 dark:text-white font-extrabold text-sm sm:text-base">
                            {isFr ? `Juin ${viewingEdition}` : `June ${viewingEdition}`}
                          </b>
                          <span className="text-neutral-500 text-xs">{isFr ? "Édition inaugurale" : "Inaugural Edition"}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#FCDDE1] flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <b className="block text-neutral-900 dark:text-white font-extrabold text-sm sm:text-base">Centre des congrès de Québec</b>
                          <span className="text-neutral-500 text-xs">{isFr ? "Ville de Québec, Canada" : "Québec City, Canada"}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#FCDDE1] flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <b className="block text-neutral-900 dark:text-white font-extrabold text-sm sm:text-base">PDF, 2.0 MB</b>
                          <span className="text-neutral-500 text-xs">{isFr ? "Brochure officielle • 2 Pages" : "Official Brochure • 2 Pages"}</span>
                        </div>
                      </div>
                    </div>

                    <AgendaPdfViewer
                      pdfUrl="/documents/2022-brochure.pdf"
                      year={viewingEdition}
                      fileName="2022-brochure.pdf"
                      title={isFr ? `Brochure de l'événement ${viewingEdition}` : `Event Brochure ${viewingEdition}`}
                      totalPages={2}
                      fileSize="2.0 MB"
                    />
                  </div>
                ) : (
                  /* ═══════════════ OVERVIEW TAB ═══════════════ */
                  <div>
                    <span className="text-[#C6112F] text-[11px] sm:text-xs font-extrabold tracking-[0.3em] uppercase mb-2 block">
                      {isFr ? "L'ÉVÉNEMENT D'INVESTISSEMENT MINIER" : "THE MINING INVESTMENT EVENT"}
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-2">
                      {isFr ? `Édition ${viewingEdition}` : `${viewingEdition} Edition`}
                    </h1>
                    <div className="w-20 h-[3px] bg-[#C6112F] rounded-full mb-4" />
                    <p className="text-neutral-600 text-sm sm:text-base font-medium leading-relaxed max-w-[700px] mb-6">
                      {isFr
                        ? "L'édition inaugurale de l'événement d'investissement minier, posant les bases d'une plateforme mondiale pour le secteur minier canadien."
                        : "The founding edition of the Mining Investment Event, laying the groundwork for a global platform for the Canadian mining sector."}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-xs sm:text-sm font-extrabold text-neutral-800 uppercase mb-8">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-neutral-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <rect x="3" y="4" width="18" height="16" rx="2" />
                          <path strokeLinecap="round" d="M16 2v4M8 2v4M3 9h18" />
                        </svg>
                        <span>{isFr ? `JUIN ${viewingEdition}` : `JUNE ${viewingEdition}`}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-neutral-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{isFr ? "VILLE DE QUÉBEC, CANADA" : "QUÉBEC CITY, CANADA"}</span>
                      </div>
                    </div>

                    <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border-2 border-[#C6112F]/40 shadow-sm mb-8 bg-neutral-900">
                      <img
                        src="/2022.png"
                        alt="Québec City Event"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                      <button
                        onClick={() => setActiveTab("brochures")}
                        className="w-full sm:w-auto px-8 py-3.5 bg-[#C6112F] hover:bg-[#a80e27] text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase rounded-lg shadow-md hover:shadow-lg transition-all text-center transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        {isFr ? "VOIR LA BROCHURE" : "VIEW BROCHURE"}
                      </button>

                      <button
                        onClick={() => setActiveTab("agenda")}
                        className="w-full sm:w-auto px-8 py-3.5 bg-white border border-[#333] hover:bg-neutral-50 text-[#C6112F] text-xs sm:text-sm font-extrabold tracking-wider uppercase rounded-lg shadow-sm hover:shadow-md transition-all text-center transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        {isFr ? "VOIR L'ORDRE DU JOUR" : "SEE AGENDA"}
                      </button>
                    </div>

                    <div className="mb-12">
                      <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#1a1f2c] leading-[1.2] mb-3">
                        {isFr ? "À propos de L'ÉVÉNEMENT" : "About THE EVENT"}
                      </h2>
                      <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-4" />
                      <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-6 font-medium max-w-[760px]">
                        {isFr
                          ? "L'Événement d'Investissement Minier 2022 a marqué le lancement de la plateforme mondiale d'investissement minier au Canada."
                          : "The Mining Investment Event 2022 marked the founding of Canada's premier global mining investment platform, bringing together industry leaders for the first time in Quebec City."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ═══════════════ BOTTOM RED PAST EDITION YEAR SWITCHER BAR ═══════════════ */}
          <div className="w-full bg-[#C6112F] py-4 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md text-white rounded-2xl">
            <span className="text-base sm:text-lg font-extrabold tracking-widest uppercase text-white">
              {isFr ? "ÉDITIONS PRÉCÉDENTES" : "PAST EDITION"}
            </span>

            <div className="flex items-center gap-6 sm:gap-12 md:gap-16">
              {years.map((year) => {
                const isSelected = viewingEdition === year;
                if (isSelected) {
                  return (
                    <span
                      key={year}
                      className="bg-white text-[#C6112F] px-6 py-2 rounded-lg shadow-md font-extrabold scale-105 text-base sm:text-lg"
                    >
                      {year}
                    </span>
                  );
                }
                return (
                  <Link
                    key={year}
                    href={`/past-editions/${year}`}
                    className="text-white opacity-95 hover:opacity-100 px-3 py-2 text-base sm:text-lg font-bold transition-all duration-200"
                  >
                    {year}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}
