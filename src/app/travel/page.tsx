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
  { city: "New York", time: "2.5 hrs" },
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
      note: t("travel-hilton-note", "Entry into THE Event and special hotel discount rates are restricted to registered participants only."),
      link: "https://www.hilton.com/en/hotels/yqbhihh-hilton-quebec/",
      linkText: t("travel-hilton-link", "View Hotel Website ↗"),
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 4h14a2 2 0 012 2v10a2 2 0 01-2 2h-1.5L19 21h-2l-1.5-3h-7L7 21H5l1.5-3H5a2 2 0 01-2-2V6a2 2 0 012-2zm0 4h14M8 14h2m4 0h2" />
        </svg>
      ),
      title: t("travel-train-title", "Train Travel (VIA Rail)"),
      desc: t("travel-train-desc", "Estimated train times to Quebec City:\n• From Toronto: 8 hrs (transfer at Montreal)\n• From Montreal: 3 hrs\n\nThe train station in Quebec City is just 5 minutes by taxi to most major hotels. Book your tickets online at VIA Rail."),
      link: "https://www.viarail.ca/en/travel-info/booking/buy-train-ticket",
      linkText: t("travel-train-link", "Book Train Ticket ↗"),
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6H8.25L5.25 9H3.75A1.5 1.5 0 002.25 10.5v3.75a1.5 1.5 0 001.5 1.5h16.5a1.5 1.5 0 001.5-1.5V10.5A1.5 1.5 0 0018.75 9H18L15.75 6zm-9 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm11.25 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      ),
      title: t("travel-limo-title", "Limousine A1"),
      desc: t("travel-limo-desc", "With over 40 years of experience in transportation management and coordination, Limousine A1 is the leading limousine carrier in the province of Quebec. Their team of professionals provides a personalized transportation experience, seamless logistics, and a courteous attitude.\n\nTel: 418-523-5059\nEmail: res@limousinequebec.com"),
      note: t("travel-limo-note", "Entry into THE Event and special discount rates are restricted to registered participants only."),
      link: "http://www.limousinequebec.com/",
      linkText: t("travel-limo-link", "View Limousine A1 ↗"),
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12h12a1.5 1.5 0 011.5 1.5V10a1.5 1.5 0 000 4v2.5A1.5 1.5 0 0119.5 18h-12a1.5 1.5 0 01-1.5-1.5V14a1.5 1.5 0 000-4V7.5A1.5 1.5 0 017.5 6z" />
        </svg>
      ),
      title: t("travel-discount-title", "Delegate Discount Program"),
      desc: t("travel-discount-desc", "Our venue partner, The Québec City Convention Centre, is proud to offer delegates of THE Event exclusive offers and discounts at select restaurants, attractions and boutiques throughout Quebec City.\n\nYou will be able to take advantage of the offers through presentation of your THE Event badge. Scan QR code on-site for more details."),
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

        {/* ═══════ VENUE + AIR TRAVEL (2-col) ═══════ */}
        <section className="relative w-full bg-white py-16 sm:py-20 md:py-24">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("travel-venue-label", "VENUE")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] tracking-tight mb-3">
              {t("travel-venue-title-1", "Welcome to")} <span className="text-[#C6112F]">{t("travel-venue-title-2", "Québec City")}</span>
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-4" />
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-[800px] mb-10">
              {t("travel-venue-desc", "Welcome to THE Mining Investment EVENT, taking place 1-3 June 2027 at the Centre des congrès de Québec (“QCC”). Discounted block rates available for registered participants only. You are responsible for coordinating all your own travel and lodging arrangements.")}
            </p>

            {/* Venue + Air Travel — side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              {/* Convention Centre */}
              <div className="bg-[#f8fafc] border border-neutral-200 rounded-xl p-6 sm:p-8 flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-[#fef2f2] border border-[#C6112F]/10 flex items-center justify-center text-[#C6112F] mb-5">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-[#1a1f2c] mb-3">
                  {t("travel-convention-title", "Québec City Convention Centre")}
                </h3>
                <div className="w-10 h-[2px] bg-[#C6112F] mb-3" />
                <p className="text-neutral-600 text-sm leading-relaxed flex-1">
                  {t("travel-convention-desc", "Welcome to the Quebec City Convention Centre, where elegance meets innovation. Nestled within the charming historic district of Old Quebec, this world-class facility seamlessly blends modern amenities with the rich tapestry of Quebecois culture.")}
                </p>
                <p className="text-[#C6112F] text-xs font-semibold mt-4">
                  {t("travel-convention-note", "Please Note: Entry into THE Event and special hotel discount rates are restricted to registered participants only.")}
                </p>
                <a
                  href="https://www.convention.qc.ca/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-[#C6112F] text-sm font-bold hover:underline inline-flex items-center gap-1"
                >
                  {t("travel-convention-link", "View Convention Centre ↗")}
                </a>
              </div>

              {/* Air Travel */}
              <div className="bg-[#f8fafc] border border-neutral-200 rounded-xl p-6 sm:p-8 flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-[#fef2f2] border border-[#C6112F]/10 flex items-center justify-center text-[#C6112F] mb-5">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-[#1a1f2c] mb-3">
                  {t("travel-air-title", "Air Travel to Quebec (YQB)")}
                </h3>
                <div className="w-10 h-[2px] bg-[#C6112F] mb-3" />
                <p className="text-neutral-600 text-sm font-bold mb-3">
                  {t("travel-air-easy", "Traveling to Quebec City is easy!")}
                </p>
                <p className="text-neutral-500 text-xs font-semibold tracking-wider uppercase mb-2">
                  {t("travel-air-times", "Estimated flight times:")}
                </p>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {flights.map((f) => (
                    <div
                      key={f.city}
                      className="flex items-center justify-between bg-white border border-neutral-200 rounded-lg px-3 py-2"
                    >
                      <span className="text-neutral-700 text-sm font-medium">{f.city}</span>
                      <span className="text-[#C6112F] text-sm font-bold">{f.time}</span>
                    </div>
                  ))}
                </div>

                <p className="text-neutral-600 text-sm leading-relaxed flex-1">
                  {t("travel-air-desc", "All major carriers fly to Toronto or Montreal with quick connections to YQB. Jean Lesage International airport is a 20 minute taxi ride to/from the Chateau Frontenac.")}
                </p>
                <a
                  href="https://www.aeroportdequebec.com/en/flights-and-destinations/destinations-served"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-[#C6112F] text-sm font-bold hover:underline inline-flex items-center gap-1"
                >
                  {t("travel-air-link", "View YQB Destinations ↗")}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ ACCOMMODATIONS & TRANSPORT ═══════ */}
        <section className="relative w-full bg-[#f4f7fa] py-16 sm:py-20 md:py-24">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("travel-services-label", "SERVICES")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] tracking-tight mb-3">
              {t("travel-services-title", "Accommodations & Transport")}
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-10" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {localizedAccommodations.map((item) => (
                <div
                  key={item.title}
                  className="group bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 hover:border-[#C6112F]/30 hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#fef2f2] border border-[#C6112F]/10 flex items-center justify-center text-[#C6112F] mb-5 group-hover:bg-[#C6112F] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#C6112F]/20 transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-black text-[#1a1f2c] mb-2">{item.title}</h3>
                  <div className="w-10 h-[2px] bg-[#C6112F] mb-3" />
                  <p className="text-neutral-600 text-sm leading-relaxed whitespace-pre-line flex-1">{item.desc}</p>
                  {item.note && (
                    <p className="text-[#C6112F] text-xs font-semibold mt-3">{item.note}</p>
                  )}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 text-[#C6112F] text-sm font-bold hover:underline inline-flex items-center gap-1"
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
