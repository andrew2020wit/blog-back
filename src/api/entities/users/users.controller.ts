import { Controller, Get, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

// API for ngrx-data: users
@Controller('api/users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   return this.usersService.create(createUserDto);
  // }

  @Get()
  findAll(): Promise<User[]> {
    this.logger.log('Getting usersService.findAll()');
    return this.usersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string): Promise<User> {
  //   return this.usersService.findOne(id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<void> {
  //   return this.usersService.remove(id);
  // }
}
