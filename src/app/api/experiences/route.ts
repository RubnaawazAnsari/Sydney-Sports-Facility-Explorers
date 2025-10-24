
import { NextResponse } from 'next/server';
import { fetchExperiences } from '@/lib/storyblok/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const query = searchParams.get('query') || '';
    const facilityType = searchParams.get('facilityType') || 'all';
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '20');

    const result = await fetchExperiences({
      query: query || undefined,
      facilityType: facilityType !== 'all' ? facilityType : undefined,
      page,
      perPage
    });

    return NextResponse.json(result);

  } catch {
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch experiences',
        experiences: [],
        total: 0,
        page: 1,
        perPage: 20,
        hasMore: false
      },
      { status: 500 }
    );
  }
}
