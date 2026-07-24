"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

/* ─── 18 gallery tiles from live site ─── */
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

/* ─── 4 YouTube videos ─── */
const videos = [
  {
    id: "dWFnebV81DM",
    title: "THE Mining Investment Event - Official Conference Overview",
    thumb: "https://i.ytimg.com/vi/dWFnebV81DM/hqdefault.jpg",
    duration: "04:18",
    views: "48,920 views",
    timeAgo: "2 months ago",
  },
  {
    id: "38Ec5J0viaU",
    title: "Keynote Panel: The Future of Critical Minerals & ESG Investments",
    thumb: "https://i.ytimg.com/vi/38Ec5J0viaU/hqdefault.jpg",
    duration: "14:25",
    views: "32,150 views",
    timeAgo: "3 months ago",
  },
  {
    id: "_3XTqjB4zo8",
    title: "Student Sponsorship & SHE-Co Initiative Highlights",
    thumb: "https://i.ytimg.com/vi/_3XTqjB4zo8/hqdefault.jpg",
    duration: "08:42",
    views: "21,400 views",
    timeAgo: "4 months ago",
  },
  {
    id: "7PHjDzBZcac",
    title: "Investor One-on-One Meetings & Networking Night in Québec City",
    thumb: "https://i.ytimg.com/vi/7PHjDzBZcac/hqdefault.jpg",
    duration: "11:05",
    views: "19,830 views",
    timeAgo: "5 months ago",
  },
];

