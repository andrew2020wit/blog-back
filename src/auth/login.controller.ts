import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CreateLoginObjectDto } from './dto/create-login.dto';
import { LoginObject } from './login.entity';
import { LoginService } from './login.service';

@Controller('api/login')
export class LoginController {
  private readonly logger = new Logger(LoginController.name);
  constructor(private readonly loginService: LoginService) {}

  @Post('create')
  create(
    @Body() createLoginObjectDto: CreateLoginObjectDto,
  ): Promise<LoginObject> {
    this.logger.log('createLoginObjectDto');
    return this.loginService.create(createLoginObjectDto);
  }
}
