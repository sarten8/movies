const defaultState = {
  loading: false,
  error: '',
  projects: null,
}

const projects = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_PROJECTS_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_PROJECTS_FAILURE':
      return { ...state, error: action.payload, loading: false, projects: null }
    case 'FETCH_PROJECTS_SUCCESS':
      return { ...state, projects: action.payload, loading: false, error: null }
    default:
      return state
  }
}

export default projects
