/**
 * ROUTEWITHIN x SIDDHARTH RAJSEKAR INTERACTIVE APPLICATION CORE
 * Handles Real-Time Countdown, Audio Streaming, Video Modals,
 * Self-Assessment Quiz, AI Assistant, Hall of Fame Filters, & Forms.
 */
function initApp() {
  initTheme();
  initNavbar();
  initCountdown();
  initAudioPlayer();
  initQuiz();
  initScrollAnimations();
  initWebinarSuite();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  // DOM is already ready
  initApp();
}

// Also initialize theme immediately before DOM fully loads to prevent theme flash
initTheme();

/* ==========================================================================
   0. AESTHETIC THEME CONTROLLER & COOL VIEW-TRANSITION RIPPLE ANIMATION
   ========================================================================== */

function initTheme() {
  const saved = localStorage.getItem('routewithin_theme');
  // Default to light mode always
  const initialTheme = saved || 'light';

  applyTheme(initialTheme);

  // Setup click listeners for all toggle buttons
  const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
  toggleButtons.forEach(btn => {
    // Avoid double binding
    if (btn.dataset.themeBound) return;
    btn.dataset.themeBound = 'true';

    btn.addEventListener('click', (e) => {
      const activeTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const targetTheme = activeTheme === 'dark' ? 'light' : 'dark';
      toggleThemeWithAnimation(targetTheme, e);
    });
  });

  // Watch for system OS theme changes if user hasn't explicitly set a preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('routewithin_theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // Cross-tab theme sync
  window.addEventListener('storage', (e) => {
    if (e.key === 'routewithin_theme' && e.newValue) {
      applyTheme(e.newValue);
    }
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem('routewithin_theme', theme);
  } catch (err) {
    // Local storage unavailable
  }

  // Update mobile browser chrome bar theme color
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', theme === 'dark' ? '#1A1410' : '#8B6F47');
  }

  // Update aria-label and tooltips
  const isDark = theme === 'dark';
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
  });

  // Update mobile drawer badge if present
  document.querySelectorAll('.mobile-theme-badge').forEach(badge => {
    badge.textContent = isDark ? 'Dark Mode' : 'Light Mode';
  });
}

function toggleThemeWithAnimation(targetTheme, event) {
  // Add smooth global transition class to coordinate all element property transitions
  document.documentElement.classList.add('theme-transitioning');
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transitioning');
  }, 1100);

  // 1. Tactile glowing energy shockwave originating from click coordinate
  createThemeShockwave(event, targetTheme);

  // 2. Modern View Transitions API (Chrome 111+, Edge) with slow & smooth circular reveal
  if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let x = window.innerWidth - 70;
    let y = 36;
    if (event && event.clientX) {
      x = event.clientX;
      y = event.clientY;
    } else if (event && event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      applyTheme(targetTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath
        },
        {
          duration: 950, // Slower, luxurious cinematic glide
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)', // Smooth ease-out deceleration
          pseudoElement: '::view-transition-new(root)'
        }
      );
    });
  } else {
    // 3. Fallback smooth CSS transition interpolation
    applyTheme(targetTheme);
  }
}

function createThemeShockwave(event, targetTheme) {
  const shockwave = document.createElement('div');
  shockwave.className = 'theme-switch-shockwave';

  let x = window.innerWidth - 70;
  let y = 36;
  if (event && event.currentTarget) {
    const rect = event.currentTarget.getBoundingClientRect();
    x = rect.left + rect.width / 2;
    y = rect.top + rect.height / 2;
  } else if (event && event.clientX) {
    x = event.clientX;
    y = event.clientY;
  }

  shockwave.style.left = `${x}px`;
  shockwave.style.top = `${y}px`;

  if (targetTheme === 'dark') {
    // Expanding warm dark shockwave
    shockwave.style.background = 'radial-gradient(circle, rgba(139, 111, 71, 0.4) 0%, rgba(61, 43, 31, 0.3) 40%, rgba(26, 20, 16, 0.7) 70%, transparent 100%)';
    shockwave.style.boxShadow = '0 0 80px rgba(139, 111, 71, 0.5)';
  } else {
    // Expanding warm cream sunbeam shockwave
    shockwave.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(250, 245, 239, 0.5) 40%, rgba(139, 111, 71, 0.15) 70%, transparent 100%)';
    shockwave.style.boxShadow = '0 0 80px rgba(139, 111, 71, 0.3)';
  }

  document.body.appendChild(shockwave);
  setTimeout(() => {
    shockwave.remove();
  }, 1250);
}

