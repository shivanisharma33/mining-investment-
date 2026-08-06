"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import {
  submitStudentRegistration,
  StudentRegistrationError,
} from "@/lib/studentRegistrationApi";

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

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    currentSchool: "",
    programAndYear: "",
    email: "",
    phone: "",
    language: "",
    signUpForNews: true,
    resumeFileName: "",
    resumeData: "",
    interestLetterText: "",
    interestLetterFileName: "",
    interestLetterData: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [registrationNumber, setRegistrationNumber] = useState<string>("");

  const scrollToForm = () => {
    const formElement = document.getElementById("student-application-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const result = await submitStudentRegistration({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        currentSchool: formData.currentSchool.trim(),
        programAndYear: formData.programAndYear.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        language: formData.language,
        signUpForNews: formData.signUpForNews,
        resume: formData.resumeData || formData.resumeFileName,
        resumeFileName: formData.resumeFileName,
        interestLetter: formData.interestLetterText || formData.interestLetterData,
        interestLetterFileName: formData.interestLetterFileName,
      });

      setRegistrationNumber(result.registrationNumber ?? "");
      setSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        currentSchool: "",
        programAndYear: "",
        email: "",
        phone: "",
        language: "",
        signUpForNews: true,
        resumeFileName: "",
        resumeData: "",
        interestLetterText: "",
        interestLetterFileName: "",
        interestLetterData: "",
      });
    } catch (err) {
      const fieldMessage =
        err instanceof StudentRegistrationError && err.fieldErrors.length > 0
          ? err.fieldErrors.map((fe) => fe.message).join(" · ")
          : "";
      setSubmitError(
        fieldMessage ||
        (err instanceof Error ? err.message : "Something went wrong. Please try again.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <span className="text-white font-semibold">{t("student-breadcrumb-prog", "Student Sponsorship Program")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
              {t("student-hero-title-1", "THE Student")} <span className="text-[#C6112F]">{t("student-hero-title-2", "Sponsorship Program")}</span>
            </h1>
            <div className="w-20 h-[3.5px] bg-[#C6112F] rounded-full mt-6" />
          </div>
        </section>

        {/* ═══════ PROGRAM OVERVIEW SECTION ═══════ */}
        <section className="relative w-full py-16 sm:py-20 md:py-24">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Side Image */}
              <div className="lg:col-span-5 relative group">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/90 dark:border-zinc-800 bg-neutral-900">
                  <img
                    src="/student-hero.jpg"
                    alt="THE Glencore Student Sponsorship Program Award Ceremony"
                    className="w-full aspect-[16/11] sm:aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>
                {/* Floating stat card overlay */}
                <div className="absolute -bottom-5 -right-5 bg-white dark:bg-[#18181b] rounded-2xl p-4 shadow-2xl border border-neutral-200 dark:border-zinc-800 flex items-center gap-3.5 z-20">
                  <div className="w-10 h-10 rounded-xl bg-[#C6112F]/10 text-[#C6112F] flex items-center justify-center font-black text-lg">
                    50
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">SPONSORED</div>
                    <div className="text-xs sm:text-sm font-black text-[#1a1f2c] dark:text-white">Fully Funded Students</div>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-7">
                <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
                  {t("student-tag-label", "BECOME THE FUTURE OF MINING")}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1a1f2c] dark:text-white tracking-tight mb-4 leading-tight">
                  {t("student-main-subtitle", "Apply now for THE Glencore Student Sponsorship Class of 2026")}
                </h2>
                <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-6" />

                <div className="space-y-4 text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed text-pretty">
                  <p>
                    {t(
                      "student-body-p1",
                      "THE Glencore Student Sponsorship Program aims to offer a one-of-a-kind exposure to the mining industry through participation in THE Mining Investment Event (THE Event), Canada's only Tier 1 global mining investment conference, held from June 1–3, 2027, in Quebec City. This annual event serves as a nexus for industry leaders and investors, providing a platform for knowledge exchange, networking, and immersive learning."
                    )}{" "}
                    {t(
                      "student-body-p1-sub",
                      "The Program is now recognized as one of the largest fully funded conference programs in Canada."
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
                  <button
                    onClick={scrollToForm}
                    className="px-6 py-3.5 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-bold tracking-[0.15em] uppercase shadow-lg shadow-[#C6112F]/20 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <span>{t("student-cta-apply", "Apply Here")}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                  <a
                    href="https://www.themininginvestmentevent.com/s/LetterfromOurCEO-FINAL-2025-1-FR-6j3d.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-xl border border-neutral-300 hover:border-[#C6112F] text-neutral-800 dark:text-white hover:text-[#C6112F] text-xs font-bold tracking-[0.15em] uppercase hover:bg-neutral-50 dark:hover:bg-zinc-800 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <span>{t("student-cta-letter", "Letter from our CEO ↗")}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ STUDENT APPLICATION FORM SECTION ═══════ */}
        <section
          id="student-application-form"
          className="relative w-full py-16 sm:py-20 md:py-24 bg-white border-t border-neutral-200"
        >
          <div className="max-w-[860px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0f1117] via-[#C6112F] to-[#0f1117]" />

              {submitted ? (
                /* ═══════ SUCCESS STATE ═══════ */
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 text-3xl font-black shadow-lg">
                    ✓
                  </div>
                  <h3 className="text-3xl font-black text-[#1a1f2c] mb-3">
                    {t("student-form-success-title", "Application Received!")}
                  </h3>
                  <p className="text-neutral-600 text-sm max-w-lg mx-auto mb-8 leading-relaxed font-medium">
                    {t(
                      "student-form-success-desc",
                      "Thank you for applying to THE Glencore Student Sponsorship Program. Our team will review your application and contact you with next steps shortly."
                    )}
                  </p>
                  {registrationNumber && (
                    <div className="max-w-xs mx-auto mb-8 px-5 py-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                      <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1">
                        {t("student-form-reg-number", "Registration Number")}
                      </span>
                      <b className="text-lg font-black text-[#1a1f2c] tracking-wide">
                        {registrationNumber}
                      </b>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setRegistrationNumber("");
                      setSubmitError("");
                    }}
                    className="px-8 py-3.5 rounded-xl bg-[#0f1117] text-white text-xs font-extrabold uppercase tracking-widest hover:bg-[#C6112F] transition-all"
                  >
                    {t("student-form-another", "Submit Another Application")}
                  </button>
                </div>
              ) : (
                /* ═══════ APPLICATION FORM ═══════ */
                <div>
                  <div className="text-center mb-10">
                    <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
                      {t("student-form-tag", "CLASS OF 2026 APPLICATION")}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#1a1f2c] tracking-tight">
                      {t("student-form-title", "Student Sponsorship Application")}
                    </h3>
                    <div className="w-12 h-[3px] bg-[#C6112F] mx-auto mt-3 rounded-full" />
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name: First Name & Last Name (Required) */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
                        {t("student-form-name-label", "Name")}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                            {t("student-form-first-name", "First Name")}{" "}
                            <span className="text-[#C6112F] font-bold">
                              ({t("student-form-required", "required")})
                            </span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) =>
                              setFormData({ ...formData, firstName: e.target.value })
                            }
                            placeholder={t("student-form-first-name-ph", "e.g. Sarah")}
                            className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-medium outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                            {t("student-form-last-name", "Last Name")}{" "}
                            <span className="text-[#C6112F] font-bold">
                              ({t("student-form-required", "required")})
                            </span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={(e) =>
                              setFormData({ ...formData, lastName: e.target.value })
                            }
                            placeholder={t("student-form-last-name-ph", "e.g. Jenkins")}
                            className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-medium outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Current School (Required) */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                        {t("student-form-school", "Current School")}{" "}
                        <span className="text-[#C6112F] font-bold">
                          ({t("student-form-required", "required")})
                        </span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.currentSchool}
                        onChange={(e) =>
                          setFormData({ ...formData, currentSchool: e.target.value })
                        }
                        placeholder={t("student-form-school-ph", "e.g. Queen's University")}
                        className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-medium outline-none transition-all"
                      />
                    </div>

                    {/* Program and Year */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                        {t("student-form-program", "Program and Year")}
                      </label>
                      <input
                        type="text"
                        value={formData.programAndYear}
                        onChange={(e) =>
                          setFormData({ ...formData, programAndYear: e.target.value })
                        }
                        placeholder={t("student-form-program-ph", "e.g. Mining Engineering, 3rd Year")}
                        className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-medium outline-none transition-all"
                      />
                    </div>

                    {/* Email (Required) */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                        {t("student-form-email", "Email")}{" "}
                        <span className="text-[#C6112F] font-bold">
                          ({t("student-form-required", "required")})
                        </span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder={t("student-form-email-ph", "e.g. sarah@university.ca")}
                        className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-medium outline-none transition-all"
                      />
                    </div>

                    {/* Newsletter Checkbox */}
                    <div className="pt-1">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.signUpForNews}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              signUpForNews: e.target.checked,
                            })
                          }
                          className="w-4 h-4 text-[#C6112F] rounded border-neutral-300 focus:ring-[#C6112F]"
                        />
                        <span className="text-xs sm:text-sm font-semibold text-neutral-700">
                          {t("student-form-news", "Sign up for news and updates")}
                        </span>
                      </label>
                    </div>

                    {/* Phone Number (Required) */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                        {t("student-form-phone", "Phone Number")}{" "}
                        <span className="text-[#C6112F] font-bold">
                          ({t("student-form-required", "required")})
                        </span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder={t("student-form-phone-ph", "e.g. +1 (514) 555-0192")}
                        className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-medium outline-none transition-all"
                      />
                    </div>

                    {/* Language (Dropdown) */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                        {t("student-form-language", "Language")}
                      </label>
                      <select
                        value={formData.language}
                        onChange={(e) =>
                          setFormData({ ...formData, language: e.target.value })
                        }
                        className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-bold outline-none transition-all bg-white cursor-pointer"
                      >
                        <option value="">{t("student-form-language-default", "Select an option")}</option>
                        <option value="English">English</option>
                        <option value="French">Français</option>
                        <option value="Bilingual">Bilingual / Bilingue</option>
                      </select>
                    </div>

                    {/* Resume / CV Field (Required) */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                        {t("student-form-resume", "Upload Resume / CV")}{" "}
                        <span className="text-[#C6112F] font-bold">
                          ({t("student-form-required", "required")})
                        </span>
                      </label>
                      <div className="relative border-2 border-dashed border-neutral-300 hover:border-[#C6112F] rounded-xl p-4 transition-colors text-center bg-slate-50/50">
                        <input
                          type="file"
                          required={!formData.resumeFileName}
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setFormData((prev) => ({
                                  ...prev,
                                  resumeFileName: file.name,
                                  resumeData: reader.result as string,
                                }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex flex-col items-center justify-center gap-1">
                          <svg className="w-6 h-6 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5h10.5a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0017.25 4.5H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
                          </svg>
                          {formData.resumeFileName ? (
                            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                              <span>✓</span> <span>{formData.resumeFileName}</span>
                            </span>
                          ) : (
                            <span className="text-xs text-neutral-600 font-medium">
                              {t("student-form-resume-ph", "Click or drag your Resume file (PDF, DOCX up to 10MB)")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Letter of Interest Field (Required) */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                        {t("student-form-interest-letter", "Letter of Interest")}{" "}
                        <span className="text-[#C6112F] font-bold">
                          ({t("student-form-required", "required")})
                        </span>
                      </label>
                      <textarea
                        rows={4}
                        required={!formData.interestLetterFileName}
                        value={formData.interestLetterText}
                        onChange={(e) => setFormData({ ...formData, interestLetterText: e.target.value })}
                        placeholder={t("student-form-interest-ph", "Explain why you are interested in attending THE Glencore Student Sponsorship Program and your academic goals...")}
                        className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-medium outline-none transition-all resize-y mb-2"
                      />

                      {/* Optional Interest Letter File Upload */}
                      <div className="relative border border-neutral-300 hover:border-[#C6112F] rounded-xl p-3 transition-colors text-center bg-slate-50/50">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setFormData((prev) => ({
                                  ...prev,
                                  interestLetterFileName: file.name,
                                  interestLetterData: reader.result as string,
                                }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex items-center justify-center gap-2 text-xs text-neutral-600 font-medium">
                          <svg className="w-4 h-4 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94a3 3 0 114.243 4.243L8.567 18.31a1.5 1.5 0 01-2.122-2.122l8.485-8.485" />
                          </svg>
                          {formData.interestLetterFileName ? (
                            <span className="font-bold text-emerald-700 flex items-center gap-1">
                              <span>✓</span> <span>{formData.interestLetterFileName}</span>
                            </span>
                          ) : (
                            <span>{t("student-form-interest-file", "Or attach Letter of Interest file (PDF, DOCX)")}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Submission Error */}
                    {submitError && (
                      <div
                        role="alert"
                        className="px-5 py-4 rounded-2xl bg-rose-50 border border-[#C6112F]/30 text-[#8a091e] text-xs sm:text-sm font-semibold leading-relaxed"
                      >
                        {submitError}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-2xl bg-[#C6112F] text-white text-xs sm:text-sm font-black tracking-[0.15em] uppercase shadow-lg shadow-[#C6112F]/25 transition-all duration-300 flex items-center justify-center gap-3 enabled:hover:bg-[#a50e27] enabled:hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting && (
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      )}
                      <span>
                        {isSubmitting
                          ? t("student-form-submitting", "Submitting…")
                          : t("student-form-submit", "Submit")}
                      </span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ═══════ 2025 AWARD RECIPIENTS SECTION ═══════ */}
        <section className="relative w-full bg-[#f8f9fa] dark:bg-[#121215] py-16 sm:py-20 md:py-24 border-t border-neutral-200/60 dark:border-zinc-800">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("student-awards-label", "2025 Award Recipients")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] dark:text-white tracking-tight mb-3">
              {t("student-awards-title-1", "THE Glencore Student Sponsorship")}{" "}
              <span className="text-[#C6112F]">{t("student-awards-title-2", "Program 2025 Award Recipients")}</span>
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-12" />

            {/* MVP Card */}
            <div className="bg-white dark:bg-[#18181b] border border-neutral-200/80 dark:border-zinc-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 mb-8">
              <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#C6112F] bg-[#C6112F]/10 px-3.5 py-1 rounded-full inline-block mb-4">
                {t("student-mvp-label", "MVP — Selected by the Students")}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1a1f2c] dark:text-white mb-1">
                Anna Dalton-Framst
              </h3>
              <p className="text-neutral-500 dark:text-zinc-400 text-sm font-medium">University of Ottawa</p>
            </div>

            {/* Winning Team 9 */}
            <div className="bg-white dark:bg-[#18181b] border border-neutral-200/80 dark:border-zinc-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 mb-8">
              <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#C6112F] bg-[#C6112F]/10 px-3.5 py-1 rounded-full inline-block mb-6">
                {t("student-winning-team-label", "Winning Team — Team 9")}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {winningTeamMembers.map((member, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-neutral-50 dark:bg-zinc-900/60 border border-neutral-200/60 dark:border-zinc-800 hover:border-[#C6112F]/40 hover:bg-white dark:hover:bg-zinc-900 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#C6112F]/10 text-[#C6112F] font-bold text-xs flex items-center justify-center mb-3">
                      0{i + 1}
                    </div>
                    <div className="text-base font-black text-[#1a1f2c] dark:text-white mb-1">{member.name}</div>
                    <div className="text-xs text-neutral-500 dark:text-zinc-400 font-medium">{member.school}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outstanding Students */}
            <div className="bg-white dark:bg-[#18181b] border border-neutral-200/80 dark:border-zinc-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 mb-12">
              <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#C6112F] bg-[#C6112F]/10 px-3.5 py-1 rounded-full inline-block mb-6">
                {t("student-outstanding-label", "Outstanding Students")}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {outstandingStudents.map((std, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-neutral-50 dark:bg-zinc-900/60 border border-neutral-200/60 dark:border-zinc-800">
                    <div className="text-lg font-black text-[#1a1f2c] dark:text-white mb-1">{std.name}</div>
                    <div className="text-xs text-neutral-500 dark:text-zinc-400 font-medium">{std.school}</div>
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
