import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TokenObject } from 'src/interfaces/token-object';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserEntity } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/ jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('registration')
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    this.logger.log('createUserDto');
    return this.userService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req): Promise<TokenObject> {
    return this.authService.login(req.user);
    // return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
