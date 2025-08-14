import { useAppStore } from '@/stores';

export function useAuthManager() {
    const token = useAppStore((state) => state.token);
    const error = useAppStore((state) => state.error);
    const auth = useAppStore((state) => state.auth);
    const auths = useAppStore((state) => state.auths);

    const hydrated = useAppStore((state) => state.hydrated);

    const login = useAppStore((state) => state.login);
    const logout = useAppStore((state) => state.logout);
    const loginWithToken = useAppStore((state) => state.loginWithToken);

    const userLogin = (username: string, password: string) => {
        login(username, password);
    };

    const fetchAuths = useAppStore((state) => state.fetchAuths);

    return {
        auths,
        token,
        auth,
        hydrated,
        error,
        fetchAuths,
        userLogin,
        loginWithToken,
        logout,
    };
}
