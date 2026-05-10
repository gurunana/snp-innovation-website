/* ========================================
   SECTION HEADER - Modern reusable section title component
   With gradient text option, animation, and decorative elements
   Usage: <SectionHeader title="Our Services" subtitle="What we offer" gradient light />

   Props:
   - title (string): Main heading text
   - subtitle (string): Optional subtitle text
   - light (boolean): If true, uses light text colors for dark backgrounds
   - gradient (boolean): If true, applies gradient text to title
   ======================================== */

import { useState, useEffect, useRef } from 'react';
import { Typography, Box } from '@mui/material';

const SectionHeader = ({ title, subtitle, light = false, gradient = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        textAlign: 'center',
        mb: { xs: 3, md: 5 },
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease-out',
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        className="font-bold mb-4"
        sx={{
          background: gradient
            ? 'linear-gradient(135deg, #2D5BE3 0%, #FF9500 100%)'
            : 'transparent',
          backgroundClip: gradient ? 'text' : 'unset',
          WebkitBackgroundClip: gradient ? 'text' : 'unset',
          WebkitTextFillColor: gradient ? 'transparent' : 'unset',
          color: !gradient
            ? light
              ? '#FFFFFF'
              : '#1F2937'
            : 'unset',
          fontSize: { xs: '22px', sm: '28px', md: '36px' },
          fontWeight: 800,
          letterSpacing: '-1px',
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="body1"
          sx={{
            color: light ? 'rgba(255,255,255,0.85)' : '#6B7280',
            maxWidth: '700px',
            margin: '16px auto 0',
            fontSize: { xs: '14px', sm: '16px' },
            lineHeight: 1.6,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.6s ease-out 0.15s',
          }}
        >
          {subtitle}
        </Typography>
      )}
      {/* Decorative underline with dot in between */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          margin: '12px auto 0',
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 3,
            background: gradient
              ? 'linear-gradient(90deg, transparent, #2D5BE3)'
              : light
                ? 'rgba(255,255,255,0.3)'
                : '#E5E7EB',
            borderRadius: 2,
          }}
        />
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: gradient
              ? 'linear-gradient(135deg, #2D5BE3, #FF9500)'
              : light
                ? '#FFFFFF'
                : '#2D5BE3',
          }}
        />
        <Box
          sx={{
            width: 40,
            height: 3,
            background: gradient
              ? 'linear-gradient(90deg, #FF9500, transparent)'
              : light
                ? 'rgba(255,255,255,0.3)'
                : '#E5E7EB',
            borderRadius: 2,
          }}
        />
      </Box>
    </Box>
  );
};

export default SectionHeader;
