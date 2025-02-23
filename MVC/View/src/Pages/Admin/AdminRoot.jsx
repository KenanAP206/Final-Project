import { Admin, Resource, fetchUtils, radiantLightTheme, radiantDarkTheme, Login,  } from 'react-admin';
import { UserList } from './UsersPage/Users';
import UserEdit from './EditPage/UserEdit.jsx'
import UserCreate from './CreatePage/UserCreate';
import { ShowList } from './ShowsPage/Shows';
import ShowEdit from './EditPage/ShowsEdit'
import ShowCreate from './CreatePage/ShowsCreate.jsx'
import Dashboard from './Dashboard';
import MovieIcon from '@mui/icons-material/Movie'; 
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const createHttpClient = () => (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    if (token) {
        options.headers.set('Authorization', `Bearer ${token}`);
    }
    return fetchUtils.fetchJson(url, options);
};

const createDataProvider = (httpClient) => ({
    getList: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const url = `http://localhost:3000/${resource}?page=${page}&limit=${perPage}&sortBy=${field}&order=${order}`;
        const { json } = await httpClient(url);
        return {
            data: json.data.map(item => ({
                ...item,
                id: item._id
            })),
            total: json.total
        };
    },
    getOne: async (resource, params) => {
        const url = `http://localhost:3000/${resource}/${params.id}`;
        const { json } = await httpClient(url);
        return {
            data: { ...json.data, id: json.data._id }
        };
    },
    update: async (resource, params) => {
        const url = `http://localhost:3000/${resource}/${params.id}`;
        const { json } = await httpClient(url, {
            method: 'PUT',
            body: JSON.stringify(params.data)
        });
        return {
            data: { ...json.data, id: json.data._id }
        };
    },
    create: async (resource, params) => {
        const url = `http://localhost:3000/${resource}`;
        const { json } = await httpClient(url, {
            method: 'POST',
            body: JSON.stringify(params.data)
        });
        return {
            data: { ...json.data, id: json.data._id }
        };
    },
    delete: async (resource, params) => {
        const url = `http://localhost:3000/${resource}/${params.id}`;
        const { json } = await httpClient(url, {
            method: 'DELETE'
        });
        return { data: json.data };
    },
    deleteMany: async (resource, params) => {
        const { ids } = params;
        await httpClient(`http://localhost:3000/${resource}`, {
            method: 'DELETE',
            body: JSON.stringify({ ids }),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        });
        return { data: ids };
    },
    getMany: async (resource, params) => {
        const { ids } = params;
        const responses = await Promise.all(
            ids.map(id =>
                httpClient(`http://localhost:3000/${resource}/${id}`)
            )
        );
        return {
            data: responses.map(({ json }) => ({
                ...json.data,
                id: json.data._id
            }))
        };
    }
});

const authProvider = {
    login: async ({ username, password }) => {
        try {
            const loginResponse = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                body: JSON.stringify({ email: username, password }),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            });

            const loginData = await loginResponse.json();

            if (!loginData.success) {
                throw new Error('Login failed');
            }

            const confirmationCode = prompt('Lütfen email adresinize gönderilen onay kodunu giriniz:');

            if (!confirmationCode) {
                throw new Error('Onay kodu gerekli');
            }

            const confirmResponse = await fetch('http://localhost:3000/users/confirm', {
                method: 'POST',
                body: JSON.stringify({ confirmPassword: confirmationCode }),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            });

            const confirmData = await confirmResponse.json();

            if (!confirmData.token) {
                throw new Error('Onaylama başarısız');
            }

            if (confirmData.user.role !== 'admin') {
                throw new Error('Bu giriş sadece adminler içindir!');
            }

            localStorage.setItem('token', confirmData.token);
            localStorage.setItem('admin', 'true');
            localStorage.setItem('permissions', JSON.stringify({
                role: confirmData.user.role
            }));

            return Promise.resolve();
        } catch (error) {
            console.error('Login error:', error);
            return Promise.reject(error);
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('admin', 'true');
        localStorage.removeItem('permissions');
        return Promise.resolve();
    },
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getPermissions: () => Promise.resolve(),
};

const ConfirmationModal = ({ open, onClose, onConfirm }) => {
    const [code, setCode] = useState('');

    const handleSubmit = () => {
        onConfirm(code);
        setCode('');
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>İki Faktörlü Doğrulama</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Onay Kodu"
                    type="text"
                    fullWidth
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter the code sent to your email"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    İptal
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Onayla
                </Button>
            </DialogActions>
        </Dialog>
    );
};


const AdminRoot = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [loginCredentials, setLoginCredentials] = useState(null);

    const httpClient = createHttpClient();
    const dataProvider = createDataProvider(httpClient);

    const customAuthProvider = {
        ...authProvider,
        login: async (params) => {
            try {
                const loginResponse = await fetch('http://localhost:3000/users/login', {
                    method: 'POST',
                    body: JSON.stringify({ email: params.username, password: params.password }),
                    headers: new Headers({ 'Content-Type': 'application/json' }),
                });

                const loginData = await loginResponse.json();

                if (!loginData.success) {
                    throw new Error('Login failed');
                }

                setLoginCredentials(params);
                setShowConfirmation(true);

                return new Promise((resolve, reject) => {
                    window.confirmLogin = async (confirmationCode) => {
                        try {
                            const confirmResponse = await fetch('http://localhost:3000/users/confirm', {
                                method: 'POST',
                                body: JSON.stringify({ confirmPassword: confirmationCode }),
                                headers: new Headers({ 'Content-Type': 'application/json' }),
                            });

                            const confirmData = await confirmResponse.json();

                            if (!confirmData.token) {
                                throw new Error('Error in confirm');
                            }

                            if (confirmData.user.role !== 'admin') {
                                throw new Error('This login only for admins!');
                            }

                            localStorage.setItem('token', confirmData.token);
                            localStorage.setItem('admin', 'true');
                            localStorage.setItem('permissions', JSON.stringify({
                                role: confirmData.user.role
                            }));

                            resolve();
                        } catch (error) {
                            reject(error);
                        }
                    };

                    window.rejectLogin = () => {
                        reject(new Error('Confirm cancelled'));
                    };
                });
            } catch (error) {
                console.error('Login error:', error);
                return Promise.reject(error);
            }
        },
    };

    const handleConfirmation = async (code) => {
        try {
            await window.confirmLogin(code);
            setShowConfirmation(false);
        } catch (error) {
            console.error('Confirmation error:', error);
        }
    };

    return (
        <>
            <Admin
                theme={radiantLightTheme}
                darkTheme={radiantDarkTheme}
                dashboard={Dashboard}
                dataProvider={dataProvider}
                authProvider={customAuthProvider}
                basename="/admin"
          
            >
                <Resource
                    name="users"
                    list={UserList}
                    edit={UserEdit}
                    create={UserCreate}
                />
                <Resource
                    name="shows"
                    list={ShowList}
                    edit={ShowEdit}
                    create={ShowCreate}
                    icon={MovieIcon}
                />
            </Admin>

            <ConfirmationModal
                open={showConfirmation}
                onClose={() => {
                    setShowConfirmation(false);
                    window.rejectLogin();
                }}
                onConfirm={handleConfirmation}
            />
        </>
    );
};

export default AdminRoot;