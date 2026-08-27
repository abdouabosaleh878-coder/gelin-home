"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** Guards against SSR/CSR hydration mismatches for state hydrated from
 * localStorage (cart, wishlist, recently-viewed counts). */
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
