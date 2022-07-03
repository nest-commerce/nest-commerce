import { UserDto } from './user.dto';
import { IsInstance } from 'class-validator';
import { ApiProperty } from '../nest-decorators';
import { FindManyResponseDto } from '../find-many-response.dto';

export class FindUsersResponseDto extends FindManyResponseDto {
  @IsInstance(UserDto, {
    each: true,
  })
  @ApiProperty({
    type: [UserDto],
  })
  users: UserDto[];
}
