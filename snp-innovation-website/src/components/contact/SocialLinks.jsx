/* ========================================
   SOCIAL LINKS - Display social media links with icons
   Shows LinkedIn, Twitter, Facebook, Instagram, YouTube links

   Props:
   - socialLinks (array): Array of social media objects with platform and url
======================================== */

import { Box, IconButton, Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SectionHeader from '../common/SectionHeader';

const SocialLinks = ({ socialLinks = [] }) => {
  // Hardcoded social links if none provided
  const defaultSocialLinks = [
    {
      id: 1,
      platform: 'LinkedIn',
      url: 'https://linkedin.com/company/snp-innovation',
      icon: LinkedInIcon,
    },
    {
      id: 2,
      platform: 'Twitter',
      url: 'https://twitter.com/SNPInnovation',
      icon: TwitterIcon,
    },
    {
      id: 3,
      platform: 'Facebook',
      url: 'https://facebook.com/SNPInnovation',
      icon: FacebookIcon,
    },
    {
      id: 4,
      platform: 'Instagram',
      url: 'https://instagram.com/snpinnovation',
      icon: InstagramIcon,
    },
    {
      id: 5,
      platform: 'YouTube',
      url: 'https://youtube.com/@SNPInnovation',
      icon: YouTubeIcon,
    },
  ];

  const links = socialLinks.length > 0 ? socialLinks : defaultSocialLinks;

  return (
    <Box className="py-16">
      {/* Section Header */}
      <SectionHeader
        title="Follow Us"
        subtitle="Stay updated with our latest news and announcements"
      />

      {/* Social Links */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 3,
          flexWrap: 'wrap',
        }}
      >
        {links.map((link) => {
          const IconComponent = link.icon;
          return (
            <Box key={link.id} className="text-center">
              <IconButton
                component="a"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  width: 56,
                  height: 56,
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'var(--color-primary-dark)',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <IconComponent sx={{ fontSize: 24 }} />
              </IconButton>
              <Typography variant="caption" className="block mt-2">
                {link.platform}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SocialLinks;
