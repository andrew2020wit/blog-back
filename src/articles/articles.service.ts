import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/auth/users/user.entity';
import { StatusMessageDto } from 'src/shared/status-message.dto';
import { getConnection } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { ArticleDTO } from './dto/article.dto';

@Injectable()
export class ArticlesService {
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
    console.log('createArticle newArt', newArtDto);
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
  //   async changeArticleHeader(ah: ArticleHeadDTO): Promise<StatusMessageDto> {
  //     return { message: '', source: '', ok: true };
  //   }
  //   async changeArticleBody(ab: ArticleBodyDTO): Promise<StatusMessageDto> {
  //     return { message: '', source: '', ok: true };
  //   }
  //   async deleteArticle(id: string): Promise<StatusMessageDto> {
  //     return { message: '', source: '', ok: true };
  //   }
  //   async getArticleHead(id: string): Promise<ArticleHeadDTO> {}
  //   async getArticleBody(id: string): Promise<ArticleBodyDTO> {}
}