/* ==========================================================================
   1. NAVBAR & MOBILE DRAWER
   ========================================================================== */

function initNavbar() {
  const navbar = document.getElementById('mainNavbar');
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawer');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
    });

    // Close mobile drawer upon clicking any link
    const mobileLinks = drawer.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   1.1 SCROLL REVEAL & PARALLAX ANIMATIONS
   ========================================================================== */

function initRevealOnScroll() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-scale, .reveal-fade-in');
  if (!revealElements.length) return;

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  // Immediately reveal anything already visible in viewport
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const delayStr = el.style.getPropertyValue('--delay');
      const delay = delayStr ? parseInt(delayStr, 10) : 0;
      if (delay > 0) {
        setTimeout(() => el.classList.add('is-revealed'), delay);
      } else {
        el.classList.add('is-revealed');
      }
    }
  });

  // Safety fallback: reveal elements in or near viewport after short timeout
  setTimeout(() => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.3) {
        el.classList.add('is-revealed');
      }
    });
  }, 800);

  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px 80px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delayStr = el.style.getPropertyValue('--delay');
        const delay = delayStr ? parseInt(delayStr, 10) : 0;

        if (delay > 0) {
          setTimeout(() => {
            el.classList.add('is-revealed');
          }, delay);
        } else {
          el.classList.add('is-revealed');
        }

        observer.unobserve(el);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    if (!el.classList.contains('is-revealed')) {
      revealObserver.observe(el);
    }
  });

  // Subtle Parallax on Scenic Mountain Background
  const scenicBannerBg = document.querySelector('.scenic-banner-bg');
  if (scenicBannerBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = scenicBannerBg.parentElement.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            const moveY = (progress - 0.5) * 35;
            scenicBannerBg.style.transform = `scale(1.06) translateY(${moveY}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
}

/* ==========================================================================
   2. REAL-TIME COUNTDOWN TIMER (Next Saturday 4:30 PM IST)
   ========================================================================== */

function initCountdown() {
  const daysEl = document.getElementById('cdDays');
  const hoursEl = document.getElementById('cdHours');
  const minsEl = document.getElementById('cdMins');
  const secsEl = document.getElementById('cdSecs');

  function getNextSessionDate() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 is Sunday, 6 is Saturday
    let daysUntilSaturday = (6 - dayOfWeek + 7) % 7;

    // If today is Saturday but past 4:30 PM IST (11:00 UTC), target next Saturday
    const target = new Date();
    target.setDate(now.getDate() + (daysUntilSaturday === 0 && now.getHours() >= 17 ? 7 : daysUntilSaturday));
    target.setHours(16, 30, 0, 0); // 4:30 PM
    return target;
  }

  const targetDate = getNextSessionDate();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   3. AUDIO PLAYER SIMULATION ("Conversations Within Podcast")
   ========================================================================== */

let isAudioPlaying = false;
let audioTimer = null;
let currentSeconds = 392; // 06:32
let totalSeconds = 1120;  // 18:40
let audioSpeed = 1.0;

function initAudioPlayer() {
  updateAudioDisplay();
}

function updateAudioDisplay() {
  const currentDisplay = document.getElementById('currentTimeDisplay');
  const totalDisplay = document.getElementById('totalDurationDisplay');
  const progressBar = document.getElementById('audioProgress');

  if (currentDisplay) currentDisplay.textContent = formatTime(currentSeconds);
  if (totalDisplay) totalDisplay.textContent = formatTime(totalSeconds);

  if (progressBar) {
    const percent = Math.min((currentSeconds / totalSeconds) * 100, 100);
    progressBar.style.width = percent + '%';
  }
}

function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function togglePlayAudio() {
  const playIcon = document.getElementById('playIcon');
  isAudioPlaying = !isAudioPlaying;

  if (isAudioPlaying) {
    if (playIcon) playIcon.textContent = '⏸';
    showToast('Playing: Episode ' + document.getElementById('currentEpNumber').textContent);

    audioTimer = setInterval(() => {
      currentSeconds += audioSpeed;
      if (currentSeconds >= totalSeconds) {
        currentSeconds = 0;
        isAudioPlaying = false;
        clearInterval(audioTimer);
        if (playIcon) playIcon.textContent = '▶';
      }
      updateAudioDisplay();
    }, 1000);
  } else {
    if (playIcon) playIcon.textContent = '▶';
    clearInterval(audioTimer);
    showToast('Audio paused');
  }
}

function handleScrub(event) {
  const bar = document.getElementById('audioScrubBar');
  if (!bar) return;
  const rect = bar.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const fraction = Math.max(0, Math.min(1, clickX / rect.width));
  currentSeconds = Math.floor(fraction * totalSeconds);
  updateAudioDisplay();
}

function cycleAudioSpeed() {
  const speedBtn = document.getElementById('speedToggle');
  const speeds = [1.0, 1.25, 1.5, 2.0];
  let nextIdx = (speeds.indexOf(audioSpeed) + 1) % speeds.length;
  audioSpeed = speeds[nextIdx];
  if (speedBtn) speedBtn.textContent = audioSpeed.toFixed(1) + 'x SPEED';
  showToast(`Audio speed set to ${audioSpeed.toFixed(1)}x`);
}

function loadEpisode(epNum, title, desc, durationStr) {
  document.getElementById('currentEpNumber').textContent = String(epNum).padStart(2, '0');
  document.getElementById('activeEpTitle').textContent = title;
  document.getElementById('activeEpDesc').textContent = desc;

  const parts = durationStr.split(':');
  totalSeconds = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  currentSeconds = 0;

  // Update active item styling
  const items = document.querySelectorAll('.ep-item');
  items.forEach((item, idx) => {
    if (idx + 1 === epNum) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  updateAudioDisplay();
  if (!isAudioPlaying) {
    togglePlayAudio();
  }
}

/* ==========================================================================
   4. VIDEO THEATER MODAL
   ========================================================================== */

function openVideoModal(embedUrl) {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoModalIframe');
  if (modal && iframe) {
    iframe.src = embedUrl;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoModalIframe');
  if (modal && iframe) {
    iframe.src = '';
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Close modal upon pressing Escape or clicking backdrop
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeVideoModal();
});

document.addEventListener('click', (e) => {
  const modal = document.getElementById('videoModal');
  if (modal && e.target === modal) {
    closeVideoModal();
  }
});

/* ==========================================================================
   5. INTERACTIVE RELATIONSHIP & ALIGNMENT SELF-ASSESSMENT QUIZ
   ========================================================================== */

const quizQuestions = [
  {
    question: "When a disagreement starts with your partner or family, what is your immediate reflex?",
    hint: "Select the option that reflects your unedited, instinctive response.",
    options: [
      { text: "I counterattack immediately to defend my logic or position.", score: 10 },
      { text: "I shut down emotionally, go silent, and walk away.", score: 12 },
      { text: "I over-explain and try desperately to fix things in the moment.", score: 15 },
      { text: "I take a deep breath, observe my triggers, and seek to understand first.", score: 20 }
    ]
  },
  {
    question: "How do you feel when your partner is visibly upset or distant?",
    hint: "Notice how your nervous system reacts before your mind justifies it.",
    options: [
      { text: "I feel intense anxiety, thinking it is my fault or our relationship is failing.", score: 10 },
      { text: "I feel irritated and resentful that they are ruining my mood.", score: 12 },
      { text: "I give them space, but hold onto silent frustration inside.", score: 16 },
      { text: "I stay centered in my own emotional peace while holding compassionate space.", score: 20 }
    ]
  },
  {
    question: "Do you find yourself repeating the same argument patterns for weeks or months?",
    hint: "Identify if repetitive behavioral loops are recurring in your life.",
    options: [
      { text: "Yes, almost word-for-word every few weeks; nothing ever resolves.", score: 8 },
      { text: "Frequently, especially when tired, stressed, or discussing money/family.", score: 12 },
      { text: "Occasionally, but we usually patch things up after some cool-off time.", score: 16 },
      { text: "Rarely; we use conscious linguistic tools to address core roots immediately.", score: 20 }
    ]
  },
  {
    question: "How easily can you voice your authentic emotional needs without guilt?",
    hint: "True connection requires honest self-expression without fear of rejection.",
    options: [
      { text: "Very difficult; I suppress my needs to keep peace, then explode later.", score: 10 },
      { text: "I demand my needs aggressively because I feel unappreciated otherwise.", score: 12 },
      { text: "I can voice small requests, but deep emotional needs feel vulnerable.", score: 16 },
      { text: "I express my needs with clarity, warmth, and zero passive-aggressive blame.", score: 20 }
    ]
  },
  {
    question: "What is your primary commitment to your inner growth right now?",
    hint: "Transformation begins with the willingness to explore within (Anter Prakash).",
    options: [
      { text: "I am ready to stop blaming external conditions and master my subconscious.", score: 20 },
      { text: "I want to save my marriage or partnership before it drifts further apart.", score: 18 },
      { text: "I want to overcome emotional exhaustion and find daily inner peace.", score: 18 },
      { text: "I am curious to see if NLP coaching can actually make a difference.", score: 15 }
    ]
  }
];

let currentQuizIndex = 0;
let totalQuizScore = 0;

function initQuiz() {
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const questionView = document.getElementById('quizQuestionView');
  const resultView = document.getElementById('quizResultView');
  const stepIndicator = document.getElementById('quizStepIndicator');
  const questionText = document.getElementById('quizQuestionText');
  const hintText = document.getElementById('quizHintText');
  const optionsList = document.getElementById('quizOptionsList');
  const progressFill = document.getElementById('quizProgressFill');

  if (currentQuizIndex >= quizQuestions.length) {
    // Show results
    if (questionView) questionView.style.display = 'none';
    if (resultView) {
      resultView.style.display = 'flex';
      renderQuizResults();
    }
    return;
  }

  const q = quizQuestions[currentQuizIndex];
  if (stepIndicator) stepIndicator.textContent = `QUESTION ${currentQuizIndex + 1} OF ${quizQuestions.length}`;
  if (questionText) questionText.textContent = q.question;
  if (hintText) hintText.textContent = q.hint;
  if (progressFill) progressFill.style.width = `${((currentQuizIndex + 1) / quizQuestions.length) * 100}%`;

  if (optionsList) {
    optionsList.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `
        <span>${opt.text}</span>
        <span style="font-size:0.85rem; color:var(--brown-primary);">➔</span>
      `;
      btn.onclick = () => {
        totalQuizScore += opt.score;
        currentQuizIndex++;
        renderQuizQuestion();
      };
      optionsList.appendChild(btn);
    });
  }
}

function renderQuizResults() {
  const scoreNum = document.getElementById('resultScoreNum');
  const title = document.getElementById('resultTitle');
  const desc = document.getElementById('resultDesc');

  const finalScore = Math.min(totalQuizScore, 100);
  if (scoreNum) scoreNum.textContent = finalScore + '%';

  if (finalScore >= 85) {
    if (title) title.textContent = "Conscious Harmonizer: High Relational Resonance";
    if (desc) desc.textContent = "You demonstrate strong subconscious awareness and empathy. Your growth edge lies in transitioning from good harmony to sacred co-elevation, unlocking creative and life partnership at the highest level.";
  } else if (finalScore >= 70) {
    if (title) title.textContent = "Empathetic Seeker: High Emotional Depth, Communication Gaps";
    if (desc) desc.textContent = "You possess high emotional intelligence, but under high stress or exhaustion, subconscious defense mechanisms trigger withdrawal or over-explaining. The Anter Prakash method will give you bulletproof calm.";
  } else if (finalScore >= 55) {
    if (title) title.textContent = "Reactive Protector: Active Defense Loops & Resentment";
    if (desc) desc.textContent = "Repeated past wounds are triggering automated fight-or-flight reactions. You often feel misunderstood and exhausted. Joining the upcoming Guru Purnima immersion will help decouple these neural loops immediately.";
  } else {
    if (title) title.textContent = "Critical Linguistic Friction: Immediate Reset Recommended";
    if (desc) desc.textContent = "Your communication channels are currently locked in survival mode, eroding daily peace. A structured, compassionate intervention with Coach Dimple Sandhu's frameworks will rebuild safety and understanding.";
  }
}

function resetQuiz() {
  currentQuizIndex = 0;
  totalQuizScore = 0;
  const questionView = document.getElementById('quizQuestionView');
  const resultView = document.getElementById('quizResultView');
  if (questionView) questionView.style.display = 'block';
  if (resultView) resultView.style.display = 'none';
  renderQuizQuestion();
  showToast('Assessment reset. Start fresh!');
}

/* ==========================================================================
   6. HALL OF FAME FILTERING
   ========================================================================== */

function filterHallOfFame(category) {
  const buttons = document.querySelectorAll('.hof-tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  const cards = document.querySelectorAll('.testimonial-video-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });

  showToast(`Showing: ${category.toUpperCase()} success stories`);
}

/* ==========================================================================
   7. VIP CONSULTATION FORM SUBMISSION
   ========================================================================== */

function handleLeadSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('fullName').value.trim();
  const phone = document.getElementById('contactNumber').value.trim();
  const captcha = document.getElementById('captchaAnswer').value.trim();

  // Validate math captcha (5 + 4 = 9)
  if (captcha !== '9') {
    showToast('Incorrect security answer. Please solve: 5 + 4 = 9');
    document.getElementById('captchaAnswer').focus();
    return;
  }

  // Success Feedback
  showToast(`Thank you ${name}! Your consultation request is confirmed.`);

  // Re-route to WhatsApp option or direct Zoom registration
  setTimeout(() => {
    const confirmChoice = confirm(`Success! Would you like to connect directly with Coach Dimple Sandhu's team on WhatsApp right now?`);
    if (confirmChoice) {
      const msg = encodeURIComponent(`Namaste Coach Dimple, I just requested a consultation on RouteWithin. My name is ${name} (${phone}). Looking forward to guidance.`);
      window.open(`https://wa.me/919872250153?text=${msg}`, '_blank');
    }
    document.getElementById('leadCaptureForm').reset();
  }, 1000);
}

