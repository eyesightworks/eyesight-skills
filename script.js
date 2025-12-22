// ================== DOM ELEMENTS ==================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const body = document.body;
const langSelect = document.getElementById('langSelect');

// Supported languages
const supportedLangs = ['en', 'fr', 'es', 'ar'];

// ================== MOBILE MENU ==================
function toggleMenu() {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('show');
  body.classList.toggle('menu-open');
}

// Click
hamburger.addEventListener('click', toggleMenu);

// Keyboard accessibility
hamburger.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleMenu();
  }
});

// Close menu when link clicked (mobile UX)
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('show')) {
      toggleMenu();
    }
  });
});

// ================== LANGUAGE SWITCHING ==================
function switchLanguage(lang) {
  if (!supportedLangs.includes(lang)) return;

  // Set html lang + direction
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  // Update all translatable elements
  document.querySelectorAll('[data-en]').forEach(el => {
    const translation = el.dataset[lang];
    if (translation) {
      el.textContent = translation;
    }
  });

  // Sync select value
  langSelect.value = lang;

  // Save preference
  localStorage.setItem('preferredLang', lang);
}

// Language dropdown change
langSelect.addEventListener('change', e => {
  switchLanguage(e.target.value);
});

// ================== INIT ==================
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferredLang') || 'en';
  switchLanguage(savedLang);
});
