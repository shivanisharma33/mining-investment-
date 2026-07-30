"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import AgendaView from "@/components/AgendaView";
import AgendaPdfViewer from "@/components/AgendaPdfViewer";
import SpeakersView from "@/components/SpeakersView";
import SponsorsView from "@/components/SponsorsView";
import CompaniesView from "@/components/CompaniesView";
import { useLanguage } from "@/context/LanguageContext";

const years = [2026, 2025, 2024, 2023];

const sidebarTabs = [
  {
    id: "overview",
    label: "OVERVIEW",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    id: "companies",
    label: "Participating Companies",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: "brochures",
    label: "Brochures",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: "agenda",
    label: "Agenda",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "speakers",
    label: "Speakers",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: "sponsors",
    label: "Sponsors",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
  },
];
export default function PastEdition2023Page() {
  const { lang } = useLanguage();
  const isFr = lang === "FR";
  const viewingEdition = 2023;

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
      id: "companies",
      label: isFr ? "Entreprises participantes" : "Participating Companies",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
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
      id: "speakers",
      label: isFr ? "Conférenciers" : "Speakers",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      id: "sponsors",
      label: isFr ? "Commanditaires" : "Sponsors",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState<string>("companies");
  const [agendaMode, setAgendaMode] = useState<"pdf" | "interactive">("pdf");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-neutral-900 font-sans antialiased overflow-x-hidden pt-20 sm:pt-24">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6">
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

              <Link
                href="/past-editions"
                className="text-[11px] sm:text-xs font-bold text-[#C6112F] hover:underline flex items-center gap-1 group ml-auto sm:ml-0"
              >
                <span className="transform group-hover:-translate-x-0.5 transition-transform">
                  &larr; {isFr ? "Retour aux éditions" : "Back to all editions"}
                </span>
              </Link>
            </div>

            {/* Mobile Pill Nav */}
            <div className="flex lg:hidden overflow-x-auto gap-2 p-4 bg-neutral-100 dark:bg-zinc-900 border-b border-neutral-200 dark:border-zinc-800 scrollbar-none">
              {sidebarTabs.map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${isSelected
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
                          className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-lg text-xs sm:text-sm font-bold transition-all text-left cursor-pointer ${isSelected
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
                {activeTab === "companies" ? (
                  <div>
                    <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block">
                      {isFr ? `ÉDITION ${viewingEdition}` : `${viewingEdition} EDITION`}
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight mb-3">
                      {isFr ? "Entreprises participantes" : "Participating Companies"}
                    </h1>
                    <p className="text-neutral-600 dark:text-zinc-300 text-sm sm:text-base font-medium leading-relaxed max-w-[700px] mb-8">
                      {isFr
                        ? "Connectez-vous avec les principales sociétés minières, investisseurs, fournisseurs de technologies et partenaires façonnant l'avenir de l'industrie minière."
                        : "Connect with leading mining companies, investors, technology providers, and service partners driving the future of the mining industry."}
                    </p>
                    <CompaniesView initialYear={viewingEdition} />
                  </div>
                ) : activeTab === "brochures" ? (
                  <div>
                    <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block">
                      {isFr ? `ÉDITION ${viewingEdition}` : `${viewingEdition} EDITION`}
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight mb-3">
                      {isFr ? `Brochure de l'événement ${viewingEdition}` : `Event Brochure ${viewingEdition}`}
                    </h1>
                    <p className="text-neutral-600 dark:text-zinc-300 text-sm sm:text-base font-medium leading-relaxed max-w-[720px] mb-8">
                      {isFr
                        ? "Explorez la brochure complète pour découvrir les détails de l'événement, les thèmes clés, les conférenciers vedettes, l'ordre du jour et les opportunités de commandite."
                        : "Explore the complete brochure to discover event details, key themes, speaker highlights, agenda overview, and sponsorship opportunities."}
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
                          <b className="block text-neutral-900 font-extrabold text-sm sm:text-base">
                            {isFr ? `19 – 21 juin ${viewingEdition}` : `June 19 – 21, ${viewingEdition}`}
                          </b>
                          <span className="text-neutral-500 text-xs">{isFr ? "Événement de 3 jours" : "3 Days Event"}</span>
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
                          <b className="block text-neutral-900 font-extrabold text-sm sm:text-base">Centre des congrès de Québec</b>
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
                          <b className="block text-neutral-900 font-extrabold text-sm sm:text-base">PDF, 9.6 MB</b>
                          <span className="text-neutral-500 text-xs">{isFr ? "Fichier de brochure officiel" : "Official Brochure File"}</span>
                        </div>
                      </div>
                    </div>

                    <AgendaPdfViewer
                      pdfUrl={`/documents/${viewingEdition}-brochure.pdf`}
                      year={viewingEdition}
                      fileName={`${viewingEdition}-brochure.pdf`}
                      title={isFr ? `Brochure de l'événement ${viewingEdition}` : `Event Brochure ${viewingEdition}`}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 bg-white border border-neutral-200/90 rounded-2xl p-6 shadow-xs mt-8">
                      <div className="p-4 text-center">
                        <div className="w-12 h-12 rounded-xl bg-[#FCDDE1] flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h4 className="text-sm font-extrabold text-neutral-900 mb-1">{isFr ? "Ordre du jour complet" : "Full Agenda"}</h4>
                        <p className="text-xs text-neutral-500 font-medium leading-relaxed">{isFr ? "Explorez les sessions, les tables rondes et les discours principaux." : "Explore sessions, panels and keynote discussions."}</p>
                      </div>

                      <div className="p-4 text-center">
                        <div className="w-12 h-12 rounded-xl bg-[#FCDDE1] flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="8" r="3.4" />
                            <path d="M5.5 20c.8-3.6 3.3-5.5 6.5-5.5s5.7 1.9 6.5 5.5" />
                          </svg>
                        </div>
                        <h4 className="text-sm font-extrabold text-neutral-900 mb-1">{isFr ? "Conférenciers experts" : "Expert Speakers"}</h4>
                        <p className="text-xs text-neutral-500 font-medium leading-relaxed">{isFr ? "Découvrez des leaders mondiaux et des experts du secteur." : "Discover global leaders and industry experts."}</p>
                      </div>

                      <div className="p-4 text-center">
                        <div className="w-12 h-12 rounded-xl bg-[#FCDDE1] flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="8.5" />
                            <circle cx="12" cy="12" r="4.8" />
                            <circle cx="12" cy="12" r="1.4" fill="currentColor" />
                          </svg>
                        </div>
                        <h4 className="text-sm font-extrabold text-neutral-900 mb-1">{isFr ? "Opportunités d'investissement" : "Investment Opportunities"}</h4>
                        <p className="text-xs text-neutral-500 font-medium leading-relaxed">{isFr ? "Connectez-vous à des projets et des opportunités à forte croissance." : "Connect with projects and high-growth opportunities."}</p>
                      </div>

                      <div className="p-4 text-center">
                        <div className="w-12 h-12 rounded-xl bg-[#FCDDE1] flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <h4 className="text-sm font-extrabold text-neutral-900 mb-1">{isFr ? "Réseautage" : "Networking"}</h4>
                        <p className="text-xs text-neutral-500 font-medium leading-relaxed">{isFr ? "Établissez des relations précieuses avec les principaux décideurs." : "Build valuable relationships with key decision makers."}</p>
                      </div>

                      <div className="p-4 text-center">
                        <div className="w-12 h-12 rounded-xl bg-[#FCDDE1] flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                        </div>
                        <h4 className="text-sm font-extrabold text-neutral-900 mb-1">{isFr ? "Commanditaires & Partenaires" : "Sponsors & Partners"}</h4>
                        <p className="text-xs text-neutral-500 font-medium leading-relaxed">{isFr ? "Rencontrez nos commanditaires et partenaires de services." : "Meet our sponsors and service partners."}</p>
                      </div>
                    </div>
                  </div>
                ) : activeTab === "agenda" ? (
                  <div className="w-full">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block">
                          {isFr ? `ÉDITION ${viewingEdition}` : `${viewingEdition} EDITION`}
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-2">
                          {isFr ? `Ordre du jour ${viewingEdition}` : `Event Agenda ${viewingEdition}`}
                        </h1>
                      </div>
                      <div className="flex items-center bg-neutral-100 p-1.5 rounded-xl border border-neutral-200 gap-1">
                        <button
                          onClick={() => setAgendaMode("pdf")}
                          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${agendaMode === "pdf"
                              ? "bg-[#0f1117] text-white shadow-sm"
                              : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60"
                            }`}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <span>{isFr ? "Visionneuse PDF" : "PDF Viewer"}</span>
                        </button>
                        <button
                          onClick={() => setAgendaMode("interactive")}
                          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${agendaMode === "interactive"
                              ? "bg-[#0f1117] text-white shadow-sm"
                              : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60"
                            }`}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{isFr ? "Programme interactif" : "Interactive Schedule"}</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-neutral-600 text-sm sm:text-base font-medium leading-relaxed max-w-[720px] mb-8">
                      {isFr
                        ? "Trois jours de conférences, présentations d'entreprises, tables rondes et réseautage réunissant producteurs, développeurs et explorateurs de toute l'industrie."
                        : "Three days of keynotes, corporate presentations, panels, and networking bringing together producers, developers, and explorers from across the industry."}
                    </p>

                    {agendaMode === "pdf" ? (
                      <AgendaPdfViewer year={viewingEdition} pdfUrl={`/documents/${viewingEdition}-agenda.pdf`} />
                    ) : (
                      <AgendaView year={viewingEdition} />
                    )}
                  </div>
                ) : activeTab === "speakers" ? (
                  <div className="w-full">
                    <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block">
                      {isFr ? `ÉDITION ${viewingEdition}` : `${viewingEdition} EDITION`}
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-3">
                      {isFr ? `Conférenciers de l'événement ${viewingEdition}` : `Event Speakers ${viewingEdition}`}
                    </h1>
                    <p className="text-neutral-600 text-sm sm:text-base font-medium leading-relaxed max-w-[720px] mb-8">
                      {isFr
                        ? "Ministres, ambassadeurs, PDG, investisseurs et analystes montant sur scène durant trois jours à Québec."
                        : "Ministers, ambassadors, CEOs, investors and analysts taking the stage across three days in Quebec City."}
                    </p>
                    <SpeakersView year={viewingEdition} />
                  </div>
                ) : activeTab === "sponsors" ? (
                  <div className="w-full">
                    <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block">
                      {isFr ? `ÉDITION ${viewingEdition}` : `${viewingEdition} EDITION`}
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-3">
                      {isFr ? `Commanditaires de l'événement ${viewingEdition}` : `Event Sponsors ${viewingEdition}`}
                    </h1>
                    <p className="text-neutral-600 text-sm sm:text-base font-medium leading-relaxed max-w-[720px] mb-8">
                      {isFr
                        ? "Nous remercions nos commanditaires et partenaires pour leur généreux soutien qui fait du Mining Investment Event un succès mondial."
                        : "We thank our sponsors and partners for their generous support in making the Mining Investment Event a global success."}
                    </p>
                    <SponsorsView year={viewingEdition} />
                  </div>
                ) : (
                  <div>
                    <span className="text-[#C6112F] text-[11px] sm:text-xs font-extrabold tracking-[0.3em] uppercase mb-2 block">
                      {isFr ? "L ' É V É N E M E N T  D ' I N V E S T I S S E M E N T  M I N I E R" : "T H E &nbsp; M I N I N G &nbsp; I N V E S T M E N T &nbsp; E V E N T"}
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-2">
                      {isFr ? `Édition ${viewingEdition}` : `${viewingEdition} Edition`}
                    </h1>
                    <div className="w-20 h-[3px] bg-[#C6112F] rounded-full mb-4" />
                    <p className="text-neutral-600 text-sm sm:text-base font-medium leading-relaxed max-w-[700px] mb-6">
                      {isFr
                        ? "L'inauguration de l'événement d'investissement minier de premier plan renforçant les partenariats stratégiques du secteur."
                        : "The inaugural premier global mining investment event strengthening strategic industry partnerships."}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-xs sm:text-sm font-extrabold text-neutral-800 uppercase mb-8">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-neutral-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <rect x="3" y="4" width="18" height="16" rx="2" />
                          <path strokeLinecap="round" d="M16 2v4M8 2v4M3 9h18" />
                        </svg>
                        <span>{isFr ? `19 – 21 JUIN ${viewingEdition}` : `JUNE 19 – 21, ${viewingEdition}`}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-neutral-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{isFr ? "VILLE DE QUÉBEC, CANADA" : "QUÉBEC CITY, CANADA"}</span>
                      </div>
                    </div>

                    <div className="py-6 border-y border-neutral-200/90 grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 text-left">
                      <div className="flex flex-col items-start pr-4 sm:border-r sm:border-neutral-300/80">
                        <span className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-none mb-2">
                          150+
                        </span>
                        <span className="text-[#C6112F] text-[10px] sm:text-xs font-extrabold tracking-wider uppercase">
                          {isFr ? "ENTREPRISES PARTICIPANTES" : "PARTICIPATING COMPANIES"}
                        </span>
                      </div>

                      <div className="flex flex-col items-start pr-4 sm:border-r sm:border-neutral-300/80">
                        <span className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-none mb-2">
                          35+
                        </span>
                        <span className="text-[#C6112F] text-[10px] sm:text-xs font-extrabold tracking-wider uppercase">
                          {isFr ? "CONFÉRENCIERS" : "SPEAKERS"}
                        </span>
                      </div>

                      <div className="flex flex-col items-start pr-4 sm:border-r sm:border-neutral-300/80">
                        <span className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-none mb-2">
                          35+
                        </span>
                        <span className="text-[#C6112F] text-[10px] sm:text-xs font-extrabold tracking-wider uppercase">
                          {isFr ? "PAYS" : "COUNTRIES"}
                        </span>
                      </div>

                      <div className="flex flex-col items-start">
                        <span className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-none mb-2">
                          350+
                        </span>
                        <span className="text-[#C6112F] text-[10px] sm:text-xs font-extrabold tracking-wider uppercase">
                          {isFr ? "PARTICIPANTS" : "ATTENDEES"}
                        </span>
                      </div>
                    </div>

                    <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border-2 border-[#C6112F]/40 shadow-sm mb-8 bg-neutral-900">
                      <img
                        src="/news/banner_1.png"
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
                          ? "L'Événement d'Investissement Minier 2023 a marqué le lancement d'une plateforme mondiale essentielle pour bâtir de nouveaux partenariats et connecter le capital minier."
                          : "Mining Investment Event 2023 marked the launch of an essential global platform for building new partnerships and connecting mining capital."}
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
