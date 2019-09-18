import React, { Fragment, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { fetchMovie as fetchMovieActionCreator } from '../actions/movie/fetchMovie'
import styled from 'styled-components'
import Loading from '../components/Loading'
import imdbImage from '../utils/images/IMDb.png'

const ModalContainer = styled.div`
  margin: 0;
  margin-top: 30px;
  min-width: 99%;
  max-width: 99%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

const Description = styled.div`
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  font-family: 'Advent Pro', sans-serif;
  word-wrap: break-word;
  > div {
    word-wrap: break-word;
  }
`

const Modal = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 20px;
  width: 90%;
  border-radius: 10px;
  background-color: #050505d2;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  color: white;
  ${Description} div h2 {
    font-size: 32px;
    font-weight: bold;
    letter-spacing: 2px;
  }
  ${Description} div p {
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 1px;
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`

const Close = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
  width: 32px;
  height: 32px;
  transition: all 0.3s;
  cursor: pointer;
  z-index: 10;
  :hover {
    transform: rotateZ(90deg);
    transition: all 0.6s;
  }
  ::before {
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
    transform: rotate(45deg);
    transition: 0.3s;
  }
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
    transform: rotate(-45deg);
    transition: 0.3s;
  }
`

const Cover = styled.div`
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  width: auto;
  min-width: 200px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  > img {
    width: 100%;
    height: auto;
    max-height: 600px;
    object-fit: scale-down;
    border-radius: 5px;
  }
`

const Star = styled.span`
  margin-right: 5px;
  background: #3a1c71;
  background: -webkit-linear-gradient(
    to bottom,
    #ffaf7b,
    rgb(204, 215, 109),
    rgb(97, 113, 28)
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #ffaf7b,
    rgb(204, 215, 109),
    rgb(97, 113, 28)
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
`

const Imdb = styled.img`
  display: inline;
  margin-right: 10px;
  width: 50px;
  height: 24px;
  box-sizing: border-box;
  border-radius: 5px;
`

const Point = styled.h3`
  display: inline-block;
`

const Point2 = styled.span`
  display: inline-block;
  opacity: 0.4;
`

const Year = styled.span`
  padding: 0;
  margin: 0;
  font-size: 12px;
  letter-spacing: 1px;
  color: tomato;
`

const Movie = ({ fetchMovie, history }) => {
  const { movie } = useSelector(state => state)
  const { loading, error, data } = movie

  useEffect(() => {
    fetchMovie()
  }, [])

  return (
    <ModalContainer>
      {loading ? <Loading /> : ''}
      {error ? `Error: ${error}` : ''}
      {data ? (
        <Fragment>
          <Modal>
            <Close
              //src={closeImage}
              //alt=""
              onClick={e => {
                e.preventDefault()
                history.goBack()
              }}
            />
            <Cover>
              <img
                src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                alt=""
              />
            </Cover>
            <Description>
              <div>
                <h2>
                  {data.title} <Year>{data.release_date.substring(0, 4)}</Year>
                </h2>
                <p>{data.overview}</p>
              </div>
              <div>
                <Imdb src={imdbImage} alt="" />
                <Star>&#x2605; </Star>
                <Point>{data.vote_average}</Point>
                <Point2>/10</Point2>
              </div>
            </Description>
          </Modal>
        </Fragment>
      ) : (
        ''
      )}
    </ModalContainer>
  )
}

const mapStateToProps = state => ({
  loading: state.movie.loading,
  error: state.movie.error,
  data: state.movie.data,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchMovie: () => dispatch(fetchMovieActionCreator(ownProps.match.params.id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movie)
