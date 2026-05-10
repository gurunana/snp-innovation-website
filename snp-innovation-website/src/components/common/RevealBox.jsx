/* ========================================
   RevealBox — Scroll Reveal Wrapper
   Wraps any content with a fade-in + slide-up
   animation that triggers when the element
   scrolls into view.

   Props:
     delay  (0–6) — stagger delay index
     left   (bool) — slide from left instead of up
     sx     — MUI Box sx passthrough
     className — extra CSS classes

   Usage:
     <RevealBox delay={1}>
       <MyCard />
     </RevealBox>
   ======================================== */

import { useRef, useEffect } from 'react';
import { Box } from '@mui/material';

const RevealBox = ({ children, delay = 0, left = false, className = '', sx = {}, ...props }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Build class string
  const baseClass = left ? 'reveal-left' : 'reveal';
  const delayClass = delay > 0 ? `reveal-delay-${delay}` : '';
  const allClasses = [baseClass, delayClass, className].filter(Boolean).join(' ');

  return (
    <Box ref={ref} className={allClasses} sx={sx} {...props}>
      {children}
    </Box>
  );
};

export default RevealBox;
