import { useFetch } from '../../useFetch';
import { UserDto } from '@nest-commerce/data';
import { useQuery } from 'react-query';

export const useGetUser = (id: string | undefined) => {
  const { fetch } = useFetch();

  return useQuery<UserDto | null, Error>(
    ['user', id],
    async () =>
      await fetch<UserDto>(`/api/user?id=${id}`, {
        method: 'get',
      }),
    { retry: false, enabled: !!id }
  );
};
