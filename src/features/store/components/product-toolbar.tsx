import type { ProductCategory } from "../types";

const CATEGORIES = ["전체", "패스", "단품"] as const;

type ToolbarCategory = (typeof CATEGORIES)[number];

type ProductToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  category: ToolbarCategory;
  onCategoryChange: (value: ToolbarCategory) => void;
};

export function ProductToolbar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
}: ProductToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-4">
      <label className="relative w-[250px] max-w-full">
        <span className="sr-only">검색</span>
        <img
          src="/icons/search.svg"
          alt=""
          width={20}
          height={20}
          className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2"
        />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="검색"
          className="w-full rounded-md border border-[#CED0D4] py-2 pr-8 pl-9 font-['Pretendard'] text-[16px] font-semibold placeholder:text-[#979CA5]"
        />
        {query ? (
          <button
            type="button"
            aria-label="검색어 지우기"
            onClick={() => onQueryChange("")}
            className="absolute top-1/2 right-2 -translate-y-1/2"
          >
            <img src="/icons/x.svg" alt="" width={16} height={16} />
          </button>
        ) : null}
      </label>

      <div className="flex items-center gap-3 font-['Pretendard'] text-[16px] font-semibold text-[#979CA5]">
        {CATEGORIES.map((item, index) => (
          <span key={item} className="flex items-center gap-3">
            {index > 0 && <span className="text-[#979CA5]">|</span>}
            <button
              type="button"
              onClick={() => onCategoryChange(item)}
              className={
                category === item ? "text-[#1C1E21]" : undefined
              }
            >
              {item}
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export type { ToolbarCategory };

export function isProductCategory(
  value: ToolbarCategory,
): value is ProductCategory {
  return value !== "전체";
}
