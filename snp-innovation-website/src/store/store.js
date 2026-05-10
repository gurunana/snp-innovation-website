/* ========================================
   REDUX STORE CONFIGURATION
   Central store that combines all slices
   ======================================== */
import { configureStore } from '@reduxjs/toolkit';
import homeSlice from './slices/homeSlice';
import aboutSlice from './slices/aboutSlice';
import edtechSlice from './slices/edtechSlice';
import itResourcingSlice from './slices/itResourcingSlice';
import rdSlice from './slices/rdSlice';
import incubationSlice from './slices/incubationSlice';
import workshopsSlice from './slices/workshopsSlice';
import gallerySlice from './slices/gallerySlice';
import careersSlice from './slices/careersSlice';
import enquirySlice from './slices/enquirySlice';
import contactSlice from './slices/contactSlice';

const store = configureStore({
  reducer: {
    home: homeSlice,
    about: aboutSlice,
    edtech: edtechSlice,
    itResourcing: itResourcingSlice,
    rd: rdSlice,
    incubation: incubationSlice,
    workshops: workshopsSlice,
    gallery: gallerySlice,
    careers: careersSlice,
    enquiry: enquirySlice,
    contact: contactSlice,
  },
});

export default store;
