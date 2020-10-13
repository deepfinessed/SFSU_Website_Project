import React, { useState } from 'react';

import { Container } from '@components/Layouts';
import { Link, Text } from '@components/DataDisplay';
import { Button } from '@components/Inputs';

const VPHome = (): JSX.Element => {
  const [infoType, setInfoType] = useState('corona');
  const [county, setCounty] = useState('');
  return (
    <Container align="center">
      <Text variant="h3">Home test for vertical prototype</Text>
      County:
      <input
        id="width"
        value={county}
        onChange={(event) => setCounty(event.target.value)}
      />
      <br />
      Info Selection:
      <select
        name="infoType"
        id="infoType"
        onChange={(event) => setInfoType(event.target.value)}
      >
        <option value="corona">Corona Virus</option>
        <option value="fires">Fires</option>
      </select>
      <div>Leave blank for list of all counties.</div>
      <Link
        href={{
          pathname: `/infoPages/${infoType}`,
          query: { county: `${county}` },
        }}
      >
        <Button variant="secondary">Go</Button>
      </Link>
    </Container>
  );
};

export default VPHome;
