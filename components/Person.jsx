import Image from 'next/image'
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
  position: relative;
  display: flex;
  width: 60px;
  height: 60px;
  border: 1px solid #101010;
  border-radius: 50%;
  overflow: hidden;
`

const P = styled.span`
  margin-top: 11px;
  display: block;
  width: 75px;
  text-align: center;
  font-size: 10px;
  line-height: 1;
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
            sizes="60px"
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
