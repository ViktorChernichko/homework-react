import { useState, useEffect } from 'react';
import { fetchUserGetById } from '../api/fetchUserGetById.js';

export const useUserDetails = (id) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadUser();
    }, [id]);

    const loadUser = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchUserGetById(id);
            setUser(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { user, isLoading, error, refresh: loadUser };
};
