import { Length } from 'class-validator';
import { ArticleEntity } from 'src/articles/article.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({
    nullable: false,
    unique: true,
  })
  @Length(3, 32)
  login: string;

  @Column({
    nullable: false,
    unique: true,
  })
  @Length(3, 64)
  fullName: string;

  @Column({
    nullable: false,
    select: false,
  })
  @Length(2, 32)
  password: string;

  @Column({ nullable: false, default: 'user' })
  role: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  isActive: boolean;

  @CreateDateColumn() createdOn?: Date;
  @UpdateDateColumn() updatedOn?: Date;

  @OneToMany(
    () => ArticleEntity,
    article => article.author,
  )
  articles: ArticleEntity[];
}

export const selectAllUserEntity = [
  'id',
  'login',
  'fullName',
  'password',
  'role',
  'isActive',
  'createdOn',
  'updatedOn',
];
