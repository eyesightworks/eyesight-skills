/* ======================================================
   GLOBAL SITE SCRIPT — CLEAN + PREMIUM
   Pages: index, about, portfolio, testimonials,
          contact, thank-you
====================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* ================== ENABLE JS MODE ================== */
  document.documentElement.classList.add('js-enabled');

  /* ================== DOM ELEMENTS ================== */
  const body = document.body;
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const langSelect = document.getElementById('langSelect');
  const translatableElements = document.querySelectorAll('[data-en]');
  const contactForm = document.getElementById('contactForm');
  const whatsappLink = document.getElementById('whatsappLink');

  /* ================== SUPPORTED LANGUAGES ================== */
  const SUPPORTED_LANGS = ['en', 'fr', 'es', 'ar'];

  /* ================== MOBILE MENU ================== */
  const openMenu = () => {
    navMenu.classList.add('show');
    body.classList.add('menu-open');
    hamburger.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    navMenu.classList.remove('show');
    body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = () => {
    navMenu.classList.contains('show') ? closeMenu() : openMenu();
  };

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', toggleMenu);

    hamburger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', e => {
      if (
        navMenu.classList.contains('show') &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        closeMenu();
      }
    });

    // Auto-close on desktop resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) closeMenu();
    });

    // Close menu when clicking links
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ================== LANGUAGE SWITCHING ================== */
  const switchLanguage = lang => {
    if (!SUPPORTED_LANGS.includes(lang)) return;

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    translatableElements.forEach(el => {
      if (el.dataset[lang]) {
        el.textContent = el.dataset[lang];
      }
    });

    localStorage.setItem('preferredLang', lang);
    if (langSelect) langSelect.value = lang;
  };

  langSelect?.addEventListener('change', e => {
    switchLanguage(e.target.value);
  });

  /* ================== CONTACT FORM ================== */
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const name = contactForm.name?.value.trim();
      const email = contactForm.email?.value.trim();
      const message = contactForm.message?.value.trim();

      if (!name || !email || !message) {
        alert('Please fill all fields');
        return;
      }

      // Save values
      localStorage.setItem('contact_name', name);
      localStorage.setItem('contact_email', email);
      localStorage.setItem('contact_message', message);

      // Premium success micro-animation
      const submitBtn = contactForm.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '✔ Sent';
        submitBtn.style.backgroundColor = '#00c9a7';
        submitBtn.style.transform = 'scale(1.05)';
      }

      setTimeout(() => {
        window.location.href = 'thank-you.html';
      }, 900);
    });
  }

  /* ================== THANK YOU → WHATSAPP ================== */
  const setupWhatsAppRedirect = () => {
    if (!location.pathname.includes('thank-you')) return;

    const name = localStorage.getItem('contact_name') || '';
    const message = localStorage.getItem('contact_message') || '';
    const phone = '2348083869454';

    const waURL = `https://wa.me/${phone}?text=${encodeURIComponent(
      `Hello, my name is ${name}. ${message}`
    )}`;

    if (whatsappLink) whatsappLink.href = waURL;

    setTimeout(() => {
      window.open(waURL, '_blank', 'noopener');
    }, 3000);
  };

  /* ================== ACTIVE NAV LINK ================== */
  const setActiveNavLink = () => {
    const currentPage = location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === currentPage
      );
    });
  };

  /* ================== INIT ================== */
  switchLanguage(localStorage.getItem('preferredLang') || 'en');
  setupWhatsAppRedirect();
  setActiveNavLink();
});
