/* ========================================
   HOME PAGE — Main landing page
   Orchestrates all 9 home section components.

   DATA STRATEGY:
   - On mount it tries to fetch live data from the Spring Boot API.
   - If the API is not running yet (no backend), the Redux slice falls back
     to its hardcoded initialState — so the page always renders correctly.
   - Only a brief spinner is shown while the request is in flight.
   ======================================== */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { fetchHomeData } from '../store/slices/homeSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Home Section Components — one per PDF section
import HeroSection from '../components/home/HeroSection';
import ImpactStats from '../components/home/ImpactStats';
import VerticalsGrid from '../components/home/VerticalsGrid';
import WhySnpSection from '../components/home/WhySnpSection';
import FeaturedVerticalSpotlight from '../components/home/FeaturedVerticalSpotlight';
import ClientLogos from '../components/home/ClientLogos';
import TestimonialsSection from '../components/home/TestimonialsSection';
import LatestNewsSection from '../components/home/LatestNewsSection';
import FooterCTA from '../components/home/FooterCTA';

const HomePage = () => {
  const dispatch = useDispatch();

  // Pull all home data from Redux store
  // If the API hasn't been connected yet, this comes from initialState (hardcoded)
  const { hero, stats, verticals, features, testimonials, latestNews, status } = useSelector(
    (state) => state.home
  );

  // Try fetching live data once on mount (only when status is 'idle')
  // If the backend is not running, the request fails silently and we
  // continue rendering with the hardcoded initialState data.
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchHomeData());
    }
  }, [dispatch, status]);

  // Show spinner only while the first request is in flight
  // 'failed' falls through and renders with initialState data — no error screen
  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  // Render the full home page — uses live API data when available,
  // falls back to hardcoded initialState data when backend is offline
  return (
    <Box component="main">
      {/* 1.1 — Hero Section */}
      <HeroSection heroData={hero} />

      {/* 1.2 — Impact Counter Strip */}
      <ImpactStats statsData={stats} />

      {/* 1.3 — What We Do (4-Vertical Grid) */}
      <VerticalsGrid verticalsData={verticals} />

      {/* 1.4 — Why SNP Innovation? (Feature Strip) */}
      <WhySnpSection featuresData={features} />

      {/* 1.5 — Featured Vertical Spotlight (alternating left-right blocks) */}
      <FeaturedVerticalSpotlight />

      {/* 1.6 — Client & Partner Logos (scrolling carousel) */}
      <ClientLogos />

      {/* 1.7 — Testimonials (card carousel) */}
      <TestimonialsSection testimonialsData={testimonials} />

      {/* 1.8 — Latest News / Events Strip */}
      <LatestNewsSection newsData={latestNews} />

      {/* 1.9 — Footer CTA Banner */}
      <FooterCTA />
    </Box>
  );
};

export default HomePage;
