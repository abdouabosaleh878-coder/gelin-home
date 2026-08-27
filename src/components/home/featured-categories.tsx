import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { translate } from "@/i18n/translate";

type Category = { name: string; slug: string; image: string | null };

export async function FeaturedCategories({
  locale,
  categories,
}: {
  locale: Locale;
  categories: Category[];
}) {
  const dict = await getDictionary(locale);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl text-navy-900 md:text-4xl">
          {translate(dict, "home.featuredCategories")}
        </h2>
        <p className="mt-3 text-ink-500">{translate(dict, "home.featuredCategoriesSub")}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/${locale}/category/${category.slug}`}
            className="img-zoom group relative block aspect-[3/4] overflow-hidden rounded-lg bg-slate-100"
          >
            <Image
              src={category.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"}
              alt={category.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
            <span className="absolute bottom-4 start-4 font-display text-lg text-white md:text-xl">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
