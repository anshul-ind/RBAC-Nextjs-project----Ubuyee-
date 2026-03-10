import type { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <header className="border-b p-4">User TopNav</header>
      <div className="p-4">{children}</div>
    </div>
  );
}
