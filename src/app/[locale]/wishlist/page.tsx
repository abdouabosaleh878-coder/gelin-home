import type { Metadata } from "next";
import { WishlistPageContent } from "./wishlist-page-content";

export const metadata: Metadata = { title: "Wishlist" };

export default function WishlistPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <WishlistPageContent />
    </div>
  );
}
