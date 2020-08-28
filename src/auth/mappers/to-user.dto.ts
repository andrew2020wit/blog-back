import { ReturnUserDto } from 'src/auth/users/dto/return-user.dto';
import { UserEntity } from 'src/auth/users/user.entity';

export const toReturnUserDto = (data: UserEntity): ReturnUserDto => {
  const { id } = data;
  const userDto: ReturnUserDto = { id };
  return userDto;
};
