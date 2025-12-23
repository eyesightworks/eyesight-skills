/* ================= CONTACT PAGE SCRIPT ================= */

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('contactForm');
  const success = document.querySelector('.success-overlay');

  /* FORM SUBMIT */
  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert('Please fill all fields');
      return;
    }

    localStorage.setItem('contact_name', name);
    localStorage.setItem('contact_message', message);

    // Show success animation
    success.classList.add('show');

    // Redirect after animation
    setTimeout(() => {
      window.location.href = 'thank-you.html';
    }, 1800);
  });

  /* PARTICLES */
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w, h;
  let mouse = { x: null, y: null };

  const particles = Array.from({ length: 40 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: Math.random() * 0.001,
    vy: Math.random() * 0.001
  }));

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      const px = p.x * w;
      const py = p.y * h;

      if (mouse.x !== null) {
        p.x += (mouse.x / w - p.x) * 0.002;
        p.y += (mouse.y / h - p.y) * 0.002;
      }

      p.x += p.vx;
      p.y += p.vy;

      ctx.fillStyle = 'rgba(0,201,167,0.4)';
      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('resize', resize);

  resize();
  animate();

});
