'use client'

import { useRef, useEffect } from 'react'
import styled from 'styled-components'
import useSWRInfinite from 'swr/infinite'
import Loading from '../../../components/Loading'
import MoviesGrid from '../../../components/MoviesGrid'

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

// Función para generar la key de cada página
const getKey = (pageIndex: number, previousPageData: { results?: unknown[] } | null) => {
  if (previousPageData && !previousPageData.results?.length) return null
  return `/api/movies/trending?page=${pageIndex + 1}`
}

export default function Movies() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

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

  if (error) {
    return (
      <MoviesContainer>
        <h3 style={{ color: '#FFF', marginTop: '50px' }}>Error: {error.message}</h3>
      </MoviesContainer>
    )
  }

  if (isLoading) {
    return (
      <MoviesContainer>
        <Loading />
      </MoviesContainer>
    )
  }

  return (
    <MoviesContainer>
      <TrendingTitle>Trending week</TrendingTitle>
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
    </MoviesContainer>
  )
}
