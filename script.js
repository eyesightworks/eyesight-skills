// ================== DOM ELEMENTS ==================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const body = document.body;
const langSelect = document.getElementById('langSelect');

// Buttons
const viewResumeBtn = document.getElementById('viewResumeBtn');
const downloadCVBtn = document.getElementById('downloadCVBtn');
const linkedinBtn = document.getElementById('linkedinBtn');

// Contact form
const contactForm = document.querySelector('form[name="job-contact"]');
const roleSelect = contactForm ? contactForm.role : null;

// Supported languages
const supportedLangs = ['en', 'fr', 'es', 'ar'];

// Button translations
const btnText = {
  viewResume: { en: "View Resume", fr: "Voir le CV", es: "Ver CV", ar: "عرض السيرة الذاتية" },
  downloadCV: { en: "Download CV (PDF)", fr: "Télécharger le CV (PDF)", es: "Descargar CV (PDF)", ar: "تحميل السيرة الذاتية (PDF)" },
  linkedin: { en: "LinkedIn Profile", fr: "Profil LinkedIn", es: "Perfil de LinkedIn", ar: "حساب لينكدإن" }
};

// ================== MOBILE MENU ==================
function toggleMenu() {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('show');
  body.classList.toggle('menu-open');
}

hamburger.addEventListener('click', toggleMenu);
hamburger.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleMenu();
  }
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('show')) toggleMenu();
  });
});

// ================== LANGUAGE SWITCHING ==================
function updateButtons(lang) {
  if (viewResumeBtn) viewResumeBtn.textContent = btnText.viewResume[lang];
  if (downloadCVBtn) downloadCVBtn.textContent = btnText.downloadCV[lang];
  if (linkedinBtn) linkedinBtn.textContent = btnText.linkedin[lang];
}

function switchLanguage(lang) {
  if (!supportedLangs.includes(lang)) return;

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-en]').forEach(el => {
    const translation = el.dataset[lang];
    if (translation) el.textContent = translation;
  });

  updateButtons(lang);

  if (langSelect) langSelect.value = lang;
  localStorage.setItem('preferredLang', lang);
}

if (langSelect) {
  langSelect.addEventListener('change', e => {
    switchLanguage(e.target.value);
  });
}

// ================== ROLE-SPECIFIC CV MAP ==================
const pdfMap = {
  'Frontend Developer': 'frontend-cv.pdf',
  'Junior Backend Developer': 'junior-cv.pdf',
  'Python / AI Junior': 'ai-cv.pdf',
  'Senior Developer': 'senior-cv.pdf',
  'Freelance Project': 'freelance-cv.pdf'
};

// ================== CV BUTTONS ==================
function downloadPDF(role) {
  const pdfUrl = pdfMap[role] || 'resume.pdf';
  const a = document.createElement('a');
  a.href = pdfUrl;
  a.download = `${role.replace(/\s+/g, '-').toLowerCase()}-cv.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function viewPDF(role) {
  const pdfUrl = pdfMap[role] || 'resume.pdf';
  window.open(pdfUrl, '_blank');
}

// Update CV buttons dynamically based on selected role
function updateCVButtons() {
  const selectedRole = roleSelect?.value || 'Frontend Developer';

  if (downloadCVBtn) {
    downloadCVBtn.onclick = () => downloadPDF(selectedRole);
  }
  if (viewResumeBtn) {
    viewResumeBtn.onclick = () => viewPDF(selectedRole);
  }
}

// Update buttons initially and whenever role changes
if (roleSelect) {
  updateCVButtons();
  roleSelect.addEventListener('change', updateCVButtons);
}

// ================== CONTACT FORM SUBMISSION ==================
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const role = contactForm.role.value.trim();
    const message = contactForm.message.value.trim();
    const date = new Date().toISOString();

    const csvHeaders = ['Date', 'Name', 'Email', 'Role', 'Message'];
    const csvRows = [
      csvHeaders.join(','),
      `"${date}","${name}","${email}","${role}","${message.replace(/"/g, '""')}"`
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `contact_submission_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    localStorage.setItem('contact_name', name);
    localStorage.setItem('contact_role', role);

    window.location.href = 'thank-you.html';
  });
}

// ================== INIT ==================
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferredLang') || 'en';
  switchLanguage(savedLang);
  updateCVButtons();
});
