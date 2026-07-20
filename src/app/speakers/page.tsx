"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function SpeakersPage() {
  const { t, lang } = useLanguage();

  const keynoteSpeakersList = [
    {
      name: "Jennifer Knight",
      role: lang === "FR" ? "Conférencière d'Honneur et Dirigeante Minière" : "Keynote Speaker & Senior Executive",
      bio: lang === "FR" 
        ? "Leader reconnue de l'industrie minière présentant des perspectives stratégiques sur les minéraux critiques mondiaux et la gouvernance d'entreprise."
        : "Prominent mining industry leader presenting strategic insights on global critical minerals, capital deployment, and corporate governance.",
      tag: lang === "FR" ? "CONFÉRENCE D'HONNEUR" : "KEYNOTE",
    },
    {
      name: "Maïté Blanchette Vézina",
      role: lang === "FR" ? "Ministre des Ressources naturelles et des Forêts du Québec" : "Quebec Minister of Natural Resources and Forests",
      bio: lang === "FR"
        ? "Présentation ministérielle portant sur la stratégie du Québec en matière de minéraux critiques et de gestion durable des ressources."
        : "Keynote presentation addressing Quebec's critical mineral strategy, sustainable resource management, and northern development policies.",
      tag: lang === "FR" ? "DISCOURS MINISTÉRIEL" : "MINISTERIAL KEYNOTE",
    },
    {
      name: "Pierre Fitzgibbon",
      role: lang === "FR" ? "Ministre de l'Économie, de l'Innovation et de l'Énergie du Québec" : "Quebec Minister of Economy, Innovation and Energy",
      bio: lang === "FR"
        ? "Présentation des cadres économiques, des stratégies de transition énergétique et de l'innovation industrielle propulsant le secteur minier."
        : "Presenting economic frameworks, energy transition strategies, and industrial innovation powering Canada's mining ecosystem.",
      tag: lang === "FR" ? "DISCOURS MINISTÉRIEL" : "MINISTERIAL KEYNOTE",
    },
  ];

  const panelTopics = [
    {
      title: lang === "FR" ? "Panels Pléniers et Exécutifs" : "Plenary & Executive Panels",
      desc: lang === "FR"
        ? "PDG et gestionnaires de fonds institutionnels discutant des métaux critiques, de l'intégration ESG et des tendances de fusion-acquisition."
        : "CEOs and institutional fund managers discussing critical metals, ESG integration, energy transition, and M&A trends in global mining.",
    },
    {
      title: lang === "FR" ? "Vitrine d'Exploration Minière" : "Exploration & Junior Mining Showcases",
      desc: lang === "FR"
        ? "Leaders d'exploration émergents présentant les jalons de leurs projets et les résultats de forage."
        : "Emerging discovery leaders showcase project development milestones, drilling highlights, and exploration updates.",
    },
    {
      title: lang === "FR" ? "Capitaux Souverains et Délégations" : "Sovereign Capital & Global Delegations",
      desc: lang === "FR"
        ? "Délégations gouvernementales internationales et fonds souverains explorant des partenariats stratégiques transfrontaliers."
        : "International government delegations and sovereign investment funds exploring cross-border strategic partnerships.",
    },
  ];

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
              <span className="text-neutral-500">{t("nav-programs", "Programs")}</span>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white">{t("nav-speakers", "Speakers")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
              {t("speakers-hero-title-1", "Keynote")} <span className="text-[#C6112F]">{t("speakers-hero-title-2", "Speakers")}</span>
            </h1>
            <div className="w-20 h-[3px] bg-[#C6112F] mt-6" />
          </div>
        </section>

        {/* ═══════ KEYNOTE SPEAKERS ═══════ */}
        <section className="relative w-full py-16 sm:py-20 md:py-24">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("speakers-label", "THOUGHT LEADERSHIP")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] tracking-tight mb-3">
              {t("speakers-title", "World-Class Keynotes & Panel Discussions")}
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-4" />
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-[700px] mb-12">
              {t("speakers-sub", "Bringing together government ministers, institutional fund managers, CEOs, and global mining leaders to shape capital allocation and sustainability in the sector.")}
            </p>

            {/* Keynote Roster Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {keynoteSpeakersList.map((speaker, i) => (
                <div
                  key={i}
                  className="group bg-white border border-neutral-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-[#C6112F]/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="bg-[#C6112F]/10 text-[#C6112F] text-[10px] font-black tracking-wider uppercase px-3 py-1 rounded-full inline-block mb-4">
                      {speaker.tag}
                    </span>
                    <h3 className="text-2xl font-black text-[#1a1f2c] mb-1 group-hover:text-[#C6112F] transition-colors">
                      {speaker.name}
                    </h3>
                    <div className="text-xs font-bold text-neutral-400 mb-4">{speaker.role}</div>
                    <p className="text-neutral-600 text-sm leading-relaxed">{speaker.bio}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Panel Topics */}
            <div className="bg-[#f8f9fa] rounded-3xl p-8 sm:p-10 border border-neutral-200/60">
              <h3 className="text-2xl font-black text-[#1a1f2c] mb-6">
                {lang === "FR" ? "Sessions et Panels de Conférence" : "Conference Panel Sessions"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {panelTopics.map((topic, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-[#C6112F]/10 text-[#C6112F] font-bold text-xs flex items-center justify-center mb-3">
                      0{i + 1}
                    </div>
                    <h4 className="text-lg font-black text-[#1a1f2c] mb-2">{topic.title}</h4>
                    <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">{topic.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Speaking Slot Inquiries */}
            <div className="mt-12 bg-[#0f1117] text-white rounded-3xl p-8 text-center border border-neutral-800">
              <h4 className="text-xl font-black mb-2">{t("speakers-inquire-title", "Interested in Speaking Opportunities?")}</h4>
              <p className="text-neutral-400 text-sm max-w-xl mx-auto mb-6">
                {t("speakers-inquire-desc", "Speaking slots at THE Event provide unrivalled visibility before accredited investors and industry leaders.")}
              </p>
              <a
                href="mailto:jchoi@irinc.ca?subject=Speaking Inquiry"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C6112F] text-white text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#a50e27] transition-colors"
              >
                {t("speakers-inquire-btn", "Inquire About Speaking Slots")}
              </a>
            </div>
          </div>
        </section>

        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}
