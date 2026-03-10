import Link from "next/link";

export function LeftSidebar() {
  return (
    <aside className="space-y-2">
      <div className="text-sm font-medium">Navigation</div>
      <div className="flex flex-col gap-1 text-sm">
        <Link className="underline" href="/admin">
          Admin Home
        </Link>
        <Link className="underline" href="/admin/dashboard">
          Admin Dashboard
        </Link>
      </div>
    </aside>
  );
}
