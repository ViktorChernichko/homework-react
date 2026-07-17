import {MOCK_API_USERS_URL} from "../config.js";

export const fetchUserUpdate = async (id, userData) => {

    const url = new URL(`${MOCK_API_USERS_URL}/${id}`);

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
}
