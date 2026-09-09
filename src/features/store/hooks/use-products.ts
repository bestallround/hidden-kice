"use client";

import { useEffect, useState } from "react";
import { getProducts } from "../api/get-products";
import type { Product } from "../types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setError(null);

    getProducts()
      .then((data) => {
        if (!cancelled) {
          setProducts(data);
        }
      })
      .catch((reason: unknown) => {
        if (!cancelled) {
          setError(
            reason instanceof Error
              ? reason
              : new Error("상품을 불러오지 못했습니다."),
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, isLoading, error };
}
