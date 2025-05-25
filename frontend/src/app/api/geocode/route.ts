import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Address parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`
    );
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error geocoding address:', error);
    return NextResponse.json({ error: 'Failed to geocode address' }, { status: 500 });
  }
} 