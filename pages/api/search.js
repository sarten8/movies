import axios from 'axios'
import qs from 'qs'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { query, page = 1 } = req.query

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' })
  }

  const pageNum = parseInt(page, 10)
  const validPage = pageNum < 1 || pageNum > 1000 ? 1 : pageNum

  try {
    const response = await axios({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/movie',
      headers: {
        'content-type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      },
      params: {
        query,
        page: validPage,
      },
      paramsSerializer: params => qs.stringify(params),
    })

    res.status(200).json(response.data)
  } catch (error) {
    console.error('Error searching movies:', error.message)
    res.status(error.response?.status || 500).json({
      error: 'Failed to search movies',
      message: error.message,
    })
  }
}
