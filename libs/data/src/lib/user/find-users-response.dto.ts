import { UserDto } from './user.dto';
import { IsInstance, IsInt } from 'class-validator';
import { ApiProperty } from '../nest-decorators';

export class FindUsersResponseDto {
  @IsInt()
  @ApiProperty()
  count: number;

  @IsInstance(UserDto, {
    each: true,
  })
  @ApiProperty({
    type: [UserDto],
  })
  users: UserDto[];
}
