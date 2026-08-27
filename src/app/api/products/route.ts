import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { isLocale, defaultLocale } from "@/i18n/config";
import { toCardData } from "@/lib/products";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const idsParam = searchParams.get("ids");
  const localeParam = searchParams.get("locale") || defaultLocale;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;

  if (!idsParam) {
    return NextResponse.json({ products: [] });
  }

  const ids = idsParam.split(",").filter(Boolean);
  const products = await prisma.product.findMany({
    where: { id: { in: ids }, active: true },
    include: { images: true, category: true },
  });

  const ordered = ids
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return NextResponse.json({ products: ordered.map((p) => toCardData(p, locale)) });
}
