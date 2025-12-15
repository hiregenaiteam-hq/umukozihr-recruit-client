import { useState, useCallback } from "react";
import { City, getCitiesForCountry } from "@/lib/constants/cities";

interface UseCitiesReturn {
  cities: City[];
  loading: boolean;
  error: string | null;
  fetchCities: (countryName: string) => Promise<void>;
  clearCities: () => void;
}

export const useCities = (): UseCitiesReturn => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCities = useCallback(async (countryName: string) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Get cities from constants file
      setCities(getCitiesForCountry(countryName));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch cities";
      setError(errorMessage);
      console.error("Error fetching cities:", err);
      // Fallback to static list
      setCities(getCitiesForCountry(countryName));
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCities = useCallback(() => {
    setCities([]);
    setError(null);
  }, []);

  return {
    cities,
    loading,
    error,
    fetchCities,
    clearCities,
  };
};