export default function MediaPage() {
  const { t } = useLanguage();
  const [activeVideoId, setActiveVideoId] = useState<string>("dWFnebV81DM");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(1420);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  const openLightbox = (i: number) => setLightboxIdx(i);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImage = () =>
    setLightboxIdx((p) => (p !== null ? (p - 1 + galleryTiles.length) % galleryTiles.length : null));
  const nextImage = () =>
    setLightboxIdx((p) => (p !== null ? (p + 1) % galleryTiles.length : null));

  const toggleLike = () => {
    if (hasLiked) {
      setLikesCount((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-white font-sans antialiased overflow-x-hidden pt-20 sm:pt-24">
        
        {/* ═══════════════ HERO ═══════════════ */}
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
          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20">
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

        {/* ═══════════════ ORIGINAL PHOTO GALLERY GRID ═══════════════ */}
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

        {/* ═══════════════ YOUTUBE UI VIDEOS SECTION ONLY ═══════════════ */}
        <section className="relative w-full bg-[#0f0f0f] text-white py-16 sm:py-20 md:py-24 border-t border-neutral-800">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8">
            
            {/* YouTube Section Header & Channel Info Bar */}
            <div className="mb-10 bg-[#181818] border border-neutral-800 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                
                {/* YouTube Channel Branding */}
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#C6112F] p-1 border-2 border-white/20 shadow-xl overflow-hidden shrink-0">
                    <Image
                      src="/MainPageLogo.webp"
                      alt="Channel Avatar"
                      width={80}
                      height={80}
                      className="w-full h-full object-contain p-1.5 bg-white rounded-full"
                    />
                  </div>

                  <div className="flex flex-col items-start text-left">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        THE Mining Investment Event Channel
                      </h2>
                      {/* YouTube Verified Checkmark Badge */}
                      <span className="w-4 h-4 rounded-full bg-neutral-400 text-[#0f0f0f] flex items-center justify-center text-[10px] font-bold" title="Verified Channel">
                        ✓
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-neutral-400 font-medium">
                      @mininginvestment · 12.5K subscribers · Official Video Portal
                    </span>
                  </div>
                </div>

                {/* YouTube Subscribe & Action Buttons */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href="https://youtube.com/@vidconferences?si=VVEfWLrZyKUbjTEY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 bg-[#FF0000] hover:bg-[#cc0000] text-white shadow-lg"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                    </svg>
                    <span>Subscribe</span>
                  </a>

                  <a
                    href="https://youtube.com/@vidconferences?si=VVEfWLrZyKUbjTEY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs sm:text-sm border border-neutral-700 transition-all inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-[#FF0000] fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span>Open Channel ↗</span>
                  </a>
                </div>

              </div>
            </div>

            {/* YouTube Featured Player & Sidebar Queue */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
              
              {/* Main YouTube Video Player */}
              <div className="lg:col-span-8 flex flex-col">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-neutral-800">
                  <iframe
                    src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=0&rel=0`}
                    title="YouTube Video Player"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Video Title & Actions */}
                <div className="mt-4 flex flex-col items-start text-left">
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {videos.find((v) => v.id === activeVideoId)?.title || "THE Mining Investment Event Highlights"}
                  </h3>

                  <div className="w-full mt-3 pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                    <div className="text-xs sm:text-sm text-neutral-400 font-medium">
                      {videos.find((v) => v.id === activeVideoId)?.views || "48,920 views"} · Premiered in Québec City
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <button
                        onClick={toggleLike}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full border transition-all ${
                          hasLiked
                            ? "bg-[#C6112F] text-white border-[#C6112F]"
                            : "bg-neutral-800 hover:bg-neutral-700 border-neutral-700 text-neutral-200"
                        }`}
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                        </svg>
                        <span>{likesCount}</span>
                      </button>

                      <button
                        onClick={() => alert("Video link copied to clipboard!")}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 transition-all"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                        </svg>
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* YouTube Playlist Sidebar */}
              <div className="lg:col-span-4 flex flex-col items-start text-left">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF0000] mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>UP NEXT · YOUTUBE PLAYLIST</span>
                </span>

                <div className="flex flex-col gap-4 w-full">
                  {videos.map((v) => {
                    const isPlaying = activeVideoId === v.id;
                    return (
                      <div
                        key={v.id}
                        onClick={() => setActiveVideoId(v.id)}
                        className={`flex gap-3.5 p-2.5 rounded-xl cursor-pointer transition-all ${
                          isPlaying
                            ? "bg-neutral-800 border border-[#FF0000]/60 shadow-md"
                            : "hover:bg-neutral-900 border border-neutral-800/60"
                        }`}
                      >
                        <div className="relative w-36 aspect-video rounded-lg overflow-hidden bg-neutral-900 shrink-0">
                          <img src={v.thumb} alt={v.title} className="w-full h-full object-cover" />
                          <span className="absolute bottom-1 right-1 bg-black/80 text-[10px] font-bold px-1.5 py-0.5 rounded text-white">
                            {v.duration}
                          </span>
                        </div>

                        <div className="flex flex-col justify-center text-left min-w-0">
                          <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                            {v.title}
                          </h4>
                          <span className="text-[11px] text-neutral-400 mt-1">
                            THE Mining Investment Event
                          </span>
                          <span className="text-[11px] text-neutral-500">
                            {v.views} · {v.timeAgo}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* YouTube Videos Grid */}
            <div className="mt-8 border-t border-neutral-800 pt-10">
              <span className="text-xs font-extrabold tracking-[0.25em] text-[#FF0000] uppercase mb-2 block text-left">
                YOUTUBE VIDEO DIRECTORY
              </span>
              <h3 className="text-2xl font-black text-white mb-6 text-left">
                {t("media-videos-title-1", "Watch THE Event")}{" "}
                <span className="text-[#FF0000]">{t("media-videos-title-2", "in Motion")}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {videos.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => setActiveVideoId(v.id)}
                    className="group bg-[#181818] border border-neutral-800 rounded-xl overflow-hidden cursor-pointer hover:border-[#FF0000]/60 transition-all duration-300 text-left flex flex-col justify-between"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
                      <img
                        src={v.thumb}
                        alt={v.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute bottom-2 right-2 bg-black/80 text-[10px] font-extrabold px-2 py-0.5 rounded text-white">
                        {v.duration}
                      </span>
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6 fill-current ml-0.5" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col items-start">
                      <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-[#FF0000] transition-colors">
                        {v.title}
                      </h4>
                      <span className="text-[11px] text-neutral-400 mt-2">
                        THE Mining Investment Event
                      </span>
                      <span className="text-[11px] text-neutral-500">
                        {v.views} · {v.timeAgo}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ═══════════════ CONTACT CTA ═══════════════ */}
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

      {/* ═══════════════ LIGHTBOX MODAL FOR PHOTOS ═══════════════ */}
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
