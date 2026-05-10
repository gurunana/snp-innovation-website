/* ========================================
   EDTECH PAGE - Main STEM Labs page
   Orchestrates all EdTech sections in order
   ======================================== */

import { useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEdtechData } from '../store/slices/edtechSlice';

// Import components
import PageBanner from '../components/common/PageBanner';
import SectionHeader from '../components/common/SectionHeader';
import ScrollToTop from '../components/common/ScrollToTop';
import ProblemSolution from '../components/edtech/ProblemSolution';
import LabInfo from '../components/edtech/LabInfo';
import KitCategories from '../components/edtech/KitCategories';
import LearningMethodology from '../components/edtech/LearningMethodology';
import LabSetupProcess from '../components/edtech/LabSetupProcess';
import LabPackages from '../components/edtech/LabPackages';
import ShopSection from '../components/edtech/ShopSection';
import StemEnquiryForm from '../components/edtech/StemEnquiryForm';

// Key highlights data — defined outside return (no logic in JSX)
const highlights = [
  {
    id: 1,
    icon: '📚',
    title: 'Curriculum Mapped',
    description: 'Fully aligned with CBSE, ICSE, IGCSE & NEP 2020 standards',
  },
  {
    id: 2,
    icon: '🎓',
    title: 'Teacher Training',
    description: 'Comprehensive onboarding & ongoing pedagogical support for educators',
  },
  {
    id: 3,
    icon: '🔧',
    title: 'AMC Support',
    description: 'Annual Maintenance Contracts to keep labs running smoothly year-round',
  },
  {
    id: 4,
    icon: '🏆',
    title: 'Competition Prep',
    description: 'Olympiads, ATL, Smart India Hackathon & national STEM competitions',
  },
  {
    id: 5,
    icon: '💡',
    title: 'IP Support',
    description: 'Guidance on patents and intellectual property for student innovations',
  },
  {
    id: 6,
    icon: '🤝',
    title: 'CSR Programs',
    description: 'Partnership with corporates for CSR-funded STEM lab installations',
  },
  {
    id: 7,
    icon: '🎨',
    title: 'Custom Lab Design',
    description: 'Tailor-made lab layouts that match your space and institutional vision',
  },
  {
    id: 8,
    icon: '🌐',
    title: 'Global Standards',
    description: 'Internationally benchmarked curriculum with recognised certifications',
  },
];

// Target institutions data — defined outside return
const targetInstitutions = [
  { id: 1, name: 'CBSE / ICSE Schools', icon: '🏫', desc: 'Primary to senior secondary schools seeking hands-on STEM labs' },
  { id: 2, name: 'IGCSE & International Schools', icon: '🌍', desc: 'International curriculum schools needing global-standard STEM facilities' },
  { id: 3, name: 'Government Schools (ATL)', icon: '🏛️', desc: 'Atal Tinkering Lab certified schools supported by NITI Aayog' },
  { id: 4, name: 'Junior / Senior Secondary', icon: '📐', desc: 'Classes 6–12 institutions focused on applied science & technology' },
  { id: 5, name: 'Engineering & Polytechnic Colleges', icon: '⚙️', desc: 'Degree and diploma colleges requiring advanced AI/IoT/Robotics labs' },
  { id: 6, name: 'Universities', icon: '🎓', desc: 'Research-focused universities building innovation & automation centres' },
  { id: 7, name: 'Skill Development Centres', icon: '🔑', desc: 'Vocational training institutes aligned with NSDC & PMKVY programmes' },
];

// Gallery images — defined outside return
const galleryImages = [
  { id: 1, seed: 'stem-lab-1', label: 'Robotics Workshop' },
  { id: 2, seed: 'stem-lab-2', label: 'AI Lab in Action' },
  { id: 3, seed: 'stem-lab-3', label: 'IoT Projects' },
  { id: 4, seed: 'stem-lab-4', label: 'Electronics Lab' },
  { id: 5, seed: 'stem-lab-5', label: 'Student Innovations' },
  { id: 6, seed: 'stem-lab-6', label: 'Teacher Training' },
];

