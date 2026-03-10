import type { ReactNode } from "react";

export default function VendorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <header className="border-b p-4">Vendor TopBar</header>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]">
        <div className="p-4">{children}</div>
        <aside className="border-l p-4 hidden lg:block">Right Sidebar</aside>
      </div>
    </div>
  );
}
