"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

/* ─── 18 gallery tiles from the live site ─── */
const galleryTiles = [
  {
    img: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/dab2da2f-ef86-4d9d-b2cb-43ceb53bd983/DSC00774.jpg",
    labelKey: "media-tile-conference-floor",
    labelDefault: "Conference Floor",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/4326bafc-0ccb-4261-b8b1-fa6e2f465a9a/DSC00126.jpg",
    labelKey: "media-tile-keynote-speakers",
    labelDefault: "Keynote Speakers",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/40f4782a-7966-4213-851f-4a3aca6be7fe/DSC00269.jpg",
    labelKey: "media-tile-networking-events",
    labelDefault: "Networking Events",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/f28a975d-7c53-4724-b186-5364a5d65adb/DSC00507.jpg",
    labelKey: "media-tile-student-program",
    labelDefault: "Student Program Gallery",
    featured: true,
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/558e4c7e-7266-4cf0-bc1c-24f5c9f67b1f/DSC00686.jpg",
    labelKey: "media-tile-sheco-events",
    labelDefault: "SHE-CO Events",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/081e3e9a-8f21-4527-95b9-5c60b7edaa52/DSC00729.jpg",
    labelKey: "media-tile-conference-sessions",
    labelDefault: "Conference Sessions",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/2856599c-2aef-4b3b-b963-eabc646e2726/DSC00745.jpg",
    labelKey: "media-tile-panel-discussions",
    labelDefault: "Panel Discussions",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/c3f6875e-2b5f-487e-aad3-651ed8259f36/DSC01292.jpg",
    labelKey: "media-tile-industry-leaders",
    labelDefault: "Industry Leaders",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/89a3610e-4c5a-4aaa-988c-844f65a2cfeb/DSC01558.jpg",
    labelKey: "media-tile-welcome-reception",
    labelDefault: "Welcome Reception",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/cdec1516-d6a3-4c7b-9560-42b609d0b210/DSC01828.jpg",
    labelKey: "media-tile-event-highlights",
    labelDefault: "THE Event Highlights",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/74684f59-c1d4-405c-a7b0-981e8fa31184/DSC00104.jpg",
    labelKey: "media-tile-investor-meetings",
    labelDefault: "Investor Meetings",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1ff55a68-c1a5-4823-b4e7-6717586459d5/DSC02529.jpg",
    labelKey: "media-tile-award-ceremony",
    labelDefault: "Award Ceremony",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/e5f393e3-6823-40bc-90c3-d87011c54575/DSC02621.jpg",
    labelKey: "media-tile-quebec-experience",
    labelDefault: "Quebec City Experience",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/d9a1704b-1e3b-4a93-add4-295499018c05/DSC02636.jpg",
    labelKey: "media-tile-speakers-panels",
    labelDefault: "Speakers & Panels",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/ce8bd16e-76fb-48e1-b917-3e73ff6593c4/DSC04766.jpg",
    labelKey: "media-tile-behind-event",
    labelDefault: "Behind THE Event",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/dd4e08d9-35eb-4a56-9c1e-4d92c9471f28/DSC05184.jpg",
    labelKey: "media-tile-exhibitor-showcase",
    labelDefault: "Exhibitor Showcase",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/6ed743f0-dba8-4a47-aa2a-2680eccb2d80/DSC05504.jpg",
    labelKey: "media-tile-networking-dinner",
    labelDefault: "Networking Dinner",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1dd38bad-bcd7-4007-8ae6-9c1fb9b2df6f/DSC05529.jpg",
    labelKey: "media-tile-event-memories",
    labelDefault: "THE Event Memories",
  },
];

/* ─── 4 YouTube videos from the live site ─── */
const videos = [
  { id: "dWFnebV81DM", thumb: "https://i.ytimg.com/vi/dWFnebV81DM/hqdefault.jpg" },
  { id: "38Ec5J0viaU", thumb: "https://i.ytimg.com/vi/38Ec5J0viaU/hqdefault.jpg" },
  { id: "_3XTqjB4zo8", thumb: "https://i.ytimg.com/vi/_3XTqjB4zo8/hqdefault.jpg" },
  { id: "7PHjDzBZcac", thumb: "https://i.ytimg.com/vi/7PHjDzBZcac/hqdefault.jpg" },
];

