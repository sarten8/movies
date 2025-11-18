import { useState, useEffect, useRef, useCallback } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import Loading from '../../components/Loading'
import MoviesGrid from '../../components/MoviesGrid'

const TrendingTitle = styled.h1`
  margin: 0;
  margin-top: 30px;
  margin-bottom: 20px;
  padding: 0 10px;
  padding-bottom: 35px;
  display: block;
  font-family: 'Raleway', monospace, sans-serif;
  font-size: 36px;
  font-weight: 900;
  color: white;
  text-align: center;
  border-bottom: 1px dotted white;
  border-bottom-width: 7px;
  border-bottom-right-radius: 90%;
  background: -webkit-linear-gradient(7deg, white, white, #202020);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (min-width: 380px) {
    font-size: 48px;
  }
  @media (min-width: 720px) {
    font-size: 52px;
  }
`


const MoviesContainer = styled.div`
  margin: 0;
  padding: 0 20px;
  padding-bottom: 50px;
  width: 100%;
  max-width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 50px);
`

const MoviesWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin-top: 20px;
`

const LoadingMore = styled.div`
  width: 100%;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const EndMessage = styled.p`
  font-family: 'Raleway', sans-serif;
  font-size: 14px;
  font-weight: 300;
  color: #888;
  text-align: center;
  padding: 40px;
  letter-spacing: 1px;
`

export default function Movies() {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState(null)

  const observerRef = useRef(null)
  const loadMoreRef = useRef(null)

  // Fetch trending movies
  const fetchTrending = useCallback(async (pageNum, append = false) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/movies/trending?page=${pageNum}`)
      const data = await response.json()

      if (append) {
        setMovies(prev => [...prev, ...data.results])
      } else {
        setMovies(data.results || [])
      }

      setTotalPages(Math.min(data.total_pages || 0, 500))
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
      setInitialLoading(false)
    }
  }, [])

  // Initial load
  useEffect(() => {
    fetchTrending(1, false)
  }, [fetchTrending])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first.isIntersecting && !loading && page < totalPages) {
          const nextPage = page + 1
          setPage(nextPage)
          fetchTrending(nextPage, true)
        }
      },
      { threshold: 0.1 }
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [loading, page, totalPages, fetchTrending])

  if (error) {
    return (
      <MoviesContainer>
        <h3 style={{ color: '#FFF', marginTop: '50px' }}>Error: {error}</h3>
      </MoviesContainer>
    )
  }

  if (initialLoading) {
    return (
      <MoviesContainer>
        <Loading />
      </MoviesContainer>
    )
  }

  return (
    <>
      <Head>
        <title>Trending Movies This Week</title>
        <meta name="description" content="Discover the most trending movies this week" />
      </Head>
      <MoviesContainer>
        <TrendingTitle>Trending week</TrendingTitle>
        <MoviesWrapper>
          <MoviesGrid movies={movies} />
        </MoviesWrapper>

        {page < totalPages && (
          <LoadingMore ref={loadMoreRef}>
            {loading && <Loading />}
          </LoadingMore>
        )}

        {page >= totalPages && movies.length > 0 && (
          <EndMessage>no more results</EndMessage>
        )}
      </MoviesContainer>
    </>
  )
}
