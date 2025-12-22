// === DOM elements ===
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const body = document.body;

const langSwitcherBtn = document.getElementById('lang-switcher');
const langSelect = document.getElementById('langSelect');

// Supported languages in order for cycling
const supportedLangs = ['en', 'fr', 'es', 'ar'];

// === Hamburger menu toggle function ===
function toggleMenu() {
  const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!isExpanded));
  navMenu.classList.toggle('show');
  body.classList.toggle('menu-open');
}

// === Keyboard accessible toggle for hamburger ===
hamburger.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleMenu();
  }
});

// Click event for hamburger
hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking a nav link (mobile UX improvement)
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('show')) {
      toggleMenu();
    }
  });
});

// === Language switching function ===
function switchLanguage(lang) {
  if (!supportedLangs.includes(lang)) return;

  // Set <html> lang and direction (rtl for Arabic)
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  // Update visible text content based on data attributes
  document.querySelectorAll('[data-en]').forEach(el => {
    if (el.dataset[lang]) {
      el.textContent = el.dataset[lang];
    }
  });

  // Update language switcher button label
  langSwitcherBtn.textContent = lang.toUpperCase();

  // Update select dropdown value without triggering event
  if (langSelect.value !== lang) {
    langSelect.value = lang;
  }

  // Save preference
  localStorage.setItem('preferredLang', lang);
}

// === Language switcher button (cycles through languages) ===
langSwitcherBtn.addEventListener('click', () => {
  const currentLang = document.documentElement.lang || 'en';
  let currentIndex = supportedLangs.indexOf(currentLang);
  let nextIndex = (currentIndex + 1) % supportedLangs.length;
  switchLanguage(supportedLangs[nextIndex]);
});

// === Language select dropdown ===
langSelect.addEventListener('change', e => {
  switchLanguage(e.target.value);
});

// === Initialize language on page load ===
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferredLang') || 'en';
  switchLanguage(savedLang);
});
