import Link from "next/link";

const NAV_ITEMS = [
  { href: "/store", label: "스토어" },
  { href: "#", label: "AI OMR WORK" },
  { href: "#", label: "챌린지" },
  { href: "#", label: "히든카이스 소개" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-100 bg-white">
      <div className="mx-auto grid h-[72px] max-w-[1200px] grid-cols-[1fr_auto_1fr] items-center px-6">
        <Link
          href="/store"
          className="justify-self-start text-[22px] font-extrabold tracking-tight text-[#5b4dff]"
        >
          HIDDEN KICE
        </Link>

        <nav className="flex items-center gap-9 text-[15px] font-medium text-zinc-800">
          {NAV_ITEMS.map((item) => (
            <Link key={item.label} href={item.href} className="hover:text-[#5b4dff]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-5 text-zinc-700">
          <button type="button" aria-label="장바구니" className="relative">
            <CartIcon />
            <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#5b4dff] px-1 text-[10px] font-semibold text-white">
              0
            </span>
          </button>
          <button type="button" aria-label="알림" className="relative">
            <BellIcon />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#5b4dff]" />
          </button>
          <button type="button" aria-label="마이페이지">
            <UserIcon />
          </button>
        </div>
      </div>
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 4h1.5l1.2 9.2a2 2 0 0 0 2 1.8h8.6a2 2 0 0 0 2-1.7L20 8H7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="20" r="1.3" fill="currentColor" />
      <circle cx="17" cy="20" r="1.3" fill="currentColor" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 9a6 6 0 1 1 12 0c0 3.5 1.2 5.2 1.8 6H4.2C4.8 14.2 6 12.5 6 9Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M10 18.5a2 2 0 0 0 4 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M5 19.2c1.2-3.2 3.6-4.7 7-4.7s5.8 1.5 7 4.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
