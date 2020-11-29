import React from 'react';
import { useRouter } from 'next/router';
import { Field, Formik } from 'formik';
import { Container } from '@components/Layouts';
import { InputField } from '@components/InputFields';
import { Text } from '@components/DataDisplay';
import { useAuth } from '@contexts/AuthContext';

const Login = (): JSX.Element => {
  const router = useRouter();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${baseURL}/api/users/login`;
  const [authToken, setAuthToken] = useAuth();
  return (
    <Container align="center">
      <Text variant="h1">Login</Text>
      <Formik
        onSubmit={(data) => {
          console.log(JSON.stringify(data));
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            alert('Email is wrong format');
            return;
          }
          fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include',
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              console.log(`authToken was ${authToken}`);
              setAuthToken(data.access_token);
            })
            // If login successful, redirect to home
            .then(() => {router.push('/')})
            // Else display a useful message, but for now we log
            .catch((err) => console.log(err));
        }}
        initialValues={{
          email: '',
          password: '',
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field name="email" placeholder="email" component={InputField} />
            </div>

            <div>
              <Field
                name="password"
                required
                placeholder="password"
                type="password"
                component={InputField}
              />
            </div>

            <button type="submit">submit</button>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
