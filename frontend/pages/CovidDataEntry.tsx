import React from 'react';
import { Text } from 'components/DataDisplay';
import { Field, Formik } from 'formik';
import { Container } from '@components/Layouts';
import { InputField } from '../components/InputFields';
import useAuthorizedFetch from '../hooks/useAuthorizedFetch';

const CovidDataEntry = (): JSX.Element => {
  const authFetch = useAuthorizedFetch();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${baseURL}/api/records/covid/`;
  return (
    <Container align="center">
      <Text variant="h1"> Covid 19 Data Entry Form</Text>
      <Formik
        onSubmit={(data) => {
          console.log(JSON.stringify(data));
          // fetch(url, {
          //   method: 'POST',
          //   headers: { 'Content-type': 'application/json' },
          //   body: JSON.stringify(data)
          // }).then((response) => console.log(response));
          authFetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data),
          })
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
        }}
        initialValues={{
          county_id: '',
          county: '',
          deaths: 0,
          icu: 0,
          hosp: 0,
          cases: 0,
          date: new Date().toISOString().split('T')[0],
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                name="county_id"
                required
                placeholder="County Code"
                component={InputField}
              />
            </div>
            <div>
              <Field
                name="countyName"
                required
                placeholder="County name"
                component={InputField}
              />
            </div>
            <div>
              <Field
                name="deaths"
                required
                placeholder="Number of Deaths"
                component={InputField}
                type="number"
              />
            </div>
            <div>
              <Field
                name="icu"
                required
                placeholder="ICU number"
                component={InputField}
                type="number"
              />
            </div>
            <div>
              <Field
                name="hosp"
                required
                placeholder="hospitals"
                component={InputField}
                type="number"
              />
            </div>
            <div>
              <Field
                name="cases"
                required
                placeholder="number of cases"
                component={InputField}
                type="number"
              />
            </div>
            <div>
              <Field
                name="date"
                required
                placeholder="date"
                component={InputField}
                type="date"
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
