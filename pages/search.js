import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styled from 'styled-components'
import SearchButton from '../components/SearchButton'
import Loading from '../components/Loading'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'
import { searchMovies } from '../lib/tmdb'

const SearchContainer = styled.div`
  position: relative;
  margin: 22px 0;
  padding: 0 11px;
  background: #050505;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SearchForm = styled.form`
  position: sticky;
  position: -webkit-sticky;
  top: 35px;
  margin-bottom: 20px;
  padding: 0;
  width: calc(100% - 120px);
  max-width: 570px;
  background: #050505;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  z-index: 9996;
`

const SearchTextContainer = styled.div`
  position: relative;
  padding: 10px;
  padding-left: 20px;
  padding-right: 65px;
  width: 100%;
  height: 66px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: #050505;
  border-radius: 50px;
  transition: all 0.5s;
  ::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: linear-gradient(45deg, lightgray, gray, black);
    filter: ${props => props.$blur ? 'blur(30px)' : 'blur(0)'};
    border-radius: 50px;
    z-index: -1;
    transition: all 0.5s;
  }
`

const SearchText = styled.input`
  width: 100%;
  height: 100%;
  background: transparent;
  color: white;
  font-family: 'Raleway', monospace, sans-serif;
  font-size: 20px;
  font-weight: 100;
  border: 0;
  transition: all 0.5s;
  outline: none;
  ::placeholder {
    color: #ffffffaa;
    font-size: 18px;
    font-style: italic;
    letter-spacing: 1px;
    transition: all 0.5s;
  }
`

const TotalResults = styled.span`
  font-family: 'Raleway', monospace, sans-serif;
  font-size: 15px;
  font-weight: 700;
  margin-left: 25px;
`

const ResultTitle = styled.h1`
  margin: 20px 0;
  padding: 0;
  font-size: 32px;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: white;
`

const MoviesContent = styled.div`
  margin: 0;
  margin-top: 20px;
  padding: 20px;
  max-width: 100%;
  height: auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`

export default function Search({ data, error, searchQuery }) {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState('')
  const [blur, setBlur] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchInput)}&page=1`)
      setSearchInput('')
    }
  }

  return (
    <>
      <Head>
        <title>{searchQuery ? `Search results for "${searchQuery}"` : 'Search Movies'}</title>
        <meta name="description" content={`Search results for ${searchQuery || 'movies'}`} />
      </Head>
      <SearchContainer>
        <SearchForm onSubmit={handleSubmit}>
          <SearchTextContainer $blur={blur}>
            <SearchText
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Movie..."
              onFocus={() => setBlur(true)}
              onBlur={() => setBlur(false)}
            />
            <SearchButton />
          </SearchTextContainer>
        </SearchForm>

        {error ? (
          <h3 style={{ marginTop: '50px', color: '#FFF' }}>Error loading results</h3>
        ) : !data ? (
          <Loading />
        ) : data.results && data.results.length > 0 ? (
          <>
            <ResultTitle>
              Results
              <TotalResults>
                {searchQuery} {' | '}
                {data.total_results} movie{data.total_results > 1 ? 's' : ''}
              </TotalResults>
            </ResultTitle>
            <Pagination
              totalPages={Math.min(data.total_pages, 500)}
              currentPage={data.page}
            />
            <MoviesContent>
              {data.results.map((movie, index) => (
                <MovieCard key={movie.id || index} movie={movie} />
              ))}
            </MoviesContent>
            <Pagination
              totalPages={Math.min(data.total_pages, 500)}
              currentPage={data.page}
            />
          </>
        ) : (
          <h3 style={{ marginTop: '50px', color: '#FFF' }}>No results found</h3>
        )}
      </SearchContainer>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query, page = 1 } = context.query

  if (!query) {
    return {
      props: {
        data: null,
        error: null,
        searchQuery: '',
      },
    }
  }

  try {
    const data = await searchMovies(query, page)

    return {
      props: {
        data,
        error: null,
        searchQuery: query,
      },
    }
  } catch (error) {
    console.error('Error fetching search results:', error.message)
    return {
      props: {
        data: null,
        error: error.message,
        searchQuery: query,
      },
    }
  }
}
