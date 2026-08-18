import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { ClinicSearch } from "@/components/shared/clinic-search";

export const metadata: Metadata = {
  title: "Find a Hearing Care Clinic Near You",
  description:
    "Search 1,500+ Beltone hearing care clinics by city or state. View hours, services, phone numbers, and book an appointment online.",
  alternates: { canonical: "/find-a-clinic" },
};

export default function FindClinicPage() {
  return (
    <>
      <section className="border-b border-navy-100 bg-navy-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Find a Clinic" }]} />
          <div className="mt-6 max-w-2xl">
            <SectionHeading
              as="h1"
              eyebrow="Find a Clinic"
              title="Hearing care near you"
              description="Beltone has 1,500+ clinics nationwide. Search by city or state to find hours, services, and directions for your nearest location."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <ClinicSearch />
      </section>
    </>
  );
}
