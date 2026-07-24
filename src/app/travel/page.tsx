"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const flights = [
  { city: "Toronto", time: "1.5 hrs" },
  { city: "Montreal", time: "45 mins" },
  { city: "Vancouver", time: "5 hrs" },
  { city: "NY", time: "2.5 hrs" },
  { city: "London", time: "8.5 hrs" },
  { city: "Paris", time: "7.5 hrs" },
];

export default function TravelPage() {
  const { t } = useLanguage();

  const localizedAccommodations = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5M2.25 18h19.5M2.25 18V9A2.25 2.25 0 014.5 6.75h5.836A2.25 2.25 0 0112 7.5v10.5m0-10.5h5.836A2.25 2.25 0 0120.25 9v9M3.75 18v-3a1.5 1.5 0 011.5-1.5h3.75a1.5 1.5 0 011.5 1.5v3m3-6v-3a1.5 1.5 0 011.5-1.5h3.75a1.5 1.5 0 011.5 1.5v3" />
        </svg>
      ),
      title: t("travel-hilton-title", "Hilton Québec"),
      desc: t("travel-hilton-desc", "Experience luxury and convenience at the Hilton Hotel in Quebec City, perfectly positioned just steps away from the Quebec City Convention Centre. Indulge in exquisite dining, unwind with a cocktail at the lounge, or rejuvenate in the state-of-the-art fitness centre."),
      note: t("travel-hilton-note", "Discounted block rates available for registered participants only. You are responsible for coordinating all your own travel and lodging arrangements."),
      link: "https://www.hilton.com/en/hotels/yqbhihh-hilton-quebec/",
      linkText: t("travel-hilton-link", "View Hotel Website ↗"),
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 4h14a2 2 0 012 2v10a2 2 0 01-2 2h-1.5L19 21h-2l-1.5-3h-7L7 21H5l1.5-3H5a2 2 0 01-2-2V6a2 2 0 012-2zm0 4h14M8 14h2m4 0h2" />
        </svg>
      ),
      title: t("travel-train-title", "Train Travel to Quebec (YQB)"),
      desc: t("travel-train-desc", "Estimated train travel times:\n• From Toronto: 8 hrs (with a transfer at Montreal to QC)\n• From Montreal: 3 hrs\n\nThe train station in Quebec City is 5 mins by taxi to most major hotels."),
      link: "https://www.viarail.ca/en/travel-info/booking/buy-train-ticket",
      linkText: t("travel-train-link", "Book Ticket at Via Rail ↗"),
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6H8.25L5.25 9H3.75A1.5 1.5 0 002.25 10.5v3.75a1.5 1.5 0 001.5 1.5h16.5a1.5 1.5 0 001.5-1.5V10.5A1.5 1.5 0 0018.75 9H18L15.75 6zm-9 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm11.25 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      ),
      title: t("travel-limo-title", "Limousine A1 (Private Transportation)"),
      desc: t("travel-limo-desc", "If you wish to book private transportation, we invite you to contact Limousine A1 directly to arrange. With over 40 years of experience, Limousine A1 provides personalized transportation and seamless logistics in Quebec.\n\nTel: 418-523-5059\nEmail: res@limousinequebec.com"),
      note: t("travel-limo-note", "Restricted to registered participants only."),
      link: "http://www.limousinequebec.com/",
      linkText: t("travel-limo-link", "Arrange Private Transportation ↗"),
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12h12a1.5 1.5 0 011.5 1.5V10a1.5 1.5 0 000 4v2.5A1.5 1.5 0 0119.5 18h-12a1.5 1.5 0 01-1.5-1.5V14a1.5 1.5 0 000-4V7.5A1.5 1.5 0 017.5 6z" />
        </svg>
      ),
      title: t("travel-discount-title", "Delegate Discount Program"),
      desc: t("travel-discount-desc", "Our venue partner, The Québec City Convention Centre, offers delegates of THE Event exclusive discounts at select restaurants, attractions and boutiques throughout Quebec City.\n\nPlease check with individual properties regarding cancellation policy, deposit requirement, and taxes/fees."),
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full">
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
              <span className="text-neutral-500">{t("nav-about", "About")}</span>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white">{t("nav-travel", "Travel & Accommodations")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
              {t("travel-hero-title-1", "Travel &")} <span className="text-[#C6112F]">{t("travel-hero-title-2", "Accommodations")}</span>
            </h1>
            <div className="w-20 h-[3px] bg-[#C6112F] mt-6" />
          </div>
        </section>

        {/* ═══════ TOP TRAVEL & ACCOMMODATIONS INTRO ═══════ */}
        <section className="relative w-full bg-white py-14 sm:py-18 md:py-20">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("travel-venue-label", "TRAVEL & ACCOMMODATIONS")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] tracking-tight mb-3">
              {t("travel-main-heading", "Travel & Accommodations")}
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-6" />

            {/* Prominent Top Announcement Notice */}
            <div className="bg-[#f8fafc] border border-neutral-200/90 rounded-2xl p-6 sm:p-8 md:p-10 mb-12 shadow-2xs">
              <h3 className="text-xl sm:text-2xl font-black text-[#1a1f2c] mb-3">
                {t(
                  "travel-event-welcome",
                  "Welcome to THE Mining Investment EVENT, taking place Tuesday, June 2 to Thursday, June 4, 2026 at the Centre des congrès de Québec (“QCC”)"
                )}
              </h3>
              <div className="w-12 h-[2.5px] bg-[#C6112F] mb-4" />

              <a
                href="https://www.convention.qc.ca/en/about/ceo-message/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg font-extrabold text-[#C6112F] hover:underline inline-flex items-center gap-1.5 mb-3"
              >
                <span>{t("travel-about-qcc", "About the Centre des congrès de Québec")}</span>
                <span className="text-sm">↗</span>
              </a>

              <div className="space-y-2 text-neutral-700 text-sm sm:text-base font-medium leading-relaxed">
                <p className="flex items-start gap-2">
                  <span className="text-[#C6112F] font-bold">•</span>
                  <span>{t("travel-notice-1", "Discounted block rates available for registered participants only.")}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-[#C6112F] font-bold">•</span>
                  <span>
                    {t(
                      "travel-notice-2",
                      "You are responsible for coordinating all your own travel and lodging arrangements. Please check with individual properties regarding cancellation policy, deposit requirement, and taxes/fees."
                    )}
                  </span>
                </p>
              </div>
            </div>

            {/* Convention Centre Card */}
            <div className="bg-[#f8fafc] border border-neutral-200 rounded-2xl p-6 sm:p-8 flex flex-col mb-12">
              <div className="w-14 h-14 rounded-2xl bg-[#fef2f2] border border-[#C6112F]/10 flex items-center justify-center text-[#C6112F] mb-5">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-[#1a1f2c] mb-3">
                <a
                  href="https://www.convention.qc.ca/en/about/ceo-message/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C6112F] transition-colors"
                >
                  {t("travel-convention-title", "About the Centre des congrès de Québec ↗")}
                </a>
              </h3>
              <div className="w-10 h-[2px] bg-[#C6112F] mb-3" />
              <p className="text-neutral-600 text-sm leading-relaxed flex-1 font-medium">
                {t("travel-convention-desc", "Welcome to the Centre des congrès de Québec, where elegance meets innovation. Nestled within the charming historic district of Old Quebec, this world-class facility seamlessly blends modern amenities with the rich tapestry of Quebecois culture.")}
              </p>
              <p className="text-[#C6112F] text-xs font-semibold mt-4">
                {t("travel-convention-note", "Please Note: Discounted block rates available for registered participants only. You are responsible for coordinating all your own travel and lodging arrangements.")}
              </p>
              <a
                href="https://www.convention.qc.ca/en/about/ceo-message/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-[#C6112F] text-sm font-bold hover:underline inline-flex items-center gap-1"
              >
                {t("travel-convention-link", "View Convention Centre ↗")}
              </a>
            </div>

            {/* 3 Transportation Cards Grid with Public Travel Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Air Travel Card with travle-1.webp */}
              <div className="bg-white border border-neutral-200/90 rounded-2xl overflow-hidden p-5 sm:p-6 flex flex-col shadow-2xs hover:border-[#C6112F]/40 hover:shadow-[0_12px_30px_rgba(198,17,47,0.08)] transition-all duration-500 group hover:-translate-y-1">
                <div className="w-full h-36 sm:h-40 rounded-xl overflow-hidden bg-neutral-900 mb-4 relative shrink-0">
                  <img
                    src="/travle-1.webp"
                    alt="Air Travel to Quebec YQB"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                    AIR TRAVEL
                  </div>
                </div>

                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-[#fef2f2] border border-[#C6112F]/10 flex items-center justify-center text-[#C6112F] shrink-0">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-[#1a1f2c] leading-snug">
                    {t("travel-air-title", "Air Travel direct to Quebec (YQB) estimated times")}
                  </h3>
                </div>
                <div className="w-10 h-[2px] bg-[#C6112F] mb-3" />

                <div className="grid grid-cols-2 gap-1.5 mb-3.5">
                  {flights.map((f) => (
                    <div
                      key={f.city}
                      className="flex items-center justify-between bg-[#f8fafc] border border-neutral-200/80 rounded-lg px-2.5 py-1"
                    >
                      <span className="text-neutral-700 text-[11px] font-medium">{f.city}</span>
                      <span className="text-[#C6112F] text-[11px] font-bold">{f.time}</span>
                    </div>
                  ))}
                </div>

                <p className="text-neutral-600 text-xs leading-relaxed font-medium flex-1 mb-2">
                  {t(
                    "travel-air-carrier-note",
                    "All major carriers fly to Toronto or Montreal, where you may do a quick connection to YQB. Some carriers fly direct to YQB, Please check with your carrier of choice. Jean Lesage International airport in Quebec City is a 20 minute taxi ride to/from The Chateau Frontenac."
                  )}
                </p>
                <a
                  href="https://www.aeroportdequebec.com/en/flights-and-destinations/destinations-served"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-[#C6112F] text-xs font-bold hover:underline inline-flex items-center gap-1"
                >
                  {t("travel-air-link-btn", "Check YQB destinations ↗")}
                </a>
              </div>

              {/* Train Travel Card with travle-2.webp */}
              <div className="bg-white border border-neutral-200/90 rounded-2xl overflow-hidden p-5 sm:p-6 flex flex-col shadow-2xs hover:border-[#C6112F]/40 hover:shadow-[0_12px_30px_rgba(198,17,47,0.08)] transition-all duration-500 group hover:-translate-y-1">
                <div className="w-full h-36 sm:h-40 rounded-xl overflow-hidden bg-neutral-900 mb-4 relative shrink-0">
                  <img
                    src="/travle-2.webp"
                    alt="Train Travel VIA Rail Quebec"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                    TRAIN TRAVEL
                  </div>
                </div>

                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-[#fef2f2] border border-[#C6112F]/10 flex items-center justify-center text-[#C6112F] shrink-0">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 4h14a2 2 0 012 2v10a2 2 0 01-2 2h-1.5L19 21h-2l-1.5-3h-7L7 21H5l1.5-3H5a2 2 0 01-2-2V6a2 2 0 01-2-2zm0 4h14M8 14h2m4 0h2" />
                    </svg>
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-[#1a1f2c] leading-snug">
                    {t("travel-train-title", "Train Travel to Quebec (YQB) estimated times:")}
                  </h3>
                </div>
                <div className="w-10 h-[2px] bg-[#C6112F] mb-3" />

                <div className="space-y-1.5 text-xs font-medium text-neutral-700 mb-3 bg-[#f8fafc] border border-neutral-200/80 p-2.5 rounded-lg">
                  <p className="flex justify-between items-center text-[11px]">
                    <span>• From Toronto:</span>
                    <span className="font-bold text-[#C6112F]">8 hrs (transfer at Montreal)</span>
                  </p>
                  <p className="flex justify-between items-center border-t border-neutral-200/60 pt-1.5 text-[11px]">
                    <span>• From Montreal:</span>
                    <span className="font-bold text-[#C6112F]">3 hrs</span>
                  </p>
                </div>

                <p className="text-neutral-600 text-xs leading-relaxed font-medium flex-1 mb-2">
                  {t("travel-train-taxi-note", "The train station in Quebec City is 5 mins by taxi to most major hotels.")}
                </p>
                <a
                  href="https://www.viarail.ca/en/travel-info/booking/buy-train-ticket"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-[#C6112F] text-xs font-bold hover:underline inline-flex items-center gap-1"
                >
                  {t("travel-train-btn", "Book tickets online at Via Rail ↗")}
                </a>
              </div>

              {/* Private Transportation Card with travle-3.webp */}
              <div className="bg-white border border-neutral-200/90 rounded-2xl overflow-hidden p-5 sm:p-6 flex flex-col shadow-2xs hover:border-[#C6112F]/40 hover:shadow-[0_12px_30px_rgba(198,17,47,0.08)] transition-all duration-500 group hover:-translate-y-1">
                <div className="w-full h-36 sm:h-40 rounded-xl overflow-hidden bg-neutral-900 mb-4 relative shrink-0">
                  <img
                    src="/travle-4.webp"
                    alt="Private Transportation Limousine A1"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                    PRIVATE TRANSPORT
                  </div>
                </div>

                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-[#fef2f2] border border-[#C6112F]/10 flex items-center justify-center text-[#C6112F] shrink-0">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6H8.25L5.25 9H3.75A1.5 1.5 0 002.25 10.5v3.75a1.5 1.5 0 001.5 1.5h16.5a1.5 1.5 0 001.5-1.5V10.5A1.5 1.5 0 0018.75 9H18L15.75 6zm-9 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm11.25 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    </svg>
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-[#1a1f2c] leading-snug">
                    {t("travel-limo-heading", "Private Transportation")}
                  </h3>
                </div>
                <div className="w-10 h-[2px] bg-[#C6112F] mb-3" />
                <p className="text-neutral-600 text-xs leading-relaxed font-medium flex-1 mb-2">
                  {t(
                    "travel-limo-text",
                    "If wish to book private transportation, we invite you to contact Limousine A1 directly to arrange."
                  )}
                </p>
                <div className="mt-2.5 p-2.5 bg-[#f8fafc] border border-neutral-200/80 rounded-lg text-xs font-semibold text-neutral-800 space-y-0.5">
                  <p>Tel: <a href="tel:4185235059" className="text-[#C6112F] hover:underline">418-523-5059</a></p>
                  <p>Email: <a href="mailto:res@limousinequebec.com" className="text-[#C6112F] hover:underline">res@limousinequebec.com</a></p>
                </div>
                <a
                  href="http://www.limousinequebec.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-[#C6112F] text-xs font-bold hover:underline inline-flex items-center gap-1"
                >
                  {t("travel-limo-btn", "Contact Limousine A1 ↗")}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ ACCOMMODATIONS ═══════ */}
        <section className="relative w-full bg-white py-16 sm:py-20 md:py-24">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("travel-services-label", "HOTELS & DISCOUNTS")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] tracking-tight mb-3">
              {t("travel-services-title", "Accommodations & Hotel Discounts")}
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-10" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {localizedAccommodations.map((item) => (
                <div
                  key={item.title}
                  className="group bg-white border border-neutral-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs hover:border-[#C6112F]/40 hover:shadow-[0_12px_30px_rgba(198,17,47,0.08)] transition-all duration-500 hover:-translate-y-1 flex flex-col"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#fef2f2] border border-[#C6112F]/10 flex items-center justify-center text-[#C6112F] mb-4 group-hover:bg-[#C6112F] group-hover:text-white group-hover:shadow-md group-hover:shadow-[#C6112F]/20 transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-black text-[#1a1f2c] mb-2">{item.title}</h3>
                  <div className="w-10 h-[2px] bg-[#C6112F] mb-3" />
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line flex-1 font-medium">{item.desc}</p>
                  {item.note && (
                    <p className="text-[#C6112F] text-xs font-semibold mt-3">{item.note}</p>
                  )}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 text-[#C6112F] text-xs sm:text-sm font-bold hover:underline inline-flex items-center gap-1"
                    >
                      {item.linkText}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}
