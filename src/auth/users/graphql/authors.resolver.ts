import { Args, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';

@Resolver(of => UserEntity)
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

  // @ResolveField()
  // async posts(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.articlesService.findAll({ authorId: id });
  // }
}
