// =====================================
// SAFE DOM HELPER
// =====================================
function $(id) {
  return document.getElementById(id);
}

// =====================================
// MOBILE HAMBURGER MENU
// =====================================
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = $("hamburger");
  const navMenu = $("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("show");
      document.body.classList.toggle("menu-open"); // Prevent background scroll when menu open
    });

    // Close menu when any link is clicked (mobile UX fix)
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("show");
        document.body.classList.remove("menu-open");
      });
    });
  }
});

// =====================================
// MULTI-LANGUAGE SYSTEM (EN / FR / ES / AR)
// =====================================
const html = document.documentElement;
const supportedLangs = ["en", "fr", "es", "ar"];
const defaultLang = "en";

function switchLanguage(lang) {
  if (!supportedLangs.includes(lang)) lang = defaultLang;

  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";

  // Update text content for elements with data attributes
  document.querySelectorAll("[data-en]").forEach(el => {
    const text = el.dataset[lang];
    if (text) el.textContent = text;
  });

  // Update language switcher button and dropdown
  const langBtn = $("lang-switcher");
  const langSelect = $("langSelect");

  if (langBtn) langBtn.textContent = lang.toUpperCase();
  if (langSelect) langSelect.value = lang;

  localStorage.setItem("preferredLang", lang);
}

// Auto-detect saved language or browser default on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("preferredLang");
  const browserLang = navigator.language.slice(0, 2);

  const lang =
    savedLang && supportedLangs.includes(savedLang)
      ? savedLang
      : supportedLangs.includes(browserLang)
      ? browserLang
      : defaultLang;

  switchLanguage(lang);
});

// Language switcher button (cycles through supported languages)
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

// =====================================
// CONTACT FORM – RESUME AUTO SELECTOR
// =====================================
document.addEventListener("DOMContentLoaded", () => {
  const roleSelect = $("role");
  const resumeField = $("resume_used") || $("resume_link");

  if (!roleSelect || !resumeField) return;

  const resumeMap = {
    "Frontend Developer": "https://eyesightworks.com/recruiter/resume-frontend.pdf",
    "Junior Backend Developer": "https://eyesightworks.com/recruiter/resume-backend.pdf",
    "Python / AI Junior": "https://eyesightworks.com/recruiter/resume-ai.pdf",
    "Freelance Project": "https://eyesightworks.com/recruiter/resume-general.pdf"
  };

  roleSelect.addEventListener("change", e => {
    resumeField.value = resumeMap[e.target.value] || "";
  });
});

// =====================================
// CONTACT FORM – TIMESTAMP (ATS TRACKING)
// =====================================
document.addEventListener("DOMContentLoaded", () => {
  const submittedAt = $("submitted_at");
  if (submittedAt) {
    submittedAt.value = new Date().toISOString();
  }
});

// =====================================
// PORTFOLIO FILTERING
// =====================================
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".portfolio-filters button");
  const portfolioItems = document.querySelectorAll(".portfolio-grid .card");

  if (!filterButtons.length || !portfolioItems.length) return;

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove 'active' class from all buttons
      filterButtons.forEach(btn => btn.classList.remove("active"));
      // Add 'active' to clicked button
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      portfolioItems.forEach(item => {
        if (filter === "all" || item.classList.contains(filter)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});
