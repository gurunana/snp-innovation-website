/* ========================================
   CAREERS PAGE — Page 9
   Banner + Why Work Here + Job Listings + Internship Program + IT Candidate Registration.
   All data hardcoded — never blocks on API failure.
   ======================================== */

import { Box } from '@mui/material';
import WhyWorkHere from '../components/careers/WhyWorkHere';
import JobListings from '../components/careers/JobListings';
import CareerApplications from '../components/careers/CareerApplications';
import CareersBanner from '../components/careers/CareersBanner';

const CareersPage = () => (
  <Box component="main">
    {/* Banner */}
    <CareersBanner />

    {/* Why Work Here */}
    <WhyWorkHere />

    {/* Current Job Openings */}
    <JobListings />

    {/* Tabbed Applications — Internship + IT Candidate Registration */}
    <CareerApplications />
  </Box>
);

export default CareersPage;
