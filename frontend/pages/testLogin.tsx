import React, { useEffect } from 'react';
import qs from 'querystring';

const TestLogin = (): JSX.Element => {
  useEffect(() => {
    const login = async () => {
      const data = {
        email: 'test@test.test',
        password: 'testpw',
      };
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/login/`;
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs.stringify(data),
        credentials: 'include',
      });
      console.log(resp);
    };
    login();
  });
  return <></>;
};

export default TestLogin;
