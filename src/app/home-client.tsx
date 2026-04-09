"use client";

import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

type MacroCardProps = {
  label: string;
  name: string;
  value: string;
  change: string;
  changeColor: string;
  data: { v: number }[];
  gradientId: string;
  stopColor: string;
  strokeColor: string;
  stopOpacity?: number;
  status: string;
  statusColor: string;
};

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

function MacroCard({
  label,
  name,
  value,
  change,
  changeColor,
  data,
  gradientId,
  stopColor,
  strokeColor,
  stopOpacity = 0.18,
  status,
  statusColor,
}: MacroCardProps) {
  return (
    <div className="rounded-2xl border border-stone-200/80 bg-white px-5 py-4 outline-none transition-shadow hover:shadow-sm">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-1 text-sm font-medium text-slate-700">{name}</div>

      <div className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
        {value}
      </div>

      <div className={`mt-2 text-sm ${changeColor}`}>{change}</div>
      <div className={`mt-1 text-xs ${statusColor}`}>{status}</div>

      <div className="mt-4 overflow-hidden rounded-xl">
        <div className="pointer-events-none h-14 w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={stopColor} stopOpacity={stopOpacity} />
                  <stop offset="100%" stopColor={stopColor} stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <Area
                type="monotone"
                dataKey="v"
                stroke={strokeColor}
                strokeWidth={1.15}
                fill={`url(#${gradientId})`}
                dot={false}
                activeDot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default function HomeClient({ marketData }: { marketData: MarketData }) {
  const index = marketData.index;
  const allStocks = marketData.stocks || [];
  const topDrivers = allStocks.slice(0, 10);

  const conclusion = {
    status: "适合观察",
    desc: "估值处于中位区间，利率仍有压力，当前更适合等待更好的风险收益比。",
  };

  const formatSigned = (num: number, digits = 2) =>
    `${num >= 0 ? "+" : ""}${num.toFixed(digits)}%`;

  const getContributionColor = (num: number) =>
    num >= 0 ? "text-emerald-600" : "text-rose-600";

  const vixTrend = [
    { v: 23.5 }, { v: 20.8 }, { v: 21.6 }, { v: 19.7 }, { v: 20.9 },
    { v: 18.6 }, { v: 19.8 }, { v: 19.1 }, { v: 19.4 }, { v: 18.2 },
  ];

  const yieldTrend = [
    { v: 4.35 }, { v: 4.34 }, { v: 4.33 }, { v: 4.31 }, { v: 4.3 },
    { v: 4.28 }, { v: 4.26 }, { v: 4.24 }, { v: 4.22 }, { v: 4.21 },
  ];

  const dxyTrend = [
    { v: 105.0 }, { v: 104.9 }, { v: 104.8 }, { v: 104.8 }, { v: 104.7 },
    { v: 104.6 }, { v: 104.5 }, { v: 104.4 }, { v: 104.2 }, { v: 104.3 },
  ];

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-slate-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center">
        <div className="h-[260px] w-[520px] rounded-full bg-violet-300/18 blur-[100px]" />
      </div>

      <section className="mx-auto max-w-6xl px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-14">
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
                  <span className={getContributionColor(stock.changesPercentage)}>
                    {formatSigned(stock.changesPercentage)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">贡献</span>
                  <span className={`font-medium ${getContributionColor(stock.contribution ?? 0)}`}>
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

      <section className="mx-auto mt-2 max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <MacroCard
            label="恐慌指数"
            name="VIX"
            value="18.2"
            change="-3.1%"
            changeColor="text-emerald-600"
            data={vixTrend}
            gradientId="vixFill"
            stopColor="#94a3b8"
            strokeColor="rgba(71,85,105,0.68)"
            stopOpacity={0.18}
            status="中性"
            statusColor="text-slate-400"
          />

          <MacroCard
            label="利率水平"
            name="美债10Y"
            value="4.21%"
            change="+0.05%"
            changeColor="text-rose-500"
            data={yieldTrend}
            gradientId="yieldFill"
            stopColor="#f59e0b"
            strokeColor="rgba(180,83,9,0.42)"
            stopOpacity={0.12}
            status="偏压制"
            statusColor="text-orange-400"
          />

          <MacroCard
            label="美元强弱"
            name="美元指数"
            value="104.3"
            change="-0.2%"
            changeColor="text-emerald-600"
            data={dxyTrend}
            gradientId="dxyFill"
            stopColor="#94a3b8"
            strokeColor="rgba(100,116,139,0.38)"
            stopOpacity={0.1}
            status="偏压制"
            statusColor="text-orange-400"
          />
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl px-4 pb-16 sm:mt-16 sm:px-6 sm:pb-20">
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

      <footer className="mt-24 border-t border-gray-200 pt-10 pb-6 px-6 text-center text-sm text-gray-500">
        <div className="text-base font-medium text-gray-700 mb-2">纳指100观察</div>
        <div className="mb-2">结构观察 · 非实时数据</div>
        <div className="mb-4 text-xs text-gray-400">
          数据更新：美股收盘后自动更新（北京时间每日 06:30）
        </div>

        <div className="text-xs text-gray-400 leading-relaxed max-w-xl mx-auto">
          本页面仅用于结构观察与信息整理，不构成投资建议。
          <br />
          市场有风险，决策需谨慎。
        </div>

        <div className="mt-6 text-xs text-gray-300">© 2026 liu shun dong</div>
      </footer>
    </main>
  );
}