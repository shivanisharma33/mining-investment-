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

  return (
    <div ref={containerRef} className="inline-block overflow-hidden py-1">
      <Tag className={className}>
        {text.split("").map((char, i) => (
          <span
            key={`${char}-${i}`}
            className={`inline-block transition-all duration-500 ${
              isVisible ? "char-slide-left-active" : "char-slide-left-hidden"
            }`}
            style={{
              animationDelay: isVisible ? `${i * delayStep}s` : "0s",
              transitionDelay: isVisible ? `${i * delayStep}s` : "0s",
              whiteSpace: char === " " ? "pre" : "normal",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </Tag>
    </div>
  );
}
