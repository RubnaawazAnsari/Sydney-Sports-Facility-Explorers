/**
 * Auto-generated Storyblok types
 * Generated on: 2025-10-22T10:36:06.209Z
 */

// Base Storyblok types
export interface StoryblokAsset {
  id: number;
  alt: string;
  name: string;
  focus: string;
  title: string;
  filename: string;
  copyright: string;
  fieldtype: string;
  meta_data: Record<string, unknown>;
}

export interface StoryblokLink {
  id: string;
  url: string;
  linktype: 'url' | 'story' | 'email' | 'asset';
  fieldtype: string;
  cached_url?: string;
}

// Generated content types
export interface Experience {
  _uid: string;
  component: 'Experience';
  title: string;
  description: string;
  image: StoryblokAsset;
  tags: string[];
  externalLink: StoryblokLink;
  locationTag: string;
  amenities?: string[];
  pricing?: string;
  accessibility?: string[];
}

export interface StoryblokStory<T = unknown> {
  id: number;
  name: string;
  slug: string;
  full_slug: string;
  content: T;
  created_at: string;
  updated_at: string;
  published_at: string;
  uuid: string;
  parent_id: number | null;
  group_id: string;
  sort_by_date: string | null;
  position: number;
  tag_list: string[];
  is_startpage: boolean;
  meta_data: Record<string, unknown>;
}

export interface StoryblokResponse<T = unknown> {
  data: {
    stories: StoryblokStory<T>[];
    total: number;
    per_page: number;
    current_page: number;
    total_pages: number;
  };
}

// Component mapping for type-safe rendering
export const componentMap = {
  Experience: 'Experience',
} as const;

export type ComponentType = keyof typeof componentMap;
