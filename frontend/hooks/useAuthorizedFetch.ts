import { useAuth } from '@contexts/AuthContext';

export default async (
  url: string,
  options?: RequestInit
): Promise<Response> => {
  const [token] = useAuth();

  if (token === undefined) {
    // there is no auth - we probably want to redirect to login
    throw new Error('There is no access token');
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
