import { NextRequest, NextResponse } from 'next/server'
import { getPersonMovieCredits } from '@/lib/tmdb'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  if (!id) {
    return NextResponse.json(
      { error: 'Person ID is required' },
      { status: 400 }
    )
  }

  try {
    const data = await getPersonMovieCredits(id)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching person credits:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to fetch person credits', message: errorMessage },
      { status: 500 }
    )
  }
}
