import axios from 'axios'
import { fetchProjectsRequest, fetchProjectsFailure, fetchProjectsSuccess } from '.'

const fetchProjects = (platform, project) => async dispatch => {
  try {
    dispatch(fetchProjectsRequest())
    const response = await axios.get(`https://libraries.io/api/search`, {
      params: {
        api_key: 'c8999b8bbfb0726560fe54dd72323dac',
        platforms: platform,
        q: project,
      },
    })
    dispatch(fetchProjectsSuccess(response.data))
  } catch (err) {
    dispatch(fetchProjectsFailure(err.toString()))
  }
}

export { fetchProjects }