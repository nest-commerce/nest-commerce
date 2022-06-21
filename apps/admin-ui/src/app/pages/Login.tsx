import { useForm } from '@mantine/form';
import {
  Button,
  PasswordInput,
  Group,
  TextInput,
  Modal,
  Alert,
  Image,
} from '@mantine/core';
import { CredentialsDto } from '@nest-commerce/data';
import { FormEvent } from 'react';
import useLogin from '../hooks/data/useLogin';
import useUser from '../hooks/useUser';
import { Navigate } from 'react-router-dom';
import { Route } from '../configs/routes';
import { IconAlertCircle } from '@tabler/icons';
import useValidate from '../hooks/useValidate';

const Login = () => {
  const { validate } = useValidate(CredentialsDto);
  const { values, setErrors, getInputProps } = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const { mutate, data, error, reset, isLoading } = useLogin();
  const { user, setUser } = useUser();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { errors, hasErrors } = await validate(values);
    if (hasErrors) {
      setErrors(errors);
    } else {
      mutate(values);
      setUser(data ?? null);
    }
  };

  if (user) {
    return <Navigate to={Route.ADMIN} />;
  }

  return (
    <Group
      className="justify-center h-full"
      position="center"
      direction="column"
    >
      <Modal opened={!!error} onClose={reset}>
        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
          {error?.message}
        </Alert>
      </Modal>
      <Image src="assets/icon.svg" alt="logo" />
      <form onSubmit={handleSubmit}>
        <TextInput
          required
          label="Email"
          variant="default"
          {...getInputProps('username')}
        />
        <PasswordInput
          required
          label="Password"
          mt="md"
          {...getInputProps('password')}
        />
        <Button type="submit" fullWidth mt="md" loading={isLoading}>
          Login
        </Button>
      </form>
    </Group>
  );
};

export default Login;
