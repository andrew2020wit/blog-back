import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/auth/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class ArticleEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ description: `Article title` })
  @Column('varchar', { length: 128, nullable: false })
  title: string;

  @Field({ description: `Short article description` })
  @Column('varchar', {
    length: 512,
    nullable: false,
    default: '',
  })
  description: string;

  @Field()
  @Column({
    nullable: false,
    type: 'text',
  })
  text: string;

  @Field()
  @Column({ type: 'boolean', nullable: false, default: true })
  isActive: boolean;

  @Field(type => UserEntity)
  @ManyToOne(
    () => UserEntity,
    user => user.articles,
    { eager: true, cascade: false, nullable: false },
  )
  author: UserEntity;

  @Field()
  @CreateDateColumn()
  createdOn: Date;

  @Field()
  @UpdateDateColumn()
  updatedOn: Date;
}
