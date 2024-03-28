import { BaseService } from '@/shared/services/base-service';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@user/entities';
import { UserRepository } from '@user/repositories';

@Injectable()
export class UserService extends BaseService<UserEntity, UserRepository> {
    constructor(private readonly userRepository: UserRepository) {
        super(userRepository);
    }
}
