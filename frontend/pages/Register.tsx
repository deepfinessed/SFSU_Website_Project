import React from 'react';
import { Field, Formik } from "formik";
import { InputField } from "../components/InputFields";
import { Container } from '@components/Layouts';




const Register = (): JSX.Element => {
  return (
    <Container align="center">

      <Formik
        onSubmit={data => {
          console.log(data);
        }}
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          phonenumber: "",
          address: "",
          county: "",
          zipcode: "",
          city: ""
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                name="firstName"
                placeholder="firstName"
                component={InputField}
              />
            </div>

            <div>
              <Field
                name="lastName"
                placeholder="lastName"
                component={InputField}
              />
            </div>

            <div>
              <Field
                name="email"
                placeholder="email"
                component={InputField}
              />
            </div>

            <div>
              <Field
                name="password"
                placeholder="password"
                type="password"
                component={InputField}
              />
            </div>

            <div>
              <Field
                name="address"
                placeholder="address"
                component={InputField}
              />
            </div>

            <div>
              <Field
                name="county"
                placeholder="county"
                component={InputField}
              />
            </div>

            <div>
              <Field
                name="zipcode"
                placeholder="zipcode"
                component={InputField}
              />
            </div>

            <div>
              <Field
                name="city"
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