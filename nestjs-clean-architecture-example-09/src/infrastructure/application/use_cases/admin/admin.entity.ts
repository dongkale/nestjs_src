import { Field, ObjectType } from '@nestjs/graphql'
import { AdminModel } from '../../../../business/admin/admin.model'
import { Column, Entity } from 'typeorm'
import { BaseEntityObj } from '../base.entity'

@Entity('admins')
@ObjectType()
export class Admin extends BaseEntityObj implements AdminModel {
  @Field(() => String)
  @Column()
  fullname: string

  @Field(() => String)
  @Column()
  username: string

  @Column()
  password: string
}
