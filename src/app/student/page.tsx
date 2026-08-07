"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

// 2025 Award Recipients Data
const winningTeamMembers = [
  { name: "Alp Tastekin", school: "Queen's University" },
  { name: "Aynaz Aghbash", school: "Université du Québec en Abitibi-Témiscamingue" },
  { name: "Ann Presley", school: "École de Technologie Supérieure" },
  { name: "Chao Feng", school: "Laurentian University" },
  { name: "Édouard Comtois", school: "Laval University" },
];

const outstandingStudents = [
  { name: "Aleksander Strazisar", school: "Toronto Metropolitan University" },
  { name: "Aisha Mohammed", school: "University of Waterloo" },
];

// Student Event Gallery Photos
const studentGalleryPhotos = [
  {
    id: 1,
    src: "/student/STUDENTS/MINING INVESTMENT EVENT 2026_DAY 1_STUDENTS-17.jpg",
    title: "2025 Award Ceremony & Winners",
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
    caption: "The Class of 2025 gather at the Quebec City Convention Centre.",
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
    src: "/student/STUDENTS/MINING INVESTMENT EVENT 2026_DAY 1_STUDENTS-15.jpg",
    title: "Core Shack & Technical Exhibits",
    category: "Networking",
    caption: "Exploring active exploration rock samples and geology exhibits with experts.",
  },
  {
    id: 8,
    src: "/student/STUDENTS/MINING INVESTMENT EVENT 2026_DAY 1_STUDENTS-27.jpg",
    title: "Quebec City Reception",
    category: "Student Life",
    caption: "Delegates building lifelong connections during the evening social reception.",
  },
  {
    id: 9,
    src: "/student/STUDENTS/MINING INVESTMENT EVENT 2026_DAY 1_STUDENTS-38.jpg",
    title: "Industry Roundtable Discussions",
    category: "Panels",
    caption: "Interactive breakout workshops on ESG, innovation, and mine technology.",
  },
];

