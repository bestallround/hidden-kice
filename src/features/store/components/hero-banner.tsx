"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const BANNERS = [
  { src: "/banners/hero-1.png", alt: "히든카이스 배너 1", href: "/series" },
  { src: "/banners/hero-2.png", alt: "히든카이스 배너 2", href: "/series" },
  { src: "/banners/hero-3.png", alt: "히든카이스 배너 3", href: "/series" },
  { src: "/banners/hero-4.png", alt: "히든카이스 배너 4", href: "/series" },
  { src: "/banners/hero-5.png", alt: "히든카이스 배너 5", href: "/series" },
] as const;

const SLIDE_INTERVAL_MS = 3000;
const DRAG_THRESHOLD_PX = 50;

export function HeroBanner() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const hoveredRef = useRef(false);
  const skipClickRef = useRef(false);

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
    skipClickRef.current = false;
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

    if (Math.abs(delta) >= DRAG_THRESHOLD_PX) {
      skipClickRef.current = true;

      if (delta < 0) {
        setIndex((current) => (current + 1) % BANNERS.length);
      } else {
        setIndex((current) => (current - 1 + BANNERS.length) % BANNERS.length);
      }
    } else if (!event.metaKey && !event.ctrlKey && !event.altKey) {
      router.push(BANNERS[index].href);
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
            <Link
              key={banner.src}
              href={banner.href}
              className="h-full w-full flex-none"
              onClick={(event) => {
                if (skipClickRef.current) {
                  event.preventDefault();
                  skipClickRef.current = false;
                }
              }}
            >
              <img
                src={banner.src}
                alt={banner.alt}
                draggable={false}
                className="h-full w-full object-cover"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute right-6 bottom-4 flex h-[29px] w-[60px] items-center justify-center rounded-full bg-[#0000004D] px-[10px] py-1 font-['Pretendard'] text-[14px] font-semibold text-white">
        {index + 1}/{BANNERS.length}
      </div>
    </section>
  );
}
