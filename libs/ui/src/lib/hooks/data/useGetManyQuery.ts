import { useFetch } from '../useFetch';
import { useQuery } from 'react-query';
import { DataField, getEditableFieldsWithValue, QueryKey } from '../../types';
import { plural } from 'pluralize';

export const useGetManyQuery = <ResponseDto, EntityDto>(
  queryKey: QueryKey,
  fields: DataField<EntityDto>[]
) => {
  const { fetch } = useFetch();

  const fetchMany = async (
    page: number,
    pageSize: number,
    searchTerm: string
  ) => {
    const searchParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...getEditableFieldsWithValue(fields, searchTerm),
    }).toString();
    return await fetch<ResponseDto>(`/api/${queryKey}/find?${searchParams}`, {
      method: 'get',
    });
  };

  return {
    useQuery: (page: number, pageSize: number, searchTerm: string) =>
      useQuery<ResponseDto | null, Error>(
        [plural(queryKey), pageSize, page, searchTerm],
        () => fetchMany(page, pageSize, searchTerm),
        { retry: false }
      ),
  };
};
