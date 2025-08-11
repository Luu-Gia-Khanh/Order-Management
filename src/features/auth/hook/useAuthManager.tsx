import { useAppStore } from '@/stores';

export function useAuthManager() {
    const token = useAppStore((state) => state.token);
    const error = useAppStore((state) => state.error);
    const hydrated = useAppStore((state) => state.hydrated);

    const login = useAppStore((state) => state.login);

    const userLogin = (username: string, password: string) => {
        login(username, password);
    };

    return {
        hydrated,
        token,
        error,
        userLogin,
    };
}
