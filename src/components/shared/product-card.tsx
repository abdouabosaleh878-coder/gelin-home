import Image from "next/image";
import Link from "next/link";
import { Bluetooth, BatteryCharging, EyeOff, Smartphone, Ear, Droplets, Bell } from "lucide-react";
import type { Product, ProductFeature } from "@/data/products";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const featureIcons: Record<ProductFeature, React.ComponentType<{ className?: string }>> = {
  "Bluetooth Streaming": Bluetooth,
  "Rechargeable Battery": BatteryCharging,
  "Discreet Fit": EyeOff,
  "Smartphone App Control": Smartphone,
  "Tinnitus Relief": Ear,
  "Made for iPhone & Android": Smartphone,
  "Water Resistant": Droplets,
  "Fall Alert": Bell,
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden hover:shadow-lg hover:-translate-y-1">
      <Link
        href={`/hearing-aids/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-navy-50"
      >
        <Image
          src={product.image}
          alt={`${product.name} hearing aid, ${product.categoryLabel.toLowerCase()} style`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge variant="navy" className="absolute left-4 top-4 bg-white/95">
          {product.categoryLabel}
        </Badge>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-navy-900">
          <Link href={`/hearing-aids/${product.slug}`} className="hover:text-teal-700">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-medium text-teal-700">{product.tagline}</p>
        <p className="mt-3 text-base text-ink-500">{product.shortDescription}</p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${product.name} key features`}>
          {product.features.slice(0, 3).map((feature) => {
            const Icon = featureIcons[feature];
            return (
              <li key={feature}>
                <Badge variant="sand" className="text-xs">
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {feature}
                </Badge>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex flex-1 items-end gap-3">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link href={`/hearing-aids/${product.slug}`}>Learn More</Link>
          </Button>
          <Button asChild size="sm" className="flex-1">
            <Link href={`/book-appointment?product=${product.slug}`}>Book Appointment</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
