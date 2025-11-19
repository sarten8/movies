import { NextRequest, NextResponse } from 'next/server'
import { getMovieById } from '@/lib/tmdb'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  if (!id) {
    return NextResponse.json(
      { error: 'Movie ID is required' },
      { status: 400 }
    )
  }

  try {
    const data = await getMovieById(id)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching movie:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to fetch movie', message: errorMessage },
      { status: 500 }
    )
  }
}
