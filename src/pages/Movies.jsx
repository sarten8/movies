import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import { connect, useSelector } from 'react-redux'
import { fetchMovies as fetchMoviesActionCreator } from '../actions/movies/fetchMovies'
import styled from 'styled-components'
import Pagination from '../components/Pagination'

const Contratapa = styled.div`
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-image: linear-gradient(
    to right top,
    #050505,
    #050505cc,
    #3d2b3acc,
    #844b5acc,
    #c87462cc,
    #f4af60cc,
    #f9f871cc
  );
  z-index: 9998;
  transition: all 0.5s;
  transition: background 0.5s;
`

const ImageBackground = styled.img`
  margin: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: scale-down;
  transition: 0.6s;
`

const MoviesContainer = styled.div`
  margin: 0;
  width: 99%;
  max-width: 99%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  width: 180px;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 34px;
  letter-spacing: -2px;
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

const Card = styled.div`
  margin: 25px;
  padding: 0;
  height: 300px;
  width: 200px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.5s;
  overflow: hidden;
  position: relative;
  &:hover ${Contratapa} {
    display: flex;
    transition: all 0.5s;
  }
  &:hover ${ImageBackground} {
    transform: scale(1.1);
    transition: all 0.5s;
  }
`

const Movies = ({ fetchMovies, history }) => {
  const { movies } = useSelector(state => state)
  const { loading, error, data } = movies

  useEffect(() => {
    fetchMovies()
  }, [history.location.search])

  return (
    <MoviesContainer>
      <MoviesContent>
        {loading ? <Loading /> : ''}
        {error ? `Error: ${error}` : ''}
        {data
          ? data.results.map((movie, index) => (
              <Link key={index} to={`/movies/${movie.id}`}>
                <Card key={`mc${index}`}>
                  <Contratapa key={`mt${index}`}>
                    <Title>{movie.title}</Title>
                  </Contratapa>
                  <ImageBackground
                    key={`mi${index}`}
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  />
                </Card>
              </Link>
            ))
          : ''}
      </MoviesContent>
      {data ? (
        <Pagination
          totalPages={data.total_pages}
          currentPage={data.page}
          history={history}
        />
      ) : (
        ''
      )}
    </MoviesContainer>
  )
}

const mapStateToProps = state => ({
  loading: state.movies.loading,
  error: state.movies.error,
  movies: state.movies.movies,
})

const mapDispatchToProps = (dispatch, ownProps) => {
  const search = ownProps.location.search
  const params = new URLSearchParams(search)
  let page = params.get('page')
  page = parseInt(page)
  page = !isNaN(page) ? page : 1
  return {
    fetchMovies: () => dispatch(fetchMoviesActionCreator(page)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies)
