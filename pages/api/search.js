import { searchMovies } from '../../lib/tmdb'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { query, page = 1 } = req.query

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' })
  }

  try {
    const data = await searchMovies(query, page)
    res.status(200).json(data)
  } catch (error) {
    console.error('Error searching movies:', error.message)
    res.status(error.response?.status || 500).json({
      error: 'Failed to search movies',
      message: error.message,
    })
  }
}
