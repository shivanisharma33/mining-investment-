"use client";

import React, { useState } from "react";

export default function ShareBar({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  // Built on click so the URL is always the live one, with no server/client mismatch.
  const openShareWindow = (buildUrl: (url: string) => string) => {
    window.open(buildUrl(window.location.href), "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const links = [
    {
      name: "LinkedIn",
      build: (url: string) =>
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      hover: "hover:bg-[#0A66C2]",
      path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z",
    },
    {
      name: "X (Twitter)",
      build: (url: string) =>
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      hover: "hover:bg-black",
      path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    },
    {
      name: "Facebook",
      build: (url: string) =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      hover: "hover:bg-[#1877F2]",
      path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.78 5.6c1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 3h-2.34v6.8c4.56-.93 8-4.96 8-9.8z",
    },
  ];

  return (
    <div className="flex items-center gap-1.5 bg-neutral-50 p-1.5 rounded-xl border border-neutral-200/80">
      <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider px-2 hidden sm:inline-block">
        Share
      </span>
      {links.map((link) => (
        <button
          key={link.name}
          type="button"
          onClick={() => openShareWindow(link.build)}
          title={`Share on ${link.name}`}
          aria-label={`Share on ${link.name}`}
          className={`w-8 h-8 rounded-lg bg-white ${link.hover} text-neutral-700 hover:text-white flex items-center justify-center transition-all shadow-2xs border border-neutral-200/80 cursor-pointer`}
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d={link.path} />
          </svg>
        </button>
      ))}
      <button
        onClick={handleCopyLink}
        title="Copy link to this release"
        className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-bold transition-all border border-neutral-200/80 flex items-center gap-1 cursor-pointer"
      >
        <svg className="w-3.5 h-3.5 text-neutral-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.75v-6.75" />
        </svg>
        <span>{copied ? "Copied!" : "Copy"}</span>
      </button>
    </div>
  );
}
