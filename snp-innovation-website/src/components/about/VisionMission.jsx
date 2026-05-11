/* ========================================
   VISION & MISSION & INSPIRATION — About Page Section 2.3
   3-column layout on desktop: Vision | Mission | Inspiration
   ======================================== */

import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const VisionMission = ({ visionData = '', missionData = [] }) => {

  // Fallback from PDF exact text
  const defaultVision =
    "To become India's most trusted Innovation Infrastructure Company — enabling every institution, enterprise, and individual to participate meaningfully in the technology-driven economy of tomorrow.";

  const defaultMission = [
    'Enable hands-on, project-based technology education in every institution',
    'Bridge the industry-academia skill gap through real-world training and deployment',
    'Deliver end-to-end R&D solutions — from hardware to software, concept to certification',
    'Support startups from idea validation to market launch',
    'Encourage intellectual property development and innovation culture',
    'Create a self-sustaining innovation ecosystem across education, industry, and entrepreneurship',
  ];

  const inspirationPoints = [
    'Driven by India\'s next generation of innovators',
    'Inspired by educators reshaping classrooms',
    'Powered by makers, builders, and dreamers',
  ];

  const vision = visionData || defaultVision;
  const mission = Array.isArray(missionData) && missionData.length > 0 ? missionData : defaultMission;

  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 4, md: 7 },
        background: 'linear-gradient(135deg, #0F172A 0%, #0F2560 50%, #1A3A8F 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      {[...Array(8)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: `${40 + i * 20}px`,
            height: `${40 + i * 20}px`,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.05)',
            top: `${(i * 19 + 5) % 90}%`,
            left: `${(i * 23 + 5) % 95}%`,
          }}
        />
      ))}

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 5 } }}>
          <Typography
            sx={{ color: '#CC2020', fontWeight: 700, letterSpacing: '2px', fontSize: '12px', mb: 1 }}
          >
            OUR PURPOSE
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, fontSize: { xs: '28px', md: '38px' }, color: 'white', mb: 2 }}
          >
            Vision, Mission &amp; Inspiration
          </Typography>
          <Box sx={{ width: 56, height: 4, background: 'linear-gradient(90deg,#CC2020,#1A3A8F)', borderRadius: 2, mx: 'auto' }} />
        </Box>

        {/* CSS Grid — 3 columns on desktop, 1 column on mobile */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 3, md: 3.5 },
            alignItems: 'stretch',
          }}
        >

          {/* ── VISION CARD ── */}
          <Card
            sx={{
              height: '100%',
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '20px',
              borderTop: '4px solid #2D5BE3',
              transition: 'all 0.3s ease',
              '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 20px 48px rgba(0,0,0,0.3)' },
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Box
                sx={{
                  width: 56, height: 56,
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg,#1A3A8F,#2D5BE3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  mb: 2.5,
                  boxShadow: '0 8px 24px rgba(59,130,246,0.35)',
                }}
              >
                <VisibilityIcon sx={{ fontSize: 28, color: 'white' }} />
              </Box>

              <Typography variant="h4" sx={{ fontWeight: 800, fontSize: '20px', color: 'white', mb: 2 }}>
                Our Vision
              </Typography>

              <Typography
                sx={{
                  fontSize: '64px',
                  lineHeight: 0.6,
                  color: 'rgba(255,255,255,0.08)',
                  fontFamily: 'Georgia, serif',
                  mb: 1.5,
                  display: 'block',
                }}
              >
                "
              </Typography>

              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: 1.75,
                  fontSize: '15px',
                  fontWeight: 400,
                  fontStyle: 'italic',
                }}
              >
                {vision}
              </Typography>
            </CardContent>
          </Card>

          {/* ── MISSION CARD ── */}
          <Card
            sx={{
              height: '100%',
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '20px',
              borderTop: '4px solid #CC2020',
              transition: 'all 0.3s ease',
              '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 20px 48px rgba(0,0,0,0.3)' },
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Box
                sx={{
                  width: 56, height: 56,
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg,#C2410C,#CC2020)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  mb: 2.5,
                  boxShadow: '0 8px 24px rgba(249,115,22,0.35)',
                }}
              >
                <RocketLaunchIcon sx={{ fontSize: 28, color: 'white' }} />
              </Box>

              <Typography variant="h4" sx={{ fontWeight: 800, fontSize: '20px', color: 'white', mb: 2 }}>
                Our Mission
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                {mission.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.25,
                      p: 1.25,
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.04)',
                      transition: 'background 0.2s',
                      '&:hover': { background: 'rgba(255,255,255,0.08)' },
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 16, color: '#CC2020', flexShrink: 0, mt: 0.3 }} />
                    <Typography sx={{ color: 'rgba(255,255,255,0.88)', fontSize: '13px', lineHeight: 1.6 }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* ── INSPIRATION CARD ── */}
          <Card
            sx={{
              height: '100%',
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '20px',
              borderTop: '4px solid #FBBF24',
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 20px 48px rgba(0,0,0,0.3)' },
            }}
          >
            {/* Image header */}
            <Box sx={{ position: 'relative', height: 180, overflow: 'hidden' }}>
              <Box
                component="img"
                src="/images/gallery/headers/OurInspiration.png"
                alt="Our Inspiration"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(15,23,42,0.15) 0%, rgba(15,23,42,0.7) 100%)',
                }}
              />
            </Box>

            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Box
                sx={{
                  width: 56, height: 56,
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg,#F59E0B,#FBBF24)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  mb: 2.5,
                  boxShadow: '0 8px 24px rgba(251,191,36,0.35)',
                  mt: -6,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <LightbulbIcon sx={{ fontSize: 28, color: 'white' }} />
              </Box>

              <Typography variant="h4" sx={{ fontWeight: 800, fontSize: '20px', color: 'white', mb: 2 }}>
                Our Inspiration
              </Typography>

              <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', lineHeight: 1.7, mb: 2 }}>
                We draw inspiration from every learner who dares to ask "why," every educator who shapes futures, and every innovator who builds what doesn't yet exist.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {inspirationPoints.map((item, index) => (
                  <Box
                    key={index}
                    sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 16, color: '#FBBF24', flexShrink: 0, mt: 0.3 }} />
                    <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', lineHeight: 1.6 }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

        </Box>
      </Container>
    </Box>
  );
};

export default VisionMission;
