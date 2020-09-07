import React from 'react';

import { Container } from '@components/Layouts';
import { Text } from '@components/DataDisplay';
import Link from 'next/link';

const Nate = (): JSX.Element => {
  return (
    <Container align="center">
      <Text variant="h1">Nate Munger</Text>
      <img src="/Nate.png" alt="Nate" />
      <Container align="center" gap={3}>
        <Text variant="h4">
          Senior at SFSU studying computer science
          <br />
          Taught math and science at a local high school
          <br />
          Passionate about the intersection of education and technology
          <br />
          Role: Backend Lead
        </Text>
      </Container>
      <Text variant="h3">
        <Link href="https://github.com/deepfinessed">Github</Link>
      </Text>
    </Container>
  );
};

export default Nate;
