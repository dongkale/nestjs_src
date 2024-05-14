import { UserRole } from '@domain/aggregates/user.aggregate';
import { Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'users_06',
})
export class User {
    @PrimaryGeneratedColumn('uuid')
    // @Column()
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ enum: ['ADMINISTRATOR', 'USER'], default: 'USER' })
    role: UserRole;

    @Column({ nullable: true })
    lastLogin?: Date;

    @Column({ nullable: true })
    hashRefreshToken: string;
}
