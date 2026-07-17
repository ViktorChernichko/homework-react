import {usePageTitle} from "../../hooks/usePageTitle.js";
import RandomCatComponent from "../../components/CatsComponents/RandomCatComponent.jsx";

export default function CatsPage(){

    usePageTitle('Cats Page');

    return(
        <div>
            <h1>Cats Page</h1>
            <p>This is the cats page content.</p>
            <RandomCatComponent />
        </div>
    )
}