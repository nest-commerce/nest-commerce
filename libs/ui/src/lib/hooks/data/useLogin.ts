import { useMutation } from 'react-query';
import { AuthResultDto, CredentialsDto } from '@nest-commerce/data';
import { Role } from '@prisma/client';
import { useFetch } from '../useFetch';

const ERROR_UNAUTHORIZED = 'Not authorized';

export const useLogin = () => {
  const { fetch } = useFetch();

  return useMutation<AuthResultDto, Error, CredentialsDto>(
    async (credentials: CredentialsDto) => {
      const data = await fetch<AuthResultDto>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      if (data?.role !== Role.ADMIN) {
        throw new Error(ERROR_UNAUTHORIZED);
      }
      return data;
    }
  );
};
