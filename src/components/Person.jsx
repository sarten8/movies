import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  margin-right: 5px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  border: 1px solid #101010;
  border-radius: 50%;
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 50%;
`
const P = styled.span`
  margin-top: 11px;
  display: block;
  width: 75px;
  text-align: center;
  font-size: 10px;
  line-height: 1;
`

export default ({ avatar, name }) => (
  <Content>
    <Container>
      <Image src={`https://image.tmdb.org/t/p/w500/${avatar}`} alt="" />
    </Container>
    <P>{name}</P>
  </Content>
)
