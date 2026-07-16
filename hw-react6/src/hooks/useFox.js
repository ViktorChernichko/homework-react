import { useEffect, useState } from "react";
import { fetchRandomFox } from "../api/foxes.api";

export function useFox() {
  const [foxUrl, setFoxUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const refetch = async () => {
    try {
      setIsLoading(true);
      setError("");

      const data = await fetchRandomFox();

      setFoxUrl(data.image);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return {
    foxUrl,
    isLoading,
    error,
    refetch,
  };
}