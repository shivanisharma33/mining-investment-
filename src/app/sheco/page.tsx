"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

interface AnnualDonationItem {
  year: string;
  title: string;
  desc: string;
  link?: string;
  linkText?: string;
}

export default function SheCoPage() {
  const { t, lang } = useLanguage();
  const isFr = lang === "FR";

  const annualDonations: AnnualDonationItem[] = [
    {
      year: "2026",
      title: "Moisson Rive-Sud",
      desc: isFr
        ? "Moisson Rive-Sud — Banque alimentaire principale de la Montérégie soutenant la sécurité alimentaire et l'aide communautaire."
        : "Moisson Rive-Sud — Primary food bank in Montérégie supporting food security and essential community assistance.",
    },
    {
      year: "2025",
      title: isFr ? "La Société d'éducation et d'emploi de Quesnel" : "The Quesnel Education and Employment Society",
      desc: isFr
        ? "Don aux fins de soutenir l'éducation, la formation et l'emploi des membres de la communauté."
        : "Donation to support education, training and employment of community members.",
    },
    {
      year: "2024",
      title: "THE Drum Circle",
      desc: isFr
        ? "Don à un projet communautaire aidant les enfants locaux et immigrants traumatisés à Terre-Neuve-et-Labrador."
        : "THE Drum Circle community project donation assisted traumatized local and immigrant children in Newfoundland & Labrador.",
    },
    {
      year: "2023",
      title: isFr ? "Université de la Colombie-Britannique (UBC)" : "University of BC",
      desc: isFr
        ? "Don à l'Université de la C.-B. ayant aidé 3 jeunes femmes afghanes à poursuivre leurs programmes d'études."
        : "University of BC donation assisted 3 young Afghani women with their education programs.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-white dark:bg-[#0d111a] transition-colors duration-300">
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
              <span className="text-white">{t("sheco-breadcrumb-title", "SHE-Co Initiative")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
              SHE-Co <span className="text-[#C6112F]">Initiative</span>
            </h1>
            <p className="text-lg sm:text-xl font-bold text-neutral-300 mt-4 max-w-2xl">
              {isFr
                ? "Soutenir des projets d'éducation, de santé et de bien-être qui en valent la peine"
                : "Supporting Worthy Educational, Health and Wellness Projects"}
            </p>
            <div className="w-20 h-[3.5px] bg-[#C6112F] rounded-full mt-6" />
          </div>
        </section>

        {/* ═══════ OVERVIEW SECTION ═══════ */}
        <section className="relative w-full py-16 sm:py-20 md:py-24">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Side Image */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-zinc-800">
                  <img
                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=70"
                    alt="SHE-Co Empowerment"
                    className="w-full h-[380px] sm:h-[450px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-7">
                <span className="text-[#C6112F] text-xs font-black tracking-[0.25em] uppercase mb-2 block">
                  {isFr ? "L'INITIATIVE CARITATIVE DE IR.INC ET VID MEDIA" : "IR.INC & VID MEDIA'S CHARITABLE INITIATIVE"}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1f2c] dark:text-white tracking-tight mb-4 leading-tight">
                  &ldquo;{isFr ? "Habiliter les individus et les communautés" : "Empowering Individuals and Communities"}&rdquo;
                </h2>
                <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-6" />

                <p className="text-lg font-bold text-[#C6112F] mb-4">
                  {isFr
                    ? "Soutenir des projets d'éducation, de santé et de bien-être qui en valent la peine"
                    : "Supporting Worthy Educational, Health and Wellness Projects"}
                </p>

                <p className="text-neutral-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                  {isFr
                    ? "Chaque année, une portion des bénéfices de L'Événement est versée à des groupes à but non lucratif et caritatifs qualifiés. Les dons seront axés sur le soutien aux individus, groupes, institutions et/ou projets communautaires apportant une contribution positive dans la vie des gens."
                    : "Each year a portion of THE Event proceeds are donated to qualified non-profit and charitable groups. Donations will be focused on support to individuals, groups, institutions and/or community projects making a positive difference in the lives of people."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ ANNUAL DONATIONS TIMELINE ═══════ */}
        <section className="relative w-full bg-slate-50/80 dark:bg-[#121824] py-16 sm:py-20 md:py-24 border-t border-neutral-200/60 dark:border-slate-800">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <span className="text-[#C6112F] text-xs font-black tracking-[0.25em] uppercase mb-2 block">
              {isFr ? "DONS ANNUELS" : "ANNUAL DONATIONS"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1a1f2c] dark:text-white tracking-tight mb-10">
              {isFr ? "Impact à travers nos communautés" : "Impact Across Communities"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {annualDonations.map((item, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-[#182032] border border-neutral-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-xl hover:border-[#C6112F]/30 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-4 py-1.5 rounded-xl bg-[#C6112F] text-white font-black text-lg tracking-wider">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#1a1f2c] dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-slate-300 text-sm leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-4 text-xs font-black tracking-wider uppercase text-[#C6112F] hover:underline"
                    >
                      {item.linkText}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Featured Project: Quesnel Education and Employment Society */}
            <div className="bg-white dark:bg-[#182032] border border-neutral-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-lg mb-10">
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#C6112F] bg-[#C6112F]/10 px-3.5 py-1 rounded-full inline-block mb-4">
                {isFr ? "PROJET SOUTENU EN 2025" : "FEATURED INITIATIVE"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1a1f2c] dark:text-white mb-4">
                Quesnel Education and Employment Society
              </h3>
              <p className="text-neutral-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium mb-6">
                {isFr ? (
                  <>
                    Grâce à l&apos;aide de Sean Roosen, l&apos;initiative SHE-Co de L&apos;Événement est heureuse de soutenir la Quesnel Education and Employment Society. Cet organisme a été créé par la Nation Lhoosk&apos;uz Dene, la Nation Lhtako Dene et la Nation Nazko pour soutenir l&apos;éducation, la formation et l&apos;emploi des membres de la communauté.
                  </>
                ) : (
                  <>
                    Through the help of Sean Roosen, THE Event’s SHE-Co initiative is pleased to support the Quesnel Education and Employment Society. This organization established by the Lhoosk’uz Dene Nation, Lhtako Dene Nation and Nazko Nation to support education, training and employment of community members.
                  </>
                )}
              </p>
              <a
                href="https://dakelheed.wordpress.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-extrabold tracking-[0.15em] uppercase transition-all shadow-md"
              >
                <span>{isFr ? "En savoir plus ↗" : "Learn More ↗"}</span>
              </a>
            </div>

            {/* Featured Project: THE Drum Circle */}
            <div className="bg-white dark:bg-[#182032] border border-neutral-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-lg mb-12">
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#C6112F] bg-[#C6112F]/10 px-3.5 py-1 rounded-full inline-block mb-4">
                {isFr ? "PROJET EN VEDETTE" : "FEATURED INITIATIVE"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1a1f2c] dark:text-white mb-4">
                THE Drum Circle
              </h3>
              <div className="space-y-4 text-neutral-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                {isFr ? (
                  <>
                    <p>
                      Grâce à notre initiative SHE-Co, nous avons fièrement soutenu &laquo;THE Drum Circle&raquo; à l&apos;école élémentaire Bishop Field à St John&apos;s, Terre-Neuve. Ce programme s&apos;adresse aux élèves de la 4e à la 6e année ayant des besoins sociaux et émotionnels et nécessitant un soutien pour des questions telles que l&apos;anxiété, les traumatismes ou le deuil. Notre don a permis de financer l&apos;achat de 10 ensembles de tambours des Premières Nations et l&apos;embauche d&apos;un animateur pour intégrer les tambours, les chants et les mouvements rythmiques dans les cercles de partage des enfants.
                    </p>
                    <p>
                      Cette initiative favorise la guérison émotionnelle, la création de liens et l&apos;apprentissage culturel en s&apos;appuyant sur des pratiques restauratrices et les traditions des Premières Nations pour créer un espace sûr et accueillant pour ces enfants.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Through our SHE-Co Initiative, we proudly supported &ldquo;THE Drum Circle&rdquo; at Bishop Field Elementary in St John’s, Newfoundland. This program is for students in Grades 4-6 with social and emotional needs who require support for issues such as anxiety, trauma, or grief. Our donation helped fund the purchase of 10 First Nations drum kits and a facilitator to incorporate drumming, chanting, and rhythmic movement into the children’s sharing circles.
                    </p>
                    <p>
                      This initiative promotes emotional healing, connection, and cultural learning by drawing on restorative practices and First Nations traditions to create a safe, supportive space for these children.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Resident Artist 2026 - Bertram Turmel */}
            <div className="bg-[#0f1117] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-neutral-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6112F]/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <span className="w-10 h-10 rounded-xl bg-[#C6112F] text-white font-black text-sm flex items-center justify-center">
                  BT
                </span>
                <span className="text-xs font-black tracking-[0.2em] uppercase text-[#C6112F]">
                  {isFr ? "ARTISTE EN RÉSIDENCE POUR 2026" : "THE RESIDENT ARTIST FOR 2026"}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 relative z-10">
                {isFr ? "Rencontrez l'artiste en résidence pour 2026" : "Meet THE Resident Artist for 2026"}
              </h3>

              <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed font-normal mb-8 relative z-10">
                <p className="font-bold text-white text-base sm:text-lg">
                  {isFr
                    ? "Nous sommes heureux de présenter Bertram Turmel à L'Événement."
                    : "We are pleased to introduce Bertram Turmel to THE Event."}
                </p>
                <p>
                  {isFr
                    ? "Bertram est un artiste reconnu de Québec et l'artiste officiel du Château Frontenac à Québec. Vous pouvez également retrouver Bertram sur la rue des Trésors où il possède un studio en direct et expose plusieurs de ses toiles."
                    : "Bertram is a well-known, recognized Quebec City Artist and the official Experience Artist of the Chateau Frontenac in Quebec City. You can also find Bertram on the rue des Tresors where he has a live studio and displays many of his fine canvases."}
                </p>
                <p>
                  {isFr
                    ? "Bertram sera l'artiste en résidence pendant L'Événement, avec un studio en direct dans le Manège militaire où les gens sont invités à le regarder peindre ses toiles."
                    : "Bertram will be THE Resident Artist during THE Event; with a live studio in the Armoury where people are invited to view and watch him execute his canvases."}
                </p>
                <div className="p-4 rounded-2xl bg-[#C6112F]/15 border border-[#C6112F]/30 text-white font-bold text-sm sm:text-base">
                  {isFr
                    ? "Une portion de toutes les peintures vendues par Bertram lors de L'Événement sera versée à l'initiative SHE-Co."
                    : "A portion of all paintings sold by Bertram at THE Event will be donated to the SHE-Co Initiative."}
                </div>
              </div>

              <a
                href="https://bertrandturmel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs sm:text-sm font-black tracking-[0.15em] uppercase transition-all shadow-lg shadow-[#C6112F]/30 hover:scale-105 relative z-10"
              >
                <span>{isFr ? "En savoir plus sur Bertram ↗" : "Read More About Bertram! ↗"}</span>
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