const EdtechPage = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.edtech);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEdtechData());
    }
  }, [status, dispatch]);

  // Page always renders regardless of status (no failed-state blocking)

  return (
    <Box>
      <ScrollToTop />

      {/* ── Banner ── */}
      <PageBanner
        title="FUTURE-READY STEM INNOVATION LABS FOR SCHOOLS & COLLEGES"
        subtitle="Where Curiosity Meets Technology — Building the Innovators of Tomorrow, Today."
      />

      {/* ── Problem / Solution ── */}
      <ProblemSolution />

      {/* ── What is a SNP STEM Lab ── */}
      <LabInfo />

      {/* ── Kit Categories ── */}
      <KitCategories />

      {/* ── Learning Methodology ── */}
      <LearningMethodology />

      {/* ── Lab Setup Process ── */}
      <LabSetupProcess />

      {/* ── Lab Packages ── */}
      <LabPackages />

      {/* ── Key Highlights ── */}
      <Box sx={{ py: { xs: 3, md: 5 }, background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)' }}>
        <Container maxWidth="xl">
          <SectionHeader
            title="Key Highlights & Differentiators"
            subtitle="Why institutions across India choose SNP Innovation Labs"
            light
            gradient={false}
          />

          <Box
            sx={{
              display: { xs: 'flex', md: 'grid' },
              flexDirection: 'row',
              overflowX: { xs: 'auto', md: 'visible' },
              flexWrap: 'nowrap',
              gridTemplateColumns: { md: 'repeat(4, 1fr)' },
              gap: { xs: 2, md: 2.5 },
              mt: 3,
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
              pb: { xs: 1.5, md: 0 },
            }}
          >
            {highlights.map((item) => (
              <Box
                key={item.id}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  minWidth: { xs: '200px', md: 'auto' },
                  flexShrink: 0,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(8px)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.12)',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
                  },
                }}
              >
                <Typography sx={{ fontSize: 28, mb: 1 }}>{item.icon}</Typography>
                <Typography
                  variant="h6"
                  sx={{ color: '#fff', fontWeight: 700, fontSize: '14px', mb: 0.5 }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: 1.6 }}
                >
                  {item.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── Target Institutions ── */}
      <Box sx={{ py: { xs: 3, md: 5 }, backgroundColor: '#F8FAFC' }}>
        <Container maxWidth="xl">
          <SectionHeader
            title="Target Institutions"
            subtitle="We serve every tier of the education ecosystem — from primary schools to research universities"
          />

          {/* CSS Grid — 3 cols desktop, 2 cols tablet, 1 col mobile; equal card heights */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 2,
              mt: 3,
            }}
          >
            {targetInstitutions.map((inst) => (
              <Box
                key={inst.id}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  borderLeft: '4px solid #2D5BE3',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 12px 32px rgba(59,130,246,0.12)',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.75 }}>
                  <Typography sx={{ fontSize: 22 }}>{inst.icon}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1F2937', fontSize: '14px' }}>
                    {inst.name}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#6B7280', lineHeight: 1.6, fontSize: '13px' }}>
                  {inst.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── Gallery Placeholder ── */}
      <Box sx={{ py: { xs: 3, md: 5 }, backgroundColor: '#fff' }}>
        <Container maxWidth="xl">
          <SectionHeader
            title="Our Labs in Action"
            subtitle="A glimpse into the vibrant learning environments we've created across India"
          />

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 2,
              mt: 3,
            }}
          >
            {galleryImages.map((img) => (
              <Box
                key={img.id}
                sx={{
                  position: 'relative',
                  borderRadius: 3,
                  overflow: 'hidden',
                  height: 180,
                  cursor: 'pointer',
                  '&:hover .gallery-overlay': { opacity: 1 },
                  '&:hover img': { transform: 'scale(1.08)' },
                }}
              >
                <Box
                  component="img"
                  src={`https://picsum.photos/seed/${img.seed}/800/500`}
                  alt={img.label}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                />
                <Box
                  className="gallery-overlay"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    display: 'flex',
                    alignItems: 'flex-end',
                    p: 2,
                  }}
                >
                  <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '14px' }}>
                    {img.label}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── Shop Section ── */}
      <ShopSection />

      {/* ── Enquiry Form ── */}
      <StemEnquiryForm />
    </Box>
  );
};

export default EdtechPage;
