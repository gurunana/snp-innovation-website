/* ========================================
   OUR STORY — About Page Section 2.2
   PDF: "Left image + right text layout"
   3 paragraphs verbatim from PDF + key highlights
   ======================================== */

import { Box, Container, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const OurStory = ({ storyData = {} }) => {
  const {
    yearFounded = 2020,
    paragraphs = [],
    highlights = [],
  } = storyData;

  // Fallback paragraphs from PDF (if Redux data not loaded yet)
  const defaultParagraphs = [
    "SNP Innovation was founded with a singular belief: that India's greatest untapped potential lies in the space between academic knowledge and real-world application. Our founders — technologists, educators, and innovators — recognized that students were graduating without hands-on skills, industries were struggling to find job-ready talent, and brilliant startup ideas were dying without the right infrastructure and mentorship.",
    'We set out to change that — by building Innovation Infrastructure that connects Education, Industry, Research, and Startups into one cohesive, technology-driven ecosystem.',
    'Today, SNP Innovation operates across four powerful verticals: EdTech & STEM Lab Setup, IT Resourcing, R&D & Automation Solutions, and Startup Incubation — serving schools, colleges, enterprises, MSMEs, government bodies, and innovators across India and internationally.',
  ];

  const displayParagraphs = paragraphs.length > 0 ? paragraphs : defaultParagraphs;

  const defaultHighlights = [
    '150+ Schools & Colleges Served',
    '500+ IT Professionals Deployed',
    '30+ Startups Incubated',
    'National & International Presence',
  ];
  const displayHighlights = highlights.length > 0 ? highlights : defaultHighlights;

  return (
    <Box sx={{ width: '100%', py: { xs: 4, md: 7 }, backgroundColor: '#FFFFFF' }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
            gap: { xs: 5, md: 8 },
            alignItems: 'center',
          }}
        >

          {/* ── LEFT: Cover image ── */}
          <Box sx={{ position: 'relative' }}>
            {/* Main image */}
            <Box
              sx={{
                borderRadius: '20px',
                overflow: 'hidden',
                height: { xs: '280px', md: '440px' },
                boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
                position: 'relative',
              }}
            >
              <Box
                component="img"
                src="/images/gallery/headers/aboutUsCover.png"
                alt="SNP Innovation — Our Story"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>

            {/* Founded badge */}
            <Box
              sx={{
                position: 'absolute',
                bottom: { xs: -20, md: -28 },
                left: { xs: 20, md: -28 },
                background: 'white',
                borderRadius: '16px',
                px: 3, py: 2,
                boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                textAlign: 'center',
                minWidth: '120px',
              }}
            >
              <Typography sx={{ fontWeight: 900, fontSize: '28px', color: '#1A3A8F', lineHeight: 1 }}>
                {yearFounded}
              </Typography>
              <Typography sx={{ fontSize: '12px', color: '#64748B', fontWeight: 600, mt: 0.3 }}>
                Year Founded
              </Typography>
            </Box>

            {/* Decorative dot grid */}
            <Box
              sx={{
                position: 'absolute',
                top: -20, right: -20,
                width: '80px', height: '80px',
                backgroundImage: 'radial-gradient(circle, #1A3A8F 1.5px, transparent 1.5px)',
                backgroundSize: '12px 12px',
                opacity: 0.25,
                display: { xs: 'none', md: 'block' },
              }}
            />
          </Box>

          {/* ── RIGHT: Story text ── */}
          <Box sx={{ pl: { xs: 0, md: 2 } }}>
              {/* Section label */}
              <Typography
                sx={{ color: '#CC2020', fontWeight: 700, letterSpacing: '2px', fontSize: '12px', mb: 1 }}
              >
                OUR STORY
              </Typography>

              {/* Heading */}
              <Typography
                variant="h2"
                sx={{ fontWeight: 800, fontSize: { xs: '28px', md: '38px' }, color: '#0F172A', lineHeight: 1.25, mb: 2 }}
              >
                Building India's Innovation Infrastructure
              </Typography>

              {/* Divider */}
              <Box sx={{ width: 56, height: 4, background: 'linear-gradient(90deg,#1A3A8F,#CC2020)', borderRadius: 2, mb: 4 }} />

              {/* Three paragraphs — exact from PDF */}
              {displayParagraphs.map((para, i) => (
                <Typography
                  key={i}
                  variant="body1"
                  sx={{
                    color: i === 1 ? '#0F172A' : '#475569',
                    lineHeight: 1.85,
                    fontSize: '16px',
                    mb: i < displayParagraphs.length - 1 ? 3 : 4,
                    fontWeight: i === 1 ? 600 : 400, // emphasise the 2nd paragraph
                  }}
                >
                  {para}
                </Typography>
              ))}

              {/* Key highlights */}
              <Box
                sx={{
                  background: 'linear-gradient(135deg,#F8FAFC,#EFF6FF)',
                  border: '1px solid #E2E8F0',
                  borderRadius: '14px',
                  p: 3,
                }}
              >
                <Typography sx={{ fontWeight: 700, color: '#0F172A', fontSize: '15px', mb: 2 }}>
                  Our Impact at a Glance
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                  {displayHighlights.map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <CheckCircleIcon sx={{ fontSize: 18, color: '#1A3A8F', flexShrink: 0 }} />
                      <Typography sx={{ fontSize: '14px', color: '#334155', fontWeight: 500 }}>
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
      </Container>
    </Box>
  );
};

export default OurStory;
