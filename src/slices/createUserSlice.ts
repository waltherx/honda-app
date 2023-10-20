import { StateCreator } from 'zustand';
import { UserData } from '../types';

export interface IUserSlice {
    user: UserData | null | undefined;
    setUser: (user: UserData | null) => void;
}

export const createUserSlice: StateCreator<IUserSlice> = (set, get) => ({
    user: undefined,
    setUser: (user: UserData | null) => {
        set({ user });
    },
});
