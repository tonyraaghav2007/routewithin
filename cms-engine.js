/* ==========================================================================
   ROUTEWITHIN CMS ENGINE — No-Code Content Management System
   ==========================================================================
   Reads content from localStorage (set by admin panel) and renders cards
   on public pages. Falls back to hardcoded defaults if no CMS data exists.
   ========================================================================== */

(function(root) {
  'use strict';

  root = root || (typeof window !== 'undefined' ? window : globalThis);
  const CMS_STORAGE_KEY = 'routewithin_cms_content';

  // ─── DEFAULT CONTENT (Current verified site content) ─────────────────

  const DEFAULT_PROGRAMS = [
    {
      id: 'antarprakash',
      title: 'AntarPrakash',
      badge: '6-Weeks Guided Cohort',
      description: 'A transformational 6-week immersive journey to reconnect with your inner light, heal subconscious emotional loops, and cultivate deep inside-out alignment for radiant relationships.',
      duration: '6-Weeks',
      price: 11999,
      priceDisplay: '₹ 11,999',
      priceSuffix: '',
      isPaid: true,
      image: 'assets/couch_woman.jpg',
      imageAlt: 'AntarPrakash (6-Weeks) — ₹11,999',
      bullets: [
        '6 weekly live alignment modules with Dimple Sandhu',
        'Rewire subconscious reactive patterns & emotional triggers',
        'Practical communication frameworks to express needs without friction',
        'AntarPrakash guided reflection workbook & lifetime recording access'
      ],
      buttonPrimaryText: 'Enroll in AntarPrakash — ₹11,999',
      buttonPrimaryAction: 'register:antarprakash',
      buttonSecondaryText: 'Inquire / Register →',
      buttonSecondaryAction: 'register:antarprakash',
      catalogId: 'antarprakash',
      redirectAfterRegister: 'thank-you.html',
      enabled: true
    },
    {
      id: 'inner-circle',
      title: 'Inner Circle',
      badge: '6-Month Private Mentorship',
      description: 'An intimate, high-touch 6-month private mentorship and mastermind cohort with Master Coach Dimple Sandhu for lasting personal elevation and relationship mastery.',
      duration: '6 Months',
      price: 59999,
      priceDisplay: '₹ 59,999',
      priceSuffix: '',
      isPaid: true,
      image: 'assets/golden_banner.jpg',
      imageAlt: 'Inner Circle (6 Months) — ₹59,999',
      bullets: [
        '1:1 deep-dive strategy & subconscious breakthrough sessions',
        'Bi-weekly mastermind calls and live hot-seat coaching cohorts',
        'Direct VIP WhatsApp access with Coach Dimple for real-time guidance',
        'Personalized growth roadmap, subconscious audits & full workshop access'
      ],
      buttonPrimaryText: 'Apply for Inner Circle — ₹59,999',
      buttonPrimaryAction: 'register:inner-circle',
      buttonSecondaryText: 'Inquire / Register →',
      buttonSecondaryAction: 'register:inner-circle',
      catalogId: 'inner-circle',
      redirectAfterRegister: 'thank-you.html',
      enabled: true
    },
    {
      id: 'gratitude-circle',
      title: 'Gratitude Circle',
      badge: 'Continuity Membership',
      description: 'A consistent, nourishing weekly sanctuary to ground yourself in gratitude, dissolve everyday stress, and stay emotionally centered alongside a supportive sisterhood.',
      duration: 'Continuity Membership',
      price: 555,
      priceDisplay: '₹ 555',
      priceSuffix: '/ month',
      isPaid: true,
      image: 'assets/card_alone.jpg',
      imageAlt: 'Gratitude Circle (Continuity Membership) — ₹555/month',
      bullets: [
        'Weekly live guided gratitude, breathwork & centering circles on Zoom',
        'Daily micro-gratitude prompts designed to break overthinking loops',
        'Safe private community sangha dedicated to mutual growth & positivity',
        'Monthly live Q&A & alignment sessions with Dimple · Cancel anytime'
      ],
      buttonPrimaryText: 'Join Gratitude Circle — ₹555/mo',
      buttonPrimaryAction: 'register:gratitude-circle',
      buttonSecondaryText: 'Inquire / Register →',
      buttonSecondaryAction: 'register:gratitude-circle',
      catalogId: 'gratitude-circle',
      redirectAfterRegister: 'thank-you.html',
      enabled: true
    },
    {
      id: 'rishta-reset',
      title: 'Rishta Reset Live',
      badge: 'Weekly Live Workshop',
      description: 'A focused 90-minute live interactive workshop designed to immediately stop recurring arguments, break emotional distance, and reset communication with your partner.',
      duration: 'Weekly Live Workshop',
      price: 99,
      priceDisplay: '₹ 99',
      priceSuffix: '(Live Workshop)',
      isPaid: true,
      image: 'assets/card_crossroads.jpg',
      imageAlt: 'Rishta Reset Live (Weekly) — ₹99',
      bullets: [
        '90-Minute live interactive masterclass with Master Coach Dimple Sandhu',
        'The 3-step actionable framework to de-escalate fights in real-time',
        'Live anonymous hot-seat coaching and immediate clarity on your situation',
        'Downloadable "Rishta Reset Action Guide & Communication Checklist"'
      ],
      buttonPrimaryText: 'Book Your Spot — ₹ 99',
      buttonPrimaryAction: 'register:rishta-reset',
      buttonSecondaryText: 'Workshop Details →',
      buttonSecondaryAction: 'register:rishta-reset',
      catalogId: 'rishta-reset',
      redirectAfterRegister: 'thank-you.html',
      enabled: true
    }
  ];

  const DEFAULT_EVENTS = [
    {
      id: 'active-initiative',
      title: 'Weekly Interactive Masterclasses',
      badge: 'Active Initiative',
      badgeSecondary: 'Wednesday',
      description: 'Join Dimple Sandhu for live cohorts breaking down subconscious conflict loops, emotional triggers, and daily communication frameworks.',
      image: 'assets/golden_banner.jpg',
      imageAlt: 'RouteWithin Masterclass & Cohort Banner',
      buttonPrimaryText: 'Register Free (Zoom) →',
      buttonPrimaryAction: 'register:active-initiative',
      buttonSecondaryText: 'Free Assessment →',
      buttonSecondaryAction: 'https://docs.google.com/forms/d/e/1FAIpQLScrNnLXRHfBjrXH3cYRRZdRRx5i7UOSnIl0DyTIbgQJ7RzJHw/viewform?usp=sharing&ouid=100820665491908733403',
      catalogId: 'active-initiative',
      isPaid: false,
      price: 0,
      priceDisplay: '100% Free (Zoom)',
      redirectAfterRegister: 'thank-you.html',
      enabled: true
    },
    {
      id: 'karwa-chauth',
      title: 'Beyond the Vrat: A Karwa Chauth Masterclass',
      badge: '100% FREE ZOOM MASTERCLASS',
      badgeSecondary: '',
      subtitle: 'Rebuild Emotional Closeness & Feel Truly Heard',
      description: 'A relationship does not fade because love has disappeared; it suffers when understanding gets buried under silent resentment, routine misunderstandings, and unreciprocated effort. In this special live gathering, Dimple Sandhu shares practical, gratitude-led tools to restore harmony in your home.',
      eventDate: 'Monday, Nov 2, 2026',
      eventTime: '4:30 – 5:30 PM IST',
      eventFormat: 'Live Zoom (Interactive)',
      eventAdmission: '100% Free',
      image: 'assets/karwachauth.png',
      imageAlt: 'Beyond the Vrat: A Karwa Chauth Masterclass with Master Coach Dimple Sandhu',
      buttonPrimaryText: 'Claim Your Free Seat Now →',
      buttonPrimaryAction: 'register:karwa-chauth',
      buttonSecondaryText: 'View Core Takeaways ↓',
      buttonSecondaryAction: '#pillars',
      catalogId: 'karwa-chauth',
      isPaid: false,
      price: 0,
      priceDisplay: '100% Free (Zoom)',
      redirectAfterRegister: 'thank-you.html',
      enabled: true
    }
  ];

  const DEFAULT_EBOOKS = [
    {
      id: 'ebook-spotlight',
      title: 'Route Within: From Conflict to Clarity',
      badge: '100% Free Instant Download (PDF)',
      description: 'Discover the subtle subconscious loops driving repetitive arguments, learn how to express your true emotional needs without defensiveness, and unlock profound inside-out peace.',
      image: 'assets/book_cover.jpg',
      imageAlt: 'The RouteWithin Relationship E-Book',
      bullets: [
        'The 3 Subconscious Loops That Drive Distance',
        'De-escalation scripts to defuse arguments within 90 seconds',
        '7 Daily Gratitude Journal prompts for emotional grounding'
      ],
      buttonPrimaryText: 'Download Free E-Book (PDF) →',
      buttonPrimaryAction: 'https://chat.whatsapp.com/Fc81XFO5SPgEh1IOyou7V5?s=cl&p=a&mlu=4&ilr=4',
      buttonSecondaryText: 'Attend Masterclass →',
      buttonSecondaryAction: 'register:active-initiative',
      redirectAfterRegister: 'thank-you.html',
      enabled: true
    }
  ];

  // ─── DATA PERSISTENCE ────────────────────────────────────────────────

  function getCMSData() {
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          programs: (parsed.programs && parsed.programs.length > 0) ? parsed.programs : DEFAULT_PROGRAMS,
          events: (parsed.events && parsed.events.length > 0) ? parsed.events : DEFAULT_EVENTS,
          ebooks: (parsed.ebooks && parsed.ebooks.length > 0) ? parsed.ebooks : DEFAULT_EBOOKS
        };
      }
    } catch (e) {
      console.warn('[CMS] Error reading localStorage, using defaults', e);
    }
    return {
      programs: DEFAULT_PROGRAMS,
      events: DEFAULT_EVENTS,
      ebooks: DEFAULT_EBOOKS
    };
  }

  function saveCMSData(data) {
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
      syncCatalog();
      return true;
    } catch (e) {
      console.error('[CMS] Error saving to localStorage', e);
      return false;
    }
  }

  // ─── SYNC WITH ROUTEWITHIN_CATALOG (for registration modal & payments) ─

  function syncCatalog() {
    const data = getCMSData();
    if (!root.ROUTEWITHIN_CATALOG) root.ROUTEWITHIN_CATALOG = {};

    // Sync programs
    data.programs.forEach(function(p) {
      if (p.enabled) {
        const key = p.catalogId || p.id;
        root.ROUTEWITHIN_CATALOG[key] = {
          id: key,
          title: p.title,
          duration: p.duration || p.badge,
          priceDisplay: p.priceDisplay || (p.price ? '₹ ' + Number(p.price).toLocaleString('en-IN') : 'Free'),
          amount: Number(p.price) || 0,
          isPaid: !!p.isPaid,
          badge: (p.badge || 'COACHING PROGRAM').toUpperCase(),
          description: p.description,
          redirectAfterRegister: p.redirectAfterRegister || 'thank-you.html'
        };
      }
    });

    // Sync events
    data.events.forEach(function(ev) {
      if (ev.enabled) {
        const key = ev.catalogId || ev.id;
        root.ROUTEWITHIN_CATALOG[key] = {
          id: key,
          title: ev.title,
          duration: ev.eventDate ? (ev.eventDate + ' (' + (ev.eventTime || '') + ')') : 'Every Wednesday (Live Zoom)',
          priceDisplay: ev.priceDisplay || '100% Free (Zoom)',
          amount: Number(ev.price) || 0,
          isPaid: !!ev.isPaid,
          badge: (ev.badge || 'FREE EVENT').toUpperCase(),
          description: ev.description,
          redirectAfterRegister: ev.redirectAfterRegister || 'thank-you.html'
        };
      }
    });
  }

  // ─── ACTION BUTTON RENDERER ──────────────────────────────────────────

  function renderActionButton(text, action, isPrimary, extraClass) {
    if (!text) return '';
    action = (action || '').trim();
    extraClass = extraClass || (isPrimary ? 'btn btn-hero-book btn-md' : 'btn btn-secondary btn-md');

    // Case 1: Registration action (e.g., 'register:antarprakash')
    if (action.indexOf('register:') === 0) {
      const regId = action.replace('register:', '').trim();
      return '<button type="button" onclick="openRegistrationModal(\'' + escapeHtml(regId) + '\')" class="' + extraClass + '">' + escapeHtml(text) + '</button>';
    }

    // Case 2: Inquire / Modal default fallback
    if (!action || action === '#' || action.toLowerCase() === 'modal') {
      return '<button type="button" onclick="openRegistrationModal()" class="' + extraClass + '">' + escapeHtml(text) + '</button>';
    }

    // Case 3: External URL
    if (action.indexOf('http://') === 0 || action.indexOf('https://') === 0) {
      return '<a href="' + escapeHtml(action) + '" target="_blank" rel="noopener noreferrer" class="' + extraClass + '">' + escapeHtml(text) + '</a>';
    }

    // Case 4: Internal Link or Anchor
    return '<a href="' + escapeHtml(action) + '" class="' + extraClass + '">' + escapeHtml(text) + '</a>';
  }

  // ─── RENDER PROGRAM CARDS ────────────────────────────────────────────

  function renderProgramCards(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = getCMSData();
    const programs = data.programs.filter(function(p) { return p.enabled; });
    let html = '';

    programs.forEach(function(p) {
      const priceSuffixHtml = p.priceSuffix
        ? ' <span style="font-size: 0.85rem; font-weight: 500; color: var(--text-secondary); font-family: var(--font-body);">' + escapeHtml(p.priceSuffix) + '</span>'
        : '';

      let bulletsHtml = '';
      if (p.bullets && p.bullets.length > 0) {
        bulletsHtml = '<ul style="list-style: none; padding: 0; margin: 0 0 1.625rem; display: flex; flex-direction: column; gap: 0.625rem;">';
        p.bullets.forEach(function(b) {
          if (b && b.trim()) {
            bulletsHtml += '<li style="display: flex; align-items: center; gap: 0.625rem; font-size: 0.95rem; color: var(--text-heading);">'
              + '<span style="color: var(--terracotta); font-weight: 800;">✓</span> ' + escapeHtml(b)
              + '</li>';
          }
        });
        bulletsHtml += '</ul>';
      }

      const catalogKey = p.catalogId || p.id;
      const primaryAction = p.buttonPrimaryAction || ('register:' + catalogKey);
      const secondaryAction = p.buttonSecondaryAction || ('register:' + catalogKey);

      html += '<div class="split-quote-cta reveal-on-scroll" style="margin: 0; background: var(--bg-card); border-radius: 1.5rem;">'
        + '<div class="split-cta-image" style="min-height: 21.25rem; position: relative;">'
        + '<img src="' + escapeHtml(p.image) + '" alt="' + escapeHtml(p.imageAlt || p.title) + '" class="split-cta-img-tag">'
        + '</div>'
        + '<div class="split-cta-content" style="padding: 2.5rem 2.25rem;">'
        + '<div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.85rem; flex-wrap: wrap;">'
        + '<span style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--terracotta); background: rgba(198, 123, 92, 0.12); padding: 0.3rem 0.75rem; border-radius: 9999px;">'
        + escapeHtml(p.badge)
        + '</span>'
        + '<span style="font-size: 1.35rem; font-weight: 800; color: var(--terracotta); font-family: var(--font-heading);">'
        + escapeHtml(p.priceDisplay) + priceSuffixHtml
        + '</span>'
        + '</div>'
        + '<h2 style="font-family: var(--font-heading); font-size: 2.15rem; color: var(--text-heading); margin-bottom: 0.75rem; line-height: 1.25;">'
        + escapeHtml(p.title)
        + '</h2>'
        + '<p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.65; margin-bottom: 1.25rem;">'
        + escapeHtml(p.description)
        + '</p>'
        + bulletsHtml
        + '<div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">'
        + renderActionButton(p.buttonPrimaryText, primaryAction, true)
        + renderActionButton(p.buttonSecondaryText, secondaryAction, false)
        + '</div>'
        + '</div>'
        + '</div>';
    });

    container.innerHTML = html;

    if (typeof initRevealAnimations === 'function') {
      initRevealAnimations();
    }
  }

  // ─── RENDER EVENT CARDS ──────────────────────────────────────────────

  function renderEventCards(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = getCMSData();
    const events = data.events.filter(function(e) { return e.enabled; });
    let html = '';

    events.forEach(function(ev, idx) {
      const catalogKey = ev.catalogId || ev.id;
      const primaryAction = ev.buttonPrimaryAction || ('register:' + catalogKey);
      const secondaryAction = ev.buttonSecondaryAction || '';

      if (idx === 0) {
        let tagsHtml = '<div class="active-initiative-tags">';
        tagsHtml += '<span class="active-initiative-tag">' + escapeHtml(ev.badge || 'Active Initiative') + '</span>';
        if (ev.badgeSecondary) {
          tagsHtml += '<span class="active-initiative-tag">' + escapeHtml(ev.badgeSecondary) + '</span>';
        }
        tagsHtml += '</div>';

        html += '<div class="active-initiative-card reveal-scale">'
          + '<div class="active-initiative-image">'
          + '<img src="' + escapeHtml(ev.image) + '" alt="' + escapeHtml(ev.imageAlt || ev.title) + '" class="active-initiative-img">'
          + '</div>'
          + '<div class="active-initiative-content">'
          + tagsHtml
          + '<h3 class="active-initiative-title">' + escapeHtml(ev.title) + '</h3>'
          + '<p class="active-initiative-desc">' + escapeHtml(ev.description) + '</p>'
          + '<div class="active-initiative-actions">'
          + renderActionButton(ev.buttonPrimaryText, primaryAction, true, 'btn btn-hero-book btn-sm')
          + renderActionButton(ev.buttonSecondaryText, secondaryAction, false, 'btn btn-secondary btn-sm')
          + '</div>'
          + '</div>'
          + '</div>';
      } else {
        let logisticsHtml = '';
        if (ev.eventDate || ev.eventTime || ev.eventFormat || ev.eventAdmission) {
          logisticsHtml = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.85rem; margin-bottom: 1.75rem; background: rgba(139, 111, 71, 0.08); padding: 1.15rem; border-radius: 1rem;">';
          if (ev.eventDate) {
            logisticsHtml += '<div><div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: var(--terracotta); letter-spacing: 0.05em;">Date</div>'
              + '<div style="font-size: 0.95rem; font-weight: 700; color: var(--text-heading); margin-top: 0.2rem;">' + escapeHtml(ev.eventDate) + '</div></div>';
          }
          if (ev.eventTime) {
            logisticsHtml += '<div><div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: var(--terracotta); letter-spacing: 0.05em;">Time</div>'
              + '<div style="font-size: 0.95rem; font-weight: 700; color: var(--text-heading); margin-top: 0.2rem;">' + escapeHtml(ev.eventTime) + '</div></div>';
          }
          if (ev.eventFormat) {
            logisticsHtml += '<div><div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: var(--terracotta); letter-spacing: 0.05em;">Format</div>'
              + '<div style="font-size: 0.95rem; font-weight: 700; color: var(--text-heading); margin-top: 0.2rem;">' + escapeHtml(ev.eventFormat) + '</div></div>';
          }
          logisticsHtml += '<div><div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: var(--terracotta); letter-spacing: 0.05em;">Admission</div>'
            + '<div style="font-size: 0.95rem; font-weight: 700; color: #2E7D32; margin-top: 0.2rem;">' + escapeHtml(ev.eventAdmission || ev.priceDisplay || '100% Free') + '</div></div>';
          logisticsHtml += '</div>';
        }

        html += '<div class="split-quote-cta reveal-on-scroll" style="margin: 0 0 2rem; background: var(--bg-card); border-radius: 1.75rem; border: 1px solid rgba(139, 111, 71, 0.2); box-shadow: var(--shadow-lg); overflow: hidden;">'
          + '<div class="split-cta-image" style="min-height: 26rem; background: #1A1410; display: flex; align-items: center; justify-content: center;">'
          + '<img src="' + escapeHtml(ev.image) + '" alt="' + escapeHtml(ev.imageAlt || ev.title) + '" class="split-cta-img-tag" style="object-fit: contain; max-height: 100%; width: 100%;">'
          + '</div>'
          + '<div class="split-cta-content" style="padding: 2.75rem 2.5rem; display: flex; flex-direction: column; justify-content: space-between;">'
          + '<div>'
          + '<div style="display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(212, 175, 55, 0.15); border: 1px solid rgba(212, 175, 55, 0.4); color: #8C6A0A; padding: 0.3rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; margin-bottom: 1rem;">'
          + '<span class="webinar-flag-pulse"></span> ' + escapeHtml(ev.badge)
          + '</div>'
          + '<h3 style="font-family: var(--font-heading); font-size: 1.9rem; color: var(--text-heading); margin-bottom: 0.75rem; line-height: 1.3;">'
          + escapeHtml(ev.subtitle || ev.title)
          + '</h3>'
          + '<p style="font-size: 0.98rem; color: var(--text-secondary); line-height: 1.65; margin-bottom: 1.5rem;">'
          + escapeHtml(ev.description)
          + '</p>'
          + logisticsHtml
          + '</div>'
          + '<div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">'
          + renderActionButton(ev.buttonPrimaryText, primaryAction, true)
          + renderActionButton(ev.buttonSecondaryText, secondaryAction, false)
          + '</div>'
          + '</div>'
          + '</div>';
      }
    });

    container.innerHTML = html;

    if (typeof initRevealAnimations === 'function') {
      initRevealAnimations();
    }
  }

  function renderEventsOnPage() {
    const data = getCMSData();
    const events = data.events.filter(function(e) { return e.enabled; });

    // Single unified container
    const allContainer = document.getElementById('cmsEventsContainer');
    if (allContainer) {
      renderEventCards('cmsEventsContainer');
      return;
    }

    // Split container 1: Active Initiative Card
    const activeContainer = document.getElementById('cmsActiveInitiativeContainer');
    if (activeContainer && events.length > 0) {
      const ev0 = events[0];
      const catalogKey0 = ev0.catalogId || ev0.id;
      const primaryAction0 = ev0.buttonPrimaryAction || ('register:' + catalogKey0);
      const secondaryAction0 = ev0.buttonSecondaryAction || '';

      let tagsHtml = '<div class="active-initiative-tags">';
      tagsHtml += '<span class="active-initiative-tag">' + escapeHtml(ev0.badge || 'Active Initiative') + '</span>';
      if (ev0.badgeSecondary) {
        tagsHtml += '<span class="active-initiative-tag">' + escapeHtml(ev0.badgeSecondary) + '</span>';
      }
      tagsHtml += '</div>';

      activeContainer.innerHTML = '<div class="active-initiative-card reveal-scale">'
        + '<div class="active-initiative-image">'
        + '<img src="' + escapeHtml(ev0.image) + '" alt="' + escapeHtml(ev0.imageAlt || ev0.title) + '" class="active-initiative-img">'
        + '</div>'
        + '<div class="active-initiative-content">'
        + tagsHtml
        + '<h3 class="active-initiative-title">' + escapeHtml(ev0.title) + '</h3>'
        + '<p class="active-initiative-desc">' + escapeHtml(ev0.description) + '</p>'
        + '<div class="active-initiative-actions">'
        + renderActionButton(ev0.buttonPrimaryText, primaryAction0, true, 'btn btn-hero-book btn-sm')
        + renderActionButton(ev0.buttonSecondaryText, secondaryAction0, false, 'btn btn-secondary btn-sm')
        + '</div>'
        + '</div>'
        + '</div>';
    }

    // Split container 2: Featured Masterclasses
    const featuredContainer = document.getElementById('cmsFeaturedMasterclassContainer');
    if (featuredContainer && events.length > 1) {
      let featHtml = '';
      for (let i = 1; i < events.length; i++) {
        const ev = events[i];
        const catalogKey = ev.catalogId || ev.id;
        const primaryAction = ev.buttonPrimaryAction || ('register:' + catalogKey);
        const secondaryAction = ev.buttonSecondaryAction || '';

        let logisticsHtml = '';
        if (ev.eventDate || ev.eventTime || ev.eventFormat || ev.eventAdmission) {
          logisticsHtml = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.85rem; margin-bottom: 1.75rem; background: rgba(139, 111, 71, 0.08); padding: 1.15rem; border-radius: 1rem;">';
          if (ev.eventDate) {
            logisticsHtml += '<div><div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: var(--terracotta); letter-spacing: 0.05em;">Date</div>'
              + '<div style="font-size: 0.95rem; font-weight: 700; color: var(--text-heading); margin-top: 0.2rem;">' + escapeHtml(ev.eventDate) + '</div></div>';
          }
          if (ev.eventTime) {
            logisticsHtml += '<div><div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: var(--terracotta); letter-spacing: 0.05em;">Time</div>'
              + '<div style="font-size: 0.95rem; font-weight: 700; color: var(--text-heading); margin-top: 0.2rem;">' + escapeHtml(ev.eventTime) + '</div></div>';
          }
          if (ev.eventFormat) {
            logisticsHtml += '<div><div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: var(--terracotta); letter-spacing: 0.05em;">Format</div>'
              + '<div style="font-size: 0.95rem; font-weight: 700; color: var(--text-heading); margin-top: 0.2rem;">' + escapeHtml(ev.eventFormat) + '</div></div>';
          }
          logisticsHtml += '<div><div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: var(--terracotta); letter-spacing: 0.05em;">Admission</div>'
            + '<div style="font-size: 0.95rem; font-weight: 700; color: #2E7D32; margin-top: 0.2rem;">' + escapeHtml(ev.eventAdmission || ev.priceDisplay || '100% Free') + '</div></div>';
          logisticsHtml += '</div>';
        }

        featHtml += '<div style="text-align: center; margin-bottom: 3rem;" class="reveal-on-scroll">'
          + '<span style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--terracotta); background: rgba(198, 123, 92, 0.12); padding: 0.3rem 0.75rem; border-radius: 9999px; display: inline-block; margin-bottom: 0.6rem;">'
          + 'Current Active Masterclass'
          + '</span>'
          + '<h2 style="font-family: var(--font-heading); font-size: 2.4rem; color: var(--text-heading); margin-bottom: 0.6rem;">'
          + escapeHtml(ev.title)
          + '</h2>'
          + '<p style="font-size: 1.05rem; color: var(--text-secondary); max-width: 42rem; margin: 0 auto; line-height: 1.6;">'
          + escapeHtml(ev.description)
          + '</p>'
          + '</div>'
          + '<div class="split-quote-cta reveal-on-scroll" style="margin: 0 0 2rem; background: var(--bg-card); border-radius: 1.75rem; border: 1px solid rgba(139, 111, 71, 0.2); box-shadow: var(--shadow-lg); overflow: hidden;">'
          + '<div class="split-cta-image" style="min-height: 26rem; background: #1A1410; display: flex; align-items: center; justify-content: center;">'
          + '<img src="' + escapeHtml(ev.image) + '" alt="' + escapeHtml(ev.imageAlt || ev.title) + '" class="split-cta-img-tag" style="object-fit: contain; max-height: 100%; width: 100%;">'
          + '</div>'
          + '<div class="split-cta-content" style="padding: 2.75rem 2.5rem; display: flex; flex-direction: column; justify-content: space-between;">'
          + '<div>'
          + '<div style="display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(212, 175, 55, 0.15); border: 1px solid rgba(212, 175, 55, 0.4); color: #8C6A0A; padding: 0.3rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; margin-bottom: 1rem;">'
          + '<span class="webinar-flag-pulse"></span> ' + escapeHtml(ev.badge)
          + '</div>'
          + '<h3 style="font-family: var(--font-heading); font-size: 1.9rem; color: var(--text-heading); margin-bottom: 0.75rem; line-height: 1.3;">'
          + escapeHtml(ev.subtitle || ev.title)
          + '</h3>'
          + '<p style="font-size: 0.98rem; color: var(--text-secondary); line-height: 1.65; margin-bottom: 1.5rem;">'
          + escapeHtml(ev.description)
          + '</p>'
          + logisticsHtml
          + '</div>'
          + '<div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">'
          + renderActionButton(ev.buttonPrimaryText, primaryAction, true)
          + renderActionButton(ev.buttonSecondaryText, secondaryAction, false)
          + '</div>'
          + '</div>'
          + '</div>';
      }
      featuredContainer.innerHTML = featHtml;
    }

    if (typeof initRevealAnimations === 'function') {
      initRevealAnimations();
    }
  }

  // ─── RENDER E-BOOK CARDS ─────────────────────────────────────────────

  function renderEbookCards(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = getCMSData();
    const ebooks = data.ebooks.filter(function(e) { return e.enabled; });
    let html = '';

    ebooks.forEach(function(eb) {
      let bulletsHtml = '';
      if (eb.bullets && eb.bullets.length > 0) {
        bulletsHtml = '<ul style="list-style: none; padding: 0; margin: 0 0 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">';
        eb.bullets.forEach(function(b) {
          if (b && b.trim()) {
            bulletsHtml += '<li style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.92rem; color: var(--text-heading);">'
              + '<span style="color: var(--terracotta); font-weight: 800;">✓</span> ' + escapeHtml(b)
              + '</li>';
          }
        });
        bulletsHtml += '</ul>';
      }

      html += '<div class="split-quote-cta reveal-on-scroll" style="margin: 0; background: var(--bg-card); border-radius: 1.5rem; border: 1px solid rgba(139, 111, 71, 0.25); box-shadow: var(--shadow-lg);">'
        + '<div class="split-cta-image" style="min-height: 22rem; background: #1F1712; display: flex; align-items: center; justify-content: center; padding: 1.5rem;">'
        + '<img src="' + escapeHtml(eb.image) + '" alt="' + escapeHtml(eb.imageAlt || eb.title) + '" class="split-cta-img-tag" style="max-height: 19rem; width: auto; object-fit: contain; border-radius: 0.75rem; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">'
        + '</div>'
        + '<div class="split-cta-content" style="padding: 2.25rem 2.25rem;">'
        + '<div style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #2E7D32; background: rgba(46, 125, 50, 0.12); padding: 0.25rem 0.65rem; border-radius: 9999px; margin-bottom: 0.75rem;">'
        + escapeHtml(eb.badge || '100% Free Instant Download (PDF)')
        + '</div>'
        + '<h2 style="font-family: var(--font-heading); font-size: clamp(1.4rem, 4vw, 2.1rem); color: var(--text-heading); margin-bottom: 0.75rem; line-height: 1.25;">'
        + escapeHtml(eb.title)
        + '</h2>'
        + '<p style="font-size: clamp(0.9rem, 2.4vw, 1rem); color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">'
        + escapeHtml(eb.description)
        + '</p>'
        + bulletsHtml
        + '<div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">'
        + renderActionButton(eb.buttonPrimaryText, eb.buttonPrimaryAction, true)
        + renderActionButton(eb.buttonSecondaryText, eb.buttonSecondaryAction, false)
        + '</div>'
        + '</div>'
        + '</div>';
    });

    container.innerHTML = html;

    if (typeof initRevealAnimations === 'function') {
      initRevealAnimations();
    }
  }

  // ─── UTILITY ─────────────────────────────────────────────────────────

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ─── AUTO-INIT ON DOM READY ──────────────────────────────────────────

  function initCMSOnPage() {
    syncCatalog();
    if (document.getElementById('cmsProgramsContainer')) {
      renderProgramCards('cmsProgramsContainer');
    }
    renderEventsOnPage();
    if (document.getElementById('cmsEbooksContainer')) {
      renderEbookCards('cmsEbooksContainer');
    }
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initCMSOnPage);
    } else {
      initCMSOnPage();
    }
  }

  // ─── EXPOSE GLOBAL API ───────────────────────────────────────────────

  root.ROUTEWITHIN_CMS = {
    getData: getCMSData,
    saveData: saveCMSData,
    syncCatalog: syncCatalog,
    renderProgramCards: renderProgramCards,
    renderEventCards: renderEventCards,
    renderEventsOnPage: renderEventsOnPage,
    renderEbookCards: renderEbookCards,
    renderActionButton: renderActionButton,
    DEFAULTS: {
      programs: DEFAULT_PROGRAMS,
      events: DEFAULT_EVENTS,
      ebooks: DEFAULT_EBOOKS
    },
    STORAGE_KEY: CMS_STORAGE_KEY
  };

  // Immediate sync on evaluation
  syncCatalog();

})(typeof window !== 'undefined' ? window : globalThis);
