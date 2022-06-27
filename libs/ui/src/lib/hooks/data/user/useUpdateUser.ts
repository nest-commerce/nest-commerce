import { useFetch } from '../../useFetch';
import { UpdateUserDto, UserDto } from '@nest-commerce/data';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateUser = (id: string) => {
  const { fetch } = useFetch();
  const queryClient = useQueryClient();

  return useMutation<UserDto | null, Error, UpdateUserDto>(
    async (updateUserDto: UpdateUserDto) => {
      if (Object.keys(updateUserDto).length === 0)
        return (await queryClient.fetchQuery(['user', id])) as UserDto;
      const updatedUser = await fetch<UserDto>(`/api/user/update/${id}`, {
        method: 'POST',
        body: JSON.stringify(updateUserDto),
      });
      await queryClient.invalidateQueries(['user', id]);
      return updatedUser;
    }
  );
};
