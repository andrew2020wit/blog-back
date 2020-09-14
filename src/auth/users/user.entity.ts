import { Field, ObjectType } from '@nestjs/graphql';
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

@ObjectType()
@Entity()
export class UserEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    unique: true,
  })
  @Length(3, 32)
  login: string;

  @Field()
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

  @Field()
  @Column({ nullable: false, default: 'user' })
  role: string;

  @Field()
  @Column({ type: 'boolean', nullable: false, default: true })
  isActive: boolean;

  @Field()
  @CreateDateColumn()
  createdOn?: Date;

  @Field()
  @UpdateDateColumn()
  updatedOn?: Date;

  @Field(type => [ArticleEntity], { nullable: true })
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
