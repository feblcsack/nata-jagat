import { BMKGWeatherData, BMKGForecastDay } from "@/types";
import { BMKGLocation } from "@/data/locations";

/**
 * BMKG WEATHER SERVICE
 *
 * Menggunakan BMKG Open Data API:
 * - Endpoint: https://api.bmkg.go.id/publik/prakiraan-cuaca
 * - Dokumentasi: https://data.bmkg.go.id/prakiraan-cuaca/
 *
 * BMKG mengembalikan prakiraan cuaca per wilayah administratif (adm1-adm4)
 */

const BMKG_BASE_URL = "https://api.bmkg.go.id/publik/prakiraan-cuaca";

// Weather code mappings from BMKG
const WEATHER_CODE_MAP: Record<string, { desc: string; icon: string }> = {
  "0": { desc: "Cerah", icon: "☀️" },
  "1": { desc: "Cerah Berawan", icon: "🌤️" },
  "2": { desc: "Cerah Berawan", icon: "🌤️" },
  "3": { desc: "Berawan", icon: "⛅" },
  "4": { desc: "Berawan Tebal", icon: "☁️" },
  "5": { desc: "Udara Kabur", icon: "🌫️" },
  "10": { desc: "Asap", icon: "🌫️" },
  "45": { desc: "Berawan & Kabut", icon: "🌫️" },
  "60": { desc: "Hujan Ringan", icon: "🌦️" },
  "61": { desc: "Hujan Sedang", icon: "🌧️" },
  "63": { desc: "Hujan Lebat", icon: "🌧️" },
  "80": { desc: "Hujan Lokal", icon: "🌦️" },
  "95": { desc: "Hujan Petir", icon: "⛈️" },
  "97": { desc: "Hujan Petir Lebat", icon: "⛈️" },
};

function getWeatherInfo(code: string): { desc: string; icon: string } {
  return WEATHER_CODE_MAP[code] || { desc: "Tidak Diketahui", icon: "❓" };
}

function getRainfallIntensity(
  rainfall: number
): BMKGWeatherData["rainfallIntensity"] {
  if (rainfall === 0) return "Tidak Hujan";
  if (rainfall < 5) return "Ringan";
  if (rainfall < 20) return "Sedang";
  if (rainfall < 50) return "Lebat";
  return "Sangat Lebat";
}

function getClimaticCondition(
  rainfall: number,
  avgNormal: number = 15
): BMKGWeatherData["climaticCondition"] {
  const ratio = rainfall / avgNormal;
  if (ratio < 0.7) return "Di Bawah Normal";
  if (ratio > 1.3) return "Di Atas Normal";
  return "Normal";
}

export async function fetchBMKGWeather(
  location: BMKGLocation
): Promise<BMKGWeatherData> {
  try {
    // BMKG API endpoint with administrative area code
    const url = `${BMKG_BASE_URL}?adm1=${location.adm1}&adm2=${location.adm2}${
      location.adm3 ? `&adm3=${location.adm3}` : ""
    }`;

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`BMKG API returned ${response.status}`);
    }

    const raw = await response.json();
    return parseBMKGResponse(raw, location);
  } catch (error) {
    console.error("BMKG fetch failed, using fallback:", error);
    return generateFallbackWeather(location);
  }
}

function parseBMKGResponse(raw: unknown, location: BMKGLocation): BMKGWeatherData {
  // BMKG API response structure parsing
  // Response: { data: [{ lokasi: {...}, cuaca: [[{...}, ...], ...] }] }
  const rawObj = raw as Record<string, unknown>;
  const dataArr = rawObj.data as Array<Record<string, unknown>>;

  if (!dataArr || !Array.isArray(dataArr) || dataArr.length === 0) {
    throw new Error("Invalid BMKG response structure");
  }

  const locationData = dataArr[0];
  const cuacaData = locationData.cuaca as Array<Array<Record<string, unknown>>>;

  if (!cuacaData || !Array.isArray(cuacaData)) {
    throw new Error("No forecast data in response");
  }

  // Flatten all forecast periods
  const allForecasts = cuacaData.flat();
  const current = allForecasts[0];

  const weatherCode = String(current.weather_code || current.weather || "0");
  const weatherInfo = getWeatherInfo(weatherCode);
  const rainfall = Number(current.tp || 0);

  // Build daily forecasts (BMKG gives 3-hourly, group by day)
  const dailyForecasts = buildDailyForecasts(allForecasts);

  return {
    location: {
      name: location.name,
      lat: location.lat,
      lon: location.lon,
      province: location.province,
    },
    current: {
      temperature: Number(current.t || 28),
      humidity: Number(current.hu || 80),
      rainfall: rainfall,
      windSpeed: Number(current.ws || 0),
      weatherCode,
      weatherDesc: weatherInfo.desc,
      weatherIcon: weatherInfo.icon,
      timestamp: String(current.local_datetime || new Date().toISOString()),
    },
    forecast: dailyForecasts,
    rainfallIntensity: getRainfallIntensity(rainfall),
    climaticCondition: getClimaticCondition(rainfall),
  };
}