/* ==========================================================================
   8. SMOOTH SCROLLING & REVEAL ANIMATIONS
   ========================================================================== */

function initScrollAnimations() {
  initScrollProgressBar();
  initBackToTop();
  initSmoothAnchorLinks();
  initRevealOnScroll();
  initScrollObserver();
  initCounterAnimations();
}

/**
 * Reading / Scroll Progress Bar at the bottom of the sticky navbar
 */
function initScrollProgressBar() {
  const navbar = document.getElementById('mainNavbar');
  if (!navbar) return;

  let progressBar = document.getElementById('scrollProgressBar');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'scrollProgressBar';
    progressBar.className = 'scroll-progress-bar';
    navbar.appendChild(progressBar);
  }

  function updateProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollHeight > 0) {
      const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
      progressBar.style.width = `${progress}%`;
    }
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/**
 * Floating Back-To-Top Button with Smooth Scroll
 */
function initBackToTop() {
  let backBtn = document.getElementById('backToTopBtn');
  if (!backBtn) {
    backBtn = document.createElement('button');
    backBtn.id = 'backToTopBtn';
    backBtn.className = 'back-to-top';
    backBtn.setAttribute('aria-label', 'Scroll back to top');
    backBtn.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    `;
    document.body.appendChild(backBtn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  }, { passive: true });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Smooth Anchor Links with Navbar Offset
 */
function initSmoothAnchorLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navOffset = 88;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navOffset;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });

        // Close mobile drawer if open
        const drawer = document.getElementById('mobileDrawer');
        if (drawer) drawer.classList.remove('open');
      }
    });
  });
}

/**
 * Intersection Observer for Smooth Reveal Animations
 */
function initScrollObserver() {
  // If user prefers reduced motion, reveal everything immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.scroll-reveal, .scroll-stagger, .scroll-reveal-zoom, .scroll-reveal-left, .scroll-reveal-right')
      .forEach(el => el.classList.add('revealed'));
    return;
  }

  // Auto-tag key structural sections and cards for smooth reveals
  const revealTargets = document.querySelectorAll(`
    .hero-content, .hero-visual,
    .video-feature-box, .video-player-wrapper,
    .pillars-grid, .pillar-card,
    .programs-grid, .program-card,
    .hof-grid, .testimonial-video-card,
    .assessment-card, .event-card,
    .podcast-card, .lead-card, .auth-card,
    .section-tag, .section-title, .section-subtitle,
    .features-grid, .curriculum-modules-grid,
    .faq-accordion, .faq-item,
    .story-card, .contact-card, .contact-form-card
  `);

  revealTargets.forEach(el => {
    if (!el.classList.contains('scroll-reveal') && !el.classList.contains('scroll-stagger')) {
      if (el.classList.contains('pillars-grid') ||
        el.classList.contains('programs-grid') ||
        el.classList.contains('hof-grid') ||
        el.classList.contains('features-grid') ||
        el.classList.contains('curriculum-modules-grid')) {
        el.classList.add('scroll-stagger');
      } else if (el.classList.contains('hero-visual') || el.classList.contains('video-player-wrapper')) {
        el.classList.add('scroll-reveal-zoom');
      } else {
        el.classList.add('scroll-reveal');
      }
    }
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.scroll-reveal, .scroll-reveal-zoom, .scroll-reveal-left, .scroll-reveal-right, .scroll-stagger')
    .forEach(el => observer.observe(el));
}

/**
 * Smooth Animated Number Counters (e.g. 1,000+, 300+, 50+)
 */
function initCounterAnimations() {
  const metricEls = document.querySelectorAll('.metric-number, .stat-number');
  if (!metricEls.length) return;

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  metricEls.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const text = el.textContent.trim();
    const match = text.match(/([^\d]*)([\d,]+)([^\d]*)/);
    if (!match) return;

    const prefix = match[1] || '';
    const rawNum = parseInt(match[2].replace(/,/g, ''), 10);
    const suffix = match[3] || '';

    if (isNaN(rawNum) || rawNum === 0) return;

    const duration = 1600;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(eased * rawNum);

      el.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = text;
      }
    }

    requestAnimationFrame(updateCounter);
  }
}

/* ==========================================================================
   9. CALENDAR INVITE (.ICS) GENERATOR
   ========================================================================== */

function downloadCalendarInvite() {
  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//RouteWithin//Masterclass//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'SUMMARY:RouteWithin - Guru Purnima Live Masterclass with Dimple Sandhu',
    'DESCRIPTION:Interactive Relationship and Subconscious Inner Alignment Session with Coach Dimple Sandhu.\\n\\nZoom Link: https://us06web.zoom.us/j/82870705301?pwd=Bl05nQSRaPrdk9VufbWie76UfP8cOg.1',
    'LOCATION:Zoom Live Online',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'RouteWithin_Masterclass.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Calendar invite (.ics) downloaded! Added to schedule.');
}

/* ==========================================================================
   10. TOAST NOTIFICATION UTILITY & NAV HELPERS
   ========================================================================== */

let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toastNotice');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function openSignInModal(e) {
  if (e) e.preventDefault();
  showToast('Member Portal: Please sign in or apply for consultation below.');
  const contactSec = document.getElementById('contact');
  if (contactSec) {
    contactSec.scrollIntoView({ behavior: 'smooth' });
  }
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobileDrawer');
  if (drawer) drawer.classList.remove('open');
}

/* ==========================================================================
   11. VIDEO MODAL UTILITY
   ========================================================================== */

function openHeroVideoModal() {
  openVideoModal('https://www.youtube.com/embed/XFVP9e8r24s?autoplay=1');
}

function openVideoModal(url) {
  let modal = document.getElementById('globalVideoModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'globalVideoModal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-content-box">
        <button class="modal-close-x" onclick="closeVideoModal()" aria-label="Close video">×</button>
        <div class="video-container-ratio">
          <iframe id="globalVideoIframe" src="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    `;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeVideoModal();
    });
    document.body.appendChild(modal);
  }
  let targetUrl = url || 'https://www.youtube.com/embed/XFVP9e8r24s?autoplay=1';
  if (targetUrl.includes('/shorts/')) {
    targetUrl = targetUrl.replace('/shorts/', '/embed/');
    if (!targetUrl.includes('autoplay=1')) {
      targetUrl += (targetUrl.includes('?') ? '&' : '?') + 'autoplay=1';
    }
  } else if (targetUrl.includes('watch?v=')) {
    targetUrl = targetUrl.replace('watch?v=', 'embed/');
    if (!targetUrl.includes('autoplay=1')) {
      targetUrl += (targetUrl.includes('?') ? '&' : '?') + 'autoplay=1';
    }
  }
  const iframe = document.getElementById('globalVideoIframe');
  if (iframe) iframe.src = targetUrl;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const modal = document.getElementById('globalVideoModal');
  if (modal) {
    modal.classList.remove('open');
    const iframe = document.getElementById('globalVideoIframe');
    if (iframe) iframe.src = '';
  }
  document.body.style.overflow = '';
}

