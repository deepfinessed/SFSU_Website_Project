import React, { useState } from 'react';
import queryString from 'querystring';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Container } from '@components/Layouts';
import { Text } from '@components/DataDisplay';
import { Button } from '@components/Inputs';
import County from '../types/County';

const VPHome = (): JSX.Element => {
  const [infoType, setInfoType] = useState('all');
  const [county, setCounty] = useState('');
  const [countyList, setCountyList] = useState<Array<County>>([]);

  async function getCounties() {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const query = {
      name: county,
      type: infoType,
    };
    const url = `http://${baseURL}/api/counties/?${queryString.stringify(
      query
    )}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCountyList(data));
  }

  type CountyTableProps = {
    countyArray: Array<County>;
  };

  const CountyTable = ({ countyArray }: CountyTableProps): JSX.Element => {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>County Name</TableCell>
              <TableCell>Population</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Longitude</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countyArray.map((countyEntry) => (
              <TableRow key={countyEntry.id}>
                <TableCell component="th" scope="row">
                  {countyEntry.name}
                </TableCell>
                <TableCell>{countyEntry.population}</TableCell>
                <TableCell>{countyEntry.latitude}</TableCell>
                <TableCell>{countyEntry.longitude}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Container align="center">
      <Text variant="h3">Home test for vertical prototype</Text>
      County:
      <input
        id="width"
        type="text"
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
        <option value="covid">Corona Virus</option>
        <option value="fire">Fires</option>
        <option value="all">All</option>
      </select>
      <div>Leave blank for list of all counties.</div>
      <Button variant="secondary" onClick={() => getCounties()}>
        Search
      </Button>
      <CountyTable countyArray={countyList} />
    </Container>
  );
};

export default VPHome;
