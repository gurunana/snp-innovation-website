/* ========================================
   VIDEO GALLERY
   First card plays the actual uploaded SNP video.
   Remaining cards are placeholders for YouTube links.
   ======================================== */

import { useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const VIDEOS = [
  {
    id: 1,
    title: 'SNP Innovation – Product Showcase',
    description: 'Watch our STEM kits, robot kits, and lab tools in action. A complete product overview from SNP Innovation.',
    isLocal: true,
    src: '/videos/WhatsApp Video 2026-04-17 at 12.43.03 PM.mp4',
  },
  {
    id: 2,
    title: 'Robotics Workshop Session',
    description: 'Students showcase their robotics projects and hands-on learning experience at SNP Innovation.',
    isLocal: true,
    src: '/videos/WhatsApp Video 2026-04-17 at 12.43.03 PM (1).mp4',
  },
  {
    id: 3,
    title: 'STEM Kits Demonstration',
    description: 'Complete demonstration of STEM sensor kits and their practical applications in education.',
    isLocal: true,
    src: '/videos/WhatsApp Video 2026-04-17 at 12.43.06 PM.mp4',
  },
  {
    id: 4,
    title: 'Lab Tools Training',
    description: 'Professional training session using SNP Innovation lab tools and equipment.',
    isLocal: true,
    src: '/videos/WhatsApp Video 2026-04-17 at 12.43.06 PM (1).mp4',
  },
  {
    id: 5,
    title: 'Inno-Kits Project Showcase',
    description: 'Students presenting their innovative projects built with SNP Inno-Kits.',
    isLocal: true,
    src: '/videos/WhatsApp Video 2026-04-17 at 12.43.06 PM (2).mp4',
  },
  {
    id: 6,
    title: 'SNP Innovation Overview',
    description: 'Complete overview of SNP Innovation products, workshops, and educational programs.',
    isLocal: true,
    src: '/videos/snp-overview.mp4',
  },
];

const VideoGallery = () => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
      gap: 3,
    }}
  >
    {VIDEOS.map((video) =>
      video.isLocal ? (
        <LocalVideoCard key={video.id} video={video} />
      ) : (
        <YouTubeCard key={video.id} video={video} />
      )
    )}
  </Box>
);

/* ── Local video card (plays inline) ── */
const LocalVideoCard = ({ video }) => (
  <Card
    sx={{
      background: '#1E293B',
      borderRadius: '14px',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.08)',
    }}
  >
    <Box
      component="video"
      src={video.src}
      controls
      playsInline
      preload="metadata"
      sx={{ width: '100%', display: 'block', maxHeight: { xs: '200px', md: '220px' }, objectFit: 'cover' }}
    />
    <CardContent sx={{ p: 2 }}>
      <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '14px', mb: 0.5 }}>
        {video.title}
      </Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', lineHeight: 1.5 }}>
        {video.description}
      </Typography>
    </CardContent>
  </Card>
);

/* ── YouTube placeholder card ── */
const YouTubeCard = ({ video }) => (
  <Card
    component="a"
    href={video.youtubeUrl}
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      background: '#1E293B',
      borderRadius: '14px',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.08)',
      textDecoration: 'none',
      display: 'block',
      transition: 'transform 0.3s ease',
      '&:hover': { transform: 'translateY(-6px)', '& .play-icon': { color: '#CC2020' } },
    }}
  >
    <Box sx={{ position: 'relative', width: '100%', paddingBottom: '56.25%', background: '#0F172A' }}>
      <Box
        component="img"
        src={`https://picsum.photos/seed/${video.seed}/800/450`}
        alt={video.title}
        sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
      />
      <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PlayCircleIcon className="play-icon" sx={{ fontSize: 60, color: 'rgba(255,255,255,0.8)', transition: 'color 0.3s ease' }} />
      </Box>
      <Box sx={{ position: 'absolute', top: 8, left: 8, bgcolor: '#FF0000', color: 'white', px: 0.8, py: 0.2, borderRadius: '3px', fontSize: '10px', fontWeight: 800 }}>
        YouTube
      </Box>
    </Box>
    <CardContent sx={{ p: 2 }}>
      <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '14px', mb: 0.5 }}>
        {video.title}
      </Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', lineHeight: 1.5 }}>
        {video.description}
      </Typography>
    </CardContent>
  </Card>
);

export default VideoGallery;
