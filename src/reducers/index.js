import { combineReducers } from 'redux'
import movies from './movies'
import movie from './movie'
import search from './search'
import cast from './cast'

export default combineReducers({
  movies,
  movie,
  cast,
  search,
})
