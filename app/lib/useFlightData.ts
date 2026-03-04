import { useState, useCallback } from "react";
import type { Flight, AirportCode, Direction } from "./types";

interface FlightData {
  flights: Flight[];
  loading: boolean;
  error: string | null;
  cachedAt: string | null;
  fetchFlights: (airport: AirportCode, direction: Direction) => Promise<void>;
}

export function useFlightData(): FlightData {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cachedAt, setCachedAt] = useState<string | null>(null);

  const fetchFlights = useCallback(
    async (airport: AirportCode, direction: Direction) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/flights?airport=${airport}&direction=${direction}`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || `Request failed (${res.status})`);
        }

        setFlights(data.flights);
        setCachedAt(data.cachedAt);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load flights";
        setError(message);
        setFlights([]);
        setCachedAt(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { flights, loading, error, cachedAt, fetchFlights };
}
