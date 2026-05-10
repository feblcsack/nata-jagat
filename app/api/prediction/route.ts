import { NextRequest, NextResponse } from "next/server";
import { fetchBMKGWeather, generateFallbackWeather } from "@/lib/bmkg";
import { runDecisionEngine } from "@/lib/decisionEngine";
import { getBentangKidang } from "@/data/bentangKidang";
import { getKalenderBaduy } from "@/data/kalenderBaduy";
import { getLocationById } from "@/data/locations";
import { PredictionResponse } from "@/types";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const locationId = searchParams.get("location") || "lebak";
  const monthParam = searchParams.get("month");

  const month = monthParam
    ? parseInt(monthParam)
    : new Date().getMonth() + 1;

  const location = getLocationById(locationId);

  // Get traditional knowledge data
  const bentangKidang = getBentangKidang(month);
  const kalenderBaduy = getKalenderBaduy(month);

  // Get modern weather data
  let weather;
  try {
    weather = await fetchBMKGWeather(location);
  } catch {
    weather = generateFallbackWeather(location);
  }

  // Run decision engine
  const analysis = runDecisionEngine(bentangKidang, kalenderBaduy, weather);

  const response: PredictionResponse = {
    bentangKidang,
    kalenderBaduy,
    weather,
    analysis,
    generatedAt: new Date().toISOString(),
  };

  return NextResponse.json(response, {
    headers: {
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
    },
  });
}
