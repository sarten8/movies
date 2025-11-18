import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styled from 'styled-components'
import useSWRInfinite from 'swr/infinite'
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
  const observerRef = useRef(null)
  const loadMoreRef = useRef(null)

  // Función para generar la key de cada página
  const getKey = (pageIndex, previousPageData) => {
    if (!searchQuery) return null
    if (previousPageData && !previousPageData.results?.length) return null
    return `/api/search?query=${encodeURIComponent(searchQuery)}&page=${pageIndex + 1}`
  }

  const {
    data,
    error,
    size,
    setSize,
    isLoading,
    isValidating,
  } = useSWRInfinite(getKey, {
    revalidateOnFocus: false,
    revalidateFirstPage: false,
    persistSize: true,
    dedupingInterval: 300000, // 5 minutos de caché
  })

  // Combinar todas las películas de todas las páginas
  const movies = data ? data.flatMap(page => page.results || []) : []
  const totalPages = data?.[0]?.total_pages ? Math.min(data[0].total_pages, 500) : 0
  const totalResults = data?.[0]?.total_results || 0
  const isLoadingMore = isValidating && size > 1
  const hasMore = size < totalPages

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first.isIntersecting && !isValidating && hasMore) {
          setSize(size + 1)
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
  }, [isValidating, hasMore, size, setSize])

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
        ) : isLoading ? (
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

            {hasMore && (
              <LoadingMore ref={loadMoreRef}>
                {isLoadingMore && <Loading />}
              </LoadingMore>
            )}

            {!hasMore && movies.length > 0 && (
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
