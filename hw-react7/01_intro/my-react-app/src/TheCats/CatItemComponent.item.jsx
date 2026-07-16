import logger from "../utils/logger.js";

export default function CatItemComponent({cat}) {
    return(
        <li>
            <img src={cat.url} alt="Cat" width="200" />
        </li>
    )
}