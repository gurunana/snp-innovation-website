/* ========================================
   GALLERY PAGE
   Real SNP Innovation product images.
   Put images in /public/images/gallery/
   ======================================== */

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  Stack,
  Modal,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import VideoGallery from '../components/gallery/VideoGallery';

/* ─── Categories ─────────────────────────────────────── */
const CATEGORIES = ['All', 'Lab Tools', 'Robot Kits', 'STEM Kits', 'Activity Kits', 'Inno-Kits'];

/* ─── Real Product Photos ─────────────────────────────
   Files go in: /public/images/gallery/
   onError fallback shows placeholder if file missing  */
const PHOTOS = [
  { id: 1,  file: '/images/gallery/1.jpeg',      category: 'Lab Tools',     title: 'Electronics Lab Tools Set',         desc: 'Digital multimeters, soldering irons, wire strippers, glue gun & Taparia tool box' },
  { id: 2,  file: '/images/gallery/2.jpeg',      category: 'Lab Tools',     title: 'Soldering Station Kit',             desc: 'Complete soldering station with iron holders, solder wire and accessories' },
  { id: 3,  file: '/images/gallery/3.jpeg',      category: 'Robot Kits',    title: 'SNP Robot 1 – 4-Wheel Kit',         desc: 'ESP-32 powered 4-wheel robot with PCB, motors, Li-ion batteries and components' },
  { id: 4,  file: '/images/gallery/4.jpeg',      category: 'Robot Kits',    title: 'SNP Robot 2 – Mini Bot',            desc: 'Compact 2-wheel SNP robot PCB with controller panel and motor assembly' },
  { id: 5,  file: '/images/gallery/5.jpeg',      category: 'Robot Kits',    title: 'Robot 1 – Assembled (Top View)',    desc: 'Top view of Robot 1 board with L298N motor driver and battery holder' },
  { id: 6,  file: '/images/gallery/6.jpeg',      category: 'Robot Kits',    title: 'Robot 1 – Side View',               desc: 'Fully assembled SNP Robot 1 showing PCB chassis with yellow wheels' },
  { id: 7,  file: '/images/gallery/7.jpeg',      category: 'STEM Kits',     title: 'STEM Sensor Kit Collection (Open)', desc: '9 sensor kits: Soil, Remote, Motion PIR, Water, Solar Energy, Running LED, Heat, Fire, Night Sensor' },
  { id: 8,  file: '/images/gallery/8.jpeg',      category: 'STEM Kits',     title: 'Sensor Kit Grid – 9 in 1',          desc: 'Full collection of labelled STEM Innovation Lab sensor kits in clear boxes' },
  { id: 9,  file: '/images/gallery/9.jpeg',      category: 'STEM Kits',     title: 'Solar Energy Kit',                  desc: 'Solar panel with LED strip and DC connector for renewable energy learning' },
  { id: 10, file: '/images/gallery/10.jpeg',     category: 'STEM Kits',     title: 'Soil Sensor Kit',                   desc: 'Soil moisture sensor with PCB controller, LED indicator and toggle switch' },
  { id: 11, file: '/images/gallery/11.jpeg',     category: 'STEM Kits',     title: 'Running LED Sensor',                desc: 'Running LEDs board with speed control, IC chips and DC jack input' },
  { id: 12, file: '/images/gallery/12.jpeg',     category: 'Activity Kits', title: 'Activity Learning Kits – Open',     desc: 'Educational activity boxes with Farm Animals, DIY Skeleton, Wind Generator and Family charts' },
  { id: 13, file: '/images/gallery/13.jpeg',     category: 'Inno-Kits',     title: 'Inno-Kits – Plant Needs Water',     desc: 'Build your own smart irrigation system – Ages 8+, includes circuit board, sensor, pump & guide' },
  { id: 14, file: '/images/gallery/14.jpeg',     category: 'Inno-Kits',     title: 'Inno-Kits – Open Box View',         desc: 'Inside view showing solar panel, breadboard, seeds, components neatly organised' },
  { id: 15, file: '/images/gallery/15.jpeg',     category: 'Inno-Kits',     title: 'Robotic Explorer Kit – Red Bot',    desc: 'Robotic Explorer Kit with red PCB, motors, battery and QR video guide' },
  { id: 16, file: '/images/gallery/16.jpeg',     category: 'Inno-Kits',     title: 'Robotic Explorer Kit – Yellow Bot', desc: 'Large 4-wheel bot with yellow wheels, L298N driver and motor assembly' },
  { id: 17, file: '/images/gallery/17.jpeg',     category: 'Lab Tools',     title: 'Advanced Lab Equipment',            desc: 'Professional grade electronics testing and measurement tools' },
  { id: 18, file: '/images/gallery/18.jpeg',     category: 'Robot Kits',    title: 'Robot Assembly Workshop',           desc: 'Students building and programming their SNP robots' },
  { id: 19, file: '/images/gallery/19.jpeg',     category: 'STEM Kits',     title: 'STEM Learning Session',             desc: 'Interactive hands-on learning with STEM sensor kits' },
];

