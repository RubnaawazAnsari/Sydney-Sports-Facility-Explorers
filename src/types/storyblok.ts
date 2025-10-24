/**
 * TypeScript interfaces for Storyblok CMS integration
 * 
 * These types ensure type safety when working with Storyblok content
 * and provide clear contracts for the Experience content type.
 * 
 * Architecture Decision: Strong typing for CMS data prevents runtime errors
 * and provides excellent developer experience with autocomplete and
 * compile-time error checking.
 */

// ============================================================================
// CORE STORYBLOK TYPES
// ============================================================================

/**
 * Base Storyblok asset interface for images and media
 */
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

/**
 * Storyblok link interface for external links and navigation
 */
export interface StoryblokLink {
  id: string;
  url: string;
  linktype: 'url' | 'story' | 'email' | 'asset';
  fieldtype: string;
  cached_url?: string;
}

// ============================================================================
// EXPERIENCE CONTENT TYPE
// ============================================================================

/**
 * Main Experience content type from Storyblok
 * 
 * This represents a sports facility or experience in Sydney.
 * All fields are required to ensure data completeness.
 */
export interface Experience {
  /** Unique identifier from Storyblok */
  id: string;
  
  /** Human-readable title of the facility */
  title: string;
  
  /** Detailed description of the facility and its offerings */
  description: string;
  
  /** Primary image asset for the facility */
  image: StoryblokAsset;
  
  /** Array of facility tags for categorization and filtering */
  tags: string[];
  
  /** External website or booking link */
  externalLink: StoryblokLink;
  
  /** Location tag (suburb/area) for geographic filtering */
  locationTag: string;
  
  /** Geographic coordinates for map positioning */
  coordinates?: {
    lat: number;
    lng: number;
  };
  
  /** Additional amenities and features */
  amenities?: string[];
  
  /** Operating hours information */
  hours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  
  /** Contact information */
  contact?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  
  /** Facility type (Park, Pool, Sports field, etc.) */
  facilityType?: string;
  
  /** Sports facilities available */
  sportsFacilities?: Array<{
    name: string;
    description: string;
    available: boolean;
  }>;
  
  /** Pricing information */
  pricing?: 'Free' | 'Paid' | 'Mixed';
  
  /** Accessibility features */
  accessibility?: string;
  
  /** Facility owner */
  owner?: string;
  
  /** Current status */
  status?: string;
  
  /** External URL */
  url?: string;
  
  /** Last updated timestamp */
  updatedAt: string;
  
  /** Creation timestamp */
  createdAt: string;
}

// ============================================================================
// STORYBLOK API RESPONSE TYPES
// ============================================================================

/**
 * Storyblok API response wrapper
 */
export interface StoryblokResponse<T> {
  data: {
    stories: T[];
    total: number;
    per_page: number;
    current_page: number;
    total_pages: number;
  };
}

/**
 * Individual story response from Storyblok
 */
export interface StoryblokStory {
  id: number;
  name: string;
  slug: string;
  full_slug: string;
  content: Experience;
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

// ============================================================================
// FILTERING AND SEARCH TYPES
// ============================================================================

/**
 * Search parameters for filtering experiences
 */
export interface ExperienceSearchParams {
  /** Text search query */
  query?: string;
  
  /** Facility type filter */
  facilityType?: string;
  
  /** Geographic bounds for map-based filtering */
  bounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  
  /** Center point and radius for proximity search */
  location?: {
    lat: number;
    lng: number;
    radius: number;
  };
  
  /** Tags to filter by */
  tags?: string[];
  
  /** Pagination parameters */
  page?: number;
  perPage?: number;
}

/**
 * Search results with metadata
 */
export interface ExperienceSearchResults {
  experiences: Experience[];
  total: number;
  page: number;
  perPage: number;
  hasMore: boolean;
}

// ============================================================================
// FACILITY TYPE DEFINITIONS
// ============================================================================

/**
 * Predefined facility types for consistent categorization
 */
export const FACILITY_TYPES = {
  PARK: 'park',
  SPORTS_CENTER: 'sports-center',
  SWIMMING_POOL: 'swimming-pool',
  TENNIS_COURT: 'tennis-court',
  BASKETBALL_COURT: 'basketball-court',
  FOOTBALL_FIELD: 'football-field',
  CRICKET_GROUND: 'cricket-ground',
  GYM: 'gym',
  RECREATION_CENTER: 'recreation-center',
  OUTDOOR_FITNESS: 'outdoor-fitness',
} as const;

export type FacilityType = typeof FACILITY_TYPES[keyof typeof FACILITY_TYPES];

/**
 * Amenity types for facility features
 */
export const AMENITY_TYPES = {
  WIFI: 'wifi',
  PARKING: 'parking',
  KITCHEN: 'kitchen',
  CHANGING_ROOMS: 'changing-rooms',
  SHOWERS: 'showers',
  EQUIPMENT_HIRE: 'equipment-hire',
  COACHING: 'coaching',
  DISABLED_ACCESS: 'disabled-access',
  CAFE: 'cafe',
  LOCKERS: 'lockers',
} as const;

export type AmenityType = typeof AMENITY_TYPES[keyof typeof AMENITY_TYPES];

