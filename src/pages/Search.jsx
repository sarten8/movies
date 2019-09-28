import React, { Fragment, useState, useEffect } from 'react'
import qs from 'qs'
import { connect } from 'react-redux'
import { fetchSearch as fetchSearchActionCreator } from '../actions/search/fetchSearch'
import styled from 'styled-components'
import SearchButtom from '../components/SearchButtom'
import Loading from '../components/Loading'
import SearchResult from './SearchResult'
import Pagination from '../components/PaginationSearch'

const SearchContainer = styled.div`
  position: relative;
  margin: 40px;
  padding: 20px;
  background: #050505;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SearchForm = styled.form`
  position: sticky;
  position: -webkit-sticky;
  top: 80px;
  margin-bottom: 40px;
  min-width: 100%;
  min-height: 100%;
  background: #050505;
  border-radius: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 9999;
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
  transition: all 0.5s;
  ::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: linear-gradient(45deg, red, orange, purple);
    filter: ${props =>
      props.children[0].props.blur ? 'blur(10px)' : 'blur(0)'};
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
  font-weight: 100;
  margin-left: 10px;
`

const ResultTitle = styled.h1`
  color: white;
  align-items: flex-start;
`

const Search = ({ fetchSearch, history, loading, error, data }) => {
  const [searchInput, setSearchInput] = useState('')
  const [blur, setBlur] = useState(false)

  let { movie } = qs.parse(history.location.search, {
    ignoreQueryPrefix: true,
    parameterLimit: 2,
  })

  useEffect(() => {
    fetchSearch()
  }, [history.location.search])

  return (
    <SearchContainer>
      <SearchForm
        onSubmit={e => {
          e.preventDefault()
          history.push({
            pathname: '/search',
            search: `?movie=${searchInput}&page=1`,
          })
          setSearchInput('')
        }}
      >
        <SearchTextContainer>
          <SearchText
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Movies..."
            onFocus={() => setBlur(true)}
            onBlur={() => setBlur(false)}
            blur={blur}
          />
          <SearchButtom />
        </SearchTextContainer>
      </SearchForm>
      {loading ? (
        <Loading />
      ) : error ? (
        `Error: ${error}`
      ) : data ? (
        data.results.length > 0 ? (
          <Fragment>
            <ResultTitle>
              Results
              <TotalResults>
              {' | '}{data.total_results} movie{data.total_results > 1 ? 's' : ''}
              </TotalResults>
            </ResultTitle>
            <Pagination
              totalPages={data.total_pages}
              currentPage={data.page}
              history={history}
              movie={movie}
            />
            <SearchResult movies={data.results} />
            <Pagination
              totalPages={data.total_pages}
              currentPage={data.page}
              history={history}
              movie={movie}
            />
          </Fragment>
        ) : (
          <h3 style={{ marginTop: '50px', color: '#FFF' }}>Not found</h3>
        )
      ) : (
        <h3 style={{ marginTop: '50px', color: '#FFF' }}>Not found</h3>
      )}
    </SearchContainer>
  )
}

const mapStateToProps = state => ({
  loading: state.search.loading,
  error: state.search.error,
  data: state.search.data,
})

const mapDispatchToProps = (dispatch, ownProps) => {
  let { movie, page } = qs.parse(ownProps.location.search, {
    ignoreQueryPrefix: true,
    parameterLimit: 2,
  })
  movie = movie ? movie : ''
  page = page ? parseInt(page, 10) : 1
  page = page ? page : 1
  page = page > 0 && page < 1001 ? page : 1
  return {
    fetchSearch: () => dispatch(fetchSearchActionCreator(movie, page)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
