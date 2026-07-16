import {useEffect, useState} from "react";

/**
 * TheCatsComponent - приклад компонента, який завантажує дані з API
 * Цей компонент демонструє роботу з хуками useState та useEffect.
 */
const TheCatsComponent = () => {

    // API_KEY необхідний для авторизації запитів до сервісу TheCatAPI
    const API_KEY = 'live_Bip3QFifh4niz1I8JHRfvGnT0qTeNzh3xISBP1csVEK6uvdJNPAzk3g0vqIM7vu5';

    // Стан для зберігання масиву котиків, отриманих з сервера
    const [cats, setCats] = useState([]);
    
    // Стан для відстеження процесу завантаження (щоб показати "Loading...")
    const [isLoading, setIsLoading] = useState(true);
    
    // Стан для збереження помилки, якщо запит не вдався
    const [error, setError] = useState(null);
    
    // Стан для збереження кількості фотографій, яку ми хочемо завантажити
    const [limit, setLimit] = useState(2);

    /**
     * Функція для виконання запиту до API.
     * Використовує вбудовану в браузер функцію fetch().
     */
    const fetchCats = () => {
        if (limit <= 0) {
            setLimit(1);
            return;
        }
        setIsLoading(true); // Починаємо завантаження - вмикаємо індикатор
        fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}&api_key=${API_KEY}`)
            .then(response => response.json()) // Перетворюємо відповідь сервера у формат JSON (об'єкт JS)
            .then(data => setCats(data))       // Зберігаємо отримані дані у стан cats
            .catch(error => setError(error))   // Якщо виникла помилка - зберігаємо її
            .finally(() => setIsLoading(false)) // В будь-якому випадку вимикаємо індикатор завантаження в кінці
    }

    /**
     * useEffect - хук для виконання побічних дій (side effects), таких як завантаження даних.
     * Він спрацьовує кожного разу, коли змінюється значення у масиві залежностей [limit].
     */
    useEffect(() => {
        fetchCats()
    }, [limit]) // Масив залежностей: якщо limit зміниться, useEffect запустить fetchCats знову

    // Умовний рендеринг: якщо є помилка - показуємо текст помилки
    if (error) return <div>Помилка: {error.message || "Щось пішло не так"}</div>;
    
    // Умовний рендеринг: поки дані завантажуються - показуємо індикатор
    if (isLoading) return <div>Завантаження...</div>;

    // Основний рендеринг компонента
    return(<div>
        <h1> Котики завантажились</h1>
        
        {/* Поле вводу для зміни кількості котиків. e.target.value завжди рядок, тому перетворюємо в Number */}
        <label>Кількість котиків: </label>
        <input 
            type="number" 
            value={limit} 
            onChange={(e) => setLimit(Number(e.target.value))}
        />
        
        <ul>
            {/* Використовуємо метод map для перетворення масиву об'єктів у список JSX елементів */}
            {/* Не забуваємо про унікальний key для кожного елемента списку */}
            {cats.map(cat => (
                <li key={cat.id}>
                    <img src={cat.url} alt="Котик" width="200" height="200" style={{objectFit: 'cover'}} />
                </li>
            ))}
        </ul>
    </div>)

}

export default TheCatsComponent