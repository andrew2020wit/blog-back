import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsResolver } from './graphql/authors.resolver';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, AuthorsResolver],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
