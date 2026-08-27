"use client";

import { useI18n } from "@/i18n/provider";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className="h-7 w-7" aria-hidden="true">
      <path d="M16.02 3C9.4 3 4 8.38 4 15c0 2.32.65 4.48 1.78 6.33L4 29l7.87-1.72A11.9 11.9 0 0 0 16.02 27C22.63 27 28 21.62 28 15S22.63 3 16.02 3Zm0 21.7c-2.02 0-3.9-.58-5.48-1.58l-.39-.24-4.67 1.02 1.05-4.55-.26-.4A9.6 9.6 0 0 1 4.9 15c0-6.13 5-11.1 11.12-11.1S27.14 8.87 27.14 15 22.14 24.7 16.02 24.7Zm5.98-8.15c-.33-.16-1.93-.95-2.23-1.06-.3-.11-.52-.16-.74.16s-.85 1.06-1.04 1.28c-.19.22-.38.24-.71.08-.33-.16-1.38-.51-2.63-1.62-.97-.87-1.63-1.94-1.82-2.27-.19-.33-.02-.5.14-.66.15-.15.33-.38.5-.58.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.58-.08-.16-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.58.08-.88.41-.3.33-1.15 1.12-1.15 2.74s1.18 3.18 1.34 3.4c.16.22 2.32 3.55 5.63 4.98.79.34 1.4.55 1.88.7.79.25 1.51.21 2.08.13.63-.1 1.93-.79 2.2-1.55.27-.77.27-1.42.19-1.56-.08-.14-.3-.22-.63-.38Z" />
    </svg>
  );
}

export function WhatsAppButton({ phone }: { phone: string }) {
  const { t } = useI18n();
  const digits = phone.replace(/[^\d]/g, "");
  const href = `https://wa.me/${digits}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp.chatWithUs")}
      className="fixed bottom-20 md:bottom-6 end-4 md:end-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
    >
      <WhatsAppIcon />
    </a>
  );
}
