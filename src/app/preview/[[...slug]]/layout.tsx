

import { draftMode } from 'next/headers';
import { StoryblokProvider } from '@/components/storyblok/StoryblokProvider';

export default async function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const draft = await draftMode();
  draft.enable();

  return (
    <StoryblokProvider>
      {children}
    </StoryblokProvider>
  );
}
