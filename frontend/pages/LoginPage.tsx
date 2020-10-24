import React from 'react';
import { Field, Formik } from 'formik';
import { Container } from '@components/Layouts';
import { InputField } from '../components/InputFields';

const Login = (): JSX.Element => {
  return (
    <Container align="center">
      <Formik
        onSubmit={(data) => {
          return data;
        }}
        initialValues={{
          email: '',
          password: '',
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                name="email"
                placeholder="email"
                pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                required
                component={InputField}
              />
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
