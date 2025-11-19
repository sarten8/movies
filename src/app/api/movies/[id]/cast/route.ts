import { NextRequest, NextResponse } from 'next/server'
import { getMovieCast } from '@/lib/tmdb'

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
    const data = await getMovieCast(id)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching cast:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to fetch cast', message: errorMessage },
      { status: 500 }
    )
  }
}
