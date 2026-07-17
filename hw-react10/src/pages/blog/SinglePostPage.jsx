import {useParams} from "react-router-dom";

export default function SinglePostPage(){

    const { slug } = useParams();

    return(
        <div>
            <h1> Page for slug : {slug}</h1>
        </div>
    )
}