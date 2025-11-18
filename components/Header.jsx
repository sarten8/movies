import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MenuIcon from './MenuIcon'
import Menu from './Menu'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  left: 0;
  padding: 22px;
  max-width: 100%;
  height: 56px;
  background: #050505;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 9995;
`

const LogoWrapper = styled.div`
  position: relative;
  width: 46px;
  height: 46px;
  transition: all 10s;
  cursor: pointer;
  :hover {
    opacity: 0.7;
    transform: rotateZ(3600deg);
    transition: all 10s;
  }
`

export default function Header() {
  const [active, setActive] = useState(false)

  const updateActive = () => {
    setActive(!active)
  }

  return (
    <>
      <HeaderContainer>
        <Link href="/">
          <LogoWrapper onClick={() => setActive(false)}>
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={46}
              height={46}
              priority
            />
          </LogoWrapper>
        </Link>
        <MenuIcon menuStatus={active} menuActive={updateActive} />
      </HeaderContainer>
      <Menu menuStatus={active} menuActive={updateActive} />
    </>
  )
}
