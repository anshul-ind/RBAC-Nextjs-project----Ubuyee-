import type { ReactNode } from "react";

export function ChartWidget({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="rounded-lg border p-4 space-y-3">
      <div className="font-medium">{title}</div>
      <div className="min-h-24">{children}</div>
    </section>
  );
}
