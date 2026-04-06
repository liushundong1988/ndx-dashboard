"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const linkClass = (href: string) =>
  pathname === href
    ? "rounded-full bg-slate-900 px-3 py-1.5 text-sm font-medium text-white"
    : "rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900";

  const mobileLinkClass = (href: string) =>
  pathname === href
    ? "rounded-xl bg-slate-100 px-3 py-2 font-medium text-slate-900"
    : "rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          纳指100观察
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <Link href="/" className={linkClass("/")}>首页</Link>
          <Link href="/constituents" className={linkClass("/constituents")}>成分股</Link>
          <Link href="/etf" className={linkClass("/etf")}>ETF</Link>
          <Link href="/news" className={linkClass("/news")}>资讯</Link>
          <Link href="/about" className={linkClass("/about")}>关于</Link>
        </nav>

        <button
          type="button"
          className="md:hidden flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-900"
          onClick={() => setOpen(!open)}
          aria-label="打开菜单"
        >
          <span className="text-2xl leading-none">≡</span>
        </button>
      </div>


        {open && (
          <div className="md:hidden border-t border-slate-200 bg-white">
           <div className="flex flex-col px-4 py-3 space-y-3 text-sm">
           <Link href="/" className={mobileLinkClass("/")} onClick={() => setOpen(false)}>
            首页
           </Link>
           <Link href="/constituents" className={mobileLinkClass("/constituents")} onClick={() => setOpen(false)}>
            成分股
           </Link>
           <Link href="/etf" className={mobileLinkClass("/etf")} onClick={() => setOpen(false)}>
            ETF
           </Link>
           <Link href="/news" className={mobileLinkClass("/news")} onClick={() => setOpen(false)}>
            资讯
           </Link>
           <Link href="/about" className={mobileLinkClass("/about")} onClick={() => setOpen(false)}>
            关于
           </Link>
           </div>
          </div>
        )}
    </header>
  );
}