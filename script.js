/* ======================================================
   GLOBAL SITE SCRIPT
   Works on: index, about, portfolio, testimonials,
             contact, thank-you
====================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ================== DOM ELEMENTS ================== */
  const body = document.body;

  // Navigation
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  // Language
  const langSelect = document.getElementById('langSelect');
  const translatableElements = document.querySelectorAll('[data-en]');

  // Contact form
  const contactForm = document.querySelector('form[name="job-contact"]');

  // WhatsApp (thank-you page)
  const whatsappLink = document.getElementById('whatsappLink');

  /* ================== SUPPORTED LANGUAGES ================== */
  const supportedLangs = ['en', 'fr', 'es', 'ar'];

  /* ================== MOBILE MENU ================== */
  function toggleMenu(forceClose = false) {
    if (!hamburger || !navMenu) return;

    const isOpen = navMenu.classList.contains('show');

    if (forceClose || isOpen) {
      navMenu.classList.remove('show');
      body.classList.remove('menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
    } else {
      navMenu.classList.add('show');
      body.classList.add('menu-open');
      hamburger.setAttribute('aria-expanded', 'true');
    }
  }

  // Hamburger click
  if (hamburger) {
    hamburger.addEventListener('click', () => toggleMenu());

    // Keyboard accessibility
    hamburger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });
  }

  // Close menu when a nav link is clicked
  if (navMenu) {
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(true));
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', e => {
    if (
      navMenu &&
      navMenu.classList.contains('show') &&
      !navMenu.contains(e.target) &&
      hamburger &&
      !hamburger.contains(e.target)
    ) {
      toggleMenu(true);
    }
  });

  // Close menu on resize (mobile → desktop)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      toggleMenu(true);
    }
  });

  /* ================== LANGUAGE SWITCHING ================== */
  function switchLanguage(lang) {
    if (!supportedLangs.includes(lang)) return;

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    translatableElements.forEach(el => {
      const text = el.dataset[lang];
      if (text) el.textContent = text;
    });

    if (langSelect) langSelect.value = lang;
    localStorage.setItem('preferredLang', lang);
  }

  if (langSelect) {
    langSelect.addEventListener('change', e => {
      switchLanguage(e.target.value);
    });
  }

  /* ================== CONTACT FORM ================== */
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const name = contactForm.name?.value.trim() || '';
      const role = contactForm.role?.value || '';

      localStorage.setItem('contact_name', name);
      localStorage.setItem('contact_role', role);

      window.location.href = 'thank-you.html';
    });
  }

  /* ================== THANK YOU → WHATSAPP ================== */
  function setupWhatsAppRedirect() {
    if (!window.location.pathname.includes('thank-you')) return;

    const name = localStorage.getItem('contact_name') || '';
    const role = localStorage.getItem('contact_role') || '';
    const phone = '2348083869454'; // WhatsApp (international format)

    const message = encodeURIComponent(
      `Hello, my name is ${name}. I am contacting you regarding: ${role}.`
    );

    const waURL = `https://wa.me/${phone}?text=${message}`;

    if (whatsappLink) {
      whatsappLink.href = waURL;
    }

    setTimeout(() => {
      window.open(waURL, '_blank');
    }, 3000);
  }

  /* ================== INIT ================== */
  const savedLang = localStorage.getItem('preferredLang') || 'en';
  switchLanguage(savedLang);
  setupWhatsAppRedirect();

});
