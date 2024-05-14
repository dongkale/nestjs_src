export type UserRole = 'ADMINISTRATOR' | 'USER';

export class UserAggregate {
    id: string;
    email: string;
    password: string;

    role: UserRole;
    lastLogin: Date;
    hashRefreshToken: string;

    constructor(user: {
        id: string;
        email: string;
        password: string;

        role: UserRole;
        lastLogin: Date;
        hashRefreshToken: string;
    }) {
        this.id = user.id;
        this.email = user.email;
        this.password = user.password;

        this.role = user.role;
        this.lastLogin = user.lastLogin;
        this.hashRefreshToken = user.hashRefreshToken;
    }

    validate(): void {
        if (!this.email) throw new Error('Email is required');
        if (!this.password) throw new Error('Password is required');
    }

    validatePassword(password: string, confirmationPassword: string): boolean {
        return password === confirmationPassword;
    }
}
