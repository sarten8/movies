import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'

const Overlay = styled.div`
  margin: 0;
  padding: 15px;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  border-radius: 5px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.7) 40%,
    rgba(0, 0, 0, 0.3) 70%,
    transparent 100%
  );
  z-index: 9997;
  opacity: 0;
  transition: all 0.4s ease;
`

const ImageContainer = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.4s ease;
`

const Year = styled.span`
  font-family: 'Raleway', sans-serif;
  font-size: 11px;
  font-weight: 300;
  color: #fc2f70;
  letter-spacing: 2px;
  margin-bottom: 6px;
`

const Title = styled.h1`
  margin: 0;
  padding: 0;
  width: 100%;
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.5px;
  color: white;
  line-height: 1.3;
  margin-bottom: 8px;
`

const Popularity = styled.span`
  font-family: 'Raleway', sans-serif;
  font-size: 10px;
  font-weight: 300;
  color: #888;
  letter-spacing: 1px;
`

const Card = styled.div`
  margin: 15px;
  padding: 0;
  height: 300px;
  width: 200px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.4s ease;
  overflow: hidden;
  position: relative;

  &:hover ${Overlay} {
    opacity: 1;
  }

  &:hover ${ImageContainer} {
    filter: grayscale(100%);
    transform: scale(1.05);
  }
`

export default function MovieCard({ movie }) {
  const year = movie.release_date ? movie.release_date.substring(0, 4) : ''
  const popularity = movie.vote_average ? movie.vote_average.toFixed(1) : '0.0'

  return (
    <Link href={`/movies/${movie.id}`}>
      <Card>
        <Overlay>
          {year && <Year>{year}</Year>}
          <Title>{movie.title}</Title>
          <Popularity>{popularity} / 10</Popularity>
        </Overlay>
        <ImageContainer>
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="200px"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: '#333' }} />
          )}
        </ImageContainer>
      </Card>
    </Link>
  )
}
