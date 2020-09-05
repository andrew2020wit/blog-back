import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { StatusMessageDto } from 'src/shared/status-message.dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserAdminView } from '../dto/user-admin-view.dto';
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

  async findById(userId: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async findAllUsersWithOutPW(): Promise<UserAdminView[] | undefined> {
    return await this.userRepository.find({
      select: [
        'login',
        'createdOn',
        'fullName',
        'id',
        'isActive',
        'role',
        'updatedOn',
      ],
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<StatusMessageDto> {
    if (await this.findByLogin(createUserDto.login)) {
      return {
        message: `user ${createUserDto.login} already exist`,
        source: 'createUser',
        ok: false,
      };
    }

    if (
      await this.userRepository.findOne({
        where: { fullName: createUserDto.fullName },
      })
    ) {
      return {
        message: `fullName ${createUserDto.fullName} already exist`,
        source: 'createUser',
        ok: false,
      };
    }

    if (!createUserDto.password && createUserDto.password.length < 2) {
      return { message: 'password incorrect', source: 'createUser', ok: false };
    }

    const password2 = await bcrypt.hash(createUserDto.password, 10);

    await this.userRepository.save({
      login: createUserDto.login,
      fullName: createUserDto.fullName,
      password: password2,
    });

    return {
      message: `user ${createUserDto.login} created`,
      source: 'createUser',
      ok: true,
    };
  }

  async editUser(
    userId: string,
    userEditDto: CreateUserDto,
  ): Promise<StatusMessageDto> {
    if (!this.findById(userId)) {
      return {
        message: `not find user by userId ${userId}`,
        source: 'editUser',
        ok: false,
      };
    }
    const password2 = await bcrypt.hash(userEditDto.password, 10);
    await this.userRepository.save({
      id: userId,
      login: userEditDto.login,
      fullName: userEditDto.fullName,
      password: password2,
    });

    return {
      message: `user ${userEditDto.login} save`,
      source: 'editUser',
      ok: true,
    };
  }
}
