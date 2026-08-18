import type { Leader } from "@/data/leadership";

export function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <div className="rounded-2xl border border-navy-700 bg-navy-800/60 p-6 text-center">
      <div
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold-500 text-xl font-display font-semibold text-navy-950"
        aria-hidden="true"
      >
        {leader.initials}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{leader.name}</h3>
      <p className="text-sm font-medium text-gold-300">{leader.role}</p>
      <p className="mt-3 text-sm text-navy-200">{leader.bio}</p>
    </div>
  );
}
