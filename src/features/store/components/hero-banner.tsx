"use client";

import { useEffect, useRef, useState } from "react";

const BANNERS = [
  { src: "/banners/hero-1.png", alt: "히든카이스 배너 1" },
  { src: "/banners/hero-2.png", alt: "히든카이스 배너 2" },
  { src: "/banners/hero-3.png", alt: "히든카이스 배너 3" },
  { src: "/banners/hero-4.png", alt: "히든카이스 배너 4" },
  { src: "/banners/hero-5.png", alt: "히든카이스 배너 5" },
] as const;

const SLIDE_INTERVAL_MS = 3000;
const DRAG_THRESHOLD_PX = 50;

export function HeroBanner() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const hoveredRef = useRef(false);

  useEffect(() => {
    if (paused || isDragging) {
      return;
    }

    const timerId = window.setInterval(() => {
      setIndex((current) => (current + 1) % BANNERS.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timerId);
  }, [isDragging, paused]);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    startXRef.current = event.clientX;
    setIsDragging(true);
    setPaused(true);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) {
      return;
    }

    setDragX(event.clientX - startXRef.current);
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) {
      return;
    }

    const delta = event.clientX - startXRef.current;

    if (delta < -DRAG_THRESHOLD_PX) {
      setIndex((current) => (current + 1) % BANNERS.length);
    } else if (delta > DRAG_THRESHOLD_PX) {
      setIndex((current) => (current - 1 + BANNERS.length) % BANNERS.length);
    }

    setDragX(0);
    setIsDragging(false);
    setPaused(hoveredRef.current);
  }

  return (
    <section
      className="relative overflow-hidden bg-black"
      onMouseEnter={() => {
        hoveredRef.current = true;
        setPaused(true);
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
        if (!isDragging) {
          setPaused(false);
        }
      }}
    >
      <div
        className="relative aspect-[2149/731] w-full cursor-grab overflow-hidden select-none active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className={`flex h-full w-full ${isDragging ? "" : "transition-transform duration-500"}`}
          style={{
            transform: `translateX(calc(${-index * 100}% + ${dragX}px))`,
          }}
        >
          {BANNERS.map((banner) => (
            <img
              key={banner.src}
              src={banner.src}
              alt={banner.alt}
              draggable={false}
              className="h-full w-full flex-none object-cover"
            />
          ))}
        </div>
      </div>
      <p className="pointer-events-none absolute right-6 bottom-4 text-sm text-white/80">
        {index + 1}/{BANNERS.length}
      </p>
    </section>
  );
}
