import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { useSWRConfig } from 'swr'

const Overlay = styled.div`
  margin: 0;
  padding: 12px;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  border-radius: 8px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.8) 35%,
    rgba(0, 0, 0, 0.4) 60%,
    transparent 100%
  );
  z-index: 2;
  opacity: 1;
  transition: all 0.3s ease;
`

const ImageContainer = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.4s ease;

  img {
    transition: filter 0.4s ease;
  }
`

const ScoreBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 6px 10px;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 6px;
  border: 1px solid ${props => {
    const score = parseFloat(props.$score)
    if (score >= 7) return '#4ade80'
    if (score >= 5) return '#fbbf24'
    return '#f87171'
  }};
  z-index: 3;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
`

const ScoreText = styled.span`
  font-family: 'Raleway', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: ${props => {
    const score = parseFloat(props.$score)
    if (score >= 7) return '#4ade80'
    if (score >= 5) return '#fbbf24'
    return '#f87171'
  }};
  letter-spacing: 0.5px;
`

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Year = styled.span`
  font-family: 'Raleway', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #fc2f70;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.6);
`

const Title = styled.h2`
  margin: 0;
  padding: 0;
  width: 100%;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.3px;
  color: #ffffff;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.6);
`

const Card = styled.div`
  padding: 0;
  height: 300px;
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.5);
  }

  &:hover ${ImageContainer} {
    transform: scale(1.08);
  }

  &:hover ${ImageContainer} img {
    filter: grayscale(100%);
  }
`

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  font-family: 'Raleway', sans-serif;
  font-size: 12px;
  text-align: center;
  padding: 20px;
`

export default function MovieCard({ movie }) {
  const { mutate } = useSWRConfig()
  const year = movie.release_date ? movie.release_date.substring(0, 4) : ''
  const score = movie.vote_average ? movie.vote_average.toFixed(1) : '0.0'

  // Prefetch movie data on hover
  const handleMouseEnter = () => {
    const movieUrl = `/api/movies/${movie.id}`
    const castUrl = `/api/movies/${movie.id}/cast`

    // Prefetch movie details
    fetch(movieUrl)
      .then(res => res.json())
      .then(data => {
        mutate(movieUrl, data, false)
      })
      .catch(() => {})

    // Prefetch cast
    fetch(castUrl)
      .then(res => res.json())
      .then(data => {
        mutate(castUrl, data, false)
      })
      .catch(() => {})
  }

  return (
    <Link href={`/movies/${movie.id}`}>
      <Card onMouseEnter={handleMouseEnter}>
        <ScoreBadge $score={score}>
          <ScoreText $score={score}>{score}</ScoreText>
        </ScoreBadge>
        <Overlay>
          <InfoContainer>
            {year && <Year>{year}</Year>}
            <Title>{movie.title}</Title>
          </InfoContainer>
        </Overlay>
        <ImageContainer>
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <PlaceholderImage>No image available</PlaceholderImage>
          )}
        </ImageContainer>
      </Card>
    </Link>
  )
}
