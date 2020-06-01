import axios from 'axios'
import { fetchSearchRequest, fetchSearchFailure, fetchSearchSuccess } from '.'

const fetchSearch = (movie, page) => async dispatch => {
  try {
    dispatch(fetchSearchRequest())
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
      url: `https://api.themoviedb.org/3/search/movie?query=${movie}&page=${page}&include_adult=false`,
    }
    const response = await axios(options)
    dispatch(fetchSearchSuccess(response.data))
  } catch (err) {
    dispatch(fetchSearchFailure(err.toString()))
  }
}

export { fetchSearch }