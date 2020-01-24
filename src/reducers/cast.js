const defaultState = {
  loading: false,
  error: '',
  data: null,
}

const cast = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_CAST_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_CAST_FAILURE':
      return { ...state, error: action.payload, loading: false, data: null }
    case 'FETCH_CAST_SUCCESS':
      return { ...state, data: action.payload, loading: false, error: null }
    default:
      return state
  }
}

export default cast
