/* ========================================
   LEARNING METHODOLOGY - 6 methodology items
   Project-Based, Problem-Based, Design Thinking,
   Transdisciplinary, Maker Culture, Collaborative Innovation
   PDF Section 3.5
   ======================================== */

import { Box, Typography, Container } from '@mui/material';
import { Grid } from '@mui/material';
import SectionHeader from '../common/SectionHeader';

// All data defined outside return — no logic in JSX
const methodologies = [
  {
    id: 1,
    emoji: '🔨',
    title: 'Project-Based Learning',
    description:
      'Students tackle multi-week real-world projects — from designing a smart irrigation system to building an autonomous robot. Learning happens by doing.',
    color: '#2D5BE3',
    gradient: 'linear-gradient(135deg, #2D5BE3, #2563EB)',
    bg: '#EFF6FF',
  },
  {
    id: 2,
    emoji: '🧩',
    title: 'Problem-Based Learning',
    description:
      'Complex, authentic problems drive the curriculum. Students research, experiment, and iterate to find solutions — developing critical thinking along the way.',
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
    bg: '#F5F3FF',
  },
  {
    id: 3,
    emoji: '✏️',
    title: 'Design Thinking',
    description:
      'Empathise → Define → Ideate → Prototype → Test. Students use the full design thinking cycle to build human-centred solutions to community problems.',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
    bg: '#FFFBEB',
  },
  {
    id: 4,
    emoji: '🌐',
    title: 'Transdisciplinary Learning',
    description:
      'STEM skills meet art, humanities, and social science. Students connect electronics to healthcare, coding to music, and IoT to environmental science.',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981, #059669)',
    bg: '#ECFDF5',
  },
  {
    id: 5,
    emoji: '🛠️',
    title: 'Maker Culture',
    description:
      'Every student is a maker. Labs are equipped with tools, kits, and an open maker space spirit that celebrates tinkering, iteration, and fearless creativity.',
    color: '#EF4444',
    gradient: 'linear-gradient(135deg, #EF4444, #DC2626)',
    bg: '#FEF2F2',
  },
  {
    id: 6,
    emoji: '🤝',
    title: 'Collaborative Innovation',
    description:
      'Team-based challenges, inter-school hackathons, and peer mentoring foster communication, leadership, and the spirit of innovation working together.',
    color: '#06B6D4',
    gradient: 'linear-gradient(135deg, #06B6D4, #0891B2)',
    bg: '#ECFEFF',
  },
];

const LearningMethodology = () => {
  return (
    <Box sx={{ py: { xs: 3, md: 5 }, backgroundColor: '#fff' }}>
      <Container maxWidth="xl">
        <SectionHeader
          title="Learning Methodology"
          subtitle="Six powerful pedagogical approaches that transform passive learners into active innovators"
        />

        {/* Methodology image banner */}
        <Box
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            mb: 4,
            position: 'relative',
            height: 130,
            mt: 3,
          }}
        >
          <Box
            component="img"
            src="https://picsum.photos/seed/methodology-banner/1200/400"
            alt="Learning Methodology"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)' }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,58,138,0.75) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: '15px', md: '20px' }, textAlign: 'center', letterSpacing: '-0.3px' }}
            >
              "Tell me and I forget. Show me and I remember.
            </Typography>
            <Typography
              variant="h4"
              sx={{ color: '#F59E0B', fontWeight: 800, fontSize: { xs: '15px', md: '20px' }, textAlign: 'center', letterSpacing: '-0.3px' }}
            >
              Involve me and I understand."
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', mt: 0.5 }}>
              — Benjamin Franklin
            </Typography>
          </Box>
        </Box>

        {/* 6 methodology cards */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: 2 }}>
          {methodologies.map((method, idx) => (
                          <Box
                key={method.id}
                sx={{
                  position: 'relative',
                  p: 2.5,
                  borderRadius: 3,
                  backgroundColor: method.bg,
                  border: `1px solid ${method.color}22`,
                  height: '100%',
                  transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: `0 16px 40px ${method.color}30`,
                    borderColor: method.color,
                  },
                  '&:hover .method-num': {
                    opacity: 0.15,
                  },
                }}
              >
                {/* Large background number */}
                <Typography
                  className="method-num"
                  sx={{
                    position: 'absolute',
                    top: -10,
                    right: 10,
                    fontSize: '100px',
                    fontWeight: 900,
                    color: method.color,
                    opacity: 0.06,
                    lineHeight: 1,
                    transition: 'opacity 0.3s ease',
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                >
                  {idx + 1}
                </Typography>

                {/* Emoji icon */}
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    background: method.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    mb: 1.5,
                    boxShadow: `0 6px 16px ${method.color}35`,
                  }}
                >
                  {method.emoji}
                </Box>

                {/* Step badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: method.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography sx={{ color: '#fff', fontSize: '12px', fontWeight: 700 }}>
                    {idx + 1}
                  </Typography>
                </Box>

                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: '#1F2937', fontSize: '14px', mb: 1 }}
                >
                  {method.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#6B7280', fontSize: '13.5px', lineHeight: 1.7 }}
                >
                  {method.description}
                </Typography>
              </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default LearningMethodology;
