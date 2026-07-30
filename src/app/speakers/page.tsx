"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import SpeakersView from "@/components/SpeakersView";
import { useLanguage } from "@/context/LanguageContext";

export default function SpeakersPage() {
  const { t, lang } = useLanguage();
  const isFr = lang === "FR";

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-white dark:bg-[#090d16] transition-colors duration-300">
        {/* ═══════ HERO ═══════ */}
        <section className="relative w-full bg-[#0f1117] overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] rounded-full z-20" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#C6112F]/20 via-transparent to-transparent" />
          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-40 pb-14 sm:pb-18 md:pb-20">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 mb-6">
              <a href="/" className="hover:text-white transition-colors">
                {t("nav-home", isFr ? "Accueil" : "Home")}
              </a>
              <span className="text-[#C6112F]">›</span>
              <span className="text-neutral-400">{isFr ? "Événement" : "Event"}</span>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white font-semibold">
                {isFr ? "Conférenciers 2027" : "Speakers 2027"}
              </span>
            </div>
            <span className="text-[#C6112F] text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase block mb-3">
              {isFr
                ? "CONFÉRENCIERS VEDETTES ET EXPERTS DE L'INDUSTRIE 2027"
                : "2027 KEYNOTE & INDUSTRY EXPERTS"}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none uppercase">
              {isFr ? "LES " : "THE "}
              <span className="text-[#C6112F]">
                {isFr ? "Conférenciers 2027" : "Speakers 2027"}
              </span>
            </h1>
            <div className="w-20 h-[3.5px] bg-[#C6112F] mt-6 rounded-full" />
          </div>
        </section>

        {/* ═══════ SPEAKERS LISTING ═══════ */}
        <section className="relative w-full py-14 sm:py-18 md:py-22">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
              {isFr ? "SCÈNE EN VEDETTE - ÉDITION 2027" : "2027 EDITION FEATURED STAGE"}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] dark:text-white tracking-tight mb-3">
              {isFr
                ? "Conférenciers & Présentations de l'Événement"
                : "Event Speakers & Keynotes"}
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-4" />
            <p className="text-neutral-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed max-w-[720px] mb-10">
              {isFr
                ? "Ministres, ambassadeurs, PDG, investisseurs et analystes de premier plan sur scène pendant quatre jours de sessions à fort impact à Québec."
                : "Ministers, ambassadors, CEOs, investors, and leading analysts taking the stage across four days of high-impact sessions in Quebec City."}
            </p>

            {/* Dynamic searchable and filterable speakers component */}
            <SpeakersView year={2027} />

            {/* Speaking Slot Inquiries CTA Box */}
            <div className="mt-16 bg-[#0f1117] text-white rounded-3xl p-8 sm:p-12 text-center border border-[#C6112F]/30 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C6112F]/15 via-transparent to-transparent pointer-events-none" />
              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-3 block">
                  {isFr ? "REJOIGNEZ LA SCÈNE" : "JOIN THE STAGE"}
                </span>
                <h4 className="text-2xl sm:text-3xl font-black mb-3 text-white tracking-tight">
                  {isFr
                    ? "Intéressé par des opportunités de présentation ?"
                    : "Interested in Speaking Opportunities?"}
                </h4>
                <p className="text-neutral-300 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed font-medium">
                  {isFr
                    ? "Les créneaux de présentation à L'Événement offrent une visibilité inégalée auprès des investisseurs accrédités, des dirigeants d'entreprises et des cadres miniers mondiaux."
                    : "Speaking slots at THE Event provide unrivalled visibility before accredited investors, corporate leaders, and global mining executives."}
                </p>
                <a
                  href="mailto:jchoi@irinc.ca?subject=Speaking Inquiry"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#C6112F] text-white text-xs font-extrabold tracking-[0.15em] uppercase hover:bg-[#a50e27] transition-all duration-300 shadow-xl shadow-[#C6112F]/25 hover:scale-105"
                >
                  <span>
                    {isFr
                      ? "Se Renseigner sur les Créneaux"
                      : "Inquire About Speaking Slots"}
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}
