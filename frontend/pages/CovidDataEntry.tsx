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
          county_id: "",
          county: "",
          deaths: "",
          icu: "",
          hosp:"",
          cases:"",
          date:""
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                name="county_id" required
                placeholder="County Code"
                component={InputField}
              />
            </div>
            <div>
              <Field
                name="county" required
                placeholder="County name"
                component={InputField}
              />
            </div>
            <div>
              <Field
                name="deaths" required
                placeholder="Number of Deaths"
                component={InputField}
              />
            </div>
            <div>
              <Field
                name="icu" required
                placeholder="ICU number"
                component={InputField}
              />
            </div>
            <div>
              <Field
                name="hosp" required
                placeholder="hospitals"
                component={InputField}
              />
            </div>
            <div>
              <Field
                name="cases" required
                placeholder="number of cases"
                component={InputField}
              />
            </div>
            <div>
              <Field
                name="date" required
                placeholder="date"
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