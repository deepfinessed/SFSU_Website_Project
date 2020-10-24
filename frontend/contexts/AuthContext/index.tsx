import React, {
  ReactNode,
  useState,
  createContext,
  useMemo,
  useEffect,
  useContext,
} from 'react';

import refreshAccess from '../../auth/refreshAccess';

interface AccessToken {
  accessToken: string | undefined;
  setAccessToken: (accessToken: string) => void;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const AuthContext: React.Context<AccessToken> = createContext();

export default ({ children }: { children: ReactNode }): JSX.Element => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  /*
  TODO:
  1. on app start, query for refresh token,
  2. Enable universal login/logout
  3. start refresh loop [useEffect with no deps]
   */

  // on app start, attempt to get a new access token
  useEffect(() => {
    const refresh = async () => {
      let token;
      try {
        token = await refreshAccess();
      } catch (err) {
        // The user does not have a valid access token
        // They could just not be logged in
      }
      setAccessToken(token?.access_token);
    };

    const logout = (event: StorageEvent) => {
      if (event.key === 'logout') {
        setAccessToken(undefined);
      }
    };

    refresh().then(() => {});

    // Also, ensure that logging out on OTHER tabs logs us out here

    window.addEventListener('storage', logout);

    // We will later add polling to refresh token before expiration
  }, []);

  const token = useMemo<AccessToken>(
    () => ({
      accessToken,
      setAccessToken,
    }),
    [accessToken, setAccessToken]
  );

  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
};

export const useAuth = (): [
  string | undefined,
  (accessToken: string) => void
] => {
  const context = useContext<AccessToken>(AuthContext);

  return [context.accessToken, context.setAccessToken];
};
