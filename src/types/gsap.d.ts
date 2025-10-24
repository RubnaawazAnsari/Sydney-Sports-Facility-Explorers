/**
 * GSAP type declarations
 * 
 * Extends the global window object with GSAP types
 * for proper TypeScript support.
 */

declare global {
  interface Window {
    gsap: typeof import('gsap');
  }
}

export {};

