import React from 'react';
import { Field, Formik } from 'formik';
import { Container } from '@components/Layouts';
import { InputField } from '@components/InputFields';  
import { Text } from '@components/DataDisplay';



const Login = (): JSX.Element => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const url = `${baseURL}/api/users/login`;
    return (

        <Container align='center'>
            <Text variant="h1">Login</Text>
            <Formik
                onSubmit={data => {
                    console.log(JSON.stringify(data));
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                        alert("Email is wrong format")
                        return;
                    }
                    fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    }).then((response) => console.log(response));

                }}
                initialValues={{
                    email: "",
                    password: ""
                }}
            >
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Field
                                name="email"
                                placeholder="email"
                                component={InputField}
                            />
                        </div>

                        <div>
                            <Field
                                name="password" required
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
