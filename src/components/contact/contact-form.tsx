"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormState = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
};

const emptyState: FormState = { name: "", email: "", phone: "", topic: "General inquiry", message: "" };

const topics = ["General inquiry", "Investor relations", "Business inquiry", "Careers", "Media"];

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(emptyState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.email.trim()) nextErrors.email = "Please enter your email.";
    else if (!isValidEmail(form.email)) nextErrors.email = "Enter a valid email address.";
    if (!form.message.trim()) nextErrors.message = "Please enter a message.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    window.setTimeout(() => {
      setStatus("success");
    }, 900);
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-gold-200 bg-gold-50 p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-gold-600" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-semibold text-navy-900">Message sent</h2>
        <p className="mt-2 text-base text-ink-600">
          Thanks, {form.name.split(" ")[0]}. Our team typically responds within one to two
          business days.
        </p>
        <Button
          className="mt-6"
          variant="outline"
          onClick={() => {
            setForm(emptyState);
            setStatus("idle");
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-name">Full name</Label>
          <Input
            id="contact-name"
            autoComplete="name"
            value={form.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            onChange={(event) => setForm((f) => ({ ...f, name: event.target.value }))}
          />
          {errors.name ? (
            <p id="contact-name-error" className="mt-1.5 text-sm text-red-600">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={form.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            onChange={(event) => setForm((f) => ({ ...f, email: event.target.value }))}
          />
          {errors.email ? (
            <p id="contact-email-error" className="mt-1.5 text-sm text-red-600">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-phone">Phone (optional)</Label>
          <Input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => setForm((f) => ({ ...f, phone: event.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="contact-topic">Topic</Label>
          <select
            id="contact-topic"
            value={form.topic}
            onChange={(event) => setForm((f) => ({ ...f, topic: event.target.value }))}
            className="flex h-12 w-full rounded-md border border-navy-200 bg-white px-4 text-base text-ink-900 focus-visible:border-gold-500 focus-visible:outline-none"
          >
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          value={form.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          onChange={(event) => setForm((f) => ({ ...f, message: event.target.value }))}
        />
        {errors.message ? (
          <p id="contact-message-error" className="mt-1.5 text-sm text-red-600">
            {errors.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
