import React from 'react';

import { uuid } from '@utils';

import { Container } from '@components/Layouts';
import { Avatar, Link, Text } from '@components/DataDisplay';

const About = (): JSX.Element => {
  const data = [
    { pic: '/lauren.jpg', name: 'Lauren' },
    { pic: '/nate.png', name: 'Nate' },
    { pic: '/yann.jpg', name: 'Yann' },
    { pic: '/Jair.png', name: 'Jair' },
    { pic: '/alvaro.png', name: 'Alvaro' },
  ];

  return (
    <Container align="center">
      <Text variant="h1">Dream Team</Text>
      <Container row>
        {data.map((e) => (
          <Link href={`/about/${e.name.toLowerCase()}`} key={uuid()}>
            <Avatar
              size={120}
              src={e.pic}
              alt={e.name}
              align="flex-start"
              label={e.name}
              gap={8}
            />
          </Link>
        ))}
      </Container>
    </Container>
  );
};

export default About;