/* placeholder if image file not yet present */
const FALLBACK = 'https://picsum.photos/seed/snp-gallery/800/500';

/* ─── Filter helper ─────────────────────────────────── */
const getFiltered = (cat) => (cat === 'All' ? PHOTOS : PHOTOS.filter((p) => p.category === cat));

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedIdx, setSelectedIdx] = useState(null);

  const filtered = getFiltered(activeCategory);
  const selectedPhoto = selectedIdx !== null ? filtered[selectedIdx] : null;

  const openPhoto  = (idx) => setSelectedIdx(idx);
  const closePhoto = ()    => setSelectedIdx(null);
  const prevPhoto  = ()    => setSelectedIdx((i) => (i > 0 ? i - 1 : i));
  const nextPhoto  = ()    => setSelectedIdx((i) => (i < filtered.length - 1 ? i + 1 : i));

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setSelectedIdx(null);
  };

  return (
    <Box component="main">

      {/* ── Banner ── */}
      <GalleryBanner />

      {/* ── Category Filter Chips ── */}
      <Box sx={{ py: { xs: 2, md: 3 }, background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
        <Container maxWidth="xl">
          {/* Horizontal scroll on mobile so all chips are reachable; wraps on larger screens */}
          <Stack
            direction="row"
            sx={{
              gap: '8px',
              overflowX: { xs: 'auto', md: 'visible' },
              flexWrap: { xs: 'nowrap', md: 'wrap' },
              justifyContent: { xs: 'flex-start', md: 'center' },
              pb: { xs: 1, md: 0 },
              /* hide scrollbar visually but keep it functional */
              '&::-webkit-scrollbar': { display: 'none' },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            {CATEGORIES.map((cat) => {
              const active = cat === activeCategory;
              return (
                <Chip
                  key={cat}
                  label={cat}
                  onClick={() => handleCategoryChange(cat)}
                  sx={{
                    fontWeight: active ? 700 : 500,
                    fontSize: { xs: '11px', md: '13px' },
                    borderRadius: '50px',
                    background: active ? 'linear-gradient(135deg,#1A3A8F,#CC2020)' : 'white',
                    color: active ? 'white' : '#1A3A8F',
                    border: active ? 'none' : '1.5px solid #1A3A8F',
                    boxShadow: active ? '0 4px 14px rgba(30,64,175,0.3)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      background: active ? 'linear-gradient(135deg,#1E3A8A,#A01818)' : 'rgba(30,64,175,0.07)',
                    },
                  }}
                />
              );
            })}
          </Stack>
        </Container>
      </Box>

      {/* ── Photo Grid ── */}
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
        {filtered.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography color="text.secondary">No photos in this category yet.</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gap: { xs: 1, sm: 1.5, md: 2 },
            }}
          >
            {filtered.map((photo, idx) => (
              <PhotoCard key={photo.id} photo={photo} onClick={() => openPhoto(idx)} />
            ))}
          </Box>
        )}
      </Container>

      {/* ── Video Gallery ── */}
      <Box sx={{ background: '#0F172A', py: { xs: 4, md: 6 } }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
            <Typography sx={{ color: '#CC2020', fontWeight: 700, letterSpacing: '2px', fontSize: '11px', mb: 1 }}>
              WATCH &amp; LEARN
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '22px', md: '32px' },
                background: 'linear-gradient(135deg,#FFFFFF,#BFDBFE)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              Video Gallery
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
              Stories, demos, and milestones from the SNP Innovation ecosystem
            </Typography>
          </Box>
          <VideoGallery />
        </Container>
      </Box>

      {/* ── Lightbox Modal ── */}
      <Modal
        open={!!selectedPhoto}
        onClose={closePhoto}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
      >
        <Box
          sx={{
            position: 'relative',
            width: { xs: '95vw', sm: '80vw', md: '60vw' },
            maxWidth: '860px',
            maxHeight: '90vh',
            overflow: 'auto',
            bgcolor: '#111827',
            borderRadius: '14px',
            p: { xs: 2, md: 3 },
            outline: 'none',
          }}
        >
          {/* Close button */}
          <IconButton
            onClick={closePhoto}
            size="small"
            sx={{ position: 'absolute', top: 8, right: 8, color: 'white', bgcolor: 'rgba(255,255,255,0.1)', zIndex: 2, '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          {/* Image */}
          {selectedPhoto && (
            <Box
              component="img"
              src={selectedPhoto.file}
              alt={selectedPhoto.title}
              onError={(e) => { e.target.src = FALLBACK; }}
              sx={{ width: '100%', borderRadius: '10px', display: 'block', mb: 1.5, maxHeight: '60vh', objectFit: 'contain' }}
            />
          )}

          {/* Info */}
          <Typography sx={{ color: 'white', fontWeight: 700, fontSize: { xs: '13px', md: '16px' }, mb: 0.5 }}>
            {selectedPhoto?.title}
          </Typography>
          <Chip
            label={selectedPhoto?.category}
            size="small"
            sx={{ bgcolor: 'rgba(249,115,22,0.2)', color: '#FED7AA', fontSize: '11px', mb: 1.5 }}
          />
          <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', mb: 2 }}>
            {selectedPhoto?.desc}
          </Typography>

          {/* Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', pt: 1.5 }}>
            <IconButton onClick={prevPhoto} disabled={selectedIdx === 0} sx={{ color: selectedIdx === 0 ? 'rgba(255,255,255,0.2)' : 'white' }}>
              <NavigateBeforeIcon />
            </IconButton>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
              {(selectedIdx ?? 0) + 1} / {filtered.length}
            </Typography>
            <IconButton onClick={nextPhoto} disabled={selectedIdx === filtered.length - 1} sx={{ color: selectedIdx === filtered.length - 1 ? 'rgba(255,255,255,0.2)' : 'white' }}>
              <NavigateNextIcon />
            </IconButton>
          </Box>
        </Box>
      </Modal>

    </Box>
  );
};

/* ═══════════════════════════════════════════════════════
   PHOTO CARD
═══════════════════════════════════════════════════════ */
const PhotoCard = ({ photo, onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      position: 'relative',
      cursor: 'pointer',
      borderRadius: { xs: '8px', md: '12px' },
      overflow: 'hidden',
      aspectRatio: '4/3',
      bgcolor: '#E2E8F0',
      '&:hover .overlay': { opacity: 1 },
      '&:hover img': { transform: 'scale(1.06)' },
    }}
  >
    {/* Image */}
    <Box
      component="img"
      src={photo.file}
      alt={photo.title}
      loading="lazy"
      onError={(e) => { e.target.src = FALLBACK; }}
      sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
    />

    {/* Hover overlay */}
    <Box
      className="overlay"
      sx={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg,rgba(30,64,175,0.82),rgba(249,115,22,0.72))',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        opacity: 0, transition: 'opacity 0.3s ease', p: 1,
      }}
    >
      <ZoomInIcon sx={{ color: 'white', fontSize: { xs: 24, md: 36 } }} />
      <Typography sx={{ color: 'white', fontWeight: 700, fontSize: { xs: '9px', md: '12px' }, textAlign: 'center', mt: 0.5, lineHeight: 1.3 }}>
        {photo.title}
      </Typography>
    </Box>

    {/* Category badge */}
    <Box
      sx={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(0deg,rgba(0,0,0,0.7),transparent)',
        px: 1, py: { xs: 0.5, md: 0.8 },
      }}
    >
      <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: { xs: '8px', md: '11px' }, fontWeight: 600 }}>
        {photo.category}
      </Typography>
    </Box>
  </Box>
);

/* ═══════════════════════════════════════════════════════
   GALLERY BANNER
═══════════════════════════════════════════════════════ */
const GalleryBanner = () => (
  <Box
    sx={{
      minHeight: { xs: '160px', md: '260px' },
      background: 'linear-gradient(135deg,#0F172A 0%,#0F2560 55%,#1A3A8F 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Box sx={{ textAlign: 'center', px: 3 }}>
      <Typography
        component="h1"
        sx={{
          fontSize: { xs: '26px', sm: '38px', md: '48px' },
          fontWeight: 900,
          background: 'linear-gradient(135deg,#FFFFFF,#BFDBFE)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1,
        }}
      >
        Our Gallery
      </Typography>
      <Typography sx={{ fontSize: { xs: '13px', md: '15px' }, color: 'rgba(255,255,255,0.72)', maxWidth: '520px', mx: 'auto' }}>
        Labs, kits, robots, workshops — a visual window into SNP Innovation
      </Typography>
    </Box>
  </Box>
);

export default GalleryPage;
