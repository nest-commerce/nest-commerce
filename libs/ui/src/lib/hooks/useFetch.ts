import { useUser } from './useUser';

export const useFetch = () => {
  const { user, setUser } = useUser();

  const addDefaultConfig = (init: RequestInit | undefined): RequestInit => ({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(user && { Authorization: `Bearer ${user.accessToken}` }),
    },
    ...init,
  });

  return {
    fetch: async <Data>(
      input: RequestInfo | URL,
      init?: RequestInit
    ): Promise<Data | null> => {
      const res = await fetch(input, addDefaultConfig(init));
      const json = await res.json();
      if (!res.ok) {
        const error = json?.message;
        if (error === 'Unauthorized') {
          setUser(null);
          return null;
        }
        throw new Error(error);
      }
      return json;
    },
  };
};
