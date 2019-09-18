import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Span1 = styled.span`
  position: absolute;
  top: 15px;
  right: 0;
  width: 20px;
  border: 1px solid #ddd;
  transition: 0.3s;
`

const Span2 = styled.span`
  position: absolute;
  top: 15px;
  right: 0;
  width: 30px;
  border: 1px solid #ddd;
  margin-top: 5px;
  transition: 0.3s;
`

const Span1active = styled.span`
  position: absolute;
  top: 15px;
  right: 0;
  width: 30px;
  border: 1px solid #ddd;
  transform: rotate(45deg);
  transition: 0.8s;
`

const Span2active = styled.span`
  position: absolute;
  top: 15px;
  right: 0;
  width: 30px;
  border: 1px solid #ddd;
  transform: rotate(-45deg);
  transition: 0.8s;
`

const Icon = styled.div`
  position: relative;
  display: block;
  width: 30px;
  height: 30px;
  transition: all .8s;
  cursor: pointer;
  :hover ${Span1} {
    width: 30px;
  }
  :hover ${Span2} {
    width: 20px;
  }
  :hover ${Span1active} {
    background: linear-gradient(to right, #ff8a00 30%, red 55%, #330867 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transform: rotateZ(-135deg);
    transition: all .8s;
  }
  :hover ${Span2active} {
    background: linear-gradient(to right, #ff8a00 30%, red 55%, #330867 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transform: rotateZ(135deg);
    transition: all .8s;
  }
`

export default ({ menuStatus, menuActive }) => {
  const [active, setActive] = useState(false)

  const updateActive = () => {
    if (active) setActive(false)
    else setActive(true)
    menuActive()
  }

  useEffect(() => {
    if (active !== menuStatus) setActive(menuStatus)
  }, [menuStatus])

  return (
    <Icon onClick={updateActive}>
      {active ? <Span1active /> : <Span1 />}
      {active ? <Span2active /> : <Span2 />}
    </Icon>
  )
}
