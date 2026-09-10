"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/store", label: "스토어" },
  { href: "/ai-omr-work", label: "AI OMR WORK" },
  { href: "/challenge", label: "챌린지" },
  { href: "/about", label: "히든카이스 소개" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    function closeIfDesktop() {
      if (mediaQuery.matches) {
        setMenuOpen(false);
      }
    }

    mediaQuery.addEventListener("change", closeIfDesktop);
    return () => mediaQuery.removeEventListener("change", closeIfDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header>
      <div className="sticky top-0 z-50 border-b border-zinc-100 bg-white py-2.5">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 md:h-20 md:px-6">
          <div className="flex min-w-0 items-center gap-3 md:gap-[clamp(1.5rem,6vw,100px)]">
            <button
              type="button"
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="flex size-6 shrink-0 cursor-pointer items-center justify-center md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <img
                src={menuOpen ? "/icons/x.svg" : "/icons/menu.svg"}
                alt=""
                width={menuOpen ? 16 : 24}
                height={menuOpen ? 16 : 24}
              />
            </button>

            <Link href="/store" className="shrink-0">
              <img
                src="/icons/LOGO.svg"
                alt="HIDDEN KICE"
                width={143}
                height={18}
              />
            </Link>

            <nav className="hidden items-center gap-8 font-['Pretendard'] text-[18px] leading-[1.6] font-semibold md:flex">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={isActive ? "text-[#7F77DD]" : "text-[#979CA5]"}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-4 md:gap-6">
            <button
              type="button"
              aria-label="장바구니"
              className="relative cursor-pointer"
            >
              <img src="/icons/shopping-cart.svg" alt="" width={24} height={24} />
              <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#7F77DD] px-1 font-['Pretendard'] text-[10px] leading-[1.4] font-regular text-white">
                1
              </span>
            </button>
            <button
              type="button"
              aria-label="알림"
              className="relative cursor-pointer"
            >
              <img src="/icons/bell.svg" alt="" width={24} height={24} />
              <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#7F77DD] px-1 font-['Pretendard'] text-[10px] leading-[1.4] font-regular text-white">
                1
              </span>
            </button>
            <button type="button" aria-label="마이페이지" className="cursor-pointer">
              <img src="/icons/user.svg" alt="" width={24} height={24} />
            </button>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <div className="md:hidden">
          <button
            type="button"
            aria-label="메뉴 닫기"
            className="fixed inset-x-0 top-14 bottom-0 z-40 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />
          <div
            id="mobile-nav"
            className="fixed top-14 bottom-0 left-0 z-50 flex w-[min(80vw,320px)] flex-col bg-white shadow-xl"
          >
            <nav className="flex flex-col gap-1 px-4 py-6 font-['Pretendard'] text-[18px] leading-[1.6] font-semibold">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`rounded-md px-2 py-3 ${isActive ? "text-[#7F77DD]" : "text-[#979CA5]"}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
