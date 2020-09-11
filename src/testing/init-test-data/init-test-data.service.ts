import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UserEntity } from 'src/auth/users/user.entity';
import { StatusMessageDto } from 'src/shared/status-message.dto';
import { getConnection } from 'typeorm';
import { UsersService } from './../../auth/users/users.service';

@Injectable()
export class InitTestDataService {
  users: CreateUserDto[] = [];
  constructor(private usersService: UsersService) {}
  initData(): StatusMessageDto {
    this.usersGenerator(200);
    return { message: 'done', source: 'initData', ok: true };
  }
  async usersGenerator(quantity: number): Promise<void> {
    for (let n = 1; n <= quantity; n++) {
      await this.usersService.createUser({
        login: 'user' + n,
        fullName: 'User N' + n,
        password: '12',
      });
    }

    // admin section
    await this.usersService.createUser({
      login: 'admin1',
      fullName: 'Admin N1 ',
      password: '12',
    });

    await this.usersService.createUser({
      login: 'admin2',
      fullName: 'Admin N2',
      password: '12',
    });

    await getConnection()
      .createQueryBuilder()
      .update(UserEntity)
      .set({ role: 'admin' })
      .where('login = :login OR login = :login2', {
        login: 'admin1',
        login2: 'admin2',
      })
      .execute();
  }
}
