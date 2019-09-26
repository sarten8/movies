import { combineReducers } from 'redux'
import movies from './movies'
import movie from './movie'
import search from './search'

export default combineReducers({
  movies,
  movie,
  search,
})
