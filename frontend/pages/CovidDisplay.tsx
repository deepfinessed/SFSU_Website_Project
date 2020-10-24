import React, { useEffect } from 'react';

import { Container } from '@components/Layouts';
import { Link, Text } from '@components/DataDisplay';
import { Button } from '@components/Inputs';
import { Input } from '@material-ui/core';
import queryString from 'querystring';
import { Chart } from 'chart.js';

const CovidDisplay = (): JSX.Element => {
  useEffect(() => {
    const canvas = document.getElementById('myChart');
    Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Date 1', 'Date 2', 'Date 3'],
        datasets: [
          {
            label: 'Deaths',
            backgroundColor: 'blue',
            data: [3, 2, 4],
          },
          {
            label: 'Cases',
            backgroundColor: 'red',
            data: [23, 19, 15],
          },
          {
            label: 'Icu',
            backgroundColor: 'green',
            data: [12, 12, 6],
          },
        ],
      },
      options: {
        responsive: false,
        legend: { display: true },
        title: {
          display: true,
          text: 'Covid info',
        },
      },
    });
  });
  return (
    <Container align="center">
      <Text variant="h1">Covid Display</Text>
      <canvas id="myChart" width="400px" height="400px" />
    </Container>
  );
};

export default CovidDisplay;
