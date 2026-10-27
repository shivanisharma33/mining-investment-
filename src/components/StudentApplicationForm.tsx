"use client";

import React, { useState, useId, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  submitStudentRegistration,
  uploadStudentFile,
  StudentRegistrationError,
  MAX_UPLOAD_BYTES,
} from "@/lib/studentRegistrationApi";

interface StudentApplicationFormProps {
  onSuccess?: (refNumber: string) => void;
  className?: string;
  showBackToOverview?: boolean;
}

const CANADIAN_PROVINCES = [
  { en: "Alberta", fr: "Alberta" },
  { en: "British Columbia", fr: "Colombie-Britannique" },
  { en: "Manitoba", fr: "Manitoba" },
  { en: "New Brunswick", fr: "Nouveau-Brunswick" },
  { en: "Newfoundland and Labrador", fr: "Terre-Neuve-et-Labrador" },
  { en: "Nova Scotia", fr: "Nouvelle-Écosse" },
  { en: "Ontario", fr: "Ontario" },
  { en: "Prince Edward Island", fr: "Île-du-Prince-Édouard" },
  { en: "Quebec", fr: "Québec" },
  { en: "Saskatchewan", fr: "Saskatchewan" },
  { en: "Northwest Territories", fr: "Territoires du Nord-Ouest" },
  { en: "Nunavut", fr: "Nunavut" },
  { en: "Yukon", fr: "Yukon" },
  { en: "Other / Outside Canada", fr: "Autre / Hors du Canada" },
];

const DEGREE_LEVELS = [
  { id: "Bachelors", labelEn: "Bachelors", labelFr: "Baccalauréat" },
  { id: "Masters", labelEn: "Masters", labelFr: "Maîtrise" },
  { id: "PhD", labelEn: "PhD", labelFr: "Doctorat" },
];

const LANGUAGE_OPTIONS = [
  { id: "French", labelEn: "French", labelFr: "Français" },
  { id: "English", labelEn: "English", labelFr: "Anglais" },
  { id: "Both", labelEn: "Both", labelFr: "Les deux" },
];

const EMPTY_FORM = {
  // 1. Student Information
  fullName: "",
  email: "",
  phone: "",
  language: "French",
  linkedinProfile: "",

  // 2. Schooling Details
  collegeUniversity: "",
  province: "",
  degreeLevel: "Bachelors",
  areaOfStudy: "",
  expectedGraduationDate: "",

  // 3. Application Questions (500 word max)
  whyAttend: "",
  uniqueSkills: "",
  futureGoals: "",

  // 4. Availability & Logistics
  availableDates: "Yes",
  travelManagement: "Yes",
  travelOrigin: "",
  commitmentAgreed: "Yes",

  // Newsletter
  signUpForNews: true,
};

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

