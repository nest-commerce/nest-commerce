import { useLocalStorage } from '@mantine/hooks';
import { useEffect } from 'react';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>({
    key: 'darkMode',
    defaultValue: true,
  });

  useEffect(() => {
    document.documentElement.classList?.[isDarkMode ? 'add' : 'remove']('dark');
  }, [isDarkMode]);

  return {
    isDarkMode,
    setIsDarkMode,
    toggleDarkMode: () => setIsDarkMode(!isDarkMode),
  };
};
