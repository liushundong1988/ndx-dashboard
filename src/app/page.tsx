import snapshot from "@/data/market-snapshot.json";
import HomeClient from "./home-client";

export default function HomePage() {
  return <HomeClient marketData={snapshot} />;
}