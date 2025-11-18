import { useState, useEffect } from 'react'
import Person from './Person'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
  margin-bottom: 22px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`

export default function Cast({ movieId }) {
  const [cast, setCast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/api/movies/${movieId}/cast`)
        setCast(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (movieId) {
      fetchCast()
    }
  }, [movieId])

  if (loading) return null
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
