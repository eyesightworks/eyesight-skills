/* ======================================================
   GLOBAL SITE JS — PREMIUM, ACCESSIBLE (FINAL CLEAN)
   Features:
   - Progressive enhancement
   - Accessible mobile navigation
   - Active nav highlighting
   - Multi-language support (EN / FR / ES / AR)
   - RTL handling for Arabic
   - Language persistence via localStorage
====================================================== */

/* Enable JS-enhanced styles */
document.documentElement.classList.add("js-enabled");

/* ================= GLOBAL CONFIG ================= */
const SUPPORTED_LANGS = ["en", "fr", "es", "ar"];

/* ================= GLOBAL STATE ================= */
const state = {
  lang: SUPPORTED_LANGS.includes(localStorage.getItem("siteLang"))
    ? localStorage.getItem("siteLang")
    : "en"
};

/* ================= UTILITIES ================= */
function setAttributes(element, attributes = {}) {
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

/* ================= NAV / HAMBURGER ================= */
function initHamburgerMenu() {
  const hamburger = document.querySelector("[data-hamburger]");
  const navMenu = document.querySelector("[data-nav-menu]");

  if (!hamburger || !navMenu) return;

  function closeMenu() {
    navMenu.classList.remove("show");
    hamburger.setAttribute("aria-expanded", "false");
  }

  hamburger.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("show");
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  /* Close menu when a link is clicked (mobile UX) */
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  /* Close menu with ESC key (accessibility) */
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

/* ================= ACTIVE NAV LINK ================= */
function initActiveNavLink() {
  const currentPage =
    location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll("[data-nav-menu] a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

/* ================= LANGUAGE HANDLING ================= */
function applyLanguage(lang) {
  /* Safety fallback */
  if (!SUPPORTED_LANGS.includes(lang)) {
    lang = "en";
  }

  const translatableElements =
    document.querySelectorAll("[data-en]");

  translatableElements.forEach(el => {
    const translatedText = el.dataset[lang];
    if (typeof translatedText === "string") {
      el.textContent = translatedText;
    }
  });

  /* RTL handling for Arabic */
  if (lang === "ar") {
    setAttributes(document.documentElement, {
      dir: "rtl",
      lang: "ar"
    });
  } else {
    setAttributes(document.documentElement, {
      dir: "ltr",
      lang
    });
  }

  state.lang = lang;
  localStorage.setItem("siteLang", lang);
}

/* ================= LANGUAGE SWITCHER ================= */
function initLanguageSwitcher() {
  const langSelect =
    document.querySelector("[data-lang-select]");

  if (!langSelect) return;

  /* Populate only supported languages */
  langSelect.value = state.lang;
  applyLanguage(state.lang);

  langSelect.addEventListener("change", event => {
    applyLanguage(event.target.value);
  });
}

/* ================= INIT APP ================= */
document.addEventListener("DOMContentLoaded", () => {
  initHamburgerMenu();
  initActiveNavLink();
  initLanguageSwitcher();
});
