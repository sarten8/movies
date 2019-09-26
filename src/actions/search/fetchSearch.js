import axios from 'axios'
import { fetchSearchRequest, fetchSearchFailure, fetchSearchSuccess } from '.'

const fetchSearch = (movie, page) => async dispatch => {
  try {
    dispatch(fetchSearchRequest())
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json;charset=utf-8',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MThlNmY2ZjZjYjNhMGVkNzFhZmQ5OGM0NDc2NzgyNyIsInN1YiI6IjViYjc2NTIzYzNhMzY4MTUwYzAyYjNmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1i9oGthZ1qDREimJC8_bfJRQH_aqtliQw8N28PtPdQ8`,
      },
      url: `https://api.themoviedb.org/3/search/movie?query=${movie}&page=${page}`,
    }
    const response = await axios(options)
    dispatch(fetchSearchSuccess(response.data))
  } catch (err) {
    dispatch(fetchSearchFailure(err.toString()))
  }
}

export { fetchSearch }