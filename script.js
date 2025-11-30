// Hamburger toggle (mobile menu)
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

if(hamburger && navMenu){
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}

// Language switcher (EN, FR, ES, AR)
const langSwitcher = document.getElementById("lang-switcher");
const html = document.documentElement;
const languages = ["en","fr","es","ar"];
let currentLangIndex = 0;

// Load preferred language on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("preferredLang");
  if(savedLang && languages.includes(savedLang)){
    currentLangIndex = languages.indexOf(savedLang);
    switchLanguage(savedLang);
  }
});

// Switch language when button clicked
if(langSwitcher){
  langSwitcher.addEventListener("click", () => {
    currentLangIndex = (currentLangIndex+1) % languages.length;
    const lang = languages[currentLangIndex];
    switchLanguage(lang);
    localStorage.setItem("preferredLang", lang);
  });
}

// Function to switch languages
function switchLanguage(lang){
  html.lang = lang;
  html.dir = lang==="ar"?"rtl":"ltr";
  if(langSwitcher) langSwitcher.textContent = lang.toUpperCase();

  document.querySelectorAll("[data-"+lang+"]").forEach(el=>{
    if(el.placeholder){
      el.placeholder = el.getAttribute("data-"+lang);
    }else{
      el.textContent = el.getAttribute("data-"+lang");
    }
  });
}

// Optional: Hire Me modal (if you want to add later)
const hireBtn = document.getElementById("hire-me-btn");
const modal = document.getElementById("hire-modal");
const closeModal = document.querySelector(".modal .close");

if(hireBtn && modal){
  hireBtn.addEventListener("click", () => { modal.style.display="block"; });
  closeModal.addEventListener("click", ()=>{ modal.style.display="none"; });
  window.addEventListener("click",(e)=>{ if(e.target===modal){ modal.style.display="none"; }});
}
