export function HeroBanner() {
  return (
    <section className="bg-[#2a2a2a] text-white">
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <p className="text-[#e05a3c]">HIDDEN KICE —</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight">
            히든카이스 모두가 푸는 건 이유가 있습니다
          </h1>
          <p className="mt-4 text-zinc-300">
            상위권이 선택한 문제집, 결과로 증명된 실전 대비서
          </p>

          <ul className="mt-8 flex gap-6 text-sm">
            <li>
              <p className="text-[#e05a3c]">실전 적중</p>
              <p>출제 경향을 꿰뚫는 문제</p>
            </li>
            <li>
              <p className="text-[#e05a3c]">난이도별 구성</p>
              <p>단계별로 완성하는 실력</p>
            </li>
            <li>
              <p className="text-[#e05a3c]">검증된 결과</p>
              <p>합격생이 증명한 신뢰</p>
            </li>
          </ul>

          <a
            href="#products"
            className="mt-8 inline-flex items-center border border-[#e05a3c] px-5 py-2.5 text-sm"
          >
            히든카이스 시리즈 보기 →
          </a>
        </div>

        <div className="flex min-h-[280px] items-center justify-center border border-dashed border-zinc-500 text-zinc-400">
          교재 이미지
        </div>

        <p className="absolute right-6 bottom-6 text-sm text-zinc-400">1/5</p>
      </div>
    </section>
  );
}
