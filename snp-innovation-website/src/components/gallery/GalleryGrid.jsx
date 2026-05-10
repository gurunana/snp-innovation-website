/* ========================================
   GALLERY GRID — Masonry photo grid with lightbox modal
   Props:
   - photos (array): { id, seed, category, title }
   ======================================== */

import { useState } from 'react';
import {
  Box,
  ImageList,
  ImageListItem,
  Modal,
  IconButton,
  Typography,
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const GalleryGrid = ({ photos = [] }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));

  const cols = isMd ? 4 : isSm ? 2 : 1;

  const [selectedIndex, setSelectedIndex] = useState(null);

  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  const handleOpen = (idx) => setSelectedIndex(idx);

  const handleClose = () => setSelectedIndex(null);

  const handlePrev = () => {
    if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
  };

  const handleNext = () => {
    if (selectedIndex < photos.length - 1) setSelectedIndex(selectedIndex + 1);
  };

  if (photos.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: { xs: 4, md: 7 }, color: '#64748B' }}>
        <Typography variant="body1">No photos in this category.</Typography>
      </Box>
    );
  }

  return (
    <>
      <ImageList variant="masonry" cols={cols} gap={16}>
        {photos.map((photo, idx) => (
          <ImageListItem
            key={photo.id}
            onClick={() => handleOpen(idx)}
            sx={{
              cursor: 'pointer',
              borderRadius: '12px',
              overflow: 'hidden',
              position: 'relative',
              transition: 'transform 0.35s ease, box-shadow 0.35s ease',
              '&:hover': {
                transform: 'scale(1.03)',
                boxShadow: '0 16px 40px rgba(0,0,0,0.18)',
                '& .gallery-overlay': { opacity: 1 },
                '& img': { transform: 'scale(1.07)' },
              },
            }}
          >
            <img
              src={`https://picsum.photos/seed/${photo.seed}/800/500`}
              alt={photo.title}
              loading="lazy"
              style={{
                display: 'block',
                width: '100%',
                borderRadius: '12px',
                transition: 'transform 0.4s ease',
              }}
            />
            {/* Hover overlay */}
            <Box
              className="gallery-overlay"
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg,rgba(30,64,175,0.72),rgba(249,115,22,0.72))',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.35s ease',
                borderRadius: '12px',
                gap: 1.5,
                px: 2,
              }}
            >
              <ZoomInIcon sx={{ fontSize: 44, color: 'white' }} />
              <Typography
                sx={{ color: 'white', fontWeight: 700, fontSize: '14px', textAlign: 'center' }}
              >
                {photo.title}
              </Typography>
              <Chip
                label={photo.category}
                size="small"
                sx={{
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: 600,
                  border: '1px solid rgba(255,255,255,0.4)',
                }}
              />
            </Box>

            {/* Always-visible category label at bottom */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(0deg,rgba(0,0,0,0.6) 0%,transparent 100%)',
                px: 1.5,
                py: 1,
                borderBottomLeftRadius: '12px',
                borderBottomRightRadius: '12px',
              }}
            >
              <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '11px', fontWeight: 600 }}>
                {photo.category}
              </Typography>
            </Box>
          </ImageListItem>
        ))}
      </ImageList>

      {/* Lightbox Modal */}
      <Modal
        open={!!selectedPhoto}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1400,
          backdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(0,0,0,0.88)',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: { xs: '96%', sm: '86%', md: '72%' },
            maxWidth: '920px',
            bgcolor: '#111827',
            borderRadius: '18px',
            p: { xs: 2, sm: 3, md: 4 },
            boxShadow: '0 28px 80px rgba(0,0,0,0.6)',
            outline: 'none',
            animation: 'lbIn 0.28s ease',
            '@keyframes lbIn': {
              from: { opacity: 0, transform: 'scale(0.94)' },
              to:   { opacity: 1, transform: 'scale(1)' },
            },
          }}
        >
          {/* Close */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.45)',
              zIndex: 1,
              '&:hover': { bgcolor: 'rgba(0,0,0,0.75)', transform: 'rotate(90deg)' },
              transition: 'all 0.3s ease',
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Image */}
          {selectedPhoto && (
            <img
              src={`https://picsum.photos/seed/${selectedPhoto.seed}/800/500`}
              alt={selectedPhoto.title}
              style={{ width: '100%', borderRadius: '12px', display: 'block', marginBottom: '20px' }}
            />
          )}

          {/* Info */}
          <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '18px', mb: 0.5 }}>
            {selectedPhoto?.title}
          </Typography>
          <Chip
            label={selectedPhoto?.category}
            size="small"
            sx={{ bgcolor: 'rgba(249,115,22,0.2)', color: '#FED7AA', fontSize: '12px', mb: 2 }}
          />

          {/* Nav */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pt: 2,
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <IconButton
              onClick={handlePrev}
              disabled={selectedIndex === 0}
              sx={{ color: selectedIndex === 0 ? 'rgba(255,255,255,0.3)' : 'white' }}
            >
              <NavigateBeforeIcon fontSize="large" />
            </IconButton>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 600 }}>
              {selectedIndex + 1} / {photos.length}
            </Typography>
            <IconButton
              onClick={handleNext}
              disabled={selectedIndex === photos.length - 1}
              sx={{ color: selectedIndex === photos.length - 1 ? 'rgba(255,255,255,0.3)' : 'white' }}
            >
              <NavigateNextIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default GalleryGrid;
