/* ========================================
   LAB SETUP PROCESS - 8 step timeline
   Needs Assessment → AMC
   PDF Section 3.6
   ======================================== */

import { Box, Typography, Container } from '@mui/material';
import { Grid } from '@mui/material';
import SectionHeader from '../common/SectionHeader';

// All 8 steps defined outside return — no logic in JSX
const steps = [
  {
    id: 1,
    title: 'Needs Assessment',
    icon: '🔍',
    description:
      'We conduct a thorough assessment of your institution — curriculum, space, student count, board affiliation, and technology vision.',
    duration: '1 Week',
  },
  {
    id: 2,
    title: 'Lab Design & Planning',
    icon: '📐',
    description:
      'Our architects and STEM experts create detailed lab layout, equipment lists, infrastructure specs, and a phased rollout plan.',
    duration: '1–2 Weeks',
  },
  {
    id: 3,
    title: 'Infrastructure & Installation',
    icon: '🏗️',
    description:
      'Civil, electrical & networking work is coordinated with your facilities team — including server rooms, charging stations, and smart boards.',
    duration: '2–4 Weeks',
  },
  {
    id: 4,
    title: 'Equipment & Kit Deployment',
    icon: '📦',
    description:
      'All hardware, software, robotics kits, sensors, and lab supplies are delivered, installed, configured, and tested end-to-end.',
    duration: '1–2 Weeks',
  },
  {
    id: 5,
    title: 'Teacher Training',
    icon: '👩‍🏫',
    description:
      'A hands-on residential or on-site training programme equips your faculty with pedagogical skills and technical confidence.',
    duration: '3–5 Days',
  },
  {
    id: 6,
    title: 'Curriculum Integration',
    icon: '📚',
    description:
      "SNP's academic team works with your coordinators to embed lab activities into the school timetable and examination calendar.",
    duration: '1 Week',
  },
  {
    id: 7,
    title: 'Student Orientation',
    icon: '🎓',
    description:
      'Students get their first immersive lab experience — safety briefing, tool familiarisation, and a fun kick-off project.',
    duration: '1–2 Days',
  },
  {
    id: 8,
    title: 'AMC & Ongoing Support',
    icon: '🔧',
    description:
      'Annual Maintenance Contracts cover equipment servicing, curriculum updates, teacher refreshers, and dedicated helpdesk support.',
    duration: 'Ongoing',
  },
];

const LabSetupProcess = () => {
  return (
    <Box
      sx={{
        py: { xs: 3, md: 5 },
        background: 'linear-gradient(160deg, #0F172A 0%, #1E3A8A 60%, #0F172A 100%)',
      }}
    >
      <Container maxWidth="xl">
        <SectionHeader
          title="Complete Lab Setup Process"
          subtitle="From first conversation to a fully functional lab — we guide you through every single step"
          light
        />

        {/* Timeline-style step layout */}
        <Box sx={{ mt: 4, position: 'relative' }}>
          {/* Vertical connector line (desktop) */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: 2,
              background: 'linear-gradient(to bottom, #2D5BE3, #8B5CF6, #10B981)',
              transform: 'translateX(-50%)',
              opacity: 0.4,
            }}
          />

          {steps.map((step, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <Box
                key={step.id}
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'flex-start', md: isLeft ? 'flex-start' : 'flex-end' },
                  mb: { xs: 2, md: 3 },
                  position: 'relative',
                }}
              >
                {/* Desktop: alternating left/right */}
                <Box
                  sx={{
                    width: { xs: '100%', md: '46%' },
                    position: 'relative',
                  }}
                >
                  {/* Connector dot */}
                  <Box
                    sx={{
                      display: { xs: 'none', md: 'block' },
                      position: 'absolute',
                      top: '50%',
                      [isLeft ? 'right' : 'left']: '-8%',
                      transform: 'translateY(-50%)',
                    }}
                  >
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #2D5BE3, #8B5CF6)',
                        border: '3px solid rgba(255,255,255,0.3)',
                        boxShadow: '0 0 0 6px rgba(59,130,246,0.2)',
                      }}
                    />
                  </Box>

                  {/* Card */}
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      backdropFilter: 'blur(12px)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'rgba(255,255,255,0.12)',
                        transform: 'scale(1.02)',
                        boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      {/* Step number + emoji */}
                      <Box sx={{ flexShrink: 0 }}>
                        <Box
                          sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 2,
                            background: 'linear-gradient(135deg, #2D5BE3, #8B5CF6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '18px',
                            mb: 0.5,
                            boxShadow: '0 6px 20px rgba(59,130,246,0.4)',
                          }}
                        >
                          {step.icon}
                        </Box>
                        <Typography
                          sx={{
                            textAlign: 'center',
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: '11px',
                            fontWeight: 700,
                          }}
                        >
                          STEP {step.id}
                        </Typography>
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mb: 1,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ color: '#fff', fontWeight: 700, fontSize: '16px' }}
                          >
                            {step.title}
                          </Typography>
                          <Box
                            sx={{
                              px: 1.5,
                              py: 0.4,
                              borderRadius: '20px',
                              background: 'rgba(59,130,246,0.2)',
                              border: '1px solid rgba(59,130,246,0.3)',
                              flexShrink: 0,
                              ml: 1,
                            }}
                          >
                            <Typography sx={{ color: '#93C5FD', fontSize: '11px', fontWeight: 600 }}>
                              {step.duration}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '13.5px', lineHeight: 1.65 }}
                        >
                          {step.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Total timeline callout */}
        <Box
          sx={{
            mt: 3,
            p: 3,
            borderRadius: 3,
            background: 'rgba(59,130,246,0.15)',
            border: '1px solid rgba(59,130,246,0.3)',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" sx={{ color: '#fff', fontWeight: 800, mb: 1 }}>
            ⏱ Typical Total Setup Time: 6–10 Weeks
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
            Depending on lab size, infrastructure readiness, and package selected.
            We work around your academic calendar to ensure zero disruption.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LabSetupProcess;
