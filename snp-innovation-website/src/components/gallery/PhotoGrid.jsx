/* ========================================
   PHOTO GRID - Masonry-style photo gallery with lightbox
   Uses MUI ImageList with dynamic columns based on screen size

   Props:
   - photos (array): Array of photo objects with title, image, category, description
   - filter (string): Current filter to show only matching photos
======================================== */

import { useState } from 'react';
import {
  Box,
  ImageList,
  ImageListItem,
  Modal,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const PhotoGrid = ({ photos, filter }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Filter photos based on active filter
  const filteredPhotos = filter === 'All'
    ? photos
    : photos.filter((photo) => photo.category === filter);

  // Handle lightbox image open
  const handleImageClick = (photo, index) => {
    setSelectedImage(photo);
    setSelectedIndex(index);
  };

  // Handle previous/next image navigation
  const handlePrevImage = () => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedImage(filteredPhotos[newIndex]);
      setSelectedIndex(newIndex);
    }
  };

  const handleNextImage = () => {
    if (selectedIndex < filteredPhotos.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedImage(filteredPhotos[newIndex]);
      setSelectedIndex(newIndex);
    }
  };

  // Handle lightbox close
  const handleClose = () => {
    setSelectedImage(null);
    setSelectedIndex(0);
  };

  return (
    <>
      {/* Photo Grid */}
      <ImageList
        sx={{
          width: '100%',
          height: 'auto',
          columnCount: { xs: 1, sm: 2, md: 3, lg: 4 },
        }}
        variant="masonry"
        gap={20}
      >
        {filteredPhotos.map((photo, index) => (
          <ImageListItem
            key={photo.id}
            onClick={() => handleImageClick(photo, index)}
            sx={{
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '12px',
              '&:hover': {
                transform: 'scale(1.06)',
                '& img': {
                  transform: 'scale(1.08)',
                },
                '& .overlay': {
                  opacity: 1,
                },
              },
            }}
          >
            <img
              src={photo.image}
              alt={photo.title}
              loading="lazy"
              style={{
                borderRadius: '12px',
                objectFit: 'cover',
                width: '100%',
                transition: 'transform 0.4s ease',
              }}
            />
            {/* Overlay with zoom icon on hover */}
            <Box
              className="overlay"
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(21, 101, 192, 0.7) 0%, rgba(245, 124, 0, 0.7) 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                opacity: 0,
                transition: 'opacity 0.4s ease',
                backdropFilter: 'blur(2px)',
              }}
            >
              <ZoomInIcon sx={{ fontSize: 48, color: 'white', mb: 1 }} />
              <Typography
                variant="body2"
                sx={{ color: 'white', textAlign: 'center', padding: '16px', fontWeight: 'bold' }}
              >
                {photo.title}
              </Typography>
            </Box>
          </ImageListItem>
        ))}
      </ImageList>

      {/* Lightbox Modal */}
      <Modal
        open={!!selectedImage}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1300,
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: { xs: '95%', sm: '85%', md: '75%' },
            maxWidth: '900px',
            backgroundColor: '#1a1a1a',
            borderRadius: '16px',
            padding: { xs: '16px', sm: '24px', md: '32px' },
            boxShadow: '0 24px 80px rgba(0, 0, 0, 0.5)',
            animation: 'fadeInScale 0.3s ease',
            '@keyframes fadeInScale': {
              from: {
                opacity: 0,
                transform: 'scale(0.95)',
              },
              to: {
                opacity: 1,
                transform: 'scale(1)',
              },
            },
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: 'white',
              zIndex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                transform: 'rotate(90deg)',
              },
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>

          {/* Main Image */}
          <img
            src={selectedImage?.image}
            alt={selectedImage?.title}
            style={{
              width: '100%',
              borderRadius: '12px',
              marginBottom: '24px',
              display: 'block',
            }}
          />

          {/* Image Info */}
          <Typography
            variant="h5"
            sx={{
              color: 'white',
              marginBottom: '8px',
              fontWeight: 'bold',
              fontSize: '20px',
              letterSpacing: '-0.5px',
            }}
          >
            {selectedImage?.title}
          </Typography>
          {selectedImage?.description && (
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.85)',
                marginBottom: '20px',
                lineHeight: 1.7,
              }}
            >
              {selectedImage?.description}
            </Typography>
          )}

          {/* Navigation Buttons */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <IconButton
              onClick={handlePrevImage}
              disabled={selectedIndex === 0}
              sx={{
                color: selectedIndex === 0 ? 'rgba(255, 255, 255, 0.4)' : 'white',
                transition: 'all 0.3s ease',
                '&:hover:not(:disabled)': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateX(-4px)',
                },
              }}
            >
              <NavigateBeforeIcon fontSize="large" />
            </IconButton>

            <Typography sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: '14px',
            }}>
              {selectedIndex + 1} / {filteredPhotos.length}
            </Typography>

            <IconButton
              onClick={handleNextImage}
              disabled={selectedIndex === filteredPhotos.length - 1}
              sx={{
                color: selectedIndex === filteredPhotos.length - 1 ? 'rgba(255, 255, 255, 0.4)' : 'white',
                transition: 'all 0.3s ease',
                '&:hover:not(:disabled)': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <NavigateNextIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default PhotoGrid;
