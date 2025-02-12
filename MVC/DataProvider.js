// src/dataProvider.js
import { fetchUtils } from 'react-admin';

const apiUrl = 'http://localhost:3000'; 
const httpClient = fetchUtils.fetchJson;

export const dataProvider = {
    getList: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        
        const query = {
            page,
            perPage,
            sort: JSON.stringify({ [field]: order === 'ASC' ? 1 : -1 }),
            filter: JSON.stringify(params.filter),
        };

        const url = `${apiUrl}/${resource}?${new URLSearchParams(query)}`;

        const { json, headers } = await httpClient(url);
        
        return {
            data: json.map(record => ({ ...record, id: record._id })),
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        };
    },

    getOne: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`);
        return {
            data: {
                ...json,
                id: json._id,
            },
        };
    },

    create: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        });
        return {
            data: {
                ...params.data,
                id: json._id,
            },
        };
    },

    update: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        });
        return {
            data: {
                ...params.data,
                id: json._id,
            },
        };
    },

    delete: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        });
        return { data: { ...json, id: json._id } };
    },

    deleteMany: async (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const { json } = await httpClient(`${apiUrl}/${resource}?${new URLSearchParams(query)}`, {
            method: 'DELETE',
        });
        return { data: json };
    },

    getMany: async (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const { json } = await httpClient(`${apiUrl}/${resource}?${new URLSearchParams(query)}`);
        return {
            data: json.map(resource => ({
                ...resource,
                id: resource._id,
            })),
        };
    },

    getManyReference: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify({[field]: order === 'ASC' ? 1 : -1}),
            range: JSON.stringify([(page - 1) * perPage, page * perPage]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${new URLSearchParams(query)}`;

        const { json, headers } = await httpClient(url);
        return {
            data: json.map(resource => ({
                ...resource,
                id: resource._id,
            })),
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        };
    },
};

export default dataProvider;