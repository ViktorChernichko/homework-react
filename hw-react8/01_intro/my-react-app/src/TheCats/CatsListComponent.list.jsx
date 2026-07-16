import {DataFetcher} from "../components/DataFetcher.jsx";
import {useTheCatsApi} from "./useTheCatsApi.hook.js";
import CatItemComponent from "./CatItemComponent.item.jsx";


export default function CatsListComponentList() {
    // 1. Вся логіка схована в один рядок
    const { cats, isLoading, error } = useTheCatsApi();

    // 2. Всі перевірки сховані в компоненту DataFetcher
    return (
        <div className="cats-page">
            <h1>The Cats</h1>

            <div data-testid="cats-list-container"> Some Html Element</div>

            <DataFetcher isLoading={isLoading} error={error}>
                <ul>
                    {cats.map(cat => (
                        <CatItemComponent key={cat.id} cat={cat} />
                    ))}
                </ul>
            </DataFetcher>
        </div>
    );
}