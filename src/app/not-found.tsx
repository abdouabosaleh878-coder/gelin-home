import { SearchX } from "lucide-react";
import { CtaButton } from "@/components/shared/cta-button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <SearchX className="h-14 w-14 text-teal-600" aria-hidden="true" />
      <h1 className="mt-6 text-3xl font-semibold text-navy-900 sm:text-4xl">Page not found</h1>
      <p className="mt-3 text-lg text-ink-500">
        We couldn&apos;t find the page you&apos;re looking for. It may have moved, or the link may
        be out of date.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <CtaButton href="/" icon="none" size="lg">
          Return Home
        </CtaButton>
        <CtaButton href="/find-a-clinic" icon="map" size="lg" variant="outline">
          Find a Clinic
        </CtaButton>
      </div>
    </div>
  );
}
