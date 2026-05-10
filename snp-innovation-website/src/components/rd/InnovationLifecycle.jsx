/* ========================================
   INNOVATION LIFECYCLE — 8-step journey
   Section 5.4: Idea → Concept → Prototype → Validation →
                Automation → Certification → IP Filing → Market Launch
   ======================================== */

import { Box, Typography, Card, CardContent } from '@mui/material';
// Grid removed — using CSS Grid via Box for reliable column layout
import SectionHeader from '../common/SectionHeader';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import PaletteIcon from '@mui/icons-material/Palette';
import BuildIcon from '@mui/icons-material/Build';
import ScienceIcon from '@mui/icons-material/Science';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import VerifiedIcon from '@mui/icons-material/Verified';
import GavelIcon from '@mui/icons-material/Gavel';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

// Steps defined outside return — all data above JSX
const lifecycleSteps = [
  {
    id: 1,
    number: '01',
    title: 'Idea & Research',
    description: 'Validate the concept, conduct prior art and market research, and establish technical feasibility.',
    icon: EmojiObjectsIcon,
    color: '#2D5BE3',
  },
  {
    id: 2,
    number: '02',
    title: 'Concept Design',
    description: 'Translate validated ideas into detailed design specifications, system architecture, and CAD models.',
    icon: PaletteIcon,
    color: '#8B5CF6',
  },
  {
    id: 3,
    number: '03',
    title: 'Prototype Development',
    description: 'Build functional hardware/software prototypes to demonstrate core capabilities and gather early feedback.',
    icon: BuildIcon,
    color: '#10B981',
  },
  {
    id: 4,
    number: '04',
    title: 'Validation & Testing',
    description: 'Rigorous functional, performance, safety, and environmental testing to meet project acceptance criteria.',
    icon: ScienceIcon,
    color: '#F59E0B',
  },
  {
    id: 5,
    number: '05',
    title: 'Automation Integration',
    description: 'Integrate automation, control systems, and IoT connectivity to make the product production-ready.',
    icon: PrecisionManufacturingIcon,
    color: '#EF4444',
  },
  {
    id: 6,
    number: '06',
    title: 'Certification Support',
    description: 'Prepare documentation and guide you through national and international compliance and certification processes.',
    icon: VerifiedIcon,
    color: '#06B6D4',
  },
  {
    id: 7,
    number: '07',
    title: 'IP Filing',
    description: 'File provisional and complete patents, register designs, and secure intellectual property protection.',
    icon: GavelIcon,
    color: '#D97706',
  },
  {
    id: 8,
    number: '08',
    title: 'Market Launch',
    description: 'Support for manufacturing partnerships, launch strategy, licensing, and post-launch improvements.',
    icon: RocketLaunchIcon,
    color: '#16A34A',
  },
];

const InnovationLifecycle = () => {
  return (
    <Box sx={{ py: { xs: 3, md: 5 }, backgroundColor: '#ffffff' }}>
      <div className="container">
        <SectionHeader
          title="Innovation Lifecycle"
          subtitle="Our structured 8-step process ensures no stage is skipped and every milestone is reached"
        />

        {/* CSS Grid: 4 cols on md+, 2 cols on sm, 1 on xs — all cards same height per row */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 2.5,
            mt: 4,
          }}
        >
          {lifecycleSteps.map((step) => {
            const IconComponent = step.icon;
            return (
              <Card
                key={step.id}
                sx={{
                  textAlign: 'center',
                  minWidth: { xs: '220px', md: 'auto' },
                  flexShrink: 0,
                  border: '1px solid #E2E8F0',
                  borderTop: `4px solid ${step.color}`,
                  boxShadow: 'var(--shadow-md)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { transform: 'translateY(-6px)', boxShadow: 'var(--shadow-lg)' },
                }}
              >
                <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column' }}>
                  {/* Step number */}
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 800, color: step.color, mb: 0.5, fontSize: '1.75rem', lineHeight: 1 }}
                  >
                    {step.number}
                  </Typography>

                  {/* Icon */}
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      backgroundColor: `${step.color}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 1.5,
                    }}
                  >
                    <IconComponent sx={{ fontSize: 22, color: step.color }} />
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1F2937', mb: 0.75, fontSize: '0.9rem' }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.55, fontSize: '0.78rem', flexGrow: 1 }}>
                    {step.description}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        {/* Flow indicator */}
        <Box
          sx={{
            mt: 5,
            p: 2.5,
            backgroundColor: '#F0F9FF',
            borderRadius: 2,
            border: '1px solid #BAE6FD',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: '#0369A1', fontWeight: 500 }}>
            Every project may enter the lifecycle at any stage — from a raw idea to an existing prototype requiring
            certification or launch support.
          </Typography>
        </Box>
      </div>
    </Box>
  );
};

export default InnovationLifecycle;
