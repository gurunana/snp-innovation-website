/* ========================================
   VISION & MISSION — About Page Section 2.3
   PDF: Vision = single statement | Mission = 6 bullet points
   Layout: side-by-side cards on desktop
   ======================================== */

import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
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

        {/* Section label */}
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
            Vision & Mission
          </Typography>
          <Box sx={{ width: 56, height: 4, background: 'linear-gradient(90deg,#CC2020,#1A3A8F)', borderRadius: 2, mx: 'auto' }} />
        </Box>

        <Grid container spacing={{ xs: 3, md: 5 }} alignItems="stretch">

          {/* ── VISION CARD ── */}
          <Grid item xs={12} md={5}>
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
              <CardContent sx={{ p: { xs: 4, md: 5 } }}>
                {/* Icon */}
                <Box
                  sx={{
                    width: 64, height: 64,
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg,#1A3A8F,#2D5BE3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    mb: 3,
                    boxShadow: '0 8px 24px rgba(59,130,246,0.35)',
                  }}
                >
                  <VisibilityIcon sx={{ fontSize: 32, color: 'white' }} />
                </Box>

                <Typography
                  variant="h4"
                  sx={{ fontWeight: 800, fontSize: '22px', color: 'white', mb: 3 }}
                >
                  Our Vision
                </Typography>

                {/* Large decorative quote mark */}
                <Typography
                  sx={{
                    fontSize: '80px',
                    lineHeight: 0.6,
                    color: 'rgba(255,255,255,0.08)',
                    fontFamily: 'Georgia, serif',
                    mb: 2,
                    display: 'block',
                  }}
                >
                  "
                </Typography>

                {/* Exact PDF vision text */}
                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    lineHeight: 1.85,
                    fontSize: '17px',
                    fontWeight: 400,
                    fontStyle: 'italic',
                  }}
                >
                  {vision}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* ── MISSION CARD ── */}
          <Grid item xs={12} md={7}>
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
              <CardContent sx={{ p: { xs: 4, md: 5 } }}>
                {/* Icon */}
                <Box
                  sx={{
                    width: 64, height: 64,
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg,#C2410C,#CC2020)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    mb: 3,
                    boxShadow: '0 8px 24px rgba(249,115,22,0.35)',
                  }}
                >
                  <RocketLaunchIcon sx={{ fontSize: 32, color: 'white' }} />
                </Box>

                <Typography
                  variant="h4"
                  sx={{ fontWeight: 800, fontSize: '22px', color: 'white', mb: 3 }}
                >
                  Our Mission
                </Typography>

                {/* 6 bullet points — exact from PDF */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {mission.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                        p: 1.5,
                        borderRadius: '10px',
                        background: 'rgba(255,255,255,0.04)',
                        transition: 'background 0.2s',
                        '&:hover': { background: 'rgba(255,255,255,0.08)' },
                      }}
                    >
                      <CheckCircleIcon
                        sx={{ fontSize: 20, color: '#CC2020', flexShrink: 0, mt: 0.1 }}
                      />
                      <Typography
                        sx={{ color: 'rgba(255,255,255,0.88)', fontSize: '15px', lineHeight: 1.7 }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default VisionMission;
