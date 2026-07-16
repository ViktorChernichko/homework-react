import logger from "../utils/logger.js";
import {useRenderLogger} from "../hooks/useRenderLogger.js";
import {useEffect, useState} from "react";
import {fetchCatsList} from "./fetchCatsList.api.js";

const THE_CATS_API_URL = 'https://api.thecatapi.com/v1/images/search';


export default function TheCatsApiComponent() {
    useRenderLogger('TheCatsApiComponent');

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const [cats, setCats] = useState([]);

    useEffect(() => {

        fetchCatsList()
            .then(data => {
                logger.log(data);
                setCats(prevCats => [...prevCats, ...data]);
                setIsLoading(false);
            })
            .catch(error => {
                logger.error('Error fetching cat data:', error);
                setIsLoading(false);
                setError(error);
            });
    }, []);


    if (isLoading) {
        return <>Loading...</>;
    }

    if (error) {
        return <>Error: {error.message}</>;
    }

    return(
        <>
           <h1> The Cats </h1>
            <ul>
                {cats.map((cat, index) => (
                    <li key={cat.id}>
                        <img src={cat.url} alt="Cat" width="200" />
                    </li>
                ))}
            </ul>
        </>
    )
}


// Зайва функція
//     const fetchCats = () => {
//     fetch(THE_CATS_API_URL + '?limit=10')
//         .then(response => response.json())
//         .then(data => {
//             logger.log(data);
//             setCats(prevCats => [...prevCats, ...data]);
//             // setCats([...cats, ...data]);
//         })
//         .catch(error => {
//             logger.error('Error fetching cat data:', error);
//         });
// }
//     fetchCats();


// Помилка
// const cats = [];
// const rs = await fetch(THE_CATS_API_URL + '?limit=10');
// const data = await rs.json();
// cats.push(...data);
// fetchCats();
