/**
 * SATISH KUMAR — AWARD-LEVEL CINEMATIC PORTFOLIO JAVASCRIPT
 * Interactions: Lenis Smooth Scroll, GSAP ScrollTrigger, Custom Cursor,
 * Letter-by-letter reveal, Procedural Philosophy Canvas, 3D Tilt, Web Audio FX
 */

(function () {
  'use strict';

  // --- 1. STATE & AUDIO SYSTEM ---
  const state = {
    audioEnabled: false,
    audioCtx: null,
    isMenuOpen: false
  };

  // Web Audio Synthesizer for tactile micro-interactions
  function initAudio() {
    if (!state.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        state.audioCtx = new AudioContext();
      }
    }
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
  }

  function playSoftClick(freq = 600, duration = 0.04) {
    if (!state.audioEnabled || !state.audioCtx) return;
    try {
      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, state.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, state.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, state.audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(state.audioCtx.destination);
      osc.start();
      osc.stop(state.audioCtx.currentTime + duration);
    } catch (e) {
      // Audio fallback silent
    }
  }

  const soundBtn = document.getElementById('soundToggleBtn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      initAudio();
      state.audioEnabled = !state.audioEnabled;
      soundBtn.style.color = state.audioEnabled ? '#ff3b30' : 'var(--text-secondary)';
      soundBtn.style.borderColor = state.audioEnabled ? '#ff3b30' : 'var(--border-subtle)';
      if (state.audioEnabled) playSoftClick(880, 0.08);
    });
  }

  // --- 2. LENIS SMOOTH SCROLL ---
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95
    });

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // --- 3. PRELOADER & COUNTER ---
  const preloader = document.getElementById('preloader');
  const counterEl = document.getElementById('preloaderCounter');
  const progressEl = document.getElementById('preloaderProgress');

  let currentCount = 0;
  const countDuration = 1800; // ms
  const startTime = performance.now();

  function animateCounter(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / countDuration, 1);
    
    // EaseOutCubic curve for realistic counter acceleration & landing
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    currentCount = Math.floor(easeProgress * 100);

    if (counterEl) counterEl.textContent = currentCount;
    if (progressEl) progressEl.style.width = currentCount + '%';

    if (progress < 1) {
      requestAnimationFrame(animateCounter);
    } else {
      setTimeout(finishPreloader, 250);
    }
  }

  requestAnimationFrame(animateCounter);

  function finishPreloader() {
    if (preloader) {
      preloader.classList.add('preloader-hidden');
    }
    // Launch Hero entrance
    initHeroAnimations();
  }

  // --- 4. HERO ENTRANCE & LETTER-BY-LETTER ANIMATION ---
  function initHeroAnimations() {
    const letters = document.querySelectorAll('.hero-big-title .letter-char');
    
    // Stagger activation of each letter into solid white 3D feel
    letters.forEach((letter, idx) => {
      setTimeout(() => {
        letter.classList.add('char-active');
        playSoftClick(500 + idx * 80, 0.05);
      }, 400 + idx * 160);
    });

    // Animate hero top bar & bottom bar with GSAP if available
    if (typeof gsap !== 'undefined') {
      gsap.from('.hero-top-bar', {
        opacity: 0,
        y: -20,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      });

      gsap.from('.hero-title-accent', {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.9
      });

      gsap.from('.hero-showcase-stage', {
        opacity: 0,
        y: 30,
        duration: 1.1,
        ease: 'power3.out',
        delay: 1.1
      });
    }
  }

  // Interactive mouseover for individual letters in SATISH
  const letters = document.querySelectorAll('.hero-big-title .letter-char');
  letters.forEach((char) => {
    char.addEventListener('mouseenter', () => {
      char.style.transform = 'translateY(-12px) scale(1.06)';
      char.style.color = '#ff3b30';
      playSoftClick(750, 0.03);
    });
    char.addEventListener('mouseleave', () => {
      char.style.transform = '';
      char.style.color = '';
    });
  });

  // --- 5. CUSTOM CURSOR & AMBIENT GLOW ---
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const ambientGlow = document.getElementById('ambientGlow');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let glowX = mouseX;
  let glowY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursorDot) {
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }
  });

  // Smooth lerp loop for outer ring & glow
  function cursorLoop() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;

    if (cursorRing) {
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
    }
    if (ambientGlow) {
      ambientGlow.style.transform = `translate(${glowX}px, ${glowY}px)`;
    }

    requestAnimationFrame(cursorLoop);
  }
  requestAnimationFrame(cursorLoop);

  // Hover state detection for cursor enlargement
  const interactables = document.querySelectorAll('a, button, [data-magnetic], .project-card, .skill-pill, .contact-card');
  interactables.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (cursorRing) cursorRing.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      if (cursorRing) cursorRing.classList.remove('cursor-hover');
    });
  });

  // --- 6. MAGNETIC BUTTONS ---
  const magneticItems = document.querySelectorAll('[data-magnetic]');
  magneticItems.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s var(--ease-out-expo)';
      setTimeout(() => {
        btn.style.transition = '';
      }, 400);
    });
  });

  // --- 7. PROCEDURAL PHILOSOPHY CANVAS (Cinematic Crimson Flow) ---
  const canvas = document.getElementById('philosophyCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = 45;

    function resizeCanvas() {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class FluidRibbon {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 120 + 80;
        this.alpha = Math.random() * 0.25 + 0.08;
        this.hue = Math.random() > 0.3 ? 356 : 14; // Coral to deep crimson
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < -100) this.x = width + 100;
        if (this.x > width + 100) this.x = -100;
        if (this.y < -100) this.y = height + 100;
        if (this.y > height + 100) this.y = -100;
      }

      draw() {
        const grad = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        grad.addColorStop(0, `hsla(${this.hue}, 90%, 55%, ${this.alpha})`);
        grad.addColorStop(0.5, `hsla(${this.hue}, 80%, 40%, ${this.alpha * 0.4})`);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new FluidRibbon());
    }

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);

      // Connect ribbons with gentle glowing lines
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 59, 48, ${0.08 * (1 - dist / 180)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(renderCanvas);
    }
    renderCanvas();
  }

  // --- 8. PHILOSOPHY WORD-BY-WORD SCROLL REVEAL ---
  const philosophyText = document.getElementById('philosophyText');
  if (philosophyText) {
    const rawParagraph = philosophyText.querySelector('.word-split');
    if (rawParagraph) {
      const words = rawParagraph.innerText.trim().split(/\s+/);
      rawParagraph.innerHTML = words
        .map((w) => `<span class="word">${w}</span>`)
        .join(' ');
    }

    const wordSpans = philosophyText.querySelectorAll('.word');

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.create({
        trigger: '#philosophy',
        start: 'top 70%',
        end: 'bottom 85%',
        scrub: 1,
        onUpdate: (self) => {
          const total = wordSpans.length;
          const activeIndex = Math.floor(self.progress * total * 1.25);
          wordSpans.forEach((span, idx) => {
            if (idx <= activeIndex) {
              span.classList.add('word-revealed');
            } else {
              span.classList.remove('word-revealed');
            }
          });
        }
      });
    } else {
      // Fallback reveal on scroll
      window.addEventListener('scroll', () => {
        const rect = philosophyText.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          wordSpans.forEach((span, idx) => {
            setTimeout(() => span.classList.add('word-revealed'), idx * 30);
          });
        }
      });
    }
  }

  // --- 9. 3D CARD TILT & SPECULAR GLOW TRACKING ---
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update radial glow and specular sheen coordinates
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Dynamic 3D tilt calculation
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7.5;
      const rotateY = ((x - centerX) / centerX) * 7.5;

      card.style.transform = `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.55s var(--ease-out-expo)';
      setTimeout(() => {
        card.style.transition = '';
      }, 550);
    });
  });

  // --- 9B. ADVANCED 3D HOLOGRAPHIC SHOWCASE ENGINE (Hero Portrait) ---
  const holoCard = document.getElementById('holoCard');
  const holoStage = document.getElementById('hero3DStage');
  const hudBadges = document.querySelectorAll('.hud-floating-badge');

  if (holoCard && holoStage) {
    let cardBounds = holoCard.getBoundingClientRect();
    let isHovering = false;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let targetGlareX = 50;
    let targetGlareY = 50;

    function updateBounds() {
      cardBounds = holoCard.getBoundingClientRect();
    }
    window.addEventListener('resize', updateBounds);
    window.addEventListener('scroll', updateBounds, { passive: true });

    // Enable initial idle float
    holoCard.classList.add('idle-floating');

    holoStage.addEventListener('mouseenter', () => {
      isHovering = true;
      holoCard.classList.remove('idle-floating');
      playSoftClick(720, 0.04);
    });

    holoStage.addEventListener('mousemove', (e) => {
      updateBounds();
      const cardCenterX = cardBounds.left + cardBounds.width / 2;
      const cardCenterY = cardBounds.top + cardBounds.height / 2;

      // Distance from center (-1 to 1)
      const normX = Math.max(-1, Math.min(1, (e.clientX - cardCenterX) / (cardBounds.width / 1.1)));
      const normY = Math.max(-1, Math.min(1, (e.clientY - cardCenterY) / (cardBounds.height / 1.1)));

      targetRotateY = normX * 14; // Max 14 deg tilt
      targetRotateX = -normY * 14;

      // Glare coordinates
      const mouseInsideX = e.clientX - cardBounds.left;
      const mouseInsideY = e.clientY - cardBounds.top;
      holoCard.style.setProperty('--mouse-x', `${mouseInsideX}px`);
      holoCard.style.setProperty('--mouse-y', `${mouseInsideY}px`);

      // 3D Parallax offset for floating HUD badges
      hudBadges.forEach((badge) => {
        const depth = parseFloat(badge.getAttribute('data-depth')) || 50;
        const shiftFactor = (depth / 50) * 12;
        const shiftX = normX * shiftFactor;
        const shiftY = normY * shiftFactor;
        badge.style.transform = `translateZ(${depth}px) translate(${shiftX.toFixed(1)}px, ${shiftY.toFixed(1)}px)`;
      });
    });

    holoStage.addEventListener('mouseleave', () => {
      isHovering = false;
      targetRotateX = 0;
      targetRotateY = 0;

      // Reset badges to base Z-depth
      hudBadges.forEach((badge) => {
        const depth = parseFloat(badge.getAttribute('data-depth')) || 50;
        badge.style.transform = `translateZ(${depth}px)`;
        badge.style.transition = 'transform 0.6s var(--ease-out-expo)';
        setTimeout(() => {
          badge.style.transition = '';
        }, 600);
      });

      setTimeout(() => {
        if (!isHovering) {
          holoCard.classList.add('idle-floating');
        }
      }, 700);
    });

    // Mobile Touch Drag Support for 3D Tilt
    holoCard.addEventListener('touchstart', (e) => {
      isHovering = true;
      holoCard.classList.remove('idle-floating');
      updateBounds();
      playSoftClick(720, 0.04);
    }, { passive: true });

    holoCard.addEventListener('touchmove', (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      const cardCenterX = cardBounds.left + cardBounds.width / 2;
      const cardCenterY = cardBounds.top + cardBounds.height / 2;

      const normX = Math.max(-1, Math.min(1, (touch.clientX - cardCenterX) / (cardBounds.width / 1.1)));
      const normY = Math.max(-1, Math.min(1, (touch.clientY - cardCenterY) / (cardBounds.height / 1.1)));

      targetRotateY = normX * 16;
      targetRotateX = -normY * 16;

      const touchInsideX = touch.clientX - cardBounds.left;
      const touchInsideY = touch.clientY - cardBounds.top;
      holoCard.style.setProperty('--mouse-x', `${touchInsideX}px`);
      holoCard.style.setProperty('--mouse-y', `${touchInsideY}px`);

      hudBadges.forEach((badge) => {
        const depth = parseFloat(badge.getAttribute('data-depth')) || 50;
        const shiftFactor = (depth / 50) * 10;
        const shiftX = normX * shiftFactor;
        const shiftY = normY * shiftFactor;
        badge.style.transform = `translateZ(${depth}px) translate(${shiftX.toFixed(1)}px, ${shiftY.toFixed(1)}px)`;
      });
    }, { passive: true });

    holoCard.addEventListener('touchend', () => {
      isHovering = false;
      targetRotateX = 0;
      targetRotateY = 0;

      hudBadges.forEach((badge) => {
        const depth = parseFloat(badge.getAttribute('data-depth')) || 50;
        badge.style.transform = `translateZ(${depth}px)`;
        badge.style.transition = 'transform 0.6s var(--ease-out-expo)';
        setTimeout(() => {
          badge.style.transition = '';
        }, 600);
      });

      setTimeout(() => {
        if (!isHovering) {
          holoCard.classList.add('idle-floating');
        }
      }, 800);
    });

    // Mobile Device Orientation (Gyroscope 3D Tilt)
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (e) => {
        if (!e.gamma || !e.beta) return;
        if (isHovering) return; // User touch takes precedence
        holoCard.classList.remove('idle-floating');
        const gamma = Math.max(-25, Math.min(25, e.gamma)); // Left/Right
        const beta = Math.max(-25, Math.min(25, e.beta - 40)); // Front/Back
        targetRotateY = (gamma / 25) * 12;
        targetRotateX = (-beta / 25) * 12;
      });
    }

    // High performance Lerp Animation Loop
    function holoRenderLoop() {
      if (isHovering || Math.abs(targetRotateX - currentRotateX) > 0.05 || Math.abs(targetRotateY - currentRotateY) > 0.05) {
        currentRotateX += (targetRotateX - currentRotateX) * 0.12;
        currentRotateY += (targetRotateY - currentRotateY) * 0.12;

        holoCard.style.transform = `perspective(1200px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) scale3d(1.035, 1.035, 1.035)`;
      }

      requestAnimationFrame(holoRenderLoop);
    }
    requestAnimationFrame(holoRenderLoop);
  }

  // --- 10. FULLSCREEN LUXURY MENU OVERLAY ---
  const menuOverlay = document.getElementById('menuOverlay');
  const menuTriggerBtn = document.getElementById('menuTriggerBtn');
  const menuCloseBtn = document.getElementById('menuCloseBtn');
  const menuLinks = document.querySelectorAll('.menu-link');

  function openMenu() {
    state.isMenuOpen = true;
    menuOverlay.classList.add('menu-open');
    menuOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    playSoftClick(520, 0.06);

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(
        '.menu-item',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out', delay: 0.15 }
      );
    }
  }

  function closeMenu() {
    state.isMenuOpen = false;
    menuOverlay.classList.remove('menu-open');
    menuOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    playSoftClick(420, 0.05);
  }

  if (menuTriggerBtn) menuTriggerBtn.addEventListener('click', openMenu);
  if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);

  menuLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      closeMenu();

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        setTimeout(() => {
          if (lenis) {
            lenis.scrollTo(targetEl, { offset: -40, duration: 1.3 });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.isMenuOpen) {
      closeMenu();
    }
  });

  // Smooth scroll handler for all internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1 && !this.classList.contains('menu-link')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          if (lenis) {
            lenis.scrollTo(target, { offset: -30, duration: 1.2 });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
          playSoftClick(580, 0.03);
        }
      }
    });
  });

  // --- 11. ONE-CLICK CLIPBOARD COPY (Email & Phone) ---
  function setupCopyButton(btnId, hintId, successMsg) {
    const btn = document.getElementById(btnId);
    const hint = document.getElementById(hintId);
    if (!btn) return;

    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          triggerCopiedState(btn, hint, successMsg);
        });
      } else {
        // Fallback
        const temp = document.createElement('textarea');
        temp.value = textToCopy;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        triggerCopiedState(btn, hint, successMsg);
      }
    });
  }

  function triggerCopiedState(btn, hint, msg) {
    btn.classList.add('copied');
    if (hint) {
      const origText = hint.textContent;
      hint.textContent = msg;
      hint.style.color = '#10b981';
      setTimeout(() => {
        btn.classList.remove('copied');
        hint.textContent = origText;
        hint.style.color = '';
      }, 2500);
    }
    playSoftClick(880, 0.08);
  }

  setupCopyButton('copyEmailBtn', 'emailCopyHint', 'Email copied to clipboard!');
  setupCopyButton('copyPhoneBtn', 'phoneCopyHint', 'Phone copied to clipboard!');

  // --- 12. LIVE BHOPAL (IST) CLOCK & DYNAMIC YEAR ---
  const clockEl = document.getElementById('bhopalClock');
  const yearEl = document.getElementById('currentYear');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function updateClock() {
    if (!clockEl) return;
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const istTime = new Intl.DateTimeFormat('en-GB', options).format(now);
      clockEl.textContent = `${istTime} IST`;
    } catch (e) {
      const d = new Date();
      clockEl.textContent = `${d.toLocaleTimeString()} IST`;
    }
  }

  setInterval(updateClock, 1000);
  updateClock();

  // --- 13. QUICK INQUIRY FORM SIMULATION ---
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const msg = document.getElementById('senderMessage').value.trim();

      if (!name || !email || !msg) return;

      // Construct mailto for instant zero-config dispatch
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
      const mailtoUrl = `mailto:satishkumar86367@gmail.com?subject=${subject}&body=${body}`;

      if (formFeedback) {
        formFeedback.textContent = 'Redirecting to your mail client...';
        formFeedback.style.color = '#10b981';
      }

      playSoftClick(720, 0.06);

      setTimeout(() => {
        window.location.href = mailtoUrl;
        contactForm.reset();
        if (formFeedback) {
          formFeedback.textContent = 'Message drafted successfully!';
          setTimeout(() => {
            formFeedback.textContent = '';
          }, 4000);
        }
      }, 600);
    });
  }

  // --- 14. GSAP SCROLLTRIGGER FADE-UP ANIMATIONS ---
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    // Project Cards Reveal
    gsap.utils.toArray('.project-card').forEach((card, idx) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%'
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: idx * 0.1
      });
    });

    // Timeline Stream Reveal
    gsap.utils.toArray('.timeline-card').forEach((item) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 88%'
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    // Skill Category Cards Reveal
    gsap.utils.toArray('.skill-category-card').forEach((cat, idx) => {
      gsap.from(cat, {
        scrollTrigger: {
          trigger: cat,
          start: 'top 88%'
        },
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: idx * 0.08
      });
    });

    // Achievement Cards Reveal
    gsap.utils.toArray('.achievement-card').forEach((card, idx) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 90%'
        },
        y: 35,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        delay: idx * 0.1
      });
    });
  }
})();
