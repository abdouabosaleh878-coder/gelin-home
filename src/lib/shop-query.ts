import type { Prisma } from "@prisma/client";
import { prisma } from "./db";

export type ShopSearchParams = {
  q?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  page?: string;
  sale?: string;
  inStock?: string;
};

const PAGE_SIZE = 12;

export async function queryShopProducts(params: ShopSearchParams, forcedCategorySlug?: string) {
  const page = Math.max(1, Number(params.page) || 1);
  const categorySlug = forcedCategorySlug || params.category;

  const where: Prisma.ProductWhereInput = { active: true };

  if (categorySlug) {
    where.category = { slug: categorySlug };
  }
  if (params.q) {
    where.OR = [
      { name: { contains: params.q } },
      { nameAr: { contains: params.q } },
      { description: { contains: params.q } },
    ];
  }
  if (params.minPrice || params.maxPrice) {
    where.price = {
      ...(params.minPrice ? { gte: Number(params.minPrice) } : {}),
      ...(params.maxPrice ? { lte: Number(params.maxPrice) } : {}),
    };
  }
  if (params.sale === "1") {
    where.onSale = true;
  }
  if (params.inStock === "1") {
    where.stock = { gt: 0 };
  }

  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
  switch (params.sort) {
    case "price-asc":
      orderBy = { price: "asc" };
      break;
    case "price-desc":
      orderBy = { price: "desc" };
      break;
    case "bestselling":
      orderBy = [{ bestseller: "desc" }, { createdAt: "desc" }] as unknown as Prisma.ProductOrderByWithRelationInput;
      break;
    case "newest":
    default:
      orderBy = { createdAt: "desc" };
  }

  const [products, total, priceRange] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { images: true, category: true },
      orderBy,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.product.count({ where }),
    prisma.product.aggregate({ _min: { price: true }, _max: { price: true }, where: { active: true } }),
  ]);

  return {
    products,
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
    minPrice: priceRange._min.price ?? 0,
    maxPrice: priceRange._max.price ?? 0,
  };
}
