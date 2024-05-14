import { ArgsType, Field, Int } from '@nestjs/graphql'

@ArgsType()
export class PaginationArgument {
  @Field(() => Int, { nullable: true, defaultValue: 10 })
  readonly skip?: number

  @Field(() => Int, { nullable: true, defaultValue: 1 })
  readonly take?: number
}
