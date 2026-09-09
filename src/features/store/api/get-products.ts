import type { Product } from "../types";

const DUMMY_PRODUCTS: Product[] = [
  {
    id: "1",
    category: "단품",
    title: "2026 Hidden Kice 시즌7",
    price: 40000,
  },
  {
    id: "2",
    category: "패스",
    title: "2026 Hidden Kice 시즌7",
    price: 64800,
    originalPrice: 78000,
    discountRate: 5,
  },
  {
    id: "3",
    category: "단품",
    title: "2026 Hidden Kice 시즌7",
    price: 40000,
  },
  {
    id: "4",
    category: "패스",
    title: "2026 Hidden Kice 시즌7",
    price: 64800,
    originalPrice: 78000,
    discountRate: 5,
  },
  {
    id: "5",
    category: "단품",
    title: "2026 Hidden Kice 시즌6",
    price: 40000,
  },
  {
    id: "6",
    category: "패스",
    title: "2026 Hidden Kice 시즌7",
    price: 64800,
    originalPrice: 78000,
    discountRate: 5,
  },
  {
    id: "7",
    category: "단품",
    title: "2026 Hidden Kice 시즌7",
    price: 40000,
  },
  {
    id: "8",
    category: "패스",
    title: "2026 Hidden Kice 시즌6",
    price: 64800,
    originalPrice: 78000,
    discountRate: 5,
  },
  {
    id: "9",
    category: "단품",
    title: "2026 Hidden Kice 시즌7",
    price: 40000,
  },
  {
    id: "10",
    category: "패스",
    title: "2026 Hidden Kice 시즌7",
    price: 64800,
    originalPrice: 78000,
    discountRate: 5,
  },
  {
    id: "11",
    category: "단품",
    title: "2026 Hidden Kice 시즌7",
    price: 40000,
  },
  {
    id: "12",
    category: "패스",
    title: "2026 Hidden Kice 시즌7",
    price: 64800,
    originalPrice: 78000,
    discountRate: 5,
  },
];

export async function getProducts(): Promise<Product[]> {
  return DUMMY_PRODUCTS;
}
