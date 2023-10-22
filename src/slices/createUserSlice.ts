import { StateCreator } from 'zustand';
import { UserData } from '../types';

export interface UserSlice {
    user: UserData | null | undefined;
    setUser: (user: UserData | null) => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set, get) => ({
    user: undefined,
    setUser: (user: UserData | null) => {
        set({ user });
    },
});
