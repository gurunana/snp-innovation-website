/* ========================================
   WORKSHOPS PAGE - SNP Innovation Workshops & Events
   Learn, Build, Innovate — hands-on learning experiences
   ======================================== */

import { Box } from '@mui/material';
import PageBanner from '../components/common/PageBanner';
import WorkshopCategories from '../components/workshops/WorkshopCategories';
import UpcomingEvents from '../components/workshops/UpcomingEvents';
// import PastEvents from '../components/workshops/PastEvents'; // HIDDEN per user request
import HostWorkshop from '../components/workshops/HostWorkshop';

const WorkshopsPage = () => {
  return (
    <Box>
      {/* Page Banner */}
      <PageBanner
        title="LEARN. BUILD. INNOVATE. — SNP INNOVATION WORKSHOPS & EVENTS"
        subtitle="Hands-on learning experiences that inspire, educate, and ignite the innovator within every participant."
        bgImage="/images/gallery/headers/WorkshopHeader.png"
      />

      {/* Workshop Categories with tabs */}
      <WorkshopCategories />

      {/* Upcoming Events */}
      <UpcomingEvents />

      {/* Past Events Photo Grid with Stats — HIDDEN per user request */}
      {/* <PastEvents /> */}

      {/* Host a Workshop Form */}
      <HostWorkshop />
    </Box>
  );
};

export default WorkshopsPage;
