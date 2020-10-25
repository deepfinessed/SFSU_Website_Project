import React from 'react';

import { theme } from '@utils';

import { Container } from '@components/Layouts';
import { Link, Text } from '@components/DataDisplay';
import { Button } from '@components/Inputs';


const Home = (): JSX.Element => {
  return (
    <Container align="center">
      <Link href="/Register">
        <Button variant="secondary"> Register</Button>
      </Link>
      <Link href="/Login">
        <Button variant="secondary"> Login </Button>
      </Link>
      <Link href="/DataEntry">
        <Button variant="secondary"> Data Entry</Button>
      </Link>
      <Text variant="h1">CSC648 - Team 6</Text>
      <Text variant="h4">
        Discover the&nbsp;
        <Text variant="small" color={theme.cvar('colorLink')}>
          dream team
        </Text>
        &nbsp;below!
      </Text>
      <Link href="/about">
        <Button variant="secondary">Dream Team</Button>
      </Link>
      <Link href="/vphome">
        <Button variant="secondary">Home for vp</Button>
      </Link>
    </Container> 
  );
};

export default Home;
