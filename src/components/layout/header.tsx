"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/store", label: "스토어" },
  { href: "/ai-omr-work", label: "AI OMR WORK" },
  { href: "/challenge", label: "챌린지" },
  { href: "/about", label: "히든카이스 소개" },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-100 bg-white">
      <div className="mx-auto flex h-[100px] max-w-[1200px] items-center justify-between px-6">
        <div className="flex min-w-0 items-center gap-[clamp(1.5rem,6vw,100px)]">
          <Link href="/store" className="shrink-0">
            <img src="/icons/LOGO.svg" alt="HIDDEN KICE" width={143} height={18} />
          </Link>

          <nav className="flex items-center gap-8 font-['Pretendard'] text-[18px] leading-[1.6] font-semibold">
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

        <div className="flex shrink-0 items-center gap-6">
          <button type="button" aria-label="장바구니" className="relative cursor-pointer">
            <img src="/icons/shopping-cart.svg" alt="" width={24} height={24} />
            <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#7F77DD] px-1 font-['Pretendard'] text-[10px] leading-[1.4] font-regular text-white">
              1
            </span>
          </button>
          <button type="button" aria-label="알림" className="relative cursor-pointer">
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
    </header>
  );
}
