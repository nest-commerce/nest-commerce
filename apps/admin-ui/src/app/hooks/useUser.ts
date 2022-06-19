import { AuthResultDto } from '@nest-commerce/data';
import useLocalStorage from './useLocalStorage';

const useUser = () => {
  const { value: user, setValue: setUser } =
    useLocalStorage<AuthResultDto>('user');

  return {
    user,
    setUser,
  };
};

export default useUser;
