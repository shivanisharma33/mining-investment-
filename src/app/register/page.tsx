"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import {
  submitInvestorRegistration,
  submitCompanyRegistration,
  RegistrationError,
  ProjectStage,
} from "@/lib/registrationsApi";

export default function RegisterPage() {
  const { t, lang } = useLanguage();
  const isFr = lang === "FR";

  const [activeTrack, setActiveTrack] = useState<"investor" | "company">("investor");

  // Detailed Investor Registration Form State
  const [investorFormData, setInvestorFormData] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    businessTitle: "",
    city: "",
    country: "",
    email: "",
    phone: "",
    aum: "",
    investorType: "Institutional Investor",
    tellUsAboutYourself: "",
    newsletterOptIn: true,
  });

  // Company Registration Form State
  const [companyFormData, setCompanyFormData] = useState({
    companyName: "",
    marketCap: "",
    ticker: "",
    commodity: "",
    projectStage: "Explorer",
    location: "",
    email: "",
    tellUsAboutYourself: "",
    newsletterOptIn: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [registrationNumber, setRegistrationNumber] = useState<string>("");

  const handleInvestorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const result = await submitInvestorRegistration({
        companyName: investorFormData.companyName.trim(),
        firstName: investorFormData.firstName.trim(),
        lastName: investorFormData.lastName.trim(),
        businessTitle: investorFormData.businessTitle.trim(),
        city: investorFormData.city.trim(),
        country: investorFormData.country.trim(),
        email: investorFormData.email.trim(),
        phone: investorFormData.phone.trim(),
        assetsUnderManagement: investorFormData.aum,
        investorType: investorFormData.investorType,
        tellUsAboutYourself: investorFormData.tellUsAboutYourself.trim(),
        signUpForNews: investorFormData.newsletterOptIn,
      });

      setRegistrationNumber(result.registrationNumber ?? "");
      setSubmitted(true);
      setInvestorFormData({
        companyName: "",
        firstName: "",
        lastName: "",
        businessTitle: "",
        city: "",
        country: "",
        email: "",
        phone: "",
        aum: "",
        investorType: "Institutional Investor",
        tellUsAboutYourself: "",
        newsletterOptIn: true,
      });
    } catch (err) {
      const fieldMessage =
        err instanceof RegistrationError && err.fieldErrors.length > 0
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

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const result = await submitCompanyRegistration({
        companyName: companyFormData.companyName.trim(),
        marketCap: companyFormData.marketCap.trim(),
        primaryExchangeTicker: companyFormData.ticker.trim(),
        commodity: companyFormData.commodity.trim(),
        projectStage: companyFormData.projectStage as ProjectStage,
        location: companyFormData.location.trim(),
        email: companyFormData.email.trim(),
        tellUsAboutYourself: companyFormData.tellUsAboutYourself.trim(),
        signUpForNews: companyFormData.newsletterOptIn,
      });

      setRegistrationNumber(result.registrationNumber ?? "");
      setSubmitted(true);
      setCompanyFormData({
        companyName: "",
        marketCap: "",
        ticker: "",
        commodity: "",
        projectStage: "Explorer",
        location: "",
        email: "",
        tellUsAboutYourself: "",
        newsletterOptIn: true,
      });
    } catch (err) {
      const fieldMessage =
        err instanceof RegistrationError && err.fieldErrors.length > 0
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

  const selectTrack = (track: "investor" | "company") => {
    setActiveTrack(track);
    // The error banner is shared by both forms — don't carry it across.
    setSubmitError("");
  };

  const scrollToForm = (track: "investor" | "company") => {
    selectTrack(track);
    const formElement = document.getElementById("registration-form-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-white font-sans">
        {/* ═══════ HERO SECTION ═══════ */}
        <section className="relative w-full bg-[#0f1117] overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#C6112F]/20 via-transparent to-transparent" />

          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 mb-6">
              <a href="/" className="hover:text-white transition-colors">{t("nav-home", "Home")}</a>
              <span className="text-[#C6112F]">›</span>
              <span className="text-neutral-500">{t("nav-about", "About")}</span>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white font-semibold">{t("footer-link-registration", "Registration Information")}</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                <span className="text-[#C6112F] text-xs font-black tracking-[0.25em] uppercase mb-3 block">
                  {isFr ? "RÉSERVEZ LA DATE — SUR INVITATION SEULEMENT" : "SAVE THE DATE — INVITATION ONLY"}
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none uppercase">
                  {isFr ? "Portail d'" : "Registration "}<span className="text-[#C6112F]">{isFr ? "Inscription" : "Portal"}</span>
                </h1>
                <div className="w-20 h-[3.5px] bg-[#C6112F] mt-6 rounded-full" />
              </div>

              {/* Date & Location Badge */}
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-6 max-w-md shrink-0">
                <div className="flex items-center gap-3 text-xs font-bold text-[#C6112F] uppercase tracking-wider mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>Centre des congrès de Québec</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">
                  {isFr ? "1–3 juin 2027" : "June 1–3, 2027"}
                </div>
                <p className="text-neutral-300 text-xs mt-2 leading-relaxed font-normal">
                  {t(
                    "register-save-date-sub",
                    "Canada's invitation-only Tier 1 Conference for mining companies, accredited investors, family offices, institutions, and funds."
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ DUAL TRACK SELECTION CARDS ═══════ */}
        <section className="relative w-full py-14 sm:py-18 bg-[#f8f9fa]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
                {isFr ? "CHOISISSEZ VOTRE PARCOURS DE PARTICIPATION" : "CHOOSE YOUR PARTICIPATION TRACK"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1a1f2c] tracking-tight">
                {isFr ? "Un accès sur mesure pour investisseurs et sociétés" : "Tier 1 Access for Investors & Companies"}
              </h2>
              <div className="w-16 h-[3px] bg-[#C6112F] mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Investor Track Card */}
              <div className={`group bg-white border rounded-3xl p-8 sm:p-10 shadow-sm transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${activeTrack === "investor" ? "border-[#C6112F] ring-2 ring-[#C6112F]/20 shadow-xl" : "border-neutral-200 hover:border-[#C6112F]/40"
                }`}>
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C6112F]" />
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#C6112F] bg-[#C6112F]/10 px-3.5 py-1.5 rounded-full">
                      {isFr ? "POUR LES INVESTISSEURS" : "FOR INVESTORS"}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#C6112F]/10 text-[#C6112F] flex items-center justify-center font-bold text-lg">
                      01
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-[#1a1f2c] mb-4 group-hover:text-[#C6112F] transition-colors">
                    {t("register-investor-title", "Investor Registration")}
                  </h3>

                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-8">
                    {t(
                      "register-investor-desc",
                      "Register as an accredited investor, family office, institution, or fund to access privately arranged meetings with over 100 of Canada's leading mining companies."
                    )}
                  </p>

                  <div className="space-y-3 mb-8">
                    {[
                      isFr ? "Rencontres privées individuelles pour dirigeants" : "1-on-1 Private Executive Meetings",
                      isFr ? "Accès aux conférences et sessions ministérielles" : "Keynote & Ministerial Session Access",
                      isFr ? "Réceptions VIP et dîners de réseautage" : "VIP Receptions & Networking Dinners",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-bold text-neutral-800">
                        <span className="w-5 h-5 rounded-full bg-[#C6112F]/10 text-[#C6112F] flex items-center justify-center text-xs shrink-0">
                          ✓
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => scrollToForm("investor")}
                  className={`w-full py-4 rounded-2xl text-xs font-extrabold tracking-[0.15em] uppercase text-center transition-all duration-300 shadow-md ${activeTrack === "investor" ? "bg-[#C6112F] text-white shadow-lg" : "bg-[#1a1f2c] text-white hover:bg-[#C6112F]"
                    }`}
                >
                  {t("register-investor-cta", "Register as an Investor")}
                </button>
              </div>

              {/* Mining Company Track Card */}
              <div className={`group bg-white border rounded-3xl p-8 sm:p-10 shadow-sm transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${activeTrack === "company" ? "border-[#C6112F] ring-2 ring-[#C6112F]/20 shadow-xl" : "border-neutral-200 hover:border-[#C6112F]/40"
                }`}>
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#1a1f2c] group-hover:bg-[#C6112F] transition-colors" />
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-neutral-800 bg-neutral-100 px-3.5 py-1.5 rounded-full">
                      {isFr ? "POUR LES SOCIÉTÉS" : "FOR COMPANIES"}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-neutral-100 text-neutral-800 flex items-center justify-center font-bold text-lg">
                      02
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-[#1a1f2c] mb-4 group-hover:text-[#C6112F] transition-colors">
                    {t("register-company-title", "Company Registration")}
                  </h3>

                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-8">
                    {t(
                      "register-company-desc",
                      "Register your mining company to showcase your projects and connect with a curated audience of international investors, family offices, and institutional funds."
                    )}
                  </p>

                  <div className="space-y-3 mb-8">
                    {[
                      isFr ? "Présentation de projets corporatifs" : "Corporate Project Showcase",
                      isFr ? "Auditoire d'investisseurs accrédités ciblés" : "Curated Accredited Investor Audience",
                      isFr ? "Opportunités de commandite de Niveau 1" : "Tier 1 Sponsorship Opportunities",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-bold text-neutral-800">
                        <span className="w-5 h-5 rounded-full bg-[#1a1f2c]/10 text-[#1a1f2c] flex items-center justify-center text-xs shrink-0">
                          ✓
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => scrollToForm("company")}
                  className={`w-full py-4 rounded-2xl text-xs font-extrabold tracking-[0.15em] uppercase text-center transition-all duration-300 shadow-md ${activeTrack === "company" ? "bg-[#C6112F] text-white shadow-lg" : "bg-[#1a1f2c] text-white hover:bg-[#C6112F]"
                    }`}
                >
                  {t("register-company-cta", "Register as a Company")}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ INTERACTIVE REGISTRATION FORM SECTION ═══════ */}
        <section id="registration-form-section" className="relative w-full py-16 sm:py-20 md:py-24 bg-white border-t border-neutral-200">
          <div className="max-w-[860px] mx-auto px-4 sm:px-6 md:px-8">
            {/* Form Track Switcher Tabs */}
            <div className="flex justify-center gap-3 mb-10">
              <button
                onClick={() => selectTrack("investor")}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${activeTrack === "investor"
                    ? "bg-[#C6112F] text-white shadow-lg shadow-[#C6112F]/20 scale-105"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
              >
                {isFr ? "Formulaire Investisseur" : "Investor Registration Form"}
              </button>
              <button
                onClick={() => selectTrack("company")}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${activeTrack === "company"
                    ? "bg-[#C6112F] text-white shadow-lg shadow-[#C6112F]/20 scale-105"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
              >
                {isFr ? "Formulaire Société" : "Company Registration Form"}
              </button>
            </div>

            <div className="bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0f1117] via-[#C6112F] to-[#0f1117]" />

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 text-3xl font-black shadow-lg">
                    ✓
                  </div>
                  <h3 className="text-3xl font-black text-[#1a1f2c] mb-3">
                    {isFr ? "Inscription reçue !" : "Registration Received!"}
                  </h3>
                  <p className="text-neutral-600 text-sm max-w-lg mx-auto mb-8 leading-relaxed font-medium">
                    {isFr
                      ? `Merci d'avoir rempli votre formulaire d'inscription ${activeTrack === "investor" ? "Investisseur" : "Société"}. Notre équipe révisera vos informations et émettra les détails officiels d'invitation prochainement.`
                      : `Thank you for completing your ${activeTrack === "investor" ? "Investor" : "Company"} registration form. Our credentials team will review your information and issue official invitation details shortly.`}
                  </p>
                  {registrationNumber && (
                    <div className="max-w-xs mx-auto mb-8 px-5 py-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                      <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1">
                        {isFr ? "Numéro d'inscription" : "Registration Number"}
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
                    {isFr ? "Soumettre une autre demande" : "Submit Another Application"}
                  </button>
                </div>
              ) : activeTrack === "investor" ? (
                /* ═══════ INVESTOR REGISTRATION FORM ═══════ */
                <div>
                  <div className="text-center mb-10">
                    <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
                      {isFr ? "DEMANDE DE DÉLÉGUÉ ACCRÉDITÉ" : "ACCREDITED DELEGATE APPLICATION"}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#1a1f2c] tracking-tight">
                      {isFr ? "Formulaire d'inscription investisseur" : "Investor Registration Form"}
                    </h3>
                    <div className="w-12 h-[3px] bg-[#C6112F] mx-auto mt-3 rounded-full" />
                  </div>

                  <form onSubmit={handleInvestorSubmit} className="space-y-6">
                    {/* Company Name */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                        {isFr ? "Nom de la société" : "Company Name"} <span className="text-[#C6112F] font-bold">{isFr ? "(requis)" : "(required)"}</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={investorFormData.companyName}
                        onChange={(e) =>
                          setInvestorFormData({ ...investorFormData, companyName: e.target.value })
                        }
                        placeholder={isFr ? "ex: Apex Capital Partners" : "e.g. Apex Capital Partners"}
                        className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-medium outline-none transition-all"
                      />
                    </div>

                    {/* Name: First Name & Last Name (Required) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                          {isFr ? "Prénom" : "First Name"} <span className="text-[#C6112F] font-bold">{isFr ? "(requis)" : "(required)"}</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={investorFormData.firstName}
                          onChange={(e) =>
                            setInvestorFormData({ ...investorFormData, firstName: e.target.value })
                          }
                          placeholder={isFr ? "ex: Sarah" : "e.g. Sarah"}
                          className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-medium outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                          {isFr ? "Nom" : "Last Name"} <span className="text-[#C6112F] font-bold">{isFr ? "(requis)" : "(required)"}</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={investorFormData.lastName}
                          onChange={(e) =>
                            setInvestorFormData({ ...investorFormData, lastName: e.target.value })
                          }
                          placeholder={isFr ? "ex: Jenkins" : "e.g. Jenkins"}
                          className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-medium outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Business Title */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                        {isFr ? "Titre professionnel" : "Business Title"} <span className="text-[#C6112F] font-bold">{isFr ? "(requis)" : "(required)"}</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={investorFormData.businessTitle}
                        onChange={(e) =>
                          setInvestorFormData({ ...investorFormData, businessTitle: e.target.value })
                        }
                        placeholder={isFr ? "ex: Directeur Général, Mines & Ressources" : "e.g. Managing Director, Mining & Resources"}
                        className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-medium outline-none transition-all"
                      />
                    </div>

                    {/* City & Country */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                          {isFr ? "Ville" : "City"} <span className="text-[#C6112F] font-bold">{isFr ? "(requis)" : "(required)"}</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={investorFormData.city}
                          onChange={(e) =>
                            setInvestorFormData({ ...investorFormData, city: e.target.value })
                          }
                          placeholder={isFr ? "ex: Montréal" : "e.g. Toronto"}
                          className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-medium outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                          {isFr ? "Pays" : "Country"} <span className="text-[#C6112F] font-bold">{isFr ? "(requis)" : "(required)"}</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={investorFormData.country}
                          onChange={(e) =>
                            setInvestorFormData({ ...investorFormData, country: e.target.value })
                          }
                          placeholder={isFr ? "ex: Canada" : "e.g. Canada"}
                          className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-medium outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Email (Required) & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                          {isFr ? "Courriel" : "Email"} <span className="text-[#C6112F] font-bold">{isFr ? "(requis)" : "(required)"}</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={investorFormData.email}
                          onChange={(e) =>
                            setInvestorFormData({ ...investorFormData, email: e.target.value })
                          }
                          placeholder="e.g. sarah@firm.com"
                          className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-medium outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                          {isFr ? "Téléphone" : "Phone"} <span className="text-[#C6112F] font-bold">{isFr ? "(requis)" : "(required)"}</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={investorFormData.phone}
                          onChange={(e) =>
                            setInvestorFormData({ ...investorFormData, phone: e.target.value })
                          }
                          placeholder="e.g. +1 (514) 555-0192"
                          className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-medium outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Assets Under Management & Investor Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                          {isFr ? "Actifs sous gestion" : "Assets Under Management"} <span className="text-[#C6112F] font-bold">{isFr ? "(requis)" : "(required)"}</span>
                        </label>
                        <select
                          required
                          value={investorFormData.aum}
                          onChange={(e) =>
                            setInvestorFormData({ ...investorFormData, aum: e.target.value })
                          }
                          className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-bold outline-none transition-all bg-white cursor-pointer"
                        >
                          <option value="">{isFr ? "Sélectionner la fourchette AUM" : "Select AUM Range"}</option>
                          <option value="Under $10M">{isFr ? "Moins de 10 millions $" : "Under $10 Million"}</option>
                          <option value="$10M - $50M">{isFr ? "10 millions $ – 50 millions $" : "$10 Million – $50 Million"}</option>
                          <option value="$50M - $250M">{isFr ? "50 millions $ – 250 millions $" : "$50 Million – $250 Million"}</option>
                          <option value="$250M - $1B">{isFr ? "250 millions $ – 1 milliard $" : "$250 Million – $1 Billion"}</option>
                          <option value="Over $1B">{isFr ? "Plus de 1 milliard $" : "Over $1 Billion"}</option>
                          <option value="HNWI / Personal">{isFr ? "Investisseur accrédité personnel" : "HNWI / Personal Accredited Investor"}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                          {isFr ? "Type d'investisseur" : "Investor Type"} <span className="text-[#C6112F] font-bold">{isFr ? "(requis)" : "(required)"}</span>
                        </label>
                        <select
                          required
                          value={investorFormData.investorType}
                          onChange={(e) =>
                            setInvestorFormData({ ...investorFormData, investorType: e.target.value })
                          }
                          className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-bold outline-none transition-all bg-white cursor-pointer"
                        >
                          <option value="Institutional Investor">{isFr ? "Investisseur institutionnel" : "Institutional Investor"}</option>
                          <option value="Family Office">Family Office</option>
                          <option value="High Net Worth Individual (HNWI)">{isFr ? "Investisseur à valeur nette élevée" : "High Net Worth Individual (HNWI)"}</option>
                          <option value="Fund / Portfolio Manager">{isFr ? "Gestionnaire de portefeuille" : "Fund / Portfolio Manager"}</option>
                          <option value="Sovereign Wealth Fund">{isFr ? "Fonds souverain" : "Sovereign Wealth Fund"}</option>
                          <option value="Mining Analyst / Investment Banker">{isFr ? "Analyste minier / Banquier d'affaires" : "Mining Analyst / Investment Banker"}</option>
                          <option value="Retail / Accredited Investor">{isFr ? "Investisseur accrédité" : "Retail / Accredited Investor"}</option>
                        </select>
                      </div>
                    </div>

                    {/* Tell Us About Yourself */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                        {isFr ? "Parlez-nous de vous" : "Tell Us About Yourself"} <span className="text-[#C6112F] font-bold">{isFr ? "(requis)" : "(required)"}</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        maxLength={5000}
                        value={investorFormData.tellUsAboutYourself}
                        onChange={(e) =>
                          setInvestorFormData({
                            ...investorFormData,
                            tellUsAboutYourself: e.target.value,
                          })
                        }
                        placeholder={
                          isFr
                            ? "Décrivez brièvement vos objectifs ou vos intérêts d'investissement..."
                            : "Briefly describe your investment focus or objectives..."
                        }
                        className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-medium outline-none transition-all bg-white resize-y"
                      />
                      <span className="block text-[11px] text-neutral-400 font-medium mt-1">
                        max. 5000 characters
                      </span>
                    </div>

                    {/* Sign up for news and updates checkbox */}
                    <div className="pt-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={investorFormData.newsletterOptIn}
                          onChange={(e) =>
                            setInvestorFormData({
                              ...investorFormData,
                              newsletterOptIn: e.target.checked,
                            })
                          }
                          className="w-4 h-4 text-[#C6112F] rounded border-neutral-300 focus:ring-[#C6112F]"
                        />
                        <span className="text-xs sm:text-sm font-semibold text-neutral-700">
                          {isFr ? "S'abonner aux actualités et mises à jour" : "Sign up for news and updates"}
                        </span>
                      </label>
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
                        {isSubmitting ? (isFr ? "Soumission en cours…" : "Submitting…") : (isFr ? "Compléter l'inscription investisseur" : "Complete Investor Registration")}
                      </span>
                    </button>
                  </form>
                </div>
              ) : (
                /* ═══════ MINING COMPANY REGISTRATION FORM ═══════ */
                <div>
                  <div className="text-center mb-6">
                    <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
                      {isFr ? "DEMANDE D'ÉMETTEUR ET SOCIÉTÉ MINIÈRE" : "ISSUER & MINING COMPANY APPLICATION"}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#1a1f2c] tracking-tight">
                      {isFr ? "Formulaire d'inscription de société" : "Company Registration"}
                    </h3>
                    <div className="w-12 h-[3px] bg-[#C6112F] mx-auto mt-3 rounded-full" />
                  </div>

                  {/* Please Note Callout Notice */}
                  <div className="bg-[#fdf2f4] border-l-4 border-[#C6112F] p-4 sm:p-5 rounded-r-2xl mb-8">
                    <h4 className="text-xs font-black uppercase text-[#C6112F] tracking-wider mb-1.5">
                      {isFr ? "Veuillez noter*" : "Please Note*"}
                    </h4>
                    <p className="text-xs text-neutral-800 leading-relaxed font-medium mb-2">
                      {isFr
                        ? "Vous devez vous inscrire avant L'Événement. Vous devez recevoir une invitation officielle avant L'Événement pour obtenir votre badge à l'entrée."
                        : "You must register your attendance prior to THE Event. You must receive an official invitation prior to THE Event in order to receive your badge at the door."}
                    </p>
                    <p className="text-xs font-black text-[#C6112F]">
                      {isFr ? "Les entrées sans inscription ne seront pas acceptées." : "Walk-ins will not be accepted."}
                    </p>
                  </div>

                  <form onSubmit={handleCompanySubmit} className="space-y-6">
                    {/* Company Name & Market Cap */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                          {isFr ? "Nom de la société" : "Company Name"} <span className="text-[#C6112F] font-bold">{isFr ? "(requis)" : "(required)"}</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={companyFormData.companyName}
                          onChange={(e) =>
                            setCompanyFormData({ ...companyFormData, companyName: e.target.value })
                          }
                          placeholder={isFr ? "ex: Apex Gold & Copper Inc." : "e.g. Apex Gold & Copper Inc."}
                          className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-medium outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                          {isFr ? "Capitalisation boursière" : "Market Cap"}
                        </label>
                        <input
                          type="text"
                          value={companyFormData.marketCap}
                          onChange={(e) =>
                            setCompanyFormData({ ...companyFormData, marketCap: e.target.value })
                          }
                          placeholder={isFr ? "ex: 250 millions $ CAD" : "e.g. $250 Million CAD"}
                          className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-medium outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Primary Exchange/Ticker & Commodity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                          {isFr ? "Bourse principale / Symbole" : "Primary Exchange/Ticker"}
                        </label>
                        <input
                          type="text"
                          value={companyFormData.ticker}
                          onChange={(e) =>
                            setCompanyFormData({ ...companyFormData, ticker: e.target.value })
                          }
                          placeholder="e.g. TSX: APX / NYSE: APX"
                          className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-medium outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                          {isFr ? "Matière première" : "Commodity"}
                        </label>
                        <input
                          type="text"
                          value={companyFormData.commodity}
                          onChange={(e) =>
                            setCompanyFormData({ ...companyFormData, commodity: e.target.value })
                          }
                          placeholder={isFr ? "ex: Or, Cuivre, Lithium" : "e.g. Gold, Copper, Lithium"}
                          className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-medium outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Project Stage & Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                          {isFr ? "Stade du projet" : "Project Stage"}
                        </label>
                        <select
                          value={companyFormData.projectStage}
                          onChange={(e) =>
                            setCompanyFormData({ ...companyFormData, projectStage: e.target.value })
                          }
                          className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-bold outline-none transition-all bg-white cursor-pointer"
                        >
                          <option value="Explorer">{isFr ? "Exploration" : "Explorer"}</option>
                          <option value="Developer">{isFr ? "Développement" : "Developer"}</option>
                          <option value="Producer">{isFr ? "Production" : "Producer"}</option>
                          <option value="Royalty">{isFr ? "Redevances" : "Royalty"}</option>
                          <option value="Project Generator">{isFr ? "Générateur de projets" : "Project Generator"}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                          {isFr ? "Emplacement" : "Location"}
                        </label>
                        <input
                          type="text"
                          value={companyFormData.location}
                          onChange={(e) =>
                            setCompanyFormData({ ...companyFormData, location: e.target.value })
                          }
                          placeholder={isFr ? "ex: Québec, Canada" : "e.g. Quebec, Canada"}
                          className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-medium outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Email (required) */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                        {isFr ? "Courriel" : "Email"} <span className="text-[#C6112F] font-bold">{isFr ? "(requis)" : "(required)"}</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={companyFormData.email}
                        onChange={(e) =>
                          setCompanyFormData({ ...companyFormData, email: e.target.value })
                        }
                        placeholder="e.g. contact@company.com"
                        className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-medium outline-none transition-all"
                      />
                    </div>

                    {/* Tell Us About Yourself */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                        {isFr ? "Parlez-nous de vous" : "Tell Us About Yourself"}
                      </label>
                      <textarea
                        rows={4}
                        maxLength={5000}
                        value={companyFormData.tellUsAboutYourself}
                        onChange={(e) =>
                          setCompanyFormData({
                            ...companyFormData,
                            tellUsAboutYourself: e.target.value,
                          })
                        }
                        placeholder={
                          isFr
                            ? "Décrivez brièvement votre société, vos projets ou vos objectifs..."
                            : "Briefly describe your company, projects, or objectives..."
                        }
                        className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-900 text-xs sm:text-sm font-medium outline-none transition-all bg-white resize-y"
                      />
                      <span className="block text-[11px] text-neutral-400 font-medium mt-1">
                        max. 5000 characters
                      </span>
                    </div>

                    {/* Sign up for news and updates */}
                    <div className="pt-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={companyFormData.newsletterOptIn}
                          onChange={(e) =>
                            setCompanyFormData({
                              ...companyFormData,
                              newsletterOptIn: e.target.checked,
                            })
                          }
                          className="w-4 h-4 text-[#C6112F] rounded border-neutral-300 focus:ring-[#C6112F]"
                        />
                        <span className="text-xs sm:text-sm font-semibold text-neutral-700">
                          {isFr ? "S'abonner aux actualités et mises à jour" : "Sign up for news and updates"}
                        </span>
                      </label>
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
                      <span>{isSubmitting ? (isFr ? "Soumission en cours…" : "Submitting…") : (isFr ? "Soumettre l'inscription de société" : "Submit")}</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ═══════ POLICIES & SPONSOR CONTACT ═══════ */}
        <section className="relative w-full py-12 sm:py-16 bg-white border-t border-neutral-200">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="bg-[#0f1117] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-neutral-800 relative overflow-hidden">
              <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
                <div className="max-w-2xl">
                  <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#C6112F] bg-[#C6112F]/10 px-3.5 py-1 rounded-full inline-block mb-4">
                    {isFr ? "POLITIQUES ET EXIGENCES D'INSCRIPTION" : "REGISTRATION POLICIES & REQUIREMENTS"}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                    {isFr ? "Avis important concernant l'inscription" : "Important Registration Notice"}
                  </h3>
                  <div className="space-y-3 text-neutral-300 text-sm leading-relaxed font-light">
                    <p>
                      {isFr
                        ? "L'accès à L'Événement et les tarifs hôteliers réduits sont strictement réservés aux participants inscrits."
                        : "Entry into THE Event and special hotel discount rates are restricted strictly to registered participants."}
                    </p>
                    <p>
                      {isFr ? (
                        <>
                          Vous devez vous inscrire avant L'Événement. Vous devez recevoir une invitation officielle avant L'Événement afin de récupérer votre badge sur place. <strong className="text-white font-bold underline">Aucune entrée sans invitation ne sera acceptée en aucune circonstance.</strong>
                        </>
                      ) : (
                        <>
                          You must register your attendance prior to THE Event. You must receive an official invitation prior to THE Event in order to receive your badge at the door. <strong className="text-white font-bold underline">Walk-ins will not be accepted under any circumstances.</strong>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:w-[360px] shrink-0">
                  <div className="text-xs font-bold text-[#C6112F] uppercase tracking-wider mb-2">
                    {isFr ? "Contact pour commandites" : "Sponsorship Contact"}
                  </div>
                  <div className="text-base font-black text-white mb-2">Jenny Choi</div>
                  <p className="text-xs text-neutral-400 mb-4">
                    {isFr
                      ? "Pour discuter des forfaits de commandite de Niveau 1 ou d'options sur mesure :"
                      : "To discuss Tier 1 sponsorship packages or custom options:"}
                  </p>
                  <a
                    href="mailto:jchoi@irinc.ca"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#C6112F] hover:underline"
                  >
                    <span>jchoi@irinc.ca ↗</span>
                  </a>
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
