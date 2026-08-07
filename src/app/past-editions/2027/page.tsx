"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import AgendaView from "@/components/AgendaView";
import AgendaPdfViewer from "@/components/AgendaPdfViewer";
import SpeakersView from "@/components/SpeakersView";
import SponsorsView, { SponsorItem } from "@/components/SponsorsView";
import CompaniesView from "@/components/CompaniesView";
import type { CompanyItem } from "@/components/companiesData";
import { useLanguage } from "@/context/LanguageContext";
import { fetchCompaniesByYear } from "@/lib/companiesApi";
import { fetchPdfAgendaByYear, AgendaApiItem } from "@/lib/agendaApi";
import {
  fetchEventByYear,
  mapEventAgendaToDays,
  formatEventDates,
  EventApiItem,
} from "@/lib/eventsApi";
import { fetchSponsorsByYear } from "@/lib/sponsorsApi";

const years = [2027, 2026, 2025, 2024, 2023];

export default function PastEdition2027Page() {
  const { lang } = useLanguage();
  const isFr = lang === "FR";
  const viewingEdition = 2027;

  // ═══════════════ API DATA STATES FOR 2027 ═══════════════
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [companiesLoading, setCompaniesLoading] = useState<boolean>(true);
  const [companiesError, setCompaniesError] = useState<string>("");

  const [agenda, setAgenda] = useState<AgendaApiItem | null>(null);
  const [agendaLoading, setAgendaLoading] = useState<boolean>(true);
  const [agendaError, setAgendaError] = useState<string>("");

  const [event, setEvent] = useState<EventApiItem | null>(null);
  const [eventLoading, setEventLoading] = useState<boolean>(true);

  const [sponsors, setSponsors] = useState<SponsorItem[]>([]);
  const [sponsorsLoading, setSponsorsLoading] = useState<boolean>(true);
  const [sponsorsError, setSponsorsError] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();

    fetchCompaniesByYear(viewingEdition, controller.signal)
      .then((items) => {
        setCompanies(items);
        setCompaniesLoading(false);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setCompaniesError(
          err instanceof Error ? err.message : "Unable to load companies"
        );
        setCompaniesLoading(false);
      });

    return () => controller.abort();
  }, [viewingEdition]);

  useEffect(() => {
    const controller = new AbortController();

    fetchPdfAgendaByYear(viewingEdition, controller.signal)
      .then((item) => {
        setAgenda(item);
        setAgendaLoading(false);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setAgendaError(
          err instanceof Error ? err.message : "Unable to load agenda"
        );
        setAgendaLoading(false);
      });

    return () => controller.abort();
  }, [viewingEdition]);

  useEffect(() => {
    const controller = new AbortController();

    fetchEventByYear(viewingEdition, controller.signal)
      .then((item) => {
        setEvent(item);
        setEventLoading(false);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        console.error("Event schedule request failed:", err);
        setEventLoading(false);
      });

    return () => controller.abort();
  }, [viewingEdition]);

  useEffect(() => {
    const controller = new AbortController();

    fetchSponsorsByYear(viewingEdition, controller.signal)
      .then((items) => {
        setSponsors(items);
        setSponsorsLoading(false);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setSponsorsError(
          err instanceof Error ? err.message : "Unable to load sponsors"
        );
        setSponsorsLoading(false);
      });

    return () => controller.abort();
  }, [viewingEdition]);

  const eventDays = event ? mapEventAgendaToDays(event) : undefined;
  const eventDatesFormatted = event ? formatEventDates(event) : undefined;

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
      label: isFr ? "Médias & Partenaires" : "Media & Partners",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState<string>("companies");
  const [agendaMode, setAgendaMode] = useState<"pdf" | "interactive">("interactive");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab && ["overview", "companies", "brochures", "agenda", "speakers", "sponsors"].includes(tab)) {
        setActiveTab(tab);
      }
    }
  }, []);

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
                      href="https://online.flippingbook.com/view/213558062/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between hover:text-[#C6112F] dark:hover:text-[#C6112F] transition-colors pb-3 border-b border-[#F5C2C7] dark:border-zinc-800"
                    >
                      <span>{isFr ? "Rapport Snapshot ↗" : "THE Snapshot Report ↗"}</span>
                      <svg className="w-5 h-5 text-neutral-500 dark:text-zinc-400 hover:text-[#C6112F] stroke-current shrink-0 ml-2 transition-colors" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>

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
                    <CompaniesView
                      initialYear={viewingEdition}
                      apiCompanies={companies}
                      apiYear={viewingEdition}
                      apiLoading={companiesLoading}
                      apiError={companiesError}
                    />
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
                        ? `Consultez ou téléchargez la brochure officielle de L'Événement ${viewingEdition} pour tous les détails de la conférence, la liste des conférenciers et les opportunités de partenariat.`
                        : `View or download the official brochure for THE Event ${viewingEdition} covering full conference details, speaker lineups, and partnership opportunities.`}
                    </p>
                    <AgendaPdfViewer
                      pdfUrl={agenda?.pdfUrl || "/AGENDA_june_2026.pdf"}
                      year={viewingEdition}
                      title={agenda?.title || `Event Brochure ${viewingEdition}`}
                      remote={Boolean(agenda?.pdfUrl)}
                      hideHeader={true}
                    />
                  </div>
                ) : activeTab === "agenda" ? (
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block">
                          {isFr ? `ÉDITION ${viewingEdition}` : `${viewingEdition} EDITION`}
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight">
                          {isFr ? "Ordre du jour de la conférence" : "Conference Agenda"}
                        </h1>
                      </div>
                      <div className="flex items-center gap-2 p-1 bg-neutral-100 dark:bg-zinc-800 rounded-xl border border-neutral-200 dark:border-zinc-700 self-start sm:self-auto">
                        <button
                          onClick={() => setAgendaMode("pdf")}
                          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${agendaMode === "pdf"
                              ? "bg-[#C6112F] text-white shadow-xs"
                              : "text-neutral-600 dark:text-zinc-300 hover:text-neutral-900"
                            }`}
                        >
                          📄 PDF View
                        </button>
                        <button
                          onClick={() => setAgendaMode("interactive")}
                          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${agendaMode === "interactive"
                              ? "bg-[#C6112F] text-white shadow-xs"
                              : "text-neutral-600 dark:text-zinc-300 hover:text-neutral-900"
                            }`}
                        >
                          📅 Interactive Schedule
                        </button>
                      </div>
                    </div>

                    {agendaMode === "pdf" ? (
                      <AgendaPdfViewer
                        pdfUrl={agenda?.pdfUrl || "/AGENDA_june_2026.pdf"}
                        year={viewingEdition}
                        title={agenda?.title || `Conference Agenda ${viewingEdition}`}
                        remote={Boolean(agenda?.pdfUrl)}
                        hideHeader={true}
                      />
                    ) : (
                      <AgendaView
                        year={viewingEdition}
                        days={eventDays}
                        eventDates={eventDatesFormatted}
                      />
                    )}
                  </div>
                ) : activeTab === "speakers" ? (
                  <div>
                    <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block">
                      {isFr ? `ÉDITION ${viewingEdition}` : `${viewingEdition} EDITION`}
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight mb-3">
                      {isFr ? "Conférenciers vedettes" : "Featured Speakers"}
                    </h1>
                    <p className="text-neutral-600 dark:text-zinc-300 text-sm sm:text-base font-medium leading-relaxed max-w-[700px] mb-8">
                      {isFr
                        ? "Rencontrez les leaders de l'industrie, les experts exécutifs et les visionnaires qui ont partagé leurs perspectives lors de cette édition."
                        : "Meet the industry leaders, executive experts, and visionaries who shared insights at this edition."}
                    </p>
                    <SpeakersView year={viewingEdition} />
                  </div>
                ) : activeTab === "sponsors" ? (
                  <div>
                    <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block">
                      {isFr ? `ÉDITION ${viewingEdition}` : `${viewingEdition} EDITION`}
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight mb-3">
                      {isFr ? "Sponsors & Partenaires Médias" : "Sponsors & Media Partners"}
                    </h1>
                    <p className="text-neutral-600 dark:text-zinc-300 text-sm sm:text-base font-medium leading-relaxed max-w-[700px] mb-8">
                      {isFr
                        ? "Nous remercions nos généreux commanditaires et partenaires médias pour leur soutien précieux lors de cet événement."
                        : "We thank our generous sponsors and media partners for their essential support during this event."}
                    </p>
                    <SponsorsView
                      year={viewingEdition}
                      sponsors={sponsors}
                    />
                  </div>
                ) : (
                  <div>
                    {/* OVERVIEW TAB CONTENT */}
                    <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block">
                      {isFr ? "ÉDITION À VENIR" : "UPCOMING EDITION"}
                    </span>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] dark:text-white tracking-tight leading-tight mb-4">
                      {isFr ? "Édition à venir 2027" : "Upcoming Edition 2027"}
                    </h1>

                    <p className="text-neutral-600 dark:text-zinc-300 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-[760px] mb-8">
                      {isFr
                        ? "Le principal événement mondial d'investissement minier réunissant investisseurs, sociétés minières, gouvernements et leaders de l'industrie."
                        : "The premier global mining investment event bringing together investors, mining companies, governments and industry leaders."}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-xs sm:text-sm font-extrabold text-neutral-800 dark:text-zinc-200 uppercase mb-8">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-neutral-900 dark:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <rect x="3" y="4" width="18" height="16" rx="2" />
                          <path strokeLinecap="round" d="M16 2v4M8 2v4M3 9h18" />
                        </svg>
                        <span>{isFr ? `1 – 4 JUIN ${viewingEdition}` : `JUNE 1 – 4, ${viewingEdition}`}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-neutral-900 dark:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{isFr ? "VILLE DE QUÉBEC, CANADA" : "QUÉBEC CITY, CANADA"}</span>
                      </div>
                    </div>

                    {/* ════════════ 8-BUTTON QUICK NAVIGATION GRID ════════════ */}
                    <div className="my-8 p-6 bg-slate-50 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-2xl">
                      <h3 className="text-xs font-black tracking-[0.2em] text-[#C6112F] uppercase mb-4">
                        {isFr ? "NAVIGATION RAPIDE DE L'ÉVÉNEMENT 2027" : "2027 EVENT QUICK NAVIGATION"}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <button
                          onClick={() => setActiveTab("agenda")}
                          className="flex items-center justify-center gap-2.5 px-4 py-3 bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 hover:border-[#C6112F] rounded-xl text-xs font-extrabold uppercase tracking-wider text-neutral-800 dark:text-zinc-200 transition-all shadow-2xs hover:shadow-md cursor-pointer"
                        >
                          <span>📅</span>
                          <span>{isFr ? "VOIR L'ORDRE DU JOUR" : "VIEW AGENDA"}</span>
                        </button>
                        <a
                          href="/register"
                          className="flex items-center justify-center gap-2.5 px-4 py-3 bg-[#C6112F] hover:bg-[#a80e27] text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer"
                        >
                          <span className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center text-[10px]">➔</span>
                          <span>{isFr ? "S'INSCRIRE MAINTENANT" : "REGISTER NOW"}</span>
                        </a>
                        <button
                          onClick={() => setActiveTab("brochures")}
                          className="flex items-center justify-center gap-2.5 px-4 py-3 bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 hover:border-[#C6112F] rounded-xl text-xs font-extrabold uppercase tracking-wider text-neutral-800 dark:text-zinc-200 transition-all shadow-2xs hover:shadow-md cursor-pointer"
                        >
                          <span>📄</span>
                          <span>{isFr ? "BROCHURE" : "BROCHURE"}</span>
                        </button>
                        <a
                          href="/imw"
                          className="flex items-center justify-center gap-2.5 px-4 py-3 bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 hover:border-[#C6112F] rounded-xl text-xs font-extrabold uppercase tracking-wider text-neutral-800 dark:text-zinc-200 transition-all shadow-2xs hover:shadow-md cursor-pointer"
                        >
                          <span>🌐</span>
                          <span>{isFr ? "SEMAINE INT. DE LA MINE" : "INT. MINING WEEK"}</span>
                        </a>
                        <button
                          onClick={() => setActiveTab("companies")}
                          className="flex items-center justify-center gap-2.5 px-4 py-3 bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 hover:border-[#C6112F] rounded-xl text-xs font-extrabold uppercase tracking-wider text-neutral-800 dark:text-zinc-200 transition-all shadow-2xs hover:shadow-md cursor-pointer"
                        >
                          <span>🏢</span>
                          <span>{isFr ? "ENTREPRISES PARTICIPANTES" : "PARTICIPATING COMPANIES"}</span>
                        </button>
                        <button
                          onClick={() => setActiveTab("speakers")}
                          className="flex items-center justify-center gap-2.5 px-4 py-3 bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 hover:border-[#C6112F] rounded-xl text-xs font-extrabold uppercase tracking-wider text-neutral-800 dark:text-zinc-200 transition-all shadow-2xs hover:shadow-md cursor-pointer"
                        >
                          <span>🎤</span>
                          <span>{isFr ? "CONFÉRENCIERS" : "SPEAKERS"}</span>
                        </button>
                        <button
                          onClick={() => setActiveTab("sponsors")}
                          className="flex items-center justify-center gap-2.5 px-4 py-3 bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 hover:border-[#C6112F] rounded-xl text-xs font-extrabold uppercase tracking-wider text-neutral-800 dark:text-zinc-200 transition-all shadow-2xs hover:shadow-md cursor-pointer"
                        >
                          <span>👍</span>
                          <span>{isFr ? "MÉDIAS & PARTENAIRES" : "MEDIA & PARTNERS"}</span>
                        </button>
                        <a
                          href="/golf"
                          className="flex items-center justify-center gap-2.5 px-4 py-3 bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 hover:border-[#C6112F] rounded-xl text-xs font-extrabold uppercase tracking-wider text-neutral-800 dark:text-zinc-200 transition-all shadow-2xs hover:shadow-md cursor-pointer"
                        >
                          <span>⛳</span>
                          <span>{isFr ? "JOURNÉE DE GOLF" : "GOLF DAY"}</span>
                        </a>
                      </div>
                    </div>

                    <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border-2 border-[#C6112F]/40 shadow-sm mb-8 bg-neutral-900">
                      <img
                        src="/Mining%20Investment%20Post%203.avif"
                        alt="Québec City Event 2027"
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
                        className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-zinc-800 border border-neutral-300 dark:border-zinc-700 hover:bg-neutral-50 dark:hover:bg-zinc-700 text-[#C6112F] text-xs sm:text-sm font-extrabold tracking-wider uppercase rounded-lg shadow-sm hover:shadow-md transition-all text-center transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        {isFr ? "VOIR L'ORDRE DU JOUR" : "SEE AGENDA"}
                      </button>
                    </div>

                    <div className="mb-12">
                      <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#1a1f2c] dark:text-white leading-[1.2] mb-3">
                        {isFr ? "À propos de L'ÉVÉNEMENT 2027" : "About THE EVENT 2027"}
                      </h2>
                      <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-4" />
                      <p className="text-neutral-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6 font-medium max-w-[760px]">
                        {isFr
                          ? "L'Événement d'Investissement Minier 2027 est la plus importante conférence d'investissement minier au monde, où le capital mondial rencontre l'opportunité. Rejoignez des dirigeants miniers, investisseurs, analystes, représentants gouvernementaux et fournisseurs de services pour trois jours de transactions, de discussions enrichissantes et de réseautage stratégique."
                          : "Mining Investment Event 2027 is the world's leading mining investment conference, where global capital meets opportunity. Join top mining executives, investors, analysts, government representatives and service providers for three days of deal-making, insightful discussions, and strategic networking."}
                      </p>

                      <div className="space-y-3 text-xs sm:text-sm text-neutral-700 dark:text-zinc-300 font-medium max-w-[500px]">
                        {[
                          isFr ? "Découvrir de nouvelles opportunités d'investissement" : "Discover new investment opportunities",
                          isFr ? "Connecter avec des leaders miniers mondiaux" : "Connect with global mining leaders",
                          isFr ? "Obtenir des perspectives exclusives sur le marché et l'industrie" : "Gain exclusive market and industry insights",
                          isFr ? "Bâtir des partenariats précieux" : "Build valuable partnerships",
                        ].map((point, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-[#C6112F]/15 text-[#C6112F] font-bold text-xs flex items-center justify-center shrink-0">
                              ✓
                            </span>
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
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
