import axios from 'axios'
import { fetchMoviesRequest, fetchMoviesFailure, fetchMoviesSuccess } from '.'

const fetchMovies = page => async dispatch => {
  page = (page < 1 || page > 1000) ? 1 : page
  try {
    dispatch(fetchMoviesRequest())
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
      params: {
        page,
      },
      url: 'https://api.themoviedb.org/3/trending/movie/week',
    }
    const response = await axios(options)
    dispatch(fetchMoviesSuccess(response.data))
  } catch (err) {
    dispatch(fetchMoviesFailure(err.toString()))
  }
}

export { fetchMovies }
