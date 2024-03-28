import { AppResources } from '@/app.roles';
import { RolesBuilder } from 'nest-access-control';
import { IJwtUser } from '@/shared';
import { Permission } from 'accesscontrol';

export type Action = 'read' | 'create' | 'update' | 'delete';

export class AppPermission {
    constructor(
        private rolesBuilder: RolesBuilder,
        private resourceName: AppResources,
        private action: Action,
        private jwtUser: IJwtUser,
        private creatorId: string,
    ) {}

    grant(): Permission {
        const { id, roles } = this.jwtUser;
        let behavior;

        if (id && this.creatorId)
            behavior = `${this.action}${id === this.creatorId ? 'Own' : 'Any'}`;
        else behavior = `${this.action}Any`;

        return this.rolesBuilder.can(roles)[behavior + ''](this.resourceName);
    }
}
