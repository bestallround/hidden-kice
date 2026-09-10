"use client";

import { useMemo, useState } from "react";
import { useProducts } from "../hooks/use-products";
import { ProductCard } from "./product-card";
import {
  isProductCategory,
  ProductToolbar,
  type ToolbarCategory,
} from "./product-toolbar";

export function ProductGrid() {
  const { products, isLoading, error } = useProducts();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ToolbarCategory>("전체");

  const filteredProducts = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = isProductCategory(category)
        ? product.category === category
        : true;
      const matchesQuery = keyword
        ? product.title.toLowerCase().includes(keyword)
        : true;

      return matchesCategory && matchesQuery;
    });
  }, [category, products, query]);

  return (
    <section id="products" className="bg-[#f7f7f7]">
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <ProductToolbar
          query={query}
          onQueryChange={setQuery}
          category={category}
          onCategoryChange={setCategory}
        />

        {isLoading ? (
          <p className="py-20 text-center text-sm text-zinc-500">
            상품을 불러오는 중...
          </p>
        ) : error ? (
          <p className="py-20 text-center text-sm text-zinc-500">
            상품을 불러오지 못했습니다.
          </p>
        ) : filteredProducts.length === 0 ? (
          <p className="py-20 text-center text-sm text-zinc-500">
            검색 결과가 없습니다.
          </p>
        ) : (
          <div className="mt-9 grid grid-cols-2 gap-8 md:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
