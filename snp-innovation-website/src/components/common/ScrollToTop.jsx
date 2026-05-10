/* ========================================
   SCROLL TO TOP - Utility component for route changes
   Automatically scrolls page to top when route changes
   Place inside BrowserRouter, before Route components

   Usage:
   <BrowserRouter>
     <ScrollToTop />
     <Routes>
       ...
     </Routes>
   </BrowserRouter>
   ======================================== */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top smoothly when route changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  // This component doesn't render anything
  return null;
};

export default ScrollToTop;
