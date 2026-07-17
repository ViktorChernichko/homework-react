import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserFormComponent } from './UserFormComponent.jsx';
import { fetchUserCreate } from '../api/fetchUserCreate.js';

export default function UserCreateComponent() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreateUser = async (formData) => {
        setIsLoading(true);
        setError(null);

        try {
            await fetchUserCreate(formData);
            navigate('/users');
        } catch (err) {
            setError(err.message || 'Не вдалося створити користувача');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Створення нового користувача</h1>

            {error && (
                <div style={{
                    color: 'red',
                    background: '#ffe6e6',
                    padding: '10px',
                    marginBottom: '15px',
                    borderRadius: '4px'
                }}>
                    Помилка: {error}
                </div>
            )}

            <UserFormComponent
                onSubmit={handleCreateUser}
                isLoading={isLoading}
            />
        </div>
    );
}
