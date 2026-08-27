"use client";

import { useActionState, useState } from "react";
import { Star } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { createReview } from "@/actions/reviews";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Review = { id: string; customerName: string; rating: number; comment: string; createdAt: string };

function Stars({ value, size = "h-4 w-4" }: { value: number; size?: string }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={cn(size, i <= value ? "fill-gold-500 text-gold-500" : "text-navy-200")} />
      ))}
    </div>
  );
}

export function ReviewsSection({
  productId,
  productSlug,
  reviews,
}: {
  productId: string;
  productSlug: string;
  reviews: Review[];
}) {
  const { t, locale } = useI18n();
  const [state, formAction, pending] = useActionState(createReview, {});
  const [rating, setRating] = useState(5);

  const avg = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <div className="flex items-center gap-3">
          <h2 className="font-display text-2xl text-navy-900">{t("product.reviews")}</h2>
          {reviews.length > 0 && (
            <span className="flex items-center gap-1.5 text-sm text-ink-500">
              <Stars value={Math.round(avg)} /> {avg.toFixed(1)} ({reviews.length})
            </span>
          )}
        </div>

        {reviews.length === 0 ? (
          <p className="mt-4 text-sm text-ink-500">{t("product.noReviews")}</p>
        ) : (
          <div className="mt-6 space-y-6">
            {reviews.map((r) => (
              <div key={r.id} className="border-b border-navy-100 pb-5">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-navy-900">{r.customerName}</p>
                  <span className="text-xs text-ink-400">{formatDate(r.createdAt, locale)}</span>
                </div>
                <Stars value={r.rating} />
                <p className="mt-2 text-sm text-ink-700">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-navy-100 bg-white p-6 h-fit">
        <h3 className="font-display text-lg text-navy-900">{t("product.writeReview")}</h3>
        {state.success ? (
          <p className="mt-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">Thank you for your review!</p>
        ) : (
          <form action={formAction} className="mt-4 space-y-4">
            <input type="hidden" name="productId" value={productId} />
            <input type="hidden" name="productSlug" value={productSlug} />
            <input type="hidden" name="rating" value={rating} />
            <div>
              <p className="mb-1.5 text-sm font-medium text-navy-800">{t("product.rating")}</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button type="button" key={i} onClick={() => setRating(i)}>
                    <Star className={cn("h-6 w-6", i <= rating ? "fill-gold-500 text-gold-500" : "text-navy-200")} />
                  </button>
                ))}
              </div>
            </div>
            <Input name="customerName" placeholder={t("product.yourName")} required />
            <Textarea name="comment" placeholder={t("product.yourReview")} rows={4} required />
            {state.error && <p className="text-sm text-sale-600">{state.error}</p>}
            <Button type="submit" disabled={pending} className="w-full">
              {pending ? "..." : t("product.submitReview")}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
