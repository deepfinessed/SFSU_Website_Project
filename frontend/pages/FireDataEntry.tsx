import React from 'react';
import { Field, Formik } from "formik";
import { InputField } from "../components/InputFields";
import { Container } from '@components/Layouts';




const FireDataEntry= (): JSX.Element => {
  return (
    <Container align="center">

      <Formik
        onSubmit={data => {
            console.log(data);
        }}
        initialValues={{
          countycode: "",
          percentfirecontained:"",
          firewarninglevel:""
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                name="countycode" required
                placeholder="countycode"

                component={InputField}
              />
            </div>
            <div>
              <Field
                name="Fire percentage contained" required
                placeholder="percentfirecontained"
                component={InputField}
              />
            </div>
           
            <div>
              <Field
                name="Fire Warning Level" required
                placeholder="firewarninglevel"
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

export default FireDataEntry;