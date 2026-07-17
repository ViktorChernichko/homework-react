import {useEffect, useState} from "react";
import {fetchCatsList} from "./fetchCatsList.api.js";
import logger from "../../utils/logger.js";

export default function RandomCatComponent() {

    const [cat, setCat] = useState({url: null, alt:null});

    useEffect(() => {
        fetchCatsList(1)
            .then(data=> setCat(data[0]))
            .catch(err=>logger.error(err.message))
    }, []);

    return (
        <>
            <img src={cat.url} alt={cat.id}/>
        </>
    )
}