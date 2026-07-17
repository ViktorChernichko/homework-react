import {MOCK_API_USERS_URL} from "../config.js";

export const fetchUserDelete = async (id) => {

    const url = new URL(`${MOCK_API_USERS_URL}/${id}`);

    const response = await fetch(url, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
}
