import React from 'react';
import { useRouter } from 'next/router';

import { Container } from '@components/Layouts';
import { Text } from '@components/DataDisplay';

const Corona = (): JSX.Element => {
  const router = useRouter();
  return (
    <Container align="center">
      <Text variant="h3">
        Corona
        {router.query.county}
      </Text>
    </Container>
  );
};

export default Corona;
