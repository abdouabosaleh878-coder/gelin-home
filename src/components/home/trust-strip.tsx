import { ShieldCheck, Truck, RefreshCw, Sparkles } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { translate } from "@/i18n/translate";

export async function TrustStrip({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const items = [
    { icon: Sparkles, titleKey: "trust.qualityTitle", bodyKey: "trust.qualityBody" },
    { icon: ShieldCheck, titleKey: "trust.secureTitle", bodyKey: "trust.secureBody" },
    { icon: Truck, titleKey: "trust.deliveryTitle", bodyKey: "trust.deliveryBody" },
    { icon: RefreshCw, titleKey: "trust.returnsTitle", bodyKey: "trust.returnsBody" },
  ];

  return (
    <section className="border-y border-navy-100 bg-slate-50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.titleKey} className="flex flex-col items-center text-center gap-2.5">
            <item.icon className="h-6 w-6 text-gold-600" />
            <p className="text-sm font-semibold text-navy-900">{translate(dict, item.titleKey)}</p>
            <p className="text-xs text-ink-500 hidden sm:block">{translate(dict, item.bodyKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
