export class ArticleDTO {
  id?: string;

  title: string;
  description: string;
  body: string;

  authorId: string;

  bodyId?: string;

  isActive?: boolean;
  createdOn?: Date;
  updatedOn?: Date;
}
