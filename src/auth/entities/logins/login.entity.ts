import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LoginObject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  isBanned: boolean;
}
