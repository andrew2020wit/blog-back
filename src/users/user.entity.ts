import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  login: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({ type: 'varchar', nullable: false, default: 'user' })
  role: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  isActive: boolean;
}
