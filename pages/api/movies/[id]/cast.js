import axios from 'axios'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query

  if (!id) {
    return res.status(400).json({ error: 'Movie ID is required' })
  }

  try {
    const response = await axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${id}/credits`,
      headers: {
        'content-type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      },
    })

    res.status(200).json(response.data)
  } catch (error) {
    console.error('Error fetching cast:', error.message)
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch cast',
      message: error.message,
    })
  }
}
