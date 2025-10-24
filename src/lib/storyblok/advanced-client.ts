import StoryblokClient from 'storyblok-js-client';
import type { 
  Experience
} from '@/types/storyblok';

const getStoryblokClient = (isPreview: boolean = false) => {
  const accessToken = isPreview 
    ? process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN
    : process.env.STORYBLOK_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error(`Storyblok access token not found for ${isPreview ? 'preview' : 'published'} mode`);
  }

  return new StoryblokClient({
    accessToken,
    ...(isPreview && { version: 'draft' })
  });
};

export async function fetchExperiencesAdvanced(
  options: {
    isPreview?: boolean;
    query?: string;
    facilityType?: string;
    page?: number;
    perPage?: number;
  } = {}
): Promise<{
  experiences: Experience[];
  total: number;
  page: number;
  perPage: number;
  hasMore: boolean;
}> {
  const {
    isPreview = false,
    query,
    facilityType,
    page = 1,
    perPage = 20
  } = options;

  try {
    const client = getStoryblokClient(isPreview);
    
    const storyblokParams: Record<string, string | number | object> = {
      content_type: 'Experience',
      per_page: perPage,
      page,
      sort_by: 'updated_at:desc'
    };

    if (query) {
      storyblokParams.search_term = query;
    }

    if (facilityType && facilityType !== 'all') {
      storyblokParams.filter_query = {
        tags: { in_array: facilityType }
      };
    }

    const response = await client.get('cdn/stories', storyblokParams);

    const experiences: Experience[] = response.data.stories.map((story: Record<string, unknown>) => {
      const content = story.content as Record<string, unknown>;
      return {
        id: String(story.id),
        title: String(content.title || ''),
        description: String(content.description || ''),
        image: content.image as Experience['image'],
        tags: Array.isArray(content.tags) ? content.tags as string[] : [],
        externalLink: content.externalLink as Experience['externalLink'],
        locationTag: String(content.locationTag || ''),
        coordinates: content.coordinates as Experience['coordinates'],
        amenities: Array.isArray(content.amenities) ? content.amenities as string[] : [],
        pricing: content.pricing as Experience['pricing'],
        accessibility: content.accessibility as Experience['accessibility'],
        facilityType: String(content.facilityType || ''),
        sportsFacilities: Array.isArray(content.sportsFacilities) 
          ? content.sportsFacilities.map((sport: Record<string, unknown>) => ({
              name: String(sport.name || ''),
              description: String(sport.description || ''),
              available: Boolean(sport.available)
            }))
          : [],
        owner: String(content.owner || ''),
        status: String(content.status || ''),
        url: String(content.url || ''),
        updatedAt: String(story.published_at || new Date().toISOString()),
        createdAt: String(story.created_at || new Date().toISOString())
      };
    });

    return {
      experiences,
      total: response.data.total,
      page: response.data.current_page,
      perPage: response.data.per_page,
      hasMore: response.data.current_page < response.data.total_pages
    };

    } catch {
    throw new Error('Failed to fetch experiences from Storyblok');
  }
}

export async function fetchExperienceBySlug(
  slug: string,
  isPreview: boolean = false
): Promise<Experience | null> {
  try {
    const client = getStoryblokClient(isPreview);
    
    const response = await client.get(`cdn/stories/${slug}`);
    
    if (!response.data.story) {
      return null;
    }

    const story = response.data.story as Record<string, unknown>;
    const content = story.content as Record<string, unknown>;
    return {
      id: String(story.id),
      title: String(content.title || ''),
      description: String(content.description || ''),
      image: content.image as Experience['image'],
      tags: Array.isArray(content.tags) ? content.tags as string[] : [],
      externalLink: content.externalLink as Experience['externalLink'],
      locationTag: String(content.locationTag || ''),
      coordinates: content.coordinates as Experience['coordinates'],
      amenities: Array.isArray(content.amenities) ? content.amenities as string[] : [],
      pricing: content.pricing as Experience['pricing'],
      accessibility: content.accessibility as Experience['accessibility'],
      facilityType: String(content.facilityType || ''),
      sportsFacilities: Array.isArray(content.sportsFacilities) 
        ? content.sportsFacilities.map((sport: Record<string, unknown>) => ({
            name: String(sport.name || ''),
            description: String(sport.description || ''),
            available: Boolean(sport.available)
          }))
        : [],
      owner: String(content.owner || ''),
      status: String(content.status || ''),
      url: String(content.url || ''),
      updatedAt: String(story.published_at || new Date().toISOString()),
      createdAt: String(story.created_at || new Date().toISOString())
    };

    } catch {
    return null;
  }
}

export function getPreviewUrl(storyId: number, spaceId: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return `${baseUrl}/preview?_storyblok=${storyId}&_storyblok_tk=${spaceId}`;
}

export async function isPreviewModeAsync(searchParams: Promise<Record<string, string | string[] | undefined>>): Promise<boolean> {
  const resolved = await searchParams;
  return '_storyblok' in resolved || '_storyblok_tk' in resolved;
}

export function isPreviewMode(searchParams: URLSearchParams): boolean {
  return searchParams.has('_storyblok') || searchParams.has('_storyblok_tk');
}