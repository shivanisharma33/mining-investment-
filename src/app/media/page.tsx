"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

/* ─── Day 1 to Day 3 Playlists Data matching YouTube Shelf Interface ─── */
const playlistsData = [
  {
    id: "interviews",
    dayNum: "Interviews",
    dayNumFR: "Entretiens",
    title: "The Mining Investment Event 2026 VID Interviews",
    titleFR: "The Mining Investment Event 2026 Entretiens Exclusifs VID",
    description: "Exclusive 1-on-1 interviews from THE Mining Investment Event 2026, presented by VID. Hear directly from industry leaders, CEOs, and innovators shaping the future of mining, critical metals,...",
    descriptionFR: "Entretiens exclusifs individuels de THE Mining Investment Event 2026, présentés par VID. Écoutez directement les leaders de l'industrie, les PDG et les innovateurs...",
    videos: [
      {
        id: "oYmuaZ96KhA",
        title: "Nuvau Minerals Advances the Matagami Mining District Project in Québec",
        titleFR: "Nuvau Minerals fait progresser le projet du district minier de Matagami au Québec",
        duration: "6:46",
        channel: "VID TV",
        views: "122 views",
        viewsFR: "122 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/oYmuaZ96KhA/hqdefault.jpg",
      },
      {
        id: "_dCyyv-Fi6o",
        title: "South Kirkland Gold Targets Large-Scale Discovery Potential in Ontario's Kirkland Lake Camp",
        titleFR: "South Kirkland Gold vise un potentiel de découverte à grande échelle en Ontario",
        duration: "5:28",
        channel: "VID TV",
        views: "78 views",
        viewsFR: "78 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/_dCyyv-Fi6o/hqdefault.jpg",
      },
      {
        id: "XKYZf4cLwes",
        title: "Pivotal Metals Advances the Horden Lake Copper Project in Québec",
        titleFR: "Pivotal Metals fait progresser le projet de cuivre de Horden Lake au Québec",
        duration: "2:29",
        channel: "VID TV",
        views: "32 views",
        viewsFR: "32 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/XKYZf4cLwes/hqdefault.jpg",
      },
      {
        id: "EPsR6oo5QvA",
        title: "Dynasty Gold Advances the Thundercloud Gold Project in Northwestern Ontario",
        titleFR: "Dynasty Gold fait progresser le projet d'or Thundercloud dans le nord-ouest de l'Ontario",
        duration: "2:45",
        channel: "VID TV",
        views: "52 views",
        viewsFR: "52 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/EPsR6oo5QvA/hqdefault.jpg",
      },
      {
        id: "m_dCsxzAtlE",
        title: "Brixton Metals Advances Thorn Copper-Gold and Langis Silver Exploration",
        titleFR: "Brixton Metals fait progresser l'exploration du cuivre-or Thorn et de l'argent Langis",
        duration: "3:09",
        channel: "VID TV",
        views: "49 views",
        viewsFR: "49 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/m_dCsxzAtlE/hqdefault.jpg",
      },
      {
        id: "k_eq9d6Ti50",
        title: "Q2 Metals Advances the Cisco Lithium Project in Québec's James Bay Region",
        titleFR: "Q2 Metals fait progresser le projet de lithium Cisco dans la région de la Baie-James",
        duration: "4:12",
        channel: "VID TV",
        views: "95 views",
        viewsFR: "95 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/k_eq9d6Ti50/hqdefault.jpg",
      },
      {
        id: "XewH4jR9Dig",
        title: "Resouro Strategic Metals Advances the Tiros Titanium-Rare Earths Project in Brazil",
        titleFR: "Resouro Strategic Metals fait progresser le projet Tiros au Brésil",
        duration: "3:50",
        channel: "VID TV",
        views: "64 views",
        viewsFR: "64 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/XewH4jR9Dig/hqdefault.jpg",
      },
    ],
  },
  {
    id: "day1",
    dayNum: "Day 1",
    dayNumFR: "Jour 1",
    title: "THE Mining Investment Event 2026 – Day 1 Presentations | CEO Keynotes & Market Strategy",
    titleFR: "THE Mining Investment Event 2026 – Présentations du Jour 1 | Discours des PDG & Stratégie",
    description: "Experience the full lineup of Day 1 presentations from THE Mining Investment Event of the North 2026 – Canada's only Tier 1 global mining investment conference. Held in Quebec City, Day 1...",
    descriptionFR: "Découvrez l'ensemble des présentations du Jour 1 de THE Mining Investment Event of the North 2026 – La seule conférence minière mondiale de niveau 1 au Canada. Tenue à Québec, Jour 1...",
    videos: [
      {
        id: "UjKV33kdUbA",
        title: "Canada's Next Gold Giant? | Blue Lagoon's High-Grade Gold Production Starts Now",
        titleFR: "Le prochain géant de l'or au Canada ? | Production d'or à haute teneur",
        duration: "14:32",
        channel: "VID TV",
        views: "713 views",
        viewsFR: "713 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/UjKV33kdUbA/hqdefault.jpg",
      },
      {
        id: "sajPA8WXXjg",
        title: "Massive Gold Growth Ahead? | Orezone's Multi-Asset Gold Growth Unleashed",
        titleFR: "Croissance massive de l'or à venir ? | Croissance multi-actifs d'Orezone",
        duration: "16:01",
        channel: "VID TV",
        views: "209 views",
        viewsFR: "209 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/sajPA8WXXjg/hqdefault.jpg",
      },
      {
        id: "M8ayyKliNkk",
        title: "The Next Gold Empire: Ready to Scale | Osisko Development & Capital Strategy",
        titleFR: "Le prochain empire de l'or : Prêt à évoluer | Développement Osisko",
        duration: "15:02",
        channel: "VID TV",
        views: "189 views",
        viewsFR: "189 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/M8ayyKliNkk/hqdefault.jpg",
      },
      {
        id: "kXf1MQRPZCo",
        title: "Gold Producer Going Massive: No Share Dilution | Heliostar Metals",
        titleFR: "Producteur d'or en pleine expansion : Aucune dilution d'actions",
        duration: "15:22",
        channel: "VID TV",
        views: "408 views",
        viewsFR: "408 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/kXf1MQRPZCo/hqdefault.jpg",
      },
      {
        id: "WZLatWI1VlI",
        title: "Why IAMGOLD Could Surge: Hidden Value Revealed | IAMGOLD Corporation",
        titleFR: "Pourquoi IAMGOLD pourrait augmenter : Valeur cachée révélée",
        duration: "14:45",
        channel: "VID TV",
        views: "312 views",
        viewsFR: "312 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/WZLatWI1VlI/hqdefault.jpg",
      },
      {
        id: "1Mo6aPMY7Y8",
        title: "The Critical Minerals Race: Future Depends Here | U.S. Ambassador Keynote",
        titleFR: "La course aux minéraux critiques : L'avenir dépend d'ici",
        duration: "18:20",
        channel: "VID TV",
        views: "640 views",
        viewsFR: "640 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/1Mo6aPMY7Y8/hqdefault.jpg",
      },
      {
        id: "BQrBf6Sdc5k",
        title: "Unlocking Canada's Gold Future: Multibagger Potential | Stellar Gold",
        titleFR: "Libérer l'avenir de l'or au Canada : Potentiel exceptionnel",
        duration: "14:38",
        channel: "VID TV",
        views: "47 views",
        viewsFR: "47 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/BQrBf6Sdc5k/hqdefault.jpg",
      },
    ],
  },
  {
    id: "day2",
    dayNum: "Day 2",
    dayNumFR: "Jour 2",
    title: "THE Mining Investment Event 2026 – Day 2 Presentations | Critical Metals, ESG & Royalties",
    titleFR: "THE Mining Investment Event 2026 – Présentations du Jour 2 | Minéraux Critiques, ESG & Redevances",
    description: "Watch full Day 2 sessions covering critical minerals, battery metals supply chains, royalty streaming panels, SHE-Co initiatives, and ESG best practices.",
    descriptionFR: "Regardez les sessions intégrales du Jour 2 couvrant les minéraux critiques, les chaînes d'approvisionnement en métaux de batterie, les redevances et l'initiative SHE-Co.",
    videos: [
      {
        id: "wOa0mN4ughY",
        title: "Inside Mining's Next Giant: High-Grade Growth Strategy | Contango Silver & Gold",
        titleFR: "Au cœur du prochain géant minier : Stratégie de croissance à haute teneur",
        duration: "18:25",
        channel: "VID TV",
        views: "580 views",
        viewsFR: "580 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/wOa0mN4ughY/hqdefault.jpg",
      },
      {
        id: "X1NpnA8zC8Q",
        title: "Massive New Silver Scale: The 2026 Strategy | Outcrop Silver & Gold",
        titleFR: "Nouvelle échelle d'argent massive : La stratégie 2026",
        duration: "16:40",
        channel: "VID TV",
        views: "420 views",
        viewsFR: "420 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/X1NpnA8zC8Q/hqdefault.jpg",
      },
      {
        id: "xJZP3AY0iLc",
        title: "Mining's Massive Next Boom: AI Changes Everything | Salman Partners",
        titleFR: "Le prochain boom minier : L'IA change tout",
        duration: "21:15",
        channel: "VID TV",
        views: "690 views",
        viewsFR: "690 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/xJZP3AY0iLc/hqdefault.jpg",
      },
      {
        id: "Nx8NrD2-VBk",
        title: "Cracking The Off-Take Code: Glencore's Growth Strategy | Glencore Canada",
        titleFR: "Décoder les contrats d'off-take : Stratégie de croissance de Glencore",
        duration: "19:50",
        channel: "VID TV",
        views: "510 views",
        viewsFR: "510 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/Nx8NrD2-VBk/hqdefault.jpg",
      },
      {
        id: "4KdA7QwfAtM",
        title: "Quebec's Multi-Billion Mineral Boom: Future Mining Powerhouse | Quebec Panel",
        titleFR: "Le boom minéral de plusieurs milliards au Québec : Puissance minière du futur",
        duration: "24:30",
        channel: "VID TV",
        views: "730 views",
        viewsFR: "730 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/4KdA7QwfAtM/hqdefault.jpg",
      },
      {
        id: "BhZNr_8vuCw",
        title: "Critical Metals & ESG Excellence Spotlight | Executive Keynotes",
        titleFR: "Métaux critiques et excellence ESG : Discours principaux",
        duration: "17:10",
        channel: "VID TV",
        views: "360 views",
        viewsFR: "360 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/BhZNr_8vuCw/hqdefault.jpg",
      },
      {
        id: "QMvZtKsg258",
        title: "Bolivia's Next Silver Giant: Massive Open Pits | New Pacific Metals",
        titleFR: "Le prochain géant de l'argent en Bolivie : Fosses ouvertes massives",
        duration: "15:45",
        channel: "VID TV",
        views: "490 views",
        viewsFR: "490 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/QMvZtKsg258/hqdefault.jpg",
      },
    ],
  },
  {
    id: "day3",
    dayNum: "Day 3",
    dayNumFR: "Jour 3",
    title: "THE Mining Investment Event 2026 – Day 3 Presentations | Explorers, Developers & Spotlights",
    titleFR: "THE Mining Investment Event 2026 – Présentations du Jour 3 | Explorateurs, Développeurs & Vitrines",
    description: "Explore Day 3 presentations showcasing high-grade discoveries, junior mining pitches, student sponsorship award ceremonies, and closing remarks.",
    descriptionFR: "Explorez les présentations du Jour 3 présentant des découvertes à haute teneur, des présentations de projets juniors et la cérémonie de clôture.",
    videos: [
      {
        id: "q9_nsx6pFvc",
        title: "Why Yukon, Why Now? | Discovery, Scale & Development in Canada's Next Mining District",
        titleFR: "Pourquoi le Yukon, pourquoi maintenant ? | Découverte & Développement",
        duration: "23:40",
        channel: "VID TV",
        views: "640 views",
        viewsFR: "640 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/q9_nsx6pFvc/hqdefault.jpg",
      },
      {
        id: "wsi7YowJUWw",
        title: "How to Pick Junior Mining Winners | Top Mining CEOs Share Their Investment Playbook",
        titleFR: "Comment choisir les gagnants miniers juniors | Les grands PDG partagent leur stratégie",
        duration: "19:15",
        channel: "VID TV",
        views: "520 views",
        viewsFR: "520 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/wsi7YowJUWw/hqdefault.jpg",
      },
      {
        id: "a3S8YCiBS0A",
        title: "Could Dryden Gold Be Building the Next Red Lake? | Trey Wasser on District-Scale Gold",
        titleFR: "Dryden Gold pourrait-il construire le prochain Red Lake ?",
        duration: "17:50",
        channel: "VID TV",
        views: "480 views",
        viewsFR: "480 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/a3S8YCiBS0A/hqdefault.jpg",
      },
      {
        id: "Rd4fqZ2v_q4",
        title: "Massive Gold Upside Unlocked: Abcourt Mines Ramps Up Production at Sleeping Giant",
        titleFR: "Potentiel d'or massif débloqué : Abcourt Mines augmente sa production",
        duration: "16:30",
        channel: "VID TV",
        views: "590 views",
        viewsFR: "590 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/Rd4fqZ2v_q4/hqdefault.jpg",
      },
      {
        id: "3LlhJNFIyTM",
        title: "The Honourable Kody Blois on Canada's Mining Future & Policy Framework",
        titleFR: "L'honorable Kody Blois sur l'avenir minier du Canada",
        duration: "14:20",
        channel: "VID TV",
        views: "710 views",
        viewsFR: "710 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/3LlhJNFIyTM/hqdefault.jpg",
      },
      {
        id: "Fs4dOARX8qg",
        title: "Massive Copper Merger Revealed | Cygnus Metals & Central Asia Metals Deal Explained",
        titleFR: "Fusion cuivre massive révélée : Accord Cygnus Metals & Central Asia Metals",
        duration: "20:10",
        channel: "VID TV",
        views: "660 views",
        viewsFR: "660 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/Fs4dOARX8qg/hqdefault.jpg",
      },
      {
        id: "UFLn0PQi_A4",
        title: "Emerging Explorers & Junior Mining Discoveries | Day 3 Closing Showcase",
        titleFR: "Explorateurs émergents & Découvertes minières juniors | Vitrine de clôture",
        duration: "15:40",
        channel: "VID TV",
        views: "430 views",
        viewsFR: "430 vues",
        timeAgo: "1 month ago",
        timeAgoFR: "il y a 1 mois",
        thumb: "https://i.ytimg.com/vi/UFLn0PQi_A4/hqdefault.jpg",
      },
    ],
  },
];