/* ==========================================================================
   12. GURU PURNIMA WEBINAR SUITE: POPUP MODAL & REGISTRATION CORE
   ========================================================================== */

function initWebinarSuite() {
  createWebinarModalIfMissing();

  // Automatic popup trigger: 2.5s after landing if not dismissed in this session
  // Skip auto popup on registration, thank-you, and admin pages
  const path = window.location.pathname.toLowerCase();
  const isExcludedPage = path.includes('webinar-register') ||
    path.includes('thank-you') ||
    path.includes('admin-leads');

  if (!isExcludedPage) {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem('rw_webinar_popup_dismissed');
    } catch (e) { }

    if (!dismissed) {
      setTimeout(() => {
        openWebinarModal();
      }, 2500);
    }
  }

  // Keyboard accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeWebinarModal();
    }
  });
}

function createWebinarModalIfMissing() {
  if (document.getElementById('guruPurnimaModal')) return;

  const modal = document.createElement('div');
  modal.id = 'guruPurnimaModal';
  modal.className = 'webinar-modal-backdrop';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Guru Purnima Webinar and Pro Bono Coaching');

  modal.innerHTML = `
    <div class="webinar-modal-card">
      <button class="webinar-modal-close" onclick="closeWebinarModal()" aria-label="Close modal">&times;</button>
      
      <div class="webinar-modal-poster-col">
        <img src="assets/gurupurnima.jpg" alt="Happy Guru Purnima Pro Bono Coaching Journey Poster" class="webinar-modal-poster-img" loading="eager">
      </div>

      <div class="webinar-modal-info-col">
        <div>
          <span class="webinar-modal-kicker">
            <span class="webinar-flag-pulse"></span> Free Introductory Seminar / Webinar
          </span>

          <h2 class="webinar-modal-title">Happy Guru Purnima Pro Bono Coaching Journey</h2>
          <p class="webinar-modal-subtitle">
            A sacred gift of guidance & transformation by Master Coach <strong>Dimple Sandhu</strong>. Offered with Seva & Gratitude for your inner peace and emotional freedom.
          </p>

          <ul class="webinar-modal-highlights">
            <li>
              <span class="icon">✨</span>
              <span><strong>100% Free Pro Bono Offer:</strong> Serious commitment, real emotional transformation.</span>
            </li>
            <li>
              <span class="icon">👥</span>
              <span><strong>Limited to 2 1:1 Spots:</strong> Plus exclusive access to the live weekly alignment immersion.</span>
            </li>
            <li>
              <span class="icon">🕊️</span>
              <span><strong>For Women Seeking Harmony:</strong> Heal communication gaps, anxiety, and reclaim self-worth.</span>
            </li>
          </ul>

          <div class="webinar-modal-schedule">
            <div class="schedule-item">
              <span style="color: #A65A3D; font-weight: 600; font-size: 0.76rem; text-transform: uppercase;">Event Date</span>
              <strong>Wednesday, Oct 28, 2026</strong>
            </div>
            <div class="schedule-item">
              <span style="color: #A65A3D; font-weight: 600; font-size: 0.76rem; text-transform: uppercase;">Timing</span>
              <strong>4:30 PM – 5:30 PM IST</strong>
            </div>
            <div class="schedule-item">
              <span style="color: #A65A3D; font-weight: 600; font-size: 0.76rem; text-transform: uppercase;">Access</span>
              <strong style="color: #2E7D32;">100% Free (Zoom)</strong>
            </div>
          </div>
        </div>

        <div>
          <a href="webinar-register.html" class="webinar-modal-cta-btn" onclick="closeWebinarModal()">
            Fill Interest Form & Register Free →
          </a>
          <p class="webinar-modal-note">
            Direct WhatsApp Community joining link provided on the next confirmation screen.
          </p>
        </div>
      </div>
    </div>
  `;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeWebinarModal();
    }
  });

  document.body.appendChild(modal);
}

