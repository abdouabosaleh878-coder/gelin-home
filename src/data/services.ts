import { HeartPulse, Ear, Wrench, RefreshCcw } from "lucide-react";

export type Service = {
  id: string;
  name: string;
  description: string;
  duration: string;
  icon: typeof HeartPulse;
};

export const services: Service[] = [
  {
    id: "hearing-assessment",
    name: "Free Hearing Assessment",
    description: "A comprehensive hearing evaluation with a licensed hearing care provider.",
    duration: "45–60 minutes",
    icon: Ear,
  },
  {
    id: "hearing-aid-fitting",
    name: "Hearing Aid Fitting",
    description: "Custom programming and fitting for a new pair of hearing aids.",
    duration: "60 minutes",
    icon: HeartPulse,
  },
  {
    id: "device-cleaning",
    name: "Device Cleaning & Check",
    description: "Routine cleaning, inspection, and minor adjustments for current hearing aids.",
    duration: "20–30 minutes",
    icon: Wrench,
  },
  {
    id: "follow-up",
    name: "Follow-Up Visit",
    description: "A check-in appointment to fine-tune settings or answer questions.",
    duration: "30 minutes",
    icon: RefreshCcw,
  },
];

export function getServiceById(id: string) {
  return services.find((service) => service.id === id);
}

export const availableTimes = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
];
