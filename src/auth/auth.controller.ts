import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { StatusMessageDto } from 'src/shared/status-message.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JWTokenDTO } from './dto/token-object.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithJwtUserExtDto } from './interfaces/request-with-user-ext.interface';
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

  @UseGuards(JwtAuthGuard)
  @Post('edit-user')
  async editUser(
    @Request() req: RequestWithJwtUserExtDto,
    @Body() createUserDto: CreateUserDto,
  ): Promise<StatusMessageDto> {
    console.log(createUserDto);
    return await this.authService.editUser(req.user.sub, createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('get-token-obj')
  async login(@Request() req: RequestWithJwtUserDto): Promise<JWTokenDTO> {
    console.log('get-token-obj: ', req.user);
    return this.authService.getTokenObject(req.user);
  }
}
