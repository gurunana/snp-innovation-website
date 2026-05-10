/* ========================================
   STAT COUNTER - Modern animated number counter
   Bigger, bolder numbers with + suffix
   Orange accent color, animates on scroll into view
   Uses Intersection Observer for performance

   Props:
   - count (number): Target count number to animate to
   - label (string): Label text below the number
   ======================================== */

import { useState, useEffect, useRef } from 'react';
import { Typography, Box } from '@mui/material';

const StatCounter = ({ count, label }) => {
  const [displayCount, setDisplayCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  // Animate count when element comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCount();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasAnimated, count]);

  // Animate the number from 0 to target count
  const animateCount = () => {
    let start = 0;
    const end = count;
    const duration = 2000; // 2 seconds animation
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setDisplayCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
  };

  return (
    <Box
      ref={ref}
      sx={{
        textAlign: 'center',
        padding: '24px 16px',
        opacity: hasAnimated ? 1 : 0.5,
        transform: hasAnimated ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease-out',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          background: 'linear-gradient(135deg, #FF9500 0%, #FBBF24 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 900,
          fontSize: { xs: '42px', sm: '56px', md: '72px' },
          letterSpacing: '-2px',
          marginBottom: 1,
        }}
      >
        {displayCount}+
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: { xs: '14px', sm: '16px' },
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default StatCounter;
