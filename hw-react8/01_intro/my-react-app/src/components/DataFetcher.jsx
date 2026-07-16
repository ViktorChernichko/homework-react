
export const DataFetcher = ({ isLoading, error, children }) => {
    if (isLoading) {
        return <div className="loader">⏳ Завантаження котиків...</div>;
    }

    if (error) {
        return <div className="error">🚨 Помилка: {error.message}</div>;
    }

    // Якщо все добре — показуємо те, що всередині (children)
    return <>{children}</>;
};