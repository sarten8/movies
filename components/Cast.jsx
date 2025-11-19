'use client'

import Person from './Person'
import styled from 'styled-components'
import useSWR from 'swr'
import { CastSkeleton } from './Skeleton'

const Container = styled.div`
  margin-top: 40px;
  margin-bottom: 22px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 8px 4px;
  align-items: start;
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 12px 8px;
  }
  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    gap: 12px 8px;
  }
`

export default function Cast({ movieId }) {
  const { data: cast, error, isLoading } = useSWR(
    movieId ? `/api/movies/${movieId}/cast` : null,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutos de caché
    }
  )

  if (isLoading) return <CastSkeleton count={6} />
  if (error) return null
  if (!cast || !cast.cast) return null

  return (
    <Container>
      {cast.cast.slice(0, 12).map((actor, index) => (
        <Person
          key={index}
          avatar={actor.profile_path}
          name={actor.name}
          character={actor.character}
        />
      ))}
    </Container>
  )
}
