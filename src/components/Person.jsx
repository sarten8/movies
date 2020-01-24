import React, { Fragment } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  margin: 5px;
  width: 60px;
  height: 60px;
  border: 1px solid #101010;
  border-radius: 50%;
`
const Image = styled.img`
  width: 60px;
  height: 60px;
  background-size: cover;
  background-position: top center;
  border-radius: 50%;
`
const P = styled.h6`
  font-family: 'Roboto';
  font-size: 8px;
`

export default ({ avatar }) => (
  <Fragment>
    <Container>
      <Image src={`https://image.tmdb.org/t/p/w500/${avatar}`} alt="" />
    </Container>
    <P>John le Carre</P>
  </Fragment>
)
