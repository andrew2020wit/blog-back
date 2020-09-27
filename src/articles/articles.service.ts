import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/users/user.entity';
import { StatusMessageDto } from 'src/shared/status-message.dto';
import { getConnection, Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { ArticleDTO } from './dto/article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRep: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRep: Repository<UserEntity>,
  ) {}
  async createArticle(
    newArtDto: ArticleDTO,
    userIdFromToken: string,
  ): Promise<StatusMessageDto> {
    if (!userIdFromToken) {
      return {
        message: 'userIdFromToken in null',
        source: 'createArticle',
        ok: false,
      };
    }

    const connection = getConnection();
    const newArt = new ArticleEntity();
    newArt.title = newArtDto.title;
    newArt.description = newArtDto.description;
    newArt.text = newArtDto.text;
    newArt.author = await connection.manager.findOne(
      UserEntity,
      userIdFromToken,
    );

    try {
      await connection.manager.save(newArt);

      console.log('createArticle newArtRet', newArt);

      return {
        message: newArtDto.title,
        source: 'createArticle',
        ok: true,
      };
    } catch (err) {
      return { message: err.message, source: 'createArticle', ok: false };
    }
  }

  async editArticle(
    artDto: ArticleDTO,
    userIdFromToken: string,
  ): Promise<StatusMessageDto> {
    const oldArticle = await this.articleRep.findOne(artDto.id);

    //if article not exist
    if (!oldArticle) {
      return {
        message: 'article id not exist',
        source: 'editArticle',
        ok: false,
      };
    }

    // if wrong user
    if (oldArticle.author.id !== userIdFromToken) {
      return {
        message: 'wrong user',
        source: 'editArticle',
        ok: false,
      };
    }

    // rewrite article
    oldArticle.text = artDto.text;
    oldArticle.title = artDto.title;
    oldArticle.description = artDto.description;
    try {
      await this.articleRep.save(oldArticle);
      return {
        message: oldArticle.title,
        source: 'editArticle',
        ok: true,
      };
    } catch (err) {
      return { message: err.message, source: 'editArticle', ok: false };
    }
  }

  async changeActiveStatusOfArticle(
    ArticleId: string,
    userIdFromToken: string,
    roleOfUserFromToken: string,
  ): Promise<StatusMessageDto> {
    const oldArticle = await this.articleRep.findOne(ArticleId);

    //if article not exist
    if (!oldArticle) {
      return {
        message: 'article id not exist',
        source: 'editArticle',
        ok: false,
      };
    }

    // if wrong user
    if (
      oldArticle.author.id !== userIdFromToken &&
      roleOfUserFromToken !== 'admin'
    ) {
      return {
        message: 'wrong user',
        source: 'editArticle',
        ok: false,
      };
    }

    // rewrite article
    oldArticle.isActive = !oldArticle.isActive;
    try {
      await this.articleRep.save(oldArticle);
      return {
        message: oldArticle.title,
        source: 'changeActiveStatusOfArticle',
        ok: true,
      };
    } catch (err) {
      return {
        message: err.message,
        source: 'changeActiveStatusOfArticle',
        ok: false,
      };
    }
  }
}
