import React from 'react';
import { Container, Screen } from 'styled-minimal';

import Posts from 'containers/Posts';



const Home = () => (
  <Screen key="Private" data-testid="PrivateWrapper">
    <Container verticalPadding>
      <Posts />
    </Container>
  </Screen>
);

export default Home;
