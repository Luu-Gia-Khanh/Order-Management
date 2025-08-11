import { Auth, AuthStatus, Role } from '../types/Auth';

export function mapJsonToAuth(item: Record<string, string>): Auth {
    return {
        id: item.id,
        username: item.username,
        passwordHash: item.passwordHash,
        fullName: item.fullName,
        phone: item.phone,
        role: item.role as Role,
        status: item.status as AuthStatus,
        lastLoginAt: item.lastLoginAt ? new Date(item.lastLoginAt) : undefined,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
    };
}
