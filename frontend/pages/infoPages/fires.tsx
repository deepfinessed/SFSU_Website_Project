import React from 'react';
import { useRouter } from 'next/router';

import { Container } from '@components/Layouts';
import { Text } from '@components/DataDisplay';

const Fires = (): JSX.Element => {
  const router = useRouter();
  return (
    <Container align="center">
      <Text variant="h3">Fires</Text>
      County:
      {router.query.county || 'Not Specified'}
    </Container>
  );
};

export default Fires;
