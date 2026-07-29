"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

import GolfPartnersSection from "@/components/GolfPartnersSection";

export default function GolfPage() {
  const { t, lang } = useLanguage();

  const golfSchedule = [
    {
      time: "06:45 AM – 07:45 AM",
      title: lang === "FR" ? "Enregistrement & Petit-Déjeuner des Joueurs" : "Player Registration & Networking Breakfast",
      desc: lang === "FR"
        ? "Accueil des participants, remise des coffrets cadeaux et échauffement sur le champ de pratique."
        : "Welcome desk check-in, distribution of premium player gift packs, and warm-ups on the driving range.",
    },
    {
      time: "08:00 AM",
      title: lang === "FR" ? "Départ Simultané (Shotgun Start)" : "Shotgun Start – Tournament Launch",
      desc: lang === "FR"
        ? "Coup d'envoi officiel du Tournoi Doré sur le parcours de championnat de 18 trous."
        : "Official tournament tee-off across the 18-hole championship course at Golf Club La Tempête.",
    },
    {
      time: "12:30 PM – 01:30 PM",
      title: lang === "FR" ? "Dîner sur le Parcours & Concours d'Hablité" : "On-Course Lunch & Hole Contests",
      desc: lang === "FR"
        ? "Stations gourmandes sur le parcours, concours du coup le plus long et du coup le plus près de la coupe."
        : "Gourmet food stations along the fairway, longest drive contest, and closest-to-the-pin challenges.",
    },
    {
      time: "02:30 PM – 03:30 PM",
      title: lang === "FR" ? "Cocktail de Réception & Remise des Prix" : "Cocktail Reception & Awards Ceremony",
      desc: lang === "FR"
        ? "Célébration des gagnants, réseautage d'affaires et mot de clôture des partenaires."
        : "Celebration of tournament winners, high-level executive networking, and partner closing remarks.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-white dark:bg-[#0e1626] transition-colors duration-300">
        {/* ═══════ HERO SECTION (EXACT MATCHING MOCKUP) ═══════ */}
        <section className="relative w-full min-h-[540px] sm:min-h-[600px] md:min-h-[660px] flex items-center justify-start overflow-hidden bg-neutral-900 pt-24 sm:pt-28">
          {/* Background Image */}
          <img
            src="/golf_hero_bg.png"
            alt="Iconic Golf Day - Le Tournoi Doré"
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
            fetchPriority="high"
          />

          {/* Dark Gradient Overlays for High Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />

          {/* Main Hero Content Box */}
          <div className="relative z-20 max-w-[1240px] mx-auto w-full px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 flex flex-col justify-between h-full">
            <div className="max-w-2xl">
              {/* Dual Language Heading matching mockup */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-[1.1] drop-shadow-md">
                ICONIC GOLF DAY<br />
                LE TOURNOI DORÉ
              </h1>

              {/* Red Accent Line matching mockup */}
              <div className="w-24 sm:w-28 h-[3.5px] bg-[#C6112F] my-5 sm:my-6 rounded-full shadow-xs" />

              {/* Subtitle matching mockup */}
              <p className="text-xs sm:text-sm font-bold tracking-widest text-neutral-300 uppercase mb-7 sm:mb-9 drop-shadow-sm">
                MERCI À NOS PARTENAIRES THANK YOU TO OUR PARTNERS
              </p>

              {/* Download Button matching mockup */}
              <a
                href="/documents/golf-brochure.pdf"
                download
                className="inline-flex items-center gap-2.5 bg-[#C6112F] hover:bg-[#a80d26] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-md uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-red-900/30 hover:scale-[1.02] cursor-pointer mb-10 sm:mb-14"
              >
                <span>{t("golf-download-btn", "DOWNLOAD NOW")}</span>
                <div className="w-5 h-5 rounded-full border border-white/80 flex items-center justify-center text-white shrink-0">
                  <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </a>

              {/* Bottom Event Date & Location Info Row matching mockup */}
              <div className="flex items-center gap-6 text-white pt-2 border-t border-white/10 max-w-md">
                {/* Calendar Item */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <path strokeLinecap="round" d="M16 2v4M8 2v4M3 9h18" />
                      <circle cx="8" cy="14" r="1" fill="currentColor" />
                      <circle cx="12" cy="14" r="1" fill="currentColor" />
                      <circle cx="16" cy="14" r="1" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-xs sm:text-sm font-semibold leading-snug">
                    <span className="text-neutral-300">Monday</span>
                    <span className="font-bold text-white">June 1, 2026</span>
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="h-9 w-[1px] bg-white/30" />

                {/* Location Pin Item */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-xs sm:text-sm font-semibold leading-snug">
                    <span className="text-neutral-300">Lundi 1er</span>
                    <span className="font-bold text-white">Juin 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ PARTNERS / SPONSORS SECTION (EXACT MATCHING MOCKUP) ═══════ */}
        <GolfPartnersSection />



        {/* ═══════ SCHEDULE TIMELINE ═══════ */}
        <section className="relative w-full py-16 sm:py-20 bg-[#f6f8fb] dark:bg-[#090d16] border-y border-neutral-200/80 dark:border-slate-800/80 transition-colors duration-300">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
                {lang === "FR" ? "PROGRAMME DE LA JOURNÉE" : "DAY PROGRAM SCHEDULE"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1a1f2c] dark:text-white mb-3">
                {lang === "FR" ? "Horaire du Tournoi" : "Tournament Schedule"}
              </h2>
              <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {golfSchedule.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#131b2e] border border-neutral-200 dark:border-slate-800/80 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block bg-[#C6112F]/10 dark:bg-[#C6112F]/20 text-[#C6112F] font-black text-xs px-3 py-1 rounded-full mb-4">
                      {item.time}
                    </span>
                    <h3 className="text-lg font-bold text-[#1a1f2c] dark:text-white mb-2.5 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-slate-400 text-xs leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ GET IN TOUCH & FOOTER ═══════ */}
        <GetInTouchCTA />
      </main>
      <Footer />
    </>
  );
}
