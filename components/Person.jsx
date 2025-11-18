import Image from 'next/image'
import styled from 'styled-components'

const Content = styled.div`
  margin-right: 8px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  position: relative;
  display: flex;
  width: 80px;
  height: 80px;
  border: 1px solid #101010;
  border-radius: 50%;
  overflow: hidden;
  @media screen and (min-width: 1200px) {
    width: 100px;
    height: 100px;
  }
`

const P = styled.span`
  margin-top: 11px;
  display: block;
  width: 90px;
  text-align: center;
  font-size: 12px;
  line-height: 1.2;
  @media screen and (min-width: 1200px) {
    width: 110px;
    font-size: 14px;
  }
`

export default function Person({ avatar, name }) {
  return (
    <Content>
      <Container>
        {avatar ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500/${avatar}`}
            alt={name || 'Actor'}
            fill
            sizes="(max-width: 1200px) 80px, 100px"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div style={{ width: '100%', background: '#333' }} />
        )}
      </Container>
      <P>{name}</P>
    </Content>
  )
}
