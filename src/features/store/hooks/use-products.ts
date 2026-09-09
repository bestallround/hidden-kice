"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/get-products";

export function useProducts() {
  const { data, isPending, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return {
    products: data ?? [],
    isLoading: isPending,
    error,
  };
}
