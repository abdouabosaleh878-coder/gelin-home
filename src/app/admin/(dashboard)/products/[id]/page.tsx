import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { parseProduct } from "@/lib/products";
import { updateProduct } from "@/actions/products";
import { ProductForm } from "../product-form";

export const metadata: Metadata = { title: "Edit Product" };

export default async function EditProductPage({ params }: PageProps<"/admin/products/[id]">) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id }, include: { images: { orderBy: { sortOrder: "asc" } }, category: true } }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);
  if (!product) notFound();

  const parsed = parseProduct(product);
  const action = updateProduct.bind(null, product.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-navy-900">Edit Product</h1>
        <p className="mt-1 text-sm text-ink-500">{product.name}</p>
      </div>
      <ProductForm
        action={action}
        categories={categories}
        existingImages={product.images.map((i) => ({ id: i.id, url: i.url }))}
        initial={{
          name: product.name,
          nameAr: product.nameAr ?? "",
          slug: product.slug,
          description: product.description,
          descriptionAr: product.descriptionAr ?? "",
          shortDescription: product.shortDescription ?? "",
          shortDescriptionAr: product.shortDescriptionAr ?? "",
          price: product.price,
          salePrice: product.salePrice,
          sku: product.sku,
          stock: product.stock,
          categoryId: product.categoryId,
          material: product.material ?? "",
          dimensions: product.dimensions ?? "",
          sizeList: parsed.sizeList,
          colorList: parsed.colorList,
          featured: product.featured,
          bestseller: product.bestseller,
          newArrival: product.newArrival,
          onSale: product.onSale,
          active: product.active,
        }}
      />
    </div>
  );
}
