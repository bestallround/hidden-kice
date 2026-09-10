"use client";

import { useProduct } from "../hooks/use-product";

export function ProductDetailPage({ productId }: { productId: string }) {
  const { product, isLoading } = useProduct(productId);

  return (
    <div className="flex min-h-[60vh] items-center justify-center font-['Pretendard'] text-[20px] font-semibold text-zinc-800">
      {isLoading ? null : product?.title}
    </div>
  );
}
