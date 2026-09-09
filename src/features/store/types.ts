export type ProductCategory = "패스" | "단품";

export type Product = {
  id: string;
  category: ProductCategory;
  title: string;
  price: number;
  originalPrice?: number;
  discountRate?: number;
};
