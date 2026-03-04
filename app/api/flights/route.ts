import { NextRequest, NextResponse } from "next/server";
import type { AirportCode, Direction, Flight } from "@/app/lib/types";

const VALID_AIRPORTS: AirportCode[] = ["DXB", "SHJ", "AUH", "MCT"];
const VALID_DIRECTIONS: Direction[] = ["arrivals", "departures"];
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

interface CacheEntry {
  flights: Flight[];
  cachedAt: string;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

// ─── Mock data (swap for real API when key is available) ───
const AIRLINES = ["EK", "FZ", "EY", "WY", "QR", "SV", "AI", "BA", "LH", "TK"];
const CITIES: Record<AirportCode, string[]> = {
  DXB: ["LHR", "JFK", "BOM", "DEL", "CAI", "IST", "FRA", "SIN", "BKK", "KHI", "MCT", "BAH", "KWI", "RUH"],
  SHJ: ["DEL", "KHI", "LKO", "DAC", "KTM", "CMB", "MCT", "BAH", "IST", "CAI"],
  AUH: ["LHR", "CDG", "JFK", "SIN", "BKK", "SYD", "ICN", "NRT", "MCT", "BAH", "RUH", "CAI"],
  MCT: ["DXB", "AUH", "DOH", "BAH", "KWI", "LHR", "BOM", "DEL", "KHI", "CAI"],
};
const STATUSES = ["scheduled", "scheduled", "scheduled", "active", "landed", "delayed", "cancelled"];

function generateMockFlights(airport: AirportCode, direction: Direction): Flight[] {
  const cities = CITIES[airport];
  const count = 12 + Math.floor(Math.random() * 8);
  const now = new Date();

  return Array.from({ length: count }, (_, i) => {
    const airline = AIRLINES[Math.floor(Math.random() * AIRLINES.length)];
    const flightNum = 100 + Math.floor(Math.random() * 900);
    const city = cities[Math.floor(Math.random() * cities.length)];
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
    const hourOffset = -2 + Math.floor(i * 0.8);
    const time = new Date(now.getTime() + hourOffset * 60 * 60 * 1000);
    const timeStr = time.toISOString().slice(0, 19).replace("T", " ");
    const terminals = ["1", "2", "3"];
    const terminal = terminals[Math.floor(Math.random() * terminals.length)];
    const gate = `${String.fromCharCode(65 + Math.floor(Math.random() * 4))}${Math.floor(Math.random() * 30) + 1}`;

    return {
      flight_iata: `${airline}${flightNum}`,
      airline_iata: airline,
      dep_iata: direction === "departures" ? airport : city,
      arr_iata: direction === "departures" ? city : airport,
      status,
      dep_time: timeStr,
      arr_time: timeStr,
      dep_terminal: terminal,
      arr_terminal: terminal,
      dep_gate: gate,
      arr_gate: gate,
      delayed: status === "delayed" ? (Math.floor(Math.random() * 6) + 1) * 15 : null,
      duration: 120 + Math.floor(Math.random() * 600),
    };
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const airport = searchParams.get("airport")?.toUpperCase() as AirportCode;
  const direction = searchParams.get("direction") as Direction;

  if (!airport || !VALID_AIRPORTS.includes(airport)) {
    return NextResponse.json(
      { error: "Invalid airport. Use DXB, SHJ, AUH, or MCT." },
      { status: 400 }
    );
  }

  if (!direction || !VALID_DIRECTIONS.includes(direction)) {
    return NextResponse.json(
      { error: "Invalid direction. Use arrivals or departures." },
      { status: 400 }
    );
  }

  const cacheKey = `${airport}-${direction}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json({
      flights: cached.flights,
      cachedAt: cached.cachedAt,
      airport,
      direction,
    });
  }

  const apiKey = process.env.AIRLABS_API_KEY;
  const useMock = !apiKey || apiKey === "your_api_key_here";

  let flights: Flight[];

  if (useMock) {
    // Use mock data when no API key is configured
    flights = generateMockFlights(airport, direction);
  } else {
    try {
      const depArr = direction === "departures" ? "dep_iata" : "arr_iata";
      const url = `https://airlabs.co/api/v9/schedules?${depArr}=${airport}&api_key=${apiKey}`;

      const res = await fetch(url, { cache: "no-store" });

      if (!res.ok) {
        throw new Error(`AirLabs API returned ${res.status}`);
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error.message || "AirLabs API error");
      }

      flights = (data.response || [])
        .slice(0, 50)
        .map((f: Record<string, unknown>) => ({
          flight_iata: f.flight_iata || "N/A",
          airline_iata: f.airline_iata || "",
          dep_iata: f.dep_iata || "",
          arr_iata: f.arr_iata || "",
          status: f.status || "unknown",
          dep_time: f.dep_time || null,
          arr_time: f.arr_time || null,
          dep_terminal: f.dep_terminal || null,
          arr_terminal: f.arr_terminal || null,
          dep_gate: f.dep_gate || null,
          arr_gate: f.arr_gate || null,
          delayed: typeof f.delayed === "number" ? f.delayed : null,
          duration: typeof f.duration === "number" ? f.duration : null,
        }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      return NextResponse.json({ error: message }, { status: 502 });
    }
  }

  const cachedAt = new Date().toISOString();
  cache.set(cacheKey, { flights, cachedAt, timestamp: Date.now() });

  return NextResponse.json({ flights, cachedAt, airport, direction });
}
