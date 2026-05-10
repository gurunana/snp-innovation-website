/* ========================================
   CAREERS PAGE — Page 9
   Banner + Why Work Here + Job Listings + Internship Program + IT Candidate Registration.
   All data hardcoded — never blocks on API failure.
   ======================================== */

import { Box } from '@mui/material';
import WhyWorkHere from '../components/careers/WhyWorkHere';
import JobListings from '../components/careers/JobListings';
import InternshipProgram from '../components/careers/InternshipProgram';
import CandidateRegistration from '../components/careers/CandidateRegistration';
import CareersBanner from '../components/careers/CareersBanner';

const CareersPage = () => (
  <Box component="main">
    {/* Banner */}
    <CareersBanner />

    {/* Why Work Here */}
    <WhyWorkHere />

    {/* Current Job Openings */}
    <JobListings />

    {/* Internship Program */}
    <InternshipProgram />

    {/* IT Candidate Registration */}
    <CandidateRegistration />
  </Box>
);

export default CareersPage;
