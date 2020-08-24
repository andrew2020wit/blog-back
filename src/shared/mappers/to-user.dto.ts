import { UserDto } from 'src/users/dto/user.dto';
import { UserEntity } from 'src/users/user.entity';

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, login } = data;
  const userDto: UserDto = { id, login };
  return userDto;
};
