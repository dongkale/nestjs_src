import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity({ name: 'books' })
export class Boook {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id?: number

  @Column({ unique: true })
  @ApiProperty({ description: '이름' })
  name: string

  @Column()
  @ApiProperty({ description: '설명' })
  category: string

  @CreateDateColumn()
  @ApiProperty({ description: '생성일' })
  createdAt?: Date = new Date()

  @UpdateDateColumn()
  @ApiProperty({ description: '갱신일' })
  updatedAt?: Date
}

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
// import { BookCategory } from '../enums/book-category.enum'
// import { HydratedDocument } from 'mongoose'

// export type BookDocument = HydratedDocument<Book>

// @Schema({
//   versionKey: false,
//   timestamps: {
//     updatedAt: false
//   }
// })
// export class Book {
//   @Prop({
//     type: String,
//     required: true,
//     minlength: [2, 'Book name must be longer than 2 characters.'],
//     maxlength: [30, 'Book name must be shorter than 30 characters.']
//   })
//   public name!: string

//   @Prop({
//     type: String,
//     required: true,
//     enum: BookCategory
//   })
//   public category!: string

//   @Prop({
//     type: String,
//     required: true,
//     minlength: [2, 'Author name must be longer than 2 characters.'],
//     maxlength: [30, 'Author name must be shorter than 30 characters.']
//   })
//   public author!: string
// }

// export const BookSchema = SchemaFactory.createForClass(Book)
