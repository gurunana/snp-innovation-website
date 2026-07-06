/* ========================================
   EDTECH PAGE - Main STEM Labs page
   Orchestrates all EdTech sections in order
   ======================================== */

import { useEffect, useMemo, useState } from 'react';
import { Box, Typography, Container, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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

// Pool of real gallery photos from /public/images/gallery/Activity/
// We pick 6 random ones per page load so visitors see a fresh selection each visit.
const GALLERY_POOL = [
  ...Array.from({ length: 29 }, (_, i) => `/images/gallery/Activity/act_${i + 1}.jpg`),
  ...Array.from({ length: 20 }, (_, i) => `/images/gallery/Activity/act_${i + 30}.jpeg`),
];

const GALLERY_LABELS = [
  'STEM Lab in Action', 'Robotics Workshop', 'AI & IoT Projects',
  'Electronics Lab', 'Student Innovations', 'Hands-on Learning',
  'Workshop Session', 'Teacher Training', 'Lab Demonstration',
  'Collaborative Learning', 'Maker Space', 'Innovation Showcase',
];

// Fisher-Yates shuffle returning the first `n` items
const pickRandom = (arr, n) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
};

const EdtechPage = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.edtech);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEdtechData());
    }
  }, [status, dispatch]);

  // Pick 6 random gallery photos once per mount so the section feels fresh
  // every visit, but stays stable while the user is on the page.
  const galleryImages = useMemo(
    () =>
      pickRandom(GALLERY_POOL, 6).map((src, idx) => ({
        id: idx + 1,
        src,
        label: GALLERY_LABELS[idx % GALLERY_LABELS.length],
      })),
    []
  );

  // Lightbox state — open a dialog with the clicked image enlarged.
  const [lightbox, setLightbox] = useState(null); // null when closed, image object when open
  const handleOpenLightbox = (img) => setLightbox(img);
  const handleCloseLightbox = () => setLightbox(null);

  // Page always renders regardless of status (no failed-state blocking)

  return (
    <Box>
      <ScrollToTop />

      {/* ── Banner ── */}
      <PageBanner
        title="FUTURE-READY STEM INNOVATION LABS FOR SCHOOLS & COLLEGES"
        subtitle="Where Curiosity Meets Technology — Building the Innovators of Tomorrow, Today."
        bgImage="/images/gallery/headers/edTechHeader.png"
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
                onClick={() => handleOpenLightbox(img)}
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
                  src={img.src}
                  alt={img.label}
                  loading="lazy"
                  decoding="async"
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

        {/* Lightbox dialog — shows the clicked image enlarged */}
        <Dialog
          open={Boolean(lightbox)}
          onClose={handleCloseLightbox}
          maxWidth="lg"
          PaperProps={{
            sx: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
              overflow: 'visible',
              m: { xs: 2, md: 4 },
            },
          }}
          slotProps={{
            backdrop: { sx: { backgroundColor: 'rgba(0,0,0,0.85)' } },
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <IconButton
              onClick={handleCloseLightbox}
              aria-label="Close"
              sx={{
                position: 'absolute',
                top: -16,
                right: -16,
                backgroundColor: '#fff',
                color: '#0F172A',
                width: 40,
                height: 40,
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                zIndex: 2,
                '&:hover': { backgroundColor: '#F1F5F9' },
              }}
            >
              <CloseIcon />
            </IconButton>
            {lightbox && (
              <>
                <Box
                  component="img"
                  src={lightbox.src}
                  alt={lightbox.label}
                  sx={{
                    display: 'block',
                    width: '100%',
                    maxWidth: '90vw',
                    maxHeight: '85vh',
                    objectFit: 'contain',
                    borderRadius: 2,
                    backgroundColor: '#0F172A',
                  }}
                />
                <Typography
                  sx={{
                    color: '#fff',
                    textAlign: 'center',
                    mt: 2,
                    fontSize: '15px',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                  }}
                >
                  {lightbox.label}
                </Typography>
              </>
            )}
          </Box>
        </Dialog>
      </Box>

      {/* ── Shop Section ── */}
      <ShopSection />

      {/* ── Enquiry Form ── */}
      <StemEnquiryForm />
    </Box>
  );
};

export default EdtechPage;
