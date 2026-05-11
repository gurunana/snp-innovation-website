/* ========================================
   CONTACT PAGE — Page 11
   Office info, contact form, social links, map embed.
   All data hardcoded from PDF — never blocks on API failure.
   ======================================== */

import { useState } from 'react';
import {
  Box, Container, Typography, TextField,
  Button, Alert, Snackbar, Card,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SendIcon from '@mui/icons-material/Send';
import PageBanner from '../components/common/PageBanner';

// ── Static data from PDF ─────────────────────────────────────
const CONTACT_INFO = {
  phone: '+91-XXXX-XXX-XXXX',
  email: 'info@snpinnovation.com',
  address: 'SNP Innovation Pvt. Ltd., Mumbai, Maharashtra, India',
  hours: 'Monday – Friday: 9:00 AM – 6:00 PM IST',
};

const OFFICES = [
  { city: 'Mumbai', label: 'Head Office', address: 'Mumbai, Maharashtra' },
  { city: 'Pune',   label: 'West India',   address: 'Pune, Maharashtra' },
  { city: 'Delhi',  label: 'North India',  address: 'New Delhi' },
  { city: 'Bangalore', label: 'South India', address: 'Bengaluru, Karnataka' },
];

const SOCIAL_LINKS = [
  { label: 'LinkedIn',  href: 'https://linkedin.com/company/snp-innovation',  icon: <LinkedInIcon />,  color: '#0A66C2' },
  { label: 'Facebook',  href: 'https://facebook.com/snpinnovation',            icon: <FacebookIcon />,  color: '#1877F2' },
  { label: 'Instagram', href: 'https://instagram.com/snpinnovation',           icon: <InstagramIcon />, color: '#E4405F' },
  { label: 'YouTube',   href: 'https://youtube.com/@snpinnovation',            icon: <YouTubeIcon />,   color: '#FF0000' },
];

// ── Contact form ─────────────────────────────────────────────
const ContactForm = () => {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await new Promise((res) => setTimeout(res, 800)); // replace with real API
      setSuccess(true);
      setForm({ fullName: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {/* CSS Grid for reliable responsive columns */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2.5, mb: 2.5 }}>
        <TextField
          name="fullName" label="Full Name *" value={form.fullName}
          onChange={handleChange} fullWidth required variant="outlined"
        />
        <TextField
          name="email" label="Email Address *" type="email" value={form.email}
          onChange={handleChange} fullWidth required variant="outlined"
        />
        <TextField
          name="phone" label="Phone Number" type="tel" value={form.phone}
          onChange={handleChange} fullWidth variant="outlined"
        />
        <TextField
          name="subject" label="Subject *" value={form.subject}
          onChange={handleChange} fullWidth required variant="outlined"
        />
        <Box sx={{ gridColumn: '1 / -1' }}>
          <TextField
            name="message" label="Message *" value={form.message}
            onChange={handleChange} fullWidth required multiline rows={5} variant="outlined"
          />
        </Box>
      </Box>
      <Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit" variant="contained" size="large" disabled={submitting}
              endIcon={<SendIcon />}
              sx={{
                background: 'linear-gradient(135deg,#1A3A8F,#2D5BE3)',
                color: 'white', px: 5, py: 1.5, borderRadius: '10px',
                fontWeight: 700, textTransform: 'none', fontSize: '15px',
                '&:hover': { opacity: 0.9 },
              }}
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </Button>
          </Box>
        </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Snackbar
        open={success}
        autoHideDuration={5000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccess(false)} sx={{ width: '100%' }}>
          Message sent! We will get back to you within 24 hours.
        </Alert>
      </Snackbar>
    </Box>
  );
};

// ── Main page ────────────────────────────────────────────────
const ContactPage = () => {
  return (
    <Box>
      <PageBanner
        title="CONTACT US — WE ARE HERE TO HELP"
        subtitle="Reach out to our team for any questions about our services, partnerships, or careers. We respond within 24 hours."
        bgImage="/images/gallery/headers/ContactUsHeader.png"
      />

      {/* ── Contact details + form ── */}
      <Box sx={{ py: { xs: 4, md: 7 }, backgroundColor: '#F8FAFC' }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
              gap: { xs: 5, md: 8 },
              alignItems: 'flex-start',
            }}
          >

            {/* Left: contact info */}
            <Box>
              <Typography
                sx={{ color: '#CC2020', fontWeight: 700, letterSpacing: '2px', fontSize: '12px', mb: 1 }}
              >
                REACH US
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: '26px', md: '34px' }, color: '#0F172A', mb: 2 }}>
                Get in Touch
              </Typography>
              <Typography sx={{ color: '#64748B', fontSize: '16px', lineHeight: 1.75, mb: 4 }}>
                Whether you are an institution, enterprise, startup, or individual — our team is ready to assist you. Fill in the form or use the contact details below.
              </Typography>

              {/* Info list */}
              {[
                { icon: <LocationOnIcon />, label: 'Address', value: CONTACT_INFO.address },
                { icon: <PhoneIcon />,      label: 'Phone',   value: CONTACT_INFO.phone },
                { icon: <EmailIcon />,      label: 'Email',   value: CONTACT_INFO.email },
                { icon: <AccessTimeIcon />, label: 'Hours',   value: CONTACT_INFO.hours },
              ].map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    display: 'flex', alignItems: 'flex-start', gap: 2.5,
                    p: 2.5, mb: 2, borderRadius: '14px',
                    background: 'white', border: '1px solid #E2E8F0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <Box
                    sx={{
                      width: 44, height: 44, borderRadius: '12px',
                      background: 'linear-gradient(135deg,#1A3A8F,#2D5BE3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, color: 'white',
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', letterSpacing: '1px', mb: 0.3 }}>
                      {item.label.toUpperCase()}
                    </Typography>
                    <Typography sx={{ color: '#334155', fontSize: '14px', lineHeight: 1.6 }}>
                      {item.value}
                    </Typography>
                  </Box>
                </Box>
              ))}

              {/* Social links */}
              <Typography sx={{ fontWeight: 700, fontSize: '14px', color: '#0F172A', mt: 3, mb: 2 }}>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                {SOCIAL_LINKS.map((s) => (
                  <Box
                    key={s.label}
                    component="a"
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      width: 44, height: 44, borderRadius: '10px',
                      background: s.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white',
                      transition: 'transform 0.2s ease, opacity 0.2s ease',
                      '&:hover': { transform: 'translateY(-3px)', opacity: 0.9 },
                      '& svg': { fontSize: 20 },
                    }}
                  >
                    {s.icon}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Right: contact form */}
            <Box>
              <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0' }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
                  Send Us a Message
                </Typography>
                <Typography sx={{ color: '#64748B', fontSize: '14px', mb: 4 }}>
                  Fill in the details below and we will respond within 24 business hours.
                </Typography>
                <ContactForm />
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── Regional offices ── HIDDEN per user request
      <Box sx={{ py: { xs: 3, md: 5 }, backgroundColor: 'white' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 4 } }}>
            <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: '24px', md: '32px' }, color: '#0F172A', mb: 1 }}>
              Our Offices
            </Typography>
            <Typography sx={{ color: '#64748B', fontSize: '15px' }}>
              Presence across major cities in India
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 3,
            }}
          >
            {OFFICES.map((office) => (
              <Box
                key={office.city}
                sx={{
                  p: 3, borderRadius: '16px', textAlign: 'center',
                  background: 'linear-gradient(135deg,#F8FAFC,#EFF6FF)',
                  border: '1px solid #E2E8F0',
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 32px rgba(30,64,175,0.12)' },
                }}
              >
                <Box
                  sx={{
                    width: 48, height: 48, borderRadius: '12px',
                    background: 'linear-gradient(135deg,#1A3A8F,#2D5BE3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    mx: 'auto', mb: 2, color: 'white',
                  }}
                >
                  <LocationOnIcon />
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#0F172A', mb: 0.5 }}>
                  {office.city}
                </Typography>
                <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#CC2020', letterSpacing: '1px', mb: 1 }}>
                  {office.label.toUpperCase()}
                </Typography>
                <Typography sx={{ color: '#64748B', fontSize: '13px' }}>
                  {office.address}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
      */}

      {/* ── Map embed placeholder ── */}
      <Box sx={{ height: { xs: '280px', md: '400px' }, position: 'relative' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0831968765935!2d72.83227!3d19.05860!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edb1%3A0x5716f362921f67a2!2sMumbai!5e0!3m2!1sen!2sin!4v1234567890"
          title="SNP Innovation Mumbai"
          width="100%"
          height="100%"
          style={{ border: 0, display: 'block' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Box>
    </Box>
  );
};

export default ContactPage;
