/* ========================================
   scrollAnimations.js — Global Scroll Reveal

   Call initScrollAnimations() once at app boot.
   It sets up an IntersectionObserver that watches
   any element with className "reveal" or "reveal-left"
   and adds "is-visible" when it enters the viewport.

   A MutationObserver re-scans when new DOM elements
   are added (e.g. React renders new cards).
   ======================================== */

export const initScrollAnimations = () => {
  // The observer that triggers the CSS transition
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  // Observe all existing .reveal elements
  const observeAll = () => {
    document.querySelectorAll('.reveal, .reveal-left').forEach((el) => {
      // Skip elements already visible
      if (!el.classList.contains('is-visible')) {
        revealObserver.observe(el);
      }
    });
  };

  observeAll();

  // Watch for new DOM nodes (React dynamic renders)
  const mutationObserver = new MutationObserver(() => {
    observeAll();
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Cleanup helper (optional, for HMR)
  return () => {
    revealObserver.disconnect();
    mutationObserver.disconnect();
  };
};
