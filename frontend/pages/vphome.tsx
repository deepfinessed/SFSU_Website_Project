import React, { useState } from 'react';

import { Container } from '@components/Layouts';
import { Link, Text } from '@components/DataDisplay';
import { Button } from '@components/Inputs';
import { triggerAsyncId } from 'async_hooks';
// import  {queryString } from  'query-string';
const queryString = require('query-string');

const VPHome = (): JSX.Element => {
  const [infoType, setInfoType] = useState('corona');
  const [county, setCounty] = useState('');
  const emptyArr: string[] = [];
  const emptyIntArr: Int16Array[] = [];
  const [counties, setCounties] = useState(emptyArr);
  const [ids, setIds] = useState(emptyIntArr);
  const [trigger, setTrigger] = useState('');
  async function makeLinksFromInput(event: HTMLInputElement) {
    setCounties([]);
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const query = {
      name: event.value,
      type: 'all',
    };
    const tempCounties: string[] = [];
    const tempIds: Int16Array[] = [];
    const fetchUrl =
      `http://${baseURL}/api/counties/?` + queryString.stringify(query);
    console.log(fetchUrl);
    await fetch(fetchUrl)
      .then((response) => {
        if (response.statusText !== 'OK') {
          return undefined;
        }
        return response.json();
      })
      .then((data) => {
        if (data === undefined) {
          console.log('fetch error');
          return;
        }
        for (let i = 0; i < data.length; i++) {
          tempCounties.push(data[i].name);
          tempIds.push(data[i].id);
          console.log(counties[i]);
        }
      });
    setCounties(tempCounties);
    setIds(tempIds);
    setTrigger(event.value);
  }

  return (
    <Container align="center">
      <Text variant="h3">Home test for vertical prototype</Text>
      County:
      <input
        id="width"
        onChange={(event) => makeLinksFromInput(event.target)}
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
      <div key={trigger} style={{ display: 'flex', flexDirection: 'column' }}>
        {counties.map((str, index) => {
          return (
            <Link
              href={{
                pathname: `/infoPages/${infoType}`,
                query: { id: `${ids[index]}` },
              }}
            >
              <div key={str}>{str}</div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
};

export default VPHome;
