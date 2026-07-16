// hooks/useCats.js
import { useState, useEffect } from "react";
import { fetchCatsList } from "./fetchCatsList.api.js";

export const useTheCatsApi = () => {
    const [cats, setCats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCatsList()
            .then(data => {
                setCats(prev => [...prev, ...data]);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err);
                setIsLoading(false);
            });
    }, []);

    // Хук повертає об'єкт з даними, як магазин
    return { cats, isLoading, error };
};