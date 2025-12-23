document.addEventListener('DOMContentLoaded', () => {
  // MOBILE MENU
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  const toggleMenu = () => {
    navMenu.classList.toggle('show');
    hamburger.setAttribute('aria-expanded', navMenu.classList.contains('show'));
  };

  hamburger?.addEventListener('click', toggleMenu);
  window.addEventListener('resize', () => { if(window.innerWidth>768) navMenu.classList.remove('show'); });

  // CONTACT FORM
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', e=>{
      e.preventDefault();
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();
      if(!name||!email||!message){
        alert("Please fill all fields");
        return;
      }
      localStorage.setItem('contact_name', name);
      localStorage.setItem('contact_email', email);
      localStorage.setItem('contact_message', message);
      window.location.href='thank-you.html';
    });
  }
});
