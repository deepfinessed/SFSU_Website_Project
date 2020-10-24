import React from 'react';
import { Field, Formik } from 'formik';
import { Container } from '@components/Layouts';
import { InputField } from '../components/InputFields';

const Register = (): JSX.Element => {
  return (
    <Container align="center">
      <Formik
        onSubmit={(data) => {
          return data;
        }}
        initialValues={{
          email: '',
          firstName: '',
          lastName: '',
          password: '',
          confirm_password: '',
          phonenumber: '',
          address: '',
          county: '',
          zipcode: '',
          city: '',
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                name="firstName"
                required
                placeholder="firstName"
                component={InputField}
              />
            </div>

            <div>
              <Field
                name="lastName"
                required
                placeholder="lastName"
                component={InputField}
              />
            </div>

            <div>
              <Field
                name="email"
                required
                pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                placeholder="email"
                component={InputField}
              />
            </div>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js" />
            <div>
              <Field
                name="password"
                required
                placeholder="password"
                type="password"
                component={InputField}
              />
            </div>
            <Field
              name="confirm_password"
              required
              placeholder="confirm password"
              type="password"
              id="message"
            />
            <div>
              <Field
                name="address"
                required
                placeholder="address"
                component={InputField}
              />
            </div>

            <div>
              <Field
                name="county"
                required
                placeholder="county"
                component={InputField}
              />
            </div>

            <div>
              <Field
                name="zipcode"
                required
                placeholder="zipcode"
                component={InputField}
              />
            </div>

            <div>
              <Field
                name="city"
                required
                placeholder="city"
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

export default Register;
