import api from "./api";
import { MotoCreate, MotoData } from '../types';

export const getAllMotos = async () => {
    const response = await api.get<MotoData[]>(`moto`);
    return response.data;
};

export const getAllPlacas = async () => {
    const response = await api.get<MotoData[]>(`moto/placas`);
    return response.data;
};

export const getAllPlacaFn = async (placa: string) => {
    const response = await api.get<MotoData>(`/moto/placa/${placa ? placa : '0'}`);
    return response.data;
};

export const getMotoFn = async (id: string) => {
    const response = await api.get<MotoData>(`moto/${id}`);
    return response.data;
};

export const createMotoFn = async (formData: MotoCreate) => {
    const response = await api.post<MotoData>(`moto`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const updateMotoFn = async ({
    id,
    formData,
}: {
    id: number;
    formData: FormData;
}) => {
    const response = await api.put<MotoData>(`moto/${id}`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const deleteMotoFn = async (id: number) => {
    const response = await api.delete<MotoData>(`moto/${id}`);
    return response.data;
};
