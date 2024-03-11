import api from './api';
import { SucrusalData, SucrusalCreate } from '@/types';

export const getAllSucrusalsFn = async () => {
    const response = await api.get<SucrusalData[]>(`sucrusals`);
    return response.data;
};

export const getSucrusalFn = async (id: string) => {
    const response = await api.get<SucrusalData>(`sucrusal/${id}`);
    return response.data;
};

export const createSucrusalFn = async (formData: SucrusalCreate) => {
    const response = await api.post<SucrusalData>(`sucrusal`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const updateSucrusalFn = async ({
    id,
    formData,
}: {
    id: number;
    formData: FormData;
}) => {
    const response = await api.put<SucrusalData>(`sucrusal/${id}`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const deleteSucrusalFn = async (id: string) => {
    const response = await api.delete<SucrusalData>(`sucrusal/${id}`);
    return response.data;
};
