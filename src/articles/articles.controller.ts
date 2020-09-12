import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithJwtUserExtDto } from 'src/auth/interfaces/request-with-user-ext.interface';
import { StatusMessageDto } from 'src/shared/status-message.dto';
import { ArticlesService } from './articles.service';
import { ArticleDTO } from './dto/article.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}
  @Post() async createArticle(
    @Body() newArt: ArticleDTO,
    @Req() req: RequestWithJwtUserExtDto,
  ): Promise<StatusMessageDto> {
    return this.articleService.createArticle(newArt, req.user.sub);
  }
}
