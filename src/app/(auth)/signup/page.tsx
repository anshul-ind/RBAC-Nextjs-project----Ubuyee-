import Link from "next/link";

export default function SignupSelectorPage() {
  return (
    <main className="mx-auto max-w-md p-6 space-y-4">
      <h1 className="text-xl font-semibold">Create account</h1>
      <div className="flex flex-col gap-2">
        <Link className="underline" href="/user/signup">
          Sign up as User
        </Link>
        <Link className="underline" href="/vendor/signup">
          Sign up as Vendor
        </Link>
        <Link className="underline" href="/admin/signup">
          Sign up as Admin
        </Link>
      </div>
    </main>
  );
}
