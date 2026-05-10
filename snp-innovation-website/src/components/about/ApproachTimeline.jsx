/* ========================================
   APPROACH TIMELINE — About Page Section 2.5
   PDF: "Visual horizontal process strip / timeline"
   6 steps: Assess → Design → Deploy → Train → Support → Innovate
   ======================================== */

import { Box, Container, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SchoolIcon from '@mui/icons-material/School';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

// Icons matched to each step from PDF
const STEP_ICONS = [
  SearchIcon,
  DesignServicesIcon,
  RocketLaunchIcon,
  SchoolIcon,
  SupportAgentIcon,
  AutoAwesomeIcon,
];

// Gradient per step (progresses blue → orange)
const STEP_GRADIENTS = [
  'linear-gradient(135deg,#1A3A8F,#2D5BE3)',
  'linear-gradient(135deg,#15803D,#22C55E)',
  'linear-gradient(135deg,#0369A1,#0EA5E9)',
  'linear-gradient(135deg,#7E22CE,#A855F7)',
  'linear-gradient(135deg,#B45309,#F59E0B)',
  'linear-gradient(135deg,#C2410C,#CC2020)',
];

const ApproachTimeline = ({ approachData = [] }) => {

  // Fallback — exact 6 steps from PDF 2.5
  const defaultSteps = [
    { id: 1, step: 'Assess',   title: 'Assess',   description: 'Understand institutional/client needs, current gaps, and opportunity areas.' },
    { id: 2, step: 'Design',   title: 'Design',   description: 'Architect a customized solution: curriculum, technology stack, prototype plan.' },
    { id: 3, step: 'Deploy',   title: 'Deploy',   description: 'Implement with precision — labs, manpower, prototypes, incubation programs.' },
    { id: 4, step: 'Train',    title: 'Train',    description: 'Build internal capacity — teachers, employees, founders — for sustainable impact.' },
    { id: 5, step: 'Support',  title: 'Support',  description: 'Ongoing AMC, technical support, mentoring, and scaling assistance.' },
    { id: 6, step: 'Innovate', title: 'Innovate', description: 'Continuously improve, upgrade, and evolve with emerging technologies.' },
  ];

  const steps = approachData.length > 0 ? approachData : defaultSteps;

  return (
    <Box sx={{ width: '100%', py: { xs: 4, md: 7 }, backgroundColor: '#FFFFFF' }}>
      <Container maxWidth="xl">

        {/* Section header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Typography sx={{ color: '#CC2020', fontWeight: 700, letterSpacing: '2px', fontSize: '12px', mb: 1 }}>
            HOW WE WORK
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, fontSize: { xs: '28px', md: '38px' }, color: '#0F172A', mb: 2 }}
          >
            Our Innovation Lifecycle
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#64748B', maxWidth: 580, mx: 'auto', fontSize: '16px', mb: 3 }}
          >
            Our four-layer innovation methodology ensures that every engagement — whether a STEM lab, IT project, R&D assignment, or startup journey — follows a structured, results-oriented path.
          </Typography>
          <Box sx={{ width: 56, height: 4, background: 'linear-gradient(90deg,#1A3A8F,#CC2020)', borderRadius: 2, mx: 'auto' }} />
        </Box>

        {/* ── Horizontal step strip (desktop) / Vertical stack (mobile) ── */}
        {/* Step numbers row — desktop only */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mb: 0 }}>
          {steps.map((step, index) => {
            const IconComp = STEP_ICONS[index % STEP_ICONS.length];
            const gradient = STEP_GRADIENTS[index % STEP_GRADIENTS.length];
            const isLast = index === steps.length - 1;

            return (
              <Box key={step.id} sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                {/* Circle + step number */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 0 auto' }}>
                  <Box
                    sx={{
                      width: 64, height: 64,
                      borderRadius: '50%',
                      background: gradient,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <IconComp sx={{ fontSize: 28, color: 'white' }} />
                  </Box>
                  <Typography
                    sx={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', mt: 1, letterSpacing: '1px' }}
                  >
                    STEP {index + 1}
                  </Typography>
                </Box>

                {/* Connecting line */}
                {!isLast && (
                  <Box
                    sx={{
                      flex: 1,
                      height: '3px',
                      background: 'linear-gradient(90deg,#E2E8F0,#CBD5E1)',
                      mx: 1,
                      mt: -3,
                      borderRadius: 2,
                    }}
                  />
                )}
              </Box>
            );
          })}
        </Box>

        {/* Step content cards — 3×2 grid on desktop */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'grid' },
            flexDirection: 'row',
            overflowX: { xs: 'auto', md: 'visible' },
            flexWrap: 'nowrap',
            gridTemplateColumns: { md: 'repeat(3, 1fr)' },
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            pb: { xs: 1.5, md: 0 },
            gap: 3,
            mt: { xs: 0, md: 4 },
          }}
        >
          {steps.map((step, index) => {
            const IconComp = STEP_ICONS[index % STEP_ICONS.length];
            const gradient = STEP_GRADIENTS[index % STEP_GRADIENTS.length];

            return (
              <Box
                key={step.id}
                className="reveal"
                sx={{
                  p: 3.5,
                  background: 'white',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  minWidth: { xs: '260px', md: 'auto' },
                  flexShrink: 0,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 20px 48px rgba(0,0,0,0.1)',
                    borderColor: '#CBD5E1',
                  },
                  // Left accent bar
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0, left: 0, bottom: 0,
                    width: '4px',
                    background: gradient,
                    borderRadius: '16px 0 0 16px',
                  },
                }}
              >
                  {/* Mobile icon (hidden on desktop — shown in grid) */}
                  <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box
                      sx={{
                        width: 48, height: 48, borderRadius: '12px',
                        background: gradient,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <IconComp sx={{ fontSize: 24, color: 'white' }} />
                    </Box>
                    <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', letterSpacing: '1px' }}>
                      STEP {index + 1}
                    </Typography>
                  </Box>

                  {/* Step title — exact from PDF */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      fontSize: '20px',
                      color: '#0F172A',
                      mb: 1.5,
                      pl: 0.5,
                    }}
                  >
                    {step.title}
                  </Typography>

                  {/* Description — exact from PDF */}
                  <Typography
                    variant="body2"
                    sx={{ color: '#475569', lineHeight: 1.75, fontSize: '14px', pl: 0.5 }}
                  >
                    {step.description}
                  </Typography>
              </Box>
            );
          })}
        </Box>

        {/* Bottom statement */}
        <Box
          sx={{
            mt: { xs: 6, md: 8 },
            p: { xs: 3, md: 4 },
            borderRadius: '16px',
            background: 'linear-gradient(135deg,#EFF6FF,#FFF7ED)',
            border: '1px solid #E2E8F0',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: '#334155', fontSize: '16px', lineHeight: 1.8, fontWeight: 500, maxWidth: 680, mx: 'auto' }}
          >
            From assessment to continuous innovation — every step is designed to ensure your institution or enterprise gets the maximum return on its technology investment.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ApproachTimeline;
