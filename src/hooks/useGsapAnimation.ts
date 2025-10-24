import { useEffect } from 'react';

interface UseGsapAnimationOptions<T = unknown> {
  items: T[];
  containerRef: React.RefObject<HTMLDivElement | null>;
  animationClass?: string;
}

export function useGsapAnimation<T = unknown>({ 
  items, 
  containerRef, 
  animationClass = '.experience-card' 
}: UseGsapAnimationOptions<T>) {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.gsap) return;

    const cards = containerRef.current?.querySelectorAll(animationClass);
    if (!cards || cards.length === 0) return;

    cards.forEach((card, index) => {
      window.gsap.set(card, {
        opacity: 0,
        y: 20
      });

      window.gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out'
      });
    });
  }, [items, containerRef, animationClass]);
}
