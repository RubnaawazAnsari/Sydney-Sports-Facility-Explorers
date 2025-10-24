

import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title?: string;
  description?: string;
  showSuggestions?: boolean;
  className?: string;
}

export function EmptyState({ 
  title = "No facilities found",
  description = "Try adjusting your search criteria or moving the map to find more facilities.",
  showSuggestions = true,
  className 
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      {/* Icon */}
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.804-6.172-2.172" />
        </svg>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 mb-6 max-w-sm">
        {description}
      </p>

      {/* Suggestions */}
      {showSuggestions && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">Try these suggestions:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Check your spelling</li>
            <li>• Try a different suburb or area</li>
            <li>• Use broader search terms</li>
            <li>• Move the map to explore different areas</li>
            <li>• Try different facility types</li>
          </ul>
        </div>
      )}
    </div>
  );
}

