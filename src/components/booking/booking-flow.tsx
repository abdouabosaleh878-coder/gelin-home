"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { CalendarCheck, MapPin, Clock, User, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { services, availableTimes } from "@/data/services";
import { clinics } from "@/data/clinics";
import { BookingStepper, type BookingStep } from "@/components/booking/booking-stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const steps: BookingStep[] = [
  { id: "service", label: "Service" },
  { id: "location", label: "Location" },
  { id: "datetime", label: "Date & Time" },
  { id: "details", label: "Your Details" },
  { id: "confirm", label: "Confirmation" },
];

type ContactDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
};

const emptyContact: ContactDetails = { firstName: "", lastName: "", email: "", phone: "", notes: "" };

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  return /^[\d\s()+-]{7,}$/.test(value);
}

export function BookingFlow({
  initialServiceId,
  initialClinicId,
  productLabel,
}: {
  initialServiceId?: string;
  initialClinicId?: string;
  productLabel?: string;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [serviceId, setServiceId] = useState(initialServiceId ?? "");
  const [clinicId, setClinicId] = useState(initialClinicId ?? "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [contact, setContact] = useState<ContactDetails>(emptyContact);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactDetails, string>>>({});
  const [confirmationId] = useState(() => `BLT-${Math.floor(100000 + Math.random() * 900000)}`);

  const selectedService = services.find((s) => s.id === serviceId);
  const selectedClinic = clinics.find((c) => c.id === clinicId);

  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  }, []);

  function goNext() {
    setStepIndex((s) => Math.min(s + 1, steps.length - 1));
  }
  function goBack() {
    setStepIndex((s) => Math.max(s - 1, 0));
  }

  function validateContact(): boolean {
    const nextErrors: Partial<Record<keyof ContactDetails, string>> = {};
    if (!contact.firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!contact.lastName.trim()) nextErrors.lastName = "Last name is required.";
    if (!contact.email.trim()) nextErrors.email = "Email is required.";
    else if (!isValidEmail(contact.email)) nextErrors.email = "Enter a valid email address.";
    if (!contact.phone.trim()) nextErrors.phone = "Phone number is required.";
    else if (!isValidPhone(contact.phone)) nextErrors.phone = "Enter a valid phone number.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleContactSubmit(event: FormEvent) {
    event.preventDefault();
    if (validateContact()) goNext();
  }

  const canProceedService = Boolean(serviceId);
  const canProceedLocation = Boolean(clinicId);
  const canProceedDatetime = Boolean(date && time);

  return (
    <div>
      <BookingStepper steps={steps} currentIndex={stepIndex} />

      <div className="mt-10 rounded-2xl border border-navy-100 bg-white p-6 sm:p-10">
        {productLabel && stepIndex === 0 ? (
          <p className="mb-6 rounded-lg bg-teal-50 px-4 py-3 text-sm font-medium text-teal-800">
            Booking related to: {productLabel}
          </p>
        ) : null}

        {stepIndex === 0 ? (
          <fieldset>
            <legend className="text-2xl font-semibold text-navy-900">What can we help you with?</legend>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {services.map((service) => {
                const selected = serviceId === service.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setServiceId(service.id)}
                    aria-pressed={selected}
                    className={cn(
                      "flex items-start gap-4 rounded-xl border-2 p-5 text-left transition-colors",
                      selected
                        ? "border-teal-600 bg-teal-50"
                        : "border-navy-200 bg-white hover:border-teal-400 hover:bg-teal-50/40"
                    )}
                  >
                    <service.icon className="mt-0.5 h-6 w-6 shrink-0 text-teal-600" aria-hidden="true" />
                    <span>
                      <span className="block text-lg font-semibold text-navy-900">{service.name}</span>
                      <span className="mt-1 block text-sm text-ink-500">{service.description}</span>
                      <span className="mt-1 block text-xs font-medium text-ink-400">{service.duration}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        ) : null}

        {stepIndex === 1 ? (
          <fieldset>
            <legend className="text-2xl font-semibold text-navy-900">Choose a clinic location</legend>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {clinics.map((clinic) => {
                const selected = clinicId === clinic.id;
                return (
                  <button
                    key={clinic.id}
                    type="button"
                    onClick={() => setClinicId(clinic.id)}
                    aria-pressed={selected}
                    className={cn(
                      "flex items-start gap-3 rounded-xl border-2 p-5 text-left transition-colors",
                      selected
                        ? "border-teal-600 bg-teal-50"
                        : "border-navy-200 bg-white hover:border-teal-400 hover:bg-teal-50/40"
                    )}
                  >
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
                    <span>
                      <span className="block text-base font-semibold text-navy-900">{clinic.name}</span>
                      <span className="mt-1 block text-sm text-ink-500">{clinic.address}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        ) : null}

        {stepIndex === 2 ? (
          <div>
            <h2 className="text-2xl font-semibold text-navy-900">Pick a date and time</h2>
            <div className="mt-6 max-w-xs">
              <Label htmlFor="booking-date">Preferred date</Label>
              <Input
                id="booking-date"
                type="date"
                min={minDate}
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>

            <fieldset className="mt-6">
              <legend className="text-sm font-semibold text-navy-800">Available times</legend>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {availableTimes.map((slot) => {
                  const selected = time === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      aria-pressed={selected}
                      className={cn(
                        "rounded-lg border-2 px-3 py-2.5 text-sm font-medium transition-colors",
                        selected
                          ? "border-teal-600 bg-teal-50 text-teal-900"
                          : "border-navy-200 bg-white text-navy-700 hover:border-teal-400"
                      )}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>
        ) : null}

        {stepIndex === 3 ? (
          <form onSubmit={handleContactSubmit} noValidate>
            <h2 className="text-2xl font-semibold text-navy-900">Your contact details</h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  autoComplete="given-name"
                  value={contact.firstName}
                  aria-invalid={Boolean(errors.firstName)}
                  aria-describedby={errors.firstName ? "firstName-error" : undefined}
                  onChange={(event) => setContact((c) => ({ ...c, firstName: event.target.value }))}
                />
                {errors.firstName ? (
                  <p id="firstName-error" className="mt-1.5 text-sm text-red-600">
                    {errors.firstName}
                  </p>
                ) : null}
              </div>
              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  autoComplete="family-name"
                  value={contact.lastName}
                  aria-invalid={Boolean(errors.lastName)}
                  aria-describedby={errors.lastName ? "lastName-error" : undefined}
                  onChange={(event) => setContact((c) => ({ ...c, lastName: event.target.value }))}
                />
                {errors.lastName ? (
                  <p id="lastName-error" className="mt-1.5 text-sm text-red-600">
                    {errors.lastName}
                  </p>
                ) : null}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={contact.email}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  onChange={(event) => setContact((c) => ({ ...c, email: event.target.value }))}
                />
                {errors.email ? (
                  <p id="email-error" className="mt-1.5 text-sm text-red-600">
                    {errors.email}
                  </p>
                ) : null}
              </div>
              <div>
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  value={contact.phone}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  onChange={(event) => setContact((c) => ({ ...c, phone: event.target.value }))}
                />
                {errors.phone ? (
                  <p id="phone-error" className="mt-1.5 text-sm text-red-600">
                    {errors.phone}
                  </p>
                ) : null}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="notes">Anything we should know? (optional)</Label>
                <Textarea
                  id="notes"
                  value={contact.notes}
                  onChange={(event) => setContact((c) => ({ ...c, notes: event.target.value }))}
                  placeholder="E.g. accessibility needs, best time to reach you, questions for your provider"
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <Button type="button" variant="ghost" onClick={goBack}>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back
              </Button>
              <Button type="submit">
                Review &amp; Confirm
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </form>
        ) : null}

        {stepIndex === 4 ? (
          <div className="text-center" role="status">
            <CheckCircle2 className="mx-auto h-14 w-14 text-teal-600" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-semibold text-navy-900">You&apos;re all set, {contact.firstName}!</h2>
            <p className="mt-2 text-lg text-ink-600">
              Your appointment request has been received. Confirmation number{" "}
              <span className="font-semibold text-navy-900">{confirmationId}</span>.
            </p>

            <dl className="mx-auto mt-8 max-w-md space-y-4 rounded-xl border border-navy-100 bg-sand-50 p-6 text-left">
              <div className="flex items-start gap-3">
                <User className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
                <div>
                  <dt className="text-sm text-ink-400">Service</dt>
                  <dd className="text-base font-medium text-navy-900">{selectedService?.name}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
                <div>
                  <dt className="text-sm text-ink-400">Location</dt>
                  <dd className="text-base font-medium text-navy-900">{selectedClinic?.name}</dd>
                  <dd className="text-sm text-ink-500">{selectedClinic?.address}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
                <div>
                  <dt className="text-sm text-ink-400">Date &amp; Time</dt>
                  <dd className="text-base font-medium text-navy-900">
                    {date ? new Date(`${date}T00:00:00`).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }) : ""}{" "}
                    at {time}
                  </dd>
                </div>
              </div>
            </dl>

            <p className="mt-6 text-sm text-ink-500">
              We&apos;ve sent a confirmation to {contact.email}. A team member may call{" "}
              {contact.phone} to confirm details.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/">Return to Home</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/hearing-health">Explore Hearing Health</Link>
              </Button>
            </div>
          </div>
        ) : null}

        {stepIndex < 3 ? (
          <div className="mt-8 flex items-center justify-between border-t border-navy-100 pt-6">
            <Button type="button" variant="ghost" onClick={goBack} disabled={stepIndex === 0}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </Button>
            <Button
              type="button"
              onClick={goNext}
              disabled={
                (stepIndex === 0 && !canProceedService) ||
                (stepIndex === 1 && !canProceedLocation) ||
                (stepIndex === 2 && !canProceedDatetime)
              }
            >
              Continue
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        ) : null}
      </div>

      {stepIndex < 4 ? (
        <p className="mt-4 flex items-center gap-2 text-sm text-ink-500">
          <CalendarCheck className="h-4 w-4" aria-hidden="true" />
          You can change your appointment details anytime before confirming.
        </p>
      ) : null}
    </div>
  );
}
