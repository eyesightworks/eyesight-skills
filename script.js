// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  navLinks.classList.toggle('show');
});

// Keyboard accessible toggle (Enter or Space)
hamburger.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    hamburger.click();
  }
});

// Language switching
const langSelect = document.getElementById("langSelect");

function switchLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-en]").forEach(el => {
    if (el.dataset[lang]) {
      el.textContent = el.dataset[lang];
    }
  });
}

// Initialize language on load
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("preferredLang") || "en";
  langSelect.value = savedLang;
  switchLanguage(savedLang);
});

// When user changes language selection
langSelect.addEventListener("change", (e) => {
  const lang = e.target.value;
  switchLanguage(lang);
  localStorage.setItem("preferredLang", lang);
});