function openWebinarModal() {
  createWebinarModalIfMissing();
  const modal = document.getElementById('guruPurnimaModal');
  if (modal) {
    const card = modal.querySelector('.webinar-modal-card');
    if (card) card.scrollTop = 0;
    modal.scrollTop = 0;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeWebinarModal() {
  const modal = document.getElementById('guruPurnimaModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    try {
      sessionStorage.setItem('rw_webinar_popup_dismissed', 'true');
    } catch (e) { }
  }
}

// ═══════════════════════════════════════════════════════════════
//  GOOGLE SHEETS BACKEND INTEGRATION
//  Replace the URL below with YOUR deployed Google Apps Script URL
// ═══════════════════════════════════════════════════════════════
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbjOsVYOEPZr7WUFfEbWRzS3wCMOT1rUmpxOAIYsSANTAs8i30CMSu8MSiwSrQxh-nuA/exec';

/**
 * Sends registration data to Google Sheets backend.
 * Non-blocking — fires and forgets so the user isn't held up.
 * Falls back gracefully if backend is unavailable.
 */
function sendToGoogleSheets(action, data) {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
    console.warn('[RouteWithin] Google Sheets backend URL not configured. Skipping cloud sync.');
    return Promise.resolve({ success: false, reason: 'not_configured' });
  }

  return fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors', // Google Apps Script doesn't support CORS preflight
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ action: action, data: data })
  })
  .then(function() {
    console.log('[RouteWithin] ✅ Registration synced to Google Sheets.');
    return { success: true };
  })
  .catch(function(err) {
    console.warn('[RouteWithin] ⚠️ Could not sync to Google Sheets (offline?):', err.message);
    return { success: false, reason: err.message };
  });
}

