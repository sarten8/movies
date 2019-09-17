import axios from 'axios'
import { fetchMovieRequest, fetchMovieFailure, fetchMovieSuccess } from '.'

const fetchMovie = id => async dispatch => {
  try {
    dispatch(fetchMovieRequest())
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json;charset=utf-8',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MThlNmY2ZjZjYjNhMGVkNzFhZmQ5OGM0NDc2NzgyNyIsInN1YiI6IjViYjc2NTIzYzNhMzY4MTUwYzAyYjNmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1i9oGthZ1qDREimJC8_bfJRQH_aqtliQw8N28PtPdQ8`,
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
