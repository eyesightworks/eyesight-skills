document.addEventListener('DOMContentLoaded', () => {
  // Enable CSS animations for JS-enabled browsers
  document.documentElement.classList.add('js-enabled');

  // DOM Elements
  const body = document.body;
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const langSelect = document.getElementById('langSelect');
  const translatableElements = document.querySelectorAll('[data-en]');
  const contactForm = document.getElementById('contactForm');
  const whatsappLink = document.getElementById('whatsappLink');

  // Supported languages
  const supportedLangs = ['en', 'fr', 'es', 'ar'];

  // Toggle mobile menu open/close
  const toggleMenu = (forceClose = false) => {
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
  };

  // Hamburger click and keyboard interaction
  if (hamburger) {
    hamburger.addEventListener('click', () => toggleMenu());
    hamburger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });
  }

  // Close menu if clicking outside
  document.addEventListener('click', e => {
    if (
      navMenu &&
      navMenu.classList.contains('show') &&
      !navMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      toggleMenu(true);
    }
  });

  // Close menu on window resize if desktop width
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) toggleMenu(true);
  });

  // Close menu when nav link clicked (mobile)
  navMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(true));
  });

  // Language switching logic
  const switchLanguage = lang => {
    if (!supportedLangs.includes(lang)) return;

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    translatableElements.forEach(el => {
      if (el.dataset[lang]) el.textContent = el.dataset[lang];
    });

    if (langSelect) langSelect.value = lang;
    localStorage.setItem('preferredLang', lang);
  };

  // Language selector change event
  langSelect?.addEventListener('change', e => switchLanguage(e.target.value));

  // Contact form validation and micro-animation on submit
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const name = contactForm.name?.value.trim() || '';
      const email = contactForm.email?.value.trim() || '';
      const message = contactForm.message?.value.trim() || '';

      if (!name || !email || !message) {
        alert('Please fill all fields');
        return;
      }

      localStorage.setItem('contact_name', name);
      localStorage.setItem('contact_email', email);
      localStorage.setItem('contact_message', message);

      const submitBtn = contactForm.querySelector('button[type="submit"]') || contactForm.querySelector('.btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '✔ Sent!';
        submitBtn.style.transition = 'all 0.4s ease';
        submitBtn.style.backgroundColor = '#00c9a7';
      }

      setTimeout(() => {
        window.location.href = 'thank-you.html';
      }, 800);
    });
  }

  // Setup WhatsApp redirect on thank-you page
  const setupWhatsAppRedirect = () => {
    if (!window.location.pathname.includes('thank-you')) return;

    const name = localStorage.getItem('contact_name') || '';
    const message = localStorage.getItem('contact_message') || '';
    const phone = '2348083869454';
    const waURL = `https://wa.me/${phone}?text=${encodeURIComponent(`Hello, my name is ${name}. ${message}`)}`;

    if (whatsappLink) whatsappLink.href = waURL;

    setTimeout(() => window.open(waURL, '_blank'), 3000);
  };

  // Highlight active nav link based on current URL
  const setActiveNavLink = () => {
    const currentPage = window.location.pathname.split('/').pop();

    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === currentPage);
    });
  };

  // Initialize everything
  const savedLang = localStorage.getItem('preferredLang') || 'en';
  switchLanguage(savedLang);
  setupWhatsAppRedirect();
  setActiveNavLink();
});
