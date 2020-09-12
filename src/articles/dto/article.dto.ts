import { UserEntity } from 'src/auth/users/user.entity';
export class ArticleDTO {
  id?: string;

  title: string;
  description: string;
  text: string;

  author: UserEntity;

  isActive?: boolean;
  createdOn?: Date;
  updatedOn?: Date;
}
