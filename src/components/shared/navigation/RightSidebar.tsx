import Link from "next/link";

export function RightSidebar() {
  return (
    <aside className="space-y-2">
      <div className="text-sm font-medium">Vendor</div>
      <div className="flex flex-col gap-1 text-sm">
        <Link className="underline" href="/vendor">
          Vendor Home
        </Link>
        <Link className="underline" href="/vendor/dashboard">
          Vendor Dashboard
        </Link>
      </div>
    </aside>
  );
}
