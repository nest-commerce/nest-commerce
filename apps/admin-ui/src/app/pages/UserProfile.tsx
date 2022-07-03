import { FC } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import withDashboardLayout from '../layouts/AppLayout';
import { UniqueUserDto, UpdateUserDto, UserDto } from '@nest-commerce/data';
import { Avatar, Box, Card, Group, LoadingOverlay, Title } from '@mantine/core';
import {
  DeleteButton,
  DisplayTable,
  EditButton,
  ErrorModal,
  MutationType,
  QueryKey,
  RoleBadge,
  useGetQuery,
  useMutation,
} from '@nest-commerce/ui';
import { Route } from '../configs/routes';
import { USER_FIELDS } from '../configs/users';

const UserProfile: FC = () => {
  const { id } = useParams();
  const { isLoading, data, error, refetch } = useGetQuery<UserDto>(
    id,
    QueryKey.USER
  );
  const {
    mutate,
    error: deleteUserError,
    reset: resetDeleteUser,
  } = useMutation<UserDto, UniqueUserDto>(QueryKey.USER, MutationType.DELETE);
  const {
    mutate: updateUser,
    error: updateUserError,
    reset: resetUpdateUser,
  } = useMutation<UserDto, UpdateUserDto>(
    QueryKey.USER,
    MutationType.UPDATE,
    id
  );
  const navigate = useNavigate();

  const deleteUser = () => {
    mutate({ id: Number(id) });
    navigate(Route.USERS);
  };

  if (!id) {
    return <Navigate to={Route.USERS} />;
  }

  return (
    <Group className="w-full" direction="column">
      <LoadingOverlay visible={!data || isLoading} />
      <ErrorModal error={error} onClose={refetch} />
      <ErrorModal error={deleteUserError} onClose={resetDeleteUser} />
      <ErrorModal error={updateUserError} onClose={resetUpdateUser} />
      {data && (
        <Card className="w-full" shadow="xl">
          <Group spacing="xl" align="start">
            <Box>
              <Avatar radius={128} size={128} />
              <Title order={3} mt="md">
                {data.firstName}, {data.lastName}
              </Title>
              <RoleBadge role={data.role} />
            </Box>
            <Box className="grow">
              <Group position="right">
                <EditButton
                  fields={USER_FIELDS}
                  data={data}
                  validationClass={UpdateUserDto}
                  onConfirmation={updateUser}
                />
                <DeleteButton onConfirm={deleteUser} />
              </Group>
              <DisplayTable fields={USER_FIELDS} data={data} />
            </Box>
          </Group>
        </Card>
      )}
    </Group>
  );
};

export default withDashboardLayout(UserProfile);
