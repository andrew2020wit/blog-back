import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './../auth/users/users.module';
import { ArticleEntity } from './article.entity';
import { ArticlesService } from './articles.service';
import { ArticlesResolver } from './graphql/article.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity]), UsersModule],
  providers: [ArticlesService, ArticlesResolver],
  exports: [ArticlesService, TypeOrmModule],
  controllers: [],
})
export class ArticlesModule {}
