import Link from "next/link";
import type { Product } from "../types";

function formatPrice(value: number) {
  return `${value.toLocaleString("ko-KR")}원`;
}

export function ProductCard({ product }: { product: Product }) {
  const hasDiscount =
    product.originalPrice != null && product.discountRate != null;

  return (
    <article>
      <Link href={`/store/${product.id}`} className="block">
        <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-md border border-[#E9EAEC] bg-white text-sm text-zinc-400">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="h-full w-full object-contain"
            />
          ) : (
            `${product.category} 이미지`
          )}
        </div>
        <p className="mt-2 font-['Pretendard'] text-[16px] leading-[1.6] font-semibold text-[#979CA5]">
          {product.category}
        </p>
        <h2 className="font-['Pretendard'] text-[16px] leading-[1.6] font-semibold">
          {product.title}
        </h2>
        {hasDiscount ? (
          <div className="mt-2 font-['Pretendard']">
            <p className="text-[14px] font-medium text-[#B2B6BD] line-through">
              {formatPrice(product.originalPrice!)}
            </p>
            <p className="text-[16px] leading-[1.6] font-semibold">
              <span className="mr-2 text-[#FA622F]">{product.discountRate}%</span>
              <span>{formatPrice(product.price)}</span>
            </p>
          </div>
        ) : (
          <p className="mt-2 font-['Pretendard'] text-[16px] leading-[1.6] font-semibold">
            {formatPrice(product.price)}
          </p>
        )}
      </Link>
    </article>
  );
}
