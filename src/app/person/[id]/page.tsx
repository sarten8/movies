'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import styled from 'styled-components'
import useSWR from 'swr'
import Loading from '../../../../components/Loading'
import MoviesGrid from '../../../../components/MoviesGrid'
import { MoviesGridSkeleton } from '../../../../components/Skeleton'

const PAGE_SIZE = 20

const Container = styled.div`
  margin: 0;
  padding: 0 20px 50px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 50px);
`

const Header = styled.div`
  margin-top: 30px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: flex-start;
  background-color: #050505d2;
  border-radius: 10px;
  color: #fff;
  position: relative;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`

const Avatar = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid #101010;
  @media screen and (min-width: 1200px) {
    width: 220px;
    height: 220px;
  }
`

const PlaceholderAvatar = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 0;
`

const Name = styled.h1`
  margin: 0;
  font-family: 'Raleway', sans-serif;
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 1px;
  @media screen and (min-width: 1200px) {
    font-size: 40px;
  }
`

const Department = styled.span`
  font-family: 'Raleway', sans-serif;
  font-size: 13px;
  color: #ffaf7b;
  letter-spacing: 1px;
  text-transform: uppercase;
`

const Bio = styled.p`
  margin: 8px 0 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: #ccc;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Close = styled.div`
  position: absolute;
  right: 20px;
  top: 10px;
  width: 32px;
  height: 32px;
  transition: all 0.3s;
  cursor: pointer;
  z-index: 10;
  :hover {
    transform: rotateZ(90deg);
    transition: all 0.6s;
  }
  ::before,
  ::after {
    content: '';
    position: absolute;
    top: 15px;
    right: 0;
    width: 25px;
    border: 1px solid;
    border-image-source: linear-gradient(
      to bottom,
      #ffaf7b,
      rgb(204, 215, 109),
      rgb(97, 113, 28)
    );
    border-image-slice: 1;
    transition: 0.3s;
  }
  ::before {
    transform: rotate(45deg);
  }
  ::after {
    transform: rotate(-45deg);
  }
`

const SectionTitle = styled.h2`
  margin: 40px 0 10px;
  padding: 0 10px;
  font-family: 'Raleway', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 1px;
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

interface PersonData {
  id: number
  name: string
  biography: string
  profile_path: string | null
  known_for_department: string
}

interface CreditMovie {
  id: number
  title: string
  poster_path: string | null
  release_date: string
  vote_average: number
}

interface CreditsData {
  cast: CreditMovie[]
}

export default function Person() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const { data: person, error: personError, isLoading: personLoading } = useSWR<PersonData>(
    id ? `/api/person/${id}` : null,
    { revalidateOnFocus: false, dedupingInterval: 300000 }
  )

  const { data: credits, error: creditsError, isLoading: creditsLoading } = useSWR<CreditsData>(
    id ? `/api/person/${id}/credits` : null,
    { revalidateOnFocus: false, dedupingInterval: 300000 }
  )

  // De-duplicate (an actor can appear twice if credited in multiple roles)
  // and sort newest → oldest. Movies without a release_date go to the end.
  const sortedMovies = useMemo(() => {
    if (!credits?.cast) return []
    const seen = new Set<number>()
    const unique = credits.cast.filter((m) => {
      if (seen.has(m.id)) return false
      seen.add(m.id)
      return true
    })
    return unique.sort((a, b) => {
      if (!a.release_date && !b.release_date) return 0
      if (!a.release_date) return 1
      if (!b.release_date) return -1
      return b.release_date.localeCompare(a.release_date)
    })
  }, [credits])

  const visibleMovies = sortedMovies.slice(0, visibleCount)
  const hasMore = visibleCount < sortedMovies.length

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((c) => c + PAGE_SIZE)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [hasMore])

  if (personError || creditsError) {
    return (
      <Container>
        <h3 style={{ color: '#FFF', marginTop: '50px' }}>
          Error: {(personError || creditsError)?.message}
        </h3>
      </Container>
    )
  }

  if (personLoading || !person) {
    return (
      <Container>
        <MoviesGridSkeleton count={10} />
      </Container>
    )
  }

  return (
    <Container>
      <Header>
        <Close onClick={() => router.back()} />
        <Avatar>
          {person.profile_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
              alt={person.name}
              fill
              sizes="(max-width: 1200px) 180px, 220px"
              style={{ objectFit: 'cover' }}
              priority
            />
          ) : (
            <PlaceholderAvatar />
          )}
        </Avatar>
        <Info>
          <Name>{person.name}</Name>
          {person.known_for_department && (
            <Department>{person.known_for_department}</Department>
          )}
          {person.biography && <Bio>{person.biography}</Bio>}
        </Info>
      </Header>

      <SectionTitle>
        Filmography {sortedMovies.length > 0 && `(${sortedMovies.length})`}
      </SectionTitle>

      {creditsLoading ? (
        <MoviesGridSkeleton count={10} />
      ) : (
        <>
          <MoviesGrid movies={visibleMovies} />
          {hasMore && (
            <LoadingMore ref={loadMoreRef}>
              <Loading />
            </LoadingMore>
          )}
          {!hasMore && visibleMovies.length > 0 && (
            <EndMessage>no more results</EndMessage>
          )}
          {!creditsLoading && sortedMovies.length === 0 && (
            <EndMessage>no movies found for this person</EndMessage>
          )}
        </>
      )}
    </Container>
  )
}