export default function StudentApplicationForm({
  onSuccess,
  className = "",
  showBackToOverview = true,
}: StudentApplicationFormProps) {
  const { lang, isFr } = useLanguage();
  const formId = useId();

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [applicationRef, setApplicationRef] = useState<string>("");

  // Sync initial language preference with current app language if untouched
  useEffect(() => {
    setFormData((prev) => {
      if (prev.fullName === "" && prev.email === "") {
        return {
          ...prev,
          language: isFr ? "French" : "English",
        };
      }
      return prev;
    });
  }, [isFr]);

  const wordsWhyAttend = countWords(formData.whyAttend);
  const wordsUniqueSkills = countWords(formData.uniqueSkills);
  const wordsFutureGoals = countWords(formData.futureGoals);

  const isWhyAttendOver = wordsWhyAttend > 500;
  const isUniqueSkillsOver = wordsUniqueSkills > 500;
  const isFutureGoalsOver = wordsFutureGoals > 500;
  const hasWordLimitError = isWhyAttendOver || isUniqueSkillsOver || isFutureGoalsOver;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file && file.size > MAX_UPLOAD_BYTES) {
      setSubmitError(
        isFr
          ? `« ${file.name} » dépasse la limite de 10 Mo. Veuillez téléverser un fichier plus petit.`
          : `"${file.name}" exceeds the 10MB limit. Please upload a smaller document.`
      );
      e.target.value = "";
      setResumeFile(null);
      return;
    }
    setSubmitError("");
    setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (hasWordLimitError) {
      setSubmitError(
        isFr
          ? "Veuillez vous assurer que toutes les réponses respectent la limite de 500 mots."
          : "Please ensure all essay responses are within the 500-word limit."
      );
      return;
    }

    if (!resumeFile) {
      setSubmitError(
        isFr
          ? "Veuillez téléverser votre curriculum vitae (CV)."
          : "Please upload your resume / CV document."
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // 1. Upload resume to Strapi Media Library
      const resumeUpload = await uploadStudentFile(resumeFile);

      // 2. Submit student application
      const result = await submitStudentRegistration({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        language: formData.language,
        preferredLanguage: formData.language,
        linkedinProfile: formData.linkedinProfile.trim(),
        collegeUniversity: formData.collegeUniversity.trim(),
        province: formData.province,
        degreeLevel: formData.degreeLevel,
        areaOfStudy: formData.areaOfStudy.trim(),
        expectedGraduationDate: formData.expectedGraduationDate.trim(),
        whyAttend: formData.whyAttend.trim(),
        uniqueSkills: formData.uniqueSkills.trim(),
        futureGoals: formData.futureGoals.trim(),
        availableDates: formData.availableDates,
        travelManagement: formData.travelManagement,
        travelOrigin: formData.travelOrigin.trim(),
        commitmentAgreed: formData.commitmentAgreed,
        newsletterOptIn: formData.signUpForNews,
        resumeCv: resumeUpload.id,
      });

      const refNum = result.registrationNumber || `STU-${Date.now().toString().slice(-6)}`;
      setApplicationRef(refNum);
      setSubmitted(true);
      if (onSuccess) onSuccess(refNum);
    } catch (err) {
      console.error("Student registration failed:", err);
      if (err instanceof StudentRegistrationError) {
        if (err.fieldErrors.length > 0) {
          setSubmitError(err.fieldErrors.map((f) => f.message).join(" · "));
        } else {
          setSubmitError(err.message);
        }
      } else if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError(
          isFr
            ? "Une erreur inattendue est survenue. Veuillez vérifier votre connexion et réessayer."
            : "An unexpected error occurred. Please check your connection and try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      ...EMPTY_FORM,
      language: isFr ? "French" : "English",
    });
    setResumeFile(null);
    setSubmitted(false);
    setSubmitError("");
    setApplicationRef("");
  };

  if (submitted) {
    return (
      <div className={`bg-white dark:bg-[#151821] border border-neutral-200/90 dark:border-neutral-800 rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden text-center ${className}`}>
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-[#C6112F] to-emerald-500" />

        <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 text-4xl font-black shadow-lg animate-bounce">
          ✓
        </div>

        <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#C6112F] bg-[#C6112F]/10 px-4 py-1.5 rounded-full inline-block mb-3">
          {isFr ? "Candidature Reçue" : "Application Received"}
        </span>

        <h3 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight mb-4">
          {isFr ? "Merci d'avoir postulé !" : "Thank You for Applying!"}
        </h3>

        <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed font-normal">
          {isFr ? (
            <>
              Votre candidature pour le <strong className="text-neutral-900 dark:text-white">Programme de Partenariat Étudiant</strong> a été enregistrée avec succès dans notre portail d'évaluation.
            </>
          ) : (
            <>
              Your application for <strong className="text-neutral-900 dark:text-white">THE Student Partnership Program</strong> has been successfully registered in our candidate review portal.
            </>
          )}
        </p>

        {applicationRef && (
          <div className="max-w-md mx-auto mb-8 p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-inner">
            <span className="block text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 mb-1">
              {isFr ? "Numéro de référence de candidature" : "Application Reference Number"}
            </span>
            <b className="text-2xl sm:text-3xl font-black text-[#C6112F] tracking-wider font-mono">
              {applicationRef}
            </b>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-2 font-medium">
              {isFr
                ? "Veuillez conserver ce numéro de référence pour toute correspondance future avec notre comité de coordination."
                : "Please save this reference number for all future communications with our student delegation coordinators."}
            </p>
          </div>
        )}

        <div className="max-w-md mx-auto mb-10 p-5 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 text-left">
          <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C6112F]" />
            {isFr ? "Prochaines étapes :" : "What Happens Next?"}
          </h4>
          <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-2 list-disc list-inside">
            {isFr ? (
              <>
                <li>Notre comité exécutif de sélection examine attentivement tous les dossiers et CV.</li>
                <li>Les candidats retenus recevront leur confirmation et l'horaire de l'autocar.</li>
                <li>Les annonces officielles de la cohorte seront communiquées directement par courriel.</li>
              </>
            ) : (
              <>
                <li>Our executive selection committee evaluates all candidate responses and resumes.</li>
                <li>Selected candidates will receive travel confirmation and coach bus schedule details.</li>
                <li>Cohort announcements will be sent directly via email.</li>
              </>
            )}
          </ul>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleReset}
            className="px-8 py-4 rounded-xl bg-[#0f1117] dark:bg-white text-white dark:text-neutral-900 text-xs font-black uppercase tracking-widest hover:bg-[#C6112F] dark:hover:bg-[#C6112F] dark:hover:text-white transition-all duration-300 cursor-pointer shadow-lg"
          >
            {isFr ? "Soumettre une autre candidature" : "Submit Another Application"}
          </button>
          {showBackToOverview && (
            <Link
              href="/student"
              className="px-8 py-4 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-white text-xs font-black uppercase tracking-widest hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300"
            >
              {isFr ? "Retour à l'aperçu étudiant" : "Back to Student Overview"}
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-[#151821] border border-neutral-200/90 dark:border-neutral-800 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden ${className}`}>
      {/* Top Gradient Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0f1117] via-[#C6112F] to-[#0f1117]" />

      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C6112F]/10 border border-[#C6112F]/30 text-[#C6112F] dark:text-[#ff4d6d] text-xs font-black uppercase tracking-widest mb-3">
          <span className="w-2 h-2 rounded-full bg-[#C6112F] animate-pulse" />
          <span>{isFr ? "Formulaire officiel de candidature" : "Official Application Form"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
          {isFr ? "Postuler au Programme de Partenariat Étudiant" : "Apply to THE Student Partnership Program"}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 font-normal max-w-2xl">
          {isFr
            ? "Remplissez les sections ci-dessous pour postuler au programme de conférence minière entièrement financé pour étudiants à Québec."
            : "Complete the sections below to apply for Canada's premier fully funded student mining conference experience in Québec City."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10" id={`student-app-form-${formId}`}>
        {/* ═══════════ 1. STUDENT INFORMATION ═══════════ */}
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-50/80 dark:bg-neutral-900/50 border border-neutral-200/90 dark:border-neutral-800 transition-all">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-200/80 dark:border-neutral-800">
            <span className="w-8 h-8 rounded-xl bg-[#C6112F] text-white text-xs font-black flex items-center justify-center shadow-md shadow-[#C6112F]/20">
              1
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-neutral-900 dark:text-white">
                {isFr ? "Informations sur l'étudiant" : "Student Information"}
              </h3>
              <p className="text-[11px] text-neutral-500 font-normal">
                {isFr
                  ? "Vos coordonnées directes et vos antécédents professionnels."
                  : "Your direct contact details and professional background."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                {isFr ? "Nom complet" : "Full Name"} <span className="text-[#C6112F]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder={isFr ? "ex. Sarah Tremblay" : "e.g. Sarah Tremblay"}
                className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs sm:text-sm font-medium focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 outline-none transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                {isFr ? "Adresse courriel" : "Email Address"} <span className="text-[#C6112F]">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={isFr ? "ex. sarah.tremblay@universite.ca" : "e.g. sarah.tremblay@university.ca"}
                className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs sm:text-sm font-medium focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 outline-none transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                {isFr ? "Numéro de téléphone" : "Phone Number"} <span className="text-[#C6112F]">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. +1 (514) 555-0192"
                className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs sm:text-sm font-medium focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 outline-none transition-all"
              />
            </div>

            {/* Language Selection */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                {isFr ? "Langue" : "Language"} <span className="text-[#C6112F]">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {LANGUAGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, language: opt.id })}
                    className={`py-3 px-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all text-center cursor-pointer ${
                      formData.language === opt.id
                        ? "bg-[#C6112F] text-white border-[#C6112F] shadow-md shadow-[#C6112F]/25"
                        : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-[#C6112F]"
                    }`}
                  >
                    {isFr ? opt.labelFr : opt.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* LinkedIn Profile */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                {isFr ? "Profil LinkedIn" : "LinkedIn Profile"} <span className="text-[#C6112F]">*</span>
              </label>
              <div className="relative">
                <input
                  type="url"
                  required
                  value={formData.linkedinProfile}
                  onChange={(e) => setFormData({ ...formData, linkedinProfile: e.target.value })}
                  placeholder="https://www.linkedin.com/in/username"
                  className="w-full px-4 py-3.5 pl-10 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs sm:text-sm font-medium focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 outline-none transition-all"
                />
                <svg
                  className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9M7.86 18.5V10.1H5.06v8.4h2.8z" />
                </svg>
              </div>
            </div>

            {/* Resume Upload */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                {isFr ? "Curriculum Vitae (CV)" : "Resume / CV"} <span className="text-[#C6112F]">*</span>
              </label>
              <div className="relative border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-[#C6112F] rounded-2xl p-6 transition-all text-center bg-white dark:bg-neutral-900 group">
                <input
                  type="file"
                  required={!resumeFile}
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                  <div className="w-12 h-12 rounded-2xl bg-[#C6112F]/10 text-[#C6112F] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5h10.5a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0017.25 4.5H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  {resumeFile ? (
                    <div className="text-center">
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 block">
                        {isFr ? "✓ Fichier joint :" : "✓ Attached:"} {resumeFile.name}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-medium">
                        ({(resumeFile.size / (1024 * 1024)).toFixed(2)} MB) · {isFr ? "Cliquer ou déposer pour remplacer" : "Click or drop to replace"}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block mb-0.5">
                        {isFr ? "Cliquez ou glissez-déposez votre CV" : "Click or Drag & Drop Resume File"}
                      </span>
                      <span className="text-[11px] text-neutral-500 font-normal block">
                        {isFr ? "Formats acceptés : PDF, DOC, DOCX (Max 10 Mo)" : "Accepted: PDF, DOC, DOCX (Max 10MB)"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════ 2. SCHOOLING DETAILS ═══════════ */}
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-50/80 dark:bg-neutral-900/50 border border-neutral-200/90 dark:border-neutral-800 transition-all">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-200/80 dark:border-neutral-800">
            <span className="w-8 h-8 rounded-xl bg-[#C6112F] text-white text-xs font-black flex items-center justify-center shadow-md shadow-[#C6112F]/20">
              2
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-neutral-900 dark:text-white">
                {isFr ? "Détails sur les études" : "Schooling Details"}
              </h3>
              <p className="text-[11px] text-neutral-500 font-normal">
                {isFr
                  ? "Établissement d'enseignement, programme d'études et diplomation prévue."
                  : "Academic institution, program of study, and expected graduation."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* College / University */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                {isFr ? "Collège / Université" : "College / University"} <span className="text-[#C6112F]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.collegeUniversity}
                onChange={(e) => setFormData({ ...formData, collegeUniversity: e.target.value })}
                placeholder={isFr ? "ex. Université Laval / Polytechnique Montréal" : "e.g. Queen's University / Polytechnique Montréal"}
                className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs sm:text-sm font-medium focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 outline-none transition-all"
              />
            </div>

            {/* Province */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                {isFr ? "Province / Territoire" : "Province"} <span className="text-[#C6112F]">*</span>
              </label>
              <select
                required
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs sm:text-sm font-medium focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 outline-none transition-all cursor-pointer"
              >
                <option value="">{isFr ? "Sélectionnez une province ou un territoire" : "Select Province / Territory"}</option>
                {CANADIAN_PROVINCES.map((prov) => (
                  <option key={prov.en} value={prov.en}>
                    {isFr ? prov.fr : prov.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Degree Level */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                {isFr ? "Niveau d'études" : "Degree Level"} <span className="text-[#C6112F]">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {DEGREE_LEVELS.map((deg) => (
                  <button
                    key={deg.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, degreeLevel: deg.id })}
                    className={`py-3 px-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all text-center cursor-pointer ${
                      formData.degreeLevel === deg.id
                        ? "bg-[#C6112F] text-white border-[#C6112F] shadow-md shadow-[#C6112F]/25"
                        : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-[#C6112F]"
                    }`}
                  >
                    {isFr ? deg.labelFr : deg.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Area of Study */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                {isFr ? "Domaine d'études" : "Area of Study"} <span className="text-[#C6112F]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.areaOfStudy}
                onChange={(e) => setFormData({ ...formData, areaOfStudy: e.target.value })}
                placeholder={isFr ? "ex. Génie minier, Géologie, Finance, Métallurgie" : "e.g. Mining Engineering, Geology, Finance, Metallurgy"}
                className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs sm:text-sm font-medium focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 outline-none transition-all"
              />
            </div>

            {/* Expected Graduation Date */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                {isFr ? "Date d'obtention prévue du diplôme" : "Expected Graduation Date"} <span className="text-[#C6112F]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.expectedGraduationDate}
                onChange={(e) => setFormData({ ...formData, expectedGraduationDate: e.target.value })}
                placeholder={isFr ? "ex. Mai 2027 ou Printemps 2026" : "e.g. May 2027 or Spring 2026"}
                className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs sm:text-sm font-medium focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* ═══════════ 3. APPLICATION QUESTIONS (500 WORD MAX) ═══════════ */}
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-50/80 dark:bg-neutral-900/50 border border-neutral-200/90 dark:border-neutral-800 transition-all">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200/80 dark:border-neutral-800 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#C6112F] text-white text-xs font-black flex items-center justify-center shadow-md shadow-[#C6112F]/20">
                3
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-neutral-900 dark:text-white">
                  {isFr ? "Questions de candidature" : "Application Questions"}
                </h3>
                <p className="text-[11px] text-neutral-500 font-normal">
                  {isFr
                    ? "Fournissez des réponses réfléchies pour aider notre comité de sélection à mieux vous connaître."
                    : "Provide thoughtful responses to help our selection committee learn more about you."}
                </p>
              </div>
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider text-[#C6112F] bg-[#C6112F]/10 px-3 py-1 rounded-full">
              {isFr ? "500 Mots Max Chacune" : "500 Words Max Each"}
            </span>
          </div>

          <div className="space-y-6">
            {/* Question 1 */}
            <div>
              <div className="flex items-center justify-between mb-2 gap-2">
                <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
                  {isFr
                    ? "Pourquoi souhaitez-vous participer au Programme de Partenariat Étudiant ?"
                    : "Why do you want to attend THE Student Partnership Program ?"}{" "}
                  <span className="text-[#C6112F]">*</span>
                </label>
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    isWhyAttendOver
                      ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 font-black"
                      : wordsWhyAttend > 450
                      ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                      : "text-neutral-400"
                  }`}
                >
                  {wordsWhyAttend} / 500 {isFr ? "mots" : "words"}
                </span>
              </div>
              <textarea
                rows={4}
                required
                value={formData.whyAttend}
                onChange={(e) => setFormData({ ...formData, whyAttend: e.target.value })}
                placeholder={
                  isFr
                    ? "Expliquez ce qui vous motive à participer au Programme de Partenariat Étudiant, votre intérêt pour l'industrie minière et la façon dont cette opportunité soutiendra votre parcours..."
                    : "Explain what motivates you to participate in THE Student Partnership Program, your interests in the mining and resource industry, and how this fully funded opportunity will impact your academic and career journey..."
                }
                className={`w-full px-4 py-3.5 rounded-xl border bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs sm:text-sm font-medium focus:ring-2 outline-none transition-all resize-y ${
                  isWhyAttendOver
                    ? "border-rose-500 focus:ring-rose-500/20"
                    : "border-neutral-300 dark:border-neutral-700 focus:border-[#C6112F] focus:ring-[#C6112F]/20"
                }`}
              />
              {isWhyAttendOver && (
                <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold mt-1">
                  {isFr
                    ? "La réponse dépasse la limite de 500 mots. Veuillez modifier votre texte avant de soumettre."
                    : "Response exceeds the 500-word limit. Please edit your answer before submitting."}
                </p>
              )}
            </div>

            {/* Question 2 */}
            <div>
              <div className="flex items-center justify-between mb-2 gap-2">
                <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
                  {isFr
                    ? "Quelles compétences ou perspectives uniques apporteriez-vous au Programme ?"
                    : "What unique skills/ perspective would you bring to THE Program ?"}{" "}
                  <span className="text-[#C6112F]">*</span>
                </label>
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    isUniqueSkillsOver
                      ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 font-black"
                      : wordsUniqueSkills > 450
                      ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                      : "text-neutral-400"
                  }`}
                >
                  {wordsUniqueSkills} / 500 {isFr ? "mots" : "words"}
                </span>
              </div>
              <textarea
                rows={4}
                required
                value={formData.uniqueSkills}
                onChange={(e) => setFormData({ ...formData, uniqueSkills: e.target.value })}
                placeholder={
                  isFr
                    ? "Mettez en valeur votre parcours, votre expérience de terrain, vos capacités d'analyse, votre leadership et vos compétences qui enrichiront l'étude de cas et la dynamique d'équipe..."
                    : "Highlight your background, hands-on field experience, analytical capabilities, team collaboration, leadership, diverse perspective, or technical skills that will contribute to the student case study challenge and cohort dynamics..."
                }
                className={`w-full px-4 py-3.5 rounded-xl border bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs sm:text-sm font-medium focus:ring-2 outline-none transition-all resize-y ${
                  isUniqueSkillsOver
                    ? "border-rose-500 focus:ring-rose-500/20"
                    : "border-neutral-300 dark:border-neutral-700 focus:border-[#C6112F] focus:ring-[#C6112F]/20"
                }`}
              />
              {isUniqueSkillsOver && (
                <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold mt-1">
                  {isFr
                    ? "La réponse dépasse la limite de 500 mots. Veuillez modifier votre texte avant de soumettre."
                    : "Response exceeds the 500-word limit. Please edit your answer before submitting."}
                </p>
              )}
            </div>

            {/* Question 3 */}
            <div>
              <div className="flex items-center justify-between mb-2 gap-2">
                <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
                  {isFr
                    ? "Où vous voyez-vous dans l'avenir ? (poursuite des études, type d'emploi, etc.)"
                    : "Where do you see yourself in the future? (continuing school, what job type, etc)"}{" "}
                  <span className="text-[#C6112F]">*</span>
                </label>
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    isFutureGoalsOver
                      ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 font-black"
                      : wordsFutureGoals > 450
                      ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                      : "text-neutral-400"
                  }`}
                >
                  {wordsFutureGoals} / 500 {isFr ? "mots" : "words"}
                </span>
              </div>
              <textarea
                rows={4}
                required
                value={formData.futureGoals}
                onChange={(e) => setFormData({ ...formData, futureGoals: e.target.value })}
                placeholder={
                  isFr
                    ? "Décrivez vos aspirations professionnelles (ex. géologie d'exploration, finance minière, opérations, conseil ESG) et comment vous envisagez d'évoluer dans le secteur des ressources naturelles..."
                    : "Outline your future career aspirations (e.g. exploration geology, mining finance, mine operations, ESG consultancy, graduate studies) and how you plan to advance within the natural resources sector..."
                }
                className={`w-full px-4 py-3.5 rounded-xl border bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs sm:text-sm font-medium focus:ring-2 outline-none transition-all resize-y ${
                  isFutureGoalsOver
                    ? "border-rose-500 focus:ring-rose-500/20"
                    : "border-neutral-300 dark:border-neutral-700 focus:border-[#C6112F] focus:ring-[#C6112F]/20"
                }`}
              />
              {isFutureGoalsOver && (
                <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold mt-1">
                  {isFr
                    ? "La réponse dépasse la limite de 500 mots. Veuillez modifier votre texte avant de soumettre."
                    : "Response exceeds the 500-word limit. Please edit your answer before submitting."}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ═══════════ 4. AVAILABILITY AND LOGISTICS ═══════════ */}
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-50/80 dark:bg-neutral-900/50 border border-neutral-200/90 dark:border-neutral-800 transition-all">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-200/80 dark:border-neutral-800">
            <span className="w-8 h-8 rounded-xl bg-[#C6112F] text-white text-xs font-black flex items-center justify-center shadow-md shadow-[#C6112F]/20">
              4
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-neutral-900 dark:text-white">
                {isFr ? "Disponibilité et logistique" : "Availability and Logistics"}
              </h3>
              <p className="text-[11px] text-neutral-500 font-normal">
                {isFr
                  ? "Détails de voyage, confirmation des dates et engagement professionnel."
                  : "Travel details, dates confirmation, and professional commitment."}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Availability May 31 - June 3 */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-2">
                {isFr ? "Êtes-vous disponible pour participer du 31 mai au 3 juin ?" : "Are you available to attend May 31 – June 3?"}{" "}
                <span className="text-[#C6112F]">*</span>
              </label>
              <div className="flex items-center gap-4">
                {[
                  { value: "Yes", labelEn: "Yes", labelFr: "Oui" },
                  { value: "No", labelEn: "No", labelFr: "Non" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                      formData.availableDates === opt.value
                        ? "bg-[#C6112F] text-white border-[#C6112F] shadow-sm"
                        : "bg-neutral-50 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-[#C6112F]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="availableDates"
                      value={opt.value}
                      checked={formData.availableDates === opt.value}
                      onChange={(e) => setFormData({ ...formData, availableDates: e.target.value })}
                      className="sr-only"
                    />
                    <span>{isFr ? opt.labelFr : opt.labelEn}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Travel Responsibility to Montreal */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-1.5 leading-relaxed">
                {isFr
                  ? "Vous êtes responsable de votre propre transport vers et depuis Montréal — pouvez-vous vous en charger ?"
                  : "You are responsible for your own travel to and from Montreal — can you manage that?"}{" "}
                <span className="text-[#C6112F]">*</span>
              </label>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mb-3 font-normal">
                {isFr
                  ? "(Nous offrons un autocar gratuit pour vous prendre en charge à Montréal et vous transporter à Québec)."
                  : "(We have a complimentary coach bus to pick you up in Montreal and transport you to Québec City)."}
              </p>
              <div className="flex items-center gap-4">
                {[
                  { value: "Yes", labelEn: "Yes", labelFr: "Oui" },
                  { value: "No", labelEn: "No", labelFr: "Non" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                      formData.travelManagement === opt.value
                        ? "bg-[#C6112F] text-white border-[#C6112F] shadow-sm"
                        : "bg-neutral-50 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-[#C6112F]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="travelManagement"
                      value={opt.value}
                      checked={formData.travelManagement === opt.value}
                      onChange={(e) => setFormData({ ...formData, travelManagement: e.target.value })}
                      className="sr-only"
                    />
                    <span>{isFr ? opt.labelFr : opt.labelEn}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Traveling from */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                {isFr
                  ? "D'où partirez-vous pour voyager ? (province / ville / aéroport)"
                  : "Where will you be traveling from? (province / city / airport)"}{" "}
                <span className="text-[#C6112F]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.travelOrigin}
                onChange={(e) => setFormData({ ...formData, travelOrigin: e.target.value })}
                placeholder={isFr ? "ex. Montréal, QC (YUL) / Toronto, ON (YYZ)" : "e.g. Toronto, Ontario (YYZ) / Vancouver, BC (YVR)"}
                className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs sm:text-sm font-medium focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 outline-none transition-all"
              />
            </div>

            {/* Program Commitment Statement */}
            <div className="p-5 rounded-2xl bg-[#C6112F]/5 border-2 border-[#C6112F]/25 dark:border-[#C6112F]/30">
              <label className="block text-xs font-extrabold text-neutral-900 dark:text-white uppercase tracking-wider mb-2 leading-relaxed">
                {isFr
                  ? "Engagement à une participation complète au programme"
                  : "Commitment to Full Program Participation"}{" "}
                <span className="text-[#C6112F]">*</span>
              </label>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed mb-4">
                {isFr
                  ? "Le Programme de bourses étudiantes est une opportunité entièrement financée qui requiert un engagement sérieux de la part de notre équipe et des étudiants sélectionnés. Vous engagez-vous à assister à l'ensemble du programme, à participer aux activités prévues et à faire preuve d'un professionnalisme exemplaire ?"
                  : "THE Student Sponsorship Program is a fully funded opportunity and requires a significant commitment from both our team and participating students. Are you willing to commit to attending the full program, participating in scheduled student activities and representing THE Event professionally?"}
              </p>
              <div className="flex items-center gap-4">
                {[
                  { value: "Yes", labelEn: "Yes", labelFr: "Oui" },
                  { value: "No", labelEn: "No", labelFr: "Non" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl border text-xs font-extrabold cursor-pointer transition-all ${
                      formData.commitmentAgreed === opt.value
                        ? "bg-[#C6112F] text-white border-[#C6112F] shadow-md shadow-[#C6112F]/25"
                        : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-[#C6112F]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="commitmentAgreed"
                      value={opt.value}
                      checked={formData.commitmentAgreed === opt.value}
                      onChange={(e) => setFormData({ ...formData, commitmentAgreed: e.target.value })}
                      className="sr-only"
                    />
                    <span>{isFr ? opt.labelFr : opt.labelEn}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Newsletter Opt-in */}
            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.signUpForNews}
                  onChange={(e) => setFormData({ ...formData, signUpForNews: e.target.checked })}
                  className="w-4 h-4 text-[#C6112F] rounded border-neutral-300 focus:ring-[#C6112F]"
                />
                <span className="text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  {isFr
                    ? "M'inscrire pour recevoir les actualités et informations sur le Programme de Partenariat Étudiant"
                    : "Sign up for news and updates regarding THE Student Partnership Program"}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {submitError && (
          <div
            role="alert"
            className="p-4 sm:p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-bold leading-relaxed flex items-center gap-3"
          >
            <span className="text-base shrink-0">⚠️</span>
            <span>{submitError}</span>
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting || hasWordLimitError}
            className="w-full py-4.5 rounded-2xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs sm:text-sm font-black tracking-[0.15em] uppercase shadow-xl shadow-[#C6112F]/30 transition-all duration-300 flex items-center justify-center gap-3 enabled:hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting && (
              <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            )}
            <span>
              {isSubmitting
                ? isFr
                  ? "Envoi de la candidature en cours…"
                  : "Submitting Application…"
                : isFr
                ? "Soumettre la candidature au programme étudiant"
                : "Submit Student Sponsorship Application"}
            </span>
          </button>
          <p className="text-center text-[11px] text-neutral-400 mt-3 font-medium">
            {isFr
              ? "En soumettant votre formulaire, votre dossier sera évalué pour une bourse entièrement financée à THE Mining Investment Event 2026."
              : "By submitting, your application will be reviewed for fully funded sponsorship at THE Mining Investment Event 2026."}
          </p>
        </div>
      </form>
    </div>
  );
}
