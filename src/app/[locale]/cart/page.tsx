import type { Metadata } from "next";
import { CartPageContent } from "./cart-page-content";

export const metadata: Metadata = { title: "Your Cart" };

export default function CartPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
      <CartPageContent />
    </div>
  );
}