// Global Registration Helper (Used by webinar-register.html)
function registerWebinarLead(data) {
  try {
    const existing = JSON.parse(localStorage.getItem('routewithin_webinar_registrations') || '[]');
    const record = {
      id: 'REG-' + Date.now().toString(36).toUpperCase(),
      registeredAt: new Date().toISOString(),
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      city: data.city || '',
      course: data.course || 'Guru Purnima Pro Bono Coaching & Masterclass',
      type: data.type || 'Free Pro Bono',
      paymentStatus: data.paymentStatus || 'Free',
      challenge: data.challenge || '',
      status: 'Joined Community'
    };
    existing.unshift(record);
    localStorage.setItem('routewithin_webinar_registrations', JSON.stringify(existing));
    sessionStorage.setItem('rw_latest_registrant', JSON.stringify(record));

    // ── Sync to Google Sheets (non-blocking) ──
    const isFree = (data.type || '').toLowerCase().includes('free') ||
                   (data.paymentStatus || '').toLowerCase() === 'free';
    const action = isFree ? 'register_free' : 'register_paid';

    sendToGoogleSheets(action, {
      name: record.name,
      email: record.email,
      phone: record.phone,
      city: record.city,
      challenge: record.challenge,
      course: record.course,
      amount: data.amount || 0,
      paymentStatus: record.paymentStatus,
      paymentMethod: data.paymentMethod || 'N/A',
      sourcePage: window.location.pathname.split('/').pop() || 'unknown'
    });

    return record;
  } catch (err) {
    console.error('Error saving registration:', err);
    return null;
  }
}

window.openWebinarModal = openWebinarModal;
window.closeWebinarModal = closeWebinarModal;
window.registerWebinarLead = registerWebinarLead;
window.sendToGoogleSheets = sendToGoogleSheets;


