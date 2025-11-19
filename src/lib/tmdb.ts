import axios from 'axios'
import qs from 'qs'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    'content-type': 'application/json;charset=utf-8',
  },
})

// Add auth header dynamically to ensure env var is read at runtime
tmdbClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${process.env.TMDB_API_TOKEN}`
  return config
})

export async function searchMovies(query: string, page: string | number = 1) {
  const pageNum = typeof page === 'string' ? parseInt(page, 10) : page
  const validPage = pageNum < 1 || pageNum > 1000 ? 1 : pageNum

  const response = await tmdbClient.get('/search/movie', {
    params: {
      query,
      page: validPage,
    },
    paramsSerializer: params => qs.stringify(params),
  })

  return response.data
}

export async function getTrendingMovies(page: string | number = 1) {
  const pageNum = typeof page === 'string' ? parseInt(page, 10) : page
  const validPage = pageNum < 1 || pageNum > 1000 ? 1 : pageNum

  const response = await tmdbClient.get('/trending/movie/week', {
    params: {
      page: validPage,
    },
  })

  return response.data
}

export async function getMovieById(id: string | number) {
  const response = await tmdbClient.get(`/movie/${id}`)
  return response.data
}

export async function getMovieCast(id: string | number) {
  const response = await tmdbClient.get(`/movie/${id}/credits`)
  return response.data
}
