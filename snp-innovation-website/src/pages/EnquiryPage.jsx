/* ========================================
   ENQUIRY HUB PAGE — Page 10
   Tabbed forms for all 4 verticals.
   All form fields hardcoded from PDF — never blocks on API failure.
   ======================================== */

import { useState } from 'react';
import {
  Box, Container, Typography, Tab, Tabs, Grid,
  TextField, MenuItem, Button, Alert, Snackbar,
} from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import ComputerIcon from '@mui/icons-material/Computer';
import EngineeringIcon from '@mui/icons-material/Engineering';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SendIcon from '@mui/icons-material/Send';
import PageBanner from '../components/common/PageBanner';

// ── Tab config ──────────────────────────────────────────────
const TABS = [
  { label: 'EdTech & STEM Labs',        icon: <ScienceIcon />,       color: '#1A3A8F' },
  { label: 'IT Resourcing',             icon: <ComputerIcon />,      color: '#15803D' },
  { label: 'R&D & Automation',          icon: <EngineeringIcon />,   color: '#7E22CE' },
  { label: 'Incubation & Startups',     icon: <RocketLaunchIcon />,  color: '#C2410C' },
];

// ── Field definitions per vertical ──────────────────────────
const FIELDS = {
  0: [
    { name: 'institutionName',  label: 'Institution Name',          type: 'text',   required: true },
    { name: 'contactPerson',    label: 'Contact Person Name',       type: 'text',   required: true },
    { name: 'email',            label: 'Email Address',             type: 'email',  required: true },
    { name: 'phone',            label: 'Phone Number',              type: 'tel',    required: true },
    { name: 'city',             label: 'City / Location',           type: 'text',   required: true },
    { name: 'studentCount',     label: 'Estimated Student Count',   type: 'number', required: false },
    { name: 'labType',          label: 'Lab Type of Interest',      type: 'select', required: true,
      options: ['AI / ML Lab', 'Robotics Lab', 'IoT Lab', 'Electronics Lab', 'Game Dev Lab', 'Not Sure Yet'] },
    { name: 'message',          label: 'Additional Message',        type: 'textarea', required: false },
  ],
  1: [
    { name: 'companyName',      label: 'Company Name',              type: 'text',   required: true },
    { name: 'contactPerson',    label: 'Contact Person Name',       type: 'text',   required: true },
    { name: 'email',            label: 'Email Address',             type: 'email',  required: true },
    { name: 'phone',            label: 'Phone Number',              type: 'tel',    required: true },
    { name: 'serviceType',      label: 'Service Type',              type: 'select', required: true,
      options: ['Dedicated Team', 'Project-Based Engagement', 'Staff Augmentation', 'Technology Consulting', 'QA / Testing'] },
    { name: 'techStack',        label: 'Required Skills / Tech Stack', type: 'textarea', required: false },
    { name: 'budget',           label: 'Approximate Budget Range',  type: 'text',   required: false },
    { name: 'projectDetails',   label: 'Project Details',           type: 'textarea', required: false },
  ],
  2: [
    { name: 'projectTitle',     label: 'Project Title',             type: 'text',   required: true },
    { name: 'orgName',          label: 'Organization Name',         type: 'text',   required: true },
    { name: 'contactPerson',    label: 'Contact Person Name',       type: 'text',   required: true },
    { name: 'email',            label: 'Email Address',             type: 'email',  required: true },
    { name: 'phone',            label: 'Phone Number',              type: 'tel',    required: true },
    { name: 'sector',           label: 'Industry Sector',           type: 'select', required: true,
      options: ['AgriTech', 'HealthTech', 'CleanEnergy', 'Manufacturing', 'Environmental', 'Other'] },
    { name: 'serviceNeeded',    label: 'Service Required',          type: 'select', required: true,
      options: ['Hardware Design', 'Software Development', 'Industrial Automation', 'IP / Patents', 'Technology Consulting'] },
    { name: 'description',      label: 'Project Description',       type: 'textarea', required: true },
  ],
  3: [
    { name: 'startupName',      label: 'Startup / Idea Name',       type: 'text',   required: true },
    { name: 'founderNames',     label: 'Founder Name(s)',           type: 'text',   required: true },
    { name: 'email',            label: 'Email Address',             type: 'email',  required: true },
    { name: 'phone',            label: 'Phone Number',              type: 'tel',    required: true },
    { name: 'sector',           label: 'Sector / Industry',         type: 'text',   required: true },
    { name: 'stage',            label: 'Current Stage',             type: 'select', required: true,
      options: ['Idea Stage', 'MVP Ready', 'Early Traction', 'Pre-Series A', 'Series A Ready'] },
    { name: 'fundingNeeded',    label: 'Funding Needed (₹)',        type: 'text',   required: false },
    { name: 'description',      label: 'Brief Description of Idea / Problem', type: 'textarea', required: true },
  ],
};

