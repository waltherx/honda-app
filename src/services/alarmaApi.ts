import { AlarmaCreate, AlarmaData } from '@/types';
import api from './api';

export const getAllAlarmasFn = async () => {
    const response = await api.get<AlarmaData[]>(`alarmas`);
    return response.data;
};

export const getAlarmaFn = async (id: string) => {
    const response = await api.get<AlarmaData>(`alarma/${id}`);
    return response.data;
};

export const createAlarmaFn = async (formData: AlarmaCreate) => {
    const response = await api.post<AlarmaData>(`alarma`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const updateAlarmaFn = async ({
    id,
    formData,
}: {
    id: number;
    formData: FormData;
}) => {
    const response = await api.put<AlarmaData>(`alarma/${id}`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const deleteAlarmaFn = async (id: string) => {
    const response = await api.delete<AlarmaData>(`alarma/${id}`);
    return response.data;
};
