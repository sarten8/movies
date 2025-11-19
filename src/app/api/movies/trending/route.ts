import { NextRequest, NextResponse } from 'next/server'
import { getTrendingMovies } from '@/lib/tmdb'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = searchParams.get('page') || '1'

  try {
    const data = await getTrendingMovies(page)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching trending movies:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to fetch trending movies', message: errorMessage },
      { status: 500 }
    )
  }
}
