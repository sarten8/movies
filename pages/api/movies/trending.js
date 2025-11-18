import { getTrendingMovies } from '../../../lib/tmdb'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { page = 1 } = req.query

  try {
    const data = await getTrendingMovies(page)
    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching trending movies:', error.message)
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch trending movies',
      message: error.message,
    })
  }
}
