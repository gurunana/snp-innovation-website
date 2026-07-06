/* ========================================
   JOB LISTINGS - Dynamic from Supabase
   Falls back to 3 hardcoded jobs if Supabase not configured
   ======================================== */

import { useEffect, useState } from 'react';
import { Box, Container, Card, CardContent, Typography, Chip, Button, Skeleton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import { fetchJobOpenings } from '../../lib/supabase';

const FALLBACK_JOBS = [
  {
    id: 1,
    title: 'STEM Lab Coordinator',
    department: 'EdTech',
    location: 'Pune',
    type: 'Full-time',
    description: 'Lead the setup and daily operations of STEM labs in partner schools. Coordinate with educators to deliver engaging science, technology, engineering, and math programs. Provide training, monitor lab usage, and ensure kit maintenance.',
    dept_color: '#EFF6FF',
    dept_text_color: '#1A3A8F',
    accent_gradient: 'linear-gradient(135deg,#1A3A8F,#2D5BE3)',
  },
  {
    id: 2,
    title: 'Full-Stack Developer',
    department: 'IT Resourcing',
    location: 'Remote',
    type: 'Full-time',
    description: 'Design, build, and maintain scalable web applications for internal platforms and client projects. Work with React, Node.js, and cloud infrastructure. Collaborate with product, design, and QA teams in an agile environment.',
    dept_color: '#F0FDF4',
    dept_text_color: '#15803D',
    accent_gradient: 'linear-gradient(135deg,#15803D,#22C55E)',
  },
  {
    id: 3,
    title: 'R&D Engineer (Embedded Systems)',
    department: 'R&D',
    location: 'Pune',
    type: 'Full-time',
    description: 'Develop and prototype embedded systems, IoT devices, and automation hardware for R&D projects. Work across the full hardware-software stack from circuit design and firmware to testing and documentation.',
    dept_color: '#FFF7ED',
    dept_text_color: '#C2410C',
    accent_gradient: 'linear-gradient(135deg,#C2410C,#CC2020)',
  },
];

const JobCard = ({ job }) => (
  <Card sx={{
    height: '100%', display: 'flex', flexDirection: 'column',
    borderRadius: '18px', border: '1px solid #E2E8F0', boxShadow: 'none',
    overflow: 'hidden', position: 'relative', transition: 'all 0.35s ease',
    '&::before': {
      content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
      background: job.accent_gradient || 'linear-gradient(135deg,#1A3A8F,#2D5BE3)',
    },
    '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 24px 60px rgba(0,0,0,0.1)', borderColor: 'transparent' },
  }}>
    <CardContent sx={{ p: { xs: 3, md: 3.5 }, flexGrow: 1 }}>
      <Chip label={job.department} size="small" sx={{
        bgcolor: job.dept_color || '#EFF6FF', color: job.dept_text_color || '#1A3A8F',
        fontWeight: 700, fontSize: '11px', borderRadius: '6px', mb: 2,
      }} />
      <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '18px', color: '#0F172A', mb: 2, lineHeight: 1.3 }}>
        {job.title}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <LocationOnIcon sx={{ fontSize: 16, color: '#64748B' }} />
          <Typography sx={{ fontSize: '13px', color: '#64748B' }}>{job.location}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <WorkIcon sx={{ fontSize: 16, color: '#64748B' }} />
          <Typography sx={{ fontSize: '13px', color: '#64748B' }}>{job.type}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <BusinessIcon sx={{ fontSize: 16, color: '#64748B' }} />
          <Typography sx={{ fontSize: '13px', color: '#64748B' }}>{job.department}</Typography>
        </Box>
      </Box>
      <Typography sx={{ color: '#475569', fontSize: '14px', lineHeight: 1.75 }}>
        {job.description}
      </Typography>
    </CardContent>
    <Box sx={{ px: 3.5, pb: 3.5 }}>
      <Button fullWidth variant="contained" sx={{
        background: job.accent_gradient || 'linear-gradient(135deg,#1A3A8F,#2D5BE3)',
        borderRadius: '10px', fontWeight: 700, fontSize: '14px', py: 1.3,
        textTransform: 'none', boxShadow: 'none',
        '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.15)', opacity: 0.92 },
      }}>
        Apply Now
      </Button>
    </Box>
  </Card>
);

const JobListings = () => {
  const [jobs, setJobs]       = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobOpenings()
      .then(data => setJobs(data.length > 0 ? data : FALLBACK_JOBS))
      .catch(() => setJobs(FALLBACK_JOBS))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ py: { xs: 4, md: 7 }, background: 'white' }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 5 } }}>
          <Typography sx={{ color: '#CC2020', fontWeight: 700, letterSpacing: '2px', fontSize: '12px', mb: 1 }}>
            JOIN OUR TEAM
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '28px', md: '38px' }, color: '#0F172A', mb: 2 }}>
            Current Openings
          </Typography>
          <Typography sx={{ color: '#64748B', maxWidth: 520, mx: 'auto', fontSize: '16px' }}>
            Explore opportunities to work on cutting-edge projects that shape India's innovation landscape.
          </Typography>
          <Box sx={{ width: 56, height: 4, background: 'linear-gradient(90deg,#1A3A8F,#CC2020)', borderRadius: 2, mx: 'auto', mt: 3 }} />
        </Box>

        {loading && (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' }, gap: 4 }}>
            {[1, 2, 3].map(i => (
              <Skeleton key={i} variant="rectangular" height={320} sx={{ borderRadius: '18px' }} />
            ))}
          </Box>
        )}

        {!loading && jobs.length > 0 && (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' }, gap: 4 }}>
            {jobs.map(job => <JobCard key={job.id} job={job} />)}
          </Box>
        )}

        {!loading && jobs.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography sx={{ color: '#94A3B8', fontSize: '16px' }}>
              No openings at the moment. Check back soon!
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default JobListings;
