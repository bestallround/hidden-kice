import type { Product } from "../types";

function formatPrice(value: number) {
  return `${value.toLocaleString("ko-KR")}원`;
}

export function ProductCard({ product }: { product: Product }) {
  const hasDiscount =
    product.originalPrice != null && product.discountRate != null;

  return (
    <article>
      <div className="flex aspect-[4/5] items-center justify-center border border-dashed border-zinc-300 bg-white text-sm text-zinc-400">
        {product.category} 이미지
      </div>
      <p className="mt-3 text-sm text-zinc-500">{product.category}</p>
      <h2 className="mt-1 font-semibold">{product.title}</h2>
      {hasDiscount ? (
        <p className="mt-1">
          <span className="mr-2 text-sm text-zinc-400 line-through">
            {formatPrice(product.originalPrice!)}
          </span>
          <span className="mr-2 text-sm text-[#e05a3c]">
            {product.discountRate}%
          </span>
          <span className="font-semibold">{formatPrice(product.price)}</span>
        </p>
      ) : (
        <p className="mt-1 font-semibold">{formatPrice(product.price)}</p>
      )}
    </article>
  );
}
