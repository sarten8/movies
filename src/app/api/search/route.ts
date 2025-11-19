import { NextRequest, NextResponse } from 'next/server'
import { searchMovies } from '@/lib/tmdb'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  const page = searchParams.get('page') || '1'

  if (!query) {
    return NextResponse.json(
      { error: 'Search query is required' },
      { status: 400 }
    )
  }

  try {
    const data = await searchMovies(query, page)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error searching movies:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to search movies', message: errorMessage },
      { status: 500 }
    )
  }
}
