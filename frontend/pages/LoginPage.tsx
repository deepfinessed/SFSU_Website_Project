import React from 'react';
import { Field, Formik } from "formik";
import { InputField } from "../components/InputFields";
import { Container } from '@components/Layouts';


const Login = (): JSX.Element => {
    return (
        <Container align='center'>
            <Formik
                onSubmit={data => {
                    console.log(data);
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

                        <button type="submit">submit</button>
                    </form>
                )}
            </Formik>
        </Container>
    );
};


export default Login;
