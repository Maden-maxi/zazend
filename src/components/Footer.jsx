import React from 'react';
import styled from 'styled-components';

import { Container, Flex } from 'styled-minimal';

import NavMenu from 'components/NavMenu';

const FooterWrapper = styled.footer`
  border-top: 0.1rem solid #ddd;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  background: #fff;
  ul li a {
    color: #000;
  }
`;

const Footer = () => (
  <FooterWrapper>
    <Container py={3}>
      <Flex justifyContent="space-between">
        <NavMenu />
      </Flex>
    </Container>
  </FooterWrapper>
);

export default Footer;
