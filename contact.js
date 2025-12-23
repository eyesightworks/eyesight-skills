document.addEventListener('DOMContentLoaded', () => {

  const contactForm = document.getElementById('contactForm');

  if(contactForm){
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();

      if(!name || !email || !message){
        alert("Please fill all fields");
        return;
      }

      // Save to localStorage for thank-you / WhatsApp redirect
      localStorage.setItem('contact_name', name);
      localStorage.setItem('contact_email', email);
      localStorage.setItem('contact_message', message);

      // subtle success animation (optional)
      contactForm.querySelector('button').textContent = 'Sending...';
      setTimeout(() => { window.location.href='thank-you.html'; }, 500);
    });
  }
});
