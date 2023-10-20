import api from './api'
import { ClientCreate, ClientData } from '@/types';

export const getAllClientsFn = async () => {
    const response = await api.get<ClientData[]>(`client`);
    return response.data;
};

export const getClientFn = async (id: string) => {
    const response = await api.get<ClientData>(`client/${id}`);
    return response.data;
};

export const createClientFn = async (formData: ClientCreate) => {
    const response = await api.post<ClientData>(`client`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const updateClientFn = async ({
    id,
    formData,
}: {
    id: number;
    formData: FormData;
}) => {
    const response = await api.put<ClientData>(`client/${id}`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const deleteClientFn = async (id: number) => {
    const response = await api.delete<ClientData>(`client/${id}`);
    return response.data;
};
