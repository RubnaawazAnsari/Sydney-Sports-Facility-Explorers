
'use client';

import { useEffect } from 'react';

export function StoryblokProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    
    if (typeof window !== 'undefined' && window.location.search.includes('_storyblok')) {
      
      const script = document.createElement('script');
      script.src = 'https://app.storyblok.com/f/storyblok-latest.js';
      script.onload = () => {
        if (window.storyblok) {
          window.storyblok.init({
            accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN || '',
            bridge: true,
            resolveRelations: ['popularArticles.articles'],
          });
          
          window.storyblok.on(['input', 'published', 'change'], (event: { action: string }) => {
            if (event.action === 'input') {
              // Handle input events
            } else if (event.action === 'published') {
              // Reload page when content is published
              window.location.reload();
            }
          });
        }
      };
      document.head.appendChild(script);
    }
  }, []);

  return <>{children}</>;
}
