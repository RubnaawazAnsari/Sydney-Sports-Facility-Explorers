

import { Experience } from '@/types/storyblok';
import { cn, getFacilityTypeColor, getFacilityTypeBgColor } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

interface ExperienceCardProps {
  experience: Experience;
  isSelected?: boolean;
  onClick?: () => void;
}

export function ExperienceCard({ experience, isSelected, onClick }: ExperienceCardProps) {
  const primaryTag = experience.tags?.[0] || 'facility';
  
  return (
    <Link 
      href={`/explore/${experience.id}`}
      className={cn(
        "block bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 p-4",
        isSelected && "ring-2 ring-sydney-500 ring-offset-2"
      )}
      onClick={onClick}
    >
      <div className="flex gap-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-200 flex items-center justify-center">
          {experience.image && experience.image.filename !== '/api/placeholder/64/64' ? (
            <Image
              src={experience.image.filename}
              alt={experience.image.alt || experience.title}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={cn(
                  "text-xs font-medium px-2 py-1 rounded-full",
                  getFacilityTypeBgColor(primaryTag),
                  getFacilityTypeColor(primaryTag)
                )}>
                  {primaryTag.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {experience.title}
              </h3>
            </div>

            {experience.externalLink && (
              <a
                href={experience.externalLink.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-sydney-600 hover:text-sydney-700 p-1"
                title="Visit website"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{experience.locationTag}</span>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {experience.description}
          </p>

          {experience.sportsFacilities && experience.sportsFacilities.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {experience.sportsFacilities.slice(0, 3).map((sport, index) => (
                <span
                  key={index}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                >
                  {sport.name}
                </span>
              ))}
              {experience.sportsFacilities.length > 3 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{experience.sportsFacilities.length - 3} more
                </span>
              )}
            </div>
          )}

          {experience.amenities && experience.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {experience.amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                >
                  {amenity}
                </span>
              ))}
              {experience.amenities.length > 3 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{experience.amenities.length - 3} more
                </span>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 text-sm">
            {experience.pricing && (
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                experience.pricing === 'Free' 
                  ? "bg-green-100 text-green-800"
                  : experience.pricing === 'Paid'
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              )}>
                {experience.pricing}
              </span>
            )}
            {experience.status && (
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                experience.status === 'Current'
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              )}>
                {experience.status}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
