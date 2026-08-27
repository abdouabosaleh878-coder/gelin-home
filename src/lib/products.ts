import type { Product, ProductImage, Category } from "@prisma/client";

export type ProductWithRelations = Product & {
  images: ProductImage[];
  category: Category;
};

export type ParsedColor = { name: string; hex: string };

export type ParsedProduct = ProductWithRelations & {
  sizeList: string[];
  colorList: ParsedColor[];
  imageUrls: string[];
  primaryImage: string;
};

export function parseProduct<T extends ProductWithRelations>(product: T): T & {
  sizeList: string[];
  colorList: ParsedColor[];
  imageUrls: string[];
  primaryImage: string;
} {
  let sizeList: string[] = [];
  let colorList: ParsedColor[] = [];
  try {
    sizeList = JSON.parse(product.sizes || "[]");
  } catch {
    sizeList = [];
  }
  try {
    colorList = JSON.parse(product.colors || "[]");
  } catch {
    colorList = [];
  }
  const sortedImages = [...product.images].sort((a, b) => a.sortOrder - b.sortOrder);
  const imageUrls = sortedImages.map((i) => i.url);
  const primaryImage = imageUrls[0] || "/placeholder-product.svg";

  return { ...product, sizeList, colorList, imageUrls, primaryImage };
}

export function effectivePrice(product: Pick<Product, "price" | "salePrice">) {
  return product.salePrice && product.salePrice > 0 && product.salePrice < product.price
    ? product.salePrice
    : product.price;
}

export function discountPercent(product: Pick<Product, "price" | "salePrice">) {
  if (!product.salePrice || product.salePrice >= product.price) return 0;
  return Math.round(((product.price - product.salePrice) / product.price) * 100);
}

import { localize } from "./localize";
import type { Locale } from "@/i18n/config";
import type { ProductCardData } from "@/components/product/product-card";

export function toCardData(product: ProductWithRelations, locale: Locale): ProductCardData {
  const parsed = parseProduct(product);
  return {
    id: product.id,
    slug: product.slug,
    name: localize(product.name, product.nameAr, locale),
    categoryName: localize(product.category.name, product.category.nameAr, locale),
    price: product.price,
    salePrice: product.salePrice,
    stock: product.stock,
    image: parsed.primaryImage,
    images: parsed.imageUrls,
    featured: product.featured,
    bestseller: product.bestseller,
    newArrival: product.newArrival,
    onSale: product.onSale,
    shortDescription: localize(
      product.shortDescription || "",
      product.shortDescriptionAr,
      locale
    ) || null,
  };
}
