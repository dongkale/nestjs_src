import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    GUEST = 'GUEST',
}

export enum AppResources {
    USER = 'USER',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
    .grant(AppRoles.GUEST)
    .readAny(AppResources.USER, '*, !email, !phoneNumber, !password')
    .grant(AppRoles.MANAGER)
    .readAny(AppResources.USER)
    .updateOwn(AppResources.USER)
    .grant(AppRoles.ADMIN)
    .extend(AppRoles.MANAGER)
    .createAny(AppResources.USER)
    .updateAny(AppResources.USER)
    .deleteAny(AppResources.USER);
