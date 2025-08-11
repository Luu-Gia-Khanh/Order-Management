import { useAppStore } from '@/stores';

export function useAuthManager() {
    const token = useAppStore((state) => state.token);
    const error = useAppStore((state) => state.error);
    const auth = useAppStore((state) => state.auth);

    const hydrated = useAppStore((state) => state.hydrated);

    const login = useAppStore((state) => state.login);
    const logout = useAppStore((state) => state.logout);
    const loginWithToken = useAppStore((state) => state.loginWithToken);

    const userLogin = (username: string, password: string) => {
        login(username, password);
    };

    return {
        token,
        auth,
        hydrated,
        error,
        userLogin,
        loginWithToken,
        logout,
    };
}
