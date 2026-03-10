import Link from "next/link";

export default function LoginSelectorPage() {
  return (
    <main className="mx-auto max-w-md p-6 space-y-4">
      <h1 className="text-xl font-semibold">Sign in</h1>
      <div className="flex flex-col gap-2">
        <Link className="underline" href="/user/login">
          Continue as User
        </Link>
        <Link className="underline" href="/vendor/login">
          Continue as Vendor
        </Link>
        <Link className="underline" href="/admin/login">
          Continue as Admin
        </Link>
      </div>
    </main>
  );
}
