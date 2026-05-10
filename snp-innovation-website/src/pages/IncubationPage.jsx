/* ========================================
   INCUBATION PAGE - SNP Innovation Incubation Center
   From idea to market — full-stack startup support
   ======================================== */

import { Box } from '@mui/material';
import PageBanner from '../components/common/PageBanner';
import WhyIncubate from '../components/incubation/WhyIncubate';
import SupportPillars from '../components/incubation/SupportPillars';
import IncubationJourney from '../components/incubation/IncubationJourney';
import EligibilitySection from '../components/incubation/EligibilitySection';
import SuccessStories from '../components/incubation/SuccessStories';
import IncubationForm from '../components/incubation/IncubationForm';

const IncubationPage = () => {
  return (
    <Box>
      {/* Page Banner */}
      <PageBanner
        title="FROM YOUR IDEA TO THE MARKET — WE BUILD IT WITH YOU"
        subtitle="SNP Innovation Incubation Center supports early-stage technology startups with everything they need to go from ideation to commercialization."
      />

      {/* Why Incubate with SNP Innovation */}
      <WhyIncubate />

      {/* Support Pillars */}
      <SupportPillars />

      {/* Incubation Journey */}
      <IncubationJourney />

      {/* Eligibility Section */}
      <EligibilitySection />

      {/* Success Stories */}
      <SuccessStories />

      {/* Incubation Application Form */}
      <IncubationForm />
    </Box>
  );
};

export default IncubationPage;
