import Image from "next/image";
import Link from "next/link";
import type { BusinessLine } from "@/data/business-lines";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function BusinessLineCard({ business }: { business: BusinessLine }) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden hover:shadow-lg hover:-translate-y-1">
      <Link
        href={`/businesses/${business.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-navy-50"
      >
        <Image
          src={business.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge variant="navy" className="absolute left-4 top-4 bg-white/95">
          {business.categoryLabel}
        </Badge>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-navy-900">
          <Link href={`/businesses/${business.slug}`} className="hover:text-gold-700">
            {business.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-medium text-gold-700">{business.tagline}</p>
        <p className="mt-3 flex-1 text-base text-ink-500">{business.shortDescription}</p>
        <Button asChild variant="outline" size="sm" className="mt-6">
          <Link href={`/businesses/${business.slug}`}>Learn More</Link>
        </Button>
      </div>
    </Card>
  );
}
