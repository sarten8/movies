import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Header = styled.ul`
  margin: 0;
  padding: 20px;
  width: 90%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 9999;
`

const LinkButton = styled.li`
  position: relative;
  cursor: pointer;
  margin: 5px;
  list-style-type: none;
  font-family: 'Oswald', sans-serif;
  font-weight: 100;
  font-size: 18px;
  transition: 0.5s;
  & > * {
    text-decoration: none;
    color: white;
  }
  ::before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    left: 0;
    bottom: 0;
    transition: all 0.5s;
    background: #c31432;
    background: -webkit-linear-gradient(to left, #240b36, #c31432);
    background: linear-gradient(to left, #240b36, #c31432);
  }
  :hover::before {
    width: 100%;
    height: 2px;
    transition: width 0.5s ease-in-out;
  }
`

export default () => (
  <Header>
    <LinkButton>
      <Link to="/home">Home</Link>
    </LinkButton>
    <LinkButton>
      <Link to="/countries">About</Link>
    </LinkButton>
  </Header>
)
