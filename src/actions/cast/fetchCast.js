import axios from 'axios'
import { fetchCastRequest, fetchCastFailure, fetchCastSuccess } from '.'

const fetchCast = id => async dispatch => {
  try {
    dispatch(fetchCastRequest())
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
      url: `https://api.themoviedb.org/3/movie/${id}/credits`,
    }
    const response = await axios(options)
    dispatch(fetchCastSuccess(response.data))
  } catch (err) {
    dispatch(fetchCastFailure(err.toString()))
  }
}

export { fetchCast }
