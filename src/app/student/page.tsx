"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import StudentApplicationForm from "@/components/StudentApplicationForm";

// 2026 Award Recipients Data
const mvpStudent = {
  name: "Raymond Bhushan",
  school: "University of Toronto",
  award: "Student MVP Award 2026",
};

const outstandingStudents = [
  { name: "Penda-Anna Diagne", school: "University of Ottawa" },
  { name: "Jean Thomas Parizeau-Breton", school: "Laval University" },
];

const trackWinners = [
  {
    id: "glencore",
    trackTitle: "GLENCORE Track Winners & Overall Winning Team",
    teamName: "Team 2",
    sponsorName: "GLENCORE",
    sponsorLogo: "/sponsors/2026/glencore.svg",
    isOverallWinner: true,
    members: [
      { name: "Gerarldo Aventian", school: "Queen's University" },
      { name: "Alika Elliott", school: "University of British Columbia" },
      { name: "Anne-Peniel Michel", school: "University of Ottawa" },
      { name: "Mikael Ouare", school: "Metropolitan State University" },
      { name: "Stanislaus Farrel Kumalaputra", school: "British Columbia Institute of Technology" },
    ],
  },
  {
    id: "iamgold",
    trackTitle: "IAMGOLD Track Winners",
    teamName: "Team 8",
    sponsorName: "IAMGOLD",
    sponsorLogo: "/sponsor image/IAMGOLD-Logo-N.png",
    isOverallWinner: false,
    members: [
      { name: "Justin Paquette", school: "Laval University" },
      { name: "Iyesha Rupasinha Arachchige", school: "University of Toronto" },
      { name: "Yuyu Guo", school: "Laurentian University" },
      { name: "Ridouane Maiga", school: "Laval University" },
      { name: "Yanxi Lin", school: "Queen's University" },
    ],
  },
  {
    id: "or-royalties",
    trackTitle: "OR Royalties Track Winners",
    teamName: "Team 10",
    sponsorName: "OR Royalties",
    sponsorLogo: "/lorroyalties.svg",
    isOverallWinner: false,
    members: [
      { name: "Erik Giswold", school: "Queen's University" },
      { name: "Angelia Chin", school: "University of Toronto" },
      { name: "Jose Del Castillo", school: "University of British Columbia" },
      { name: "Mohamed Dhaoudi", school: "Institut national de la recherche scientifique" },
    ],
  },
];

// Student Event Gallery Photos from 2026
const studentGalleryPhotos = [
  {
    id: 1,
    src: "/student/STUDENTS/MINING INVESTMENT EVENT 2026_DAY 1_STUDENTS-17.jpg",
    title: "2026 Award Ceremony & Winners",
    category: "Awards",
    caption: "Student delegates recognized during the main evening awards presentation.",
  },
  {
    id: 2,
    src: "/student/STUDENTS/MINING INVESTMENT EVENT 2026_DAY 1_STUDENTS-1.jpg",
    title: "Executive Networking & Mentorship",
    category: "Networking",
    caption: "Students engaging in one-on-one discussions with senior mining executives.",
  },
  {
    id: 3,
    src: "/student/STUDENTS/MINING INVESTMENT EVENT 2026_DAY 1_STUDENTS-3.jpg",
    title: "Case Study Challenge Presentation",
    category: "Panels",
    caption: "Student teams presenting strategic mining investment proposals to the judging panel.",
  },
  {
    id: 4,
    src: "/student/STUDENTS/MINING INVESTMENT EVENT 2026_DAY 1_STUDENTS-6.jpg",
    title: "Student Delegation Group Photo",
    category: "Student Life",
    caption: "The Class of 2026 gather at the Quebec City Convention Centre.",
  },
  {
    id: 5,
    src: "/student/STUDENTS/MINING INVESTMENT EVENT 2026_DAY 1_STUDENTS-11.jpg",
    title: "Tier 1 Keynote & Panel Sessions",
    category: "Panels",
    caption: "Sponsored delegates front-row during global mining market keynotes.",
  },
  {
    id: 6,
    src: "/student/STUDENTS/MINING INVESTMENT EVENT 2026_DAY 1_STUDENTS-13.jpg",
    title: "Student MVP Recognition",
    category: "Awards",
    caption: "Celebrating outstanding peer-voted leadership and student contributions.",
  },
  {
    id: 7,
    src: "/student/STUDENTS/MINING INVESTMENT EVENT 2026_DAY 1_STUDENTS-27.jpg",
    title: "Quebec City Reception",
    category: "Student Life",
    caption: "Delegates building lifelong connections during the evening social reception.",
  },
  {
    id: 8,
    src: "/student/STUDENTS/MINING INVESTMENT EVENT 2026_DAY 1_STUDENTS-38.jpg",
    title: "Industry Roundtable Discussions",
    category: "Panels",
    caption: "Interactive breakout workshops on ESG, innovation and mine technology.",
  },
];

