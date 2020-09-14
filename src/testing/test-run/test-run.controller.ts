import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/articles/article.entity';
import { Repository } from 'typeorm';

// http://127.0.0.1:3001/api/test-run
@Controller('api/test-run')
export class TestRunController {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRep: Repository<ArticleEntity>,
  ) {}

  @Get()
  async test(): Promise<void> {
    const ret = await this.articleRep.find();
    console.log('api/test-run', ret);
  }
}
