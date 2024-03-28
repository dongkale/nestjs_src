import { AppRoles } from '@/app.roles';

export interface IJwtUser {
    id: string;
    username: string;
    roles: AppRoles;
    email?: string;
}

export class JwtUser implements IJwtUser {
    email: string;
    id: string;
    roles: AppRoles;
    username: string;
}
