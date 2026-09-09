"use client";

import React from "react";
export default function EventHighlightsMedia() {

  return (
    <section className="relative w-full bg-[#f4f7fa] dark:bg-[#090d16] py-12 sm:py-14 md:py-16 overflow-hidden transition-colors duration-300">
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] rounded-full z-20" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
        {/* 2-Column Asymmetric Photo Masonry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {/* Column 1 (Left Side) */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {/* Top Item: Tall Vertical Executive Photo */}
            <div className="group relative w-full h-[280px] xs:h-[340px] sm:h-[440px] rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-[#233049] bg-neutral-900 shadow-xs card-shimmer hover:shadow-[0_15px_35px_rgba(198,17,47,0.2)] hover:border-[#C6112F] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <img
                src="/gallery%20photos/MAIN%20EVENT/MINING%20INVESTMENT%20EVENT%202026_DAY%201_MAIN%20EVENT-10.jpg"
                alt="Executive delegates networking reception"
                className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Middle Row: 2 Small Photos */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <div className="group relative w-full h-[160px] sm:h-[200px] rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-[#233049] bg-neutral-900 shadow-xs card-shimmer hover:shadow-[0_12px_28px_rgba(198,17,47,0.2)] hover:border-[#C6112F] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <img
                  src="/student/STUDENTS/MINING%20INVESTMENT%20EVENT%202026_DAY%201_STUDENTS-3.jpg"
                  alt="Student delegates collaborating"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Replaced with New Speaker Podium Photo */}
              <div className="group relative w-full h-[160px] sm:h-[200px] rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-[#233049] bg-neutral-900 shadow-xs card-shimmer hover:shadow-[0_12px_28px_rgba(198,17,47,0.2)] hover:border-[#C6112F] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <img
                  src="/gallery%20photos/MAIN%20EVENT/speaker-podium.jpg"
                  alt="Keynote presentation speaker at podium"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Bottom 3rd Banner: Replaced with New Quebec Entrance Photo */}
            <div className="group relative w-full h-[190px] sm:h-[230px] rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-[#233049] bg-neutral-900 shadow-xs card-shimmer hover:shadow-[0_12px_28px_rgba(198,17,47,0.2)] hover:border-[#C6112F] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <img
                src="/gallery%20photos/MAIN%20EVENT/quebec-entrance.jpg"
                alt="Quebec City Mining Investment Event entrance"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Column 2 (Right Side) */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {/* Top Row: 2 Small Photos */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <div className="group relative w-full h-[160px] sm:h-[200px] rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-[#233049] bg-neutral-900 shadow-xs card-shimmer hover:shadow-[0_12px_28px_rgba(198,17,47,0.2)] hover:border-[#C6112F] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <img
                  src="/student/STUDENTS/MINING%20INVESTMENT%20EVENT%202026_DAY%201_STUDENTS-8.jpg"
                  alt="Student delegates at panel discussion"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="group relative w-full h-[160px] sm:h-[200px] rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-[#233049] bg-neutral-900 shadow-xs card-shimmer hover:shadow-[0_12px_28px_rgba(198,17,47,0.2)] hover:border-[#C6112F] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <img
                  src="/gallery%20photos/MAIN%20EVENT/MINING%20INVESTMENT%20EVENT%202026_DAY%201_MAIN%20EVENT-15.jpg"
                  alt="Conference audience delegates"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Middle Wide Banner */}
            <div className="group relative w-full h-[190px] sm:h-[230px] rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-[#233049] bg-neutral-900 shadow-xs card-shimmer hover:shadow-[0_12px_28px_rgba(198,17,47,0.2)] hover:border-[#C6112F] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <img
                src="/gallery%20photos/MAIN%20EVENT/MINING%20INVESTMENT%20EVENT%202026_DAY%201_MAIN%20EVENT-16.jpg"
                alt="Keynote presentation audience"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Bottom Item: Tall Vertical Executive Photo */}
            <div className="group relative w-full h-[280px] xs:h-[340px] sm:h-[440px] rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-[#233049] bg-neutral-900 shadow-xs card-shimmer hover:shadow-[0_15px_35px_rgba(198,17,47,0.2)] hover:border-[#C6112F] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <img
                src="/student/STUDENTS/MINING%20INVESTMENT%20EVENT%202026_DAY%201_STUDENTS-12.jpg"
                alt="Students networking at Mining Investment Event"
                className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
