import React from 'react';



import { Container } from '@components/Layouts';
import { Text } from '@components/DataDisplay';

const Alvaromaroto = (): JSX.Element => {
  return (
    <Container align="center">
      <Text variant="h2">
        Alvaro Maroto
      </Text>
      <p>
        <img src="/alvarophoto.png" alt="alvarophoto" />
      </p>

      <Container align="center">
        <Text variant="h4">
          Computer Science and engineering student at UC3M and SFSU <br></br>
          Hometown: Madrid, Spain <br></br>
          Role: Support <br></br>
          Info: I like sports (soccer, racing, boxing), videogames and traveling

        </Text>
      </Container>

      <Container>
        <Text variant="h3"> <a href="https://github.com/amarotoyepes">Github </a><a href="https://www.instagram.com/amaroto1">Instagram</a></Text>
      </Container>


      <Text variant="h4"> <a href="/">Back to home</a></Text>

    </Container>


  );

};

export default Alvaromaroto;
