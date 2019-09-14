import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NoMatch = styled.div`
  margin: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  margin: 0;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 36px;
  letter-spacing: 2px;
  position: relative;
  cursor: pointer;
  list-style-type: none;
  transition: all 0.5s;
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
    border-radius: 10px;
  }
  :hover::before {
    width: 100%;
    height: 3px;
    transition: width 0.5s ease-in-out;
  }
  & > * {
    text-decoration: none;
    color: white;
  }
`

export default () => (
  <NoMatch>
    <Title><Link to='/'>ups... back to home! CLICK ME</Link></Title>
  </NoMatch>
)
