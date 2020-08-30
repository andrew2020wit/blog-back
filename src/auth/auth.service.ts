import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { StatusMessageDto } from 'src/shared/status-message.dto';
import { comparePasswords } from 'src/shared/utils';
import { JwtUserDto } from './dto/jwt-user.dto';
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
  ): Promise<JwtUserDto | null> {
    const user = await this.usersService.findByLogin(login);
    if (!user) {
      return null;
    }
    const areEqual = await comparePasswords(user.password, password1);
    if (!areEqual) {
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

  async getAccessTokenObject(jwtUserDto: JwtUserDto): Promise<JWTokenDTO> {
    return await {
      token: this.jwtService.sign({
        login: jwtUserDto.login,
        sub: jwtUserDto.id,
      }),
      ...jwtUserDto,
    };
  }
}
