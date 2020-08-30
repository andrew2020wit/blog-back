import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { StatusMessageDto } from 'src/shared/status-message.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtUserDto } from './dto/jwt-user.dto';
import { JWTokenDTO } from './dto/token-object.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithJwtUserDto } from './interfaces/request-with-user.interface';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create-user')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<StatusMessageDto> {
    return await this.authService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: RequestWithJwtUserDto): Promise<JWTokenDTO> {
    return this.authService.getAccessTokenObject(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-profile')
  async getProfile(@Request() req: RequestWithJwtUserDto): Promise<JwtUserDto> {
    return await req.user;
  }

  // @Get('whoami')
  // @UseGuards(AuthGuard())
  // public async testAuth(@Req() req: any): Promise<IJwtPayload> {
  //   return req.user;
  // }
}
