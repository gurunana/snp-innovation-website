/* ========================================
   CONTACT FORM - General contact form for inquiries
   Handles name, email, subject, message submission
   Uses EnquiryForm component internally for consistent styling

   Props:
   - onSubmit (function): Callback when form is submitted
======================================== */

import EnquiryForm from '../common/EnquiryForm';
import SectionHeader from '../common/SectionHeader';
import { Box } from '@mui/material';
import { submitForm } from '../../utils/api';

const ContactForm = ({ onSubmit }) => {
  // Form fields for general contact
  const contactFields = [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Your name',
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'your.email@example.com',
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      required: false,
      placeholder: '+91-XXXX-XXX-XXXX',
    },
    {
      name: 'subject',
      label: 'Subject',
      type: 'text',
      required: true,
      placeholder: 'What is your inquiry about?',
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: true,
      placeholder: 'Tell us more about your inquiry...',
      rows: 6,
    },
  ];

  // Handle form submission — sends data to dhokeayush0@gmail.com via Web3Forms
  const handleFormSubmit = async (formData) => {
    await submitForm('Contact Form', formData);
    if (onSubmit) onSubmit(formData);
  };

  return (
    <Box className="py-16">
      {/* Section Header */}
      <SectionHeader
        title="Send us a Message"
        subtitle="We would love to hear from you. Fill the form below and we will get back to you soon."
      />

      {/* Contact Form */}
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <EnquiryForm
          fields={contactFields}
          onSubmit={handleFormSubmit}
          buttonText="Send Message"
        />
      </div>
    </Box>
  );
};

export default ContactForm;
