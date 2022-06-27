import withDashboardLayout from '../layouts/DashboardLayout';
import { FC, useState } from 'react';
import {
  Alert,
  Avatar,
  Card,
  Group,
  LoadingOverlay,
  Text,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { Route } from '../configs/routes';
import {
  ErrorModal,
  PAGE_SIZES,
  PaginationWithSize,
  RoleBadge,
  useGetUsers,
} from '@nest-commerce/ui';
import { IconArchive } from '@tabler/icons';

const UsersDashboard: FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const { isLoading, data, error, refetch } = useGetUsers(page, pageSize);
  const navigate = useNavigate();

  return (
    <Group className="grow w-full" direction="column">
      <LoadingOverlay visible={isLoading} />
      <ErrorModal error={error} onClose={refetch} />
      <Group className="grow w-full" direction="column">
        {!data?.users.length && (
          <Alert color="dark" className="w-full h-full" icon={<IconArchive />}>
            <Text color="dimmed">No users found</Text>
          </Alert>
        )}
        {data?.users.map(({ id, firstName, lastName, role }) => (
          <Card
            className="w-full hover:bg-slate-500 hover:cursor-pointer"
            key={id}
            shadow="xl"
            onClick={() =>
              navigate(Route.USER_PROFILE.replace(':id', id.toString()))
            }
          >
            <Group>
              <Avatar radius="xl" />
              <RoleBadge role={role} />
              <Text weight={500}>
                {firstName}, {lastName}
              </Text>
            </Group>
          </Card>
        ))}
      </Group>
      <PaginationWithSize
        className="sticky bottom-0 py-3 mb-[-1rem]"
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalItemCount={data?.count ?? 0}
      />
    </Group>
  );
};

export default withDashboardLayout(UsersDashboard);
