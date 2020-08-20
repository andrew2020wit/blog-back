import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Connection } from 'typeorm';
import { UsersModule } from './api/entities/users/users.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),

    TypeOrmModule.forRoot(),
    UsersModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
