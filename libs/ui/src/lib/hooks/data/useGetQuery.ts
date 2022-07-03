import { useFetch } from '../useFetch';
import { useQuery } from 'react-query';
import { QueryKey } from '../../types';

export const useGetQuery = <ResponseDto>(
  id: string | number | undefined,
  queryKey: QueryKey
) => {
  const { fetch } = useFetch();

  return useQuery<ResponseDto | null, Error>(
    [queryKey, id],
    async () =>
      await fetch<ResponseDto>(`/api/${queryKey}?id=${id}`, {
        method: 'get',
      }),
    { retry: false, enabled: !!id }
  );
};
