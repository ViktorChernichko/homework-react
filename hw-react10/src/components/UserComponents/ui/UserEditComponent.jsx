import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserFormComponent } from './UserFormComponent.jsx';
import { fetchUserUpdate } from '../api/fetchUserUpdate.js';
import { useUserDetails } from '../hooks/useUserDetails.js';

export default function UserEditComponent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isLoading: isUserLoading, error: loadError } = useUserDetails(id);

    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);

    const handleUpdateUser = async (formData) => {
        setIsSaving(true);
        setSaveError(null);

        try {
            await fetchUserUpdate(id, formData);
            navigate(`/users/${id}`);
        } catch (err) {
            setSaveError(err.message || 'Не вдалося оновити користувача');
        } finally {
            setIsSaving(false);
        }
    };

    if (isUserLoading) return <div style={{ padding: '20px' }}>Завантаження...</div>;
    if (loadError) return <div style={{ padding: '20px', color: 'red' }}>Помилка: {loadError}</div>;
    if (!user) return <div style={{ padding: '20px' }}>Користувача не знайдено</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Редагування користувача</h1>

            {saveError && (
                <div style={{
                    color: 'red',
                    background: '#ffe6e6',
                    padding: '10px',
                    marginBottom: '15px',
                    borderRadius: '4px'
                }}>
                    Помилка: {saveError}
                </div>
            )}

            <UserFormComponent
                initialData={user}
                onSubmit={handleUpdateUser}
                isLoading={isSaving}
            />
        </div>
    );
}
