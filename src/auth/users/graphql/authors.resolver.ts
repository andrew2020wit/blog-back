import { Args, Field, Int, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';

@ObjectType()
export class usersCount {
  @Field(() => Int)
  count: number;
}

@Resolver(() => UserEntity)
export class AuthorsResolver {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  @Query(() => UserEntity)
  async author(@Args('id') id: string): Promise<UserEntity> {
    const author = new UserEntity();
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      author.fullName = user.fullName;
      author.id = id;
      return author;
    }
    return author;
  }
}

@Resolver(() => usersCount)
export class UsersCountResolver {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  @Query(() => usersCount)
  async usersCount(): Promise<usersCount> {
    const count = await this.userRepository.count();
    return { count };
  }
}
