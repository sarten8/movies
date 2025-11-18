import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styled from 'styled-components'
import SearchButton from '../components/SearchButton'

const SearchContainer = styled.div`
  position: relative;
  margin: 22px 0;
  padding: 0 11px;
  background: #050505;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
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
    filter: ${props => props.blur ? 'blur(30px)' : 'blur(0)'};
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

const SearchWrapperTitle = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const SearchTitle = styled.h1`
  margin: 0;
  margin-top: ${props => (props.bottom ? '-36px' : 0)};
  margin-left: ${props => (props.bottom ? 0 : '4px')};
  padding: 0;
  display: block;
  font-family: 'Raleway', monospace, sans-serif;
  font-size: 84px;
  font-weight: 900;
  line-height: 1;
  color: white;
  @media (min-width: 360px) {
    font-size: 92px;
  }
  @media (min-width: 720px) {
    font-size: 180px;
  }
`

export default function Home() {
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
        <title>Movies - Search for your favorite films</title>
        <meta name="description" content="Search and discover movies from The Movie Database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SearchContainer>
        <SearchForm onSubmit={handleSubmit}>
          <SearchTextContainer blur={blur}>
            <SearchText
              type="text"
              autoFocus={true}
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Movie..."
              onFocus={() => setBlur(true)}
              onBlur={() => setBlur(false)}
            />
            <SearchButton />
          </SearchTextContainer>
        </SearchForm>
        <SearchWrapperTitle>
          <SearchTitle>All</SearchTitle>
          <SearchTitle bottom={true}>movies</SearchTitle>
        </SearchWrapperTitle>
      </SearchContainer>
    </>
  )
}
