'use client'

import styled from 'styled-components'
import MovieCard from './MovieCard'

const Grid = styled.div`
  margin: 0;
  padding: 20px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }
`

export default function MoviesGrid({ movies }) {
  return (
    <Grid>
      {movies.map((movie, index) => (
        <MovieCard key={`${movie.id}-${index}`} movie={movie} />
      ))}
    </Grid>
  )
}
