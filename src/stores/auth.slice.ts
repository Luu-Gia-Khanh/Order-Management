import { Auth } from '@/features/auth/types/Auth';
import { authRepository } from '@/features/auth/repository/auth.repository';
import { StateCreator } from 'zustand';

export interface AuthState {
    token: string | null;
    auth: Auth | null;
    auths: Auth[];
    loading: boolean;
    error: string | null;
    hydrated: boolean;

    setToken: (token: string) => void;
    setAuth: (auth: Auth) => void;
    login: (username: string, password: string) => void;
    loginWithToken: (token: string) => void;
    logout: () => void;

    fetchAuths: () => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
    token: null,
    auth: null,
    auths: [],
    loading: false,
    error: null,
    hydrated: false,

    fetchAuths: () => {
        set({ loading: true, error: null });
        try {
            const auths = authRepository.getAll();
            set({ auths, loading: false, error: null });
        } catch (error) {
            set({ loading: false, error: (error as Error).message });
        }
    },
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
    loginWithToken: (loginToken: string) => {
        set({ loading: true, error: null });
        try {
            const response = authRepository.loginWithToken(loginToken);
            if (!response) {
                set({ loading: false, error: 'Invalid username or password', token: null, auth: null });
                return;
            }
            set({ token: loginToken, auth: response, loading: false, error: null });
        } catch (error) {
            set({ loading: false, error: (error as Error).message });
        }
    },
});
