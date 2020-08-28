import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ArticleHeaderEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: '',
  })
  description: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  author: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  isActive: boolean;

  @CreateDateColumn() createdOn?: Date;
  @CreateDateColumn() updatedOn?: Date;
}
