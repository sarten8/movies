import axios from 'axios'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { page = 1 } = req.query
  const pageNum = parseInt(page, 10)
  const validPage = pageNum < 1 || pageNum > 1000 ? 1 : pageNum

  try {
    const response = await axios({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/trending/movie/week',
      headers: {
        'content-type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      },
      params: {
        page: validPage,
      },
    })

    res.status(200).json(response.data)
  } catch (error) {
    console.error('Error fetching trending movies:', error.message)
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch trending movies',
      message: error.message,
    })
  }
}
