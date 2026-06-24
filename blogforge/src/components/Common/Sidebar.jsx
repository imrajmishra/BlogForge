"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clapperboard, User, Settings } from "lucide-react";

const navItems = [
  { index: "01", name: "Feed", href: "/", icon: Home },
  { index: "02", name: "Reels", href: "/reels", icon: Clapperboard },
  { index: "03", name: "Profile", href: "/profile/me", icon: User },
  { index: "04", name: "Settings", href: "/settings", icon: Settings },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-neutral-200/50 bg-white/70 px-4 py-2 backdrop-blur-md dark:border-white/10 dark:bg-black/50 sm:left-6 sm:top-1/2 sm:-translate-y-1/2 sm:bottom-auto sm:translate-x-0 sm:flex-col sm:py-4 sm:px-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.index}
            href={item.href}
            className={`group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
              isActive
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-black dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4" strokeWidth={isActive ? 2 : 2} />

            

            {/* Optional: Tiny active dot indicator */}
            {isActive && (
              <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-black dark:bg-white sm:hidden" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Sidebar;
