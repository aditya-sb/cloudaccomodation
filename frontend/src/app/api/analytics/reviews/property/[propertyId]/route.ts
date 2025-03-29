import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { propertyId: string } }
) {
  const propertyId = params.propertyId;
  
  try {
    // Call the backend API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/analytics/reviews/property/${propertyId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching reviews: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in property reviews API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch property reviews' },
      { status: 500 }
    );
  }
} 