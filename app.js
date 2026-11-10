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
    if (desc) desc.textContent = "Repeated past wounds are triggering automated fight-or-flight reactions. You often feel misunderstood and exhausted. Joining the upcoming Karwa Chauth special masterclass will help decouple these neural loops immediately.";
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
    'SUMMARY:RouteWithin - Beyond the Vrat: A Karwa Chauth Masterclass with Dimple Sandhu',
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
   12. UNIFIED REGISTRATION & RAZORPAY CHECKOUT ENGINE (PAID & FREE)
   ========================================================================== */

// ─── RAZORPAY PAYMENT GATEWAY CONFIGURATION ─────────────────────────
// You can paste your live or test Razorpay Key ID below when ready:
window.RAZORPAY_CONFIG = window.RAZORPAY_CONFIG || {
  key: 'rzp_test_YOUR_KEY_HERE', // <-- PASTE YOUR RAZORPAY KEY ID HERE
  companyName: 'RouteWithin',
  companyLogo: 'assets/rw_icon.png',
  themeColor: '#C67B5C'
};

// ─── COMPLETE ROUTEWITHIN PROGRAM & EVENT CATALOG ───────────────────
window.ROUTEWITHIN_CATALOG = {
  // 1) AntarPrakash (6-weeks) ₹ 11,999
  'antarprakash': {
    id: 'antarprakash',
    title: 'AntarPrakash',
    duration: '6-Weeks',
    priceDisplay: '₹ 11,999',
    amount: 11999,
    isPaid: true,
    badge: '6-WEEKS GUIDED COHORT',
    description: 'A transformative 6-week guided journey to explore yourself, heal subconscious conflict loops, and cultivate deep inside-out alignment for radiant relationships.'
  },
  // 2) Inner Circle (6 Months) ₹ 59,999
  'inner-circle': {
    id: 'inner-circle',
    title: 'Inner Circle',
    duration: '6 Months',
    priceDisplay: '₹ 59,999',
    amount: 59999,
    isPaid: true,
    badge: '6-MONTH PRIVATE MENTORSHIP',
    description: 'An intimate, high-touch 6-month private mentorship and mastermind cohort with Master Coach Dimple Sandhu for lasting personal elevation and relationship mastery.'
  },
  // 3) Gratitude Circle (Continuity membership) ₹ 555/month
  'gratitude-circle': {
    id: 'gratitude-circle',
    title: 'Gratitude Circle',
    duration: 'Continuity Membership',
    priceDisplay: '₹ 555 / month',
    amount: 555,
    isPaid: true,
    badge: 'CONTINUITY MEMBERSHIP',
    description: 'A consistent, nourishing weekly sanctuary to ground yourself in gratitude, dissolve everyday stress, and stay emotionally centered.'
  },
  // 4) Rishta Reset Live (weekly) (Live workshop) ₹ 99
  'rishta-reset': {
    id: 'rishta-reset',
    title: 'Rishta Reset Live',
    duration: 'Weekly Live Workshop',
    priceDisplay: '₹ 99',
    amount: 99,
    isPaid: true,
    badge: 'WEEKLY LIVE WORKSHOP',
    description: 'A focused 90-minute live interactive workshop designed to immediately stop recurring arguments, break emotional distance, and reset communication with your partner.'
  },
  // 5) Free Event: Beyond the Vrat (Karwa Chauth Masterclass)
  'karwa-chauth': {
    id: 'karwa-chauth',
    title: 'Beyond the Vrat: A Karwa Chauth Masterclass',
    duration: 'Nov 2, 2026 (4:30 PM IST)',
    priceDisplay: '100% Free (Zoom)',
    amount: 0,
    isPaid: false,
    badge: '100% FREE ZOOM MASTERCLASS',
    description: 'For women who give their love every day and want to feel it back. One honest hour dedicated to mutual respect, emotional safety, and true partnership.'
  },
  // 6) Free Event: Weekly Interactive Masterclasses (Wednesday)
  'active-initiative': {
    id: 'active-initiative',
    title: 'Weekly Interactive Masterclasses',
    duration: 'Every Wednesday (Live Zoom)',
    priceDisplay: '100% Free (Zoom)',
    amount: 0,
    isPaid: false,
    badge: 'ACTIVE INITIATIVE • WEDNESDAY',
    description: 'Live cohorts breaking down subconscious conflict loops, emotional triggers, and daily communication frameworks.'
  }
};

