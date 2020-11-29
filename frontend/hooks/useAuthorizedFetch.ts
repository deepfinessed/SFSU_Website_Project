import { useRouter } from 'next/router';
import { useAuth } from '@contexts/AuthContext';

export default () => {
  const [token, , isLoading] = useAuth();
  const router = useRouter();
  const authFetch = async (
    url: string,
    options?: RequestInit
  ): Promise<Response> => {
    if (token === undefined && !isLoading) {
      // there is no auth - we probably want to redirect to login
      router.push('/Login');
    }

    const fetchOptions: RequestInit = {
      ...options,
    };
    fetchOptions.headers = {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    };
    // In future, we may catch error on invalid auth and redirect to login
    return fetch(url, fetchOptions);
  };
  return authFetch;
};
