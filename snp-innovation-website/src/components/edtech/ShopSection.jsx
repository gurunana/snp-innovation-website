/* ========================================
   SHOP SECTION - Kit shop with 6 dummy kit cards
   Fixed: uses item xs={} syntax (not size={})
   Uses dummy images from picsum
   ======================================== */

import { Box, Typography, Container, Card, CardContent, CardMedia, Chip } from '@mui/material';
import { Grid } from '@mui/material';
import SectionHeader from '../common/SectionHeader';
import PrimaryButton from '../common/PrimaryButton';

// 6 dummy kit products — defined outside return, no logic in JSX
const shopKits = [
  {
    id: 1,
    name: 'Plug-and-Play Starter Kit',
    subtitle: 'Class 5–8 Essentials',
    price: '₹24,999',
    originalPrice: '₹29,999',
    image: 'https://picsum.photos/seed/shop-kit-1/800/500',
    tag: 'Bestseller',
    tagColor: '#F59E0B',
    audience: 'Class 5–8',
    rating: '4.8',
    reviews: 312,
    features: ['Basic Electronics', 'Sensor Kits', 'Junior Coding', 'Lab Manual'],
  },
  {
    id: 2,
    name: 'Arduino Robotics Kit',
    subtitle: 'Build & Program Real Robots',
    price: '₹39,999',
    originalPrice: '₹49,999',
    image: 'https://picsum.photos/seed/shop-kit-2/800/500',
    tag: 'Popular',
    tagColor: '#2D5BE3',
    audience: 'Class 8–12',
    rating: '4.9',
    reviews: 487,
    features: ['Arduino Uno', 'Servo & DC Motors', 'Ultrasonic Sensors', 'Python Interface'],
  },
  {
    id: 3,
    name: 'AI & Vision Kit',
    subtitle: 'Machine Learning for Schools',
    price: '₹64,999',
    originalPrice: '₹79,999',
    image: 'https://picsum.photos/seed/shop-kit-3/800/500',
    tag: 'New',
    tagColor: '#8B5CF6',
    audience: 'Class 11+ / College',
    rating: '4.7',
    reviews: 128,
    features: ['Jetson Nano', 'Camera Module', 'TensorFlow Lite', 'Gesture Recognition'],
  },
  {
    id: 4,
    name: 'IoT Smart Home Kit',
    subtitle: 'Connect & Automate Everything',
    price: '₹34,999',
    originalPrice: '₹44,999',
    image: 'https://picsum.photos/seed/shop-kit-4/800/500',
    tag: 'Sale',
    tagColor: '#EF4444',
    audience: 'College / Research',
    rating: '4.6',
    reviews: 203,
    features: ['NodeMCU', 'MQTT Broker', 'Cloud Dashboard', 'Smart Sensors Pack'],
  },
  {
    id: 5,
    name: 'Raspberry Pi Lab Kit',
    subtitle: 'Full Linux Computer in Your Kit',
    price: '₹44,999',
    originalPrice: '₹54,999',
    image: 'https://picsum.photos/seed/shop-kit-5/800/500',
    tag: 'Pro',
    tagColor: '#10B981',
    audience: 'Class 10–12 / College',
    rating: '4.8',
    reviews: 176,
    features: ['Raspberry Pi 4', 'Python & C++', 'GPIO Projects', 'Touchscreen Display'],
  },
  {
    id: 6,
    name: 'Science Exploration Kit',
    subtitle: 'Hands-On STEM for Juniors',
    price: '₹14,999',
    originalPrice: '₹18,999',
    image: 'https://picsum.photos/seed/shop-kit-6/800/500',
    tag: 'Starter',
    tagColor: '#06B6D4',
    audience: 'Class 5–7',
    rating: '4.9',
    reviews: 421,
    features: ['Physics Experiments', 'Chemistry Kits', 'Biology Slides', 'Experiment Manual'],
  },
];

