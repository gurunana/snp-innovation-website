/* ========================================
   R&D PAGE — Research, Development & Automation
   Sections: banner, why R&D, services, lifecycle,
             IP support, sectors, enquiry form
   ======================================== */

import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRdData } from '../store/slices/rdSlice';

import PageBanner from '../components/common/PageBanner';
import ScrollToTop from '../components/common/ScrollToTop';
import WhyRDSection from '../components/rd/WhyRDSection';
import RDServices from '../components/rd/RDServices';
import InnovationLifecycle from '../components/rd/InnovationLifecycle';
import IPSupport from '../components/rd/IPSupport';
import SectorsGrid from '../components/rd/SectorsGrid';
import RDEnquiryForm from '../components/rd/RDEnquiryForm';

const RDPage = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.rd);

  // Attempt to fetch remote data — rendering never blocked on failure
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRdData());
    }
  }, [status, dispatch]);

  return (
    <Box>
      <ScrollToTop />

      {/* 5.1 Banner */}
      <PageBanner
        title="FROM CONCEPT TO COMMERCIALIZATION — END-TO-END INNOVATION SUPPORT"
        subtitle="SNP Innovation holds 'Innovation' in its name for a reason. Our R&D vertical delivers complete, production-grade solutions."
        bgImage="/images/gallery/headers/RnDHeader.png"
      />

      {/* 5.2 Why R&D with SNP */}
      <WhyRDSection />

      {/* 5.3 Services */}
      <RDServices />

      {/* 5.4 Innovation Lifecycle */}
      <InnovationLifecycle />

      {/* 5.5 IP & Certification Support */}
      <IPSupport />

      {/* 5.6 Sectors */}
      <SectorsGrid />

      {/* 5.7 R&D Enquiry Form */}
      <RDEnquiryForm />
    </Box>
  );
};

export default RDPage;
