import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class TestArgument {
  @Field(() => String)
  search: string
}
