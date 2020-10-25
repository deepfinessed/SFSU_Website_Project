import React from 'react';



import { Container } from '@components/Layouts';
import { Link } from '@components/DataDisplay';
import { Button } from '@components/Inputs';


const Home = (): JSX.Element => {
  return (
    <Container align="center">
      <Link href="/CovidDataEntry">
        <Button variant="secondary"> Covid 19 Data Entry</Button>
      </Link>
      <Link href="/FireDataEntry">
        <Button variant="secondary"> Fire Data Entry </Button>
      </Link>
    </Container> 
  );
};

export default Home;
