interface AccessToken {
  access_token: string;
  token_type: string;
  refresh_token: string;
}
export default async (): Promise<AccessToken> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/refresh/`;
  const token: AccessToken = await fetch(url, {
    method: 'POST',
    credentials: 'include',
  }).then((resp) => resp.json());
  return token;
};
