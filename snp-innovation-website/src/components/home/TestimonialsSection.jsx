/* ========================================
   TESTIMONIALS SECTION - Modern card carousel
   Displays client testimonials with quote marks and avatar placeholders
   ======================================== */

import { useState, useEffect } from 'react';
import { Box, Container, IconButton, Typography, Card, CardContent } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import SectionHeader from '../common/SectionHeader';

const TestimonialsSection = ({ testimonialsData = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide testimonials every 6 seconds
  useEffect(() => {
    if (testimonialsData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonialsData.length / 3));
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonialsData.length]);

  // Calculate number of slides
  const itemsPerSlide = 3;
  const numSlides = Math.ceil(testimonialsData.length / itemsPerSlide);

  // Get testimonials for current slide
  const startIdx = currentIndex * itemsPerSlide;
  const currentTestimonials = testimonialsData.slice(startIdx, startIdx + itemsPerSlide);

  // Handle navigation
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + numSlides) % numSlides);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % numSlides);
  };

  return (
    <Box
      sx={{
        width: '100%',
        paddingY: { xs: 4, md: 6 },
        backgroundColor: '#F1F5F9',
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <SectionHeader
          title="What Our Clients Say"
          subtitle="Real Stories from Schools, Enterprises, and Startups We've Partnered With"
        />

        {/* Testimonials Grid */}
        <Box sx={{ position: 'relative', marginBottom: 4 }}>
          <Box
            sx={{
              display: { xs: 'flex', md: 'grid' },
              flexDirection: 'row',
              overflowX: { xs: 'auto', md: 'visible' },
              flexWrap: 'nowrap',
              gridTemplateColumns: { md: 'repeat(3, 1fr)' },
              gap: { xs: 2.5, md: 3 },
              marginTop: 2,
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
              pb: { xs: 1.5, md: 0 },
            }}
          >
            {currentTestimonials.map((testimonial) => {
              const initials = (testimonial.name || '')
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase();

              return (
                <Card
                  key={testimonial.id}
                  sx={{
                    background: 'white',
                    minWidth: { xs: '280px', md: 'auto' },
                    flexShrink: 0,
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    transition: 'all 0.4s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'visible',
                    '&:hover': {
                      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)',
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                    {/* Quote Icon */}
                    <Box
                      sx={{
                        paddingTop: 3,
                        paddingX: 3,
                      }}
                    >
                      <FormatQuoteIcon
                        sx={{
                          fontSize: 48,
                          color: '#CC2020',
                          opacity: 0.3,
                        }}
                      />
                    </Box>

                    {/* Quote Text */}
                    <CardContent
                      sx={{
                        flex: 1,
                        paddingX: 3,
                        paddingTop: 1,
                        paddingBottom: 0,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: '#475569',
                          lineHeight: 1.8,
                          fontSize: '16px',
                          fontStyle: 'italic',
                          marginBottom: 3,
                        }}
                      >
                        "{testimonial.quote}"
                      </Typography>

                      {/* Divider */}
                      <Box
                        sx={{
                          width: '40px',
                          height: '3px',
                          background: '#CC2020',
                          borderRadius: '2px',
                          marginBottom: 3,
                        }}
                      />

                      {/* Author Info */}
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 3,
                          alignItems: 'center',
                        }}
                      >
                        {/* Avatar Placeholder */}
                        <Box
                          sx={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #CC2020 0%, #E53535 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '18px',
                            flexShrink: 0,
                          }}
                        >
                          {initials}
                        </Box>

                        {/* Name & Designation */}
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 700,
                              color: '#0F172A',
                              fontSize: '15px',
                            }}
                          >
                            {testimonial.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: '#64748B',
                              fontSize: '13px',
                            }}
                          >
                            {testimonial.designation}
                          </Typography>
                          {testimonial.organization && (
                            <Typography
                              variant="caption"
                              sx={{
                                color: '#94A3B8',
                                fontSize: '12px',
                                display: 'block',
                              }}
                            >
                              {testimonial.organization}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                </Card>
              );
            })}
          </Box>
        </Box>

        {/* Navigation Controls - Only show if multiple slides */}
        {numSlides > 1 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
              marginTop: 6,
            }}
          >
            <IconButton
              onClick={handlePrevious}
              sx={{
                width: 48,
                height: 48,
                backgroundColor: '#CC2020',
                color: 'white',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#A01818',
                  transform: 'scale(1.08)',
                },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>

            {/* Slide Indicators */}
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
              {Array.from({ length: numSlides }).map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  sx={{
                    width: index === currentIndex ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: index === currentIndex ? '#CC2020' : '#CBD5E1',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#CC2020',
                    },
                  }}
                />
              ))}
            </Box>

            <IconButton
              onClick={handleNext}
              sx={{
                width: 48,
                height: 48,
                backgroundColor: '#CC2020',
                color: 'white',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#A01818',
                  transform: 'scale(1.08)',
                },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
