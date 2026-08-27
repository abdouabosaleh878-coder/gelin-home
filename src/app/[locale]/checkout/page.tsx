import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings";
import { CheckoutPageContent } from "./checkout-page-content";

export const metadata: Metadata = { title: "Checkout" };

export default async function CheckoutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
      <CheckoutPageContent deliveryFee={settings.deliveryFee} freeShippingThreshold={settings.freeShippingThreshold} />
    </div>
  );
}
