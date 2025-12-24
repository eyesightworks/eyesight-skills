/* ======================================================
   GLOBAL SITE JS — PREMIUM, ACCESSIBLE
====================================================== */

/* Enable JS-enhanced styles */
document.documentElement.classList.add("js-enabled");

/* ================= GLOBAL STATE ================= */
const state = {
  lang: localStorage.getItem("siteLang") || "en"
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

  hamburger.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("show");
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Close menu when a link is clicked (mobile UX)
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

/* ================= ACTIVE NAV LINK ================= */
function initActiveNavLink() {
  const currentPage = location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll("[data-nav-menu] a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

/* ================= LANGUAGE HANDLING ================= */
function applyLanguage(lang) {
  const translatableElements = document.querySelectorAll("[data-en]");

  translatableElements.forEach(el => {
    const translatedText = el.dataset[lang];
    if (typeof translatedText === "string") {
      el.textContent = translatedText;
    }
  });

  // Handle RTL for Arabic
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

function initLanguageSwitcher() {
  const langSelect = document.querySelector("[data-lang-select]");

  if (!langSelect) return;

  langSelect.value = state.lang;
  applyLanguage(state.lang);

  langSelect.addEventListener("change", e => {
    applyLanguage(e.target.value);
  });
}

/* ================= INIT APP ================= */
document.addEventListener("DOMContentLoaded", () => {
  initHamburgerMenu();
  initActiveNavLink();
  initLanguageSwitcher();
});