const ShopSection = () => {
  return (
    <Box sx={{ py: { xs: 3, md: 5 }, backgroundColor: '#fff' }}>
      <Container maxWidth="xl">
        <SectionHeader
          title="Shop STEM Kits Online"
          subtitle="Order individual kits or complete lab packages — delivered, installed, and ready to use"
        />

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: 2.5, mt: 3 }}>
          {shopKits.map((kit) => (
                          <Card
                key={kit.id}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                  overflow: 'hidden',
                  transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 50px rgba(59,130,246,0.15)',
                    borderColor: '#BFDBFE',
                  },
                }}
              >
                {/* Image */}
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="150"
                    image={kit.image}
                    alt={kit.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  {/* Tag badge */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      px: 1.5,
                      py: 0.4,
                      borderRadius: '20px',
                      backgroundColor: kit.tagColor,
                      boxShadow: `0 4px 12px ${kit.tagColor}60`,
                    }}
                  >
                    <Typography sx={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}>
                      {kit.tag}
                    </Typography>
                  </Box>
                  {/* Audience chip */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      px: 1.5,
                      py: 0.4,
                      borderRadius: '20px',
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    <Typography sx={{ color: '#374151', fontSize: '10px', fontWeight: 600 }}>
                      {kit.audience}
                    </Typography>
                  </Box>
                </Box>

                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1F2937', fontSize: '15px', mb: 0.25 }}>
                    {kit.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '12px', mb: 1.5 }}>
                    {kit.subtitle}
                  </Typography>

                  {/* Rating */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Typography sx={{ color: '#F59E0B', fontSize: '14px' }}>★★★★★</Typography>
                    <Typography sx={{ color: '#374151', fontSize: '13px', fontWeight: 600 }}>
                      {kit.rating}
                    </Typography>
                    <Typography sx={{ color: '#9CA3AF', fontSize: '12px' }}>
                      ({kit.reviews} reviews)
                    </Typography>
                  </Box>

                  {/* Features */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6, mb: 1.5, flex: 1 }}>
                    {kit.features.map((feat) => (
                      <Chip
                        key={feat}
                        label={feat}
                        size="small"
                        sx={{
                          fontSize: '11px',
                          backgroundColor: '#F3F4F6',
                          color: '#374141',
                          borderRadius: '6px',
                          height: 22,
                        }}
                      />
                    ))}
                  </Box>

                  {/* Price row */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    <Typography sx={{ fontWeight: 800, color: '#1F2937', fontSize: '17px' }}>
                      {kit.price}
                    </Typography>
                    <Typography
                      sx={{
                        color: '#9CA3AF',
                        fontSize: '14px',
                        textDecoration: 'line-through',
                      }}
                    >
                      {kit.originalPrice}
                    </Typography>
                    <Box
                      sx={{
                        ml: 'auto',
                        px: 1,
                        py: 0.3,
                        borderRadius: 1,
                        backgroundColor: '#ECFDF5',
                      }}
                    >
                      <Typography sx={{ color: '#10B981', fontSize: '11px', fontWeight: 700 }}>
                        SAVE{' '}
                        {Math.round(
                          ((parseInt(kit.originalPrice.replace(/[^0-9]/g, '')) -
                            parseInt(kit.price.replace(/[^0-9]/g, ''))) /
                            parseInt(kit.originalPrice.replace(/[^0-9]/g, ''))) *
                            100
                        )}
                        %
                      </Typography>
                    </Box>
                  </Box>

                  {/* CTA */}
                  <PrimaryButton fullWidth size="medium">
                    Add to Cart
                  </PrimaryButton>
                </CardContent>
              </Card>
          ))}
        </Box>

        {/* Custom package CTA */}
        <Box
          sx={{
            mt: 4,
            p: { xs: 2.5, md: 3.5 },
            borderRadius: 4,
            background: 'linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 100%)',
            border: '1px solid #DBEAFE',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1F2937', mb: 1 }}>
              🎯 Need a Custom Lab Package?
            </Typography>
            <Typography variant="body2" sx={{ color: '#6B7280', lineHeight: 1.65 }}>
              Our experts can design a tailor-made kit bundle based on your curriculum,
              space, student level, and budget. Complete lab setup with installation included.
            </Typography>
          </Box>
          <Box sx={{ flexShrink: 0 }}>
            <PrimaryButton to="/contact" variant="contained" size="large">
              Talk to Our Team
            </PrimaryButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ShopSection;
