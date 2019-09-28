import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from './MenuIcon'
import Menu from './Menu'
import styled from 'styled-components'
import LogoImg from '../utils/images/logo.png'

const Header = styled.div`
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  left: 0;
  padding: 20px;
  max-width: 100%;
  background: #050505;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 9999;
`

const Logo = styled.img`
  width: 60px;
  height: 60px;
  padding: 0;
  transition: all 10s;
  :hover {
    opacity: 0.7;
    transform: rotateZ(3600deg);
    transition: all 10s;
  }
`

export default () => {
  const [active, setActive] = useState(false)

  const updateActive = () => {
    if (active) setActive(false)
    else setActive(true)
  }

  return (
    <Header>
      <Link to="/">
        <Logo src={LogoImg} alt="" onClick={() => setActive(false)} />
      </Link>
      <MenuIcon menuStatus={active} menuActive={updateActive} />
      <Menu menuStatus={active} menuActive={updateActive} />
    </Header>
  )
}
