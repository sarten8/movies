const defaultState = {
  loading: false,
  error: '',
  data: [],
}

const platforms = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_PLATFORMS_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_PLATFORMS_FAILURE':
      return { ...state, error: action.payload, loading: false, data: null }
    case 'FETCH_PLATFORMS_SUCCESS':
      return { ...state, data: action.payload, loading: false, error: null }
    default:
      return state
  }
}

export default platforms