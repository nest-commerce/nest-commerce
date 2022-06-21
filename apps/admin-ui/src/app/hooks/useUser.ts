import { AuthResultDto } from '@nest-commerce/data';
import { useLocalStorage } from '@mantine/hooks';

const useUser = () => {
  const [user, setUser] = useLocalStorage<AuthResultDto | null>({
    key: 'user',
    defaultValue: null,
  });

  return {
    user,
    setUser,
  };
};

export default useUser;
