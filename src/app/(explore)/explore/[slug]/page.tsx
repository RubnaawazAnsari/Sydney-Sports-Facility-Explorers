import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { fetchExperienceBySlug } from '@/lib/storyblok/advanced-client';
import { MapView } from '@/components/map/MapView';
import { Experience } from '@/types/storyblok';
import { cn, getFacilityTypeColor, getFacilityTypeBgColor } from '@/lib/utils';

interface ExperienceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ExperienceDetailPage({ params }: ExperienceDetailPageProps) {
  const { slug } = await params;
  
  let experience: Experience | null = null;
  
  try {
    experience = await fetchExperienceBySlug(slug, false);
  } catch (error) {
    console.error('Error fetching experience:', error);
  }

  if (!experience) {
    notFound();
  }

  const primaryTag = experience.tags?.[0] || 'facility';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link 
                href="/explore" 
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Explore
              </Link>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-900 font-medium">{experience.title}</span>
            </nav>

            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-4 py-2 bg-sydney-600 text-white rounded-lg hover:bg-sydney-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Explore
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className={cn(
                  "text-sm font-medium px-3 py-1 rounded-full",
                  getFacilityTypeBgColor(primaryTag),
                  getFacilityTypeColor(primaryTag)
                )}>
                  {primaryTag.replace('-', ' ').toUpperCase()}
                </span>
                {experience.pricing && (
                  <span className={cn(
                    "text-sm font-medium px-3 py-1 rounded-full",
                    experience.pricing === 'Free' 
                      ? "bg-green-100 text-green-800"
                      : experience.pricing === 'Paid'
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  )}>
                    {experience.pricing}
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900">{experience.title}</h1>
              
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-lg">{experience.locationTag}</span>
              </div>
            </div>

            {experience.image && experience.image.filename !== '/api/placeholder/64/64' && (
              <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-200">
                <Image
                  src={experience.image.filename}
                  alt={experience.image.alt || experience.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {experience.description}
              </p>
            </div>

            {experience.sportsFacilities && experience.sportsFacilities.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Sports Facilities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {experience.sportsFacilities.map((facility, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{facility.name}</h3>
                        <span className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          facility.available 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        )}>
                          {facility.available ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{facility.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {experience.amenities && experience.amenities.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {experience.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Operating Hours */}
            {experience.hours && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Operating Hours</h2>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(experience.hours).map(([day, hours]) => (
                        <tr key={day} className="border-b border-gray-100 last:border-b-0">
                          <td className="px-4 py-3 font-medium text-gray-900 capitalize">
                            {day}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {hours || 'Closed'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Contact Information */}
            {experience.contact && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact</h2>
                <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
                  {experience.contact.phone && (
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href={`tel:${experience.contact.phone}`} className="text-sydney-600 hover:text-sydney-700">
                        {experience.contact.phone}
                      </a>
                    </div>
                  )}
                  {experience.contact.email && (
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${experience.contact.email}`} className="text-sydney-600 hover:text-sydney-700">
                        {experience.contact.email}
                      </a>
                    </div>
                  )}
                  {experience.contact.address && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-700">{experience.contact.address}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Accessibility */}
            {experience.accessibility && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Accessibility</h2>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <p className="text-gray-700">{experience.accessibility}</p>
                </div>
              </div>
            )}

            {/* External Link */}
            {experience.externalLink && (
              <div className="bg-sydney-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Visit Website</h2>
                <p className="text-gray-600 mb-4">
                  Get more information, book facilities, or check availability.
                </p>
                <a
                  href={experience.externalLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-sydney-600 text-white px-6 py-3 rounded-lg hover:bg-sydney-700 transition-colors"
                >
                  <span>Visit Website</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* Right Column - Map */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Location</h2>
                <p className="text-sm text-gray-600">{experience.locationTag}</p>
              </div>
              <div className="h-96">
                <MapView />
              </div>
              {experience.coordinates && (
                <div className="p-4 border-t border-gray-200">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${experience.coordinates.lat},${experience.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sydney-600 hover:text-sydney-700 text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Get Directions
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: ExperienceDetailPageProps) {
  const { slug } = await params;
  
  try {
    const experience = await fetchExperienceBySlug(slug, false);
    
    if (!experience) {
      return {
        title: 'Experience Not Found',
        description: 'The requested experience could not be found.',
      };
    }

    return {
      title: `${experience.title} - Sydney Sports Facilities`,
      description: experience.description,
      openGraph: {
        title: experience.title,
        description: experience.description,
        images: experience.image ? [experience.image.filename] : [],
      },
    };
  } catch {
    return {
      title: 'Experience Not Found',
      description: 'The requested experience could not be found.',
    };
  }
}
