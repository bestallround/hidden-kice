"use client";

import { useMemo, useState } from "react";
import { ProductCard, type Product } from "./product-card";
import {
  isProductCategory,
  ProductToolbar,
  type ToolbarCategory,
} from "./product-toolbar";

const DUMMY_PRODUCTS: Product[] = [
  {
    id: "1",
    category: "단품",
    title: "2026 Hidden Kice 시즌7",
    price: 40000,
  },
  {
    id: "2",
    category: "패스",
    title: "2026 Hidden Kice 시즌7",
    price: 64800,
    originalPrice: 78000,
    discountRate: 5,
  },
  {
    id: "3",
    category: "단품",
    title: "2026 Hidden Kice 시즌7",
    price: 40000,
  },
  {
    id: "4",
    category: "패스",
    title: "2026 Hidden Kice 시즌7",
    price: 64800,
    originalPrice: 78000,
    discountRate: 5,
  },
  {
    id: "5",
    category: "단품",
    title: "2026 Hidden Kice 시즌6",
    price: 40000,
  },
  {
    id: "6",
    category: "패스",
    title: "2026 Hidden Kice 시즌7",
    price: 64800,
    originalPrice: 78000,
    discountRate: 5,
  },
  {
    id: "7",
    category: "단품",
    title: "2026 Hidden Kice 시즌7",
    price: 40000,
  },
  {
    id: "8",
    category: "패스",
    title: "2026 Hidden Kice 시즌6",
    price: 64800,
    originalPrice: 78000,
    discountRate: 5,
  },
  {
    id: "9",
    category: "단품",
    title: "2026 Hidden Kice 시즌7",
    price: 40000,
  },
  {
    id: "10",
    category: "패스",
    title: "2026 Hidden Kice 시즌7",
    price: 64800,
    originalPrice: 78000,
    discountRate: 5,
  },
  {
    id: "11",
    category: "단품",
    title: "2026 Hidden Kice 시즌7",
    price: 40000,
  },
  {
    id: "12",
    category: "패스",
    title: "2026 Hidden Kice 시즌7",
    price: 64800,
    originalPrice: 78000,
    discountRate: 5,
  },
];

export function ProductGrid() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ToolbarCategory>("전체");

  const products = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return DUMMY_PRODUCTS.filter((product) => {
      const matchesCategory = isProductCategory(category)
        ? product.category === category
        : true;
      const matchesQuery = keyword
        ? product.title.toLowerCase().includes(keyword)
        : true;

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <section id="products" className="bg-[#f7f7f7]">
      <div className="mx-auto max-w-[1200px] px-6 py-10">
        <ProductToolbar
          query={query}
          onQueryChange={setQuery}
          category={category}
          onCategoryChange={setCategory}
        />

        {products.length === 0 ? (
          <p className="py-20 text-center text-sm text-zinc-500">
            검색 결과가 없습니다.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
