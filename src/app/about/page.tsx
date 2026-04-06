"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Info,
  Compass,
  Layers3,
  ShieldAlert,
} from "lucide-react";

function AboutCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-3xl border border-stone-200/80 bg-white p-6 sm:p-7">
      <div className="mb-4 flex items-center gap-2">
        <div className="text-slate-500">{icon}</div>
        <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
          {title}
        </h2>
      </div>
      <p className="text-sm leading-8 text-slate-600 sm:text-base">{desc}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] text-slate-900">
      <header className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
            <BarChart3
              size={16}
              strokeWidth={2.2}
              className="text-slate-900 opacity-90"
            />
            <span>纳指100观察</span>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium tracking-wide text-slate-600 md:flex">
            <Link href="/" className="transition-colors duration-300 hover:text-black">
              首页
            </Link>
            <Link
              href="/constituents"
              className="transition-colors duration-300 hover:text-black"
            >
              成分股
            </Link>
            <Link
              href="/etf"
              className="transition-colors duration-300 hover:text-black"
            >
              国内ETF
            </Link>
            <Link
              href="/news"
              className="transition-colors duration-300 hover:text-black"
            >
              资讯
            </Link>
            <Link
              href="/about"
              className="text-slate-950 transition-colors duration-300 hover:text-black"
            >
              关于
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-14">
        <div className="mb-3 text-[11px] tracking-[0.28em] text-slate-400 sm:text-xs">
          ABOUT THIS PROJECT
        </div>

        <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          关于这个网站
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-500 sm:text-lg">
          这是一个面向中国纳指投资者的结构化观察工具。这个网站不做任何理财投资推荐，只是帮你看清结构，让决策变得更简单。
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <AboutCard
            icon={<Info size={18} strokeWidth={1.8} />}
            title="这是什么"
            desc="这不是一个荐股网站，也不是一个追逐热点的财经门户。它更像一个安静的观察面板：帮助用户看清纳指100的结构、估值、参与成本，以及真正重要的宏观与财报信息。"
          />

          <AboutCard
            icon={<Compass size={18} strokeWidth={1.8} />}
            title="为什么做它"
            desc="平时查阅纳指相关信息，经常会遇到两个问题：一是信息分散，要在很多网站之间来回切换；二是大多数页面大而全，却不够克制，很难快速抓住真正重要的结构。所以我想做一个更小、更清晰、更适合长期投资者使用的版本。"
          />
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl border border-stone-200/80 bg-white p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-2">
            <Layers3 size={18} strokeWidth={1.8} className="text-slate-500" />
            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
              这个网站主要看什么
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 px-4 py-4">
              <div className="text-sm font-medium text-slate-900">首页</div>
              <div className="mt-2 text-sm leading-7 text-slate-600">
                看当前结构。包括指数状态、主要驱动、宏观环境和估值位置。
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-4">
              <div className="text-sm font-medium text-slate-900">成分股</div>
              <div className="mt-2 text-sm leading-7 text-slate-600">
                看谁在驱动纳指。并通过长期波动、PE趋势和指数对比理解它的底层特征。
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-4">
              <div className="text-sm font-medium text-slate-900">国内ETF</div>
              <div className="mt-2 text-sm leading-7 text-slate-600">
                看参与成本。重点关注溢价率、规模、跟踪误差、限购状态和可买性。
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-4">
              <div className="text-sm font-medium text-slate-900">事件与解读</div>
              <div className="mt-2 text-sm leading-7 text-slate-600">
                看真正影响纳指的关键事件，不只是知道发生了什么，更重要的是理解这意味着什么。
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="rounded-3xl border border-stone-200/80 bg-white p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-2">
            <ShieldAlert size={18} strokeWidth={1.8} className="text-slate-500" />
            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
              免责声明
            </h2>
          </div>

          <div className="space-y-4 text-sm leading-8 text-slate-600 sm:text-base">
            <p>
              本网站仅提供公开信息整理、数据展示与结构化分析，不构成任何投资建议，也不构成对任何证券、基金或ETF的推荐。
            </p>
            <p>
              市场有风险，投资需谨慎。所有买卖决策请基于个人判断，并结合自身风险承受能力独立完成。
            </p>
          </div>

          <div className="mt-8 border-t border-stone-200/80 pt-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="shrink-0">
                <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                  <Image
                    src="/qrcode.jpg"
                    alt="火芯时代公众号二维码"
                    width={96}
                    height={96}
                    className="h-24 w-24 object-cover"
                  />
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-slate-900">火芯时代</div>
                <div className="mt-1 text-sm leading-7 text-slate-600">
                  长期结构 · 投资认知 · 真实经验
                </div>
                <div className="mt-1 text-sm text-slate-400">扫码关注公众号</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}