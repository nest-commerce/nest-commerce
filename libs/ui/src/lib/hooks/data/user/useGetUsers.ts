import { useFetch } from '../../useFetch';
import { FindUsersResponseDto } from '@nest-commerce/data';
import { useQuery } from 'react-query';

export const useGetUsers = (page: number, pageSize: number) => {
  const { fetch } = useFetch();

  const fetchUsers = async (page: number, pageSize: number) =>
    await fetch<FindUsersResponseDto>(
      `/api/user/find?page=${page}&pageSize=${pageSize}`,
      {
        method: 'get',
      }
    );

  return useQuery<FindUsersResponseDto | null, Error>(
    ['users', pageSize, page],
    () => fetchUsers(page, pageSize),
    { retry: false }
  );
};
