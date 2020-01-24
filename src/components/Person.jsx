import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 5px;
`

const Container = styled.div`
  display: flex;
  width: 45px;
  height: 45px;
  border: 1px solid #101010;
  border-radius: 50%;
`
const Image = styled.img`
  width: 45px;
  height: 45px;
  background-size: cover;
  background-position: top center;
  border-radius: 50%;
`
const P = styled.span`
  font-size: 8px;
`

export default ({ avatar, name }) => (
  <Content>
    <Container>
      <Image src={`https://image.tmdb.org/t/p/w500/${avatar}`} alt="" />
    </Container>
    <P>{name}</P>
  </Content>
)
