/* ========================================
   SERVICES OVERVIEW — IT Manpower & Engagement Models
   Section 4.3: IT Manpower Supply services
   ======================================== */

import { Box, Typography, Card, CardContent, Chip } from '@mui/material';
import SectionHeader from '../common/SectionHeader';
import PeopleIcon from '@mui/icons-material/People';
import CodeIcon from '@mui/icons-material/Code';
import HandshakeIcon from '@mui/icons-material/Handshake';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

// Service data defined outside return — no logic inside JSX
const services = [
  {
    id: 1,
    title: 'Short & Long-Term Staffing',
    description:
      'Place skilled IT professionals for engagements ranging from a few weeks to multi-year contracts, scaling up or down as your project demands change.',
    icon: PeopleIcon,
    tags: ['Flexible Duration', 'Quick Deployment', 'Managed Compliance'],
  },
  {
    id: 2,
    title: 'Dedicated Developer Deployment',
    description:
      'Get a dedicated engineer or a pod of developers fully focused on your product — they work as an extension of your in-house team.',
    icon: CodeIcon,
    tags: ['Full-Time Focus', 'Direct Reporting', 'Domain Specialists'],
  },
  {
    id: 3,
    title: 'Contract-to-Hire',
    description:
      'Evaluate talent on real project work before a permanent hire decision. Reduce risk while finding your long-term team members.',
    icon: HandshakeIcon,
    tags: ['Risk-Free Evaluation', 'Seamless Transition', 'Performance Tracked'],
  },
  {
    id: 4,
    title: 'Team Augmentation',
    description:
      'Plug skill gaps in existing teams by adding pre-vetted professionals who ramp up quickly and integrate with your workflows and tools.',
    icon: GroupAddIcon,
    tags: ['Fast Onboarding', 'Skill Gap Fill', 'Tool-Compatible'],
  },
];

const ServicesOverview = () => {
  return (
    <Box sx={{ py: { xs: 3, md: 5 }, backgroundColor: '#ffffff' }}>
      <div className="container">
        <SectionHeader
          title="IT Manpower Supply"
          subtitle="Flexible staffing models designed around your project realities and team structure"
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3, mt: 4 }}>
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
                <Card
                  key={service.id}
                  sx={{
                    height: '100%',
                    width: '100%',
                    boxShadow: 'var(--shadow-md)',
                    border: '1px solid #E2E8F0',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: 'var(--shadow-lg)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #2D5BE3 0%, #2563EB 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <IconComponent sx={{ fontSize: 28, color: 'white' }} />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#1F2937' }}>
                        {service.title}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, mb: 3, flexGrow: 1 }}
                    >
                      {service.description}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {service.tags.map((tag, idx) => (
                        <Chip
                          key={idx}
                          label={tag}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(59,130,246,0.08)',
                            color: '#2563EB',
                            fontWeight: 500,
                            fontSize: '0.72rem',
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
            );
          })}
        </Box>
      </div>
    </Box>
  );
};

export default ServicesOverview;
