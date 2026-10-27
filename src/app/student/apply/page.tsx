"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import StudentApplicationForm from "@/components/StudentApplicationForm";

export default function StudentApplyPage() {
  const { t, isFr } = useLanguage();

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-[#fcfcfd] dark:bg-[#0c0d12] text-neutral-900 dark:text-neutral-100 selection:bg-[#C6112F] selection:text-white">
        {/* ═══════ HERO SECTION ═══════ */}
        <section className="relative w-full bg-[#0b0f19] overflow-hidden text-white pt-28 sm:pt-30 md:pt-32 pb-12 sm:pb-14 md:pb-16 border-b border-neutral-800">
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
                {isFr ? "Programme de Partenariat Étudiant" : t("student-breadcrumb-prog", "Student Sponsorship")}
              </Link>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white font-semibold">{isFr ? "Candidature" : "Application"}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#C6112F]/15 border border-[#C6112F]/30 text-[#ff4d6d] text-xs font-bold tracking-widest uppercase mb-5 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#C6112F] animate-pulse" />
                  <span>
                    {isFr ? "CANDIDATURE OFFICIELLE — COHORTE ÉTUDIANTE 2026" : "CLASS OF 2026 OFFICIAL APPLICATION"}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5">
                  {isFr ? (
                    <>
                      Postulez au <span className="text-[#C6112F]">Programme Étudiant</span>
                    </>
                  ) : (
                    <>
                      Apply for THE Student{" "}
                      <span className="text-[#C6112F]">Partnership Program</span>
                    </>
                  )}
                </h1>

                <p className="text-neutral-300 text-base sm:text-lg font-normal leading-relaxed max-w-2xl">
                  {isFr
                    ? "Bénéficiez d'une participation entièrement financée à l'événement mondial de niveau 1 sur l'investissement minier à Québec. Ouvert aux étudiants universitaires et collégiaux en géologie, sciences de la terre, finance et génie."
                    : "Unlock fully funded attendance to Canada's Tier 1 global mining event in Québec City. Open to university and college students in geology, earth sciences, finance, and engineering."}
                </p>
              </div>

              {/* Quick Perks Bar */}
              <div className="lg:col-span-4 bg-neutral-900/80 border border-neutral-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl">
                <h3 className="text-xs font-extrabold text-[#ff4d6d] uppercase tracking-widest mb-4">
                  {isFr ? "Avantages du Programme Inclus" : "Sponsorship Perks Included"}
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-neutral-200">
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#C6112F]/20 text-[#ff4d6d] flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                    <span>{isFr ? "Laissez-passer conférence 100% financé" : "100% Covered Conference Tuition Pass"}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#C6112F]/20 text-[#ff4d6d] flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                    <span>{isFr ? "Autocar gratuit Montréal ⇄ Québec" : "Complimentary Montreal ⇄ Quebec Coach Bus"}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#C6112F]/20 text-[#ff4d6d] flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                    <span>{isFr ? "Hébergement à l'hôtel pendant tout le programme" : "Hotel Accommodation Throughout Program"}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#C6112F]/20 text-[#ff4d6d] flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                    <span>{isFr ? "Mentorat exécutif & Concours d'études de cas" : "Executive Mentorship & Case Competition"}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ APPLICATION FORM CONTAINER ═══════ */}
        <section className="relative w-full py-12 sm:py-16 md:py-20 bg-white dark:bg-[#0f1117]">
          <div className="max-w-[960px] mx-auto px-4 sm:px-6 md:px-8">
            <StudentApplicationForm />

            {/* Application FAQs Section */}
            <div className="mt-16 pt-12 border-t border-neutral-200 dark:border-neutral-800">
              <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block text-center">
                {isFr ? "FOIRE AUX QUESTIONS" : "FREQUENTLY ASKED QUESTIONS"}
              </span>
              <h3 className="text-2xl font-black text-center mb-8">
                {isFr ? "Directives de Candidature" : "Application Guidelines"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <h4 className="text-sm font-bold text-[#1a1f2c] dark:text-white mb-2">
                    {isFr ? "Qui est admissible ?" : "Who is eligible to apply?"}
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {isFr
                      ? "Les étudiants à temps plein de niveau postsecondaire (université ou collège) en géologie, sciences de la terre, génie minier, métallurgie ou finance dans les établissements canadiens."
                      : "Full-time post-secondary university or college students studying geology, earth sciences, mining engineering, metallurgy, or finance across Canadian institutions."}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <h4 className="text-sm font-bold text-[#1a1f2c] dark:text-white mb-2">
                    {isFr ? "Que couvre la bourse ?" : "What does sponsorship cover?"}
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {isFr
                      ? "100 % de votre inscription à la conférence, des accès aux sessions techniques, de l'hébergement à l'hôtel pendant l'événement et du transport par autocar entre Montréal et Québec."
                      : "100% of your conference ticket, technical session passes, hotel stay throughout THE Event, and coach transportation between Montreal and Québec City."}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <h4 className="text-sm font-bold text-[#1a1f2c] dark:text-white mb-2">
                    {isFr ? "Quelles sont les dates ?" : "What are the dates?"}
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {isFr
                      ? "La cohorte étudiante arrive le 31 mai pour l'orientation et participe à toutes les activités officielles jusqu'au 3 juin à Québec."
                      : "The student cohort arrives May 31 for orientation and takes part in all official activities through June 3 in Québec City."}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <h4 className="text-sm font-bold text-[#1a1f2c] dark:text-white mb-2">
                    {isFr ? "Quelles sont les limites de mots ?" : "What are the application question limits?"}
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {isFr
                      ? "Chaque question de candidature comporte une limite de 500 mots. Un compteur en direct vous permet d'assurer des réponses concises et ciblées."
                      : "Each application essay has a 500-word limit. Live word counters on the form help ensure concise, focused statements."}
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
