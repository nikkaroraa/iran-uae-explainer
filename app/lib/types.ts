export interface NewsArticle {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

export interface Flight {
  flight_iata: string;
  airline_iata: string;
  dep_iata: string;
  arr_iata: string;
  status: string;
  dep_time: string | null;
  arr_time: string | null;
  dep_terminal: string | null;
  arr_terminal: string | null;
  dep_gate: string | null;
  arr_gate: string | null;
  delayed: number | null;
  duration: number | null;
}

export type AirportCode = "DXB" | "SHJ" | "AUH" | "MCT";
export type Direction = "arrivals" | "departures";

export interface FlightApiResponse {
  flights: Flight[];
  cachedAt: string;
  airport: AirportCode;
  direction: Direction;
}
