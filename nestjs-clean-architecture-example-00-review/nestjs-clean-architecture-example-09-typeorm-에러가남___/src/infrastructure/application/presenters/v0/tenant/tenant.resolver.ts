import { Args, Query, Resolver } from '@nestjs/graphql'
import { PaginationArgument } from '../../../common/arguments/pagination.argument'

@Resolver()
export class TenantResolver {
  @Query(() => String)
  async helloWorld(@Args() pagination: PaginationArgument) {
    return 'hello world'
  }
}
