import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({
    nullable: false,
    unique: true,
  })
  login: string;

  @Column({
    nullable: false,
    unique: true,
  })
  fullName: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({ nullable: false, default: 'user' })
  role: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  isActive: boolean;

  @CreateDateColumn() createdOn?: Date;
  @CreateDateColumn() updatedOn?: Date;

  // @BeforeInsert()
  // async hashPassword(): Promise<void> {
  //   //this.password = await (this.password + 'dfsdfgsdgf');
  //   this.password = await bcrypt.hash(this.password, 10);
  // }
}
