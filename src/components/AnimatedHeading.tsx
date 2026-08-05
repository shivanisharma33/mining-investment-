"use client";

import React from "react";

interface AnimatedHeadingProps {
  text: string;
  tag?: "h2" | "h3" | "h1" | "span" | "div";
  className?: string;
  delayStep?: number;
}

export default function AnimatedHeading({
  text,
  tag = "h2",
  className = "",
}: AnimatedHeadingProps) {
  const Tag = tag;

  return (
    <Tag className={className}>
      {text}
    </Tag>
  );
}
