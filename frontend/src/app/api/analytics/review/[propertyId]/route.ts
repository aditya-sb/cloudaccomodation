import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(
  request: NextRequest,
  { params }: { params: { propertyId: string } }
) {
  const propertyId = params.propertyId;
  const cookieStore = cookies();
  const token = cookieStore.get('auth_Token')?.value;
  
  if (!token) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }
  
  try {
    const reviewData = await request.json();
    
    // Validate the review data
    if (!reviewData.rating || !reviewData.comment) {
      return NextResponse.json(
        { error: 'Rating and comment are required' },
        { status: 400 }
      );
    }
    
    // Call the backend API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/analytics/review/${propertyId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reviewData),
      }
    );

    if (!response.ok) {
      throw new Error(`Error adding review: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in add review API route:', error);
    return NextResponse.json(
      { error: 'Failed to add review' },
      { status: 500 }
    );
  }
} 