const BASE_URL = 'https://api.thecatapi.com/v1/images/search';

export const fetchCatsList = async (limit = 1) => {
    const response = await fetch(`${BASE_URL}?limit=${limit}`);

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
};