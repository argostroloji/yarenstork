// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
  }, 1800);
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.pageYOffset > 80);
});

// ===== MOBILE MENU =====
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('active');
  document.getElementById('hamburger').classList.toggle('active');
}
function closeMenu() {
  document.getElementById('navLinks').classList.remove('active');
  document.getElementById('hamburger').classList.remove('active');
}

// ===== STARS =====
function generateStars() {
  const container = document.getElementById('heroStars');
  if (!container) return;
  for (let i = 0; i < 60; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.width = (Math.random() * 2 + 1) + 'px';
    star.style.height = star.style.width;
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (Math.random() * 3 + 2) + 's';
    container.appendChild(star);
  }
}
generateStars();

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .timeline-item').forEach(el => revealObserver.observe(el));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});

// ===== LIGHTBOX =====
function openLightbox(item) {
  const img = item.querySelector('img');
  const caption = item.querySelector('.gallery-caption');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = caption ? caption.textContent : '';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ===== COPY CONTRACT =====
function copyContract() {
  const el = document.getElementById('contractAddress');
  const text = el.querySelector('span:first-child').textContent;
  if (text.includes('Coming Soon')) {
    showToast('Contract address coming soon! 🕊️');
    return;
  }
  navigator.clipboard.writeText(text.replace('CA: ', '')).then(() => {
    showToast('Copied! 🕊️');
  }).catch(() => showToast('Contract address coming soon! 🕊️'));
}

// ===== TOAST =====
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 30px; left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: linear-gradient(135deg, #f97316, #fbbf24);
    color: #0a0e1a; padding: 14px 28px; border-radius: 50px;
    font-weight: 700; font-size: 14px; z-index: 10000; opacity: 0;
    transition: all 0.4s ease; box-shadow: 0 10px 40px rgba(249, 115, 22, 0.3);
    font-family: 'Outfit', sans-serif;
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

// ===== FLOATING STORK PARTICLES =====
function createFloatingStorks() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  setInterval(() => {
    const stork = document.createElement('div');
    stork.textContent = '🕊️';
    stork.style.cssText = `
      position: absolute; font-size: ${Math.random() * 16 + 12}px;
      left: ${Math.random() * 100}%; bottom: -30px; opacity: 0;
      pointer-events: none; z-index: 2;
    `;
    hero.appendChild(stork);
    const duration = Math.random() * 6000 + 5000;
    const drift = (Math.random() - 0.5) * 200;
    stork.animate([
      { transform: `translateY(0) translateX(0)`, opacity: 0 },
      { opacity: 0.3, offset: 0.2 },
      { transform: `translateY(-${window.innerHeight + 60}px) translateX(${drift}px)`, opacity: 0 }
    ], { duration, easing: 'linear' }).onfinish = () => stork.remove();
  }, 3000);
}
createFloatingStorks();

// ===== 3D TILT ON CARDS =====
document.querySelectorAll('.fact-card, .community-card, .token-feature').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y - rect.height / 2) / 20;
    const rotateY = (rect.width / 2 - x) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ===== HERO PARALLAX ON SCROLL =====
window.addEventListener('scroll', () => {
  const scrollPercent = window.pageYOffset / (window.innerHeight * 0.6);
  const heroContent = document.querySelector('.hero-content');
  const heroBg = document.querySelector('.hero-bg-image img');
  if (heroContent && scrollPercent < 1.5) {
    heroContent.style.opacity = Math.max(0, 1 - scrollPercent);
    heroContent.style.transform = `translateY(${scrollPercent * 60}px)`;
  }
  if (heroBg) {
    heroBg.style.transform = `scale(${1 + scrollPercent * 0.1}) translateY(${scrollPercent * 30}px)`;
  }
});

// ===== YAREN TRACKER =====
// Countdown to arrival window
function updateCountdown() {
  const target = new Date('2026-03-15T13:00:00+03:00');
  const now = new Date();
  const diff = target - now;
  const container = document.getElementById('arrivalCountdown');
  if (!container) return;

  if (diff <= 0) {
    container.innerHTML = `
      <div class="countdown-item" style="min-width: 100%">
        <div class="countdown-value">🔥 SHE'S IN THE ZONE!</div>
        <div class="countdown-label">Arrival window is NOW OPEN — any day now!</div>
      </div>
    `;
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  container.innerHTML = `
    <div class="countdown-item">
      <div class="countdown-value">${days}</div>
      <div class="countdown-label">Days</div>
    </div>
    <div class="countdown-item">
      <div class="countdown-value">${hours}</div>
      <div class="countdown-label">Hours</div>
    </div>
    <div class="countdown-item">
      <div class="countdown-value">${mins}</div>
      <div class="countdown-label">Minutes</div>
    </div>
    <div class="countdown-item">
      <div class="countdown-value">${secs}</div>
      <div class="countdown-label">Seconds</div>
    </div>
  `;
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Zone fill animation
function updateZoneFill() {
  const fill = document.getElementById('zoneFill');
  if (!fill) return;
  // Feb 1 = start, Mar 15 = end
  const start = new Date('2026-02-01').getTime();
  const end = new Date('2026-03-15').getTime();
  const now = Date.now();
  const pct = Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
  setTimeout(() => { fill.style.width = pct + '%'; }, 500);
}
updateZoneFill();

// Map waypoint interaction
function showWaypoint(el) {
  const info = el.getAttribute('data-info');
  const popup = document.getElementById('mapInfoPopup');
  const text = document.getElementById('mapInfoText');
  text.textContent = info;
  popup.classList.add('active');
}

function closeMapInfo() {
  document.getElementById('mapInfoPopup').classList.remove('active');
}

// ===== QUOTES CAROUSEL =====
let currentQuote = 0;
const slides = document.querySelectorAll('.quote-slide');
const dotsContainer = document.getElementById('quotesDots');
let quoteInterval;

function initQuotes() {
  if (!dotsContainer || slides.length === 0) return;
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'quotes-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToQuote(i);
    dotsContainer.appendChild(dot);
  });
  quoteInterval = setInterval(nextQuote, 6000);
}

function goToQuote(n) {
  slides[currentQuote].classList.remove('active');
  const dots = document.querySelectorAll('.quotes-dot');
  if (dots[currentQuote]) dots[currentQuote].classList.remove('active');
  currentQuote = n;
  slides[currentQuote].classList.add('active');
  if (dots[currentQuote]) dots[currentQuote].classList.add('active');
  clearInterval(quoteInterval);
  quoteInterval = setInterval(nextQuote, 6000);
}

function nextQuote() { goToQuote((currentQuote + 1) % slides.length); }
function prevQuote() { goToQuote((currentQuote - 1 + slides.length) % slides.length); }

initQuotes();

console.log(`
🕊️ YAREN — The Stork That Chose Friendship
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
15 years. 10,000 km. 1 true bond.
$YAREN — The Loyalty Token
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);


// Copy CA from top bar
function copyCA() {
  const ca = document.getElementById('caText').textContent;
  if (ca === 'Coming Soon...') {
    showToast('Contract address coming soon! 🕊️');
    return;
  }
  navigator.clipboard.writeText(ca).then(() => {
    const icon = document.getElementById('caCopyIcon');
    const msg = document.getElementById('caCopiedMsg');
    if (icon) icon.style.display = 'none';
    if (msg) msg.classList.add('show');
    setTimeout(() => {
      if (icon) icon.style.display = '';
      if (msg) msg.classList.remove('show');
    }, 2000);
  });
}