// ── Build empty form state from field definitions ────────────
const buildEmptyForm = (fields) => {
  const obj = {};
  fields.forEach((f) => { obj[f.name] = ''; });
  return obj;
};

// ── Single enquiry form ──────────────────────────────────────
const EnquiryForm = ({ tabIndex, accentColor }) => {
  const fields = FIELDS[tabIndex];
  const [formData, setFormData]       = useState(() => buildEmptyForm(fields));
  const [submitting, setSubmitting]   = useState(false);
  const [success, setSuccess]         = useState(false);
  const [error, setError]             = useState('');

  // Reset form when tab changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      // Replace with real API call when backend is ready
      await new Promise((res) => setTimeout(res, 800));
      setSuccess(true);
      setFormData(buildEmptyForm(fields));
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (field) => {
    const commonProps = {
      key: field.name,
      name: field.name,
      label: field.label + (field.required ? ' *' : ''),
      value: formData[field.name],
      onChange: handleChange,
      fullWidth: true,
      variant: 'outlined',
      size: 'medium',
      sx: {
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: accentColor,
        },
        '& .MuiInputLabel-root.Mui-focused': { color: accentColor },
      },
    };

    if (field.type === 'select') {
      return (
        <Grid item xs={12} sm={6} key={field.name}>
          <TextField select {...commonProps} required={field.required}>
            <MenuItem value=""><em>Select an option</em></MenuItem>
            {field.options.map((opt) => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </TextField>
        </Grid>
      );
    }

    if (field.type === 'textarea') {
      return (
        <Grid item xs={12} key={field.name}>
          <TextField
            {...commonProps}
            multiline
            rows={4}
            required={field.required}
            type="text"
          />
        </Grid>
      );
    }

    return (
      <Grid item xs={12} sm={6} key={field.name}>
        <TextField {...commonProps} type={field.type} required={field.required} />
      </Grid>
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2.5}>
        {fields.map((field) => renderField(field))}

        {/* Submit button */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={submitting}
              endIcon={<SendIcon />}
              sx={{
                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}CC)`,
                color: 'white',
                px: 5,
                py: 1.5,
                borderRadius: '10px',
                fontWeight: 700,
                textTransform: 'none',
                fontSize: '15px',
                '&:hover': { opacity: 0.9 },
              }}
            >
              {submitting ? 'Submitting...' : 'Submit Enquiry'}
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Error message */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
      )}

      {/* Success snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={5000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccess(false)} sx={{ width: '100%' }}>
          Enquiry submitted successfully! Our team will reach out within 24 hours.
        </Alert>
      </Snackbar>
    </Box>
  );
};

// ── Main page ────────────────────────────────────────────────
const EnquiryPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  const currentTab = TABS[activeTab];

  return (
    <Box>
      <PageBanner
        title="ENQUIRY HUB — TELL US WHAT YOU NEED"
        subtitle="Whether you need a STEM lab, IT talent, R&D support, or startup mentorship — fill in the form below and our team will respond within 24 hours."
      />

      <Box sx={{ py: { xs: 3, md: 6 }, backgroundColor: '#F8FAFC' }}>
        <Container maxWidth="xl">

          {/* Section header */}
          <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
            <Typography
              sx={{ color: '#CC2020', fontWeight: 700, letterSpacing: '2px', fontSize: '12px', mb: 1 }}
            >
              GET IN TOUCH
            </Typography>
            <Typography
              variant="h2"
              sx={{ fontWeight: 800, fontSize: { xs: '26px', md: '36px' }, color: '#0F172A', mb: 2 }}
            >
              Submit Your Enquiry
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 560, mx: 'auto', fontSize: '16px', mb: 3 }}>
              Choose your area of interest and fill in the details. We will connect you with the right team.
            </Typography>
            <Box
              sx={{ width: 56, height: 4, background: 'linear-gradient(90deg,#1A3A8F,#CC2020)', borderRadius: 2, mx: 'auto' }}
            />
          </Box>

          {/* Tab navigation */}
          <Box
            sx={{
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ borderBottom: '1px solid #E2E8F0' }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  '& .MuiTab-root': {
                    py: 2.5,
                    px: 3,
                    fontWeight: 600,
                    fontSize: '14px',
                    textTransform: 'none',
                    color: '#64748B',
                    minHeight: '64px',
                    gap: 1,
                  },
                  '& .Mui-selected': { color: currentTab.color + ' !important', fontWeight: 700 },
                  '& .MuiTabs-indicator': { backgroundColor: currentTab.color, height: '3px' },
                }}
              >
                {TABS.map((tab, i) => (
                  <Tab key={i} label={tab.label} icon={tab.icon} iconPosition="start" />
                ))}
              </Tabs>
            </Box>

            {/* Form area */}
            <Box sx={{ p: { xs: 3, md: 5 } }}>
              {/* Tab description */}
              <Box
                sx={{
                  mb: 4,
                  p: 2.5,
                  borderRadius: '12px',
                  background: `${currentTab.color}0D`,
                  border: `1px solid ${currentTab.color}33`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 44, height: 44,
                    borderRadius: '10px',
                    background: currentTab.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    color: 'white',
                  }}
                >
                  {currentTab.icon}
                </Box>
                <Typography sx={{ color: '#334155', fontSize: '15px', fontWeight: 500 }}>
                  {activeTab === 0 && "Fill in your institution details and we will design the perfect STEM lab for your students."}
                  {activeTab === 1 && "Tell us your technology requirements and we will match you with the right talent and teams."}
                  {activeTab === 2 && "Describe your project and our R&D experts will get back to you with a solution roadmap."}
                  {activeTab === 3 && "Share your startup idea and our incubation team will evaluate your application within 3 business days."}
                </Typography>
              </Box>

              {/* Render the form for the active tab */}
              <EnquiryForm key={activeTab} tabIndex={activeTab} accentColor={currentTab.color} />
            </Box>
          </Box>

          {/* Bottom info strip */}
          <Grid container spacing={3} sx={{ mt: 5 }}>
            {[
              { icon: '⏱️', title: '24-Hour Response', desc: 'Our team responds to all enquiries within one business day.' },
              { icon: '🔒', title: 'Confidential', desc: 'Your enquiry details are kept strictly confidential.' },
              { icon: '📞', title: 'Direct Connect', desc: 'Prefer a call? Reach us at info@snpinnovation.com' },
            ].map((item, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <Box
                  sx={{
                    p: 3, textAlign: 'center', background: 'white',
                    borderRadius: '14px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                  }}
                >
                  <Typography sx={{ fontSize: '28px', mb: 1 }}>{item.icon}</Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: '15px', color: '#0F172A', mb: 0.5 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: '#64748B', fontSize: '13px', lineHeight: 1.6 }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

        </Container>
      </Box>
    </Box>
  );
};

export default EnquiryPage;
