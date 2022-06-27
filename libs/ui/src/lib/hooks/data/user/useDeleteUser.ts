import { useFetch } from '../../useFetch';
import { DeleteUserDto, UserDto } from '@nest-commerce/data';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteUser = () => {
  const { fetch } = useFetch();
  const queryClient = useQueryClient();

  return useMutation<UserDto | null, Error, DeleteUserDto>(
    async (params: DeleteUserDto): Promise<UserDto | null> => {
      const deletedUser = await fetch<UserDto>('/api/user/delete', {
        method: 'POST',
        body: JSON.stringify(params),
      });
      await queryClient.invalidateQueries('users');
      return deletedUser;
    }
  );
};
