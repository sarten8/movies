import Person from './Person'
import styled from 'styled-components'
import useSWR from 'swr'

const Container = styled.div`
  margin-top: 40px;
  margin-bottom: 22px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`

export default function Cast({ movieId }) {
  const { data: cast, error, isLoading } = useSWR(
    movieId ? `/api/movies/${movieId}/cast` : null,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutos de caché
    }
  )

  if (isLoading) return null
  if (error) return null
  if (!cast || !cast.cast) return null

  return (
    <Container>
      {cast.cast.slice(0, 12).map((actor, index) => (
        <Person
          key={index}
          avatar={actor.profile_path}
          name={actor.name}
        />
      ))}
    </Container>
  )
}
