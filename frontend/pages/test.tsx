import React, { useState } from 'react';

import { theme } from '@utils';

import { Container } from '@components/Layouts';
import { Link, Text } from '@components/DataDisplay';
import { Button } from '@components/Inputs';
import { Input } from '@material-ui/core';
import queryString from 'querystring';

const Test = (): JSX.Element => {
  const [infoType, setInfoType] = useState('');
  const [county, setCounty] = useState('');
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  function handleClick() {
    const query = {
      type: 'covid',
      name: county,
    };
    // const myData = {
    //   cases: infoType
    // }
    const url = `${baseURL}/api/counties/?${queryString.stringify(query)}`;
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cases: infoType }),
    });
  }
  return (
    <Container align="center">
      <Text variant="h1">CSC648 - Team 6</Text>
      Input County:
      <Input
        value={county}
        onChange={(event) => setCounty(event.target.value)}
      />
      Input (data):
      <Input
        value={infoType}
        onChange={(event) => setInfoType(event.target.value)}
      />
      Go:
      <Button
        onClick={() => {
          handleClick();
        }}
      >
        Go
      </Button>
      {county}
      {infoType}
    </Container>
  );
};

export default Test;
