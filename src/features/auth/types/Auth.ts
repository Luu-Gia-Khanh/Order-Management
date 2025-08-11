export interface Auth {
    id: string;
    username: string;
    passwordHash: string;
    fullName: string;
    phone?: string;
    role: Role;
    status: AuthStatus;
    lastLoginAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export enum Role {
    Admin = 'admin',
    Manager = 'manager',
    Staff = 'staff',
}

export enum AuthStatus {
    Active = 'active',
    Inactive = 'inactive',
}
