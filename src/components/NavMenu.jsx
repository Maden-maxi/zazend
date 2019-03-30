import React from 'react';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
const NavMenuWrapper = styled.ul`
  display: flex;
  list-style: none;
  li a{
      padding: 10px 30px;
      color: #fff;
      &.active {
        text-decoration: underline;
        }
  }
  
`;

const NavMenu = () => (
    <NavMenuWrapper>
        <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
        <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
    </NavMenuWrapper>
);

export default NavMenu;