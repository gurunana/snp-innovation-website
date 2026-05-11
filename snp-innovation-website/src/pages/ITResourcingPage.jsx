/* ========================================
   IT RESOURCING PAGE - Main IT staffing page
   Sections: banner, overview, services, domains, why hire,
             client segments, talent pipeline, enquiry forms
   ======================================== */

import { useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItResourcingData } from '../store/slices/itResourcingSlice';

// Import components
import PageBanner from '../components/common/PageBanner';
import SectionHeader from '../components/common/SectionHeader';
import ScrollToTop from '../components/common/ScrollToTop';
import ServicesOverview from '../components/itresourcing/ServicesOverview';
import TechDomains from '../components/itresourcing/TechDomains';
import WhyHireSection from '../components/itresourcing/WhyHireSection';
import TalentPipeline from '../components/itresourcing/TalentPipeline';
import ITEnquiryForm from '../components/itresourcing/ITEnquiryForm';

// Client segments data — defined outside return
const clientSegments = [
  {
    id: 1,
    icon: '🚀',
    name: 'Tech Startups',
    description:
      'Flexible, scalable teams to build your MVP or accelerate product development from day one.',
  },
  {
    id: 2,
    icon: '🏢',
    name: 'Mid-size IT Enterprises',
    description:
      'Staff augmentation and dedicated team models for ongoing product and platform needs.',
  },
  {
    id: 3,
    icon: '🏭',
    name: 'Manufacturing & Industrial',
    description:
      'Embedded, automation, and IoT specialists for smart factory and Industry 4.0 initiatives.',
  },
  {
    id: 4,
    icon: '🏪',
    name: 'MSMEs',
    description:
      'Cost-effective IT talent solutions that match the scale and budget of growing businesses.',
  },
  {
    id: 5,
    icon: '🏛️',
    name: 'Government Bodies / PSUs',
    description:
      'Compliant, project-ready professionals for e-governance and digital transformation projects.',
  },
  {
    id: 6,
    icon: '🌐',
    name: 'International Companies',
    description:
      'Offshore development talent with strong communication skills and time-zone flexibility.',
  },
];

const ITResourcingPage = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.itResourcing);

  // Attempt to fetch remote data — rendering never blocked on failure
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchItResourcingData());
    }
  }, [status, dispatch]);

  return (
    <Box>
      <ScrollToTop />

      {/* 4.1 Banner */}
      <PageBanner
        title="SKILLED TECH TALENT. DEPLOYED ON DEMAND. BUILT FOR REAL PROJECTS."
        subtitle="Bridging the gap between talent and opportunity — SNP Innovation connects skilled IT professionals with organizations that are building the future."
        bgImage="/images/gallery/headers/ITHeader.png"
      />

      {/* 4.2 Overview */}
      <Box sx={{ py: { xs: 3, md: 5 }, backgroundColor: '#ffffff' }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 4, md: 6 },
              alignItems: 'center',
            }}
          >
            {/* LEFT: Text + checklist */}
            <Box>
              <SectionHeader
                title="Project-Ready IT Professionals"
                subtitle="We don't just supply resumes — we deploy verified, project-ready IT professionals who integrate seamlessly with your team and deliver from Day 1."
              />
              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[
                  'Verified technical & soft skill assessment',
                  'Trained on real industry projects',
                  'Compliant: PF, ESI, contracts managed',
                  'Replacement guarantee & ongoing support',
                ].map((point, idx) => (
                  <Box key={idx} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                    <Typography sx={{ color: 'var(--color-primary)', fontWeight: 'bold', flexShrink: 0 }}>
                      ✓
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)' }}>
                      {point}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* RIGHT: Cover image */}
            <Box
              component="img"
              src="/images/gallery/headers/ITResourceCover.png"
              alt="IT Resourcing Overview"
              sx={{
                width: '100%',
                height: { xs: 'auto', md: '380px' },
                objectFit: 'cover',
                borderRadius: 3,
                boxShadow: 'var(--shadow-lg)',
                display: 'block',
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* 4.3 Services */}
      <ServicesOverview />

      {/* 4.3 Tech Domains */}
      <TechDomains />

      {/* 4.4 Why Hire Through SNP */}
      <WhyHireSection />

      {/* 4.5 Client Segments */}
      <Box sx={{ py: { xs: 3, md: 5 }, backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="xl">
          <SectionHeader
            title="Who We Serve"
            subtitle="SNP Innovation supports diverse organizations across sectors and sizes"
          />
          {/* CSS Grid: 3 cols on md+, 2 cols on sm, 1 on xs */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'grid' },
              flexDirection: 'row',
              overflowX: { xs: 'auto', md: 'visible' },
              flexWrap: 'nowrap',
              gridTemplateColumns: { md: 'repeat(3, 1fr)' },
              gap: 3,
              mt: 4,
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
              pb: { xs: 1.5, md: 0 },
            }}
          >
            {clientSegments.map((segment) => (
              <Box
                key={segment.id}
                className="reveal"
                sx={{
                  p: 3,
                  minWidth: { xs: '260px', md: 'auto' },
                  flexShrink: 0,
                  backgroundColor: 'white',
                  borderRadius: 2,
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid #e0e0e0',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: 'var(--shadow-lg)',
                    borderColor: 'var(--color-primary)',
                  },
                }}
              >
                <Typography sx={{ fontSize: '2rem', mb: 1 }}>{segment.icon}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1F2937', fontSize: '15px' }}>
                  {segment.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, fontSize: '13px' }}>
                  {segment.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* 4.6 Talent Pipeline */}
      <TalentPipeline />

      {/* 4.7 Enquiry Forms */}
      <ITEnquiryForm />
    </Box>
  );
};

export default ITResourcingPage;
