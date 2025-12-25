/* ======================================================
   CONTACT PAGE SCRIPT — PREMIUM
   Features:
   - Contact form validation
   - Success overlay animation
   - 4-language support
   - Particle background animation
   - Redirect after submission
====================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const successOverlay = document.querySelector(".success-overlay");
  const langSelect = document.getElementById("langSelect");
  const contactPage = document.querySelector(".contact-page");

  /* ================= LANGUAGE SWITCHER ================= */
  const SUPPORTED_LANGS = ["en", "fr", "es", "ar"];

  function applyLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) lang = "en";

    document.querySelectorAll("[data-en]").forEach(el => {
      const text = el.dataset[lang];
      if (text) el.textContent = text;
    });

    if (lang === "ar") {
      contactPage.setAttribute("dir", "rtl");
      contactPage.setAttribute("lang", "ar");
    } else {
      contactPage.setAttribute("dir", "ltr");
      contactPage.setAttribute("lang", lang);
    }

    localStorage.setItem("siteLang", lang);
    langSelect.value = lang;
  }

  langSelect.addEventListener("change", e => {
    applyLanguage(e.target.value);
  });

  // Apply saved language on load
  applyLanguage(localStorage.getItem("siteLang") || "en");

  /* ================= FORM SUBMISSION ================= */
  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert("Please fill all fields");
      return;
    }

    // Save data to localStorage (optional)
    localStorage.setItem("contact_name", name);
    localStorage.setItem("contact_message", message);

    // Show success overlay
    successOverlay.classList.add("show");

    // Redirect after 3 seconds
    setTimeout(() => {
      window.location.href = "thank-you.html";
    }, 3000);
  });

  /* ================= PARTICLE BACKGROUND ================= */
  const canvas = document.getElementById("particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let w, h;
  const mouse = { x: null, y: null };

  const particles = Array.from({ length: 50 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.002,
    vy: (Math.random() - 0.5) * 0.002
  }));

  function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function animateParticles() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      const px = p.x * w;
      const py = p.y * h;

      // Mouse interaction
      if (mouse.x !== null) {
        p.x += (mouse.x / w - p.x) * 0.002;
        p.y += (mouse.y / h - p.y) * 0.002;
      }

      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x > 1) p.x = 0;
      if (p.x < 0) p.x = 1;
      if (p.y > 1) p.y = 0;
      if (p.y < 0) p.y = 1;

      ctx.fillStyle = "rgba(0,201,167,0.4)";
      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animateParticles);
  }

  window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("resize", resizeCanvas);

  resizeCanvas();
  animateParticles();
});
