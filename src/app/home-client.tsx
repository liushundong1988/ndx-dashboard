"use client";

import Link from "next/link";
import { BarChart3 } from "lucide-react";

type StockItem = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changesPercentage: number;
  weight?: number;
  contribution?: number;
};

type MarketData = {
  updatedAt: string;
  index: {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changesPercentage: number;
  } | null;
  stocks: StockItem[];
};

export default function HomeClient({ marketData }: { marketData: MarketData }) {
  const index = marketData.index;
  const topDrivers = (marketData.stocks || []).slice(0, 10);

  const conclusion = {
    status: "适合观察",
    desc: "估值处于中位区间，利率仍有压力，当前更适合等待更好的风险收益比。",
  };

  const formatSigned = (num: number, digits = 2) =>
    `${num >= 0 ? "+" : ""}${num.toFixed(digits)}%`;

  const getColor = (num: number) =>
    num >= 0 ? "text-emerald-600" : "text-rose-600";

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-slate-900">
      <section className="mx-auto max-w-6xl px-4 pt-6 pb-8 sm:px-6 sm:pt-8 sm:pb-8">
        <div className="grid items-start gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          <div>
            <div className="mb-3 text-[11px] tracking-[0.28em] text-slate-400 sm:text-xs">
              NASDAQ 100 INDEX
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              纳斯达克100
            </h1>

            <p className="mt-4 max-w-xl text-base leading-8 text-slate-500 sm:text-lg">
              在噪音之外，看清指数结构。
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5 text-sm text-slate-500">
              <div className="rounded-full border border-stone-200 bg-white px-3 py-1.5">
                纽约收盘后
              </div>
              <div className="rounded-full border border-stone-200 bg-white px-3 py-1.5">
                北京 06:30 更新
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button className="rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-800">
                开始观察 →
              </button>
              <Link
                href="/constituents"
                className="rounded-full border border-stone-200 bg-white px-5 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-stone-50"
              >
                查看成分股
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-stone-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm text-slate-500">指数总览</div>
                  <div className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                    {index ? index.price.toFixed(2) : "--"}
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-sm font-medium">
                    <span className={index && index.change >= 0 ? "text-emerald-700" : "text-rose-600"}>
                      {index ? `${index.change >= 0 ? "+" : ""}${index.change.toFixed(2)}` : "--"}
                    </span>
                    <span className={index && index.changesPercentage >= 0 ? "text-emerald-700" : "text-rose-600"}>
                      {index ? `${index.changesPercentage >= 0 ? "+" : ""}${index.changesPercentage.toFixed(2)}%` : "--"}
                    </span>
                  </div>
                </div>

                <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
                  收盘
                </div>
              </div>

              <div className="mt-6 border-t border-stone-200 pt-5 text-sm text-slate-500">
                <div className="flex justify-between py-1">
                  <span>主要驱动</span>
                  <span className="text-slate-700">{topDrivers[0]?.name ?? "--"}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>上涨家数</span>
                  <span className="text-slate-700">
                    <span className="text-emerald-700">64</span> / 100
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span>数据时间</span>
                  <span className="text-slate-700">{marketData.updatedAt}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-amber-200/60 bg-amber-50/40 px-5 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] sm:px-6">
              <div className="text-xs tracking-wide text-slate-400">当前结论</div>

              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-medium text-amber-700 ring-1 ring-amber-200">
                <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                当前策略：{conclusion.status}
              </div>

              <div className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                {conclusion.desc}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-2 max-w-6xl px-4 sm:px-6">
        <div className="mb-5">
          <div className="flex items-center gap-2">
            <BarChart3 size={17} strokeWidth={1.8} className="text-slate-500" />
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              今日驱动 TOP10
            </h2>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            按对指数贡献排序，一眼看清纳指上涨的真正来源。
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {topDrivers.map((stock) => (
            <div
              key={stock.symbol}
              className="rounded-2xl border border-stone-200/80 bg-white px-4 py-4 transition-shadow hover:shadow-sm"
            >
              <div className="text-xs text-slate-400">{stock.name}</div>

              <div className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
                {stock.symbol}
              </div>

              <div className="mt-3 space-y-1 text-sm">
                <div className="flex items-center justify-between text-slate-500">
                  <span>权重</span>
                  <span>{(stock.weight ?? 0).toFixed(2)}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">涨跌</span>
                  <span className={getColor(stock.changesPercentage)}>
                    {formatSigned(stock.changesPercentage)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">贡献</span>
                  <span className={`font-medium ${getColor(stock.contribution ?? 0)}`}>
                    {formatSigned(stock.contribution ?? 0)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 mb-8 text-sm text-slate-400">
          剩余成分股对指数影响更分散，完整结构可在「成分股」页面继续查看。
        </div>
      </section>

      <section className="mx-auto mt-4 max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-stone-200/80 bg-white px-5 py-4">
            <div className="text-xs text-slate-400">恐慌指数</div>
            <div className="mt-1 text-sm font-medium text-slate-700">VIX</div>
            <div className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              18.2
            </div>
            <div className="mt-2 text-sm text-emerald-600">-3.1%</div>
            <div className="mt-1 text-xs text-slate-400">中性</div>
          </div>

          <div className="rounded-2xl border border-stone-200/80 bg-white px-5 py-4">
            <div className="text-xs text-slate-400">利率水平</div>
            <div className="mt-1 text-sm font-medium text-slate-700">美债10Y</div>
            <div className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              4.21%
            </div>
            <div className="mt-2 text-sm text-rose-500">+0.05%</div>
            <div className="mt-1 text-xs text-orange-400">偏压制</div>
          </div>

          <div className="rounded-2xl border border-stone-200/80 bg-white px-5 py-4">
            <div className="text-xs text-slate-400">美元强弱</div>
            <div className="mt-1 text-sm font-medium text-slate-700">美元指数</div>
            <div className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              104.3
            </div>
            <div className="mt-2 text-sm text-emerald-600">-0.2%</div>
            <div className="mt-1 text-xs text-orange-400">偏压制</div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-6xl px-4 pb-8 sm:mt-12 sm:px-6 sm:pb-8">
        <div className="rounded-3xl border border-stone-200/80 bg-white p-5 sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              纳指估值观察
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              当前位置更适合判断“贵不贵”，而不是只看涨跌。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <div className="text-sm text-slate-400">当前 PE(TTM)</div>
              <div className="mt-2 text-2xl font-semibold text-slate-950">28.4</div>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <div className="text-sm text-slate-400">近10年历史分位</div>
              <div className="mt-2 text-2xl font-semibold text-slate-950">78%</div>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <div className="text-sm text-slate-400">当前区间</div>
              <div className="mt-2 text-2xl font-semibold text-slate-950">中高位</div>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <div className="text-sm text-slate-400">近10年中位数</div>
              <div className="mt-2 text-2xl font-semibold text-slate-950">22.5</div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-4">
            <div className="text-sm text-slate-400">一句话判断</div>
            <div className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              当前估值处于中高位，更适合分批定投，不适合一次性重仓追高。
            </div>
          </div>
        </div>
      </section>


      <footer className="mt-10 border-t border-gray-200 py-6 px-6 text-center text-sm text-gray-500">
        <div className="mb-2 text-xs text-gray-500">
         结构观察：非实时数据
        </div>
       <div className="text-xs text-gray-400 leading-relaxed">
         数据更新：美股收盘后自动更新（北京时间每日 06:30）
      </div>
     </footer>

    </main>
  );
}