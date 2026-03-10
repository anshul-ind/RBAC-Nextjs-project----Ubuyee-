import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <header className="border-b p-4">Admin TopBar</header>
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className="border-r p-4 hidden lg:block">Left Sidebar</aside>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