/* ─── Reusable YouTube Playlist Shelf Row Component ─── */
function YouTubePlaylistShelf({
  playlist,
  onPlayVideo,
}: {
  playlist: (typeof playlistsData)[0];
  onPlayVideo: (videoId: string) => void;
}) {
  const { lang } = useLanguage();
  const isFr = lang === "FR";
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -450, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 450, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full mb-12 sm:mb-14 border-b border-neutral-800/80 pb-10">
      {/* ─── Playlist Header matching YouTube exact UI ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <h2 className="text-lg sm:text-xl md:text-[22px] font-bold text-[#f1f1f1] tracking-tight leading-snug">
            {isFr ? playlist.titleFR : playlist.title}
          </h2>
        </div>

        {/* Play all button */}
        <button
          onClick={() => onPlayVideo(playlist.videos[0].id)}
          className="inline-flex items-center gap-2 text-white hover:text-neutral-200 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full bg-neutral-800/90 hover:bg-neutral-700 transition-colors border border-neutral-700 shrink-0 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span>{isFr ? "Tout lire" : "Play all"}</span>
        </button>
      </div>

      {/* Playlist Subtext Description */}
      <p className="text-neutral-400 text-xs sm:text-sm max-w-5xl leading-relaxed mb-5 font-normal">
        {isFr ? playlist.descriptionFR : playlist.description}
      </p>

      {/* ─── Carousel Track with Floating Navigation Arrow Buttons ─── */}
      <div className="relative group/shelf">
        {/* Left Arrow Button */}
        <button
          onClick={scrollLeft}
          className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#272727]/90 hover:bg-[#3f3f3f] text-white shadow-2xl border border-white/10 flex items-center justify-center text-lg z-20 opacity-0 group-hover/shelf:opacity-100 transition-opacity duration-200 cursor-pointer"
          aria-label="Scroll left"
        >
          ‹
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth py-1 px-0.5"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {playlist.videos.map((vid, idx) => (
            <div
              key={idx}
              onClick={() => onPlayVideo(vid.id)}
              className="w-[230px] sm:w-[250px] md:w-[270px] shrink-0 flex flex-col group/card cursor-pointer"
            >
              {/* Thumbnail Container matching YouTube exact UI */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 shadow-md transition-all duration-200">
                <img
                  src={vid.thumb}
                  alt={isFr ? vid.titleFR : vid.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                  loading="lazy"
                />

                {/* Duration Badge */}
                <span className="absolute bottom-1.5 right-1.5 bg-black/85 text-white text-[11px] font-semibold px-1.5 py-0.5 rounded tracking-wide">
                  {vid.duration}
                </span>

                {/* Hover Play Icon Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-lg transform scale-90 group-hover/card:scale-100 transition-transform">
                    <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Title & Info below Thumbnail matching YouTube exact layout */}
              <div className="flex items-start justify-between gap-1 mt-2.5">
                <h3 className="text-xs sm:text-[13px] font-semibold text-[#f1f1f1] line-clamp-2 leading-snug group-hover/card:text-white transition-colors">
                  {isFr ? vid.titleFR : vid.title}
                </h3>
                {/* 3-Dot Context Menu Icon */}
                <button className="text-neutral-400 hover:text-white p-0.5 text-sm shrink-0 transition-colors">
                  ⋮
                </button>
              </div>

              {/* Channel Name */}
              <span className="text-[11px] text-neutral-400 font-medium mt-1">
                {vid.channel}
              </span>

              {/* Views & Upload Timestamp */}
              <span className="text-[11px] text-neutral-400 font-medium mt-0.5">
                {isFr ? vid.viewsFR : vid.views} • {isFr ? vid.timeAgoFR : vid.timeAgo}
              </span>
            </div>
          ))}
        </div>

        {/* Right Arrow Button matching reference image */}
        <button
          onClick={scrollRight}
          className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#272727]/90 hover:bg-[#3f3f3f] text-white shadow-2xl border border-white/10 flex items-center justify-center text-lg z-20 opacity-90 group-hover/shelf:opacity-100 transition-opacity duration-200 cursor-pointer"
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default function MediaPage() {
  const { t, lang } = useLanguage();
  const isFr = lang === "FR";

  const [activeVideoId, setActiveVideoId] = useState<string>("UjKV33kdUbA");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const activeVideoObj =
    playlistsData
      .flatMap((p) =>
        p.videos.map((v) => ({
          ...v,
          playlistTitle: isFr ? p.titleFR : p.title,
          playlistDesc: isFr ? p.descriptionFR : p.description,
        }))
      )
      .find((v) => v.id === activeVideoId) || { ...playlistsData[0].videos[0], playlistTitle: "", playlistDesc: "" };

  const openLightbox = (i: number) => setLightboxIdx(i);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImage = () =>
    setLightboxIdx((p) => (p !== null ? (p - 1 + galleryTiles.length) % galleryTiles.length : null));
  const nextImage = () =>
    setLightboxIdx((p) => (p !== null ? (p + 1) % galleryTiles.length : null));

  const handlePlayVideo = (videoId: string) => {
    setActiveVideoId(videoId);
    const playerEl = document.getElementById("featured-player-section");
    if (playerEl) {
      playerEl.scrollIntoView({ behavior: "smooth", block: "start" });
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
              {t("media-hero-title-1", "Recent")} <span className="text-[#C6112F]">{t("media-hero-title-2", "Media & Playlists")}</span>
            </h1>
            <div className="w-20 h-[3px] bg-[#C6112F] rounded-full mt-6" />
          </div>
        </section>

        {/* ═══════════════ 1. PHOTO GALLERY GRID (VISIBLE FIRST) ═══════════════ */}
        <section className="relative w-full bg-white py-16 sm:py-20">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("media-gallery-label", "Gallery & Media")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] tracking-tight mb-1">
              {t("media-gallery-title-1", "THE Event in")}{" "}
              <span className="text-[#C6112F]">{t("media-gallery-title-2", "Pictures & Press")}</span>
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-4" />
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-[700px] mb-8">
              {t(
                "media-gallery-desc",
                "Explore recent coverage, photography, and media from THE Mining Investment Event. For media inquiries and press accreditation, please contact our team directly."
              )}
            </p>

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
                  <img
                    src={tile.img}
                    alt={`THE Mining Investment Event Photo ${i + 1}`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ 2. YOUTUBE PLAYLIST SHELVES SECTION (VISIBLE AFTER PHOTOS) ═══════════════ */}
        <section className="relative w-full bg-[#0f0f0f] text-white py-14 sm:py-18 border-t border-b border-neutral-800">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8">

            {/* Channel Branding & Cinema Player Section */}
            <div id="featured-player-section" className="mb-12 scroll-mt-28">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Main YouTube Cinema Player Container */}
                <div className="lg:col-span-8 relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-neutral-800">
                  <iframe
                    src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                    title={isFr && activeVideoObj.titleFR ? activeVideoObj.titleFR : activeVideoObj.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Right Side Video Details Panel */}
                <div className="lg:col-span-4 bg-[#181818] border border-neutral-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between text-left">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-[#C6112F]/20 text-[#C6112F] border border-[#C6112F]/40 text-[10px] font-black uppercase tracking-widest rounded-full">
                        {isFr ? "EN LECTURE" : "NOW PLAYING"}
                      </span>
                      <span className="text-xs font-semibold text-neutral-400">
                        {activeVideoObj.channel || "VID TV"}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-white leading-snug mb-3 line-clamp-3">
                      {isFr && activeVideoObj.titleFR ? activeVideoObj.titleFR : activeVideoObj.title}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium mb-4 flex-wrap">
                      <span className="px-2 py-0.5 rounded bg-white/10 font-mono text-white text-[11px]">
                        ⏱ {activeVideoObj.duration}
                      </span>
                      <span>•</span>
                      <span>{isFr && activeVideoObj.viewsFR ? activeVideoObj.viewsFR : activeVideoObj.views}</span>
                      <span>•</span>
                      <span>{isFr && activeVideoObj.timeAgoFR ? activeVideoObj.timeAgoFR : activeVideoObj.timeAgo}</span>
                    </div>

                    {activeVideoObj.playlistTitle && (
                      <div className="pt-3 border-t border-neutral-800 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                          {isFr ? "PLAYLIST / ÉVÉNEMENT" : "PLAYLIST / EVENT"}
                        </span>
                        <p className="text-xs font-semibold text-neutral-300 line-clamp-2">
                          {activeVideoObj.playlistTitle}
                        </p>
                      </div>
                    )}
                  </div>

                  <a
                    href={`https://www.youtube.com/watch?v=${activeVideoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-[#C6112F] text-white text-xs font-bold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-2 border border-neutral-700 shadow-sm"
                  >
                    <span>{isFr ? "Regarder sur YouTube ↗" : "Watch on YouTube ↗"}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* ════════ STACKED DAY PLAYLIST SHELVES (DAY 1 -> DAY 2 -> DAY 3) ════════ */}
            <div className="space-y-4">
              {playlistsData.map((playlist) => (
                <YouTubePlaylistShelf
                  key={playlist.id}
                  playlist={playlist}
                  onPlayVideo={handlePlayVideo}
                />
              ))}
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
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl z-10 transition-colors"
            aria-label="Close preview"
          >
            ✕
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[#C6112F]/80 text-white flex items-center justify-center text-2xl transition-all z-10"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[#C6112F]/80 text-white flex items-center justify-center text-2xl transition-all z-10"
            aria-label="Next image"
          >
            ›
          </button>
          <div className="max-w-[90vw] max-h-[85vh] relative flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryTiles[lightboxIdx].img}
              alt={`THE Mining Investment Event Photo ${lightboxIdx + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <div className="text-center mt-3">
              <span className="text-white/50 text-xs font-semibold tracking-wider">
                {lightboxIdx + 1} / {galleryTiles.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
