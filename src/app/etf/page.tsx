"use client";

import Link from "next/link";
import { BarChart3, CircleAlert, Globe2, WalletCards } from "lucide-react";

type SubscribeStatus = "正常" | "限购" | "暂停";

type EtfItem = {
  code: string;
  name: string;
  price: string;
  premium: number;
  scale: string;
  trackingError: string;
  subscribeStatus: SubscribeStatus;
  dailyLimit: string;
};

export default function EtfPage() {
const etfs: EtfItem[] = [
  {
    code: "513100",
    name: "国泰纳指100ETF",
    price: "1.623",
    premium: 0.8,
    scale: "260亿",
    trackingError: "0.28%",
    subscribeStatus: "正常",
    dailyLimit: "不限",
  },
  {
    code: "513300",
    name: "华夏纳指100ETF",
    price: "1.214",
    premium: 1.6,
    scale: "220亿",
    trackingError: "0.32%",
    subscribeStatus: "限购",
    dailyLimit: "1000元",
  },
  {
    code: "159941",
    name: "广发纳指100ETF",
    price: "1.488",
    premium: 1.2,
    scale: "120亿",
    trackingError: "0.35%",
    subscribeStatus: "正常",
    dailyLimit: "不限",
  },
  {
    code: "513110",
    name: "华泰柏瑞纳指100ETF",
    price: "1.267",
    premium: 0.9,
    scale: "90亿",
    trackingError: "0.31%",
    subscribeStatus: "正常",
    dailyLimit: "不限",
  },
  {
    code: "159659",
    name: "招商纳指100ETF",
    price: "1.392",
    premium: 2.4,
    scale: "60亿",
    trackingError: "0.45%",
    subscribeStatus: "限购",
    dailyLimit: "500元",
  },
  {
    code: "159660",
    name: "汇添富纳指100ETF",
    price: "1.305",
    premium: 1.9,
    scale: "50亿",
    trackingError: "0.42%",
    subscribeStatus: "正常",
    dailyLimit: "不限",
  },
  {
    code: "159696",
    name: "易方达纳指100ETF",
    price: "1.276",
    premium: 2.8,
    scale: "45亿",
    trackingError: "0.48%",
    subscribeStatus: "限购",
    dailyLimit: "500元",
  },
  {
    code: "159632",
    name: "华安纳指100ETF",
    price: "1.188",
    premium: 3.6,
    scale: "30亿",
    trackingError: "0.60%",
    subscribeStatus: "限购",
    dailyLimit: "300元",
  },
  {
    code: "159501",
    name: "嘉实纳指100ETF",
    price: "0.982",
    premium: 1.1,
    scale: "55亿",
    trackingError: "0.33%",
    subscribeStatus: "正常",
    dailyLimit: "不限",
  },
  {
    code: "159513",
    name: "大成纳指100ETF",
    price: "1.105",
    premium: 4.5,
    scale: "25亿",
    trackingError: "0.75%",
    subscribeStatus: "暂停",
    dailyLimit: "-",
  },
];

  const usdCny = "7.23";

  const getPremiumTone = (premium: number) => {
    if (premium < 1) {
      return {
        text: "正常",
        className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
      };
    }
    if (premium < 3) {
      return {
        text: "偏高",
        className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
      };
    }
    return {
      text: "高风险",
      className: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
    };
  };

  const getStatusTone = (status: EtfItem["subscribeStatus"]) => {
    if (status === "正常") {
      return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
    }
    if (status === "限购") {
      return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
    }
    return "bg-rose-50 text-rose-700 ring-1 ring-rose-200";
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-slate-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <div className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
          <BarChart3 size={16} strokeWidth={2.2} className="text-slate-900 opacity-90" />
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
            className="text-slate-950 transition-colors duration-300 hover:text-black"
          >
            国内ETF
          </Link>
          <Link 
            href="/news" 
            className="transition-colors duration-300 hover:text-black">
            资讯
          </Link>
          <Link
            href="/about"
            className="transition-colors duration-300 hover:text-black">
            关于
          </Link>
        </nav>
      </header>

      <section className="px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-3 text-[11px] tracking-[0.28em] text-slate-400 sm:text-xs">
            ETF & COST CHECK
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            国内ETF观察
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-500 sm:text-lg">
            在国内通过ETF参与纳指100，现在买贵不贵，能不能买，跟得准不准。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-5 flex items-center gap-2">
          <WalletCards size={17} strokeWidth={1.8} className="text-slate-500" />
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            ETF总览
          </h2>
        </div>

        {/* 桌面端表格 */}
        <div className="hidden overflow-hidden rounded-3xl border border-stone-200/80 bg-white lg:block">
          <div className="grid grid-cols-[1.6fr_0.8fr_0.8fr_0.95fr_0.95fr_0.8fr_0.8fr] gap-4 border-b border-stone-200/80 px-6 py-4 text-sm font-medium text-slate-500">
            <div>基金代码 + 名称</div>
            <div>实时价格</div>
            <div>溢价率</div>
            <div>基金规模</div>
            <div>跟踪误差</div>
            <div>申购状态</div>
            <div>单日限额</div>
          </div>

          {etfs.map((etf, index) => {
            const premiumTone = getPremiumTone(etf.premium);
            return (
              <div
                key={etf.code}
                className={`grid grid-cols-[1.6fr_0.8fr_0.8fr_0.95fr_0.95fr_0.8fr_0.8fr] gap-4 px-6 py-5 text-sm ${
                  index !== etfs.length - 1 ? "border-b border-stone-200/70" : ""
                }`}
              >
                <div>
                  <div className="text-base font-semibold text-slate-900">{etf.code}</div>
                  <div className="mt-1 text-slate-500">{etf.name}</div>
                </div>

                <div className="font-medium text-slate-900">{etf.price}</div>

                <div>
                  <div className="font-medium text-slate-900">{etf.premium}%</div>
                  <div
                    className={`mt-2 inline-flex items-center rounded-full px-2.5 py-1 text-xs ${premiumTone.className}`}
                  >
                    {premiumTone.text}
                  </div>
                </div>

                <div className="text-slate-700">{etf.scale}</div>
                <div className="text-slate-700">{etf.trackingError}</div>

                <div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs ${getStatusTone(
                      etf.subscribeStatus
                    )}`}
                  >
                    {etf.subscribeStatus}
                  </span>
                </div>

                <div className="text-slate-700">{etf.dailyLimit}</div>
              </div>
            );
          })}
        </div>

        {/* 移动端卡片 */}
        <div className="grid grid-cols-1 gap-4 lg:hidden">
          {etfs.map((etf) => {
            const premiumTone = getPremiumTone(etf.premium);
            return (
              <div
                key={etf.code}
                className="rounded-3xl border border-stone-200/80 bg-white p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xl font-semibold text-slate-900">{etf.code}</div>
                    <div className="mt-1 text-sm text-slate-500">{etf.name}</div>
                  </div>

                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs ${getStatusTone(
                      etf.subscribeStatus
                    )}`}
                  >
                    {etf.subscribeStatus}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-slate-50 px-3 py-3">
                    <div className="text-slate-400">实时价格</div>
                    <div className="mt-1 font-medium text-slate-900">{etf.price}</div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-3 py-3">
                    <div className="text-slate-400">溢价率</div>
                    <div className="mt-1 font-medium text-slate-900">{etf.premium}%</div>
                    <div
                      className={`mt-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs ${premiumTone.className}`}
                    >
                      {premiumTone.text}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-3 py-3">
                    <div className="text-slate-400">基金规模</div>
                    <div className="mt-1 font-medium text-slate-900">{etf.scale}</div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-3 py-3">
                    <div className="text-slate-400">跟踪误差</div>
                    <div className="mt-1 font-medium text-slate-900">
                      {etf.trackingError}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-3 py-3">
                    <div className="text-slate-400">单日限额</div>
                    <div className="mt-1 font-medium text-slate-900">{etf.dailyLimit}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl px-4 sm:mt-16 sm:px-6">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-stone-200/80 bg-white p-6 sm:p-7">
            <div className="mb-3 flex items-center gap-2">
              <CircleAlert size={17} strokeWidth={1.8} className="text-slate-500" />
              <h3 className="text-lg font-semibold text-slate-900">
                买入前重点看什么
              </h3>
            </div>

            <div className="space-y-3 text-sm leading-7 text-slate-600">
              <p>
                溢价率代表ETF价格相对净值的偏离。溢价越高，说明当前场内买入成本越高。
              </p>
              <p>
                申购状态决定你能不能顺畅买入。上涨阶段越拥挤，越容易出现限购甚至暂停。
              </p>
              <p>
                基金规模影响流动性，跟踪误差反映它与纳指的贴合度。
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-stone-200/80 bg-white p-6 sm:p-7">
            <div className="mb-3 flex items-center gap-2">
              <Globe2 size={17} strokeWidth={1.8} className="text-slate-500" />
              <h3 className="text-lg font-semibold text-slate-900">
                汇率提示
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-4">
              <div className="text-sm text-slate-400">USD/CNY</div>
              <div className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                {usdCny}
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              汇率会影响你的最终收益，但不决定纳指100本身的走势。
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl px-4 pb-16 sm:mt-16 sm:px-6 sm:pb-20">
        <div className="rounded-3xl border border-stone-200/80 bg-white p-6 sm:p-7">
          <div className="text-sm text-slate-400">一句话总结</div>
          <div className="mt-3 text-base leading-8 text-slate-700">
            对中国投资者来说，指数方向只是第一层，真正买入前还要看当前溢价、可买性、规模和跟踪误差。
          </div>
        </div>
      </section>
    </main>
  );
}