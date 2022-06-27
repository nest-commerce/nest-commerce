import { AuthResultDto } from '@nest-commerce/data';
import { useLocalStorage } from '@mantine/hooks';

export const useUser = () => {
  const [user, setUser] = useLocalStorage<AuthResultDto | null>({
    key: 'user',
    defaultValue: null,
  });

  return {
    user,
    setUser,
  };
};
