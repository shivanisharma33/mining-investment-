"use client";

import React, { useEffect, useRef, useState } from "react";

interface AnimatedHeadingProps {
  text: string;
  tag?: "h2" | "h3" | "h1" | "span" | "div";
  className?: string;
  delayStep?: number; // Delay per character in seconds (default 0.03s)
}

export default function AnimatedHeading({
  text,
  tag = "h2",
  className = "",
  delayStep = 0.03,
}: AnimatedHeadingProps) {
  const Tag = tag;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Split sentence into words to prevent mid-word breaks or orphan letters
  const words = text.split(" ");
  let globalCharIndex = 0;

  return (
    <div ref={containerRef} className="inline-block py-1 max-w-full">
      <Tag className={className}>
        {words.map((word, wIdx) => {
          const charSpans = word.split("").map((char) => {
            const charIdx = globalCharIndex++;
            return (
              <span
                key={charIdx}
                className={`inline-block transition-all duration-500 ${
                  isVisible ? "char-slide-left-active" : "char-slide-left-hidden"
                }`}
                style={{
                  animationDelay: isVisible ? `${charIdx * delayStep}s` : "0s",
                  transitionDelay: isVisible ? `${charIdx * delayStep}s` : "0s",
                }}
              >
                {char}
              </span>
            );
          });

          // Count space in character delay index sequence
          globalCharIndex++;

          return (
            <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
              {charSpans}
            </span>
          );
        })}
      </Tag>
    </div>
  );
}
