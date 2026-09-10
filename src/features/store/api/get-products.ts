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

const PRODUCT_COLUMNS =
  "id, category, title, price, original_price, discount_rate, image_url";

export async function getProducts(): Promise<Product[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .order("title");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(toProduct);
}

export async function getProduct(id: string): Promise<Product | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? toProduct(data) : null;
}
