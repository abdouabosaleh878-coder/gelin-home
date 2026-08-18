"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { articles, articleCategories, type ArticleCategory } from "@/data/articles";
import { ArticleCard } from "@/components/shared/article-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function ArticleExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ArticleCategory | "all">("all");

  const results = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory = category === "all" || article.category === category;
      const matchesQuery =
        !query.trim() ||
        article.title.toLowerCase().includes(query.trim().toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-md flex-1">
          <Label htmlFor="article-search">Search articles</Label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" aria-hidden="true" />
            <Input
              id="article-search"
              type="search"
              placeholder="Search hearing health topics"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="pl-12"
            />
          </div>
        </div>
      </div>

      <div role="group" aria-label="Filter articles by category" className="mt-6 flex flex-wrap gap-3">
        <Button
          type="button"
          size="sm"
          variant={category === "all" ? "secondary" : "outline"}
          aria-pressed={category === "all"}
          onClick={() => setCategory("all")}
          className="rounded-full"
        >
          All Topics
        </Button>
        {articleCategories.map((cat) => (
          <Button
            key={cat}
            type="button"
            size="sm"
            variant={category === cat ? "secondary" : "outline"}
            aria-pressed={category === cat}
            onClick={() => setCategory(cat)}
            className={cn("rounded-full")}
          >
            {cat}
          </Button>
        ))}
      </div>

      <p className="mt-4 text-sm text-ink-500" role="status" aria-live="polite">
        {results.length} article{results.length === 1 ? "" : "s"} found
      </p>

      <div className="mt-6">
        {results.length === 0 ? (
          <div className="rounded-xl border border-dashed border-navy-200 bg-white p-12 text-center">
            <p className="text-lg font-semibold text-navy-900">No articles match your search</p>
            <p className="mt-2 text-ink-500">Try a different keyword or topic.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
