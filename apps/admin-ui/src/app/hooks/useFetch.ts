import { useState } from 'react';
import useUser from './useUser';

const useFetch = <Data>() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data | undefined>(undefined);
  const { user } = useUser();

  const addDefaultConfig = (init: RequestInit | undefined): RequestInit => ({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(user && { Authorization: `Bearer ${user.accessToken}` }),
    },
    ...init,
  });

  return {
    isLoading,
    data,
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      setIsLoading(true);
      const res = await fetch(input, addDefaultConfig(init));
      if (!res.ok) {
        setIsLoading(false);
        throw new Error((await res.json())?.message);
      }
      setData(await res.json());
      setIsLoading(false);
    },
  };
};

export default useFetch;
