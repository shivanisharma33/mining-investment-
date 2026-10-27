"use client";

import React, { useState, useEffect, useCallback } from "react";

const photos = [
  {
    src: "/photo-2.webp",
    alt: "Conference infrastructure - Main event and presentation hall",
  },
  {
    src: "/photo-3.webp",
    alt: "Conference infrastructure - Meeting and networking facilities",
  },
  {
    src: "/photo-4.webp",
    alt: "Conference infrastructure - Audio-visual stage and presentation setup",
  },
  {
    src: "/photo-6.webp",
    alt: "Conference infrastructure - Exhibition and delegate facilities",
  },
  {
    src: "/photo-5.webp",
    alt: "Conference infrastructure - Modern convention venue facilities",
  },
  {
    src: "/photo-7.webp",
    alt: "Conference infrastructure - Grand ballroom presentation venue",
  },
  {
    src: "/photo-8.webp",
    alt: "Conference infrastructure - Executive convention facilities",
  },
];

export default function EventHighlightsMedia() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === null ? null : (prev - 1 + photos.length) % photos.length));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === null ? null : (prev + 1) % photos.length));
  }, []);

  const handleClose = useCallback(() => {
    setActiveIndex(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, handleClose, handlePrev, handleNext]);

  return (
    <section className="relative w-full bg-[#f4f7fa] dark:bg-[#090d16] py-12 sm:py-14 md:py-16 overflow-hidden transition-colors duration-300">
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] rounded-full z-20" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Top Bento Row: 1 Large Feature (8 cols) + 2 Stacked (4 cols) */}
        {/* All containers use natural aspect-[3/2] so 3:2 photos never get cropped */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 mb-4 sm:mb-5">
          {/* Main Featured Photo (PHOTO2) */}
          <div
            onClick={() => setActiveIndex(0)}
            className="lg:col-span-8 group relative w-full aspect-[3/2] rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-[#233049] bg-neutral-900 shadow-md hover:shadow-[0_15px_35px_rgba(198,17,47,0.25)] hover:border-[#C6112F] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <img
              src={photos[0].src}
              alt={photos[0].alt}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 sm:p-6">
              <span className="text-white text-xs sm:text-sm font-bold tracking-wide">
                {photos[0].alt}
              </span>
              <span className="bg-[#C6112F] text-white text-[11px] font-extrabold uppercase px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                </svg>
                Enlarge
              </span>
            </div>
          </div>

          {/* 2 Stacked Photos (PHOTO3 & PHOTO 4) */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-5 justify-between">
            <div
              onClick={() => setActiveIndex(1)}
              className="flex-1 group relative w-full aspect-[3/2] rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-[#233049] bg-neutral-900 shadow-md hover:shadow-[0_12px_28px_rgba(198,17,47,0.2)] hover:border-[#C6112F] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <img
                src={photos[1].src}
                alt={photos[1].alt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3 sm:p-4">
                <span className="text-white text-xs font-bold tracking-wide truncate pr-2">
                  {photos[1].alt}
                </span>
                <span className="bg-[#C6112F] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shrink-0 shadow-sm">
                  Enlarge
                </span>
              </div>
            </div>

            <div
              onClick={() => setActiveIndex(2)}
              className="flex-1 group relative w-full aspect-[3/2] rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-[#233049] bg-neutral-900 shadow-md hover:shadow-[0_12px_28px_rgba(198,17,47,0.2)] hover:border-[#C6112F] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <img
                src={photos[2].src}
                alt={photos[2].alt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3 sm:p-4">
                <span className="text-white text-xs font-bold tracking-wide truncate pr-2">
                  {photos[2].alt}
                </span>
                <span className="bg-[#C6112F] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shrink-0 shadow-sm">
                  Enlarge
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: 4 Photos (PHOTO 6, PHOTO 5, PHOTO 7, PHOTO 8) */}
        {/* All use aspect-[3/2] so none of the images are cut off */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {photos.slice(3).map((photo, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i + 3)}
              className="group relative w-full aspect-[3/2] rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-[#233049] bg-neutral-900 shadow-md hover:shadow-[0_12px_28px_rgba(198,17,47,0.2)] hover:border-[#C6112F] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3 sm:p-4">
                <span className="text-white text-xs font-bold tracking-wide truncate pr-2">
                  {photo.alt}
                </span>
                <span className="bg-[#C6112F] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shrink-0 shadow-sm">
                  Enlarge
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════ FULLSCREEN LIGHTBOX MODAL (100% UNCROPPED) ══════ */}
      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={handleClose}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-[#C6112F] text-white flex items-center justify-center transition-colors z-20 cursor-pointer"
            aria-label="Close photo view"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-[#C6112F] text-white flex items-center justify-center transition-colors z-20 cursor-pointer"
            aria-label="Previous photo"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-[#C6112F] text-white flex items-center justify-center transition-colors z-20 cursor-pointer"
            aria-label="Next photo"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Modal Image Wrapper (object-contain guarantees complete photo visibility) */}
          <div
            className="relative max-w-[1200px] max-h-[85vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[activeIndex].src}
              alt={photos[activeIndex].alt}
              className="max-w-full max-h-[78vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-3 flex items-center justify-between w-full max-w-full px-2 text-xs sm:text-sm text-neutral-300">
              <span className="font-medium">{photos[activeIndex].alt}</span>
              <span className="text-neutral-400 font-mono">
                {activeIndex + 1} / {photos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
