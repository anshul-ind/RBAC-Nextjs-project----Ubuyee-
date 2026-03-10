type StatsCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
};

export function StatsCard({ title, value, subtitle }: StatsCardProps) {
  return (
    <section className="rounded-lg border p-4">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {subtitle ? <div className="text-sm text-muted-foreground">{subtitle}</div> : null}
    </section>
  );
}
