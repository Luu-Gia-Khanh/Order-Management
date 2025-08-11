import { Auth } from '@/features/auth/types/Auth';
import { authRepository } from '@/features/auth/repository/auth.repository';
import { StateCreator } from 'zustand';

export interface AuthState {
    token: string | null;
    auth: Auth | null;
    loading: boolean;
    error: string | null;
    hydrated: boolean;

    setToken: (token: string) => void;
    setAuth: (auth: Auth) => void;
    login: (username: string, password: string) => void;
    logout: () => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
    token: null,
    auth: null,
    loading: false,
    error: null,
    hydrated: false,

    setToken: (token: string | null) => set({ token }),
    setAuth: (auth: Auth | null) => set({ auth }),
    logout: () => set({ token: null, auth: null }),
    login: (username: string, password: string) => {
        set({ loading: true, error: null });
        try {
            const response = authRepository.login(username, password);
            if (!response) {
                set({ loading: false, error: 'Invalid username or password' });
                return;
            }
            const { token, ...auth } = response;
            set({ token, auth, loading: false, error: null });
        } catch (error) {
            set({ loading: false, error: (error as Error).message });
        }
    },
});
