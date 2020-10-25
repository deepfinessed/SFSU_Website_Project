import React from 'react';
import { Field, Formik } from "formik";
import { InputField } from "../components/InputFields";
import { Container } from '@components/Layouts';




const CovidDataEntry= (): JSX.Element => {
  return (
    <Container align="center">

      <Formik
        onSubmit={data => {
          console.log(data);
        }}
        initialValues={{
          countycode: "",
          numbercases:""
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                name="County Code" required
                placeholder="countycode"
                component={InputField}
              />
            </div>
            <div>
              <Field
                name="Number of new cases today" required
                placeholder="numbercases"
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

export default CovidDataEntry;