function buildDailyForecasts(
  forecasts: Array<Record<string, unknown>>
): BMKGForecastDay[] {
  const dayMap = new Map<string, Array<Record<string, unknown>>>();

  forecasts.forEach((f) => {
    const datetime = String(f.local_datetime || "");
    const date = datetime.split(" ")[0] || datetime.split("T")[0];
    if (date) {
      if (!dayMap.has(date)) dayMap.set(date, []);
      dayMap.get(date)!.push(f);
    }
  });

  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  const result: BMKGForecastDay[] = [];
  dayMap.forEach((dayForecasts, date) => {
    const temps = dayForecasts.map((f) => Number(f.t || 28));
    const rainfalls = dayForecasts.map((f) => Number(f.tp || 0));
    const humidities = dayForecasts.map((f) => Number(f.hu || 80));

    const d = new Date(date);
    const weatherCode = String(dayForecasts[6]?.weather_code || dayForecasts[0]?.weather_code || "0");

    result.push({
      date,
      dayName: dayNames[d.getDay()],
      maxTemp: Math.max(...temps),
      minTemp: Math.min(...temps),
      rainfall: Math.max(...rainfalls),
      humidity: Math.round(humidities.reduce((a, b) => a + b, 0) / humidities.length),
      weatherCode,
      weatherDesc: getWeatherInfo(weatherCode).desc,
    });
  });

  return result.slice(0, 7); // Return max 7 days
}

/**
 * FALLBACK DATA — digunakan jika BMKG API tidak tersedia
 * Data berdasarkan rata-rata klimatologi kawasan Lebak, Banten
 */
export function generateFallbackWeather(location: BMKGLocation): BMKGWeatherData {
  const month = new Date().getMonth() + 1;

  // Monthly climatological averages for Lebak, Banten
  const monthlyClimate: Record<number, { rainfall: number; temp: number; humidity: number }> = {
    1: { rainfall: 35, temp: 27, humidity: 88 },
    2: { rainfall: 30, temp: 27, humidity: 86 },
    3: { rainfall: 25, temp: 28, humidity: 84 },
    4: { rainfall: 20, temp: 29, humidity: 82 },
    5: { rainfall: 12, temp: 29, humidity: 78 },
    6: { rainfall: 8, temp: 28, humidity: 75 },
    7: { rainfall: 5, temp: 27, humidity: 72 },
    8: { rainfall: 6, temp: 27, humidity: 70 },
    9: { rainfall: 10, temp: 28, humidity: 75 },
    10: { rainfall: 18, temp: 28, humidity: 80 },
    11: { rainfall: 28, temp: 28, humidity: 85 },
    12: { rainfall: 38, temp: 27, humidity: 88 },
  };

  const climate = monthlyClimate[month] || monthlyClimate[1];
  const weatherCode = climate.rainfall > 20 ? "63" : climate.rainfall > 8 ? "60" : "1";
  const weatherInfo = getWeatherInfo(weatherCode);

  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const forecast: BMKGForecastDay[] = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const variation = Math.random() * 6 - 3;
    return {
      date: d.toISOString().split("T")[0],
      dayName: dayNames[d.getDay()],
      maxTemp: Math.round(climate.temp + 2 + variation),
      minTemp: Math.round(climate.temp - 3 + variation),
      rainfall: Math.max(0, Math.round(climate.rainfall + variation * 2)),
      humidity: Math.min(100, Math.round(climate.humidity + variation)),
      weatherCode,
      weatherDesc: weatherInfo.desc,
    };
  });

  return {
    location: {
      name: location.name,
      lat: location.lat,
      lon: location.lon,
      province: location.province,
    },
    current: {
      temperature: climate.temp,
      humidity: climate.humidity,
      rainfall: climate.rainfall,
      windSpeed: 12,
      weatherCode,
      weatherDesc: weatherInfo.desc,
      weatherIcon: weatherInfo.icon,
      timestamp: new Date().toISOString(),
    },
    forecast,
    rainfallIntensity: getRainfallIntensity(climate.rainfall),
    climaticCondition: "Normal",
  };
}
