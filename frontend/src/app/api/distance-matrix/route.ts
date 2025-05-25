import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origins = searchParams.get('origins');
  const destinations = searchParams.get('destinations');
  const mode = searchParams.get('mode');

  if (!origins || !destinations || !mode) {
    return NextResponse.json(
      { error: 'origins, destinations, and mode parameters are required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&mode=${mode}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`
    );
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching from Google Distance Matrix API:', error);
    return NextResponse.json({ error: 'Failed to fetch distance data' }, { status: 500 });
  }
} 