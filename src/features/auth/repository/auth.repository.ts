import { Auth } from '@/features/auth/types/Auth';
import { authDB } from '../db';

export const authRepository = {
    login(username: string, password: string): (Auth & { token: string }) | null {
        const data = authDB.login(username, password);
        return data ? { ...data, token: data.id } : null;
    },
};
