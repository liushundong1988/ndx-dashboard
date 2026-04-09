import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const API_KEY = process.env.TWELVE_DATA_API_KEY;

if (!API_KEY) {
  throw new Error("缺少 TWELVE_DATA_API_KEY");
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const outputFile = path.join(projectRoot, "src", "data", "market-snapshot.json");

// 15 家核心股
const STOCKS = [
  { symbol: "AAPL", name: "Apple Inc.", weight: 8.72 },
  { symbol: "MSFT", name: "Microsoft Corp.", weight: 8.11 },
  { symbol: "NVDA", name: "NVIDIA Corporation", weight: 7.95 },
  { symbol: "AMZN", name: "Amazon.com Inc.", weight: 5.24 },
  { symbol: "META", name: "Meta Platforms Inc.", weight: 4.83 },
  { symbol: "GOOGL", name: "Alphabet Inc. Class A", weight: 3.92 },
  { symbol: "AVGO", name: "Broadcom Inc.", weight: 3.11 },
  { symbol: "NFLX", name: "Netflix Inc.", weight: 2.51 },
  { symbol: "GOOG", name: "Alphabet Inc. Class C", weight: 3.45 },
  { symbol: "COST", name: "Costco Wholesale Corp.", weight: 2.88 },
  { symbol: "TSLA", name: "Tesla Inc.", weight: 2.63 },
  { symbol: "AMD", name: "Advanced Micro Devices", weight: 1.94 },
  { symbol: "ADBE", name: "Adobe Inc.", weight: 1.72 },
  { symbol: "CSCO", name: "Cisco Systems Inc.", weight: 1.44 },
  { symbol: "PEP", name: "PepsiCo Inc.", weight: 1.58 }
];

const INDEX_PROXY = { symbol: "QQQ", name: "纳斯达克100（QQQ代理）" };

// Twelve Data 免费额度紧，分两批，避免一分钟内 credits 超限
const PHASE_1 = [INDEX_PROXY.symbol, ...STOCKS.slice(0, 7).map((s) => s.symbol)];
const PHASE_2 = STOCKS.slice(7).map((s) => s.symbol);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchQuote(symbols) {
  const url = `https://api.twelvedata.com/quote?symbol=${symbols.join(",")}&apikey=${API_KEY}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`请求失败: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function normalizeResponse(raw) {
  if (Array.isArray(raw)) {
    return raw.filter(Boolean);
  }

  if (!raw || typeof raw !== "object") {
    return [];
  }

  if (raw.symbol) {
    return [raw];
  }

  return Object.values(raw).filter(
    (item) => item && typeof item === "object" && item.symbol
  );
}

function formatBeijingTime(date = new Date()) {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(date);
}

function mapQuote(item, fallbackName = "") {
  return {
    symbol: item.symbol ?? "",
    name: item.name ?? fallbackName ?? item.symbol ?? "",
    price: toNumber(item.close ?? item.price),
    change: toNumber(item.change),
    changesPercentage: toNumber(item.percent_change)
  };
}

async function main() {
  console.log("开始更新 market snapshot...");

  const raw1 = await fetchQuote(PHASE_1);
  console.log("第一批完成");

  // 免费方案按分钟 credits 限制，等 65 秒更稳
  await sleep(65000);

  const raw2 = await fetchQuote(PHASE_2);
  console.log("第二批完成");

  const items1 = normalizeResponse(raw1);
  const items2 = normalizeResponse(raw2);
  const allItems = [...items1, ...items2];

  const indexRaw = allItems.find((item) => item.symbol === INDEX_PROXY.symbol);

  const stocks = STOCKS.map((meta) => {
    const raw = allItems.find((item) => item.symbol === meta.symbol);

    const mapped = raw
      ? mapQuote(raw, meta.name)
      : {
          symbol: meta.symbol,
          name: meta.name,
          price: 0,
          change: 0,
          changesPercentage: 0
        };

    const contribution = Number(
      ((meta.weight * mapped.changesPercentage) / 100).toFixed(2)
    );

    return {
      ...mapped,
      weight: meta.weight,
      contribution
    };
  });

  const snapshot = {
    updatedAt: formatBeijingTime(),
    index: indexRaw
      ? {
          ...mapQuote(indexRaw, INDEX_PROXY.name),
          symbol: INDEX_PROXY.symbol,
          name: INDEX_PROXY.name
        }
      : {
          symbol: INDEX_PROXY.symbol,
          name: INDEX_PROXY.name,
          price: 0,
          change: 0,
          changesPercentage: 0
        },
    stocks
  };

  await fs.writeFile(outputFile, JSON.stringify(snapshot, null, 2), "utf-8");

  console.log("更新完成，已写入：", outputFile);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});