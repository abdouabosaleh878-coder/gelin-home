"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useI18n } from "@/i18n/provider";
import { subscribeNewsletter } from "@/actions/newsletter";
import { localize } from "@/lib/localize";
import { Button } from "@/components/ui/button";

const initialState = { ok: false } as { ok: boolean; error?: string };

export function Newsletter({
  titleEn,
  titleAr,
  subtitleEn,
  subtitleAr,
}: {
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
}) {
  const { t, locale } = useI18n();
  const [state, formAction, pending] = useActionState(subscribeNewsletter, initialState);

  useEffect(() => {
    if (state.ok) toast.success(t("home.newsletterSuccess"));
    else if (state.error) toast.error(state.error === "invalid_email" ? "Please enter a valid email." : "Something went wrong.");
  }, [state, t]);

  return (
    <section className="bg-navy-900 py-16 md:py-20">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-display text-2xl text-white md:text-3xl">
          {localize(titleEn, titleAr, locale)}
        </h2>
        <p className="mt-3 text-slate-300">{localize(subtitleEn, subtitleAr, locale)}</p>
        <form action={formAction} className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <input
            type="email"
            name="email"
            required
            placeholder={t("home.newsletterPlaceholder")}
            className="h-12 w-full max-w-sm rounded-md border border-navy-700 bg-navy-800 px-4 text-sm text-white placeholder:text-slate-400 focus-visible:border-gold-400 focus-visible:outline-none"
          />
          <Button type="submit" disabled={pending} className="h-12 shrink-0">
            {t("home.newsletterButton")}
          </Button>
        </form>
      </div>
    </section>
  );
}
