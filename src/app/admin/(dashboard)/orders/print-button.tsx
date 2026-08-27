"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print flex items-center gap-2 rounded-md border border-navy-200 bg-white px-4 py-2.5 text-sm font-medium text-navy-900 hover:bg-navy-50"
    >
      <Printer className="h-4 w-4" /> Print
    </button>
  );
}
