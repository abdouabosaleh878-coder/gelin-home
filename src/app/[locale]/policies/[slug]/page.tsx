import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { prisma } from "@/lib/db";
import { localize } from "@/lib/localize";

const VALID_SLUGS = ["shipping", "returns", "privacy", "terms"] as const;

const FALLBACK_TITLES: Record<string, { en: string; ar: string }> = {
  shipping: { en: "Shipping Policy", ar: "سياسة الشحن" },
  returns: { en: "Returns & Exchange", ar: "الإرجاع والاستبدال" },
  privacy: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  terms: { en: "Terms & Conditions", ar: "الشروط والأحكام" },
};

const FALLBACK_CONTENT: Record<string, { en: string; ar: string }> = {
  shipping: {
    en: "We deliver across Egypt within 2–5 business days. Delivery fees are calculated at checkout based on your governorate and order value.",
    ar: "نقوم بالتوصيل في جميع أنحاء مصر خلال 2-5 أيام عمل. يتم احتساب رسوم التوصيل عند إتمام الطلب حسب المحافظة وقيمة الطلب.",
  },
  returns: {
    en: "If you're not fully satisfied, you may return unused items in their original packaging within 14 days of delivery for an exchange or refund.",
    ar: "إذا لم تكوني راضية تمامًا، يمكنك إرجاع المنتجات غير المستخدمة بعبوتها الأصلية خلال 14 يومًا من الاستلام مقابل استبدال أو استرداد.",
  },
  privacy: {
    en: "We respect your privacy. Your personal information is used solely to process orders and improve your shopping experience, and is never sold to third parties.",
    ar: "نحترم خصوصيتك. تُستخدم بياناتك الشخصية فقط لمعالجة الطلبات وتحسين تجربة التسوق، ولا تُباع لأي طرف ثالث.",
  },
  terms: {
    en: "By using this website and placing an order, you agree to our terms of sale, pricing and delivery policies as described throughout the site.",
    ar: "باستخدام هذا الموقع وإتمام الطلب، فإنك توافق على شروط البيع والتسعير وسياسات التوصيل الموضحة في الموقع.",
  },
};

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/policies/[slug]">): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? (rawLocale as Locale) : "en";
  const record = await prisma.policyPage.findUnique({ where: { slug } });
  const fallback = FALLBACK_TITLES[slug];
  const title = record ? localize(record.titleEn, record.titleAr, locale) : fallback ? localize(fallback.en, fallback.ar, locale) : "Policy";
  return { title };
}

export default async function PolicyPage({ params }: PageProps<"/[locale]/policies/[slug]">) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  if (!VALID_SLUGS.includes(slug as (typeof VALID_SLUGS)[number])) notFound();

  const record = await prisma.policyPage.findUnique({ where: { slug } });
  const fallbackTitle = FALLBACK_TITLES[slug];
  const fallbackContent = FALLBACK_CONTENT[slug];

  const title = record?.titleEn
    ? localize(record.titleEn, record.titleAr, locale)
    : localize(fallbackTitle.en, fallbackTitle.ar, locale);
  const content = record?.contentEn
    ? localize(record.contentEn, record.contentAr, locale)
    : localize(fallbackContent.en, fallbackContent.ar, locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <h1 className="font-display text-3xl text-navy-900">{title}</h1>
      <div className="mt-6 whitespace-pre-line text-ink-700 leading-relaxed">{content}</div>
    </div>
  );
}
