import { Optional } from '@/core/commons/optional';
import { User } from '@/core/models';

export class UserRepository {
    public static users: Array<User> = [{
        id: 1,
        name: 'jszero',
        email: 'abc@exp.com',
        password: '123',
        fullname: 'John Doe',
        createdAt: new Date(),
    }];

    public save(user: User): Promise<User> {
        const nextId = UserRepository.users.length + 1;
        const userWithId = { ...user, id: nextId } as User;
        UserRepository.users.push(userWithId);
        return Promise.resolve(userWithId);
    }

    public findByName(name: string): Promise<Optional<User>> {
        const user = UserRepository.users.find((element) => element.name === name);
        const optional = Optional.ofNullable(user);
        return Promise.resolve(optional);
    }
}
