"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function SheCoPage() {
  const { t, lang } = useLanguage();

  const annualDonations = [
    {
      year: "2026",
      title: "The Quesnel Education and Employment Society",
      desc: lang === "FR"
        ? "Don aux fins de soutenir l'éducation, la formation et l'emploi des membres de la communauté. Établi par la Nation Lhoosk'uz Dene, la Nation Lhtako Dene et la Nation Nazko."
        : "Donation to support education, training and employment of community members. Established by the Lhoosk'uz Dene Nation, Lhtako Dene Nation and Nazko Nation.",
    },
    {
      year: "2025",
      title: "The Quesnel Education and Employment Society",
      desc: lang === "FR"
        ? "Don aux fins de soutenir l'éducation, la formation et l'emploi des membres de la communauté. Grâce à l'aide de Sean Roosen, l'initiative SHE-Co est heureuse de soutenir cet organisme."
        : "Donation to support education, training and employment of community members. Through the help of Sean Roosen, THE Event's SHE-Co initiative is pleased to support this organization.",
      link: "https://dakelheed.wordpress.com/",
      linkText: lang === "FR" ? "En savoir plus ↗" : "Learn More ↗",
    },
    {
      year: "2024",
      title: "THE Drum Circle",
      desc: lang === "FR"
        ? "Don à un projet communautaire aidant les enfants locaux et immigrants traumatisés à Terre-Neuve-et-Labrador."
        : "Community project donation assisted traumatized local and immigrant children in Newfoundland & Labrador.",
    },
    {
      year: "2023",
      title: "University of British Columbia",
      desc: lang === "FR"
        ? "Don ayant aidé 3 jeunes femmes afghanes à poursuivre leurs programmes d'études."
        : "Donation assisted 3 young Afghani women with their education programs.",
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
              <span className="text-neutral-500">{t("sheco-breadcrumb-init", "Initiatives")}</span>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white">{t("sheco-breadcrumb-title", "SHE-CO Initiative")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
              {t("sheco-hero-title-1", "SHE-CO")} <span className="text-[#C6112F]">{t("sheco-hero-title-2", "Initiative")}</span>
            </h1>
            <div className="w-20 h-[3px] bg-[#C6112F] mt-6" />
          </div>
        </section>

        {/* ═══════ OVERVIEW SECTION ═══════ */}
        <section className="relative w-full py-16 sm:py-20 md:py-24">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Side Image */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200">
                  <img
                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=70"
                    alt="SHE-CO Empowerment"
                    className="w-full h-[380px] sm:h-[450px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-7">
                <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
                  {t("sheco-label", "CHARITABLE INITIATIVE")}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1f2c] tracking-tight mb-4 leading-tight">
                  &quot;{t("sheco-title-1", "Empowering Individuals")} <span className="text-[#C6112F]">{t("sheco-title-2", "and Communities")}</span>&quot;
                </h2>
                <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-6" />

                <p className="text-lg font-bold text-neutral-800 mb-4">
                  {t("sheco-sub", "Supporting Worthy Educational, Health and Wellness Projects. IR.INC & VID Media's Charitable Initiative.")}
                </p>

                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  {t(
                    "sheco-body",
                    "Each year a portion of THE Event proceeds are donated to qualified non-profit and charitable groups. Donations will be focused on support to individuals, groups, institutions and/or community projects making a positive difference in the lives of people."
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ ANNUAL DONATIONS TIMELINE ═══════ */}
        <section className="relative w-full bg-[#f8f9fa] py-16 sm:py-20 md:py-24 border-t border-neutral-200/60">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("sheco-donations-label", "ANNUAL DONATIONS")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1a1f2c] tracking-tight mb-10">
              {t("sheco-donations-title", "Impact Across Communities")}
            </h2>

            <div className="space-y-6">
              {annualDonations.map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-[#C6112F]/30 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start"
                >
                  <div className="px-5 py-2 rounded-xl bg-[#C6112F] text-white font-black text-xl tracking-wider shrink-0">
                    {item.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-black text-[#1a1f2c] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                      {item.desc}
                    </p>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-xs font-bold tracking-wider uppercase text-[#C6112F] hover:underline"
                      >
                        {item.linkText}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Spotlight Project: THE Drum Circle */}
            <div className="mt-14 bg-white border border-neutral-200 rounded-3xl p-8 sm:p-10 shadow-lg">
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#C6112F] bg-[#C6112F]/10 px-3.5 py-1 rounded-full inline-block mb-4">
                {t("sheco-drum-spotlight", "SPOTLIGHT PROJECT")}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1a1f2c] mb-4">
                {t("sheco-drum-title", "THE Drum Circle")}
              </h3>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                {lang === "FR" ? (
                  <>
                    Grâce à notre initiative SHE-Co, nous avons fièrement soutenu &quot;THE Drum Circle&quot; à l&apos;école élémentaire Bishop Field à Saint-Jean de Terre-Neuve. Ce programme s&apos;adresse aux élèves de la 4e à la 6e année ayant des besoins sociaux et émotionnels et nécessitant un soutien pour des questions telles que l&apos;anxiété, les traumatismes ou le deuil. Notre don a permis de financer l&apos;achat de 10 ensembles de tambours des Premières Nations et l&apos;embauche d&apos;un animateur.<br /><br />
                    Cette initiative favorise la guérison émotionnelle, la création de liens et l&apos;apprentissage culturel en s&apos;appuyant sur des pratiques restauratrices et les traditions des Premières Nations pour créer un espace sûr et accueillant pour ces enfants.
                  </>
                ) : (
                  <>
                    Through our SHE-Co Initiative, we proudly supported &quot;THE Drum Circle&quot; at Bishop Field Elementary in St John&apos;s, Newfoundland. This program is for students in Grades 4-6 with social and emotional needs who require support for issues such as anxiety, trauma, or grief. Our donation helped fund the purchase of 10 First Nations drum kits and a facilitator to incorporate drumming, chanting, and rhythmic movement into the children&apos;s sharing circles.<br /><br />
                    This initiative promotes emotional healing, connection, and cultural learning by drawing on restorative practices and First Nations traditions to create a safe, supportive space for these children.
                  </>
                )}
              </p>
            </div>

            {/* Resident Artist 2024 - Bertram Turmel */}
            <div className="mt-10 bg-[#0f1117] text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-neutral-800">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-xl bg-[#C6112F] text-white font-black text-sm flex items-center justify-center">
                  BT
                </span>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400">
                  {t("sheco-artist-label", "THE RESIDENT ARTIST 2024")}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                {t("sheco-artist-title", "Meet Bertram Turmel")}
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light mb-6">
                {lang === "FR" ? (
                  <>
                    Nous sommes heureux de présenter Bertram Turmel à L&apos;Événement. Bertram est un artiste reconnu de Québec et l&apos;artiste officiel du Château Frontenac à Québec. Vous pouvez également retrouver Bertram sur la rue des Trésors où il possède un studio en direct et expose plusieurs de ses toiles.<br /><br />
                    Bertram sera l&apos;artiste en résidence pendant L&apos;Événement, avec un studio en direct dans Manège militaire où les gens sont invités à le regarder peindre ses toiles.<br /><br />
                    <strong className="text-white font-bold">Une partie de toutes les peintures vendues par Bertram lors de L&apos;Événement sera versée à l&apos;initiative SHE-Co.</strong>
                  </>
                ) : (
                  <>
                    We are pleased to introduce Bertram Turmel to THE Event. Bertram is a well-known, recognized Quebec City Artist and the official Experience Artist of the Chateau Frontenac in Quebec City. You can also find Bertram on the rue des Tresors where he has a live studio and displays many of his fine canvases.<br /><br />
                    Bertram will be THE Resident Artist during THE Event; with a live studio in the Armoury where people are invited to view and watch him execute his canvases.<br /><br />
                    <strong className="text-white font-bold">A portion of all paintings sold by Bertram at THE Event will be donated to the SHE-Co Initiative.</strong>
                  </>
                )}
              </p>
              <a
                href="https://bertrandturmel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C6112F] text-white text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#a50e27] transition-colors"
              >
                <span>{t("sheco-artist-cta", "Read More About Bertram ↗")}</span>
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
