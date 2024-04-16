import { login } from '@/services';
import { AuthStatus, User } from '@/types';
import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    loginUser: (username: string, password: string) => Promise<void>;
}

const storeApi: StateCreator<AuthState> = (set) => ({
    status: 'unauthorized',
    token: undefined,
    user: undefined,

    loginUser: async (username, password) => {
        try {
            const { token, user } = await login({ username, password });
            set({ status: "authorized", token, user })
        } catch (err) {
            set({ status: "unauthorized", token: undefined, user: undefined })
        }
    },

})

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            storeApi,
            { name: 'auth-storaed' })

    )
);