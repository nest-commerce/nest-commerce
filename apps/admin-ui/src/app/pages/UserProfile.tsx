import { FC } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import withDashboardLayout from '../layouts/DashboardLayout';
import { UpdateUserDto, UserDto } from '@nest-commerce/data';
import { Avatar, Box, Card, Group, LoadingOverlay, Title } from '@mantine/core';
import {
  DataField,
  DeleteButton,
  DisplayTable,
  EditButton,
  ErrorModal,
  RoleBadge,
  useDeleteUser,
  useGetUser,
  useUpdateUser,
} from '@nest-commerce/ui';
import { Route } from '../configs/routes';

const fields: DataField<UserDto>[] = [
  { key: 'id', title: 'ID' },
  {
    key: 'firstName',
    title: 'First Name',
    type: 'text',
    hidden: true,
    editable: true,
  },
  {
    key: 'lastName',
    title: 'Last Name',
    type: 'text',
    hidden: true,
    editable: true,
  },
  { key: 'username', title: 'Email / Username', type: 'email', editable: true },
  { key: 'createdAt', title: 'Joined At', type: 'date' },
  { key: 'updatedAt', title: 'Last Updated At', type: 'date' },
];

const UserProfile: FC = () => {
  const { id } = useParams();
  const { isLoading, data, error, refetch } = useGetUser(id);
  const {
    mutate,
    error: deleteUserError,
    reset: resetDeleteUser,
  } = useDeleteUser();
  const {
    mutate: updateUser,
    error: updateUserError,
    reset: resetUpdateUser,
  } = useUpdateUser(id ?? '');
  const navigate = useNavigate();

  const deleteUser = () => {
    mutate({ id: Number(id) });
    navigate(Route.USERS);
  };

  if (!id) {
    return <Navigate to={Route.USERS} />;
  }

  return (
    <Group direction="column" style={{ width: '100%' }}>
      <LoadingOverlay visible={!data || isLoading} />
      <ErrorModal error={error} onClose={refetch} />
      <ErrorModal error={deleteUserError} onClose={resetDeleteUser} />
      <ErrorModal error={updateUserError} onClose={resetUpdateUser} />
      {data && (
        <Card shadow="xl" style={{ width: '100%' }}>
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
                  fields={fields}
                  data={data}
                  validationClass={UpdateUserDto}
                  onConfirmation={updateUser}
                />
                <DeleteButton onConfirm={deleteUser} />
              </Group>
              <DisplayTable fields={fields} data={data} />
            </Box>
          </Group>
        </Card>
      )}
    </Group>
  );
};

export default withDashboardLayout(UserProfile);
