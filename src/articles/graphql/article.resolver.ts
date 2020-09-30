import { UseGuards } from '@nestjs/common';
import {
  Args,
  ArgsType,
  Field,
  Int,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/articles/article.entity';
import { JwtPayloadExtDto } from 'src/auth/dto/jwt-payload-ext.dto';
import { CurrentUser, GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { LessThan, Like, Repository } from 'typeorm';
import { ArticlesService } from '../articles.service';

@ArgsType()
export class GetArticlesArgs {
  @Field(() => Int, { defaultValue: 3 })
  take: number;

  @Field({ defaultValue: '' })
  sample: string;

  @Field({ defaultValue: new Date() })
  createOnCursor: Date;
}

@ArgsType()
export class GetCreateArticleArgs {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  text: string;
}

@ArgsType()
export class GetEditArticleArgs {
  @Field()
  articleId: string;
  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  text: string;
}

@ArgsType()
export class GetChangeActiveStatusOfArticleArgs {
  @Field()
  articleId: string;
}

@Resolver(() => [ArticleEntity])
export class ArticlesResolver {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRep: Repository<ArticleEntity>,
    private articlesService: ArticlesService,
  ) {}

  @Query(() => [ArticleEntity])
  async allArticles(@Args() args: GetArticlesArgs): Promise<ArticleEntity[]> {
    return await this.articleRep.find({
      take: args.take,
      order: { createdOn: 'DESC' },
      where: {
        createdOn: LessThan(args.createOnCursor),
        title: Like(`%${args.sample}%`),
        isActive: true,
      },
    });
  }

  @Query(() => ArticleEntity)
  async getArticle(
    @Args('artId', { type: () => String }) artId: string,
  ): Promise<ArticleEntity> {
    return await this.articleRep.findOne(artId);
  }

  @Mutation(returns => String)
  @UseGuards(GqlAuthGuard)
  async createArticle(
    @Args() args: GetCreateArticleArgs,
    @CurrentUser() user: JwtPayloadExtDto,
  ): Promise<string> {
    this.articlesService.createArticle(
      { title: args.title, text: args.text, description: args.description },
      user.sub,
    );
    return 'createArticle: Ok';
  }

  @Mutation(returns => String)
  @UseGuards(GqlAuthGuard)
  async editArticle(
    @Args() args: GetEditArticleArgs,
    @CurrentUser() user: JwtPayloadExtDto,
  ): Promise<string> {
    const ret = await this.articlesService.editArticle(
      {
        title: args.title,
        text: args.text,
        description: args.description,
        id: args.articleId,
      },
      user.sub,
    );
    return ret.source + ': ' + ret.message;
  }

  @Mutation(returns => String)
  @UseGuards(GqlAuthGuard)
  async disActiveArticle(
    @Args() args: GetChangeActiveStatusOfArticleArgs,
    @CurrentUser() user: JwtPayloadExtDto,
  ): Promise<string> {
    this.articlesService.disActiveArticle(args.articleId, user.sub, user.role);
    return 'disActiveArticle: Ok';
  }
}
