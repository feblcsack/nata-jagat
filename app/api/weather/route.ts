import { NextRequest, NextResponse } from "next/server";
import { fetchBMKGWeather } from "@/lib/bmkg";
import { getLocationById, DEFAULT_LOCATION } from "@/data/locations";
import { WeatherAPIResponse } from "@/types";

export const runtime = "nodejs";
// Hapus export const revalidate = 3600; dan ganti ini:
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const locationId = searchParams.get("location") || "lebak";

  const location = getLocationById(locationId);

  try {
    const weatherData = await fetchBMKGWeather(location);

    const response: WeatherAPIResponse = {
      success: true,
      data: weatherData,
      source: "bmkg",
      fetchedAt: new Date().toISOString(),
    };

    return NextResponse.json(response, {
      headers: {
        // Matikan cache biar data di Peta Risiko ikut akurat
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Weather API error:", error);

    // Return fallback data instead of error
    const { generateFallbackWeather } = await import("@/lib/bmkg");
    const fallbackData = generateFallbackWeather(location);

    const response: WeatherAPIResponse = {
      success: true,
      data: fallbackData,
      source: "fallback",
      fetchedAt: new Date().toISOString(),
    };

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  }
}