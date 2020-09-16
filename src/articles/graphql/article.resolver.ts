import { Field, Int, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/articles/article.entity';
import { Repository } from 'typeorm';

@ObjectType()
export class articlesCount {
  @Field(() => Int)
  count: number;
}

@Resolver(() => [ArticleEntity])
export class ArticlesResolver {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRep: Repository<ArticleEntity>,
  ) {}

  @Query(() => [ArticleEntity])
  async allArticles(): Promise<ArticleEntity[]> {
    return await this.articleRep.find();
  }
}

@Resolver(() => articlesCount)
export class ArticlesCountResolver {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRep: Repository<ArticleEntity>,
  ) {}

  @Query(() => articlesCount)
  async articlesCount(): Promise<articlesCount> {
    const count = await this.articleRep.count();
    return { count };
  }
}
