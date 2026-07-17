import { useParams, useNavigate, Link } from 'react-router-dom';
import { useUserDetails } from '../hooks/useUserDetails.js';
import { fetchUserDelete } from '../api/fetchUserDelete.js';
import { useState } from 'react';

export default function UserDetailsComponent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isLoading, error } = useUserDetails(id);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    const handleDelete = async () => {
        const isConfirmed = window.confirm('Видалити цього користувача?');
        if (!isConfirmed) return;

        setIsDeleting(true);
        setDeleteError(null);
        try {
            await fetchUserDelete(id);
            navigate('/users');
        } catch (err) {
            setDeleteError(err.message || 'Не вдалося видалити користувача');
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) return <div>Завантаження...</div>;
    if (error) return <div style={{ color: 'red' }}>Помилка: {error}</div>;
    if (!user) return <div>Користувача не знайдено</div>;

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <img
                    src={user.avatar || 'https://via.placeholder.com/150'}
                    alt="Аватар"
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: `4px solid ${user.color || '#ffffff'}`
                    }}
                />
                <div>
                    <h2 style={{ margin: 0 }}>{user.name}</h2>
                    <p style={{ margin: '5px 0', color: '#666' }}>{user.email}</p>
                </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <tbody>
                <tr>
                    <td style={{ padding: '8px', fontWeight: 'bold' }}>ID</td>
                    <td style={{ padding: '8px' }}>{user.id}</td>
                </tr>
                <tr>
                    <td style={{ padding: '8px', fontWeight: 'bold' }}>Телефон</td>
                    <td style={{ padding: '8px' }}>{user.phone || '—'}</td>
                </tr>
                <tr>
                    <td style={{ padding: '8px', fontWeight: 'bold' }}>Країна</td>
                    <td style={{ padding: '8px' }}>{user.country || '—'}</td>
                </tr>
                <tr>
                    <td style={{ padding: '8px', fontWeight: 'bold' }}>Улюблений колір</td>
                    <td style={{ padding: '8px' }}>{user.color || '—'}</td>
                </tr>
                {user.createdAt && (
                    <tr>
                        <td style={{ padding: '8px', fontWeight: 'bold' }}>Створено</td>
                        <td style={{ padding: '8px' }}>{new Date(user.createdAt).toLocaleString()}</td>
                    </tr>
                )}
                </tbody>
            </table>

            {deleteError && (
                <div style={{ color: 'red', background: '#ffe6e6', padding: '10px', marginBottom: '15px', borderRadius: '4px' }}>
                    Помилка: {deleteError}
                </div>
            )}

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <Link to="/users">
                    <button type="button" style={{ padding: '10px 20px', background: '#ccc', border: 'none', cursor: 'pointer' }}>
                        Назад до списку
                    </button>
                </Link>

                <Link to={`/users/${id}/edit`}>
                    <button type="button" style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
                        Редагувати
                    </button>
                </Link>

                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    style={{
                        padding: '10px 20px',
                        background: isDeleting ? '#888' : '#dc3545',
                        color: 'white',
                        border: 'none',
                        cursor: isDeleting ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isDeleting ? 'Видалення...' : 'Видалити'}
                </button>
            </div>
        </div>
    );
}
