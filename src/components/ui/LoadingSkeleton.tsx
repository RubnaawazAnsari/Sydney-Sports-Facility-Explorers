
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
  showImage?: boolean;
}

export function LoadingSkeleton({ 
  className, 
  lines = 3, 
  showImage = true 
}: LoadingSkeletonProps) {
  return (
    <div className={cn("facility-card p-6", className)}>
      <div className="flex gap-4">
        {showImage && (
          <div className="loading-skeleton w-16 h-16 rounded-lg shrink-0" />
        )}
        
        <div className="flex-1 space-y-3">
 
          <div className="loading-skeleton h-5 w-3/4 rounded" />
          
    
          <div className="loading-skeleton h-4 w-1/2 rounded" />
          
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "loading-skeleton h-4 rounded",
                index === lines - 1 ? "w-2/3" : "w-full"
              )}
            />
          ))}
          
          <div className="flex gap-2 mt-4">
            <div className="loading-skeleton h-6 w-16 rounded-full" />
            <div className="loading-skeleton h-6 w-20 rounded-full" />
            <div className="loading-skeleton h-6 w-14 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExperienceListSkeleton() {
  return (
    <div className="space-y-4 p-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <LoadingSkeleton key={index} />
      ))}
    </div>
  );
}

export function SearchSkeleton() {
  return (
    <div className="space-y-4">
      <div className="loading-skeleton h-12 w-full rounded-lg" />
      <div className="flex gap-2">
        <div className="loading-skeleton h-8 w-20 rounded-full" />
        <div className="loading-skeleton h-8 w-24 rounded-full" />
        <div className="loading-skeleton h-8 w-20 rounded-full" />
      </div>
    </div>
  );
}
