import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ArticleEntity } from 'src/articles/article.entity';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UserEntity } from 'src/auth/users/user.entity';
import { StatusMessageDto } from 'src/shared/status-message.dto';
import { getConnection, Repository } from 'typeorm';
import { UsersService } from './../../auth/users/users.service';

@Injectable()
export class InitTestDataService {
  users: CreateUserDto[] = [];
  constructor(
    private usersService: UsersService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  initData(): StatusMessageDto {
    this.usersGenerator(50);
    return { message: 'done', source: 'initData', ok: true };
  }
  async usersGenerator(quantity: number): Promise<void> {
    for (let n = 1; n <= quantity; n++) {
      const password2 = await bcrypt.hash('12', 10);

      const author = await this.userRepository.save({
        login: 'user' + n,
        fullName: 'User N' + n,
        password: password2,
      });

      const connection = getConnection();
      for (let m = 1; m <= 4; m++) {
        const newArt = new ArticleEntity();
        newArt.author = author;
        newArt.title = 'title N' + m;
        newArt.description =
          'description N' +
          m +
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, vel!';
        newArt.text =
          'text N' +
          m +
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis fuga ducimus voluptate incidunt ad vel alias? Expedita voluptatem iste rerum numquam voluptas repudiandae neque repellendus, veniam natus quia error quod eaque deserunt officia. Unde fuga repellendus doloribus quasi, doloremque iusto.';

        await connection.manager.save(newArt);
      }
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
