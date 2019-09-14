import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import { connect, useSelector } from 'react-redux'
import { fetchMovies as fetchMoviesActionCreator } from '../actions/movies/fetchMovies'
import styled from 'styled-components'

const MoviesContainer = styled.div`
  margin: 0;
  margin-top: 60px;
  width: 99%;
  max-width: 99%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

const Title = styled.h1`
  margin: 0;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 36px;
  letter-spacing: -2px;
  color: white;
`

const MoviesContent = styled.div`
  margin: 0;
  margin-top: 20px;
  padding: 20px;
  width: 100%;
  max-width: 100%;
  height: auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`

const Card = styled.div`
  margin: 5px;
  height: 300px;
  width: 200px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.6s;
  overflow: hidden;
  position: relative;
  :hover > Contratapa {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
  }
  :hover > ImageBackground {
    transform: scale(1.1);
    transition: 0.6s;
  }
`

const Contratapa = styled.div`
  display: none;
  position: absolute;
  padding: 10px;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
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
  & > span {
    display: block;
    padding: 10px;
    width: 100%;
    height: auto;
    color: white;
    font-family: 'Advent Pro', sans-serif;
    font-size: 28px;
    font-weight: 900;
    border-radius: 15px;
  }
`

const ImageBackground = styled.img`
  margin: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: scale-down;
  transition: 0.6s;
`

const Movies = ({ fetchMovies }) => {
  const { movies } = useSelector(state => state)
  const { loading, error, data } = movies

  useEffect(() => {
    fetchMovies()
  }, [])

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
                    <span>{movie.title}</span>
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
    </MoviesContainer>
  )
}

const mapStateToProps = state => ({
  loading: state.movies.loading,
  error: state.movies.error,
  movies: state.movies.movies,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchMovies: () => dispatch(fetchMoviesActionCreator()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies)
