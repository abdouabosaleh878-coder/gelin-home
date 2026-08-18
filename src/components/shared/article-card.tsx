import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { Article } from "@/data/articles";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden hover:shadow-lg hover:-translate-y-1">
      <Link
        href={`/hearing-health/${article.slug}`}
        className={`relative block overflow-hidden bg-navy-50 ${featured ? "aspect-[16/9]" : "aspect-[4/3]"}`}
      >
        <Image
          src={article.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <Badge variant="teal" className="w-fit">
          {article.category}
        </Badge>
        <h3 className={`mt-3 font-semibold text-navy-900 ${featured ? "text-2xl" : "text-lg"}`}>
          <Link href={`/hearing-health/${article.slug}`} className="hover:text-teal-700">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-base text-ink-500">{article.excerpt}</p>
        <div className="mt-4 flex items-center gap-2 text-sm text-ink-400">
          <Clock className="h-4 w-4" aria-hidden="true" />
          <span>{article.readingTime}</span>
        </div>
      </div>
    </Card>
  );
}
