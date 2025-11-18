import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'

const Contratapa = styled.div`
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-image: linear-gradient(
    to right top,
    #050505,
    #050505cc,
    #3d2b3acc,
    #844b5acc,
    #c87462cc,
    #f4af60cc,
    #f9f871cc
  );
  z-index: 9997;
  transition: all 0.5s;
`

const ImageContainer = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
  transition: 0.6s;
`

const Title = styled.h1`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  width: 180px;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 34px;
  letter-spacing: -2px;
  color: white;
  text-align: center;
`

const Card = styled.div`
  margin: 25px;
  padding: 0;
  height: 300px;
  width: 200px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.5s;
  overflow: hidden;
  position: relative;
  &:hover ${Contratapa} {
    display: flex;
    transition: all 0.5s;
  }
  &:hover ${ImageContainer} {
    transform: scale(1.1);
    transition: all 0.5s;
  }
`

export default function MovieCard({ movie }) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <Card>
        <Contratapa>
          <Title>{movie.title}</Title>
        </Contratapa>
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
