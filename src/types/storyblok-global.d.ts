

declare global {
  interface Window {
    storyblok?: {
      init: (config: {
        accessToken: string;
        bridge: boolean;
        resolveRelations?: string[];
      }) => void;
      on: (events: string[], callback: (event: { action: string }) => void) => void;
    };
  }
}

export {};
