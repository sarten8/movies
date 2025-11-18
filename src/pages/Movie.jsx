import React, { Fragment, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { fetchMovie as fetchMovieActionCreator } from '../actions/movie/fetchMovie'
import styled from 'styled-components'
import Loading from '../components/Loading'
import imdbImage from '../utils/images/IMDb.png'
import Cast from './Cast'

const ModalContainer = styled.div`
  margin: 0;
  margin-top: 30px;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

const Description = styled.div`
  margin: 0;
  padding: 0;
  max-width: 600px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 25px;
  font-family: 'Advent Pro', sans-serif;
  word-wrap: break-word;
  > div {
    word-wrap: break-word;
  }
`

const Modal = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 30px;
  border-radius: 16px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
  overflow: hidden;
  color: white;
  max-width: 1100px;
  ${Description} div h2 {
    font-size: 36px;
    font-weight: 700;
    letter-spacing: 0.5px;
    margin-bottom: 15px;
    line-height: 1.2;
  }
  ${Description} div p {
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 0.3px;
    line-height: 1.6;
    color: #e0e0e0;
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
    padding: 20px;
    gap: 20px;
  }
`

const Close = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 36px;
  height: 36px;
  transition: all 0.3s;
  cursor: pointer;
  z-index: 10;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    transform: rotate(90deg);
    background: rgba(255, 175, 123, 0.2);
    transition: all 0.3s;
  }
  ::before {
    content: '';
    position: absolute;
    width: 20px;
    border: 1.5px solid #ffaf7b;
    transform: rotate(45deg);
    transition: 0.3s;
  }
  ::after {
    content: '';
    position: absolute;
    width: 20px;
    border: 1.5px solid #ffaf7b;
    transform: rotate(-45deg);
    transition: 0.3s;
  }
`

const Cover = styled.div`
  margin: 0;
  padding: 0;
  border-radius: 12px;
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  > img {
    width: 100%;
    max-width: 350px;
    height: auto;
    max-height: 525px;
    object-fit: cover;
    border-radius: 12px;
  }
  @media screen and (max-width: 600px) {
    align-self: center;
  }
`

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 175, 123, 0.2);
`

const Star = styled.span`
  font-size: 24px;
  margin-right: 5px;
  background: linear-gradient(
    to bottom,
    #ffaf7b,
    rgb(204, 215, 109),
    rgb(97, 113, 28)
  );
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
`

const Imdb = styled.img`
  display: inline;
  width: 50px;
  height: 24px;
  border-radius: 4px;
  opacity: 0.9;
`

const Point = styled.h3`
  display: inline-block;
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #ffaf7b;
`

const Point2 = styled.span`
  display: inline-block;
  opacity: 0.5;
  font-size: 18px;
  margin-left: 2px;
`

const Year = styled.span`
  padding: 4px 12px;
  margin-left: 12px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #fff;
  background: linear-gradient(135deg, #ff6b6b, #ff8e53);
  border-radius: 20px;
  display: inline-block;
`

const Movie = ({ fetchMovie, history }) => {
  const { movie } = useSelector(state => state)
  const { loading, error, data } = movie

  useEffect(() => {
    fetchMovie()
  }, [])

  return (
    <ModalContainer>
      {loading ? (
        <Loading />
      ) : error ? (
        `Error: ${error}`
      ) : data ? (
        <Fragment>
          <Modal>
            <Close
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
                  {data.title}
                  <Year>{data.release_date.substring(0, 4)}</Year>
                </h2>
                <p>{data.overview}</p>
              </div>
              <RatingContainer>
                <Imdb src={imdbImage} alt="" />
                <div>
                  <Star>&#x2605;</Star>
                  <Point>{data.vote_average}</Point>
                  <Point2>/10</Point2>
                </div>
              </RatingContainer>
              <Cast movie={data.id} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Movie)
