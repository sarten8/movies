const defaultState = {
  loading: false,
  error: '',
  data: null,
}

const search = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_SEARCH_REQUEST':
      return { ...state, loading: true, error: null, data: null }
    case 'FETCH_SEARCH_FAILURE':
      return { ...state, error: action.payload, loading: false, data: null }
    case 'FETCH_SEARCH_SUCCESS':
      return { ...state, data: action.payload, loading: false, error: null }
    default:
      return state
  }
}

export default search
