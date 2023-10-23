import api from './api';
import { PositionData } from '@/types';

export const getAllPositionsFn = async () => {
    const response = await api.get<PositionData[]>(`position`);
    return response.data;
};

export const getPositionFn = async (id: string) => {
    const response = await api.get<PositionData>(`position/${id}`);
    return response.data;
};

export const getPositionLastFn = async (id: string) => {
    const response = await api.get<PositionData[]>(`position/last/${id}`);
    return response.data[0];
};

export const getPositionLimitFn = async (id: string, limit: string) => {
    const response = await api.get<PositionData[]>(`position/${id}/limit/${limit}`);
    return response.data;
}; 