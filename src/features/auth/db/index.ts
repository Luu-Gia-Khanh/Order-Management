import authDb from '../../../../public/data/auth.json';
import { Auth } from '../types/Auth';
import { mapJsonToAuth } from '../utils/auth.util';

export const authDB = {
    getAllAuths: (): Auth[] => {
        return authDb.map(mapJsonToAuth);
    },
    login: (username: string, password: string): (Auth & { token: string }) | null => {
        const authItem = authDb.find((item) => item.username === username && item.passwordHash === password);
        if (!authItem) {
            return null;
        }
        const auth = mapJsonToAuth(authItem);
        return { ...auth, token: auth.id };
    },
};
