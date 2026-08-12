"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import {
  submitStudentRegistration,
  uploadStudentFile,
  StudentRegistrationError,
  MAX_UPLOAD_BYTES,
} from "@/lib/studentRegistrationApi";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  currentSchool: "",
  programAndYear: "",
  email: "",
  phone: "",
  language: "",
  signUpForNews: true,
  interestLetterText: "",
};

export default function StudentApplyPage() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [interestLetterFile, setInterestLetterFile] = useState<File | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [registrationNumber, setRegistrationNumber] = useState<string>("");

  const pickFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void
  ) => {
    const file = e.target.files?.[0] ?? null;
    if (file && file.size > MAX_UPLOAD_BYTES) {
      setSubmitError(`"${file.name}" is larger than 10MB. Please upload a smaller file.`);
      e.target.value = "";
      setFile(null);
      return;
    }
    setSubmitError("");
    setFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Files live in Strapi's media library; the entry references the upload id.
      const resumeUpload = resumeFile ? await uploadStudentFile(resumeFile) : null;
      const letterUpload = interestLetterFile
        ? await uploadStudentFile(interestLetterFile)
        : null;

      const result = await submitStudentRegistration({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        schoolInstitution: formData.currentSchool.trim(),
        programYearOfStudy: formData.programAndYear.trim(),
        preferredLanguage: formData.language,
        letterOfInterest: formData.interestLetterText.trim(),
        newsletterOptIn: formData.signUpForNews,
        ...(resumeUpload ? { resumeCv: resumeUpload.id } : {}),
        // The optional letter attachment goes into the collection's
        // "transcript" media field — the only other file slot it has.
        ...(letterUpload ? { transcript: letterUpload.id } : {}),
      });

      setRegistrationNumber(result.registrationNumber ?? "");
      setSubmitted(true);
      setFormData(EMPTY_FORM);
      setResumeFile(null);
      setInterestLetterFile(null);
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
      <main className="flex flex-col flex-grow w-full bg-[#fcfcfd] dark:bg-[#0c0d12] text-neutral-900 dark:text-neutral-100 selection:bg-[#C6112F] selection:text-white">
        {/* ═══════ HERO SECTION ═══════ */}
        <section className="relative w-full bg-[#0b0f19] overflow-hidden text-white pt-32 sm:pt-36 md:pt-44 pb-20 border-b border-neutral-800">
          {/* Ambient Lighting & Pattern Effects */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-[#C6112F]/20 blur-[140px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                {t("nav-home", "Home")}
              </Link>
              <span className="text-[#C6112F]">›</span>
              <Link href="/student" className="hover:text-white transition-colors">
                {t("student-breadcrumb-prog", "Student Sponsorship")}
              </Link>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white font-semibold">Application</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#C6112F]/15 border border-[#C6112F]/30 text-[#ff4d6d] text-xs font-bold tracking-widest uppercase mb-5 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#C6112F] animate-pulse" />
                  <span>CLASS OF 2026 OFFICIAL APPLICATION</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5">
                  Apply for THE Glencore{" "}
                  <span className="text-[#C6112F]">Sponsorship Program</span>
                </h1>

                <p className="text-neutral-300 text-base sm:text-lg font-normal leading-relaxed max-w-2xl">
                  Unlock fully funded attendance to Canada's Tier 1 global mining event in Quebec City. Open to university and college students in geology, finance, and engineering.
                </p>
              </div>

              {/* Quick Perks Bar */}
              <div className="lg:col-span-4 bg-neutral-900/80 border border-neutral-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl">
                <h3 className="text-xs font-extrabold text-[#ff4d6d] uppercase tracking-widest mb-4">
                  Sponsorship Perks Included
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-neutral-200">
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#C6112F]/20 text-[#ff4d6d] flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                    <span>100% Covered Conference Tuition Pass</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#C6112F]/20 text-[#ff4d6d] flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                    <span>Round-Trip Travel & Hotel Accommodation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#C6112F]/20 text-[#ff4d6d] flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                    <span>Executive Mentorship & Case Competition</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ APPLICATION FORM CONTAINER ═══════ */}
        <section className="relative w-full py-14 sm:py-24 bg-white dark:bg-[#0f1117]">
          <div className="max-w-[920px] mx-auto px-4 sm:px-6 md:px-8">
            {/* Visual Step Indicator Header */}
            {!submitted && (
              <div className="mb-10 grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <div className="text-[10px] font-black text-[#C6112F] uppercase tracking-widest">STEP 01</div>
                  <div className="text-xs font-bold text-neutral-800 dark:text-white mt-0.5">Contact Details</div>
                </div>
                <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <div className="text-[10px] font-black text-[#C6112F] uppercase tracking-widest">STEP 02</div>
                  <div className="text-xs font-bold text-neutral-800 dark:text-white mt-0.5">Academic Info</div>
                </div>
                <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <div className="text-[10px] font-black text-[#C6112F] uppercase tracking-widest">STEP 03</div>
                  <div className="text-xs font-bold text-neutral-800 dark:text-white mt-0.5">Resume & Letter</div>
                </div>
              </div>
            )}

            <div className="bg-white dark:bg-[#151821] border border-neutral-200/90 dark:border-neutral-800 rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0f1117] via-[#C6112F] to-[#0f1117]" />

              {submitted ? (
                /* ═══════ SUCCESS STATE ═══════ */
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-4xl font-black shadow-lg">
                    ✓
                  </div>
                  <h3 className="text-3xl font-black text-[#1a1f2c] dark:text-white mb-3">
                    {t("student-form-success-title", "Application Received!")}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm max-w-lg mx-auto mb-8 leading-relaxed font-medium">
                    {t(
                      "student-form-success-desc",
                      "Thank you for applying to THE Glencore Student Sponsorship Program. Our team will review your application and contact you with next steps shortly."
                    )}
                  </p>
                  {registrationNumber && (
                    <div className="max-w-xs mx-auto mb-8 px-5 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                      <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-1">
                        {t("student-form-reg-number", "Registration Number")}
                      </span>
                      <b className="text-xl font-black text-[#C6112F] tracking-wide">
                        {registrationNumber}
                      </b>
                    </div>
                  )}
                  <div className="flex flex-wrap justify-center gap-4">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setRegistrationNumber("");
                        setSubmitError("");
                      }}
                      className="px-7 py-3.5 rounded-xl bg-[#0f1117] dark:bg-white text-white dark:text-neutral-900 text-xs font-extrabold uppercase tracking-widest hover:bg-[#C6112F] dark:hover:bg-[#C6112F] dark:hover:text-white transition-all"
                    >
                      {t("student-form-another", "Submit Another Application")}
                    </button>
                    <Link
                      href="/student"
                      className="px-7 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-white text-xs font-extrabold uppercase tracking-widest hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                    >
                      Return to Student Overview
                    </Link>
                  </div>
                </div>
              ) : (
                /* ═══════ APPLICATION FORM ═══════ */
                <div>
                  <div className="mb-10 text-center sm:text-left">
                    <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block">
                      SPONSORSHIP FORM
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                      Complete Your Student Profile
                    </h2>
                    <div className="w-12 h-[3px] bg-[#C6112F] mt-3 rounded-full sm:mx-0 mx-auto" />
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* STEP 1: Personal Information */}
                    <div className="p-6 sm:p-7 rounded-2xl bg-neutral-50/80 dark:bg-neutral-900/50 border border-neutral-200/90 dark:border-neutral-800">
                      <div className="flex items-center gap-3 mb-6 pb-3 border-b border-neutral-200/80 dark:border-neutral-800">
                        <span className="w-8 h-8 rounded-xl bg-[#C6112F] text-white text-xs font-extrabold flex items-center justify-center shadow-md shadow-[#C6112F]/20">
                          1
                        </span>
                        <div>
                          <h4 className="text-sm font-extrabold uppercase tracking-wider text-neutral-900 dark:text-white">
                            Personal Information
                          </h4>
                          <p className="text-[11px] text-neutral-500 font-normal">Enter your contact details so we can reach you.</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                            {t("student-form-first-name", "First Name")}{" "}
                            <span className="text-[#C6112F] font-bold">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) =>
                              setFormData({ ...formData, firstName: e.target.value })
                            }
                            placeholder={t("student-form-first-name-ph", "e.g. Sarah")}
                            className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs sm:text-sm font-medium focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                            {t("student-form-last-name", "Last Name")}{" "}
                            <span className="text-[#C6112F] font-bold">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={(e) =>
                              setFormData({ ...formData, lastName: e.target.value })
                            }
                            placeholder={t("student-form-last-name-ph", "e.g. Jenkins")}
                            className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs sm:text-sm font-medium focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                            {t("student-form-email", "Email Address")}{" "}
                            <span className="text-[#C6112F] font-bold">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            placeholder={t("student-form-email-ph", "e.g. sarah@university.ca")}
                            className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs sm:text-sm font-medium focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                            {t("student-form-phone", "Phone Number")}{" "}
                            <span className="text-[#C6112F] font-bold">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            placeholder={t("student-form-phone-ph", "e.g. +1 (514) 555-0192")}
                            className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs sm:text-sm font-medium focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* STEP 2: Academic Background */}
                    <div className="p-6 sm:p-7 rounded-2xl bg-neutral-50/80 dark:bg-neutral-900/50 border border-neutral-200/90 dark:border-neutral-800">
                      <div className="flex items-center gap-3 mb-6 pb-3 border-b border-neutral-200/80 dark:border-neutral-800">
                        <span className="w-8 h-8 rounded-xl bg-[#C6112F] text-white text-xs font-extrabold flex items-center justify-center shadow-md shadow-[#C6112F]/20">
                          2
                        </span>
                        <div>
                          <h4 className="text-sm font-extrabold uppercase tracking-wider text-neutral-900 dark:text-white">
                            Academic & Language Profile
                          </h4>
                          <p className="text-[11px] text-neutral-500 font-normal">Tell us about your university/college program.</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                            {t("student-form-school", "Current School / Institution")}{" "}
                            <span className="text-[#C6112F] font-bold">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.currentSchool}
                            onChange={(e) =>
                              setFormData({ ...formData, currentSchool: e.target.value })
                            }
                            placeholder={t("student-form-school-ph", "e.g. Queen's University")}
                            className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs sm:text-sm font-medium focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                            {t("student-form-program", "Program & Year of Study")}
                          </label>
                          <input
                            type="text"
                            value={formData.programAndYear}
                            onChange={(e) =>
                              setFormData({ ...formData, programAndYear: e.target.value })
                            }
                            placeholder={t("student-form-program-ph", "e.g. Mining Engineering, 3rd Year")}
                            className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs sm:text-sm font-medium focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 outline-none transition-all"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                            {t("student-form-language", "Preferred Language")}
                          </label>
                          <select
                            value={formData.language}
                            onChange={(e) =>
                              setFormData({ ...formData, language: e.target.value })
                            }
                            className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs sm:text-sm font-semibold focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 outline-none transition-all cursor-pointer"
                          >
                            <option value="">{t("student-form-language-default", "Select language")}</option>
                            <option value="English">English</option>
                            <option value="French">Français</option>
                            <option value="Bilingual">Bilingual / Bilingue</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* STEP 3: Documents & Interest Letter */}
                    <div className="p-6 sm:p-7 rounded-2xl bg-neutral-50/80 dark:bg-neutral-900/50 border border-neutral-200/90 dark:border-neutral-800">
                      <div className="flex items-center gap-3 mb-6 pb-3 border-b border-neutral-200/80 dark:border-neutral-800">
                        <span className="w-8 h-8 rounded-xl bg-[#C6112F] text-white text-xs font-extrabold flex items-center justify-center shadow-md shadow-[#C6112F]/20">
                          3
                        </span>
                        <div>
                          <h4 className="text-sm font-extrabold uppercase tracking-wider text-neutral-900 dark:text-white">
                            Resume & Letter of Interest
                          </h4>
                          <p className="text-[11px] text-neutral-500 font-normal">Attach your CV and outline your career goals.</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {/* Resume File Upload */}
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                            {t("student-form-resume", "Upload Resume / CV")}{" "}
                            <span className="text-[#C6112F] font-bold">*</span>
                          </label>
                          <div className="relative border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-[#C6112F] rounded-2xl p-6 transition-all text-center bg-white dark:bg-neutral-900 group">
                            <input
                              type="file"
                              required={!resumeFile}
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => pickFile(e, setResumeFile)}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="flex flex-col items-center justify-center gap-2">
                              <div className="w-12 h-12 rounded-2xl bg-[#C6112F]/10 text-[#C6112F] flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5h10.5a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0017.25 4.5H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                              </div>
                              {resumeFile ? (
                                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                                  <span>✓ File Attached:</span> <span className="underline">{resumeFile.name}</span>
                                </span>
                              ) : (
                                <div>
                                  <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block mb-0.5">
                                    Click or Drag & Drop Resume File
                                  </span>
                                  <span className="text-[11px] text-neutral-500 font-normal block">
                                    PDF or DOCX format (Max 10MB)
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Letter of Interest */}
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                            {t("student-form-interest-letter", "Letter of Interest")}{" "}
                            <span className="text-[#C6112F] font-bold">*</span>
                          </label>
                          <textarea
                            rows={4}
                            required={!interestLetterFile}
                            value={formData.interestLetterText}
                            onChange={(e) =>
                              setFormData({ ...formData, interestLetterText: e.target.value })
                            }
                            placeholder={t("student-form-interest-ph", "Explain why you are interested in attending THE Glencore Student Sponsorship Program and your academic goals...")}
                            className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs sm:text-sm font-medium focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 outline-none transition-all resize-y mb-3"
                          />

                          {/* Optional Interest Letter Attachment */}
                          <div className="relative border border-neutral-300 dark:border-neutral-700 hover:border-[#C6112F] rounded-xl p-3.5 transition-colors text-center bg-white dark:bg-neutral-900">
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => pickFile(e, setInterestLetterFile)}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="flex items-center justify-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                              <svg className="w-4 h-4 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94a3 3 0 114.243 4.243L8.567 18.31a1.5 1.5 0 01-2.122-2.122l8.485-8.485" />
                              </svg>
                              {interestLetterFile ? (
                                <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                  <span>✓</span> <span>{interestLetterFile.name}</span>
                                </span>
                              ) : (
                                <span>{t("student-form-interest-file", "Or attach Letter of Interest file (PDF, DOCX)")}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Newsletter Checkbox */}
                        <div className="pt-2">
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
                            <span className="text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                              {t("student-form-news", "Sign up for news and updates regarding student programs")}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Submission Error Alert */}
                    {submitError && (
                      <div
                        role="alert"
                        className="px-5 py-4 rounded-2xl bg-rose-500/10 border border-[#C6112F]/40 text-[#C6112F] dark:text-rose-400 text-xs sm:text-sm font-semibold leading-relaxed"
                      >
                        {submitError}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4.5 rounded-2xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs sm:text-sm font-black tracking-[0.15em] uppercase shadow-xl shadow-[#C6112F]/30 transition-all duration-300 flex items-center justify-center gap-3 enabled:hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting && (
                        <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      )}
                      <span>
                        {isSubmitting
                          ? t("student-form-submitting", "Submitting Application…")
                          : t("student-form-submit", "Submit Student Sponsorship Application")}
                      </span>
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Application FAQs Section */}
            <div className="mt-16 pt-12 border-t border-neutral-200 dark:border-neutral-800">
              <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block text-center">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h3 className="text-2xl font-black text-center mb-8">Application Guidelines</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <h4 className="text-sm font-bold text-[#1a1f2c] dark:text-white mb-2">Who is eligible to apply?</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Full-time post-secondary university or college students studying geology, earth sciences, mining engineering, metallurgy, or finance across Canadian institutions.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <h4 className="text-sm font-bold text-[#1a1f2c] dark:text-white mb-2">What does sponsorship cover?</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    100% of your conference ticket, technical session passes, round-trip travel arrangements to Quebec City, and hotel stay throughout the event.
                  </p>
                </div>
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
