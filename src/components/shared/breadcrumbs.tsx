import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = {
  name: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-1.5">
              {index > 0 ? <ChevronRight className="h-3.5 w-3.5 text-ink-400" aria-hidden="true" /> : null}
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-teal-700">
                  {item.name}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="font-medium text-navy-800">
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
