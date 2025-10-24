import StoryblokClient from 'storyblok-js-client';
import type { 
  Experience, 
  StoryblokResponse, 
  StoryblokStory,
  ExperienceSearchParams,
  ExperienceSearchResults 
} from '@/types/storyblok';

const storyblokClient = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN
});

export async function fetchExperiences(
  params: ExperienceSearchParams = {}
): Promise<ExperienceSearchResults> {
  try {
    const {
      query,
      facilityType,
      bounds,
      tags,
      page = 1,
      perPage = 20
    } = params;

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

    if (bounds) {
      storyblokParams.filter_query = {
        ...(storyblokParams.filter_query as object || {}),
        location: {
          within: `${bounds.west},${bounds.south},${bounds.east},${bounds.north}`
        }
      };
    }

    if (tags && tags.length > 0) {
      storyblokParams.filter_query = {
        ...(storyblokParams.filter_query as object || {}),
        tags: { in_array: tags }
      };
    }

    const response: StoryblokResponse<StoryblokStory> = await storyblokClient.get('cdn/stories', storyblokParams);

    const experiences: Experience[] = response.data.stories.map(story => ({
      id: String(story.id),
      title: story.content.title,
      description: story.content.description,
      image: story.content.image,
      tags: story.content.tags || [],
      externalLink: story.content.externalLink,
      locationTag: story.content.locationTag,
      coordinates: story.content.coordinates,
      amenities: story.content.amenities,
      pricing: story.content.pricing,
      accessibility: story.content.accessibility,
      facilityType: story.content.facilityType,
      sportsFacilities: story.content.sportsFacilities,
      owner: story.content.owner,
      status: story.content.status,
      url: story.content.url,
      updatedAt: story.published_at,
      createdAt: story.created_at
    }));

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

export async function fetchFacilityTypes(): Promise<string[]> {
  try {
    const response = await storyblokClient.get('cdn/stories', {
      content_type: 'Experience',
      per_page: 1
    });

    const tags = new Set<string>();
    
    if (response.data.stories.length > 0) {
      const story = response.data.stories[0];
      if (story.content.tags) {
        story.content.tags.forEach((tag: string) => tags.add(tag));
      }
    }

    return Array.from(tags);
    } catch {
    return [];
  }
}