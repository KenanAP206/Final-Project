// Pages/Admin/AdminRoot.jsx
import { Admin, Resource, fetchUtils } from 'react-admin';
import { UserList } from './UsersPage/Users';
import Dashboard from './Dashboard';
import UserEdit from './EditPage/UserEdit';
import UserCreate from './CreatePage/UserCreate';

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
        
        const { json, headers } = await httpClient(url);
        
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
            data: {
                ...json,
                id: json._id
            }
        };
    },

    create: async (resource, params) => {
        const url = `http://localhost:3000/${resource}`;
        const { json } = await httpClient(url, {
            method: 'POST',
            body: JSON.stringify(params.data)
        });

        return {
            data: {
                ...json,
                id: json._id
            }
        };
    },

    update: async (resource, params) => {
        const url = `http://localhost:3000/${resource}/${params.id}`;
        const { json } = await httpClient(url, {
            method: 'PUT',
            body: JSON.stringify(params.data)
        });

        return {
            data: {
                ...json,
                id: json._id
            }
        };
    },

    delete: async (resource, params) => {
        const url = `http://localhost:3000/${resource}/${params.id}`;
        const { json } = await httpClient(url, {
            method: 'DELETE'
        });

        return {
            data: json
        };
    },

    deleteMany: async (resource, params) => {
        const { ids } = params;
        const responses = await Promise.all(
            ids.map(id => 
                httpClient(`http://localhost:3000/${resource}/${id}`, {
                    method: 'DELETE',
                })
            )
        );
        return { data: responses.map(({ json }) => json.id) };
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
                ...json,
                id: json._id
            }))
        };
    },

    getManyReference: async (resource, params) => {
        const { target, id, pagination, sort, filter } = params;
        const { page, perPage } = pagination;
        const { field, order } = sort;
        
        const url = `http://localhost:3000/${resource}?${target}=${id}&page=${page}&limit=${perPage}&sortBy=${field}&order=${order}`;
        
        const { json, headers } = await httpClient(url);
        
        return {
            data: json.data.map(item => ({
                ...item,
                id: item._id
            })),
            total: json.total
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
    </Admin>
);

export default AdminRoot;