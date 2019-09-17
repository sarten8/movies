const defaultState = {
  loading: false,
  error: '',
  data: null,
}

const movie = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIE_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_MOVIE_FAILURE':
      return { ...state, error: action.payload, loading: false, data: null }
    case 'FETCH_MOVIE_SUCCESS':
      return { ...state, data: action.payload, loading: false, error: null }
    default:
      return state
  }
}

export default movie
