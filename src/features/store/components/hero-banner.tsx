"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const BANNERS = [
  { src: "/banners/hero-1.png", alt: "히든카이스 배너 1", href: "/series" },
  { src: "/banners/hero-2.png", alt: "히든카이스 배너 2", href: "/series" },
  { src: "/banners/hero-3.png", alt: "히든카이스 배너 3", href: "/series" },
  { src: "/banners/hero-4.png", alt: "히든카이스 배너 4", href: "/series" },
  { src: "/banners/hero-5.png", alt: "히든카이스 배너 5", href: "/series" },
] as const;

const LOOP_SLIDES = [BANNERS[BANNERS.length - 1], ...BANNERS, BANNERS[0]];
const LAST_CLONE_INDEX = LOOP_SLIDES.length - 1;
const SLIDE_INTERVAL_MS = 3000;
const DRAG_THRESHOLD_PX = 50;

function getRealIndex(trackIndex: number) {
  if (trackIndex === 0) {
    return BANNERS.length - 1;
  }

  if (trackIndex === LAST_CLONE_INDEX) {
    return 0;
  }

  return trackIndex - 1;
}

export function HeroBanner() {
  const router = useRouter();
  const [trackIndex, setTrackIndex] = useState(1);
  const [enableTransition, setEnableTransition] = useState(true);
  const [paused, setPaused] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const dragXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const hoveredRef = useRef(false);
  const skipClickRef = useRef(false);
  const autoplayTimerRef = useRef<number>(0);

  const realIndex = getRealIndex(trackIndex);

  useEffect(() => {
    window.clearTimeout(autoplayTimerRef.current);

    if (paused || isDragging || !enableTransition) {
      return;
    }

    if (trackIndex === 0 || trackIndex === LAST_CLONE_INDEX) {
      return;
    }

    autoplayTimerRef.current = window.setTimeout(() => {
      setTrackIndex((current) => current + 1);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearTimeout(autoplayTimerRef.current);
  }, [enableTransition, isDragging, paused, trackIndex]);

  useLayoutEffect(() => {
    if (enableTransition) {
      return;
    }

    let secondFrameId = 0;
    const firstFrameId = window.requestAnimationFrame(() => {
      secondFrameId = window.requestAnimationFrame(() => {
        setEnableTransition(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrameId);
      window.cancelAnimationFrame(secondFrameId);
    };
  }, [enableTransition]);

  function snapIfClone(nextIndex: number) {
    if (nextIndex === LAST_CLONE_INDEX) {
      setEnableTransition(false);
      setTrackIndex(1);
      return;
    }

    if (nextIndex === 0) {
      setEnableTransition(false);
      setTrackIndex(BANNERS.length);
    }
  }

  function goToNext() {
    setTrackIndex((current) => Math.min(current + 1, LAST_CLONE_INDEX));
  }

  function goToPrevious() {
    setTrackIndex((current) => Math.max(current - 1, 0));
  }

  function finishDrag(options: { allowClick: boolean; metaKey: boolean }) {
    if (!isDraggingRef.current) {
      return;
    }

    const delta = dragXRef.current;
    isDraggingRef.current = false;

    if (delta <= -DRAG_THRESHOLD_PX) {
      skipClickRef.current = true;
      goToNext();
    } else if (delta >= DRAG_THRESHOLD_PX) {
      skipClickRef.current = true;
      goToPrevious();
    } else if (options.allowClick && !options.metaKey) {
      router.push(BANNERS[realIndex].href);
    }

    dragXRef.current = 0;
    setDragX(0);
    setIsDragging(false);
    setPaused(hoveredRef.current);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    window.clearTimeout(autoplayTimerRef.current);
    skipClickRef.current = false;
    startXRef.current = event.clientX;
    dragXRef.current = 0;
    isDraggingRef.current = true;
    setIsDragging(true);
    setPaused(true);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current) {
      return;
    }

    const nextDragX = event.clientX - startXRef.current;
    dragXRef.current = nextDragX;
    setDragX(nextDragX);
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    finishDrag({
      allowClick: true,
      metaKey: event.metaKey || event.ctrlKey || event.altKey,
    });
  }

  function handlePointerCancel() {
    finishDrag({ allowClick: false, metaKey: true });
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
        if (!isDraggingRef.current) {
          setPaused(false);
        }
      }}
    >
      <div
        className="relative aspect-[2149/731] w-full cursor-grab touch-none overflow-hidden select-none active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onDragStart={(event) => event.preventDefault()}
      >
        <div
          className={`flex h-full w-full ${enableTransition && !isDragging ? "transition-transform duration-500" : ""}`}
          style={{
            transform: `translateX(calc(${-trackIndex * 100}% + ${dragX}px))`,
          }}
          onTransitionEnd={(event) => {
            if (event.target === event.currentTarget) {
              snapIfClone(trackIndex);
            }
          }}
        >
          {LOOP_SLIDES.map((banner, slideIndex) => (
            <Link
              key={`${banner.src}-${slideIndex}`}
              href={banner.href}
              draggable={false}
              className="h-full w-full flex-none"
              onDragStart={(event) => event.preventDefault()}
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
        {realIndex + 1}/{BANNERS.length}
      </div>
    </section>
  );
}
