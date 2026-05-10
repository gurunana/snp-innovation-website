/* ========================================
   useScrollReveal — Custom Hook
   Observes when an element enters the viewport
   and adds the CSS class 'is-visible' to trigger
   the reveal animation defined in index.css.

   Usage:
     const ref = useScrollReveal();
     <div ref={ref} className="reveal">...</div>
   ======================================== */

import { useEffect, useRef } from 'react';

const useScrollReveal = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // IntersectionObserver fires when element reaches threshold visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          // Once visible, stop observing — animation plays once
          observer.unobserve(el);
        }
      },
      {
        threshold: options.threshold ?? 0.12,
        rootMargin: options.rootMargin ?? '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    // Cleanup on unmount
    return () => observer.disconnect();
  }, []);

  return ref;
};

export default useScrollReveal;
