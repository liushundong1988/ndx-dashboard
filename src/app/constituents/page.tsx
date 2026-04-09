import snapshot from "@/data/market-snapshot.json";

export default function ConstituentsPage() {
  const stocks = (snapshot.stocks || []).slice(0, 15);

  const formatSigned = (num: number, digits = 2) =>
    `${num >= 0 ? "+" : ""}${num.toFixed(digits)}%`;

  const getColor = (num: number) =>
    num >= 0 ? "text-emerald-600" : "text-rose-600";

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-slate-900">
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6">
        <div className="mb-8">
          <div className="text-[11px] tracking-[0.28em] text-slate-400 sm:text-xs">
            CONSTITUENTS
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            核心驱动 TOP15
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-500 sm:text-lg">
            看清纳斯达克100由谁驱动，以及它在长期周期中的表现位置。
          </p>
          <div className="mt-3 text-sm text-slate-400">
            数据时间：{snapshot.updatedAt}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {stocks.map((stock) => (
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
      </section>
    </main>
  );
}