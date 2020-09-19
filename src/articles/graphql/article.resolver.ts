import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/articles/article.entity';
import { LessThan, Like, Repository } from 'typeorm';

@Resolver(() => [ArticleEntity])
export class ArticlesResolver {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRep: Repository<ArticleEntity>,
  ) {}

  @Query(() => [ArticleEntity])
  async allArticles(
    @Args('take', { type: () => Int, defaultValue: 3 }) take: number,
    @Args('sample', { defaultValue: '' }) sample: string,
    @Args('createOnCursor', { defaultValue: new Date() })
    createOnCursor: Date,
  ): Promise<ArticleEntity[]> {
    return await this.articleRep.find({
      take,
      order: { createdOn: 'DESC' },
      where: {
        createdOn: LessThan(createOnCursor),
        title: Like(`%${sample}%`),
      },
    });
  }
}
