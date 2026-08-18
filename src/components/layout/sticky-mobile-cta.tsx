import Link from "next/link";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-100 bg-white/95 p-3 backdrop-blur sm:hidden">
      <Button asChild size="lg" className="w-full">
        <Link href="/book-appointment">
          <Calendar className="h-5 w-5" aria-hidden="true" />
          Book an Appointment
        </Link>
      </Button>
    </div>
  );
}
