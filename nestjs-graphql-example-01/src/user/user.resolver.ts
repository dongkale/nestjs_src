import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  //   @Query(() => User)
  //   async user(@Args('id') id: string): Promise<User> {
  //     return this.userService.findOne(id);
  //   }

  //   @Mutation(() => User)
  //   async updateUser(
  //     @Args('id') id: string,
  //     @Args('input') input: UpdateUserInput,
  //   ): Promise<User> {
  //     return this.userService.update(id, input);
  //   }

  //   @Mutation(() => Boolean)
  //   async deleteUser(@Args('id') id: string): Promise<boolean> {
  //     return this.userService.delete(id);
  //   }
}
