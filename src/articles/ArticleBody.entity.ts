import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ArticleBodyEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  body: string;

  @CreateDateColumn() createdOn?: Date;
  @CreateDateColumn() updatedOn?: Date;
}
