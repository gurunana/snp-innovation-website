/* ========================================
   WHY SNP INNOVATION — Home Page Section 1.4
   PDF: "3-Column Feature Strip with Icons"
   Text: "We don't just supply products — we build innovation ecosystems."
   Lists 6 differentiators with icons
   ======================================== */

import { Box, Container, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SectionHeader from '../common/SectionHeader';

const WhySnpSection = ({ featuresData = [] }) => {

  // Fallback features matching PDF exactly
  const defaultFeatures = [
    'End-to-End Solution Provider — from concept to commercialization',
    'Plug-and-Play Infrastructure — zero-friction lab setup for institutions',
    'Transdisciplinary Learning Approach — breaking silos between subjects',
    'Industry-Linked Training — real projects, real skills, real outcomes',
    'IP & Certification Support — patents, national & international certifications',
    'National & International Client Network — proven track record across verticals',
  ];

  // Use redux data if available, else use defaults
  const features = featuresData.length > 0 ? featuresData : defaultFeatures;

  // Split into 2 columns of 3 each for the 3-column feel on desktop
  const column1 = features.slice(0, 3);
  const column2 = features.slice(3);

  return (
    <Box
      className="section-fade-top"
      sx={{
        width: '100%',
        paddingY: { xs: 4, md: 7 },
        background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 4, md: 8 }, alignItems: { md: 'center' } }}>

          {/* LEFT: Heading + intro text */}
          <Box sx={{ flex: { md: '0 0 35%' }, maxWidth: { md: '35%' } }}>
            <Box>
              {/* Section label */}
              <Typography
                variant="overline"
                sx={{
                  color: '#CC2020',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  fontSize: '12px',
                  display: 'block',
                  mb: 1,
                }}
              >
                WHY CHOOSE US
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '28px', md: '36px' },
                  color: '#0F172A',
                  lineHeight: 1.25,
                  mb: 3,
                }}
              >
                Why SNP Innovation?
              </Typography>

              {/* Decorative line */}
              <Box sx={{ width: 60, height: 4, background: 'linear-gradient(90deg,#1A3A8F,#CC2020)', borderRadius: 2, mb: 3 }} />

              <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.8, fontSize: '16px', mb: 3 }}>
                We don't just supply products — we build innovation ecosystems. Here's what makes us different:
              </Typography>

              {/* Stats highlight */}
              <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: '28px', color: '#1A3A8F' }}>200+</Typography>
                  <Typography sx={{ fontSize: '13px', color: '#64748B', fontWeight: 500 }}>Clients Served</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: '28px', color: '#CC2020' }}>10+</Typography>
                  <Typography sx={{ fontSize: '13px', color: '#64748B', fontWeight: 500 }}>Years Experience</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* RIGHT: Two-column feature list */}
          <Box sx={{ flex: { md: '1 1 auto' } }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1.5 }}>
              {/* Column 1 */}
              <Box>
                {column1.map((feature, index) => (
                  <FeatureItem key={index} text={feature} />
                ))}
              </Box>
              {/* Column 2 */}
              <Box>
                {column2.map((feature, index) => (
                  <FeatureItem key={index} text={feature} />
                ))}
              </Box>
            </Box>
          </Box>

        </Box>
      </Container>
    </Box>
  );
};

/* ---- Sub-component: individual feature item ---- */
const FeatureItem = ({ text }) => {
  // Split text at em-dash for bold label
  const parts = text.split(' — ');
  const label = parts[0] || '';
  const detail = parts[1] || '';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        mb: 3,
        p: 2.5,
        borderRadius: '12px',
        background: 'white',
        border: '1px solid #E2E8F0',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: '#1A3A8F',
          boxShadow: '0 8px 24px rgba(30,64,175,0.08)',
          transform: 'translateX(4px)',
        },
      }}
    >
      {/* Check Icon */}
      <CheckCircleIcon
        sx={{
          color: '#1A3A8F',
          fontSize: 24,
          flexShrink: 0,
          mt: 0.2,
        }}
      />

      {/* Text */}
      <Box>
        <Typography sx={{ fontWeight: 700, fontSize: '14px', color: '#0F172A', lineHeight: 1.4 }}>
          {label}
        </Typography>
        {detail && (
          <Typography sx={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, mt: 0.5 }}>
            {detail}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default WhySnpSection;
