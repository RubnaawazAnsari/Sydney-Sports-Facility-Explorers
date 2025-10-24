
import Link from 'next/link';
import { PreviewExperienceList } from '@/components/experiences/PreviewExperienceList';
import { MapView } from '@/components/map/MapView';
import { SearchInterface } from '@/components/search/SearchInterface';
import { isPreviewModeAsync } from '@/lib/storyblok/advanced-client';

interface PreviewPageProps {
  params: Promise<{
    slug?: string[];
  }>;
  searchParams: Promise<{
    _storyblok?: string;
    _storyblok_tk?: string;
    _storyblok_release?: string;
  }>;
}

export default async function PreviewPage({ 

  searchParams 
}: PreviewPageProps) {

  const isPreview = await isPreviewModeAsync(searchParams);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Preview Mode Banner */}
      <div className="bg-yellow-500 text-black py-2 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Preview Mode</span>
            <span className="text-sm">
              {isPreview 
                ? "- You are viewing draft content from Storyblok" 
                : "- Preview mode (test access - no Storyblok parameters)"
              }
            </span>
          </div>
          
          {/* Back to Main App Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-1 px-3 py-1 bg-black/10 hover:bg-black/20 text-black font-medium rounded-md transition-colors duration-200 text-sm"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Main App
          </Link>
        </div>
      </div>

      <div className="flex h-screen">
     
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="p-6 bg-white border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Sydney Facilities Locator (Preview)
            </h1>
            <SearchInterface />
          </div>
          
          <div className="flex-1 overflow-hidden">
            <PreviewExperienceList />
          </div>
        </div>


        <div className="hidden lg:block lg:w-1/2">
          <MapView />
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
