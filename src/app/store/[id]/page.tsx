import { ProductDetailPage } from "@/features/store/components/product-detail-page";

export default async function Page({ params }: PageProps<"/store/[id]">) {
  const { id } = await params;

  return <ProductDetailPage productId={id} />;
}
