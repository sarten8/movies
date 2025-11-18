import Link from 'next/link'
import styled from 'styled-components'

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #050505e7;
  z-index: 9998;
  > div {
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`

const LinkSpan = styled.span`
  padding: 10px;
  display: block;
  overflow: hidden;
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  text-decoration: none;
  font-size: 28px;
  letter-spacing: 4px;
  cursor: pointer;
  margin: 5px;
  position: relative;
  animation: moveLeftLink ease;
  -webkit-animation: moveLeftLink ease;
  -moz-animation: moveLeftLink ease;
  -o-animation: moveLeftLink ease;
  -ms-animation: moveLeftLink ease;
  color: white;
  transition: all 0.5s;
  ::after {
    padding: 0;
    content: '';
    display: block;
    transition: all 0.5s ease;
    position: absolute;
    bottom: 0;
    left: 0;
    background: radial-gradient(
      circle,
      rgba(204, 17, 4, 0.719) 10px,
      rgba(0, 0, 0, 0.014) 60%
    );
    opacity: 0.8;
    z-index: -2;
    transition: all 0.5s ease-in-out;
    width: 0;
    height: 0;
  }
  :hover::after {
    width: 100%;
    height: 2px;
    transition: width 0.5s ease-in-out;
  }
`

export default function Menu({ menuStatus, menuActive }) {
  const handleClick = () => {
    menuActive()
  }

  return menuStatus ? (
    <MenuContainer>
      <div>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <LinkSpan
            style={{ animationDuration: '.5s' }}
            onClick={handleClick}
          >
            HOME
          </LinkSpan>
        </Link>
        <Link href="/search" style={{ textDecoration: 'none' }}>
          <LinkSpan
            style={{ animationDuration: '.59s' }}
            onClick={handleClick}
          >
            SEARCH
          </LinkSpan>
        </Link>
        <Link href="/movies" style={{ textDecoration: 'none' }}>
          <LinkSpan
            style={{ animationDuration: '.53s' }}
            onClick={handleClick}
          >
            TRENDING WEEK
          </LinkSpan>
        </Link>
      </div>
    </MenuContainer>
  ) : null
}
