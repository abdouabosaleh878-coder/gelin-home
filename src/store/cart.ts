"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
  stock: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clear: () => void;
};

export function lineKey(item: Pick<CartItem, "productId" | "size" | "color">) {
  return `${item.productId}::${item.size ?? ""}::${item.color ?? ""}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      addItem: (item, quantity = 1) => {
        const key = lineKey(item);
        const existing = get().items.find((i) => lineKey(i) === key);
        if (existing) {
          const nextQty = Math.min(existing.quantity + quantity, existing.stock || 99);
          set({
            items: get().items.map((i) =>
              lineKey(i) === key ? { ...i, quantity: nextQty } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity }] });
        }
        set({ isOpen: true });
      },
      removeItem: (key) => set({ items: get().items.filter((i) => lineKey(i) !== key) }),
      updateQuantity: (key, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => lineKey(i) !== key) });
          return;
        }
        set({
          items: get().items.map((i) =>
            lineKey(i) === key ? { ...i, quantity: Math.min(quantity, i.stock || 99) } : i
          ),
        });
      },
      clear: () => set({ items: [] }),
    }),
    { name: "gelin-cart", partialize: (state) => ({ items: state.items }) }
  )
);

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}
