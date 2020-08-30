import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusMessageDto } from 'src/shared/status-message.dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByLogin(login: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: { login } });
  }

  async createUser(createUserDto: CreateUserDto): Promise<StatusMessageDto> {
    if (await this.findByLogin(createUserDto.login)) {
      return { message: 'user already exist', source: 'createUser', ok: false };
    }

    if (!createUserDto.password && createUserDto.password.length < 2) {
      return { message: 'password incorrect', source: 'createUser', ok: false };
    }

    await this.userRepository.save({
      login: createUserDto.login,
      fullName: createUserDto.fullName,
      password: createUserDto.password,
    });

    return {
      message: `user ${createUserDto.login} created`,
      source: 'createUser',
      ok: true,
    };
  }
}
