'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  left: 0;
  padding: 12px 22px;
  max-width: 100%;
  height: auto;
  background: #050505;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
  z-index: 9995;
`

const NavLink = styled.span`
  font-family: 'Raleway', sans-serif;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${props => props.$active ? '#fff' : '#888'};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 5px 0;
  position: relative;

  &:hover {
    color: #fff;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.$active ? '100%' : '0'};
    height: 1px;
    background: #fc2f70;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`

export default function Header() {
  const pathname = usePathname()

  return (
    <HeaderContainer>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <NavLink $active={pathname === '/' || pathname === '/search'}>
          home
        </NavLink>
      </Link>
      <Link href="/movies" style={{ textDecoration: 'none' }}>
        <NavLink $active={pathname === '/movies' || pathname.startsWith('/movies/')}>
          trending
        </NavLink>
      </Link>
    </HeaderContainer>
  )
}
