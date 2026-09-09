"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/store", label: "스토어" },
  { href: "#", label: "AI OMR WORK" },
  { href: "#", label: "챌린지" },
  { href: "#", label: "히든카이스 소개" },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-100 bg-white">
      <div className="mx-auto grid h-[72px] max-w-[1200px] grid-cols-[1fr_auto_1fr] items-center px-6">
        <Link href="/store" className="justify-self-start">
          <img src="/icons/LOGO.svg" alt="HIDDEN KICE" width={143} height={18} />
        </Link>

        <nav className="flex items-center gap-9 font-['Pretendard'] text-[18px] leading-[1.6] font-semibold">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href !== "#" && pathname.startsWith(item.href);

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

        <div className="flex items-center justify-self-end gap-5">
          <button type="button" aria-label="장바구니" className="relative">
            <img src="/icons/shopping-cart.svg" alt="" width={24} height={24} />
            <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#5b4dff] px-1 text-[10px] font-semibold text-white">
              0
            </span>
          </button>
          <button type="button" aria-label="알림" className="relative">
            <img src="/icons/bell.svg" alt="" width={24} height={24} />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#5b4dff]" />
          </button>
          <button type="button" aria-label="마이페이지">
            <img src="/icons/user.svg" alt="" width={24} height={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
