import { useLocalStorage } from '@mantine/hooks';

const useThemeChange = () => {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>({
    key: 'theme',
    defaultValue: 'dark',
  });

  return {
    theme,
    setTheme,
  };
};

export default useThemeChange;
