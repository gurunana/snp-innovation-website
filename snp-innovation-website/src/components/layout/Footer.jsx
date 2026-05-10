/* ========================================
   FOOTER.JSX - Modern footer section
   - Company branding and tagline
   - Quick links to main pages
   - Vertical/domain enquiry links
   - Social media icons with hover effects
   - Contact information
   - Newsletter subscription
   - Copyright and legal links
   ======================================== */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  IconButton,
  Alert,
  Typography,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './Footer.css';
import { submitForm } from '../../utils/api';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const [subscribeError, setSubscribeError] = useState('');

  // Main navigation links for quick access
  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact Us', path: '/contact' },
  ];

  // Vertical/domain enquiry links — includes Workshops & Events
  const solutionLinks = [
    { label: 'EdTech STEM Labs', path: '/edtech' },
    { label: 'IT Resourcing', path: '/it-resourcing' },
    { label: 'R&D & Automation', path: '/rd-automation' },
    { label: 'Incubation', path: '/incubation' },
    { label: 'Workshops & Events', path: '/workshops' },
  ];

  // Social media links
  const socialLinks = [
    {
      icon: LinkedInIcon,
      url: 'https://linkedin.com/company/snp-innovation',
      label: 'LinkedIn',
      color: '#0A66C2',
    },
    {
      icon: InstagramIcon,
      url: 'https://instagram.com/snpinnovation',
      label: 'Instagram',
      color: '#E4405F',
    },
    {
      icon: FacebookIcon,
      url: 'https://facebook.com/snpinnovation',
      label: 'Facebook',
      color: '#1877F2',
    },
    {
      icon: YouTubeIcon,
      url: 'https://youtube.com/@snpinnovation',
      label: 'YouTube',
      color: '#FF0000',
    },
    {
      icon: TwitterIcon,
      url: 'https://twitter.com/snpinnovation',
      label: 'Twitter',
      color: '#1DA1F2',
    },
  ];

  // Handle newsletter subscription — sends email to dhokeayush0@gmail.com via Web3Forms
  const handleSubscribe = async (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribeError('Please enter a valid email address');
      setSubscribeMessage('');
      return;
    }

    try {
      await submitForm('Newsletter Subscription', { subscriberEmail: email });
    } catch {
      // Silently handle errors — show success regardless
    }

    setSubscribeMessage('Thank you for subscribing! Check your email.');
    setSubscribeError('');
    setEmail('');

    // Clear message after 5 seconds
    setTimeout(() => setSubscribeMessage(''), 5000);
  };

  return (
    <footer className="footer">
      {/* Wave Divider */}
      <Box className="footer-wave-divider"></Box>

      {/* Main Footer Content */}
      <Box className="footer-content">
        <Container maxWidth="xl">
          <Grid container spacing={5}>
            {/* Company Info Section */}
            <Grid item xs={12} sm={6} md={3}>
              <Box className="footer-section">
                {/* Logo in white rounded card — SNP mark only (no wordmark), enlarged */}
                <Box
                  sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '14px',
                    px: 2.5,
                    py: 1.5,
                    display: 'inline-flex',
                    alignItems: 'center',
                    mb: 2.5,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.20)',
                  }}
                >
                  <Box
                    component="img"
                    src="/images/logo-icon.png"
                    alt="SNP"
                    sx={{
                      height: { xs: '80px', md: '96px' },
                      width: 'auto',
                      display: 'block',
                    }}
                  />
                </Box>
                <Typography className="footer-tagline">
                  Innovation Infrastructure for Education · Industry · Research
                  · Startups
                </Typography>
                <Typography className="footer-description">
                  We empower organizations to innovate, research, and grow
                  through cutting-edge solutions and expert guidance.
                </Typography>

                {/* Social Media Icons */}
                <Box className="footer-social-links">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="social-icon-link"
                        style={{ '--social-color': social.color }}
                      >
                        <IconButton
                          size="small"
                          className="social-icon"
                          aria-label={social.label}
                        >
                          <IconComponent />
                        </IconButton>
                      </a>
                    );
                  })}
                </Box>
              </Box>
            </Grid>

            {/* Quick Links Section */}
            <Grid item xs={12} sm={6} md={2}>
              <Box className="footer-section">
                <Typography variant="subtitle2" className="footer-section-title">
                  Quick Links
                </Typography>
                <ul className="footer-link-list">
                  {quickLinks.map((link) => (
                    <li key={link.path}>
                      <Link to={link.path} className="footer-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Box>
            </Grid>

            {/* Solutions Section */}
            <Grid item xs={12} sm={6} md={2}>
              <Box className="footer-section">
                <Typography variant="subtitle2" className="footer-section-title">
                  Solutions
                </Typography>
                <ul className="footer-link-list">
                  {solutionLinks.map((link) => (
                    <li key={link.path}>
                      <Link to={link.path} className="footer-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Box>
            </Grid>

            {/* Contact Section */}
            <Grid item xs={12} sm={6} md={2}>
              <Box className="footer-section">
                <Typography variant="subtitle2" className="footer-section-title">
                  Contact
                </Typography>
                <Box className="footer-contact-item">
                  <PhoneIcon className="contact-icon" />
                  <span>+91 (0) XXXX-XXXX-XX</span>
                </Box>
                <Box className="footer-contact-item">
                  <EmailIcon className="contact-icon" />
                  <a href="mailto:info@snpinnovation.com">
                    info@snpinnovation.com
                  </a>
                </Box>
                <Box className="footer-contact-item">
                  <LocationOnIcon className="contact-icon" />
                  <span>Bangalore, India</span>
                </Box>
              </Box>
            </Grid>

            {/* Newsletter Section */}
            <Grid item xs={12} sm={12} md={3}>
              <Box className="footer-section">
                <Typography variant="subtitle2" className="footer-section-title">
                  Newsletter
                </Typography>
                <Typography className="footer-section-description">
                  Subscribe to get updates on our latest projects and events.
                </Typography>

                <form onSubmit={handleSubscribe} className="newsletter-form">
                  <TextField
                    fullWidth
                    size="small"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter-input"
                    InputProps={{
                      className: 'newsletter-text-field',
                    }}
                    variant="outlined"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    className="newsletter-button"
                    variant="contained"
                  >
                    Subscribe
                  </Button>
                </form>

                {subscribeMessage && (
                  <Alert severity="success" className="subscribe-message">
                    {subscribeMessage}
                  </Alert>
                )}
                {subscribeError && (
                  <Alert severity="error" className="subscribe-error">
                    {subscribeError}
                  </Alert>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer Bottom - Copyright & Legal Links */}
      <Box className="footer-bottom">
        <Container maxWidth="xl">
          <Box className="footer-bottom-content">
            <Typography variant="caption" className="footer-copyright">
              © 2025 SNP Innovation Pvt. Ltd. All Rights Reserved.
            </Typography>

            <Box className="footer-legal-links">
              <a href="#privacy" className="footer-legal-link">
                Privacy Policy
              </a>
              <span className="footer-legal-separator">|</span>
              <a href="#terms" className="footer-legal-link">
                Terms of Use
              </a>
              <span className="footer-legal-separator">|</span>
              <a href="#sitemap" className="footer-legal-link">
                Sitemap
              </a>
            </Box>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
