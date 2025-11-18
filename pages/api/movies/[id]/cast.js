import { getMovieCast } from '../../../../lib/tmdb'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query

  if (!id) {
    return res.status(400).json({ error: 'Movie ID is required' })
  }

  try {
    const data = await getMovieCast(id)
    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching cast:', error.message)
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch cast',
      message: error.message,
    })
  }
}
