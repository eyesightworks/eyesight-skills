/* ======================================================
   GLOBAL SITE JAVASCRIPT 
====================================================== */

(function () {
  'use strict';

  /* ================= JS ENABLED ================= */
  document.documentElement.classList.add('js-enabled');

  /* ================= NAV / HAMBURGER ================= */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('primary-menu');
  const navLinks = navMenu?.querySelectorAll('a');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('show');
      hamburger.setAttribute('aria-expanded', isOpen.toString());
    });

    /* Close menu when a link is clicked (mobile UX) */
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          navMenu.classList.remove('show');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* ================= ACTIVE NAV LINK ================= */
  const currentPage = location.pathname.split('/').pop();

  navLinks?.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  /* ================= LANGUAGE SWITCH ================= */
  const langSelect = document.getElementById('langSelect');
  const translatableEls = document.querySelectorAll('[data-en]');

  function setLanguage(lang) {
    translatableEls.forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) el.textContent = text;
    });

    /* Handle RTL for Arabic */
    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', lang);
    }

    localStorage.setItem('siteLanguage', lang);
  }

  if (langSelect) {
    const savedLang = localStorage.getItem('siteLanguage') || 'en';
    langSelect.value = savedLang;
    setLanguage(savedLang);

    langSelect.addEventListener('change', e => {
      setLanguage(e.target.value);
    });
  }

  /* ================= CLOSE MENU ON RESIZE ================= */
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && navMenu?.classList.contains('show')) {
      navMenu.classList.remove('show');
      hamburger?.setAttribute('aria-expanded', 'false');
    }
  });

})();