export default function MediaPage() {
  const { t } = useLanguage();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIdx(i);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImage = () =>
    setLightboxIdx((p) => (p !== null ? (p - 1 + galleryTiles.length) % galleryTiles.length : null));
  const nextImage = () =>
    setLightboxIdx((p) => (p !== null ? (p + 1) % galleryTiles.length : null));

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
              <span className="text-white">{t("nav-media", "Recent Media")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
              {t("media-hero-title-1", "Recent")} <span className="text-[#C6112F]">{t("media-hero-title-2", "Media")}</span>
            </h1>
            <div className="w-20 h-[3px] bg-[#C6112F] mt-6" />
          </div>
        </section>

        {/* ═══════ PHOTO GALLERY GRID ═══════ */}
        <section className="relative w-full bg-white py-16 sm:py-20 md:py-24">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("media-gallery-label", "Gallery & Media")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] tracking-tight mb-1">
              {t("media-gallery-title-1", "THE Event in")}{" "}
              <span className="text-[#C6112F]">{t("media-gallery-title-2", "Pictures & Press")}</span>
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-4" />
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-[700px] mb-12">
              {t(
                "media-gallery-desc",
                "Explore recent coverage, photography, and media from THE Mining Investment Event. For media inquiries and press accreditation, please contact our team directly."
              )}
            </p>

            {/* Grid – 3-col on desktop, 2-col on tablet, 1-col on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {galleryTiles.map((tile, i) => (
                <div
                  key={i}
                  onClick={() => openLightbox(i)}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 shadow-[0_8px_25px_rgba(0,0,0,0.06)] transition-all duration-500 hover:border-[#C6112F]/50 hover:shadow-[0_20px_45px_rgba(198,17,47,0.2)] hover:-translate-y-1 ${
                    tile.featured ? "sm:col-span-2" : ""
                  }`}
                  style={{ aspectRatio: tile.featured ? "8/3" : "4/3" }}
                >
                  {/* Image */}
                  <img
                    src={tile.img}
                    alt={t(tile.labelKey, tile.labelDefault)}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Diagonal pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, rgba(198,17,47,0.03) 0px, rgba(198,17,47,0.03) 1px, transparent 1px, transparent 30px)",
                    }}
                  />

                  {/* Label at bottom in a glassmorphic badge */}
                  <div className="absolute bottom-4 left-0 right-0 px-4 flex justify-center z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] sm:text-[11px] font-extrabold tracking-[0.2em] uppercase text-white group-hover:bg-[#C6112F] group-hover:border-[#C6112F] transition-all duration-300 shadow-lg">
                      {t(tile.labelKey, tile.labelDefault)}
                    </span>
                  </div>

                  {/* Hover magnify icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="w-13 h-13 rounded-full bg-[#C6112F] shadow-xl border border-white/20 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <path strokeLinecap="round" d="m21 21-4.35-4.35" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ VIDEOS SECTION ═══════ */}
        <section className="relative w-full bg-[#0a0c12] py-16 sm:py-20 md:py-24 border-t border-white/[0.04]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("media-videos-label", "Recent Videos")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-white tracking-tight mb-1">
              {t("media-videos-title-1", "Watch THE Event")}{" "}
              <span className="text-[#C6112F]">{t("media-videos-title-2", "in Motion")}</span>
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {videos.map((v) => (
                <a
                  key={v.id}
                  href={`https://youtu.be/${v.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block rounded-lg overflow-hidden border border-white/[0.06] bg-[#14161e] hover:border-[#C6112F]/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(198,17,47,0.12)]"
                  style={{ aspectRatio: "16/9" }}
                >
                  <img
                    src={v.thumb}
                    alt="THE Mining Investment Event video"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center group-hover:bg-[#C6112F] group-hover:border-[#C6112F] transition-all duration-300 group-hover:scale-110">
                      <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ CONTACT CTA ═══════ */}
        <section className="relative w-full bg-[#0f1117] py-12 border-t border-white/[0.04]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 text-center">
            <p className="text-neutral-400 text-sm font-light mb-5">
              {t(
                "media-bottom-text",
                "For full media gallery access, recent press coverage, and media accreditation inquiries:"
              )}
            </p>
            <a
              href="mailto:jchoi@irinc.ca?subject=Media Inquiry"
              className="inline-block px-8 py-3 bg-[#C6112F] text-white text-xs font-bold tracking-[0.2em] uppercase rounded hover:bg-[#a50e27] transition-colors duration-300"
            >
              {t("media-bottom-cta", "Contact for Media Access")}
            </a>
          </div>
        </section>

        <GetInTouchCTA />
        <Footer />
      </main>

      {/* ═══════ LIGHTBOX MODAL ═══════ */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl z-10 transition-colors"
            aria-label="Close preview"
          >
            ✕
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[#C6112F]/80 text-white flex items-center justify-center text-2xl transition-all z-10"
            aria-label="Previous image"
          >
            ‹
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[#C6112F]/80 text-white flex items-center justify-center text-2xl transition-all z-10"
            aria-label="Next image"
          >
            ›
          </button>

          {/* Image */}
          <div className="max-w-[90vw] max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryTiles[lightboxIdx].img}
              alt={t(galleryTiles[lightboxIdx].labelKey, galleryTiles[lightboxIdx].labelDefault)}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4">
              <span className="text-white/60 text-xs tracking-[0.2em] uppercase font-medium">
                {t(galleryTiles[lightboxIdx].labelKey, galleryTiles[lightboxIdx].labelDefault)}
              </span>
              <span className="text-white/30 text-xs ml-4">
                {lightboxIdx + 1} / {galleryTiles.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
