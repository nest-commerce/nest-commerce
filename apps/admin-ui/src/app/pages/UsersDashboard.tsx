import withDashboardLayout from '../layouts/AppLayout';
import { FC } from 'react';
import { Avatar, Group, Text } from '@mantine/core';
import { Route } from '../configs/routes';
import { QueryKey, RoleBadge } from '@nest-commerce/ui';
import Dashboard from '../components/Dashboard';
import { FindUsersResponseDto, UserDto } from '@nest-commerce/data';
import { USER_FIELDS } from '../configs/users';

const UsersDashboard: FC = () => {
  const dataComponent = ({ role, firstName, lastName }: UserDto) => (
    <Group>
      <Avatar radius="xl" />
      <RoleBadge role={role} />
      <Text weight={500}>
        {firstName}, {lastName}
      </Text>
    </Group>
  );

  return (
    <Dashboard<FindUsersResponseDto, UserDto>
      queryKey={QueryKey.USER}
      fields={USER_FIELDS}
      getDataFn={(response) => response.users}
      dataComponent={dataComponent}
      getRouteFn={({ id }) => Route.USER_PROFILE.replace(':id', id.toString())}
    />
  );
};

export default withDashboardLayout(UsersDashboard);