export default function StudentPage() {
  const { t, isFr } = useLanguage();

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const filteredPhotos =
    activeCategory === "All"
      ? studentGalleryPhotos
      : studentGalleryPhotos.filter((p) => p.category === activeCategory);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("Sydney@irinc.ca");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };


  const scrollToApply = () => {
    const el = document.getElementById("apply");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-[#fcfcfd] dark:bg-[#0c0d12] text-neutral-900 dark:text-neutral-100">

        {/* ═══════════════ 1. HERO SECTION ═══════════════ */}
        <section className="relative w-full bg-[#0b0f19] overflow-hidden text-white pt-28 sm:pt-30 md:pt-32 pb-10 sm:pb-12 md:pb-14 border-b border-neutral-800">
          {/* Background Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C6112F]/20 blur-[130px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 mb-6">
              <a href="/" className="hover:text-white transition-colors">
                {t("nav-home", "Home")}
              </a>
              <span className="text-[#C6112F]">›</span>
              <span className="text-neutral-400">{isFr ? "Initiatives" : "Initiatives"}</span>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white font-semibold">
                {isFr ? "Programme de Partenariat Étudiant" : "THE Student Partnership Program"}
              </span>
            </div>

            {/* 2-Column Main Hero Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column - Content & Sponsors */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#C6112F]/15 border border-[#C6112F]/30 text-[#ff4d6d] text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#C6112F] animate-pulse" />
                  <span>
                    {isFr
                      ? "Parrainage Étudiant Minier de Premier Plan au Canada"
                      : "Canada's Premier Student Mining Sponsorship"}
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] mb-6">
                  {isFr ? (
                    <>
                      LE Programme de <span className="text-[#C6112F]">Partenariat Étudiant</span>
                    </>
                  ) : (
                    <>
                      THE Student <span className="text-[#C6112F]">Partnership Program</span>
                    </>
                  )}
                </h1>

                <p className="text-neutral-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mb-8">
                  {isFr
                    ? "Le Programme de partenariat étudiant réunit des étudiants universitaires et collégiaux à THE Mining Investment Event à Québec pour une expérience immersive les connectant avec des leaders de l'industrie, des investisseurs et d'autres étudiants."
                    : "THE Student Partnership Program brings university and college students to THE Mining Investment Event in Quebec City for an immersive experience connecting them with industry leaders, investors and fellow students."}
                </p>

                {/* Hero Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <button
                    onClick={scrollToApply}
                    type="button"
                    className="px-8 py-4 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs sm:text-sm font-extrabold tracking-widest uppercase shadow-xl shadow-[#C6112F]/30 hover:scale-[1.02] transition-all duration-300 flex items-center gap-3 cursor-pointer"
                  >
                    <span>{isFr ? "Postuler Maintenant" : "Apply Now"}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>

                </div>

                {/* Program Sponsors */}
                <div className="pt-6 border-t border-neutral-800/80 max-w-3xl">
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.25em] block mb-3">
                    {isFr ? "COMMANDITAIRES DU PROGRAMME" : "PROGRAM SPONSORS"}
                  </span>
                  <div className="flex items-center gap-4 sm:gap-5 flex-wrap sm:flex-nowrap">
                    {/* Glencore */}
                    <div
                      className="w-[185px] sm:w-[220px] h-16 sm:h-[72px] logo-white-bg !bg-white rounded-2xl px-5 py-2.5 flex items-center justify-center border border-white/20 shadow-sm shrink-0"
                      style={{ backgroundColor: "#ffffff" }}
                    >
                      <img
                        src="/sponsors/2026/glencore.svg"
                        alt="Glencore Logo"
                        className="h-8 sm:h-10 max-w-full w-auto object-contain"
                      />
                    </div>
                    {/* OR Royalties */}
                    <div className="w-[185px] sm:w-[220px] h-16 sm:h-[72px] bg-[#0b0e19] rounded-2xl flex items-center justify-center border border-[#d7a032]/40 shadow-sm shrink-0 overflow-hidden">
                      <img
                        src="/sponsors/2026/or_royalties_osisko_royalties.svg"
                        alt="OR Royalties Logo"
                        className="h-12 sm:h-14 w-auto object-contain scale-[1.55]"
                      />
                    </div>
                    {/* IAMGOLD */}
                    <div
                      className="w-[185px] sm:w-[220px] h-16 sm:h-[72px] logo-white-bg !bg-white rounded-2xl px-5 py-2.5 flex items-center justify-center border border-white/20 shadow-sm shrink-0"
                      style={{ backgroundColor: "#ffffff" }}
                    >
                      <img
                        src="/sponsor image/IAMGOLD-Logo-N.png"
                        alt="IAMGOLD Logo"
                        className="h-8 sm:h-10 max-w-full w-auto object-contain"
                      />
                    </div>
                    {/* Hatch (2027) */}
                    <div
                      className="w-[185px] sm:w-[220px] h-16 sm:h-[72px] logo-white-bg !bg-white rounded-2xl px-5 py-2.5 flex items-center justify-center border border-white/20 shadow-sm shrink-0"
                      style={{ backgroundColor: "#ffffff" }}
                    >
                      <img
                        src="/sponsors/2026/hatch.png"
                        alt="Hatch Logo"
                        className="h-8 sm:h-10 max-w-full w-auto object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Student Delegation Photo */}
              <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-3xl overflow-hidden border-2 border-[#C6112F]/40 shadow-2xl shadow-[#C6112F]/20 group">
                  <img
                    src="/MINING%20INVESTMENT%20EVENT%202026_DAY%204_STUDENTS-25.jpg"
                    alt="Mining Investment Event Student Sponsorship Delegation"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-bold">
                    <span className="bg-[#C6112F] text-white text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full shadow-md">
                      STUDENT DELEGATION
                    </span>
                    <span className="text-neutral-300 font-semibold">Quebec City</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 2. PROGRAM OVERVIEW & DETAILS ═══════════════ */}
        <section className="relative w-full py-12 sm:py-14 md:py-16 bg-white dark:bg-[#0f1117]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            {/* Main Program Description */}
            <div className="max-w-4xl mx-auto text-center mb-14">
              <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
                {isFr ? "À PROPOS DU PROGRAMME" : "ABOUT THE PROGRAM"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight mb-6">
                {isFr
                  ? "Une opportunité entièrement financée"
                  : "A Fully Funded Opportunity"}
              </h2>
              <div className="w-20 h-[3.5px] bg-[#C6112F] rounded-full mb-8 mx-auto" />
              <p className="text-neutral-700 dark:text-neutral-300 text-base sm:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
                {isFr
                  ? "Une opportunité entièrement financée pour les étudiants de partout au Canada de découvrir l'industrie minière de première main."
                  : "A fully funded opportunity for students across Canada to experience the mining industry firsthand."}
              </p>
            </div>

            {/* Video Placeholder Section */}
            <div className="max-w-4xl mx-auto mb-14">
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xl group">
                {/* 2025 Placeholder — will be replaced with Steel video */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0b0f19] via-[#151821] to-[#0b0f19] text-white">
                  <div className="w-20 h-20 rounded-full bg-[#C6112F]/20 border-2 border-[#C6112F]/50 flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-[#C6112F]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.25em] text-neutral-400 mb-1">
                    {isFr ? "VIDÉO À VENIR" : "VIDEO COMING SOON"}
                  </span>
                  <span className="text-sm font-bold text-neutral-300">
                    {isFr ? "Programme de partenariat étudiant 2025" : "Student Partnership Program 2025"}
                  </span>
                </div>
              </div>
            </div>

            {/* What's Included & Who Should Apply — 2-column grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* What's Included */}
              <div className="bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/90 dark:border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-xl">
                <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
                  {isFr ? "CE QUI EST INCLUS" : "WHAT'S INCLUDED"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight mb-6">
                  {isFr ? "Qu'est-ce qui est inclus ?" : "What's Included?"}
                </h3>
                <div className="w-12 h-[3px] bg-[#C6112F] rounded-full mb-6" />
                <ul className="space-y-4">
                  {[
                    { en: "Full access to THE Event", fr: "Accès complet à THE Event", icon: "🎟️" },
                    { en: "Transportation between Montreal and Quebec City", fr: "Transport entre Montréal et Québec", icon: "🚌" },
                    { en: "3 nights accommodation", fr: "3 nuits d'hébergement", icon: "🏨" },
                    { en: "Student networking events", fr: "Événements de réseautage étudiants", icon: "🤝" },
                    { en: "Team based case competition", fr: "Concours d'études de cas en équipe", icon: "📊" },
                    { en: "Resume exposure with leading companies", fr: "Visibilité de votre CV auprès d'entreprises de premier plan", icon: "📄" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-xl bg-[#C6112F]/10 text-base flex items-center justify-center shrink-0 mt-0.5">
                        {item.icon}
                      </span>
                      <span className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 font-semibold leading-snug">
                        {isFr ? item.fr : item.en}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Who Should Apply */}
              <div className="bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/90 dark:border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col justify-between">
                <div>
                  <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
                    {isFr ? "QUI DEVRAIT POSTULER" : "WHO SHOULD APPLY"}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight mb-6">
                    {isFr ? "Qui devrait postuler ?" : "Who Should Apply?"}
                  </h3>
                  <div className="w-12 h-[3px] bg-[#C6112F] rounded-full mb-6" />
                  <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed font-medium">
                    {isFr
                      ? "Étudiants collégiaux et universitaires de partout au Canada. Toutes les disciplines d'études sont les bienvenues, qu'elles soient liées au secteur minier ou au-delà."
                      : "College and University students from across Canada. All study disciplines welcome, connected to mining and beyond."}
                  </p>
                </div>
                <div className="mt-8">
                  <button
                    onClick={scrollToApply}
                    type="button"
                    className="w-full px-8 py-4 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs sm:text-sm font-extrabold tracking-widest uppercase shadow-xl shadow-[#C6112F]/30 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <span>{isFr ? "Postuler Maintenant" : "Apply Now"}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* ═══════════════ 4. 2026 WINNERS & PHOTO GALLERY ═══════════════ */}
        <section className="relative w-full py-12 sm:py-14 md:py-16 bg-[#f8f9fa] dark:bg-[#12141c] border-t border-b border-neutral-200/80 dark:border-neutral-800">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block">
                {isFr ? "RECONNAISSANCE 2026" : "2026 RECOGNITION"}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3">
                {isFr ? "Lauréats et Faits Saillants 2026" : "2026 Award Winners & Highlights"}
              </h2>
              <div className="w-16 h-[3.5px] bg-[#C6112F] rounded-full mb-4" />
              <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base">
                {isFr
                  ? "Célébration des délégués étudiants exceptionnels et des gagnants du concours d'études de cas de THE Event 2026 à Québec."
                  : "Celebrating outstanding student delegates and case competition winners from THE Event 2026 in Québec City."}
              </p>
            </div>

            {/* Simplified Winners Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {/* MVP Winner */}
              <div className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/25 rounded-2xl p-5 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🏆</span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    {isFr ? "MVP Étudiant 2026" : "Student MVP 2026"}
                  </span>
                </div>
                <h4 className="text-base font-black text-neutral-900 dark:text-white mb-0.5">{mvpStudent.name}</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">{mvpStudent.school}</p>
              </div>

              {/* Outstanding Students */}
              {outstandingStudents.map((std, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-5 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">⭐</span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#C6112F]">
                      {isFr ? "Reconnaissance Remarquable" : "Outstanding Recognition"}
                    </span>
                  </div>
                  <h4 className="text-base font-black text-neutral-900 dark:text-white mb-0.5">{std.name}</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">{std.school}</p>
                </div>
              ))}
            </div>

            {/* Compact Case Competition Winners */}
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-5 bg-[#C6112F] rounded-full" />
                <h3 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white tracking-tight">
                  {isFr ? "Gagnants du Concours d'Études de Cas" : "Case Competition Winners"}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {trackWinners.map((track) => (
                  <div
                    key={track.id}
                    className={`bg-white dark:bg-[#181a24] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all ${
                      track.isOverallWinner
                        ? "border-2 border-amber-500/40"
                        : "border border-neutral-200/80 dark:border-neutral-800"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100 dark:border-neutral-800/80 gap-3">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          track.isOverallWinner
                            ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                            : "bg-[#C6112F]/10 text-[#C6112F]"
                        }`}
                      >
                        {track.sponsorName}
                        {track.isOverallWinner && " 🏆"}
                      </span>
                      <div
                        className="logo-white-bg !bg-white h-10 sm:h-11 w-28 sm:w-32 px-2.5 py-1.5 rounded-xl border border-neutral-200 dark:border-white/20 shadow-xs flex items-center justify-center shrink-0 overflow-hidden"
                        style={{ backgroundColor: "#ffffff" }}
                      >
                        <img
                          src={track.sponsorLogo}
                          alt={`${track.sponsorName} Logo`}
                          className={`object-contain ${
                            track.id === "or-royalties"
                              ? "h-8 sm:h-9 w-auto max-w-[120px] scale-[1.45] origin-center"
                              : track.id === "glencore"
                              ? "h-4.5 sm:h-5 w-auto max-w-[100px]"
                              : "h-5 sm:h-5.5 w-auto max-w-[100px]"
                          }`}
                        />
                      </div>
                    </div>
                    <ul className="space-y-1.5">
                      {track.members.map((m, i) => (
                        <li key={i} className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                          <span className="font-bold text-neutral-900 dark:text-white">{m.name}</span>
                          <span className="text-neutral-400 ml-1">— {m.school}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 2026 Photo Gallery */}
            <div className="mt-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                    {isFr ? "Photos de l'Événement 2026 & Moments Étudiants" : "2026 Event Photos & Student Moments"}
                  </h3>
                  <div className="w-12 h-[3px] bg-[#C6112F] rounded-full mt-2" />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: "All", label: isFr ? "Tous" : "All" },
                    { id: "Awards", label: isFr ? "Prix" : "Awards" },
                    { id: "Networking", label: isFr ? "Réseautage" : "Networking" },
                    { id: "Panels", label: isFr ? "Panels" : "Panels" },
                    { id: "Student Life", label: isFr ? "Vie Étudiante" : "Student Life" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeCategory === cat.id
                          ? "bg-[#C6112F] text-white shadow-md shadow-[#C6112F]/20"
                          : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-[#C6112F]"
                        }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedPhotoIndex(index)}
                    className="group relative rounded-3xl overflow-hidden bg-neutral-900 cursor-pointer aspect-[4/3] border border-neutral-200/80 dark:border-neutral-800 shadow-md hover:shadow-2xl transition-all duration-500"
                  >
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Lightbox Pop-up */}
            {selectedPhotoIndex !== null && filteredPhotos[selectedPhotoIndex] && (
              <div
                className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
                onClick={() => setSelectedPhotoIndex(null)}
              >
                <div
                  className="relative max-w-4xl w-full bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedPhotoIndex(null)}
                    className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#C6112F] transition-colors"
                  >
                    ✕
                  </button>

                  <div className="relative aspect-[16/10] bg-black">
                    <img
                      src={filteredPhotos[selectedPhotoIndex].src}
                      alt={filteredPhotos[selectedPhotoIndex].title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="p-6 bg-neutral-900 border-t border-neutral-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-extrabold text-[#C6112F] uppercase tracking-widest mb-1 block">
                        {filteredPhotos[selectedPhotoIndex].category}
                      </span>
                      <h3 className="text-xl font-bold">
                        {filteredPhotos[selectedPhotoIndex].title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1 font-light">
                        {filteredPhotos[selectedPhotoIndex].caption}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() =>
                          setSelectedPhotoIndex(
                            (selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length
                          )
                        }
                        className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-[#C6112F] text-xs font-bold uppercase transition-colors"
                      >
                        Prev
                      </button>
                      <button
                        onClick={() =>
                          setSelectedPhotoIndex(
                            (selectedPhotoIndex + 1) % filteredPhotos.length
                          )
                        }
                        className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-[#C6112F] text-xs font-bold uppercase transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════ 5. PREVIOUS YEARS SECTION (TEMPORARILY HIDDEN) ═══════════════ */}
        {/* Hidden until team confirms details about previous years' student program winners & photos */}
        {/*
        <section className="relative w-full py-12 sm:py-14 md:py-16 bg-white dark:bg-[#0f1117] border-b border-neutral-200/80 dark:border-neutral-800">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block">
                PROGRAM ARCHIVES
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight mb-3">
                Previous Years
              </h2>
              <div className="w-16 h-[3.5px] bg-[#C6112F] rounded-full mx-auto mb-4" />
              <p className="text-neutral-600 dark:text-neutral-400 text-sm font-medium">
                Explore past student delegations, case study archives and award recipient honors since the program's inaugural launch in 2023.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/past-editions/2025"
                className="group p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 hover:border-[#C6112F] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-extrabold text-[#C6112F] uppercase tracking-widest mb-2">
                    EDITION ARCHIVE
                  </div>
                  <h3 className="text-2xl font-black text-neutral-900 dark:text-white mb-2 group-hover:text-[#C6112F] transition-colors">
                    2025 Student Program
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                    Over 50 delegates attended, featuring case studies and mentorship with Tier 1 mining executives in Québec City.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-bold text-[#C6112F]">
                  <span>Explore 2025 Archive</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>

              <Link
                href="/past-editions/2024"
                className="group p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 hover:border-[#C6112F] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-extrabold text-[#C6112F] uppercase tracking-widest mb-2">
                    EDITION ARCHIVE
                  </div>
                  <h3 className="text-2xl font-black text-neutral-900 dark:text-white mb-2 group-hover:text-[#C6112F] transition-colors">
                    2024 Student Program
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                    Expanded national student outreach bringing geology and finance students together for experiential learning.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-bold text-[#C6112F]">
                  <span>Explore 2024 Archive</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>

              <Link
                href="/past-editions/2023"
                className="group p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 hover:border-[#C6112F] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-extrabold text-[#C6112F] uppercase tracking-widest mb-2">
                    INAUGURAL EDITION
                  </div>
                  <h3 className="text-2xl font-black text-neutral-900 dark:text-white mb-2 group-hover:text-[#C6112F] transition-colors">
                    2023 Student Program
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                    The launch of Canada's fully funded student mining conference initiative in Quebec City.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-bold text-[#C6112F]">
                  <span>Explore 2023 Archive</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            </div>
          </div>
        </section>
        */}

        {/* ═══════════════ 5. STUDENT PROGRAM CONSULTANTS SECTION ═══════════════ */}
        <section className="relative w-full py-12 sm:py-14 md:py-16 bg-white dark:bg-[#0f1117] border-t border-b border-neutral-200/80 dark:border-neutral-800">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mb-10">
              <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block">
                {isFr ? "RAYONNEMENT & LEADERSHIP DU PROGRAMME" : "STUDENT PROGRAM OUTREACH & LEADERSHIP"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight mb-3">
                {isFr ? "Consultants du Programme Étudiant" : "Student Program Consultants"}
              </h2>
              <div className="w-16 h-[3.5px] bg-[#C6112F] rounded-full mb-4" />
              <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base">
                {isFr
                  ? "Dirigeant le rayonnement étudiant national, l'engagement communautaire et les campagnes pour le Programme de Partenariat Étudiant."
                  : "Leading national student outreach, community engagement, and candidate campaigns for THE Student Partnership Program."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Dalena Vo */}
              <div className="bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0f1117] to-[#1a1f2c] border-2 border-[#C6112F]/30 flex items-center justify-center text-white font-black text-xl shrink-0 shadow-md">
                      DV
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#C6112F] bg-[#C6112F]/10 px-2.5 py-0.5 rounded-full inline-block mb-1">
                        {isFr ? "Consultante du Programme Étudiant" : "Student Program Consultant"}
                      </span>
                      <h3 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
                        Dalena Vo
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold mt-0.5">
                        Queen’s Mining Engineering '24
                      </p>
                    </div>
                  </div>
                  <div className="w-10 h-[2.5px] bg-[#C6112F] rounded-full mb-4" />
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
                    {isFr
                      ? "Dalena (aux côtés d'Adam) dirige le rayonnement étudiant national. Diplômée de la première cohorte du Programme et ancienne agente de liaison (2024–2026), elle allie expérience technique de terrain et engagement soutenu pour former la relève."
                      : "Dalena (alongside Adam) leads national student outreach and campaigns. As a graduate of THE Student Partnership Program in its inaugural year and former Student Liaison (2024–2026), she combines technical field experience with a strong commitment to cultivating the next generation of industry talent."}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
                  <Link
                    href="/team"
                    className="text-xs font-bold text-[#C6112F] dark:text-[#ff4d6d] hover:underline flex items-center gap-1"
                  >
                    <span>{isFr ? "Lire la bio complète sur la page Équipe" : "Read Full Bio in Team Page"}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Adam Nouri */}
              <div className="bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0f1117] to-[#1a1f2c] border-2 border-[#C6112F]/30 flex items-center justify-center text-white font-black text-xl shrink-0 shadow-md">
                      AN
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#C6112F] bg-[#C6112F]/10 px-2.5 py-0.5 rounded-full inline-block mb-1">
                        {isFr ? "Consultant du Programme Étudiant" : "Student Program Consultant"}
                      </span>
                      <h3 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
                        Adam Nouri
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold mt-0.5">
                        Polytechnique Montréal • CFA Level I
                      </p>
                    </div>
                  </div>
                  <div className="w-10 h-[2.5px] bg-[#C6112F] rounded-full mb-4" />
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
                    {isFr
                      ? "Adam (aux côtés de Dalena) dirige le rayonnement étudiant national. Diplômé de la cohorte inaugurale et ancien agent de liaison (2024–2026), il apporte une solide expertise en opérations minières et analyse financière."
                      : "Adam (alongside Dalena) leads national student outreach and campaigns. As an inaugural graduate of THE Student Partnership Program and former Student Liaison (2024–2026), he brings a strong foundation in both technical mining operations and financial analysis."}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
                  <Link
                    href="/team"
                    className="text-xs font-bold text-[#C6112F] dark:text-[#ff4d6d] hover:underline flex items-center gap-1"
                  >
                    <span>{isFr ? "Lire la bio complète sur la page Équipe" : "Read Full Bio in Team Page"}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ APPLICATION FORM SECTION ═══════════════ */}
        <section id="apply" className="relative w-full py-14 sm:py-16 md:py-20 bg-neutral-100/70 dark:bg-[#0a0c10] border-t border-neutral-200 dark:border-neutral-800 scroll-mt-24">
          <div className="max-w-[960px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[#C6112F] text-xs font-black tracking-[0.25em] uppercase mb-2 block">
                {isFr ? "PORTAIL DE CANDIDATURE" : "APPLICATION PORTAL"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight mb-3">
                {isFr ? "Postuler au Programme de Partenariat Étudiant" : "Apply for THE Student Partnership Program"}
              </h2>
              <div className="w-16 h-[3.5px] bg-[#C6112F] rounded-full mx-auto mb-4" />
              <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base font-normal">
                {isFr
                  ? "Soumettez votre candidature ci-dessous pour assister à l'événement mondial de niveau 1 à Québec avec laissez-passer, hôtel et transport par autocar 100 % financés."
                  : "Submit your application below to attend Canada's premier Tier 1 global mining event in Québec City with 100% funded tuition pass, hotel stay, and coach transportation."}
              </p>
            </div>

            <StudentApplicationForm showBackToOverview={false} />
          </div>
        </section>

        {/* ═══════════════ 6. CONTACT & SUPPORT FOOTER CTA ═══════════════ */}
        <section className="relative w-full py-12 sm:py-14 md:py-16 bg-[#0b0f19] text-white">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="bg-[#151821] border border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <h4 className="text-base font-extrabold text-[#ff4d6d] uppercase tracking-wider mb-2">
                  {isFr ? "Coordonnées et Demandes Étudiantes" : "Contact Information & Student Inquiries"}
                </h4>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-light mb-4">
                  {isFr
                    ? "Pour toute question concernant le processus de candidature au programme étudiant, veuillez contacter Sydney Schuch, directrice des services de production :"
                    : "For additional details or questions regarding the sponsorship application process, please reach out to Sydney Schuch, Manager of Production Services:"}
                </p>
                <div className="inline-flex items-center gap-3 bg-neutral-900 border border-neutral-800 px-4 py-2.5 rounded-xl text-xs font-mono text-neutral-200">
                  <span>Sydney@irinc.ca</span>
                  <button
                    onClick={handleCopyEmail}
                    className="text-[#ff4d6d] hover:underline font-sans font-bold cursor-pointer"
                  >
                    {copiedEmail ? (isFr ? "✓ Copié !" : "✓ Copied!") : isFr ? "Copier le courriel" : "Copy Email"}
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                <button
                  onClick={scrollToApply}
                  type="button"
                  className="px-8 py-4 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-extrabold tracking-widest uppercase shadow-xl hover:scale-105 transition-all cursor-pointer"
                >
                  {isFr ? "Postuler Maintenant" : "Apply Now"}
                </button>
                <span className="text-[11px] text-neutral-400 font-medium">
                  {isFr ? "Les candidatures sont ouvertes" : "Applications for 2026 student cohort are open"}
                </span>
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
