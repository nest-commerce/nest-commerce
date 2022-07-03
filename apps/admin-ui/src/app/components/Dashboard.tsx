import { useState } from 'react';
import {
  DataField,
  EditButton,
  ErrorModal,
  IConstructable,
  PAGE_SIZES,
  PaginationWithSize,
  QueryKey,
  SearchBar,
  useGetManyQuery,
} from '@nest-commerce/ui';
import {
  Alert,
  Card,
  Group,
  LoadingOverlay,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { IconArchive } from '@tabler/icons';
import { Link } from 'react-router-dom';
import { FindManyResponseDto } from '@nest-commerce/data';
import { plural } from 'pluralize';

interface DashboardProps<ResponseDto extends FindManyResponseDto, DataDto> {
  queryKey: QueryKey;
  dataComponent: (props: DataDto) => JSX.Element;
  getDataFn: (response: ResponseDto) => DataDto[];
  getRouteFn: (data: DataDto) => string;
  fields: DataField<DataDto>[];
  withAddButton?: boolean;
  validationClass?: IConstructable<Partial<DataDto>>;
  onConfirmation?: (data: Partial<DataDto>) => void;
}

const Dashboard = <ResponseDto extends FindManyResponseDto, DataDto>({
  queryKey,
  dataComponent: DataComponent,
  getDataFn,
  getRouteFn,
  withAddButton,
  fields,
  validationClass,
  onConfirmation,
}: DashboardProps<ResponseDto, DataDto>) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const { useQuery } = useGetManyQuery<ResponseDto, DataDto>(queryKey, fields);
  const { isLoading, data, error, refetch } = useQuery(
    page,
    pageSize,
    searchTerm
  );

  const updateSearchTerm = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setPage(1);
  };

  return (
    <Stack className="h-full w-full">
      <LoadingOverlay visible={isLoading} />
      <ErrorModal error={error} onClose={refetch} />
      <Paper className="sticky top-0 z-50 w-full" radius={0}>
        <Group align="center" pb="xs">
          <SearchBar className="grow" onChange={updateSearchTerm} />
          {withAddButton && validationClass && onConfirmation && (
            <EditButton
              fields={fields}
              validationClass={validationClass}
              onConfirmation={onConfirmation}
              label="Add"
              modalSize="xl"
              resetOnSave
            />
          )}
        </Group>
      </Paper>
      <Stack className="w-full grow">
        {!data?.count && (
          <Alert color="dark" className="h-full w-full" icon={<IconArchive />}>
            <Text color="dimmed">{`No ${plural(queryKey)} found`}</Text>
          </Alert>
        )}
        {data &&
          getDataFn(data).map((dataDto, index) => (
            <Card
              className="w-full hover:cursor-pointer hover:bg-slate-500"
              key={index}
              shadow="xl"
              component={Link}
              to={getRouteFn(dataDto)}
            >
              <DataComponent {...dataDto} />
            </Card>
          ))}
      </Stack>
      <PaginationWithSize
        className="sticky bottom-0 py-3"
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalItemCount={data?.count ?? 0}
      />
    </Stack>
  );
};

export default Dashboard;
