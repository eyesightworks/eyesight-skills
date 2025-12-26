/* ======================================================
   CONTACT PAGE SCRIPT — FINAL & SYNCED
   - Uses same language system as global script.js
   - Supports EN / FR / ES / AR
   - RTL support for Arabic
   - Success animation
   - Redirects to thank-you.html
====================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const successOverlay = document.querySelector(".success-overlay");
  const pageRoot = document.documentElement;

  /* ================= LANGUAGE SUPPORT ================= */
  const SUPPORTED_LANGS = ["en", "fr", "es", "ar"];
  let currentLang = localStorage.getItem("siteLang") || "en";

  function applyLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) lang = "en";

    document.querySelectorAll("[data-en]").forEach(el => {
      const text = el.dataset[lang];
      if (text) el.textContent = text;
    });

    if (lang === "ar") {
      pageRoot.setAttribute("dir", "rtl");
      pageRoot.setAttribute("lang", "ar");
    } else {
      pageRoot.setAttribute("dir", "ltr");
      pageRoot.setAttribute("lang", lang);
    }

    currentLang = lang;
  }

  // Apply saved language on load
  applyLanguage(currentLang);

  /* ================= FORM SUBMISSION ================= */
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert({
        en: "Please fill all fields",
        fr: "Veuillez remplir tous les champs",
        es: "Por favor complete todos los campos",
        ar: "يرجى ملء جميع الحقول"
      }[currentLang]);
      return;
    }

    // Save (optional)
    localStorage.setItem("contact_name", name);
    localStorage.setItem("contact_message", message);

    // Show success animation
    successOverlay.classList.add("show");

    // Redirect to thank-you page
    setTimeout(() => {
      window.location.href = "thank-you.html";
    }, 1800);
  });

  /* ================= PARTICLE BACKGROUND ================= */
  const canvas = document.getElementById("particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  const mouse = { x: null, y: null };

  const particles = Array.from({ length: 40 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.002,
    vy: (Math.random() - 0.5) * 0.002
  }));

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      const px = p.x * width;
      const py = p.y * height;

      if (mouse.x !== null) {
        p.x += (mouse.x / width - p.x) * 0.002;
        p.y += (mouse.y / height - p.y) * 0.002;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x > 1) p.x = 0;
      if (p.x < 0) p.x = 1;
      if (p.y > 1) p.y = 0;
      if (p.y < 0) p.y = 1;

      ctx.fillStyle = "rgba(0,201,167,0.35)";
      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("resize", resize);

  resize();
  animate();
});
