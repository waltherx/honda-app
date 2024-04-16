import { LoginPayload, LoginResponse, UserData } from "@/types";
import api from "./api";
import { AxiosError } from "axios";

export const login = async (data: LoginPayload) => {
  try {
    const response = await api.post<LoginResponse>(`login`, data);
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err.response?.data)
      throw new Error(err.response?.data)
    }
    console.log("unable login")
    throw new Error("unable login")
  }
};

export const signUp = async (data: UserData) => {
  try {
    const response = await api.post(`signup`, data);
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err.response?.data)
      throw new Error(err.response?.data)
    }
    console.log("unable login")
    throw new Error("unable login")
  }
};

export const perfilFn = async (id: string) => {
  const response = await api.get(`user/${id}`);
  return response.data;
};
