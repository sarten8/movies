'use client'

import Image from 'next/image'
import styled from 'styled-components'

const Content = styled.div`
  display: flex;
  flex-direction: column;
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
  margin-top: 8px;
  display: block;
  width: 100%;
  text-align: center;
  font-size: 12px;
  line-height: 1.3;
  word-break: break-word;
  @media screen and (min-width: 1200px) {
    font-size: 14px;
  }
`

const Character = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: center;
  font-size: 10px;
  line-height: 1.2;
  color: #888;
  margin-top: 2px;
  @media screen and (min-width: 1200px) {
    font-size: 11px;
  }
`

export default function Person({ avatar, name, character }) {
  const copyToClipboard = (text) => {
    if (text && navigator.clipboard) {
      navigator.clipboard.writeText(text)
    }
  }

  return (
    <Content>
      <Container onClick={() => copyToClipboard(name)}>
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
      <P onClick={() => copyToClipboard(name)}>{name}</P>
      {character && <Character onClick={() => copyToClipboard(character)}>({character})</Character>}
    </Content>
  )
}
