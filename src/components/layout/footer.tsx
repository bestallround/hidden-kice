const FOOTER_LINKS = [
  { href: "#", label: "회사소개" },
  { href: "#", label: "이용약관" },
  { href: "#", label: "개인정보처리방침" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-[#f7f7f7] text-[12px] leading-6 text-zinc-500">
      <div className="mx-auto max-w-[1200px] px-6 py-8">
        <nav className="flex items-center gap-2 text-zinc-700">
          {FOOTER_LINKS.map((item, index) => (
            <span key={item.label} className="flex items-center gap-2">
              {index > 0 && <span className="text-zinc-300">|</span>}
              <a
                href={item.href}
                className={item.label === "개인정보처리방침" ? "font-semibold" : undefined}
              >
                {item.label}
              </a>
            </span>
          ))}
        </nav>

        <p className="mt-3">
          (주)히든카이스 | 대표: 안영욱 | 사업자등록번호: 735-87-02522{" "}
          <a href="#" className="underline underline-offset-2">
            [사업자정보확인]
          </a>
        </p>
        <p>
          주소: 경기도 고양시 일산서구 일현로 97-11, 56F | 통신판매업신고: 제
          2024-고양일산서-1209 | 이메일: Hidden_kice@naver.com
        </p>
        <p className="mt-3">Copyright © 2025 히든카이스. All rights reserved.</p>
      </div>
    </footer>
  );
}
