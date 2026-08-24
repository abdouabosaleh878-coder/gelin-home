type Stat = { label: string; value: string };

export function TrustIndicators({ items, className }: { items: Stat[]; className?: string }) {
  return (
    <dl className={`grid grid-cols-2 gap-8 sm:grid-cols-4 ${className ?? ""}`}>
      {items.map((stat) => (
        <div key={stat.label} className="flex flex-col text-center sm:text-left">
          <dd className="text-3xl sm:text-4xl font-display font-semibold text-aqua-900">
            {stat.value}
          </dd>
          <dt className="mt-1 text-sm text-ink-400">{stat.label}</dt>
        </div>
      ))}
    </dl>
  );
}
