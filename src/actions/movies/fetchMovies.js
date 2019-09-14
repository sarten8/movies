import axios from 'axios'
import { fetchMoviesRequest, fetchMoviesFailure, fetchMoviesSuccess } from '.'
import config from '../../config'

const fetchMovies = () => async dispatch => {
  try {
    dispatch(fetchMoviesRequest())
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${config.token}`,
      },
      url: 'https://api.themoviedb.org/3/trending/movie/day',
    }
    const response = await axios(options)
    dispatch(fetchMoviesSuccess(response.data))
  } catch (err) {
    dispatch(fetchMoviesFailure(err.toString()))
  }
}

export { fetchMovies }
