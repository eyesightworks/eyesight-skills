// ===============================
// Hamburger Menu Toggle
// ===============================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// Close menu on link click (mobile fix)
document.querySelectorAll(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
  });
});


// ===============================
// Language Switcher
// ===============================
const langSwitcher = document.getElementById("lang-switcher");
const html = document.documentElement;
const languages = ["en", "fr", "es", "ar"];
let currentLangIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("preferredLang");
  if (savedLang && languages.includes(savedLang)) {
    currentLangIndex = languages.indexOf(savedLang);
    switchLanguage(savedLang);
  }
});

langSwitcher.addEventListener("click", () => {
  currentLangIndex = (currentLangIndex + 1) % languages.length;
  const lang = languages[currentLangIndex];
  switchLanguage(lang);
  localStorage.setItem("preferredLang", lang);
});

function switchLanguage(lang) {
  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";
  langSwitcher.textContent = lang.toUpperCase();
}


// ===============================
// Hire Me Modal
// ===============================
const hireBtn = document.getElementById("hire-me-btn");
const modal = document.getElementById("hire-modal");
const closeModal = document.querySelector(".modal .close");

if (hireBtn && modal) {
  hireBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}


// ===============================
// Hire Me Form (Email Sender)
// ===============================
const hireForm = document.getElementById("hire-form");

if (hireForm) {
  hireForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("hire-name").value.trim();
    const email = document.getElementById("hire-email").value.trim();
    const message = document.getElementById("hire-message").value.trim();

    const mailtoLink =
      `mailto:eyesightconcept@gmail.com` +
      `?subject=Hire Me – Message from ${encodeURIComponent(name)}` +
      `&body=${encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + message
      )}`;

    window.location.href = mailtoLink;

    modal.style.display = "none";
  });
}
