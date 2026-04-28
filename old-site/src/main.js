import '../global.css';
import './scripts/pages/hashtag.js';
import { CircularGallery } from './scripts/components/CircularGallery.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Smooth Scrolling (Lenis)
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Custom Cursor
const initCursor = () => {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  
  if (!cursor || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    gsap.to(cursor, {
      x: mouseX,
      y: mouseY,
      duration: 0.1,
    });
  });

  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    
    gsap.set(ring, {
      x: ringX,
      y: ringY,
    });
    
    requestAnimationFrame(animateRing);
  };
  animateRing();

  // Hover effects
  const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item, .blog-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, { scale: 1.5, backgroundColor: 'var(--orange)', duration: 0.3 });
      gsap.to(ring, { scale: 1.5, borderColor: 'var(--orange)', opacity: 0.4, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, { scale: 1, backgroundColor: 'var(--gold)', duration: 0.3 });
      gsap.to(ring, { scale: 1, borderColor: 'var(--gold)', opacity: 0.6, duration: 0.3 });
    });
  });
};

// Navbar Scroll Effect
const initNavbar = () => {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      gsap.to(nav, {
        backgroundColor: 'rgba(253, 250, 245, 0.95)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)',
        backdropFilter: 'blur(10px)',
        duration: 0.4,
      });
    } else {
      gsap.to(nav, {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        backdropFilter: 'blur(0px)',
        duration: 0.4,
      });
    }
  });
};

// Chatbot Logic
const initChatbot = () => {
  const chatBtn = document.getElementById('chat-btn');
  const chatPanel = document.getElementById('chat-panel');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  if (!chatBtn || !chatPanel) return;

  chatBtn.addEventListener('click', () => {
    const isVisible = chatPanel.style.display === 'flex';
    chatPanel.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible) {
      gsap.from(chatPanel, { y: 20, opacity: 0, duration: 0.4, ease: 'power2.out' });
    }
  });

  const sendMessage = () => {
    const text = chatInput.value.trim();
    if (!text) return;

    const userMsg = document.createElement('div');
    userMsg.style.cssText = 'background: var(--gold); color: var(--white); padding: 12px; align-self: flex-end; font-size: 0.8rem; max-width: 80%;';
    userMsg.textContent = text;
    chatMessages.appendChild(userMsg);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.style.cssText = 'background: var(--white); padding: 12px; border-left: 2px solid var(--gold); font-size: 0.8rem; align-self: flex-start; max-width: 80%;';
      botMsg.textContent = "Thank you! A consultant will be with you shortly.";
      chatMessages.appendChild(botMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      gsap.from(botMsg, { x: -10, opacity: 0, duration: 0.4 });
    }, 1000);
  };

  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
};

// Animations
const initAnimations = () => {
  // Hero Section
  // --- CIRCULAR GALLERY ---
  const galleryContainer = document.getElementById('circular-gallery-container');
  if (galleryContainer) {
    const galleryItems = [
      { image: '/assets/photos/couple-shots/059A3486.jpg', text: 'Timeless Vows' },
      { image: '/assets/photos/couple-shots/059A4274.jpg', text: 'Eternal Bond' },
      { image: '/assets/photos/couple-shots/0G4A1624.jpg', text: 'Royal Affair' },
      { image: '/assets/photos/couple-shots/0G4A1676.jpg', text: 'Sacred Union' },
      { image: '/assets/photos/couple-shots/0G4A2084.jpg', text: 'Love & Laughter' },
      { image: '/assets/photos/couple-shots/0G4A2282.jpg', text: 'Golden Hour' },
      { image: '/assets/photos/couple-shots/0G4A4577.jpg', text: 'Divine Grace' },
      { image: '/assets/photos/couple-shots/0G4A4625.jpg', text: 'Majestic Moments' }
    ];

    new CircularGallery(galleryContainer, {
      items: galleryItems,
      bend: 3.5,
      textColor: '#C9A234',
      borderRadius: 0.08,
      font: "bold 24px 'DM Sans', sans-serif",
      scrollSpeed: 2.5,
      scrollEase: 0.03
    });
  }

  const heroTl = gsap.timeline();
  heroTl.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.8, delay: 0.5 })
        .from('.hero-title .word', { opacity: 0, y: 40, stagger: 0.1, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.8 }, '-=0.4')
        .from('.hero-ctas', { opacity: 0, y: 20, duration: 0.8 }, '-=0.4');

  // Scroll Reveals
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power2.out',
    });
  });

  // Parallax Images
  const parallaxImages = document.querySelectorAll('.parallax-img');
  parallaxImages.forEach(img => {
    gsap.to(img, {
      scrollTrigger: {
        trigger: img,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      y: -50,
      ease: 'none',
    });
  });
};

// Initialize everything
window.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNavbar();
  initChatbot();
  initAnimations();
  
  // Hide loader
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => loader.style.display = 'none',
      });
    }, 1000);
  }
});
