"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

interface AnnualDonationItem {
  year: string;
  title: string;
  desc: string;
  descFr: string;
  category: string;
  categoryFr: string;
  impactHighlight: string;
  impactHighlightFr: string;
  amount?: string;
  location: string;
  image: string;
  link?: string;
  linkText?: string;
  linkTextFr?: string;
  selectedBy?: string;
}

export default function SheCoPage() {
  const { t, lang } = useLanguage();
  const isFr = lang === "FR";
  const [selectedYear, setSelectedYear] = useState<string>("ALL");

  const annualDonations: AnnualDonationItem[] = [
    {
      year: "2026",
      title: "Moisson Rive-Sud",
      category: "Food Security & Hunger Relief",
      categoryFr: "Sécurité Alimentaire & Aide Humanitaire",
      impactHighlight: "C$20,000 Total Donation Raised",
      impactHighlightFr: "Don Total de 20 000 $ CAD Récolté",
      amount: "C$20,000",
      location: "Longueuil, QC",
      selectedBy: "Mathieu Savard (President & CEO, Vior Gold Corporation)",
      image: "/MINING INVESTMENT EVENT 2026_DAY 1_MAIN EVENT-41.jpg",
      desc: "Moisson Rive-Sud is the primary non-profit food bank serving Longueuil, Quebec, and nearby areas, dedicated to reducing food insecurity among local residents.",
      descFr: "Moisson Rive-Sud est la principale banque alimentaire à but non lucratif desservant Longueuil et ses environs, visant à réduire l'insécurité alimentaire.",
    },
    {
      year: "2025",
      title: "Quesnel Education & Employment Society",
      category: "Indigenous Education & Employment",
      categoryFr: "Éducation Autochtone & Emploi",
      impactHighlight: "Lhoosk'uz Dene, Lhtako Dene & Nazko Nations",
      impactHighlightFr: "Nations Lhoosk'uz Dene, Lhtako Dene & Nazko",
      location: "Quesnel, BC",
      selectedBy: "Sean Roosen (CEO, Osisko Development)",
      image: "/student/STUDENTS/MINING INVESTMENT EVENT 2026_DAY 1_STUDENTS-17.jpg",
      link: "https://dakelheed.wordpress.com/",
      linkText: "Visit Society Website ↗",
      linkTextFr: "Visiter le Site Web ↗",
      desc: "Established by the Lhoosk’uz Dene Nation, Lhtako Dene Nation, and Nazko Nation to support education, skills training, and employment for community members.",
      descFr: "Créée par la Nation Lhoosk’uz Dene, la Nation Lhtako Dene et la Nation Nazko pour soutenir l'éducation, la formation et l'emploi.",
    },
    {
      year: "2024",
      title: "THE Drum Circle",
      category: "Youth Emotional Healing",
      categoryFr: "Guérison Émotionnelle de la Jeunesse",
      impactHighlight: "10 First Nations Drum Kits & Facilitator",
      impactHighlightFr: "10 Ensembles de Tambours & Animateur",
      location: "St. John's, NL",
      image: "/sheco-logo.png",
      desc: "Funded 10 First Nations drum kits and a certified facilitator at Bishop Field Elementary for Grades 4-6 students coping with anxiety, trauma, or grief.",
      descFr: "Financement de 10 ensembles de tambours des Premières Nations et d'un animateur à l'école Bishop Field pour soutenir la guérison émotionnelle des jeunes.",
    },
    {
      year: "2023",
      title: "University of British Columbia (UBC)",
      category: "Women's Educational Fellowships",
      categoryFr: "Bourses d'Études pour les Femmes",
      impactHighlight: "3 Full Fellowships for Afghani Women",
      impactHighlightFr: "3 Bourses Complètes pour Jeunes Femmes Afghanese",
      location: "Vancouver, BC",
      image: "/sheco1.webp",
      desc: "Special university grant assisting 3 young Afghani women with full tuition and education programs, enabling higher learning and leadership empowerment.",
      descFr: "Bourse universitaire spéciale offrant la gratuité scolaire à 3 jeunes femmes afghanes pour leur permettre de poursuivre des études supérieures.",
    },
  ];

  const filteredDonations =
    selectedYear === "ALL"
      ? annualDonations
      : annualDonations.filter((item) => item.year === selectedYear);

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-[#fcfcfd] dark:bg-[#0c0d12] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
        
        {/* ════════════════ HERO HEADER SECTION ════════════════ */}
        <section className="relative w-full bg-[#0b0f19] overflow-hidden text-white pt-32 sm:pt-36 md:pt-40 pb-20 sm:pb-24 border-b border-neutral-800">
          {/* Subtle radial dot pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />
          {/* Glowing Ambient Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[#C6112F]/20 blur-[150px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 mb-8">
              <a href="/" className="hover:text-white transition-colors">
                {t("nav-home", "Home")}
              </a>
              <span className="text-[#C6112F]">›</span>
              <span className="text-neutral-400">{t("sheco-breadcrumb-init", "Initiatives")}</span>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white font-semibold">
                {t("sheco-breadcrumb-title", "SHE-Co Initiative")}
              </span>
            </div>

            {/* 2-Column Hero Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Headings & Subtitles */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#C6112F]/15 border border-[#C6112F]/30 text-[#ff4d6d] text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#C6112F] animate-pulse" />
                  <span>
                    {isFr ? "L'INITIATIVE CARITATIVE DE L'ÉVÉNEMENT" : "THE EVENT’S CHARITABLE INITIATIVE"}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-4">
                  SHE-Co <span className="text-[#C6112F]">Initiative</span>
                </h1>

                <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#C6112F] mb-4 tracking-tight">
                  &ldquo;{isFr ? "Habiliter les communautés" : "Empowering communities"}&rdquo;
                </p>

                <p className="text-neutral-300 text-base sm:text-lg font-semibold leading-relaxed max-w-2xl">
                  {isFr
                    ? "Soutenir des projets d'éducation, de santé et de bien-être qui en valent la peine"
                    : "Supporting Worthy Educational, Health and Wellness Projects"}
                </p>
              </div>

              {/* Right Column: She-Co Logo Card */}
              <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[420px] bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 p-8 sm:p-10 rounded-3xl shadow-2xl shadow-[#C6112F]/25 flex flex-col items-center justify-center text-center group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(198,17,47,0.2),transparent_70%)] rounded-3xl pointer-events-none" />
                  
                  <div className="relative z-10 w-full max-w-[300px] p-6 bg-white dark:bg-slate-900 rounded-2xl border border-white/30 dark:border-slate-700 shadow-xl group-hover:scale-105 transition-transform duration-500">
                    <img
                      src="/sheco1.webp"
                      alt="SHE-Co Official Logo"
                      className="w-full h-auto object-contain select-none mx-auto"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ════════════════ SHE-CO OVERVIEW BLURB BANNER ════════════════ */}
        <section className="relative w-full py-12 sm:py-16 bg-white dark:bg-[#121824] border-b border-neutral-200/80 dark:border-slate-800">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="bg-gradient-to-r from-neutral-900 via-[#161c2b] to-[#0f1420] text-white p-8 sm:p-12 rounded-3xl border border-neutral-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6112F]/10 blur-[100px] pointer-events-none rounded-full" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="w-16 h-16 rounded-2xl bg-[#C6112F] text-white font-black text-2xl flex items-center justify-center shrink-0 shadow-lg shadow-[#C6112F]/30">
                  ❤️
                </div>
                <div className="space-y-3 text-center md:text-left">
                  <span className="text-[#ff4d6d] text-xs font-black tracking-[0.25em] uppercase block">
                    {isFr ? "À PROPOS DE L'INITIATIVE SHE-CO" : "WHAT SHE-CO IS ABOUT"}
                  </span>
                  <p className="text-base sm:text-xl font-medium leading-relaxed text-neutral-200">
                    {isFr
                      ? "« Chaque année, une portion des bénéfices de L'Événement est versée à des groupes à but non lucratif et caritatifs qualifiés. Les dons seront axés sur le soutien aux individus, groupes, institutions et/ou projets communautaires apportant une contribution positive dans la vie des gens. »"
                      : "“Each year a portion of THE Event proceeds are donated to qualified non-profit and charitable groups. Donations will be focused on support to individuals, groups, institutions and/or community projects making a positive difference in the lives of people.”"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════ RECENT CHARITY DETAILS (2026 - MOISSON RIVE-SUD) ════════════════ */}
        <section className="relative w-full py-16 sm:py-20 md:py-24 bg-[#f8fafc] dark:bg-[#0c0f17]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C6112F]/10 border border-[#C6112F]/20 text-[#C6112F] text-xs font-black tracking-widest uppercase mb-3">
                <span>{isFr ? "DERNÈRE INITIATIVE EN DATE" : "MOST RECENT INITIATIVE RECIPIENT"}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a1f2c] dark:text-white tracking-tight mb-4">
                2026 She-Co Initiative Recipient – <span className="text-[#C6112F]">Moisson Rive-Sud</span>
              </h2>
              <div className="w-20 h-[3.5px] bg-[#C6112F] rounded-full mx-auto" />
            </div>

            {/* Main Content 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              
              {/* Left Column: Cheque Presentation Photo & Summary Card */}
              <div className="lg:col-span-5 relative">
                <div className="sticky top-28 bg-white dark:bg-[#151c2c] border border-neutral-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl group">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                    <img
                      src="/MINING INVESTMENT EVENT 2026_DAY 1_MAIN EVENT-41.jpg"
                      alt="2026 SHE-Co Presentation Cheque to Moisson Rive-Sud"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    
                    {/* Badge Overlay */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1.5 rounded-xl bg-[#C6112F] text-white font-black text-xs uppercase tracking-wider shadow-lg">
                        2026 CHEQUE PRESENTATION
                      </span>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <span className="text-xs font-bold text-neutral-300 block mb-1">
                        {isFr ? "Banque Alimentaire Longueuil, Québec" : "Food Bank – Longueuil, Quebec"}
                      </span>
                      <h4 className="text-lg font-black text-white">
                        Moisson Rive-Sud Presentation
                      </h4>
                    </div>
                  </div>

                  {/* Financial Matching Breakdown Box */}
                  <div className="p-6 sm:p-8 bg-white dark:bg-[#151c2c]">
                    <h4 className="text-xs font-black tracking-[0.2em] text-[#C6112F] uppercase mb-4">
                      {isFr ? "VENTILATION DU DON DE 20 000 $" : "C$20,000 DONATION MATCHING BREAKDOWN"}
                    </h4>
                    
                    <div className="space-y-3 text-xs sm:text-sm font-semibold text-neutral-700 dark:text-slate-300">
                      <div className="flex justify-between items-center py-1.5 border-b border-neutral-100 dark:border-slate-800">
                        <span>THE She-Co Initiative Donation</span>
                        <span className="font-extrabold text-[#C6112F]">C$5,000</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-neutral-100 dark:border-slate-800">
                        <span>Matched by Vior Gold Corp.</span>
                        <span className="font-extrabold text-[#C6112F]">C$5,000</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-neutral-100 dark:border-slate-800">
                        <span>Matched by CEO Mathieu Savard</span>
                        <span className="font-extrabold text-[#C6112F]">C$5,000</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-neutral-100 dark:border-slate-800">
                        <span>Matched by Sean Roosen (CEO, Osisko)</span>
                        <span className="font-extrabold text-[#C6112F]">C$5,000</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 text-sm sm:text-base font-black text-neutral-900 dark:text-white">
                        <span>Total Donation to Moisson Rive-Sud</span>
                        <span className="text-[#C6112F]">C$20,000</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Full Recipient Story */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white dark:bg-[#151c2c] border border-neutral-200/80 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-lg space-y-6">
                  
                  <p className="text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-slate-200 font-medium">
                    {isFr
                      ? "L'initiative She-Co de L'Événement est notre moyen de continuer à faire une différence positive dans diverses communautés, en reconnaissant que les sociétés minières opèrent partout et que le secteur minier touche presque tous les aspects de la vie."
                      : "THE Event’s She-Co Initiative is our way to continue making a positive difference in various communities, recognizing that mining companies operate everywhere and that mining touches almost every aspect of life in some way."}
                  </p>

                  <p className="text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-slate-200 font-medium">
                    {isFr
                      ? "Chaque année, un nouveau PDG est sélectionné pour choisir une cause, un organisme de bienfaisance ou un programme communautaire significatif, où les bénéfices de L'Événement et d'autres dons peuvent faire une réelle différence dans le monde réel."
                      : "Each year, a new CEO is selected to choose a meaningful cause, charity, or community program, where proceeds from THE Event and other donations can make real-world differences."}
                  </p>

                  <div className="p-6 rounded-2xl bg-[#C6112F]/5 border-l-4 border-[#C6112F]">
                    <p className="text-base sm:text-lg leading-relaxed text-neutral-800 dark:text-slate-100 font-medium">
                      {isFr
                        ? "Cette année, Mathieu Savard, président et chef de la direction de Vior Gold Corporation, a choisi Moisson Rive-Sud, une banque alimentaire à but non lucratif desservant Longueuil, Québec, et les régions avoisinantes. L'objectif principal de la banque alimentaire est de réduire l'insécurité alimentaire parmi les résidents locaux."
                        : "This year, Mathieu Savard, President and CEO of Vior Gold Corporation, selected Moisson Rive-Sud, a non-profit food bank serving Longueil, Quebec, and nearby areas. The food bank's primary focus is to reduce food insecurity among the local residents."}
                    </p>
                  </div>

                  <p className="text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-slate-200 font-medium">
                    {isFr
                      ? "Nous sommes fiers d'annoncer que l'initiative SHE-Co a fait un don de 5 000 $ CAD à Moisson Rive-Sud. Ce montant a été égalé par Vior Gold Corporation et à nouveau égalé personnellement par le PDG Mathieu Savard ainsi que par Sean Roosen, PDG d'Osisko Development (qui a également sélectionné le récipiendaire SHE-Co 2025). En conséquence, le don total versé à Moisson Rive-Sud a atteint 20 000 $ CAD."
                      : "We are proud to share that THE She-Co Initiative donated C$5,000 to Moisson Rive-Sud. This amount was matched by Vior Gold Corporation and again was matched personally by CEO Mathieu Savard and by Sean Roosen, CEO of Osisko Development, who also previously selected the 2025 SHE-Co recipient. As a result, the total donation to Moisson Rive-Sud reached C$20,000."}
                  </p>

                  {/* Future CEO Selection Note */}
                  <div className="p-6 rounded-2xl bg-[#121826] text-white border border-neutral-800 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#C6112F] text-white flex items-center justify-center font-black shrink-0">
                      ★
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-[#ff4d6d] uppercase mb-1">
                        {isFr ? "PROCHAIN SÉLECTIONNEUR DU PDG SHE-CO" : "FUTURE SHE-CO LEADERSHIP SELECTION"}
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium">
                        {isFr
                          ? "Mathieu Savard a également généreusement accepté d'être responsable de la sélection du PDG SHE-Co de l'année prochaine, qui sera ensuite responsable de choisir le récipiendaire de l'initiative SHE-Co 2028."
                          : "Mathieu Savard has also generously agreed to be responsible for selecting next year’s SHE-Co CEO, who will then be responsible for choosing the recipient of the 2028 SHE-Co Initiative."}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ════════════════ ANNUAL DONATIONS & HISTORICAL IMPACT ════════════════ */}
        <section className="relative w-full py-16 sm:py-20 md:py-24 bg-white dark:bg-[#121824] border-t border-neutral-200/60 dark:border-slate-800">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            
            {/* Section Header & Year Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
              <div>
                <span className="text-[#C6112F] text-xs font-black tracking-[0.25em] uppercase mb-2 block">
                  {isFr ? "COMMUNAUTÉS ET HISTORIQUE DES DONS" : "COMMUNITY IMPACT & HISTORICAL RECIPIENTS"}
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#1a1f2c] dark:text-white tracking-tight">
                  {isFr ? "Bénéficiaires de l'initiative SHE-Co" : "SHE-Co Initiative Annual Recipients"}
                </h2>
              </div>

              {/* Year Filter Buttons */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                {["ALL", "2026", "2025", "2024", "2023"].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className={`px-4 py-2 rounded-xl text-xs font-black tracking-wider uppercase transition-all cursor-pointer ${
                      selectedYear === yr
                        ? "bg-[#C6112F] text-white shadow-md shadow-[#C6112F]/20 scale-105"
                        : "bg-neutral-100 dark:bg-[#182032] border border-neutral-200 dark:border-slate-800 text-neutral-700 dark:text-slate-300 hover:border-[#C6112F]"
                    }`}
                  >
                    {yr === "ALL" ? (isFr ? "Tous les ans" : "All Years") : yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of All Annual Recipients */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
              {filteredDonations.map((item) => (
                <div
                  key={item.year}
                  className="bg-neutral-50 dark:bg-[#182032] border border-neutral-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-2xl hover:border-[#C6112F]/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-4 py-1.5 rounded-xl bg-[#C6112F] text-white font-black text-base tracking-wider shadow-sm">
                        {item.year}
                      </span>
                      <span className="text-[11px] font-bold text-neutral-600 dark:text-slate-300 uppercase tracking-widest bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-neutral-200 dark:border-slate-700">
                        📍 {item.location}
                      </span>
                    </div>

                    <span className="text-[11px] font-black text-[#C6112F] uppercase tracking-wider block mb-1">
                      {isFr ? item.categoryFr : item.category}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#1a1f2c] dark:text-white mb-2 group-hover:text-[#C6112F] transition-colors">
                      {item.title}
                    </h3>

                    {item.selectedBy && (
                      <p className="text-xs font-semibold text-neutral-500 dark:text-slate-400 mb-3">
                        Selected by: <span className="text-neutral-800 dark:text-slate-200 font-bold">{item.selectedBy}</span>
                      </p>
                    )}

                    <div className="inline-block bg-[#C6112F]/10 text-[#C6112F] text-xs font-bold px-3 py-1 rounded-lg mb-4">
                      ✓ {isFr ? item.impactHighlightFr : item.impactHighlight}
                    </div>

                    <p className="text-neutral-600 dark:text-slate-300 text-sm leading-relaxed font-medium">
                      {isFr ? item.descFr : item.desc}
                    </p>
                  </div>

                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-6 text-xs font-extrabold tracking-wider uppercase text-[#C6112F] hover:underline"
                    >
                      <span>{isFr ? item.linkTextFr : item.linkText}</span>
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Detailed Feature Box: 2025 Quesnel Education and Employment Society */}
            <div className="bg-gradient-to-br from-white to-slate-50 dark:from-[#151c2c] dark:to-[#0f1422] border border-neutral-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#C6112F] bg-[#C6112F]/10 px-3.5 py-1 rounded-full">
                  {isFr ? "RÉCIPIENDAIRE 2025" : "2025 INITIATIVE RECIPIENT"}
                </span>
                <span className="text-xs font-bold text-neutral-500 dark:text-slate-400">Quesnel, BC</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-black text-[#1a1f2c] dark:text-white mb-4">
                Quesnel Education and Employment Society
              </h3>
              
              <p className="text-neutral-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium mb-6">
                {isFr ? (
                  <>
                    Grâce à l&apos;aide de Sean Roosen, l&apos;initiative SHE-Co de L&apos;Événement est heureuse de soutenir la Quesnel Education and Employment Society. Cet organisme a été créé par la Nation Lhoosk&apos;uz Dene, la Nation Lhtako Dene et la Nation Nazko pour soutenir l&apos;éducation, la formation et l&apos;emploi des membres de la communauté.
                  </>
                ) : (
                  <>
                    Through the help of Sean Roosen, THE Event’s SHE-Co initiative is pleased to support the Quesnel Education and Employment Society. This organization was established by the Lhoosk’uz Dene Nation, Lhtako Dene Nation and Nazko Nation to support education, training and employment of community members.
                  </>
                )}
              </p>
              
              <a
                href="https://dakelheed.wordpress.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-extrabold tracking-[0.15em] uppercase transition-all shadow-md hover:scale-105"
              >
                <span>{isFr ? "Visiter le Site Web ↗" : "Visit Society Website ↗"}</span>
              </a>
            </div>

            {/* Detailed Feature Box: 2024 THE Drum Circle */}
            <div className="bg-gradient-to-br from-white to-slate-50 dark:from-[#151c2c] dark:to-[#0f1422] border border-neutral-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#C6112F] bg-[#C6112F]/10 px-3.5 py-1 rounded-full">
                  {isFr ? "RÉCIPIENDAIRE 2024" : "2024 INITIATIVE RECIPIENT"}
                </span>
                <span className="text-xs font-bold text-neutral-500 dark:text-slate-400">St. John&apos;s, NL</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-black text-[#1a1f2c] dark:text-white mb-4">
                THE Drum Circle – Bishop Field Elementary
              </h3>
              
              <div className="space-y-4 text-neutral-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                {isFr ? (
                  <p>
                    Grâce à notre initiative SHE-Co, nous avons fièrement soutenu &laquo;THE Drum Circle&raquo; à l&apos;école élémentaire Bishop Field à St John&apos;s, Terre-Neuve. Ce programme s&apos;adresse aux élèves de la 4e à la 6e année ayant des besoins sociaux et émotionnels et nécessitant un soutien pour des questions telles que l&apos;anxiété, les traumatismes ou le deuil. Notre don a permis de financer l&apos;achat de 10 ensembles de tambours des Premières Nations et l&apos;embauche d&apos;un animateur pour intégrer les tambours, les chants et les mouvements rythmiques dans les cercles de partage des enfants.
                  </p>
                ) : (
                  <p>
                    Through our SHE-Co Initiative, we proudly supported &ldquo;THE Drum Circle&rdquo; at Bishop Field Elementary in St John’s, Newfoundland. This program is for students in Grades 4-6 with social and emotional needs who require support for issues such as anxiety, trauma, or grief. Our donation helped fund the purchase of 10 First Nations drum kits and a facilitator to incorporate drumming, chanting, and rhythmic movement into the children’s sharing circles.
                  </p>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* Call to Action & Footer */}
        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}
