// Video mute toggle
const heroVideo = document.getElementById('hero-video');
const muteBtn = document.getElementById('video-mute-btn');
const iconMuted = document.getElementById('icon-muted');
const iconSound = document.getElementById('icon-sound');
if (heroVideo && muteBtn) {
  heroVideo.volume = 0.25;
  muteBtn.addEventListener('click', () => {
    heroVideo.muted = !heroVideo.muted;
    iconMuted.style.display = heroVideo.muted ? 'block' : 'none';
    iconSound.style.display = heroVideo.muted ? 'none' : 'block';
  });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu toggle
const toggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
toggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Contact form
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  // Build mailto link with form data
  const nombre = this.nombre.value;
  const apellido = this.apellido.value;
  const whatsapp = this.whatsapp.value;
  const email = this.email.value;
  const universidad = this.universidad.value;
  const mensaje = this.mensaje.value;

  const subject = encodeURIComponent(`Solicitud de incorporación – ${universidad}`);
  const whatsappLine = whatsapp ? `\nWhatsApp/Teléfono: ${whatsapp}` : '';
  const body = encodeURIComponent(
    `Nombre: ${nombre} ${apellido}\nEmail: ${email}${whatsappLine}\nUniversidad: ${universidad}\n\n${mensaje}`
  );

  setTimeout(() => {
    window.location.href = `mailto:reduniblock@gmail.com?subject=${subject}&body=${body}`;
    btn.textContent = original;
    btn.disabled = false;
  }, 600);
});

// Smooth reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.action-card, .uni-card, .news-card, .feed-card, .sponsor-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity .4s ease, transform .4s ease';
  observer.observe(el);
});
