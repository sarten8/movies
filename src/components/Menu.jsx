import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Menu = styled.div`
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
  z-index: -20;
  > div {
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`

const LinkSpan = styled.span`
  padding: 10px;
  display: block;
  overflow: hidden;
  font-family: 'Advent Pro', sans-serif;
  text-decoration: none;
  font-size: 28px;
  letter-spacing: 1px;
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

export default ({ menuStatus, menuActive }) => {
  const [open, setOpen] = useState(menuStatus ? menuStatus : false)

  const updateActive = () => {
    if (open) setOpen(false)
    menuActive()
  }

  const _handleClick = () => {
    updateActive()
  }

  useEffect(() => {
    if (open !== menuStatus) setOpen(menuStatus)
  }, [menuStatus])

  return open ? (
    <Menu>
      <div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <LinkSpan
            style={{ animationDuration: '.5s' }}
            onClick={_handleClick}
          >
            HOME
          </LinkSpan>
        </Link>
        <Link to="/movies" style={{ textDecoration: 'none' }}>
          <LinkSpan
            style={{ animationDuration: '.53s' }}
            onClick={_handleClick}
          >
            TRENDING WEEK
          </LinkSpan>
        </Link>
        <Link to="/search" style={{ textDecoration: 'none' }}>
          <LinkSpan
            style={{ animationDuration: '.59s' }}
            onClick={_handleClick}
          >
            SEARCH
          </LinkSpan>
        </Link>
      </div>
    </Menu>
  ) : (
    ''
  )
}
