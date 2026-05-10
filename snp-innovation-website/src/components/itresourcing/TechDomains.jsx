/* ========================================
   TECH DOMAINS — Technology domain coverage
   Section 4.3: Domains with technology chips
   ======================================== */

import { Box, Typography, Card, CardContent, Chip } from '@mui/material';
import SectionHeader from '../common/SectionHeader';

// Domain data defined outside return
const techDomains = [
  {
    id: 1,
    name: 'Software Development',
    emoji: '💻',
    description: 'Full-cycle web, mobile and backend engineering',
    technologies: ['Web Development', 'Mobile Apps', 'Full-Stack', 'Backend', 'REST APIs'],
  },
  {
    id: 2,
    name: 'AI & Data Science',
    emoji: '🤖',
    description: 'Intelligent systems and data-driven solutions',
    technologies: ['Machine Learning', 'Deep Learning', 'Data Analytics', 'Computer Vision', 'NLP'],
  },
  {
    id: 3,
    name: 'Embedded & Automation',
    emoji: '⚙️',
    description: 'Low-level systems and industrial control',
    technologies: ['C / C++', 'RTOS', 'PLC Programming', 'SCADA', 'Firmware'],
  },
  {
    id: 4,
    name: 'Cloud & DevOps',
    emoji: '☁️',
    description: 'Scalable infrastructure and deployment pipelines',
    technologies: ['AWS', 'Azure', 'GCP', 'CI/CD', 'Docker', 'Kubernetes'],
  },
  {
    id: 5,
    name: 'Cybersecurity',
    emoji: '🔒',
    description: 'Protecting systems and data from threats',
    technologies: ['Network Security', 'Penetration Testing', 'VAPT', 'SOC', 'Compliance'],
  },
  {
    id: 6,
    name: 'IoT Development',
    emoji: '📡',
    description: 'Connected device ecosystems end to end',
    technologies: ['Firmware', 'IoT Protocols', 'Edge Computing', 'IoT Platforms', 'MQTT'],
  },
  {
    id: 7,
    name: 'UI / UX Design',
    emoji: '🎨',
    description: 'User-centred design for digital products',
    technologies: ['Figma', 'Wireframing', 'Prototyping', 'Design Systems', 'Usability Testing'],
  },
  {
    id: 8,
    name: 'QA & Testing',
    emoji: '✅',
    description: 'Quality assurance across manual and automated testing',
    technologies: ['Manual Testing', 'Automation Testing', 'Selenium', 'API Testing', 'Performance QA'],
  },
];

const TechDomains = () => {
  return (
    <Box sx={{ py: { xs: 3, md: 5 }, backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <SectionHeader
          title="Technology Domains"
          subtitle="Deep expertise across every layer of the modern technology stack"
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mt: 4 }}>
          {techDomains.map((domain) => (
              <Card
                key={domain.id}
                sx={{
                  height: '100%',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid #E2E8F0',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: 'var(--shadow-lg)',
                    borderColor: 'var(--color-primary)',
                  },
                }}
              >
                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ fontSize: '2rem', mb: 1 }}>{domain.emoji}</Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: 'var(--color-primary)', mb: 0.5, fontSize: '1rem' }}
                  >
                    {domain.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'var(--color-text-secondary)', mb: 2, fontSize: '0.8rem', lineHeight: 1.5, flexGrow: 1 }}
                  >
                    {domain.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                    {domain.technologies.map((tech, idx) => (
                      <Chip
                        key={idx}
                        label={tech}
                        size="small"
                        variant="outlined"
                        sx={{
                          color: 'var(--color-primary)',
                          borderColor: 'var(--color-primary)',
                          fontSize: '0.68rem',
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
          ))}
        </Box>
      </div>
    </Box>
  );
};

export default TechDomains;
