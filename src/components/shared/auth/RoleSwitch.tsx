import Link from "next/link";

export function RoleSwitch({ href, label }: { href: string; label: string }) {
  return (
    <div className="text-sm">
      <Link className="underline" href={href}>
        {label}
      </Link>
    </div>
  );
}
