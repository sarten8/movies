import axios from 'axios'
import { fetchMovieRequest, fetchMovieFailure, fetchMovieSuccess } from '.'

const fetchMovie = id => async dispatch => {
  try {
    dispatch(fetchMovieRequest())
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
      url: `https://api.themoviedb.org/3/movie/${id}`,
    }
    const response = await axios(options)
    dispatch(fetchMovieSuccess(response.data))
  } catch (err) {
    dispatch(fetchMovieFailure(err.toString()))
  }
}

export { fetchMovie }
