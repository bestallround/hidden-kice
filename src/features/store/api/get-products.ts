import { getSupabaseClient } from "@/lib/supabase/client";
import type { Product, ProductCategory } from "../types";

type ProductRow = {
  id: string;
  category: string;
  title: string;
  price: number;
  original_price: number | null;
  discount_rate: number | null;
  image_url: string | null;
};

function isProductCategory(value: string): value is ProductCategory {
  return value === "패스" || value === "단품";
}

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    category: isProductCategory(row.category) ? row.category : "단품",
    title: row.title,
    price: row.price,
    originalPrice: row.original_price ?? undefined,
    discountRate: row.discount_rate ?? undefined,
    imageUrl: row.image_url ?? undefined,
  };
}

export async function getProducts(): Promise<Product[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, category, title, price, original_price, discount_rate, image_url",
    )
    .order("title");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(toProduct);
}
