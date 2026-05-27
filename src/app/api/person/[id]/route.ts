import { NextRequest, NextResponse } from 'next/server'
import { getPerson } from '@/lib/tmdb'

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
    const data = await getPerson(id)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching person:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to fetch person', message: errorMessage },
      { status: 500 }
    )
  }
}
