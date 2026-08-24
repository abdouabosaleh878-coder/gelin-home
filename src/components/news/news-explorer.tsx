"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { newsArticles, newsCategories, type NewsCategory } from "@/data/news";
import { NewsCard } from "@/components/shared/news-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function NewsExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<NewsCategory | "all">("all");

  const results = useMemo(() => {
    return newsArticles.filter((article) => {
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
      <div className="max-w-md">
        <Label htmlFor="news-search">Search news</Label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" aria-hidden="true" />
          <Input
            id="news-search"
            type="search"
            placeholder="Search announcements and articles"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="pl-12"
          />
        </div>
      </div>

      <div role="group" aria-label="Filter news by category" className="mt-6 flex flex-wrap gap-3">
        <Button
          type="button"
          size="sm"
          variant={category === "all" ? "secondary" : "outline"}
          aria-pressed={category === "all"}
          onClick={() => setCategory("all")}
          className="rounded-full"
        >
          All News
        </Button>
        {newsCategories.map((cat) => (
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
          <div className="rounded-xl border border-dashed border-aqua-200 bg-white p-12 text-center">
            <p className="text-lg font-semibold text-aqua-900">No articles match your search</p>
            <p className="mt-2 text-ink-500">Try a different keyword or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((article) => (
              <NewsCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
