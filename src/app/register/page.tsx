"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function RegisterPage() {
  const { t, lang } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "investor",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", type: "investor", message: "" });
    }, 4000);
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
          <div className="absolute inset-0 bg-gradient-to-br from-[#C6112F]/20 via-transparent to-transparent" />
          
          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 mb-6">
              <a href="/" className="hover:text-white transition-colors">{t("nav-home", "Home")}</a>
              <span className="text-[#C6112F]">›</span>
              <span className="text-neutral-500">{t("nav-about", "About")}</span>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white">{t("footer-link-registration", "Registration Information")}</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                <span className="text-[#C6112F] text-xs font-black tracking-[0.25em] uppercase mb-3 block">
                  {t("register-save-date-label", "SAVE THE DATE — INVITATION ONLY")}
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
                  Registration <span className="text-[#C6112F]">Information</span>
                </h1>
                <div className="w-20 h-[3px] bg-[#C6112F] mt-6" />
              </div>

              {/* Date & Location Pill Badge */}
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-6 max-w-md shrink-0">
                <div className="flex items-center gap-3 text-xs font-bold text-[#C6112F] uppercase tracking-wider mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>Centre des congrès de Québec</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">
                  June 1–3, 2027
                </div>
                <p className="text-neutral-300 text-xs mt-2 leading-relaxed font-light">
                  {t(
                    "register-save-date-sub",
                    "Canada's invitation-only Tier 1 Conference for mining companies, accredited investors, family offices, institutions, and funds."
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ DUAL REGISTRATION TRACK CARDS ═══════ */}
        <section className="relative w-full py-16 sm:py-20 md:py-24 bg-[#f8f9fa]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
                CHOOSE YOUR PARTICIPATION TRACK
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1a1f2c] tracking-tight">
                Tailored Access for Investors & Companies
              </h2>
              <div className="w-16 h-[3px] bg-[#C6112F] mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Investor Track Card */}
              <div className="group bg-white border border-neutral-200 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-2xl hover:border-[#C6112F]/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C6112F]" />
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#C6112F] bg-[#C6112F]/10 px-3.5 py-1.5 rounded-full">
                      {t("register-investor-type", "FOR INVESTORS")}
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
                      "Register as an accredited investor, family office, institution, or fund to access privately arranged meetings with over 100 of Canada's leading mining companies. Gain exclusive access to keynote speakers, panel discussions, and networking events throughout the three-day conference."
                    )}
                  </p>

                  {/* Highlights checklist */}
                  <div className="space-y-3 mb-8">
                    {[
                      lang === "FR" ? "1-on-1 Rencontres Privées" : "1-on-1 Private Executive Meetings",
                      lang === "FR" ? "Accès aux Conférences & Ministers" : "Keynote & Ministerial Session Access",
                      lang === "FR" ? "Réceptions VIP & Réseautage" : "VIP Receptions & Networking Dinners",
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

                <a
                  href="#inquiry-form"
                  className="w-full py-4 rounded-2xl bg-[#1a1f2c] group-hover:bg-[#C6112F] text-white text-xs font-extrabold tracking-[0.15em] uppercase text-center transition-all duration-300 shadow-md group-hover:shadow-lg"
                >
                  {t("register-investor-cta", "Register as Investor")}
                </a>
              </div>

              {/* Mining Company Track Card */}
              <div className="group bg-white border border-neutral-200 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-2xl hover:border-[#C6112F]/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#1a1f2c] group-hover:bg-[#C6112F] transition-colors" />
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-neutral-800 bg-neutral-100 px-3.5 py-1.5 rounded-full">
                      {t("register-company-type", "FOR COMPANIES")}
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
                      "Register your mining company to showcase your projects and connect with a curated audience of international investors, family offices, and institutional funds. Sponsorship opportunities are available — contact Jennifer Choi directly for sponsorship packages."
                    )}
                  </p>

                  {/* Highlights checklist */}
                  <div className="space-y-3 mb-8">
                    {[
                      lang === "FR" ? "Présentation d'Entreprise Minière" : "Corporate Project Showcase",
                      lang === "FR" ? "Auditoire d'Investisseurs Accrédités" : "Curated Accredited Investor Audience",
                      lang === "FR" ? "Opportunités de Commandite" : "Tier 1 Sponsorship Opportunities",
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

                <a
                  href="#inquiry-form"
                  className="w-full py-4 rounded-2xl bg-[#1a1f2c] group-hover:bg-[#C6112F] text-white text-xs font-extrabold tracking-[0.15em] uppercase text-center transition-all duration-300 shadow-md group-hover:shadow-lg"
                >
                  {t("register-company-cta", "Register a Company")}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ IMPORTANT NOTICE & POLICY SECTION ═══════ */}
        <section className="relative w-full py-12 sm:py-16 bg-white border-t border-b border-neutral-200">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="bg-[#0f1117] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-neutral-800 relative overflow-hidden">
              <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
                <div className="max-w-2xl">
                  <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#C6112F] bg-[#C6112F]/10 px-3.5 py-1 rounded-full inline-block mb-4">
                    REGISTRATION POLICIES & REQUIREMENTS
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                    Important Registration Notice
                  </h3>
                  <div className="space-y-3 text-neutral-300 text-sm leading-relaxed font-light">
                    <p>
                      Entry into THE Event and special hotel discount rates are restricted strictly to registered participants.
                    </p>
                    <p>
                      You must register your attendance prior to THE Event. You must receive an official invitation prior to THE Event in order to receive your badge at the door. <strong className="text-white font-bold underline">Walk-ins will not be accepted under any circumstances.</strong>
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:w-[360px] shrink-0">
                  <div className="text-xs font-bold text-[#C6112F] uppercase tracking-wider mb-2">
                    Sponsorship Contact
                  </div>
                  <div className="text-base font-black text-white mb-2">Jennifer Choi</div>
                  <p className="text-xs text-neutral-400 mb-4">
                    To discuss Tier 1 sponsorship packages or custom options:
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

        {/* ═══════ INTERACTIVE REGISTRATION INQUIRY FORM ═══════ */}
        <section id="inquiry-form" className="relative w-full py-16 sm:py-20 md:py-24 bg-[#f8f9fa]">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center mb-12">
              <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
                OFFICIAL INQUIRY FORM
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1a1f2c] tracking-tight">
                Submit Your Registration Inquiry
              </h2>
              <p className="text-neutral-500 text-sm mt-2">
                Our team will review your application and send official invitation credentials.
              </p>
              <div className="w-16 h-[3px] bg-[#C6112F] mx-auto mt-4 rounded-full" />
            </div>

            <div className="bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-10 shadow-xl">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 text-2xl font-black">
                    ✓
                  </div>
                  <h3 className="text-2xl font-black text-[#1a1f2c] mb-2">Inquiry Received!</h3>
                  <p className="text-neutral-600 text-sm max-w-md mx-auto">
                    Thank you for submitting your registration details. A representative from IR.INC & VID Media will be in contact shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                      {t("register-form-name", "Full Name")} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-800 text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                      {t("register-form-email", "Email Address")} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sarah@firm.com"
                      className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-800 text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                      {t("register-form-type-default", "Registration Type")} *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-800 text-sm outline-none transition-all bg-white"
                    >
                      <option value="investor">{t("register-form-type-investor", "Accredited Investor / Fund")}</option>
                      <option value="company">{t("register-form-type-company", "Mining Company / Issuer")}</option>
                      <option value="sponsor">{t("register-form-type-sponsor", "Sponsor / Partner")}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                      {t("register-form-message", "Message or Inquiry Details")}
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please include your organization name, role, or specific questions..."
                      className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 text-neutral-800 text-sm outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-black tracking-[0.15em] uppercase shadow-lg shadow-[#C6112F]/25 hover:scale-[1.01] transition-all duration-300"
                  >
                    {t("register-form-submit", "Submit Registration")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ═══════ TIER 1 SPONSORSHIP PROMOTION ═══════ */}
        <section className="relative w-full py-16 bg-white border-t border-neutral-200">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#C6112F] bg-[#C6112F]/10 px-3.5 py-1 rounded-full inline-block mb-3">
                  {t("register-sponsor-label", "SPONSORSHIP")}
                </span>
                <h3 className="text-2xl font-black text-[#1a1f2c] mb-2">
                  {t("register-sponsor-title", "Tier 1 Conference Partnership")}
                </h3>
                <p className="text-neutral-600 text-sm max-w-xl">
                  {t(
                    "register-sponsor-body",
                    "Our sponsors PDF outlines the full range of partnership opportunities available. To become a partner or to learn more about our sponsors program, contact us today."
                  )}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 shrink-0">
                <a
                  href="https://www.themininginvestmentevent.com/s/THE-Event-SPONSORS-2025-May-16pdf.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#C6112F] text-white text-xs font-bold tracking-[0.15em] uppercase shadow-md hover:bg-[#a50e27] transition-all"
                >
                  {t("register-sponsor-cta-pdf", "View Sponsors PDF")}
                </a>
                <a
                  href="/partnership"
                  className="px-6 py-3.5 rounded-xl border border-neutral-300 text-neutral-800 hover:border-[#C6112F] hover:text-[#C6112F] text-xs font-bold tracking-[0.15em] uppercase transition-all"
                >
                  {t("register-sponsor-cta-info", "Tier 1 Partnership Info")}
                </a>
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
