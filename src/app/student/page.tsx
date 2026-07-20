"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

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

export default function StudentPage() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-white">
        {/* ═══════ HERO ═══════ */}
        <section className="relative w-full bg-[#0f1117] overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#C6112F]/15 via-transparent to-transparent" />
          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-40 pb-14 sm:pb-18 md:pb-20">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 mb-6">
              <a href="/" className="hover:text-white transition-colors">{t("nav-home", "Home")}</a>
              <span className="text-[#C6112F]">›</span>
              <span className="text-neutral-500">{t("student-breadcrumb-init", "Initiatives")}</span>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white">{t("student-breadcrumb-prog", "Student Sponsorship Program")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
              {t("student-hero-title-1", "THE Student")} <span className="text-[#C6112F]">{t("student-hero-title-2", "Sponsorship Program")}</span>
            </h1>
            <div className="w-20 h-[3px] bg-[#C6112F] mt-6" />
          </div>
        </section>

        {/* ═══════ PROGRAM OVERVIEW SECTION ═══════ */}
        <section className="relative w-full py-16 sm:py-20 md:py-24">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Side Image */}
              <div className="lg:col-span-5 relative group">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-200">
                  <img
                    src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=900&q=70"
                    alt="Glencore Student Sponsorship Program"
                    className="w-full h-[380px] sm:h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                {/* Floating stat card overlay */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl border border-neutral-100 hidden sm:flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#C6112F]/10 flex items-center justify-center text-[#C6112F] font-black text-xl">
                    50
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">SPONSORED</div>
                    <div className="text-sm font-black text-[#1a1f2c]">Fully Funded Students</div>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-7">
                <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
                  {t("student-tag-label", "BECOME THE FUTURE OF MINING")}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1a1f2c] tracking-tight mb-4 leading-tight">
                  {t("student-main-subtitle", "Apply now for THE Glencore Student Sponsorship Class of 2026")}
                </h2>
                <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-6" />

                <div className="space-y-4 text-neutral-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    {t(
                      "student-body-p1",
                      "THE Glencore Student Sponsorship Program aims to offer a one-of-a-kind exposure to the mining industry through participation in THE Mining Investment Event (THE Event), Canada's only Tier 1 global mining investment conference, held from June 1–3, 2027, in Quebec City. This annual event serves as a nexus for industry leaders and investors, providing a platform for knowledge exchange, networking, and immersive learning. The Program is now recognized as one of the largest fully funded conference programs in Canada."
                    )}
                  </p>
                  <p>
                    {t(
                      "student-body-p2",
                      "Up to 50 university or college students with a passion for geology, finance, engineering, or related fields will have the chance to attend the conference at no cost. Our goal is to foster experiential learning by exposing students to keynote speakers, industry panels, professional meet-and-greets, a case study competition, and various networking events. Through these avenues, we hope to instill a sense of global interconnectedness within the Canadian mining industry while investing in the development of the next generation of talented individuals."
                    )}
                  </p>
                </div>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="https://www.themininginvestmentevent.com/student-application-form"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-bold tracking-[0.15em] uppercase shadow-lg shadow-[#C6112F]/20 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <span>{t("student-cta-apply", "Apply Here")}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                  <a
                    href="https://www.themininginvestmentevent.com/s/LetterfromOurCEO-FINAL-2025-1-FR-6j3d.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-xl border border-neutral-300 hover:border-[#C6112F] text-neutral-800 hover:text-[#C6112F] text-xs font-bold tracking-[0.15em] uppercase hover:bg-neutral-50 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <span>{t("student-cta-letter", "Letter from our CEO ↗")}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ 2025 AWARD RECIPIENTS SECTION ═══════ */}
        <section className="relative w-full bg-[#f8f9fa] py-16 sm:py-20 md:py-24 border-t border-neutral-200/60">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("student-awards-label", "2025 Award Recipients")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] tracking-tight mb-3">
              {t("student-awards-title-1", "THE Glencore Student Sponsorship")}{" "}
              <span className="text-[#C6112F]">{t("student-awards-title-2", "Program 2025 Award Recipients")}</span>
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-12" />

            {/* MVP Card */}
            <div className="bg-white border border-neutral-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 mb-8">
              <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#C6112F] bg-[#C6112F]/10 px-3.5 py-1 rounded-full inline-block mb-4">
                {t("student-mvp-label", "MVP — Selected by the Students")}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1a1f2c] mb-1">
                Anna Dalton-Framst
              </h3>
              <p className="text-neutral-500 text-sm font-medium">University of Ottawa</p>
            </div>

            {/* Winning Team 9 */}
            <div className="bg-white border border-neutral-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 mb-8">
              <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#C6112F] bg-[#C6112F]/10 px-3.5 py-1 rounded-full inline-block mb-6">
                {t("student-winning-team-label", "Winning Team — Team 9")}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {winningTeamMembers.map((member, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/60 hover:border-[#C6112F]/40 hover:bg-white transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#C6112F]/10 text-[#C6112F] font-bold text-xs flex items-center justify-center mb-3">
                      0{i + 1}
                    </div>
                    <div className="text-base font-black text-[#1a1f2c] mb-1">{member.name}</div>
                    <div className="text-xs text-neutral-500 font-medium">{member.school}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outstanding Students */}
            <div className="bg-white border border-neutral-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 mb-12">
              <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#C6112F] bg-[#C6112F]/10 px-3.5 py-1 rounded-full inline-block mb-6">
                {t("student-outstanding-label", "Outstanding Students")}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {outstandingStudents.map((std, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/60">
                    <div className="text-lg font-black text-[#1a1f2c] mb-1">{std.name}</div>
                    <div className="text-xs text-neutral-500 font-medium">{std.school}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact & Info Box */}
            <div className="bg-[#0f1117] text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-neutral-800">
              <h4 className="text-lg font-bold text-[#C6112F] mb-3 uppercase tracking-wider">
                {t("student-contact-title", "Contact Information")}
              </h4>
              <p className="text-neutral-300 text-sm leading-relaxed font-light mb-4">
                {t(
                  "student-contact-desc",
                  "For more information, please contact Sydney Schuch, Manager of Production Services, IR.INC & VID Media Inc. —"
                )}{" "}
                <a href="mailto:Sydney@irinc.ca" className="text-[#C6112F] font-bold hover:underline">
                  Sydney@irinc.ca
                </a>
              </p>
              <div className="pt-4 border-t border-neutral-800 text-neutral-400 text-xs leading-relaxed">
                {t(
                  "student-closing-note",
                  "We thank all of our students, past and present, who have attended our program. Applications for the Class of 2026 will commence in November 2025. We look forward to hosting the new class of 2026 in beautiful Quebec City."
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
