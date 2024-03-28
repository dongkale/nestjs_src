import { AppRoles } from '@/app.roles';

export interface IUserModel {
    username: string;
    name: string;
    phoneNumber: string;
    address: string;
    email: string;
    avatarUrl: string;
    password: string;
    roles: AppRoles;
    createdAt?: Date;
    updatedAt?: Date;
}

export class UserModel implements IUserModel {
    address: string;
    avatarUrl: string;
    name: string;
    password: string;
    email: string;
    phoneNumber: string;
    roles: AppRoles;
    username: string;
    createdAt?: Date;
    updatedAt?: Date;
}
