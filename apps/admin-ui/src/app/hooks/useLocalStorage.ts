import { useEffect, useState } from 'react';

const useLocalStorage = <T>(key: string, defaultValue: T | null = null) => {
  const [value, setValue] = useState<T | null>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return { value, setValue } as const;
};

export default useLocalStorage;
