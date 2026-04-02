"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderKanban,
  LayoutDashboard,
  GalleryVerticalEnd,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/portfolio", label: "Portfolio", icon: GalleryVerticalEnd },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 border-r bg-background md:block">
      <div className="border-b px-6 py-5">
        <Link
          href="/dashboard"
          className="text-xl font-semibold tracking-tight"
        >
          DroneFlow
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">
          Drone project manager
        </p>
      </div>

      <nav className="space-y-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
