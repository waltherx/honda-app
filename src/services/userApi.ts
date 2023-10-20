import api from "./api";
import { UserCreate, UserData } from '../types';

export const getAllUsersFn = async () => {
    const response = await api.get<UserData[]>(`user`);
    return response.data;
};

export const getUserFn = async (id: number) => {
    const response = await api.get<UserData>(`user/${id}`);
    return response.data;
};

export const createUserFn = async (formData: UserCreate) => {
    const response = await api.post<UserData>(`user`, formData);
    return response.data;
};

export const updateUserFn = async ({
    id,
    formData,
}: {
    id: number;
    formData: FormData;
}) => {
    const response = await api.put<UserData>(`user/${id}`, formData);
    return response.data;
};

export const deleteUserFn = async (id: number) => {
    const response = await api.delete<UserData>(`user/${id}`);
    return response.data;
};
