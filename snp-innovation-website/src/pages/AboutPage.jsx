/* ========================================
   ABOUT PAGE — Page 2 in the PDF blueprint
   Renders all 7 About Us sections in order.

   DATA: Uses Redux aboutSlice (initialState = exact PDF content).
   When backend is offline, page renders correctly with hardcoded data.
   ======================================== */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { fetchAboutData } from '../store/slices/aboutSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';

import OurStory from '../components/about/OurStory';
import VisionMission from '../components/about/VisionMission';
import CoreValues from '../components/about/CoreValues';
import ApproachTimeline from '../components/about/ApproachTimeline';
import TeamSection from '../components/about/TeamSection';
import CSRSection from '../components/about/CSRSection';

const AboutPage = () => {
  const dispatch = useDispatch();

  const { story, vision, mission, values, approach, team, csr, status } = useSelector(
    (state) => state.about
  );

  // Try fetching live data — falls back to initialState if backend is offline
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAboutData());
    }
  }, [dispatch, status]);

  // Brief spinner while the first request is in flight
  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  // 'failed' falls through — renders with hardcoded initialState data (no error screen)
  return (
    <Box component="main">
      {/* 2.1 — Page Banner */}
      <AboutBanner />

      {/* 2.2 — Our Story */}
      <OurStory storyData={story} />

      {/* 2.3 — Vision & Mission */}
      <VisionMission visionData={vision} missionData={mission} />

      {/* 2.4 — Core Values */}
      <CoreValues valuesData={values} />

      {/* 2.5 — Our Approach (Innovation Lifecycle) */}
      <ApproachTimeline approachData={approach} />

      {/* 2.6 — Team & Leadership */}
      <TeamSection teamData={team} />

      {/* 2.7 — CSR & Social Impact */}
      <CSRSection csrData={csr} />
    </Box>
  );
};

/* ── Inline banner component (PDF 2.1 exact text) ── */
const AboutBanner = () => (
  <Box
    sx={{
      width: '100%',
      minHeight: { xs: '160px', md: '260px' },
      background: 'linear-gradient(135deg, #0F172A 0%, #0F2560 50%, #1A3A8F 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Background dummy image */}
    <Box
      component="img"
      src="https://picsum.photos/seed/snp-team-collage/1400/500"
      alt="SNP Innovation Team"
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0.18,
      }}
    />

    {/* Dark overlay */}
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(30,58,143,0.7) 100%)',
      }}
    />

    {/* Floating dots */}
    {[...Array(10)].map((_, i) => (
      <Box
        key={i}
        sx={{
          position: 'absolute',
          width: `${3 + (i % 4)}px`,
          height: `${3 + (i % 4)}px`,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          top: `${(i * 13 + 5) % 90}%`,
          left: `${(i * 17 + 5) % 95}%`,
          animation: `twinkle ${2.5 + (i % 3)}s ease-in-out infinite`,
          '@keyframes twinkle': {
            '0%,100%': { opacity: 0.1 },
            '50%': { opacity: 0.4 },
          },
        }}
      />
    ))}

    {/* Content — exact PDF 2.1 text */}
    <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', px: 3 }}>
      {/* Breadcrumb */}
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          px: 2, py: 0.6,
          background: 'rgba(249,115,22,0.15)',
          border: '1px solid rgba(249,115,22,0.35)',
          borderRadius: '100px',
          mb: 3,
          fontSize: '12px',
          fontWeight: 600,
          color: '#FED7AA',
          letterSpacing: '1px',
        }}
      >
        HOME / ABOUT US
      </Box>

      {/* Headline — from PDF 2.1 */}
      <Box
        component="h1"
        sx={{
          fontSize: { xs: '32px', sm: '44px', md: '56px' },
          fontWeight: 900,
          lineHeight: 1.15,
          mb: 2,
          background: 'linear-gradient(135deg, #FFFFFF 0%, #BFDBFE 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          m: 0,
          mb: 2,
        }}
      >
        About SNP Innovation
      </Box>

      {/* Sub-headline — exact PDF 2.1 text */}
      <Box
        component="p"
        sx={{
          fontSize: { xs: '16px', md: '20px' },
          fontWeight: 400,
          color: 'rgba(255,255,255,0.8)',
          maxWidth: '600px',
          mx: 'auto',
          lineHeight: 1.7,
          m: 0,
        }}
      >
        More than a company — we are a movement to make India innovation-ready.
      </Box>
    </Box>
  </Box>
);

export default AboutPage;
