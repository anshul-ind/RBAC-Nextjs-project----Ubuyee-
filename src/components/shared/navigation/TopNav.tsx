import Link from "next/link";

export function TopNav() {
  return (
    <nav className="flex items-center justify-between gap-4">
      <Link className="font-semibold" href="/">
        App
      </Link>
      <div className="flex items-center gap-3 text-sm">
        <Link className="underline" href="/login">
          Login
        </Link>
        <Link className="underline" href="/signup">
          Signup
        </Link>
      </div>
    </nav>
  );
}
