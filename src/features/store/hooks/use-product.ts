"use client";

import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/get-products";

export function useProduct(id: string) {
  const { data, isPending, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: Boolean(id),
  });

  return {
    product: data ?? null,
    isLoading: isPending,
    error,
  };
}
