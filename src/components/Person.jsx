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
  width: 90px;
  height: 90px;
  border: 2px solid #ffaf7b;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
`
const P = styled.span`
  margin-top: 11px;
  display: block;
  width: 90px;
  text-align: center;
  font-size: 11px;
  line-height: 1.2;
  font-weight: 500;
`

export default ({ avatar, name }) => (
  <Content>
    <Container>
      <Image src={`https://image.tmdb.org/t/p/w500/${avatar}`} alt="" />
    </Container>
    <P>{name}</P>
  </Content>
)
