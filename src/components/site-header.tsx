"use client";

import { useState } from "react";
import Link from "next/link";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          纳指100观察
        </Link>

        <nav className="hidden md:flex gap-6 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">首页</Link>
          <Link href="/constituents" className="hover:text-slate-900">成分股</Link>
          <Link href="/etf" className="hover:text-slate-900">ETF</Link>
          <Link href="/news" className="hover:text-slate-900">资讯</Link>
          <Link href="/about" className="hover:text-slate-900">关于</Link>
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
          <div className="flex flex-col px-4 py-3 space-y-3 text-sm text-slate-700">
            <Link href="/" onClick={() => setOpen(false)}>首页</Link>
            <Link href="/constituents" onClick={() => setOpen(false)}>成分股</Link>
            <Link href="/etf" onClick={() => setOpen(false)}>ETF</Link>
            <Link href="/news" onClick={() => setOpen(false)}>资讯</Link>
            <Link href="/about" onClick={() => setOpen(false)}>关于</Link>
          </div>
        </div>
      )}
    </header>
  );
}