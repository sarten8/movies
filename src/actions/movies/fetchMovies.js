import axios from 'axios'
import { fetchMoviesRequest, fetchMoviesFailure, fetchMoviesSuccess } from '.'

const fetchMovies = page => async dispatch => {
  page = (page < 1 || page > 500) ? 1 : page
  try {
    dispatch(fetchMoviesRequest())
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      params: {
        page,
      },
      //url: 'https://api.themoviedb.org/3/trending/movie/day',
      url: 'https://api.themoviedb.org/3/movie/popular',
    }
    const response = await axios(options)
    dispatch(fetchMoviesSuccess(response.data))
  } catch (err) {
    dispatch(fetchMoviesFailure(err.toString()))
  }
}

export { fetchMovies }
