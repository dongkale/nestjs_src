import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@ObjectType()
export class BaseEntityObj extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id?: string

  @CreateDateColumn({
    name: 'created_at',
  })
  @Field(() => Date)
  createdAt?: Date

  @UpdateDateColumn({
    name: 'updated_at',
  })
  @Field(() => Date)
  updatedAt?: Date
}
