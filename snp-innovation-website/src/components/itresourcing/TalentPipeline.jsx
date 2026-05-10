/* ========================================
   TALENT PIPELINE — 5-step sourcing to monitoring flow
   Section 4.6: Source → Screening → Training → Deployment → Monitoring
   ======================================== */

import { Box, Typography, Card, CardContent } from '@mui/material';
import SectionHeader from '../common/SectionHeader';
import SearchIcon from '@mui/icons-material/Search';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import SchoolIcon from '@mui/icons-material/School';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

// Pipeline step data defined outside return
const pipelineSteps = [
  {
    id: 1,
    label: 'Source',
    icon: SearchIcon,
    color: '#2D5BE3',
    description:
      'Proactively source talent from engineering colleges, coding communities, professional networks, and internal referrals across India.',
  },
  {
    id: 2,
    label: 'Screening',
    icon: AssignmentTurnedInIcon,
    color: '#8B5CF6',
    description:
      'Multi-stage screening including resume review, aptitude tests, and domain-specific technical assessments to shortlist top candidates.',
  },
  {
    id: 3,
    label: 'Training',
    icon: SchoolIcon,
    color: '#10B981',
    description:
      'Shortlisted candidates undergo project-based training on real industry scenarios — ensuring job readiness from day one.',
  },
  {
    id: 4,
    label: 'Deployment',
    icon: RocketLaunchIcon,
    color: '#F59E0B',
    description:
      'Matched to client requirements and deployed with complete onboarding support — integrating smoothly with existing teams and workflows.',
  },
  {
    id: 5,
    label: 'Monitoring',
    icon: MonitorHeartIcon,
    color: '#EF4444',
    description:
      'Continuous performance monitoring, client feedback loops, and a replacement guarantee to maintain quality throughout the engagement.',
  },
];

const TalentPipeline = () => {
  return (
    <Box sx={{ py: { xs: 3, md: 5 }, backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <SectionHeader
          title="Our Talent Pipeline"
          subtitle="A five-step process that ensures every professional we place is verified, trained, and ready to deliver"
        />

        {/* Step cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3, mt: 4 }}>
          {pipelineSteps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
                <Card
                  key={step.id}
                  sx={{
                    height: '100%',
                    border: '1px solid #E2E8F0',
                    boxShadow: 'var(--shadow-md)',
                    borderTop: `4px solid ${step.color}`,
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'translateY(-6px)', boxShadow: 'var(--shadow-lg)' },
                  }}
                >
                  <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      {/* Step number badge */}
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          backgroundColor: step.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '0.9rem',
                          flexShrink: 0,
                        }}
                      >
                        {idx + 1}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconComponent sx={{ fontSize: 22, color: step.color }} />
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1F2937', fontSize: '1rem' }}>
                          {step.label}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.65, flexGrow: 1 }}>
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
            );
          })}
        </Box>

        {/* Flow connector visual */}
        <Box
          sx={{
            mt: 6,
            p: 3,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid #E2E8F0',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: 1.5, md: 0.5 },
            }}
          >
            {pipelineSteps.map((step, idx) => (
              <Box
                key={step.id}
                sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 0.5 } }}
              >
                <Box
                  sx={{
                    px: 2.5,
                    py: 1,
                    borderRadius: 20,
                    backgroundColor: step.color,
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {step.label}
                </Box>
                {idx < pipelineSteps.length - 1 && (
                  <Typography sx={{ color: '#9CA3AF', fontSize: '1.2rem', display: { xs: 'none', md: 'block' } }}>
                    →
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default TalentPipeline;
