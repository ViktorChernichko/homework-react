import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUsersList } from '../hooks/useUsersList.js';
import { fetchUserDelete } from '../api/fetchUserDelete.js';

export const UsersListComponent = () => {
    const {
        users,
        isLoading,
        error,
        page,
        setPage,
        limit,
        setLimit,
        refresh
    } = useUsersList();

    const [deletingId, setDeletingId] = useState(null);
    const [deleteError, setDeleteError] = useState(null);

    const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setPage((prev) => prev + 1);
    const handleLimitChange = (e) => setLimit(Number(e.target.value));

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm('Видалити цього користувача?');
        if (!isConfirmed) return;

        setDeletingId(id);
        setDeleteError(null);
        try {
            await fetchUserDelete(id);
            await refresh();
        } catch (err) {
            setDeleteError(err.message || 'Не вдалося видалити користувача');
        } finally {
            setDeletingId(null);
        }
    };

    if (error) return <div style={{ color: 'red' }}>Помилка: {error}</div>;

    return (
        <div className="users-page">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Список користувачів</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={refresh} disabled={isLoading}>🔄 Оновити</button>
                    <Link to="new" style={{ textDecoration: 'none' }}>
                        <button style={{ background: 'green', color: 'white' }}>+ Створити</button>
                    </Link>
                </div>
            </header>

            {deleteError && (
                <div style={{ color: 'red', background: '#ffe6e6', padding: '10px', marginBottom: '15px', borderRadius: '4px' }}>
                    Помилка: {deleteError}
                </div>
            )}

            <div style={{ opacity: isLoading ? 0.5 : 1, transition: '0.3s' }}>
                <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ім'я</th>
                        <th>Email</th>
                        <th width="220">Дії</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>
                                    <Link to={`${user.id}`} style={{ fontWeight: 'bold' }}>{user.name}</Link>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '5px' }}>
                                        <Link to={`${user.id}/edit`}>
                                            <button>✏️ Ред.</button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            disabled={deletingId === user.id}
                                            style={{ background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}
                                        >
                                            {deletingId === user.id ? '...' : '🗑️ Вид.'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>
                                {isLoading ? 'Завантаження...' : 'Користувачів не знайдено'}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <footer style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#f5f5f5' }}>

                <div>
                    <span>Показувати по: </span>
                    <select value={limit} onChange={handleLimitChange} disabled={isLoading}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button onClick={handlePrevPage} disabled={page === 1 || isLoading}>
                        ← Назад
                    </button>

                    <span style={{ fontWeight: 'bold' }}>Сторінка {page}</span>

                    <button
                        onClick={handleNextPage}
                        disabled={users.length < limit || isLoading}
                    >
                        Вперед →
                    </button>
                </div>
            </footer>
        </div>
    );
};
