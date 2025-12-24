/* ======================================================
   GLOBAL SITE JS — PREMIUM & ACCESSIBLE
====================================================== */

document.documentElement.classList.add("js-enabled");

document.addEventListener("DOMContentLoaded", () => {
  /* ================= NAV / HAMBURGER ================= */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("primary-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("show");
      hamburger.setAttribute("aria-expanded", isOpen);
    });

    // Close menu after clicking a link (mobile UX)
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("show");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ================= ACTIVE NAV LINK ================= */
  const currentPage = location.pathname.split("/").pop();
  document.querySelectorAll(".nav-menu a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  /* ================= LANGUAGE SWITCHER ================= */
  const langSelect = document.getElementById("langSelect");
  const translatable = document.querySelectorAll("[data-en]");

  function setLanguage(lang) {
    translatable.forEach(el => {
      const value = el.dataset[lang];
      if (value) el.textContent = value;
    });

    // Handle RTL for Arabic
    if (lang === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "ar");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.setAttribute("lang", lang);
    }

    localStorage.setItem("siteLang", lang);
  }

