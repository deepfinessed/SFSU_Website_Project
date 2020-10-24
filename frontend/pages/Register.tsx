import React from 'react';
import { Field, Formik } from 'formik';
import { Container } from '@components/Layouts';
import { InputField } from '../components/InputFields';
import { Link, Text } from '@components/DataDisplay';
import { Button } from '@components/Inputs';



const Register = (): JSX.Element => {
  return (
    <Container align="center">
      <Text variant="h1">Registration</Text>
      <Formik
        onSubmit={data => {
          console.log(data);
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
                name="email" required
                placeholder="email"
                component={InputField}
              />
            </div>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js" />
            <div>
              <Field 
              name="phonenumer" required
              placeholder="phone number"
              component={InputField}
              />
              <Field
                name="password"
                required
                placeholder="password"
                type="password"
                component={InputField}
              />
            </div>
            <div>
            <Field
              name="confirm_password"
              required
              placeholder="confirm password"
              type="password"
              id="message"
            />
            </div>
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
      <Text variant="h6">Already Registered?</Text>
      <Link href="/LoginPage">
        <Button variant="secondary"> Login</Button>
      </Link>


    </Container>
  );
};

export default Register;