let currentRegProgram = null;
let pendingOrderData = null;

// Dynamically inject Razorpay SDK if not already in document
function ensureRazorpayScriptLoaded(callback) {
  if (typeof Razorpay !== 'undefined') {
    if (callback) callback();
    return;
  }
  const existing = document.querySelector('script[src*="checkout.razorpay.com"]');
  if (existing) {
    existing.addEventListener('load', function() { if (callback) callback(); });
    return;
  }
  const s = document.createElement('script');
  s.src = 'https://checkout.razorpay.com/v1/checkout.js';
  s.async = true;
  s.onload = function() { if (callback) callback(); };
  document.head.appendChild(s);
}

// Inject Registration & Sandbox Modals DOM if not already present
function ensureRegistrationModalDOM() {
  if (document.getElementById('rwRegistrationModal')) return;

  const modalHtml = `
  <!-- Unified Registration Modal -->
  <div class="rw-reg-backdrop" id="rwRegistrationModal" role="dialog" aria-modal="true" aria-labelledby="rwModalTitle">
    <div class="rw-reg-modal">
      <div class="rw-reg-header">
        <button type="button" class="rw-reg-close-btn" onclick="closeRegistrationModal()" aria-label="Close dialog">✕</button>
        <span class="rw-reg-tag" id="rwModalBadge">PROGRAM ENROLLMENT</span>
        <h3 class="rw-reg-title" id="rwModalTitle">Program Title</h3>
        <div class="rw-reg-price-tag" id="rwModalPrice">₹ 11,999</div>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0.35rem 0 0;" id="rwModalDesc">
          Program description
        </p>
      </div>

      <form class="rw-reg-body" id="rwRegistrationForm" novalidate onsubmit="handleRegistrationSubmit(event)">
        <div class="rw-reg-group">
          <label class="rw-reg-label" for="rwRegName">Full Name <span style="color: var(--terracotta);">*</span></label>
          <input type="text" id="rwRegName" class="rw-reg-input" placeholder="e.g. Priya Sharma" required autocomplete="name">
          <div class="rw-reg-error" id="rwNameError">Please enter your full name.</div>
        </div>

        <div class="rw-reg-group">
          <label class="rw-reg-label" for="rwRegEmail">Email Address <span style="color: var(--terracotta);">*</span></label>
          <input type="email" id="rwRegEmail" class="rw-reg-input" placeholder="e.g. priya@example.com" required autocomplete="email">
          <div class="rw-reg-error" id="rwEmailError">Please enter a valid email address.</div>
        </div>

        <div class="rw-reg-group">
          <label class="rw-reg-label" for="rwRegPhone">WhatsApp / Mobile Number <span style="color: var(--terracotta);">*</span></label>
          <input type="tel" id="rwRegPhone" class="rw-reg-input" placeholder="+91 98765 43210" required autocomplete="tel">
          <span style="font-size: 0.74rem; color: var(--text-muted); display: block; margin-top: 0.25rem;">
            Access details, community credentials & materials are delivered to this number.
          </span>
          <div class="rw-reg-error" id="rwPhoneError">Please enter a valid WhatsApp / phone number.</div>
        </div>

        <div class="rw-reg-group">
          <label class="rw-reg-label" for="rwRegCity">City / Location <span style="color: var(--terracotta);">*</span></label>
          <input type="text" id="rwRegCity" class="rw-reg-input" placeholder="e.g. New Delhi, India" required>
          <div class="rw-reg-error" id="rwCityError">Please enter your city/location.</div>
        </div>

        <div class="rw-reg-group">
          <label class="rw-reg-label" for="rwRegChallenge">What is your primary relationship challenge or goal? (Optional)</label>
          <textarea id="rwRegChallenge" rows="2" class="rw-reg-textarea" placeholder="Share briefly what you hope Coach Dimple can address for you..."></textarea>
        </div>

        <!-- Summary & Security Badge Box -->
        <div class="rw-reg-summary" id="rwSummaryBox">
          <div>
            <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); display: block;">Registration Fee</span>
            <span style="font-size: 1.25rem; font-weight: 800; color: var(--text-heading);" id="rwSummaryAmount">₹ 11,999</span>
          </div>
          <div style="text-align: right;">
            <span style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.75rem; font-weight: 700; color: var(--terracotta); background: rgba(198, 123, 92, 0.12); padding: 0.25rem 0.6rem; border-radius: 9999px;" id="rwGatewayBadge">
              🔒 Razorpay 256-Bit SSL
            </span>
          </div>
        </div>

        <button type="submit" class="btn btn-hero-book btn-lg rw-reg-btn-submit" id="rwSubmitBtn">
          Proceed to Payment →
        </button>

        <div style="margin-top: 0.85rem; text-align: center; font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; justify-content: center; gap: 0.4rem;">
          <span>🔒</span>
          <span>100% Confidential. Your privacy is strictly protected by RouteWithin.</span>
        </div>
      </form>
    </div>
  </div>

  <!-- Razorpay Developer / Client Sandbox Prompt Modal -->
  <div class="rw-reg-backdrop" id="rwSandboxPromptModal" role="dialog" aria-modal="true" style="z-index: 100000;">
    <div class="rw-reg-modal" style="max-width: 29rem; text-align: center; padding: 2rem 1.75rem;">
      <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">💳</div>
      <h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: var(--text-heading); margin-bottom: 0.5rem;">
        Razorpay Gateway Ready
      </h3>
      <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55; margin-bottom: 1.15rem;">
        Your Razorpay integration is ready! To accept real live payments, paste your Razorpay Key ID into <code style="background: rgba(139,111,71,0.15); padding: 0.1rem 0.35rem; border-radius: 4px;">app.js</code> in <code style="background: rgba(139,111,71,0.15); padding: 0.1rem 0.35rem; border-radius: 4px;">window.RAZORPAY_CONFIG.key</code>.
      </p>
      <div style="background: rgba(198, 123, 92, 0.08); border: 1px dashed rgba(198, 123, 92, 0.35); border-radius: 0.75rem; padding: 0.85rem; margin-bottom: 1.25rem; font-size: 0.85rem; color: var(--text-heading); text-align: left;">
        <div><strong>Selected Program:</strong> <span id="rwSandboxProgram">AntarPrakash</span></div>
        <div><strong>Amount:</strong> <span id="rwSandboxAmount">₹ 11,999</span></div>
        <div style="font-size: 0.78rem; color: var(--terracotta); margin-top: 0.45rem; line-height: 1.4;">
          ⚠️ <strong>Sheet Rule:</strong> Data will ONLY report to Google Sheets AFTER payment is confirmed below.
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <button type="button" class="btn btn-hero-book btn-md" onclick="simulateSuccessfulPayment()" style="width: 100%;">
          ✓ Simulate Successful Payment (Tests Google Sheets)
        </button>
        <button type="button" class="btn btn-secondary btn-md" onclick="closeSandboxModal()" style="width: 100%;">
          Cancel (Do Not Report to Sheets)
        </button>
      </div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  // Close when clicking on backdrop outside modal card
  const regModal = document.getElementById('rwRegistrationModal');
  regModal.addEventListener('click', function(e) {
    if (e.target === regModal) closeRegistrationModal();
  });

  const sandModal = document.getElementById('rwSandboxPromptModal');
  sandModal.addEventListener('click', function(e) {
    if (e.target === sandModal) closeSandboxModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeRegistrationModal();
      closeSandboxModal();
    }
  });
}

function openRegistrationModal(programId) {
  const prog = window.ROUTEWITHIN_CATALOG[programId] || window.ROUTEWITHIN_CATALOG['antarprakash'];
  currentRegProgram = prog;

  ensureRegistrationModalDOM();

  const modal = document.getElementById('rwRegistrationModal');
  if (!modal) return;

  document.getElementById('rwModalBadge').textContent = prog.badge;
  document.getElementById('rwModalTitle').textContent = prog.title;
  document.getElementById('rwModalPrice').textContent = prog.priceDisplay;
  document.getElementById('rwModalDesc').textContent = prog.description;
  document.getElementById('rwSummaryAmount').textContent = prog.priceDisplay;

  const submitBtn = document.getElementById('rwSubmitBtn');
  const gatewayBadge = document.getElementById('rwGatewayBadge');

  if (prog.isPaid) {
    submitBtn.innerHTML = 'Proceed to Payment • ' + prog.priceDisplay + ' →';
    gatewayBadge.innerHTML = '🔒 Razorpay 256-Bit SSL';
    gatewayBadge.style.color = 'var(--terracotta)';
    gatewayBadge.style.background = 'rgba(198, 123, 92, 0.12)';
  } else {
    submitBtn.innerHTML = 'Confirm Free Registration →';
    gatewayBadge.innerHTML = '🎁 100% Free Access';
    gatewayBadge.style.color = '#2E7D32';
    gatewayBadge.style.background = 'rgba(46, 125, 50, 0.12)';
  }

  // Clear previous errors
  modal.querySelectorAll('.rw-reg-error').forEach(function(el) { el.style.display = 'none'; });

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Ensure Razorpay SDK is ready in the background if paid
  if (prog.isPaid) {
    ensureRazorpayScriptLoaded();
  }

  setTimeout(function() {
    const firstInput = document.getElementById('rwRegName');
    if (firstInput) firstInput.focus();
  }, 100);
}

function closeRegistrationModal() {
  const modal = document.getElementById('rwRegistrationModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function openSandboxModal() {
  if (!pendingOrderData) return;
  const sModal = document.getElementById('rwSandboxPromptModal');
  if (!sModal) return;
  document.getElementById('rwSandboxProgram').textContent = pendingOrderData.program.title;
  document.getElementById('rwSandboxAmount').textContent = pendingOrderData.program.priceDisplay;
  sModal.classList.add('active');
}

function closeSandboxModal() {
  const sModal = document.getElementById('rwSandboxPromptModal');
  if (sModal) sModal.classList.remove('active');
  if (pendingOrderData && pendingOrderData.submitBtn) {
    pendingOrderData.submitBtn.disabled = false;
    pendingOrderData.submitBtn.innerHTML = pendingOrderData.originalBtnText;
  }
}

function simulateSuccessfulPayment() {
  closeSandboxModal();
  const simulatedId = 'pay_SIMULATED_' + Date.now().toString(36).toUpperCase();
  finalizePaidRegistration(simulatedId, 'Razorpay (Simulation)');
}

function handleRegistrationSubmit(e) {
  e.preventDefault();
  if (!currentRegProgram) return;

  const nameEl = document.getElementById('rwRegName');
  const emailEl = document.getElementById('rwRegEmail');
  const phoneEl = document.getElementById('rwRegPhone');
  const cityEl = document.getElementById('rwRegCity');
  const challengeEl = document.getElementById('rwRegChallenge');

  let valid = true;

  if (!nameEl.value.trim()) {
    document.getElementById('rwNameError').style.display = 'block';
    valid = false;
  } else {
    document.getElementById('rwNameError').style.display = 'none';
  }

  const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;
  if (!emailRegex.test(emailEl.value.trim())) {
    document.getElementById('rwEmailError').style.display = 'block';
    valid = false;
  } else {
    document.getElementById('rwEmailError').style.display = 'none';
  }

  if (phoneEl.value.trim().length < 8) {
    document.getElementById('rwPhoneError').style.display = 'block';
    valid = false;
  } else {
    document.getElementById('rwPhoneError').style.display = 'none';
  }

  if (!cityEl.value.trim()) {
    document.getElementById('rwCityError').style.display = 'block';
    valid = false;
  } else {
    document.getElementById('rwCityError').style.display = 'none';
  }

  if (!valid) return;

  const formData = {
    name: nameEl.value.trim(),
    email: emailEl.value.trim(),
    phone: phoneEl.value.trim(),
    city: cityEl.value.trim(),
    challenge: challengeEl ? challengeEl.value.trim() : '',
    course: currentRegProgram.title + (currentRegProgram.duration ? ' (' + currentRegProgram.duration + ')' : ''),
    sourcePage: window.location.pathname.split('/').pop() || 'programs.html'
  };

  const submitBtn = document.getElementById('rwSubmitBtn');
  const originalBtnText = submitBtn.innerHTML;

  // ─────────────────────────────────────────────────────────────
  // 1. FREE REGISTRATION FLOW (amount === 0)
  // ─────────────────────────────────────────────────────────────
  if (!currentRegProgram.isPaid || currentRegProgram.amount === 0) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Securing Your Free Seat...';

    const freeLead = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      challenge: formData.challenge || 'Free Session Registration',
      course: formData.course,
      amount: 0,
      type: 'Free Pro Bono',
      paymentStatus: 'Free',
      paymentMethod: 'Free',
      sourcePage: formData.sourcePage
    };

    let syncPromise = Promise.resolve();
    if (typeof registerWebinarLead === 'function') {
      syncPromise = registerWebinarLead(freeLead);
    }

    Promise.resolve(syncPromise).finally(function() {
      setTimeout(function() {
        window.location.href = 'thank-you.html';
      }, 400);
    });
    return;
  }

  // ─────────────────────────────────────────────────────────────
  // 2. PAID PROGRAM FLOW (Razorpay Gateway)
  // CRITICAL REQUIREMENT: "make sure it reports to the sheets AFTER
  // the payment is made and not before that"
  // DO NOT CALL registerWebinarLead OR sendToGoogleSheets HERE!
  // ─────────────────────────────────────────────────────────────
  pendingOrderData = {
    formData: formData,
    program: currentRegProgram,
    submitBtn: submitBtn,
    originalBtnText: originalBtnText
  };

  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Connecting to Secure Gateway...';

  const configKey = (window.RAZORPAY_CONFIG && window.RAZORPAY_CONFIG.key) ? window.RAZORPAY_CONFIG.key.trim() : '';
  const isPlaceholderKey = !configKey || configKey === 'rzp_test_YOUR_KEY_HERE' || configKey.includes('YOUR_KEY_HERE');

  if (isPlaceholderKey) {
    // Open Sandbox Simulation prompt so user can test Google Sheets logging
    openSandboxModal();
    return;
  }

  // Live or test key is set -> launch real Razorpay Checkout
  launchRazorpayCheckout(configKey, formData, currentRegProgram, submitBtn, originalBtnText);
}

function launchRazorpayCheckout(key, formData, program, submitBtn, originalBtnText) {
  ensureRazorpayScriptLoaded(function() {
    try {
      const amountInPaise = Math.round(Number(program.amount) * 100);

      const rzpOptions = {
        key: key,
        amount: amountInPaise,
        currency: 'INR',
        name: window.RAZORPAY_CONFIG.companyName || 'RouteWithin',
        description: program.title + ' (' + program.duration + ')',
        image: window.RAZORPAY_CONFIG.companyLogo || 'assets/favicon.png',
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        notes: {
          program: program.title,
          duration: program.duration,
          city: formData.city,
          challenge: formData.challenge || 'N/A'
        },
        theme: {
          color: window.RAZORPAY_CONFIG.themeColor || '#C67B5C'
        },
        modal: {
          ondismiss: function() {
            console.log('[RouteWithin] Razorpay checkout closed without payment.');
            console.log('[RouteWithin] Verified: Google Sheets reporting has NOT been triggered.');
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnText;
            }
            if (typeof showToast === 'function') {
              showToast('Payment window closed. You have not been charged.');
            }
          }
        },
        handler: function(response) {
          // ═══════════════════════════════════════════════════════════════
          // PAYMENT IS VERIFIED AND COMPLETED!
          // NOW AND ONLY NOW REPORT TO GOOGLE SHEETS
          // ═══════════════════════════════════════════════════════════════
          finalizePaidRegistration(response.razorpay_payment_id, 'Razorpay');
        }
      };

      const rzpInstance = new Razorpay(rzpOptions);
      rzpInstance.on('payment.failed', function(resp) {
        console.error('[RouteWithin] Razorpay payment failed:', resp.error);
        alert('Payment was not completed: ' + (resp.error.description || 'Transaction declined.'));
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      });
      rzpInstance.open();

    } catch (err) {
      console.error('[RouteWithin] Error initializing Razorpay:', err);
      alert('Error launching payment gateway: ' + err.message);
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  });
}

function finalizePaidRegistration(paymentId, paymentMethod) {
  if (!pendingOrderData) return;

  const formData = pendingOrderData.formData;
  const program = pendingOrderData.program;
  const submitBtn = pendingOrderData.submitBtn;

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Payment Confirmed! Securing Enrollment...';
  }

  console.log('[RouteWithin] ✅ Payment Verified! Payment ID:', paymentId);
  console.log('[RouteWithin] 📡 Now reporting confirmed registration to Google Sheets...');

  const finalizedLead = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    city: formData.city,
    challenge: formData.challenge || program.title,
    course: program.title + (program.duration ? ' (' + program.duration + ')' : ''),
    amount: program.amount,
    type: 'Paid Plan',
    paymentStatus: 'Paid',
    paymentMethod: paymentMethod || 'Razorpay',
    paymentId: paymentId || ('pay_' + Date.now().toString(36).toUpperCase()),
    sourcePage: formData.sourcePage || 'programs.html'
  };

  let syncPromise = Promise.resolve();
  if (typeof registerWebinarLead === 'function') {
    syncPromise = registerWebinarLead(finalizedLead);
  }

  // Smooth redirect to thank you page with verified payment details
  Promise.resolve(syncPromise).finally(function() {
    setTimeout(function() {
      window.location.href = 'thank-you.html?status=paid&program=' + 
        encodeURIComponent(program.title) + 
        '&payment_id=' + encodeURIComponent(finalizedLead.paymentId);
    }, 450);
  });
}

function initWebinarSuite() {
  ensureRegistrationModalDOM();

  // Listen to any elements with data-register attribute
  document.addEventListener('click', function(e) {
    const trigger = e.target.closest('[data-register]');
    if (trigger) {
      e.preventDefault();
      const progId = trigger.getAttribute('data-register');
      openRegistrationModal(progId);
    }
  });

  // Check URL query param ?register=programId
  try {
    const params = new URLSearchParams(window.location.search);
    const regParam = params.get('register') || params.get('enroll');
    if (regParam && window.ROUTEWITHIN_CATALOG[regParam]) {
      setTimeout(function() {
        openRegistrationModal(regParam);
      }, 350);
    }
  } catch (err) {}
}

function openWebinarModal() {
  openRegistrationModal('karwa-chauth');
}

function closeWebinarModal() {
  closeRegistrationModal();
}

// Window global exports
window.openRegistrationModal = openRegistrationModal;
window.closeRegistrationModal = closeRegistrationModal;
window.handleRegistrationSubmit = handleRegistrationSubmit;
window.openSandboxModal = openSandboxModal;
window.closeSandboxModal = closeSandboxModal;
window.simulateSuccessfulPayment = simulateSuccessfulPayment;
window.openWebinarModal = openWebinarModal;
window.closeWebinarModal = closeWebinarModal;


// ═══════════════════════════════════════════════════════════════
//  GOOGLE SHEETS BACKEND INTEGRATION
//  Replace the URL below with YOUR deployed Google Apps Script URL
// ═══════════════════════════════════════════════════════════════
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwXW2jE-bv-Lv2gDX8cNF1BeTZZpzBBucui77AaB3PGWmzBigElWHggNwO-L2WGsKnbSg/exec';

/**
 * Sends registration data to Google Sheets backend.
 * Uses keepalive: true so browser navigation does not abort the request.
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
    body: JSON.stringify({ action: action, data: data }),
    keepalive: true
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
      course: data.course || 'Beyond the Vrat: A Karwa Chauth Masterclass',
      type: data.type || 'Free Pro Bono',
      paymentStatus: data.paymentStatus || 'Free',
      paymentId: data.paymentId || '',
      paymentMethod: data.paymentMethod || 'N/A',
      amount: data.amount || 0,
      challenge: data.challenge || 'Karwa Chauth',
      status: 'Joined Community'
    };
    existing.unshift(record);
    localStorage.setItem('routewithin_webinar_registrations', JSON.stringify(existing));
    sessionStorage.setItem('rw_latest_registrant', JSON.stringify(record));

    // ── Sync to Google Sheets ──
    const isFree = (data.type || '').toLowerCase().includes('free') ||
                   (data.paymentStatus || '').toLowerCase() === 'free';
    const action = isFree ? 'register_free' : 'register_paid';

    const syncPromise = sendToGoogleSheets(action, {
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

    return syncPromise;
  } catch (err) {
    console.error('Error saving registration:', err);
    return Promise.resolve({ success: false, error: err.message });
  }
}

window.openWebinarModal = openWebinarModal;
window.closeWebinarModal = closeWebinarModal;
window.registerWebinarLead = registerWebinarLead;
window.sendToGoogleSheets = sendToGoogleSheets;


