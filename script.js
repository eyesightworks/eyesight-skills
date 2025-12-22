// =====================================
// SAFE DOM HELPER
// =====================================
function $(id) {
  return document.getElementById(id);
}

document.addEventListener("DOMContentLoaded", () => {
  // === MOBILE HAMBURGER MENU ===
  const hamburger = $("hamburger");
  const navMenu = $("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("show");
      document.body.classList.toggle("menu-open", isOpen);
      hamburger.setAttribute("aria-expanded", isOpen);
    });

    // Close menu when any nav link clicked (mobile UX)
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("show");
        document.body.classList.remove("menu-open");
        hamburger.setAttribute("aria-expanded", false);
      });
    });
  }

  // === MULTI-LANGUAGE SYSTEM ===
  const html = document.documentElement;
  const supportedLangs = ["en", "fr", "es", "ar"];
  const defaultLang = "en";

  function switchLanguage(lang) {
    if (!supportedLangs.includes(lang)) lang = defaultLang;

    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";

    // Update all elements with language data attributes
    document.querySelectorAll("[data-en]").forEach(el => {
      const text = el.dataset[lang];
      if (text) el.textContent = text;
    });

    // Update language controls
    if (langSwitcher) langSwitcher.textContent = lang.toUpperCase();
    if (langSelect) langSelect.value = lang;

    localStorage.setItem("preferredLang", lang);
  }

  // Detect saved or browser language on load
  const savedLang = localStorage.getItem("preferredLang");
  const browserLang = navigator.language.slice(0, 2);
  const initialLang = savedLang && supportedLangs.includes(savedLang)
    ? savedLang
    : supportedLangs.includes(browserLang)
    ? browserLang
    : defaultLang;

  switchLanguage(initialLang);

  // Language switcher button (cycle languages)
  const langSwitcher = $("lang-switcher");
  if (langSwitcher) {
    langSwitcher.addEventListener("click", () => {
      const current = html.lang || defaultLang;
      const index = supportedLangs.indexOf(current);
      const nextLang = supportedLangs[(index + 1) % supportedLangs.length];
      switchLanguage(nextLang);
    });
  }

  // Language dropdown selector
  const langSelect = $("langSelect");
  if (langSelect) {
    langSelect.addEventListener("change", e => {
      switchLanguage(e.target.value);
    });
  }

  // === CONTACT FORM – RESUME AUTO SELECTOR ===
  const roleSelect = $("role");
  const resumeField = $("resume_used") || $("resume_link");

  if (roleSelect && resumeField) {
    const resumeMap = {
      "Frontend Developer": "https://eyesightworks.com/recruiter/resume-frontend.pdf",
      "Junior Backend Developer": "https://eyesightworks.com/recruiter/resume-backend.pdf",
      "Python / AI Junior": "https://eyesightworks.com/recruiter/resume-ai.pdf",
      "Freelance Project": "https://eyesightworks.com/recruiter/resume-general.pdf"
    };

    roleSelect.addEventListener("change", e => {
      resumeField.value = resumeMap[e.target.value] || "";
    });
  }

  // === CONTACT FORM – TIMESTAMP (ATS TRACKING) ===
  const submittedAt = $("submitted_at");
  if (submittedAt) {
    submittedAt.value = new Date().toISOString();
  }

  // === PORTFOLIO FILTERING ===
  const filterButtons = document.querySelectorAll(".portfolio-filters button");
  const portfolioItems = document.querySelectorAll(".portfolio-grid .card");

  if (filterButtons.length && portfolioItems.length) {
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");
        portfolioItems.forEach(item => {
          item.style.display = (filter === "all" || item.classList.contains(filter)) ? "block" : "none";
        });
      });
    });
  }
});
