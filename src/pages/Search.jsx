import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import { connect, useSelector } from 'react-redux'
import { fetchMovies as fetchMoviesActionCreator } from '../actions/movies/fetchMovies'
import styled from 'styled-components'
import SearchButtom from '../components/SearchButtom'

const SearchContainer = styled.div`
  padding: 20px;
  max-width: 100%;
  height: 50vh;
  background: #050505;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const SearchForm = styled.form`
  min-width: 100%;
  min-height: 100%;
  background: #050505;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 0;
`

const SearchTextContainer = styled.div`
  position: relative;
  padding: 10px;
  padding-left: 30px;
  width: 75%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: #050505;
  border-radius: 50px;
  transition: all .5s;
  ::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: linear-gradient(45deg, red, orange, purple);
    filter: ${props => (props.children[0].props.blur ? 'blur(10px)' : 'blur(0)')};
    border-radius: 50px;
    z-index: -1;
    transition: all .5s;
  }
`

const SearchText = styled.input`
  width: 100%;
  height: 100%;
  background: transparent;
  color: white;
  font-size: 20px;
  font-weight: 100;
  border: 0;
  transition: all 0.5s;
  ::placeholder {
    color: white;
    font-size: 20px;
    font-style: italic;
    letter-spacing: 2px;
    transition: all 0.5s;
  }
`

export default () => {
  const [searchInput, setSearchInput] = useState('')
  const [blur, setBlur] = useState(false)

  return (
    <SearchContainer>
      <SearchForm onSubmit={() => alert(searchInput)}>
        <SearchTextContainer>
          <SearchText
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search movies..."
            onFocus={() => setBlur(true)}
            onBlur={() => setBlur(false)}
            blur={blur}
          />
          <SearchButtom />
        </SearchTextContainer>
      </SearchForm>
    </SearchContainer>
  )
}
