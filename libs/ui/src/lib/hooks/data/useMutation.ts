import { useFetch } from '../useFetch';
import { useMutation as useClientMutation, useQueryClient } from 'react-query';
import { MutationType, QueryKey } from '../../types';
import { plural } from 'pluralize';

export const useMutation = <ResponseDto, RequestDto>(
  queryKey: QueryKey,
  mutationType: MutationType,
  id?: string
) => {
  const { fetch } = useFetch();
  const queryClient = useQueryClient();

  return useClientMutation<ResponseDto | null, Error, RequestDto>(
    async (requestDto) => {
      if (
        mutationType === MutationType.UPDATE &&
        Object.keys(requestDto).length === 0
      )
        return await queryClient.fetchQuery([queryKey, id]);
      const responseDto = await fetch<ResponseDto>(
        `/api/${queryKey}/${mutationType}${id ? `/${id}` : ''}`,
        {
          method: 'POST',
          body: JSON.stringify(requestDto),
        }
      );
      await queryClient.invalidateQueries(
        id ? [queryKey, id] : [plural(queryKey)]
      );
      return responseDto;
    }
  );
};
