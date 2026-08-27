"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_ITEMS = 8;

type RecentlyViewedState = {
  ids: string[];
  add: (id: string) => void;
};

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      ids: [],
      add: (id) => {
        const ids = get().ids.filter((i) => i !== id);
        set({ ids: [id, ...ids].slice(0, MAX_ITEMS) });
      },
    }),
    { name: "gelin-recently-viewed" }
  )
);
