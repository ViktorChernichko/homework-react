import {DataFetcher} from "../components/DataFetcher.jsx";
import {useTheCatsApi} from "./useTheCatsApi.hook.js";


export default function AdvancedTheCatApiComponent() {
    // 1. Вся логіка схована в один рядок
    const { cats, isLoading, error } = useTheCatsApi();

    // 2. Всі перевірки сховані в компоненту DataFetcher
    return (
        <div className="cats-page">
            <h1>The Cats</h1>

            <DataFetcher isLoading={isLoading} error={error}>
                <ul>
                    {cats.map(cat => (
                        <li key={cat.id}>
                            <img src={cat.url} alt="Cat" width="200" />
                        </li>
                    ))}
                </ul>
            </DataFetcher>
        </div>
    );
}