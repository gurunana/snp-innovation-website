/* ========================================
   STEM ENQUIRY FORM - Lab enquiry form
   All fields from PDF Section 3.12
   Standalone form (no dependency on EnquiryForm common)
   ======================================== */

import { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  TextField,
  MenuItem,
  Alert,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
// Grid import removed — using CSS Grid via Box instead
import SectionHeader from '../common/SectionHeader';
import PrimaryButton from '../common/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { submitEdtechEnquiry, resetEnquiryForm } from '../../store/slices/edtechSlice';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MapIcon from '@mui/icons-material/Map';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotesIcon from '@mui/icons-material/Notes';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Initial form state — defined outside component, no logic in JSX
const initialForm = {
  institutionName: '',
  contactPerson: '',
  designation: '',
  email: '',
  phone: '',
  city: '',
  state: '',
  institutionType: '',
  studentCount: '',
  labArea: '',
  budgetRange: '',
  requirements: '',
  callbackDate: '',
};

const institutionTypeOptions = [
  'CBSE School',
  'ICSE School',
  'IGCSE / International School',
  'Government School (ATL)',
  'Senior Secondary School',
  'Engineering College',
  'Polytechnic / Diploma Institute',
  'University / Research Institute',
  'Skill Development Centre',
  'Other',
];

const budgetRangeOptions = [
  'Below ₹10 Lakhs',
  '₹10 – 25 Lakhs',
  '₹25 – 50 Lakhs',
  '₹50 Lakhs – 1 Crore',
  'Above ₹1 Crore',
  'CSR / Government Funded',
];

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    backgroundColor: '#fff',
    transition: 'all 0.2s ease',
    '&:hover fieldset': { borderColor: '#2D5BE3' },
    '&.Mui-focused fieldset': { borderColor: '#2D5BE3', borderWidth: 2 },
  },
  '& label.Mui-focused': { color: '#2D5BE3' },
};

const StemEnquiryForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialForm);
  const [localSuccess, setLocalSuccess] = useState(false);

  const submissionStatus = useSelector((state) => state.edtech.enquiry.submissionStatus);
  const submissionError = useSelector((state) => state.edtech.enquiry.submissionError);

  const isLoading = submissionStatus === 'loading';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitEdtechEnquiry(formData))
      .unwrap()
      .then(() => {
        setLocalSuccess(true);
        setFormData(initialForm);
        setTimeout(() => {
          setLocalSuccess(false);
          dispatch(resetEnquiryForm());
        }, 4000);
      })
      .catch(() => {
        // Error handled via Redux state — form stays rendered
      });
  };

  return (
    <Box
      sx={{
        py: { xs: 4, md: 7 },
        background: 'linear-gradient(160deg, #F8FAFC 0%, #EFF6FF 100%)',
      }}
    >
      <Container maxWidth="xl">
        <SectionHeader
          title="Enquire About Our STEM Labs"
          subtitle="Fill in the form and our team will reach out within 24 hours with a customised proposal for your institution"
        />

        <Box
          sx={{
            maxWidth: 900,
            mx: 'auto',
            mt: 6,
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            backgroundColor: '#fff',
            boxShadow: '0 24px 60px rgba(59,130,246,0.1)',
            border: '1px solid #DBEAFE',
          }}
        >
          {/* Success alert */}
          {localSuccess && (
            <Alert
              severity="success"
              sx={{ mb: 4, borderRadius: 2 }}
              onClose={() => setLocalSuccess(false)}
            >
              Thank you! Your enquiry has been submitted. Our team will contact you within 24 hours.
            </Alert>
          )}

          {/* Error alert — never blocks form render */}
          {submissionStatus === 'failed' && submissionError && (
            <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
              {typeof submissionError === 'string'
                ? submissionError
                : submissionError?.message || 'Could not submit enquiry. Please try again or call us directly.'}
            </Alert>
          )}

          {/* CSS Grid form — 2 equal columns on sm+, 1 column on xs.
              No MUI Grid — avoids v9 column-prop issues.
              Full-width fields use gridColumn: '1 / -1'             */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 3,
              }}
            >
              {/* Institution Name — full width */}
              <Box sx={{ gridColumn: '1 / -1' }}>
                <TextField
                  fullWidth
                  required
                  label="Institution Name"
                  name="institutionName"
                  value={formData.institutionName}
                  onChange={handleChange}
                  placeholder="e.g. Delhi Public School, RK Puram"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessIcon sx={{ color: '#2D5BE3', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputStyles}
                />
              </Box>

              {/* Contact Person */}
              <TextField
                fullWidth required
                label="Contact Person"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                placeholder="Your full name"
                InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon sx={{ color: '#2D5BE3', fontSize: 20 }} /></InputAdornment> }}
                sx={inputStyles}
              />

              {/* Designation */}
              <TextField
                fullWidth required
                label="Designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="e.g. Principal, STEM Coordinator"
                InputProps={{ startAdornment: <InputAdornment position="start"><WorkIcon sx={{ color: '#2D5BE3', fontSize: 20 }} /></InputAdornment> }}
                sx={inputStyles}
              />

              {/* Email */}
              <TextField
                fullWidth required
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="principal@school.edu.in"
                InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: '#2D5BE3', fontSize: 20 }} /></InputAdornment> }}
                sx={inputStyles}
              />

              {/* Phone */}
              <TextField
                fullWidth required
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon sx={{ color: '#2D5BE3', fontSize: 20 }} /></InputAdornment> }}
                sx={inputStyles}
              />

              {/* City */}
              <TextField
                fullWidth required
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Mumbai"
                InputProps={{ startAdornment: <InputAdornment position="start"><LocationCityIcon sx={{ color: '#2D5BE3', fontSize: 20 }} /></InputAdornment> }}
                sx={inputStyles}
              />

              {/* State */}
              <TextField
                fullWidth required
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="e.g. Maharashtra"
                InputProps={{ startAdornment: <InputAdornment position="start"><MapIcon sx={{ color: '#2D5BE3', fontSize: 20 }} /></InputAdornment> }}
                sx={inputStyles}
              />

              {/* Institution Type */}
              <TextField
                fullWidth required select
                label="Institution Type"
                name="institutionType"
                value={formData.institutionType}
                onChange={handleChange}
                InputProps={{ startAdornment: <InputAdornment position="start"><SchoolIcon sx={{ color: '#2D5BE3', fontSize: 20 }} /></InputAdornment> }}
                sx={inputStyles}
              >
                <MenuItem value="" disabled>Select institution type</MenuItem>
                {institutionTypeOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>

              {/* Number of Students */}
              <TextField
                fullWidth required
                label="No. of Students"
                name="studentCount"
                type="number"
                value={formData.studentCount}
                onChange={handleChange}
                placeholder="e.g. 500"
                InputProps={{ startAdornment: <InputAdornment position="start"><GroupsIcon sx={{ color: '#2D5BE3', fontSize: 20 }} /></InputAdornment> }}
                sx={inputStyles}
              />

              {/* Lab Area */}
              <TextField
                fullWidth
                label="Area Available for Lab (sq.ft.)"
                name="labArea"
                value={formData.labArea}
                onChange={handleChange}
                placeholder="e.g. 1200"
                InputProps={{ startAdornment: <InputAdornment position="start"><SquareFootIcon sx={{ color: '#2D5BE3', fontSize: 20 }} /></InputAdornment> }}
                sx={inputStyles}
              />

              {/* Budget Range */}
              <TextField
                fullWidth select
                label="Budget Range"
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                InputProps={{ startAdornment: <InputAdornment position="start"><AccountBalanceWalletIcon sx={{ color: '#2D5BE3', fontSize: 20 }} /></InputAdornment> }}
                sx={inputStyles}
              >
                <MenuItem value="" disabled>Select budget range</MenuItem>
                {budgetRangeOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>

              {/* Preferred Callback Date */}
              <TextField
                fullWidth
                label="Preferred Callback Date"
                name="callbackDate"
                type="date"
                value={formData.callbackDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                InputProps={{ startAdornment: <InputAdornment position="start"><CalendarTodayIcon sx={{ color: '#2D5BE3', fontSize: 20 }} /></InputAdornment> }}
                sx={inputStyles}
              />

              {/* Specific Requirements — full width */}
              <Box sx={{ gridColumn: '1 / -1' }}>
                <TextField
                  fullWidth multiline rows={4}
                  label="Specific Requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="Describe your STEM goals, any specific technologies you're interested in, or any questions you have…"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                        <NotesIcon sx={{ color: '#2D5BE3', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputStyles}
                />
              </Box>

              {/* Submit — full width */}
              <Box sx={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <PrimaryButton
                  type="submit"
                  size="large"
                  disabled={isLoading}
                  sx={{ px: 8, py: 1.8, fontSize: '16px', minWidth: 220 }}
                >
                  {isLoading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <CircularProgress size={18} sx={{ color: '#fff' }} />
                      Submitting…
                    </Box>
                  ) : (
                    'Submit Enquiry'
                  )}
                </PrimaryButton>
                <Typography variant="caption" sx={{ color: '#9CA3AF', textAlign: 'center', maxWidth: 440 }}>
                  We respect your privacy. Your information is used only to respond to your enquiry
                  and will not be shared with third parties.
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Contact alternatives */}
          <Box
            sx={{
              mt: 5,
              pt: 4,
              borderTop: '1px solid #E5E7EB',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
              justifyContent: 'center',
            }}
          >
            {[
              { icon: '📞', label: 'Call Us', value: '+91 98765 43210' },
              { icon: '📧', label: 'Email Us', value: 'info@snpinnovation.in' },
              { icon: '🌐', label: 'Visit Us', value: 'www.snpinnovation.in' },
            ].map((contact) => (
              <Box key={contact.label} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography sx={{ fontSize: 22 }}>{contact.icon}</Typography>
                <Box>
                  <Typography sx={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600 }}>
                    {contact.label}
                  </Typography>
                  <Typography sx={{ fontSize: '14px', color: '#1F2937', fontWeight: 600 }}>
                    {contact.value}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default StemEnquiryForm;
