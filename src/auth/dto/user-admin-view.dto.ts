import { UserEntity } from './../users/user.entity';
export type UserAdminView = Omit<UserEntity, 'password'>;
