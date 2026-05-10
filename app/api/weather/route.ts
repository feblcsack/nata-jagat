import { NextRequest, NextResponse } from "next/server";
import { fetchBMKGWeather } from "@/lib/bmkg";
import { getLocationById, DEFAULT_LOCATION } from "@/data/locations";
import { WeatherAPIResponse } from "@/types";

export const runtime = "nodejs";
export const revalidate = 3600; // Revalidate every hour

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
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
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

    return NextResponse.json(response);
  }
}
