'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Rss, Film, User, Settings, Sparkles } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  // Hide the navbar on the Reels page for full-screen snapping immersion
  if (pathname === '/reels') return null;

  const navItems = [
    { name: 'Feed', href: '/', icon: Rss },
    { name: 'Reels', href: '/reels', icon: Film },
    { name: 'Profile', href: '/profile/me', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* 1. DESKTOP SIDEBAR (Visible on md+) */}
      <aside className="hidden md:flex flex-col justify-between w-56 h-screen border-r border-zinc-900 bg-zinc-950/20 backdrop-blur-md p-6 sticky top-0 left-0 z-40 select-none">
        <div className="space-y-10">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-2 bg-gradient-to-tr from-violet-600 to-blue-600 rounded-xl shadow-lg shadow-violet-900/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent uppercase group-hover:opacity-85 transition-opacity">
              BLOGFORGE
            </span>
          </Link>

          {/* Vertical Navigation Links */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-3 rounded-xl text-xs font-semibold transition-colors group flex items-center gap-3"
                >
                  <Icon className={`w-4.5 h-4.5 transition-colors duration-200 ${isActive ? 'text-violet-400' : 'text-gray-400 group-hover:text-gray-200'}`} />
                  <span className={`transition-colors duration-200 ${isActive ? 'text-white font-bold' : 'text-gray-400 group-hover:text-gray-200'}`}>
                    {item.name}
                  </span>
                  
                  {/* Sliding Pill Background for Active Link */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-violet-500/10 border border-violet-500/20 rounded-xl -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Technical Footer Logs */}
        <div className="text-[9px] font-mono text-zinc-550 space-y-1 border-t border-zinc-900/50 pt-4">
          <div>SERVER // ONLINE</div>
          <div>CLIENT // SYSTEM.v2.0</div>
        </div>
      </aside>

      {/* 2. MOBILE HEADER (Visible on mobile, hidden on md+) */}
      <header className="md:hidden sticky top-0 z-50 w-full border-b border-zinc-900 bg-black/60 backdrop-blur-xl h-16 flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1.5 bg-gradient-to-tr from-violet-600 to-blue-600 rounded-lg">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-black tracking-wider bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent uppercase">
            BLOGFORGE
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative p-2 rounded-xl text-xs transition-colors group flex items-center gap-1.5"
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-violet-400' : 'text-gray-400 group-hover:text-zinc-200'}`} />
                <span className={`hidden xs:inline ${isActive ? 'text-white font-bold' : 'text-gray-400 group-hover:text-zinc-250'}`}>
                  {item.name}
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackgroundMobile"
                    className="absolute inset-0 bg-violet-500/10 border border-violet-500/20 rounded-xl -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </header>
    </>
  );
}
