import { combineReducers } from 'redux'
import platforms from './platforms'
import projectDetails from './projectDetails'
import projects from './projects'

export default combineReducers({
  platforms,
  projectDetails,
  projects,
})
