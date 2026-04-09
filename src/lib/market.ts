type IndexData = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changesPercentage: number;
};

type StockItem = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changesPercentage: number;
};

const API_KEY = process.env.TWELVE_DATA_API_KEY;

// 这里改成 10 家
const TOP_SYMBOLS = [
  "AAPL",
  "MSFT",
  "NVDA",
  "AMZN",
  "META",
  "GOOGL",
  "AVGO",
  "TSLA",
  "COST",
  "NFLX",
];

// 先继续用 QQQ 代理纳指100
const INDEX_PROXY = "QQQ";

async function fetchJson(url: string) {
  const res = await fetch(url, {
    next: { revalidate: 1800 }, // 30分钟更新一次，更稳一点
  });

  if (!res.ok) {
    throw new Error(`请求失败: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

function toNumber(value: any) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function mapQuote(item: any, fallbackName?: string) {
  return {
    symbol: item?.symbol ?? "",
    name: item?.name ?? fallbackName ?? item?.symbol ?? "",
    price: toNumber(item?.close ?? item?.price),
    change: toNumber(item?.change),
    changesPercentage: toNumber(item?.percent_change),
  };
}

export async function getMarketData() {
  if (!API_KEY) {
    throw new Error("缺少 TWELVE_DATA_API_KEY，请检查 .env.local");
  }

  const indexUrl = `https://api.twelvedata.com/quote?symbol=${INDEX_PROXY}&apikey=${API_KEY}`;
  const stocksUrl = `https://api.twelvedata.com/quote?symbol=${TOP_SYMBOLS.join(",")}&apikey=${API_KEY}`;

  const [indexRaw, stocksRaw] = await Promise.all([
    fetchJson(indexUrl),
    fetchJson(stocksUrl),
  ]);

  const index: IndexData | null =
    indexRaw && !indexRaw.code
      ? {
          ...mapQuote(indexRaw, "纳斯达克100（QQQ代理）"),
          symbol: "QQQ",
          name: "纳斯达克100（QQQ代理）",
        }
      : null;

  let stocks: StockItem[] = [];

  if (Array.isArray(stocksRaw)) {
    stocks = stocksRaw
      .filter((item) => item && !item.code)
      .map((item) => mapQuote(item));
  } else if (stocksRaw && typeof stocksRaw === "object") {
    if (!stocksRaw.code && stocksRaw.symbol) {
      stocks = [mapQuote(stocksRaw)];
    } else {
      const values = Object.values(stocksRaw).filter(
        (item: any) => item && typeof item === "object" && !item.code
      );
      stocks = values.map((item: any) => mapQuote(item));
    }
  }

  return { index, stocks };
}