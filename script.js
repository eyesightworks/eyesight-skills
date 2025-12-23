/* ======================================================
   GLOBAL SITE SCRIPT
   Works on: index, portfolio, testimonial, contact, thank-you
====================================================== */

/* ================== DOM ELEMENTS ================== */
const body = document.body;

// Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

// Language
const langSelect = document.getElementById('langSelect');
const translatableElements = document.querySelectorAll('[data-en]');

// Contact form (only exists on contact.html)
const contactForm = document.querySelector('form[name="job-contact"]');

// WhatsApp link (thank-you page)
const whatsappLink = document.getElementById('whatsappLink');

/* ================== SUPPORTED LANGUAGES ================== */
const supportedLangs = ['en', 'fr', 'es', 'ar'];

/* ================== MOBILE MENU ================== */
function toggleMenu() {
  if (!hamburger || !navMenu) return;

  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('show');
  body.classList.toggle('menu-open');
}

// Click
if (hamburger) {
  hamburger.addEventListener('click', toggleMenu);

  // Keyboard accessibility
  hamburger.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });
}

// Close menu after clicking a link (mobile UX)
if (navMenu) {
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show')) {
        toggleMenu();
      }
    });
  });
}

/* ================== LANGUAGE SWITCHING ================== */
function switchLanguage(lang) {
  if (!supportedLangs.includes(lang)) return;

  // Set HTML attributes
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  // Translate text
  translatableElements.forEach(el => {
    const text = el.dataset[lang];
    if (text) el.textContent = text;
  });

  // Sync dropdown
  if (langSelect) langSelect.value = lang;

  // Save preference
  localStorage.setItem('preferredLang', lang);
}

// Language dropdown
if (langSelect) {
  langSelect.addEventListener('change', e => {
    switchLanguage(e.target.value);
  });
}

/* ================== CONTACT FORM ================== */
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const role = contactForm.role?.value || '';
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    // Save data for thank-you page
    localStorage.setItem('contact_name', name);
    localStorage.setItem('contact_role', role);

    // Redirect to thank-you page
    window.location.href = 'thank-you.html';
  });
}

/* ================== THANK YOU → WHATSAPP ================== */
function setupWhatsAppRedirect() {
  if (!window.location.pathname.includes('thank-you')) return;

  const name = localStorage.getItem('contact_name') || '';
  const role = localStorage.getItem('contact_role') || '';
  const phone = '2348083869454'; // your WhatsApp number

  const message = encodeURIComponent(
    `Hello, my name is ${name}. I am contacting you regarding: ${role}.`
  );

  const waURL = `https://wa.me/${phone}?text=${message}`;

  if (whatsappLink) {
    whatsappLink.href = waURL;
  }

  // Auto open WhatsApp after 3 seconds
  setTimeout(() => {
    window.open(waURL, '_blank');
  }, 3000);
}

/* ================== INIT ================== */
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferredLang') || 'en';
  switchLanguage(savedLang);
  setupWhatsAppRedirect();
});
