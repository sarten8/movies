const defaultState = {
  loading: false,
  error: '',
  data: null,
}

const movies = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIES_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_MOVIES_FAILURE':
      return { ...state, error: action.payload, loading: false, data: null }
    case 'FETCH_MOVIES_SUCCESS':
      return { ...state, data: action.payload, loading: false, error: null }
    default:
      return state
  }
}

export default movies