
import { SearchInterface } from '@/components/search/SearchInterface';
import { MapView } from '@/components/map/MapView';
import { ExperienceList } from '@/components/experiences/ExperienceList';
import Link from 'next/link';

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
   
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="p-6 bg-white border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Sydney Facilities Locator
              </h1>
              
              <Link
                href="/preview"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md w-full sm:w-auto"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline">Preview Mode</span>
                <span className="sm:hidden">Preview</span>
                <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            <SearchInterface />
          </div>
          
          <div className="flex-1 overflow-hidden">
            <ExperienceList />
          </div>
        </div>

        <div className="hidden lg:block lg:w-1/2">
          <MapView />
        </div>
      </div>
    </div>
  );
}
