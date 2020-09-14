import { Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/articles/article.entity';
import { Repository } from 'typeorm';

@Resolver(of => [ArticleEntity])
export class ArticlesResolver {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRep: Repository<ArticleEntity>,
  ) {}

  @Query(() => [ArticleEntity])
  async allArticles(): Promise<ArticleEntity[]> {
    return await this.articleRep.find();
  }

  // @ResolveField()
  // async author(@Parent() article: ArticleGQL): Promise<AuthorGQL> {
  //   const { id } = article;
  //   const art = await this.articleRep.findOne({ id });
  //   return art.author;
  // }
}
