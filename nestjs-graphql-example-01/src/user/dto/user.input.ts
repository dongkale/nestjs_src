import { Field, InputType } from '@nestjs/graphql';
// graphql doc에 input 타입을 지정해주는 것임

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;
}
