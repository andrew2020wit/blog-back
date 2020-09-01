import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { StatusMessageDto } from 'src/shared/status-message.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { JWTokenDTO } from './dto/token-object.dto';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserForJWT(
    login: string,
    password1: string,
  ): Promise<JwtPayloadDto | null> {
    const user = await this.usersService.findByLogin(login);
    if (!user) {
      return null;
    }
    const areEqual = await bcrypt.compare(password1, user.password);

    if (!areEqual) {
      console.log('bcrypt.compare(password1, user.password);');
      return null;
    }
    return {
      id: user.id,
      login: user.login,
      fullName: user.fullName,
      role: user.role,
    };
  }

  async createUser(createUserDto: CreateUserDto): Promise<StatusMessageDto> {
    return await this.usersService.createUser(createUserDto);
  }

  async getTokenObject(jwtPayloadDto: JwtPayloadDto): Promise<JWTokenDTO> {
    return await {
      access_token: this.jwtService.sign({
        login: jwtPayloadDto.login,
        sub: jwtPayloadDto.id,
        role: jwtPayloadDto.role,
        fullName: jwtPayloadDto.fullName,
      }),
    };
  }
}
