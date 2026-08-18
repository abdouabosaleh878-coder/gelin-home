import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { BookingFlow } from "@/components/booking/booking-flow";
import { getProductBySlug } from "@/data/products";
import { getClinicById } from "@/data/clinics";

export const metadata: Metadata = {
  title: "Book an Appointment | Free Hearing Assessment",
  description:
    "Schedule your free Beltone hearing assessment in a few simple steps. Choose your service, clinic, and preferred time.",
  alternates: { canonical: "/book-appointment" },
};

export default async function BookAppointmentPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; clinic?: string }>;
}) {
  const params = await searchParams;
  const product = params.product ? getProductBySlug(params.product) : undefined;
  const clinic = params.clinic ? getClinicById(params.clinic) : undefined;

  return (
    <>
      <section className="border-b border-navy-100 bg-navy-50">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Book an Appointment" }]} />
          <div className="mt-6">
            <SectionHeading
              as="h1"
              eyebrow="Book an Appointment"
              title="Schedule your visit"
              description="Choose a service, pick a clinic, and select a time that works for you. It only takes a couple of minutes."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <BookingFlow
          initialServiceId={product ? "hearing-aid-fitting" : undefined}
          initialClinicId={clinic?.id}
          productLabel={product?.name}
        />
      </section>
    </>
  );
}
