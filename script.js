// =============================================
// INIT AOS ANIMATIONS
// =============================================
AOS.init({
  once: true,
  offset: 80,
  easing: 'ease-out-cubic'
});

// =============================================
// NAVBAR — scroll effect & active link
// =============================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const sections = document.querySelectorAll('section[id], div[id]');

window.addEventListener('scroll', () => {
  // Scrolled class
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link highlight
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 140) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });

  // Back to top visibility
  const backBtn = document.getElementById('backToTop');
  if (backBtn) {
    backBtn.classList.toggle('visible', window.scrollY > 400);
  }
});

// =============================================
// CLOSE MOBILE NAVBAR ON LINK CLICK
// =============================================
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const navCollapse = document.getElementById('navbarMain');
    if (navCollapse && navCollapse.classList.contains('show')) {
      const bsCollapse = window.bootstrap ? new bootstrap.Collapse(navCollapse, { toggle: false }) : null;
      if (bsCollapse) bsCollapse.hide();
    }
  });
});

// =============================================
// CONTACT FORM — basic validation & feedback
// =============================================
const contactForm = document.getElementById('contactForm');
const formStatus  = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name    = this.name.value.trim();
    const email   = this.email.value.trim();
    const message = this.message.value.trim();

    if (!name || !email || !message) {
      showStatus('Please fill in all fields.', false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus('Please enter a valid email address.', false);
      return;
    }

    // Simulate send (replace with real backend / EmailJS)
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      showStatus('Message sent! Dr. Rawat will get back to you soon.', true);
      contactForm.reset();
      btn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i>Send Message';
      btn.disabled = false;
    }, 1500);
  });
}

function showStatus(msg, success) {
  if (!formStatus) return;
  formStatus.textContent = msg;
  formStatus.style.color = success ? '#4caf50' : '#ff5555';
}

// =============================================
// PORTFOLIO LIGHTBOX
// =============================================
const portfolioItems  = document.querySelectorAll('.portfolio-item');
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxClose   = document.getElementById('lightboxClose');

portfolioItems.forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('img').src;
    const alt = item.querySelector('img').alt;
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightboxOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightboxOverlay.classList.remove('active');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}

if (lightboxClose)   lightboxClose.addEventListener('click', closeLightbox);
if (lightboxOverlay) {
  lightboxOverlay.addEventListener('click', function (e) {
    if (e.target === lightboxOverlay) closeLightbox();
  });
}
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeLightbox();
});
