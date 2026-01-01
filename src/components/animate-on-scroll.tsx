"use client";

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type AnimateOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  animationClass: string;
  hiddenClass: string;
  delay?: string;
};

export function AnimateOnScroll({ children, className, animationClass, hiddenClass, delay }: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(className, isVisible ? animationClass : hiddenClass)}
      style={{ animationDelay: isVisible ? delay : undefined }}
    >
      {children}
    </div>
  );
}
