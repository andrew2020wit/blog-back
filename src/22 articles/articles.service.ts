// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class ArticlesService {
//   // constructor(private connection: Connection) {}
//   // async createArticle(
//   //   newArt: ArticleDTO,
//   //   userId: string,
//   // ): Promise<StatusMessageDto> {
//   //   const userRepo = this.connection.getRepository(UserEntity);
//   //   if (!userRepo.findOne(userId)) {
//   //     return { message: 'user not found', source: 'createArticle', ok: false };
//   //   }
//   //   try {
//   //     const articleRepo = this.connection.getRepository(ArticleEntity);
//   //     const newArtRet = articleRepo.create(newArt);
//   //     return {
//   //       message: newArtRet.title,
//   //       source: 'createArticle',
//   //       ok: true,
//   //     };
//   //   } catch (err) {
//   //     return { message: err.message, source: 'createArticle', ok: false };
//   //   }
//   // }
//   // async changeArticleHeader(ah: ArticleHeadDTO): Promise<StatusMessageDto> {
//   //   return { message: '', source: '', ok: true };
//   // }
//   // async changeArticleBody(ab: ArticleBodyDTO): Promise<StatusMessageDto> {
//   //   return { message: '', source: '', ok: true };
//   // }
//   // async deleteArticle(id: string): Promise<StatusMessageDto> {
//   //   return { message: '', source: '', ok: true };
//   // }
//   // async getArticleHead(id: string): Promise<ArticleHeadDTO> {}
//   // async getArticleBody(id: string): Promise<ArticleBodyDTO> {}
// }
