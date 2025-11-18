import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styled from 'styled-components'
import Loading from '../components/Loading'
import MoviesGrid from '../components/MoviesGrid'

const SearchContainer = styled.div`
  position: relative;
  margin: 0;
  padding: 0 20px;
  padding-bottom: 50px;
  background: #050505;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: calc(100vh - 50px);
`

const SearchForm = styled.form`
  margin: 40px 0;
  padding: 0;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const SearchTextContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const SearchText = styled.input`
  width: 100%;
  padding: 18px 0;
  background: transparent;
  color: white;
  font-family: 'Raleway', sans-serif;
  font-size: 20px;
  font-weight: 400;
  border: none;
  border-bottom: 2px solid #444;
  transition: all 0.3s ease;
  outline: none;
  text-align: center;
  letter-spacing: 1px;

  &:focus {
    border-bottom-color: #fc2f70;
  }

  &::placeholder {
    color: #999;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 3px;
  }
`

const TotalResults = styled.span`
  font-family: 'Raleway', sans-serif;
  font-size: 12px;
  font-weight: 300;
  color: #666;
  letter-spacing: 1px;
`

const ResultTitle = styled.div`
  margin: 0 0 30px 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

const QueryText = styled.h1`
  margin: 0;
  font-family: 'Raleway', sans-serif;
  font-size: 24px;
  font-weight: 300;
  color: white;
  letter-spacing: 2px;
`

const MoviesWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
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
  color: #555;
  text-align: center;
  padding: 40px;
  letter-spacing: 1px;
`

export default function Search() {
  const router = useRouter()
  const { query: searchQuery } = router.query

  const [searchInput, setSearchInput] = useState('')
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState(null)

  const observerRef = useRef(null)
  const loadMoreRef = useRef(null)

  // Fetch movies function
  const fetchMovies = useCallback(async (query, pageNum, append = false) => {
    if (!query) return

    try {
      setLoading(true)
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}&page=${pageNum}`)
      const data = await response.json()

      if (append) {
        setMovies(prev => [...prev, ...data.results])
      } else {
        setMovies(data.results || [])
      }

      setTotalPages(Math.min(data.total_pages || 0, 500))
      setTotalResults(data.total_results || 0)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
      setInitialLoading(false)
    }
  }, [])

  // Initial load when query changes
  useEffect(() => {
    if (searchQuery) {
      setMovies([])
      setPage(1)
      setInitialLoading(true)
      fetchMovies(searchQuery, 1, false)
    } else {
      setMovies([])
      setInitialLoading(false)
    }
  }, [searchQuery, fetchMovies])

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
          fetchMovies(searchQuery, nextPage, true)
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
  }, [loading, page, totalPages, searchQuery, fetchMovies])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchInput)}`)
      setSearchInput('')
    }
  }

  return (
    <>
      <Head>
        <title>{searchQuery ? `"${searchQuery}"` : 'Search Movies'}</title>
        <meta name="description" content={`Search results for ${searchQuery || 'movies'}`} />
      </Head>
      <SearchContainer>
        <SearchForm onSubmit={handleSubmit}>
          <SearchTextContainer>
            <SearchText
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="search movies..."
            />
          </SearchTextContainer>
        </SearchForm>

        {error ? (
          <h3 style={{ marginTop: '50px', color: '#FFF' }}>Error loading results</h3>
        ) : initialLoading ? (
          <Loading />
        ) : movies.length > 0 ? (
          <>
            <ResultTitle>
              <QueryText>{searchQuery}</QueryText>
              <TotalResults>
                {totalResults} result{totalResults !== 1 ? 's' : ''}
              </TotalResults>
            </ResultTitle>
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
          </>
        ) : searchQuery ? (
          <h3 style={{ marginTop: '50px', color: '#555', fontWeight: 300 }}>no results found</h3>
        ) : null}
      </SearchContainer>
    </>
  )
}
