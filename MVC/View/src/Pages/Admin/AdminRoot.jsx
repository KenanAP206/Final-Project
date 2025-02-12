// Pages/Admin/AdminRoot.jsx
import { Admin, Resource, fetchUtils } from 'react-admin';
import { UserList} from './UsersPage/Users';
import UserEdit from './EditPage/UserEdit.jsx'
import UserCreate from './CreatePage/UserCreate';
import { ShowList } from './ShowsPage/Shows';
import ShowEdit from './EditPage/ShowsEdit'
import ShowCreate from './CreatePage/ShowsCreate.jsx'
import Dashboard from './Dashboard';
import MovieIcon from '@mui/icons-material/Movie'; // Material UI icon

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = {
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
        try {
            const { ids } = params;
            const response = await httpClient(`http://localhost:3000/${resource}`, {
                method: 'DELETE',
                body: JSON.stringify({ ids }), // Send as JSON in request body
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
            });
            return { data: ids };
        } catch (error) {
            console.error('DeleteMany Error:', error);
            throw error;
        }
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
};

const authProvider = {
    login: () => Promise.resolve(),
    logout: () => {
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getLoginUrl: () => '/login',
    getDashboardUrl: () => '/admin'
};

const AdminRoot = () => (
    <Admin 
        dashboard={Dashboard}
        dataProvider={dataProvider}
        authProvider={authProvider}
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
);

export default AdminRoot;