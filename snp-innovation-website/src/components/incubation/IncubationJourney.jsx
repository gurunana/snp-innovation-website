/* ========================================
   INCUBATION JOURNEY - 7-phase visual roadmap
   Shows the progression through the SNP incubation program
   ======================================== */

import { Box, Typography, Card, CardContent } from '@mui/material';
import SectionHeader from '../common/SectionHeader';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAddOutlined';
import LightbulbIcon from '@mui/icons-material/LightbulbOutlined';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructionsOutlined';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenterOutlined';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunchOutlined';
import EmojiEventsIcon from '@mui/icons-material/EmojiEventsOutlined';

const IncubationJourney = () => {
  // Journey phases - defined outside return
  const phases = [
    {
      number: '01',
      title: 'Application & Selection',
      description:
        'Submit your startup application. Our team evaluates ideas based on innovation potential, market fit, and founder commitment.',
      icon: AssignmentTurnedInIcon,
      color: '#2D5BE3',
    },
    {
      number: '02',
      title: 'Onboarding',
      description:
        'Selected startups are formally onboarded into the incubation ecosystem — meet your mentors, set goals, and access resources.',
      icon: PersonAddIcon,
      color: '#8B5CF6',
    },
    {
      number: '03',
      title: 'Ideation & Validation',
      description:
        'Conduct deep market research, test assumptions, validate problem-solution fit, and refine your core value proposition.',
      icon: LightbulbIcon,
      color: '#F59E0B',
    },
    {
      number: '04',
      title: 'MVP Development',
      description:
        'Build your minimum viable product using SNP R&D labs, dev teams, and rapid prototyping facilities with expert support.',
      icon: IntegrationInstructionsIcon,
      color: '#10B981',
    },
    {
      number: '05',
      title: 'Business Building',
      description:
        'Design business model, revenue strategy, financial projections, IP filing, legal entity setup, and go-to-market plan.',
      icon: BusinessCenterIcon,
      color: '#EF4444',
    },
    {
      number: '06',
      title: 'Scaling',
      description:
        'Access investor connections, industry partnerships, and enterprise clients to accelerate growth beyond initial markets.',
      icon: RocketLaunchIcon,
      color: '#06B6D4',
    },
    {
      number: '07',
      title: 'Graduation',
      description:
        'Successfully graduate as an independent venture with a market-ready product, revenue base, and investor backing.',
      icon: EmojiEventsIcon,
      color: '#FF9500',
    },
  ];

  return (
    <Box className="py-16 px-4">
      <div className="container">
        <SectionHeader
          title="The Incubation Journey"
          subtitle="A structured 7-phase roadmap from raw idea to a market-ready, funded startup"
        />

        {/* Timeline connector line (desktop) */}
        <Box
          sx={{
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '60px',
              left: '8%',
              right: '8%',
              height: '2px',
              background: 'linear-gradient(90deg, #2D5BE3, #FF9500)',
              zIndex: 0,
              display: { xs: 'none', md: 'block' },
            },
          }}
        >
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {phases.map((phase) => (
                <Card
                  key={phase.number}
                  sx={{
                    height: '100%',
                    width: '100%',
                    textAlign: 'center',
                    border: '1px solid #E2E8F0',
                    position: 'relative',
                    zIndex: 1,
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: `0 20px 40px ${phase.color}22`,
                      borderColor: phase.color,
                    },
                  }}
                >
                  <CardContent sx={{ padding: '28px 20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Phase Number */}
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${phase.color} 0%, ${phase.color}CC 100%)`,
                        color: 'white',
                        fontWeight: 800,
                        fontSize: '16px',
                        marginBottom: 2,
                        boxShadow: `0 4px 15px ${phase.color}44`,
                      }}
                    >
                      {phase.number}
                    </Box>

                    {/* Icon */}
                    <Box sx={{ marginBottom: 1.5 }}>
                      <phase.icon sx={{ fontSize: 36, color: phase.color }} />
                    </Box>

                    {/* Title */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        marginBottom: 1.5,
                        fontSize: '16px',
                        color: '#1F2937',
                      }}
                    >
                      {phase.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      sx={{ color: '#6B7280', lineHeight: 1.6, fontSize: '13px', flexGrow: 1 }}
                    >
                      {phase.description}
                    </Typography>
                  </CardContent>
                </Card>
            ))}
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default IncubationJourney;
