import { LoginPayload, LoginResponse, UserData } from "@/types";
import api from "./api";

export const login = async (data: LoginPayload) => {
  const response = await api.post<LoginResponse>(`login`, data);
  return response.data;
};

export const signUp = async (data: UserData) => {
  const response = await api.post(`signup`, data);
  return response.data;
};

export const perfilFn = async (id: string) => {
  const response = await api.get(`user/${id}`);
  return response.data;
};
