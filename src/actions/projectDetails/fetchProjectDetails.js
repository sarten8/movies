import axios from 'axios'
import { fetchProjectDetailsRequest, fetchProjectDetailsFailure, fetchProjectDetailsSuccess } from '.'

const fetchProjectDetails = (platform, project) => async dispatch => {
  try {
    dispatch(fetchProjectDetailsRequest())
    const response = await axios.get(`https://libraries.io/api/${platform}/${project}?api_key=c8999b8bbfb0726560fe54dd72323dac`)
    dispatch(fetchProjectDetailsSuccess(response.data))
  } catch (err) {
    dispatch(fetchProjectDetailsFailure(err.toString()))
  }
}

export { fetchProjectDetails }