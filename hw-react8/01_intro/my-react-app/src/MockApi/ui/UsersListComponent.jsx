import {useEffect, useState} from "react";
import {useRenderLogger} from "../../hooks/useRenderLogger.js";
import {MOCK_API_USERS_URL} from "../config.js";
import logger from "../../utils/logger.js";

export default function UsersListComponent() {

    useRenderLogger('UsersListComponent')
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [users, setUsers] = useState([]);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [selectedUser, setSelectedUser] = useState(null);
    const [currentAction, setCurrentAction] = useState('all'); 

    const [formData, setFormData] = useState({name: '', email: ''});
    const [isSaving, setIsSaving] = useState(false);
    const [formError, setFormError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const url = new URL(MOCK_API_USERS_URL);
        url.searchParams.append('page', page);
        url.searchParams.append('limit', limit);
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Ошибка сервера');
                const totalCount = response.headers.get('X-Total-Count');
                logger.log('Total:', totalCount);
                return response.json()
            })
            .then(data => {
                setUsers(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                logger.error('Error fetching users data:', error);
                setIsLoading(false);
            })
    }, [page, limit])

    const nextPage = () => {
        if (users.length < limit) return;
        setPage(page + 1);
    }
    const prevPage = () => {
        if (page < 2) return;
        setPage(page - 1);
    }

    const changeLimit = (e) => {
        setPage(1);
        setLimit(Number(e.target.value));
    }

    const deleteUser = (id) => {
        fetch(`${MOCK_API_USERS_URL}/${id}`, {method: 'DELETE'})
            .then(() => {
                setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
                logger.log('User deleted:', id);
            })
            .catch(error => {
                logger.error('Error deleting user:', error);
            })
    }


    const handleShow = (id) => {
        setSelectedUser(users.find(user => user.id === id));
        setCurrentAction('show');
        console.log('Show user:', id);
    }

    const handleClose = () => {
        setSelectedUser(null);
        setFormData({name: '', email: ''});
        setFormError(null);
        setCurrentAction('all');
    }

    const handleEdit = (id) => {
        const user = users.find(user => user.id === id);
        setSelectedUser(user);
        setFormData({name: user.name ?? '', email: user.email ?? ''});
        setFormError(null);
        setCurrentAction('edit');
        console.log('Edit user:', id);
    }

    const handleCreate = () => {
        setSelectedUser(null);
        setFormData({name: '', email: ''});
        setFormError(null);
        setCurrentAction('create');
    }

    const handleFormChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    }

    const validateForm = () => {
        if (!formData.name.trim()) return "Ім'я обов'язкове";
        if (!formData.email.trim()) return "Email обов'язковий";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Некоректний email";
        return null;
    }

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setFormError(validationError);
            return;
        }

        setIsSaving(true);
        fetch(`${MOCK_API_USERS_URL}/${selectedUser.id}`, {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) throw new Error('Не вдалося оновити користувача');
                return response.json();
            })
            .then(updatedUser => {
                setUsers(prevUsers => prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
                logger.log('User updated:', updatedUser.id);
                setIsSaving(false);
                handleClose();
            })
            .catch(error => {
                logger.error('Error updating user:', error);
                setFormError(error.message);
                setIsSaving(false);
            })
    }

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setFormError(validationError);
            return;
        }

        setIsSaving(true);
        fetch(MOCK_API_USERS_URL, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) throw new Error('Не вдалося створити користувача');
                return response.json();
            })
            .then(newUser => {
                setUsers(prevUsers => [newUser, ...prevUsers]);
                logger.log('User created:', newUser.id);
                setIsSaving(false);
                handleClose();
            })
            .catch(error => {
                logger.error('Error creating user:', error);
                setFormError(error.message);
                setIsSaving(false);
            })
    }

    if (isLoading) {
        return <>Loading...</>;
    }
    if (error) {
        return <>Error: {error.message}</>;
    }

    if (currentAction === 'show') return (<>
            <h1>User Details</h1>
            <div>Id: {selectedUser.id}</div>
            <div>Name: {selectedUser.name}</div>
            <div>Email: {selectedUser.email}</div>
            <button onClick={handleClose}>Close</button>
        </>);

    if (currentAction === 'edit' || currentAction === 'create') return (<>
            <h1>{currentAction === 'edit' ? 'Edit user' : 'Create user'}</h1>
            <form onSubmit={currentAction === 'edit' ? handleUpdateSubmit : handleCreateSubmit}>
                <div>
                    <input type="text"
                           name="name"
                           value={formData.name}
                           onChange={handleFormChange}
                           placeholder="Name"/>
                </div>
                <br/>
                <div>
                    <input type="email"
                           name="email"
                           value={formData.email}
                           onChange={handleFormChange}
                           placeholder="Email"/>
                </div>
                <br/>
                {formError && <div style={{color: "red"}}>{formError}</div>}
                <button type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save'}</button>
                <button type="button" onClick={handleClose}>Cancel</button>
            </form>
        </>);

    if (currentAction === 'all') return (<>
            <h1>Users List</h1>
            <div>
                <a href="#" onClick={prevPage}>Prev</a> | {page} |
                <a href="#" onClick={nextPage}>Next</a>
                <select value={limit} onChange={changeLimit}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </div>
            <div>
                <button onClick={handleCreate}>+ Add user</button>
            </div>
            <ul>
                {users.map((user, index) => (<li key={user.id}>{user.name}
                        &#9745; ==&gt;
                        | <a href="#" onClick={() => handleShow(user.id)}> Show </a>
                        | <a href="#" onClick={() => handleEdit(user.id)}> Edit </a>
                        | <a href="#" onClick={() => deleteUser(user.id)}>Delete</a></li>))}
            </ul>
        </>);
}
