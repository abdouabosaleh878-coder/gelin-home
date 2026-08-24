import type { Coach } from "@/data/coaches";

export function CoachCard({ coach }: { coach: Coach }) {
  return (
    <div className="rounded-2xl border border-aqua-700 bg-aqua-800/60 p-6 text-center">
      <div
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sky-500 text-xl font-display font-semibold text-aqua-950"
        aria-hidden="true"
      >
        {coach.initials}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{coach.name}</h3>
      <p className="text-sm font-medium text-sky-300">{coach.role}</p>
      <p className="mt-3 text-sm text-aqua-200">{coach.bio}</p>
    </div>
  );
}
