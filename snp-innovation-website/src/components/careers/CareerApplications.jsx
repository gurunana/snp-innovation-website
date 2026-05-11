/* ========================================
   CAREER APPLICATIONS — tabbed wrapper that shows
   either the Internship Application or the IT Candidate
   Registration form in the same section.
   ======================================== */

import { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import InternshipProgram from './InternshipProgram';
import CandidateRegistration from './CandidateRegistration';

const CareerApplications = () => {
  const [active, setActive] = useState(0);

  return (
    <Box>
      {/* Tab switcher */}
      <Box
        sx={{
          background: 'linear-gradient(135deg,#F8FAFC,#EFF6FF)',
          borderBottom: '1px solid #E2E8F0',
          pt: { xs: 4, md: 6 },
          pb: 0,
        }}
      >
        <Container maxWidth="xl">
          {/* Section header */}
          <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
            <Typography sx={{ color: '#CC2020', fontWeight: 700, letterSpacing: '2px', fontSize: '12px', mb: 1 }}>
              APPLY NOW
            </Typography>
            <Typography
              variant="h2"
              sx={{ fontWeight: 800, fontSize: { xs: '28px', md: '38px' }, color: '#0F172A', mb: 2 }}
            >
              Join SNP Innovation
            </Typography>
            <Typography sx={{ color: '#64748B', maxWidth: 600, mx: 'auto', fontSize: '16px' }}>
              Whether you are a student looking for an internship or an experienced IT professional, we have a path for you.
            </Typography>
            <Box
              sx={{ width: 56, height: 4, background: 'linear-gradient(90deg,#1A3A8F,#CC2020)', borderRadius: 2, mx: 'auto', mt: 3 }}
            />
          </Box>

          {/* Pill tabs */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Tabs
              value={active}
              onChange={(_, v) => setActive(v)}
              sx={{
                minHeight: 'auto',
                '& .MuiTabs-flexContainer': {
                  gap: 1.5,
                  background: 'white',
                  p: 0.75,
                  borderRadius: '50px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                },
                '& .MuiTabs-indicator': { display: 'none' },
                '& .MuiTab-root': {
                  minHeight: 'auto',
                  py: 1.25,
                  px: { xs: 2, md: 3.5 },
                  fontSize: { xs: '13px', md: '14px' },
                  fontWeight: 700,
                  textTransform: 'none',
                  borderRadius: '50px',
                  color: '#64748B',
                  transition: 'all 0.25s ease',
                  '&:hover': { color: '#1A3A8F' },
                },
                '& .Mui-selected': {
                  background: 'linear-gradient(135deg,#1A3A8F,#CC2020)',
                  color: 'white !important',
                  boxShadow: '0 6px 18px rgba(30,64,175,0.25)',
                },
              }}
            >
              <Tab icon={<SchoolIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Student Internship" />
              <Tab icon={<WorkIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="IT Professional" />
            </Tabs>
          </Box>
        </Container>
      </Box>

      {/* Active form */}
      <Box>
        {active === 0 ? <InternshipProgram embedded /> : <CandidateRegistration embedded />}
      </Box>
    </Box>
  );
};

export default CareerApplications;
