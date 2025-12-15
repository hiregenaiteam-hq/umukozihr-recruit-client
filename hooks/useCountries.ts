import { useState, useEffect } from "react";

export interface Country {
  name: {
    common: string;
    official: string;
  };
  flag: string;
  cca2: string;
  cca3: string;
}

interface UseCountriesReturn {
  countries: Country[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useCountries = (): UseCountriesReturn => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flag,cca2,cca3"
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch countries: ${response.status}`);
      }

      const data = await response.json();
      const sortedCountries = data.sort((a: Country, b: Country) =>
        a.name.common.localeCompare(b.name.common)
      );

      setCountries(sortedCountries);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch countries";
      setError(errorMessage);
      console.error("Error fetching countries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return {
    countries,
    loading,
    error,
    refetch: fetchCountries,
  };
};
