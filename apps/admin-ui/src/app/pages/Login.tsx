import { useForm } from '@mantine/form';
import { Button, PasswordInput, TextInput, Center } from '@mantine/core';
import { CredentialsDto } from '@nest-commerce/data';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Route } from '../configs/routes';
import { useValidate, useUser, useLogin, ErrorModal } from '@nest-commerce/ui';
import SmallLogo from '../components/SmallLogo';

const Login = () => {
  const { getInputProps, onSubmit } = useForm<CredentialsDto>({
    initialValues: {
      username: '',
      password: '',
    },
    validate: useValidate(CredentialsDto),
  });

  const { mutate, data, error, reset, isLoading } = useLogin();
  const { user, setUser } = useUser();

  useEffect(() => {
    !isLoading && data && setUser(data);
  }, [isLoading, data, setUser]);

  if (user) {
    return <Navigate to={Route.ADMIN} />;
  }

  return (
    <Center className="flex-col h-full">
      <ErrorModal error={error} onClose={reset} />
      <SmallLogo />
      <form onSubmit={onSubmit((values) => mutate(values))}>
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
    </Center>
  );
};

export default Login;
