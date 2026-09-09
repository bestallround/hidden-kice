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
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <label className="relative block w-full max-w-md">
        <span className="sr-only">검색</span>
        <img
          src="/icons/search.svg"
          alt=""
          width={20}
          height={20}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
        />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="검색"
          className="w-full rounded-md border border-zinc-200 py-2 pr-9 pl-9 text-sm"
        />
        {query ? (
          <button
            type="button"
            aria-label="검색어 지우기"
            onClick={() => onQueryChange("")}
            className="absolute top-1/2 right-3 -translate-y-1/2"
          >
            <img src="/icons/x.svg" alt="" width={16} height={16} />
          </button>
        ) : null}
      </label>

      <div className="flex items-center gap-2 text-sm text-zinc-500">
        {CATEGORIES.map((item, index) => (
          <span key={item} className="flex items-center gap-2">
            {index > 0 && <span className="text-zinc-300">|</span>}
            <button
              type="button"
              onClick={() => onCategoryChange(item)}
              className={
                category === item ? "font-semibold text-zinc-900" : undefined
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
