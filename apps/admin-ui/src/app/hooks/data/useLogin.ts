import { useMutation } from 'react-query';
import { AuthResultDto, CredentialsDto } from '@nest-commerce/data';
import { Role } from '@prisma/client';
import useFetch from '../useFetch';

const useLogin = () => {
  const { fetch, data } = useFetch<AuthResultDto>();

  const login = async (credentials: CredentialsDto): Promise<AuthResultDto> => {
    await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (data?.role !== Role.ADMIN) {
      throw new Error('Not authorized');
    }
    return data;
  };

  return useMutation<AuthResultDto, Error, CredentialsDto>(
    (credentials: CredentialsDto) => login(credentials)
  );
};

export default useLogin;
