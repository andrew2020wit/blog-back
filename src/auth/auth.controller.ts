import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginStatus } from 'src/auth/interfaces/LoginStatus';
import { RegistrationStatus } from 'src/auth/interfaces/RegistrationStatus';
import { IJwtPayload } from 'src/auth/strategies/jwt/i-jwt-payload.interface';
import { LoginUserDto } from 'src/auth/users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto,
    );

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }

  @Get('whoami')
  @UseGuards(AuthGuard())
  public async testAuth(@Req() req: any): Promise<IJwtPayload> {
    return req.user;
  }
}
