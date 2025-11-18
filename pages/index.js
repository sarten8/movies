import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styled from 'styled-components'

const SearchContainer = styled.div`
  position: relative;
  margin: 0;
  padding: 0 20px;
  background: #050505;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 50px);
`

const SearchForm = styled.form`
  margin-bottom: 60px;
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

const SearchWrapperTitle = styled.div`
  margin-top: 20px;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SearchTitle = styled.h1`
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
  font-size: 48px;
  font-weight: 100;
  line-height: 1.2;
  color: #333;
  letter-spacing: 8px;
  text-transform: lowercase;
  @media (min-width: 720px) {
    font-size: 72px;
    letter-spacing: 12px;
  }
`

export default function Home() {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState('')

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
        <title>Movies - Search for your favorite films</title>
        <meta name="description" content="Search and discover movies from The Movie Database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SearchContainer>
        <SearchForm onSubmit={handleSubmit}>
          <SearchTextContainer>
            <SearchText
              type="text"
              autoFocus={true}
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="search movies..."
            />
          </SearchTextContainer>
        </SearchForm>
        <SearchWrapperTitle>
          <SearchTitle>discover</SearchTitle>
        </SearchWrapperTitle>
      </SearchContainer>
    </>
  )
}
