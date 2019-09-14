import axios from 'axios'
import { fetchPlatformsRequest, fetchPlatformsFailure, fetchPlatformsSuccess } from './'

const fetchPlatforms = () => async dispatch => {
  try {
    dispatch(fetchPlatformsRequest())
    const response = await axios.get('https://libraries.io/api/platforms?api_key=c8999b8bbfb0726560fe54dd72323dac')
    dispatch(fetchPlatformsSuccess(response.data))
  } catch (err) {
    dispatch(fetchPlatformsFailure(err.toString()))
  }
}

export { fetchPlatforms }