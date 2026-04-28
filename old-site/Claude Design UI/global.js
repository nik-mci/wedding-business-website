// Global JS for all inner pages

function initGlobal() {
  // LOADER
  function hideLoader() {
    const el = document.getElementById('loader');
    if (!el) return;
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
    setTimeout(() => { el.style.display = 'none'; }, 750);
  }
  setTimeout(hideLoader, 800);
  window.addEventListener('load', () => setTimeout(hideLoader, 300));

  // CURSOR
  const cur = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (cur && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cur.style.left = mx + 'px'; cur.style.top = my + 'px';
    });
    function animRing() { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animRing); }
    animRing();
    document.querySelectorAll('a, button, .hover-target').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // SCROLL PROGRESS + NAVBAR
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    const p = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    const pb = document.getElementById('progress-bar');
    if (pb) pb.style.width = p + '%';
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }
    // Page hero parallax
    const heroBg = document.querySelector('.page-hero-bg');
    if (heroBg) heroBg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
  });

  // INTERSECTION OBSERVER
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // CHATBOT
  window.toggleChat = function() {
    document.getElementById('chat-panel')?.classList.toggle('open');
  };
  window.sendChat = function() {
    const input = document.getElementById('chat-input-field');
    const val = input?.value.trim();
    if (!val) return;
    const msgs = document.getElementById('chat-messages');
    const u = document.createElement('div'); u.className = 'chat-msg user'; u.textContent = val; msgs.appendChild(u);
    input.value = ''; msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => {
      const b = document.createElement('div'); b.className = 'chat-msg bot';
      b.textContent = 'Thank you! A consultant will be in touch soon. Or chat on WhatsApp for instant help.';
      msgs.appendChild(b); msgs.scrollTop = msgs.scrollHeight;
    }, 800);
  };
  document.getElementById('chat-send-btn')?.addEventListener('click', sendChat);
  document.getElementById('chat-input-field')?.addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });
}

document.addEventListener('DOMContentLoaded', initGlobal);
