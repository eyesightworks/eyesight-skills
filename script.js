/* ======================================================
   GLOBAL SITE JS — PREMIUM & ACCESSIBLE
====================================================== */

(function () {
  "use strict";

  /* ================= JS ENABLED FLAG ================= */
  document.documentElement.classList.add("js-enabled");

  /* ================= NAV / HAMBURGER ================= */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    // Toggle menu
    hamburger.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("show");
      hamburger.setAttribute("aria-expanded", isOpen);
    });

    // Close menu when clicking a link (mobile UX)
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("show");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu when pressing ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        navMenu.classList.remove("show");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ================= ACTIVE LINK HIGHLIGHT ================= */
  const currentPath = window.location.pathname.replace("/", "");

  document.querySelectorAll(".nav-menu a").forEach(link => {
    const linkPath = link.getAttribute("href")?.replace("/", "");

    if (
      linkPath === currentPath ||
      (linkPath === "index.html" && currentPath === "")
    ) {
      link.classList.add("active");
    }
  });

  /* ================= OPTIONAL: AUTO-SET YEAR ================= */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();