export default function StudentPage() {
  const { t } = useLanguage();

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

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-[#fcfcfd] dark:bg-[#0c0d12] text-neutral-900 dark:text-neutral-100">
        {/* ═══════ HERO SECTION ═══════ */}
        <section className="relative w-full bg-[#0b0f19] overflow-hidden text-white pt-32 sm:pt-36 md:pt-44 pb-20 sm:pb-24 border-b border-neutral-800">
          {/* Decorative Background Effects */}
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
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 mb-6">
              <a href="/" className="hover:text-white transition-colors">
                {t("nav-home", "Home")}
              </a>
              <span className="text-[#C6112F]">›</span>
              <span className="text-neutral-400">{t("student-breadcrumb-init", "Initiatives")}</span>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white font-semibold">{t("student-breadcrumb-prog", "Student Sponsorship")}</span>
            </div>

            {/* 2-Column Hero Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column - Content */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#C6112F]/15 border border-[#C6112F]/30 text-[#ff4d6d] text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#C6112F] animate-pulse" />
                  <span>{t("student-tag-badge", "Canada's Premier Student Mining Sponsorship")}</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] mb-6">
                  {t("student-hero-title-1", "THE Student")}{" "}
                  <span className="text-[#C6112F]">
                    {t("student-hero-title-2", "Sponsorship Program")}
                  </span>
                </h1>

                <p className="text-neutral-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mb-8">
                  {t(
                    "student-hero-subtitle",
                    "Empowering the next generation of geology, finance, and engineering leaders with fully funded access to Canada's Tier 1 global mining investment event."
                  )}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/student/apply"
                    className="px-8 py-4 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs sm:text-sm font-extrabold tracking-widest uppercase shadow-xl shadow-[#C6112F]/30 hover:scale-[1.02] transition-all duration-300 flex items-center gap-3"
                  >
                    <span>{t("student-cta-apply", "Apply For Class of 2026")}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                  <a
                    href="https://www.themininginvestmentevent.com/s/LetterfromOurCEO-FINAL-2025-1-FR-6j3d.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-4 rounded-xl border border-neutral-700 hover:border-white text-neutral-200 hover:text-white text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-white/10 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
                  >
                    <span>{t("student-cta-letter", "Letter from our CEO")}</span>
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right Column - Hero Image */}
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

        {/* ═══════ CONDENSED PROGRAM PILLARS & HIGHLIGHTS ═══════ */}
        <section className="relative w-full py-16 sm:py-24 bg-white dark:bg-[#0f1117]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            {/* Header */}
            <div className="max-w-3xl mb-14">
              <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block">
                {t("student-overview-tag", "PROGRAM HIGHLIGHTS")}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
                {t("student-overview-title", "Bridging Education & Mining Industry Leaders")}
              </h2>
              <div className="w-16 h-[3.5px] bg-[#C6112F] rounded-full mb-4" />
              <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
                {t(
                  "student-overview-desc",
                  "THE Glencore Student Sponsorship Program provides university and college students passionate about geology, engineering, and finance with an all-inclusive gateway to Canada's premier mining investment conference."
                )}
              </p>
            </div>

            {/* 4 Equal-Height & Equal-Text Feature Highlight Cards Grid with Website SVG Icons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {/* Card 1 */}
              <div className="group p-6 sm:p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-200/90 dark:border-neutral-800 hover:border-[#C6112F]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#C6112F]/10 border border-[#C6112F]/20 flex items-center justify-center mb-6 group-hover:bg-[#C6112F] group-hover:text-white transition-all duration-300">
                    <svg className="w-6 h-6 text-[#C6112F] group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84 51.39 51.39 0 0 0-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-black text-[#1a1f2c] dark:text-white mb-3 min-h-[52px] flex items-center">
                    Fully Funded Sponsorship
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed font-medium">
                    Selected delegates receive full coverage for conference registration, round-trip travel expenses, and hotel stay in Quebec City.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-neutral-200/80 dark:border-neutral-800 text-[11px] font-extrabold text-[#C6112F] uppercase tracking-wider">
                  ZERO STUDENT COST
                </div>
              </div>

              {/* Card 2 */}
              <div className="group p-6 sm:p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-200/90 dark:border-neutral-800 hover:border-[#C6112F]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#C6112F]/10 border border-[#C6112F]/20 flex items-center justify-center mb-6 group-hover:bg-[#C6112F] group-hover:text-white transition-all duration-300">
                    <svg className="w-6 h-6 text-[#C6112F] group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 0 3-3V4.5a3 3 0 0 0-6 0v8.25a3 3 0 0 0 3 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-black text-[#1a1f2c] dark:text-white mb-3 min-h-[52px] flex items-center">
                    Tier 1 Keynotes & Panels
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed font-medium">
                    Gain direct insights from global mining CEOs, institutional investors, and policy leaders during exclusive multi-day presentations.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-neutral-200/80 dark:border-neutral-800 text-[11px] font-extrabold text-[#C6112F] uppercase tracking-wider">
                  WORLD-CLASS INSIGHTS
                </div>
              </div>

              {/* Card 3 */}
              <div className="group p-6 sm:p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-200/90 dark:border-neutral-800 hover:border-[#C6112F]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#C6112F]/10 border border-[#C6112F]/20 flex items-center justify-center mb-6 group-hover:bg-[#C6112F] group-hover:text-white transition-all duration-300">
                    <svg className="w-6 h-6 text-[#C6112F] group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-black text-[#1a1f2c] dark:text-white mb-3 min-h-[52px] flex items-center">
                    Student Case Competition
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed font-medium">
                    Participate in collaborative student case challenges judged by senior mining executives with formal awards and industry recognition.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-neutral-200/80 dark:border-neutral-800 text-[11px] font-extrabold text-[#C6112F] uppercase tracking-wider">
                  EXPERIENTIAL LEARNING
                </div>
              </div>

              {/* Card 4 */}
              <div className="group p-6 sm:p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-200/90 dark:border-neutral-800 hover:border-[#C6112F]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#C6112F]/10 border border-[#C6112F]/20 flex items-center justify-center mb-6 group-hover:bg-[#C6112F] group-hover:text-white transition-all duration-300">
                    <svg className="w-6 h-6 text-[#C6112F] group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a5.97 5.97 0 0 0-.942 3.197m0 0A9.094 9.094 0 0 1 2.25 18.241a3 3 0 0 1 4.682-2.72m0 0A5.996 5.996 0 0 1 12 12.75m0 0a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-black text-[#1a1f2c] dark:text-white mb-3 min-h-[52px] flex items-center">
                    Executive Career Mentorship
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed font-medium">
                    Connect with corporate leaders, recruiters, and alumni to accelerate your career trajectory across geology, finance, and engineering.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-neutral-200/80 dark:border-neutral-800 text-[11px] font-extrabold text-[#C6112F] uppercase tracking-wider">
                  CAREER NETWORKING
                </div>
              </div>
            </div>

            {/* Glencore Partnership Highlight Banner */}
            <div className="relative rounded-3xl bg-gradient-to-r from-[#0f1117] via-[#1a1f2c] to-[#0f1117] text-white p-8 sm:p-12 overflow-hidden shadow-2xl border border-neutral-800">
              <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 pointer-events-none bg-[radial-gradient(#C6112F_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10 max-w-3xl">
                <span className="text-[#ff4d6d] text-xs font-bold tracking-widest uppercase mb-3 block">
                  PROUD SPONSOR PARTNERSHIP
                </span>
                <h3 className="text-2xl sm:text-3xl font-black mb-3">
                  Powered by Glencore
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                  Through Glencore’s visionary commitment to Canadian education, up to 50 deserving post-secondary students attend THE Mining Investment Event completely tuition-free, inspiring future leaders across Canada.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/student/apply"
                    className="px-6 py-3 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-extrabold uppercase tracking-wider shadow-lg hover:scale-105 transition-all inline-flex items-center gap-2"
                  >
                    <span>Apply Now for 2026</span>
                    <span className="text-base leading-none">➔</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ STUDENT MOMENTS & PHOTO GALLERY ═══════ */}
        <section className="relative w-full py-16 sm:py-24 bg-[#f8f9fa] dark:bg-[#12141c] border-t border-b border-neutral-200/80 dark:border-neutral-800">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
              <div>
                <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block">
                  PHOTO GALLERY & MOMENTS
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                  Life at THE Student Event
                </h2>
                <div className="w-16 h-[3.5px] bg-[#C6112F] rounded-full mt-3" />
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {["All", "Awards", "Networking", "Panels", "Student Life"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      activeCategory === cat
                        ? "bg-[#C6112F] text-white shadow-md shadow-[#C6112F]/20"
                        : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-[#C6112F]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
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
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-extrabold uppercase tracking-widest">
                      {photo.category}
                    </span>
                  </div>

                  {/* Caption & Title */}
                  <div className="absolute bottom-0 inset-x-0 p-5 z-10 text-white">
                    <h4 className="text-base font-bold tracking-tight mb-1 group-hover:text-[#ff4d6d] transition-colors">
                      {photo.title}
                    </h4>
                    <p className="text-xs text-neutral-300 font-light line-clamp-2">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Lightbox Modal Pop-up */}
            {selectedPhotoIndex !== null && filteredPhotos[selectedPhotoIndex] && (
              <div
                className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
                onClick={() => setSelectedPhotoIndex(null)}
              >
                <div
                  className="relative max-w-4xl w-full bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
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

                    {/* Prev / Next controls */}
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

        {/* ═══════ 2025 AWARD RECIPIENTS SECTION ═══════ */}
        <section className="relative w-full py-16 sm:py-24 bg-[#f8f9fa] dark:bg-[#12141c]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block">
                {t("student-awards-label", "HONOUR ROLL & AWARDS")}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3">
                Class of 2025 Award Recipients
              </h2>
              <div className="w-16 h-[3.5px] bg-[#C6112F] rounded-full mb-4" />
              <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                Celebrating outstanding student delegates and case competition winners from our previous annual gathering.
              </p>
            </div>

            {/* MVP Featured Card */}
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-6 py-2 bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-widest rounded-bl-2xl shadow-md">
                ⭐ {t("student-mvp-label", "MVP — Selected by Students")}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1a1f2c] dark:text-white mb-1">
                    Anna Dalton-Framst
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm font-semibold">
                    University of Ottawa
                  </p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-amber-600 dark:text-amber-400 shrink-0">
                  Student MVP Winner
                </div>
              </div>
            </div>

            {/* Winning Team 9 */}
            <div className="bg-white dark:bg-[#181a24] border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3.5 py-1 rounded-full bg-[#C6112F]/10 text-[#C6112F] font-black text-[10px] uppercase tracking-widest">
                  {t("student-winning-team-label", "Winning Team — Team 9")}
                </span>
                <span className="text-xs text-neutral-400 font-medium">Case Study Competition</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {winningTeamMembers.map((member, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800 hover:border-[#C6112F]/40 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#C6112F]/10 text-[#C6112F] font-bold text-xs flex items-center justify-center mb-3">
                      0{i + 1}
                    </div>
                    <div className="text-base font-black text-[#1a1f2c] dark:text-white mb-1">
                      {member.name}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                      {member.school}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outstanding Students */}
            <div className="bg-white dark:bg-[#181a24] border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 mb-12">
              <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#C6112F] bg-[#C6112F]/10 px-3.5 py-1 rounded-full inline-block mb-6">
                {t("student-outstanding-label", "Outstanding Students")}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {outstandingStudents.map((std, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800">
                    <div className="text-lg font-black text-[#1a1f2c] dark:text-white mb-1">{std.name}</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">{std.school}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact & Support Box */}
            <div className="bg-[#0b0f19] text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <h4 className="text-base font-bold text-[#ff4d6d] uppercase tracking-wider mb-2">
                  {t("student-contact-title", "Contact Information & Inquiries")}
                </h4>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-light mb-3">
                  {t(
                    "student-contact-desc",
                    "For additional details or questions regarding the sponsorship application process, please reach out to Sydney Schuch, Manager of Production Services:"
                  )}
                </p>
                <div className="inline-flex items-center gap-3 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl text-xs font-mono text-neutral-200">
                  <span>Sydney@irinc.ca</span>
                  <button
                    onClick={handleCopyEmail}
                    className="text-[#ff4d6d] hover:underline font-sans font-bold"
                  >
                    {copiedEmail ? "✓ Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="pt-4 md:pt-0 md:border-l md:border-neutral-800 md:pl-8 text-neutral-400 text-xs leading-relaxed max-w-xs shrink-0">
                {t(
                  "student-closing-note",
                  "We thank all students who have participated in our annual gathering. Applications for Class of 2026 are actively open."
                )}
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
