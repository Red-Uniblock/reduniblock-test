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

// Social feed
const feedContainer = document.getElementById('social-feed');
if (feedContainer) {
  const networkLabels = { instagram: 'Instagram', linkedin: 'LinkedIn', x: 'X (Twitter)' };
  const networkIcons = {
    instagram: '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
    linkedin:  '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    x:         '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'
  };

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function renderFeed(posts) {
    if (!posts || posts.length === 0) {
      feedContainer.innerHTML = '<div class="social-feed-empty">No hay publicaciones aún.</div>';
      return;
    }
    feedContainer.innerHTML = posts.map(p => `
      <div class="social-card">
        <span class="social-card-badge badge-${p.network}">
          ${networkIcons[p.network] || ''} ${networkLabels[p.network] || p.network}
        </span>
        ${p.image ? `<img src="${p.image}" alt="" class="social-card-image" loading="lazy">` : ''}
        <p class="social-card-content">${p.content}</p>
        <div class="social-card-footer">
          <span class="social-card-date">${formatDate(p.date)}</span>
          <a href="${p.url}" target="_blank" rel="noopener" class="social-card-link">Ver publicación →</a>
        </div>
      </div>
    `).join('');
  }

  fetch('social-feed.json')
    .then(r => r.json())
    .then(data => renderFeed(data.posts))
    .catch(() => {
      feedContainer.innerHTML = '<div class="social-feed-empty">No se pudo cargar el feed.</div>';
    });
}

// Smooth reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.action-card, .uni-card, .news-card, .feed-card, .sponsor-card, .social-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity .4s ease, transform .4s ease';
  observer.observe(el);
});
