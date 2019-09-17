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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MThlNmY2ZjZjYjNhMGVkNzFhZmQ5OGM0NDc2NzgyNyIsInN1YiI6IjViYjc2NTIzYzNhMzY4MTUwYzAyYjNmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1i9oGthZ1qDREimJC8_bfJRQH_aqtliQw8N28PtPdQ8`,
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
