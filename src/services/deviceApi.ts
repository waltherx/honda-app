import { AxiosError } from 'axios';
import api from './api';
import { DeviceCreate, DeviceData } from '@/types';

export const getAllDevicesFn = async (): Promise<DeviceData[]> => {
    try {
        const response = await api.get<DeviceData[]>(`dispositivo`);
        return response.data;
    } catch (err) {
        if (err instanceof AxiosError) {
            console.log(err.response?.data);
            throw new Error(err.response?.data);
        }
        console.log(err);
        return []
    }

};

export const getDeviceFn = async (id: number) => {
    const response = await api.get<DeviceData>(`dispositivo/${id}`);
    return response.data;
};

export const createDeviceFn = async (formData: DeviceCreate) => {
    const response = await api.post<DeviceData>(`dispositivo`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const updateDeviceFn = async ({
    id,
    formData,
}: {
    id: number;
    formData: FormData;
}) => {
    const response = await api.put<DeviceData>(`dispositivo/${id}`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const deleteDeviceFn = async (id: number) => {
    const response = await api.delete<DeviceData>(`device/${id}`);
    return response.data;
};
