"use client";

import { useActionState } from "react";
import { useI18n } from "@/i18n/provider";
import { sendContactMessage } from "@/actions/contact";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const { t } = useI18n();
  const [state, formAction, pending] = useActionState(sendContactMessage, {});

  if (state.success) {
    return <p className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">{t("contact.sentSuccess")}</p>;
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">{t("contact.name")}</Label>
          <Input id="name" name="name" required />
        </div>
        <div>
          <Label htmlFor="email">{t("contact.email")}</Label>
          <Input id="email" name="email" type="email" required />
        </div>
      </div>
      <div>
        <Label htmlFor="phone">{t("contact.phone")}</Label>
        <Input id="phone" name="phone" type="tel" />
      </div>
      <div>
        <Label htmlFor="message">{t("contact.message")}</Label>
        <Textarea id="message" name="message" rows={5} required />
      </div>
      {state.error && <p className="text-sm text-sale-600">{state.error}</p>}
      <Button type="submit" size="lg" disabled={pending}>{pending ? "..." : t("contact.send")}</Button>
    </form>
  );
}
