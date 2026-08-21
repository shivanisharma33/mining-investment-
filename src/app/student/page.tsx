"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

// 2026 Award Recipients Data
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

  const scrollToCeoLetter = () => {
    const el = document.getElementById("ceo-letter-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-[#fcfcfd] dark:bg-[#0c0d12] text-neutral-900 dark:text-neutral-100">
        
        {/* ═══════════════ 1. HERO SECTION ═══════════════ */}
        <section className="relative w-full bg-[#0b0f19] overflow-hidden text-white pt-32 sm:pt-36 md:pt-44 pb-20 sm:pb-24 border-b border-neutral-800">
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
              <span className="text-neutral-400">Initiatives</span>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white font-semibold">THE Student Partnership Program</span>
            </div>

            {/* 2-Column Main Hero Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column - Content & Sponsors */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#C6112F]/15 border border-[#C6112F]/30 text-[#ff4d6d] text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#C6112F] animate-pulse" />
                  <span>Canada's Premier Student Mining Sponsorship</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] mb-6">
                  THE Student <span className="text-[#C6112F]">Partnership Program</span>
                </h1>

                <p className="text-neutral-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mb-8">
                  Empowering university and college students in geology, finance, and engineering with fully funded access to Canada's Tier 1 global mining investment event.
                </p>

                {/* Hero Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <Link
                    href="/student/apply"
                    className="px-8 py-4 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs sm:text-sm font-extrabold tracking-widest uppercase shadow-xl shadow-[#C6112F]/30 hover:scale-[1.02] transition-all duration-300 flex items-center gap-3"
                  >
                    <span>Apply Now</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>

                  <button
                    onClick={scrollToCeoLetter}
                    type="button"
                    className="px-7 py-4 rounded-xl border border-neutral-700 hover:border-white text-neutral-200 hover:text-white text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-white/10 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm cursor-pointer"
                  >
                    <span>Letter from our CEO</span>
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                </div>

                {/* 3 Program Sponsors (Glencore on top, OR Royalties & IAMGOLD below) */}
                <div className="pt-6 border-t border-neutral-800/80 max-w-xl">
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.25em] block mb-3">
                    PROGRAM SPONSORS
                  </span>
                  <div className="flex flex-col gap-3">
                    {/* Top Row: Glencore */}
                    <div className="bg-white/95 rounded-xl px-5 py-2.5 flex items-center justify-center w-fit border border-white/20 shadow-sm">
                      <img
                        src="/sponsors/2026/glencore.svg"
                        alt="Glencore Logo"
                        className="h-7 sm:h-8 max-w-[180px] object-contain"
                      />
                    </div>
                    {/* Bottom Row: OR Royalties & IAMGOLD */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="bg-[#0b0e19] rounded-xl px-4 py-2 flex items-center justify-center border border-[#d7a032]/40 shadow-sm">
                        <img
                          src="/sponsors/2026/or_royalties_osisko_royalties.svg"
                          alt="OR Royalties Logo"
                          className="h-6 sm:h-7 max-w-[120px] object-contain"
                        />
                      </div>
                      <div className="bg-white/95 rounded-xl px-4 py-2 flex items-center justify-center border border-white/20 shadow-sm">
                        <img
                          src="/sponsor image/IAMGOLD-Logo-N.png"
                          alt="IAMGOLD Logo"
                          className="h-6 sm:h-7 max-w-[120px] object-contain"
                        />
                      </div>
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

        {/* ═══════════════ 2. PROGRAM OVERVIEW TEXT SECTION ═══════════════ */}
        <section className="relative w-full py-16 sm:py-24 bg-white dark:bg-[#0f1117]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl mx-auto bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/90 dark:border-neutral-800 rounded-3xl p-8 sm:p-12 shadow-xl">
              <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
                ABOUT THE PROGRAM
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight mb-6">
                Investing in the Next Generation of Mining Leaders
              </h2>
              <div className="w-20 h-[3.5px] bg-[#C6112F] rounded-full mb-8" />

              <div className="space-y-6 text-neutral-700 dark:text-neutral-300 text-base sm:text-lg leading-relaxed font-normal">
                <p>
                  <strong>THE Student Partnership Program</strong> aims to offer a one-of-a-kind exposure to the mining industry through participation in THE Mining Investment Event (THE Event), Canada’s only Tier 1 global mining investment conference, held June 2-4, 2026, in Quebec City. This annual event serves as a nexus for industry leaders and investors, providing a platform for knowledge exchange, networking, and immersive learning. The Program is now recognized as one of the largest fully funded conference programs in Canada.
                </p>

                <p>
                  Up to 50 university or college students with a passion for geology, finance, engineering, or related fields will have the chance to attend the conference at <strong>no cost</strong>. Our goal is to foster experiential learning by exposing students to keynote speakers, industry panels, professional meet-and-greets, a case study competition, and various networking events. Through these avenues, we hope to instill a sense of global interconnectedness within the Canadian mining industry while investing in the development of the next generation of talented individuals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 3. LETTER FROM THE CEO SECTION ═══════════════ */}
        <section id="ceo-letter-section" className="relative w-full py-16 sm:py-24 bg-[#0b0f19] text-white overflow-hidden scroll-mt-28">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="relative bg-gradient-to-br from-neutral-900 via-[#151924] to-[#0b0f19] border border-neutral-800 rounded-3xl p-8 sm:p-14 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6112F]/10 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="relative z-10 max-w-4xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3.5 py-1 rounded-full bg-[#C6112F]/20 border border-[#C6112F]/40 text-[#ff4d6d] text-[11px] font-black uppercase tracking-widest">
                    EXECUTIVE PERSPECTIVE
                  </span>
                  <span className="text-xs text-neutral-400 font-semibold">
                    THE Mining Investment Event
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-8">
                  Letter from our Founder & CEO
                </h2>

                <div className="relative pl-6 sm:pl-8 border-l-4 border-[#C6112F] space-y-6">
                  <p className="text-neutral-200 text-base sm:text-lg md:text-xl font-normal leading-relaxed italic">
                    Joanne Jobin, Founder and CEO, stated, “I am deeply grateful to the 2026 Student Program Partners for their commitment to funding this program and for taking the time to meet and interact directly with our students. Since its launch in 2023, the program has introduced approximately 200 students to the mining industry, with many returning annually to network, learn more, or volunteer. It is now recognized as one of the largest fully funded conference programs in North America, offering students interested in mining a unique opportunity to participate in THE Event. Program Partners and Industry Leaders facilitate this platform for knowledge sharing, networking, and experiential learning. This program is vital to THE Event’s dedication to making real social impacts and supporting the goal of ensuring that potential future mining leaders have ample opportunities to be identified and to succeed.”
                  </p>

                  <p className="text-neutral-200 text-base sm:text-lg md:text-xl font-normal leading-relaxed italic">
                    Jobin added, "As part of our ongoing dedication to industry sustainability through fostering the next generation of mining professionals, we plan to seek another partner to provide additional funding to create an opportunity for international students to participate in our 2027 program."
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C6112F] text-white flex items-center justify-center font-black text-lg shadow-md">
                    JJ
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-white">Joanne Jobin</h4>
                    <p className="text-xs text-neutral-400 font-medium">Founder & CEO, THE Mining Investment Event</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 4. 2026 WINNERS & PHOTO GALLERY ═══════════════ */}
        <section className="relative w-full py-16 sm:py-24 bg-[#f8f9fa] dark:bg-[#12141c] border-t border-b border-neutral-200/80 dark:border-neutral-800">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block">
                2026 RECOGNITION
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3">
                2026 Award Winners & Highlights
              </h2>
              <div className="w-16 h-[3.5px] bg-[#C6112F] rounded-full mb-4" />
              <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base">
                Celebrating outstanding student delegates and case competition winners from THE Event 2026 in Québec City.
              </p>
            </div>

            {/* MVP Featured Card */}
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-6 py-2 bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-widest rounded-bl-2xl shadow-md">
                ⭐ Student MVP Winner
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
                  Student MVP Award 2026
                </div>
              </div>
            </div>

            {/* Winning Team 9 */}
            <div className="bg-white dark:bg-[#181a24] border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3.5 py-1 rounded-full bg-[#C6112F]/10 text-[#C6112F] font-black text-[10px] uppercase tracking-widest">
                  Case Study Competition Winners — Team 9
                </span>
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
            <div className="bg-white dark:bg-[#181a24] border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 mb-14">
              <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#C6112F] bg-[#C6112F]/10 px-3.5 py-1 rounded-full inline-block mb-6">
                Outstanding Student Recognition
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

            {/* 2026 Photo Gallery */}
            <div className="mt-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                    2026 Event Photos & Student Moments
                  </h3>
                  <div className="w-12 h-[3px] bg-[#C6112F] rounded-full mt-2" />
                </div>

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

        {/* ═══════════════ 5. PREVIOUS YEARS SECTION (BOTTOM) ═══════════════ */}
        <section className="relative w-full py-16 sm:py-20 bg-white dark:bg-[#0f1117] border-b border-neutral-200/80 dark:border-neutral-800">
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
                Explore past student delegations, case study archives, and award recipient honors since the program's inaugural launch in 2023.
              </p>
            </div>

            {/* 3 Grid Cards for Previous Years */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 2025 Card */}
              <Link
                href="/past-years/2025"
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

              {/* 2024 Card */}
              <Link
                href="/past-years/2024"
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

              {/* 2023 Card */}
              <Link
                href="/past-years/2023"
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

        {/* ═══════════════ 6. CONTACT & SUPPORT FOOTER CTA ═══════════════ */}
        <section className="relative w-full py-16 sm:py-20 bg-[#0b0f19] text-white">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="bg-[#151821] border border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <h4 className="text-base font-extrabold text-[#ff4d6d] uppercase tracking-wider mb-2">
                  Contact Information & Student Inquiries
                </h4>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-light mb-4">
                  For additional details or questions regarding the sponsorship application process, please reach out to Sydney Schuch, Manager of Production Services:
                </p>
                <div className="inline-flex items-center gap-3 bg-neutral-900 border border-neutral-800 px-4 py-2.5 rounded-xl text-xs font-mono text-neutral-200">
                  <span>Sydney@irinc.ca</span>
                  <button
                    onClick={handleCopyEmail}
                    className="text-[#ff4d6d] hover:underline font-sans font-bold cursor-pointer"
                  >
                    {copiedEmail ? "✓ Copied!" : "Copy Email"}
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                <Link
                  href="/student/apply"
                  className="px-8 py-4 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-extrabold tracking-widest uppercase shadow-xl hover:scale-105 transition-all"
                >
                  Apply Now
                </Link>
                <span className="text-[11px] text-neutral-400 font-medium">
                  Applications for 2026 student cohort are open
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
