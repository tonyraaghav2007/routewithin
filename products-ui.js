/* ==========================================================================
   ROUTEWITHIN PRODUCTS & SLEEPYCAT-INSPIRED PDP ENGINE
   Unified catalog, size/tier variant selector, accordions & sliding recommendations
   ========================================================================== */

(function(root) {
  'use strict';

  root = root || (typeof window !== 'undefined' ? window : globalThis);

  const DEFAULT_TRUST_STRIP = [
    { icon: '📦', title: '7–8 Days Delivery', sub: 'Estimated delivery within 7–8 days' },
    { icon: '🔒', title: '100% Confidential', sub: 'Safe, private judgment-free space' },
    { icon: '🧭', title: 'NLP Certified', sub: 'Proven subconscious alignment tools' },
    { icon: '💬', title: 'Community Support', sub: 'WhatsApp guidance & check-ins' }
  ];

  const DEFAULT_OFFERS = [
    {
      badge: 'FREE BONUS',
      title: 'Complimentary Clarity Assessment',
      desc: 'Unlock a personalized relationship clarity evaluation when you reserve your spot today.'
    },
    {
      badge: 'BUNDLE & SAVE',
      title: 'Up to 25% Off Couples & Multi-Month Tracks',
      desc: 'Select a Couple Pass or Extended Track above to unlock instant built-in savings.'
    }
  ];

  const PRODUCTS = {
    'antarprakash': {
      id: 'antarprakash',
      category: 'Guided Cohort Program',
      title: 'AntarPrakash',
      badge: 'MOST POPULAR COHORT',
      rating: '4.9',
      reviewCount: 142,
      shortHook: 'A transformational 6-week immersive journey to reconnect with your inner light, dissolve subconscious emotional loops, and restore warmth in your relationship.',
      tags: ['6 Weeks Live', 'NLP Subconscious Alignment', 'Women & Couples'],
      price: 11999,
      compareAtPrice: 15999,
      priceDisplay: '₹ 11,999',
      isPaid: true,
      redirectAfterRegister: 'thank-you.html',
      gallery: [
        { src: 'assets/couch_woman.jpg', alt: 'AntarPrakash 6-Week Guided Cohort', caption: 'Guided inside-out transformation from the comfort of home' },
        { src: 'assets/golden_banner.jpg', alt: 'Live Alignment Sessions with Dimple Sandhu', caption: '6 weekly interactive live sessions with Master Coach Dimple Sandhu' },
        { src: 'assets/step_tools.jpg', alt: 'AntarPrakash Guided Reflection Workbook', caption: 'Includes printed & digital reflection workbooks & scripts' },
        { src: 'assets/about_coach.jpg', alt: 'Coach Dimple Sandhu Mentoring', caption: 'Direct subconscious pattern rewiring & Q&A coaching' }
      ],
      optionGroups: [
        {
          key: 'track',
          label: 'COHORT TRACK / SIZE',
          selectedIndex: 0,
          options: [
            { label: 'Individual Cohort', sub: '1 Seat · Full 6 Weeks', price: 11999, compareAtPrice: 15999, durationTag: '6-Weeks Individual Cohort' },
            { label: 'Couples Alignment', sub: '2 Seats · Joint Practice', price: 17999, compareAtPrice: 24999, durationTag: '6-Weeks Couples Alignment Track' },
            { label: 'Cohort + 1:1 VIP', sub: 'Includes 2 Private Calls', price: 19999, compareAtPrice: 27999, durationTag: '6-Weeks Cohort + 1:1 VIP' }
          ]
        },
        {
          key: 'schedule',
          label: 'BATCH SCHEDULE & FORMAT',
          selectedIndex: 0,
          options: [
            { label: 'Weekday Evening (7:30 PM IST)', sub: 'Live Zoom + Replays' },
            { label: 'Weekend Morning (11:00 AM IST)', sub: 'Live Zoom + Replays' }
          ]
        }
      ],
      bullets: [
        '6 weekly live interactive alignment modules with Master Coach Dimple Sandhu',
        'Proven NLP protocols to rewire subconscious reactive patterns & emotional triggers',
        'Word-for-word communication frameworks to express needs without conflict or guilt',
        'Complete AntarPrakash guided reflection workbook & lifetime recording access',
        'Private cohort WhatsApp circle for daily grounding and accountability'
      ],
      highlightsBar: [
        { icon: '🗓️', label: 'Duration', value: '6 Weeks (6 Live Modules)' },
        { icon: '🎯', label: 'Format', value: 'Small-Group Live Zoom' },
        { icon: '📘', label: 'Includes', value: 'Workbook + Replays' },
        { icon: '🛡️', label: 'Guarantee', value: 'Lifetime Access to Recordings' }
      ],
      specs: [
        { label: 'Program Duration', value: '6 Weeks (90-Min Weekly Live Sessions + Daily Micro-Practices)' },
        { label: 'Coaching Intensity', value: 'Deep Subconscious & Practical Behavioral Alignment' },
        { label: 'Ideal For', value: 'Individuals or couples stuck in repetitive misunderstandings, silent distance, or emotional exhaustion' },
        { label: 'Included Materials', value: 'AntarPrakash PDF Workbook, 90-Second De-Escalation Scripts, Guided Meditations' },
        { label: 'Support Level', value: 'Live Q&A every session + Private WhatsApp Community support' },
        { label: 'Replay & Access', value: 'Full HD recordings uploaded within 24 hours with lifetime access' }
      ],
      zigzagFeatures: [
        {
          eyebrow: 'INSIDE-OUT ALIGNMENT',
          title: 'Heal the root subconscious loop — not just surface arguments',
          desc: 'Most advice tells you what to say in the moment, yet old emotional triggers still take over. AntarPrakash systematically gently unwinds those subconscious patterns over 6 structured weeks so calm responses become natural.',
          image: 'assets/step_guidance.jpg'
        },
        {
          eyebrow: 'PRACTICAL FRAMEWORKS',
          title: 'Communicate your needs and feel genuinely heard without walking on eggshells',
          desc: 'Receive battle-tested conversation blueprints for navigating tense topics, boundaries with family, and emotional distance while preserving dignity and mutual warmth.',
          image: 'assets/step_tools.jpg'
        }
      ],
      accordions: [
        {
          title: 'Full Program Description & 6-Week Journey',
          content: '<p><strong>AntarPrakash</strong> ("Inner Light") is RouteWithin\'s flagship 6-week guided transformation cohort led personally by Certified Master NLP & Relationship Coach Dimple Sandhu.</p><p>Rather than quick temporary fixes, each week builds systematically: Week 1 uncovers hidden emotional triggers; Week 2 resets your inner nervous system baseline; Week 3 introduces non-defensive communication; Week 4 rebuilds self-worth and clean boundaries; Week 5 dissolves accumulated silent resentment; Week 6 locks in a sustainable daily ritual for lasting harmony.</p>'
        },
        {
          title: 'Cohort Sizing, Time Commitment & Recordings',
          content: '<p>Weekly live sessions run for 90 minutes on Zoom, paired with simple 10-minute daily gratitude and reflection prompts. Cohorts are intentionally capped to preserve warmth and allow direct live Q&A. Every session is recorded in HD—if you ever miss a live session, your replay and workbook exercises await in your cohort portal.</p>'
        },
        {
          title: 'Who Should Enroll in AntarPrakash?',
          content: '<p>Ideal if you feel unheard despite giving your best, find yourself replaying the same conflict every few weeks, overthink partner silence, or simply want a deeper, calmer emotional foundation in your marriage or personal life.</p>'
        },
        {
          title: 'Frequently Asked Questions (FAQs)',
          content: '<p><strong>Do both partners need to attend?</strong> Not at all. Even a single partner shifting how they communicate transforms the dynamic of the entire home. However, our <em>Couples Alignment</em> track lets both attend together at significant savings.</p><p><strong>Is my privacy protected?</strong> Yes. Sharing is always voluntary, and our WhatsApp cohort runs under strict confidentiality rules.</p>'
        }
      ],
      reviews: [
        { name: 'Meenakshi K.', location: 'New Delhi', rating: 5, text: 'Within 3 weeks of AntarPrakash, the constant tension at home softened completely. I stopped reacting out of hurt and started feeling heard for the first time in years.' },
        { name: 'Ananya & Rohit S.', location: 'Bengaluru', rating: 5, text: 'We joined the Couples Alignment track feeling hesitant. Dimple ma\'am\'s frameworks gave us practical words for feelings we couldn\'t explain for a decade.' },
        { name: 'Shruti P.', location: 'Mumbai', rating: 5, text: 'The workbook and recordings alone are worth 10x. Having a safe sisterhood that understands Indian family dynamics made all the difference.' }
      ],
      recommendIds: ['gratitude-circle', 'rishta-reset', 'inner-circle', 'karwa-chauth', 'ebook-spotlight']
    },

    'inner-circle': {
      id: 'inner-circle',
      category: 'Private 1:1 & Mastermind Mentorship',
      title: 'Inner Circle',
      badge: 'VIP MENTORSHIP',
      rating: '5.0',
      reviewCount: 48,
      shortHook: 'An intimate, high-touch 6-month private mentorship and executive mastermind with Dimple Sandhu for profound personal elevation and relationship mastery.',
      tags: ['6 Months / 12 Months', '1:1 Private Strategy', 'VIP WhatsApp Access'],
      price: 59999,
      compareAtPrice: 79999,
      priceDisplay: '₹ 59,999',
      isPaid: true,
      redirectAfterRegister: 'thank-you.html',
      gallery: [
        { src: 'assets/golden_banner.jpg', alt: 'Inner Circle Private Mentorship', caption: 'Highest-touch private mentorship directly with Dimple Sandhu' },
        { src: 'assets/hero_coach.jpg', alt: '1:1 Strategy Coaching', caption: 'Dedicated 1:1 subconscious breakthrough & life mapping sessions' },
        { src: 'assets/coach_dimple_invitation.jpg', alt: 'Master Coach Dimple Sandhu', caption: 'Direct priority WhatsApp voice-note access between sessions' },
        { src: 'assets/step_booking.jpg', alt: 'Personalized Growth Roadmap', caption: 'Custom subconscious audits and full RouteWithin event access' }
      ],
      optionGroups: [
        {
          key: 'tier',
          label: 'MENTORSHIP TIER / DURATION',
          selectedIndex: 0,
          options: [
            { label: '6-Month Standard VIP', sub: 'Individual Elevation', price: 59999, compareAtPrice: 79999, durationTag: '6 Months Individual VIP' },
            { label: '6-Month Couples VIP', sub: 'Joint + Individual Calls', price: 84999, compareAtPrice: 115000, durationTag: '6 Months Couples VIP' },
            { label: '12-Month Mastery', sub: 'Full Year Transformation', price: 99999, compareAtPrice: 145000, durationTag: '12 Months Mastery' }
          ]
        },
        {
          key: 'focus',
          label: 'COACHING CADENCE',
          selectedIndex: 0,
          options: [
            { label: '1:1 Calls + Bi-Weekly Mastermind', sub: 'All Workshops Included' },
            { label: 'Executive Flexible Scheduling', sub: 'Priority Calendar Slots' }
          ]
        }
      ],
      bullets: [
        'Private 1:1 deep-dive strategy & subconscious breakthrough sessions with Dimple Sandhu',
        'Bi-weekly intimate mastermind calls with personalized hot-seat coaching',
        'Direct VIP WhatsApp access to Coach Dimple for real-time situational guidance',
        'Bespoke personal growth roadmap, limiting-belief audits & conflict recovery plans',
        'Complimentary VIP entry to all RouteWithin cohorts, Gratitude Circle & live workshops'
      ],
      highlightsBar: [
        { icon: '👑', label: 'Access', value: 'Direct 1:1 + VIP WhatsApp' },
        { icon: '🕰️', label: 'Duration', value: '6 or 12 Months' },
        { icon: '🎁', label: 'Bonuses', value: 'All Workshops Included' },
        { icon: '🔒', label: 'Privacy', value: 'Ultra-Discreet Space' }
      ],
      specs: [
        { label: 'Mentorship Length', value: '6 Months or 12 Months Continuous Partnership' },
        { label: 'Private 1:1 Sessions', value: 'Dedicated one-on-one subconscious breakthrough & life-alignment sessions' },
        { label: 'Mastermind Access', value: 'Bi-weekly small-table mastermind & hot-seat Q&A circles' },
        { label: 'Real-Time Support', value: 'Direct private WhatsApp voice & text check-ins during crucial life moments' },
        { label: 'All-Access Pass', value: 'Automatic admission to AntarPrakash, Gratitude Circle & Rishta Reset Live' },
        { label: 'Ideal For', value: 'Leaders, professionals, and homemakers seeking complete relationship & self-mastery' }
      ],
      zigzagFeatures: [
        {
          eyebrow: 'BESPOKE SUPPORT',
          title: 'Real-time guidance exactly when life or tough conversations happen',
          desc: 'Beyond scheduled sessions, Inner Circle gives you a trusted mentor in your corner on WhatsApp—helping you stay grounded before sensitive family conversations or pivotal career and personal decisions.',
          image: 'assets/hero_coach.jpg'
        },
        {
          eyebrow: 'ALL-INCLUSIVE ECOSYSTEM',
          title: 'Every RouteWithin program, retreat, and workbook unlocked',
          desc: 'Never piece together workshops separately. Your Inner Circle membership seamlessly includes full access to our live cohorts, Gratitude Circle, and personalized assessments.',
          image: 'assets/sunset_mountains.jpg'
        }
      ],
      accordions: [
        {
          title: 'Full Mentorship Description',
          content: '<p><strong>Inner Circle</strong> is designed for individuals and couples ready for permanent transformation rather than piecemeal workshops. Combining deep NLP subconscious rewiring with ongoing real-life accountability, Dimple Sandhu works alongside you personally across 6 or 12 months.</p>'
        },
        {
          title: 'How 1:1 Sessions & VIP WhatsApp Work',
          content: '<p>Upon enrollment, we map your baseline assessment and book your first 1:1 deep-dive strategy call. Between sessions, you have dedicated private WhatsApp access for voice-note reflections and real-time support before important conversations.</p>'
        },
        {
          title: 'Frequently Asked Questions (FAQs)',
          content: '<p><strong>Can I speak with Dimple before choosing 6 vs 12 months?</strong> Yes—click "Book a Clarity Call" or register directly and our team will coordinate a brief alignment check prior to onboarding.</p>'
        }
      ],
      reviews: [
        { name: 'Kavita N.', location: 'Hyderabad', rating: 5, text: 'Having Dimple on WhatsApp during the hardest transition of my marriage gave me poise I didn\'t know I had. Truly life-altering investment.' },
        { name: 'Dr. Ritu M.', location: 'Chandigarh', rating: 5, text: 'Not only did my home life become peaceful, my leadership clarity at my clinic skyrocketed. Inner Circle elevates every area of life.' },
        { name: 'Vikram & Neha T.', location: 'Pune', rating: 5, text: 'We upgraded to the Couples VIP track. Every single session dissolved years of unspoken assumptions gently and respectfully.' }
      ],
      recommendIds: ['antarprakash', 'gratitude-circle', 'rishta-reset', 'karwa-chauth', 'ebook-spotlight']
    },

    'gratitude-circle': {
      id: 'gratitude-circle',
      category: 'Continuity Membership',
      title: 'Gratitude Circle',
      badge: 'WEEKLY SANCTUARY',
      rating: '4.9',
      reviewCount: 215,
      shortHook: 'A nourishing weekly Zoom sanctuary and supportive sisterhood to stay grounded in gratitude, calm overthinking loops, and protect your daily peace.',
      tags: ['Weekly Live Zoom', 'Daily Micro-Prompts', 'Cancel Anytime'],
      price: 555,
      compareAtPrice: 999,
      priceDisplay: '₹ 555 / month',
      isPaid: true,
      redirectAfterRegister: 'thank-you.html',
      gallery: [
        { src: 'assets/card_alone.jpg', alt: 'Gratitude Circle Weekly Sanctuary', caption: 'Stay emotionally centered alongside a warm community' },
        { src: 'assets/card_overthinking.jpg', alt: 'Calm Overthinking Loops', caption: 'Weekly guided breathwork, gratitude & emotional release' },
        { src: 'assets/step_guidance.jpg', alt: 'Daily Micro-Gratitude Prompts', caption: 'Simple 5-minute daily prompts straight to the community' },
        { src: 'assets/card_lost_self.jpg', alt: 'Return To Yourself', caption: 'Reclaim your morning calm and inner steadiness' }
      ],
      optionGroups: [
        {
          key: 'plan',
          label: 'MEMBERSHIP PLAN / DURATION',
          selectedIndex: 0,
          options: [
            { label: 'Monthly Plan', sub: '₹555 / month · Flexible', price: 555, compareAtPrice: 999, durationTag: 'Monthly Continuity' },
            { label: 'Quarterly (3 Months)', sub: '₹1,499 total · Save 50%', price: 1499, compareAtPrice: 2997, durationTag: '3 Months Quarterly Plan' },
            { label: 'Annual (12 Months)', sub: '₹5,499 total · Best Value', price: 5499, compareAtPrice: 11988, durationTag: '12 Months Annual Sanctuary' }
          ]
        },
        {
          key: 'format',
          label: 'ACCESS FORMAT',
          selectedIndex: 0,
          options: [
            { label: 'Live Weekly Zoom + WhatsApp Sangha', sub: 'All Replays Included' }
          ]
        }
      ],
      bullets: [
        'Weekly live guided gratitude, breathwork & emotional centering circles on Zoom',
        'Daily micro-gratitude & reflection prompts to break anxious overthinking loops',
        'Warm, strictly moderated private WhatsApp sisterhood sangha',
        'Monthly live Q&A & mindset alignment check-in with Master Coach Dimple Sandhu',
        'Zero lock-in on monthly plan — stay as long as it nourishes your soul'
      ],
      highlightsBar: [
        { icon: '🌿', label: 'Frequency', value: 'Weekly Live + Daily Prompts' },
        { icon: '🤝', label: 'Community', value: 'Supportive Sangha' },
        { icon: '🎥', label: 'Platform', value: 'Zoom + WhatsApp' },
        { icon: '✨', label: 'Commitment', value: 'Cancel Anytime' }
      ],
      specs: [
        { label: 'Membership Type', value: 'Ongoing Weekly Continuity & Community Sanctuary' },
        { label: 'Live Gathering', value: 'Weekly Interactive Zoom Centering & Gratitude Session' },
        { label: 'Daily Rhythm', value: 'Morning gratitude nudge & evening emotional release prompt' },
        { label: 'Monthly Deep-Dive', value: 'Monthly Live Q&A Alignment Circle directly with Dimple Sandhu' },
        { label: 'Ideal For', value: 'Anyone seeking consistent emotional balance, calmer mornings & warm community' },
        { label: 'Flexibility', value: 'Upgrade to Quarterly/Annual anytime or pause whenever needed' }
      ],
      zigzagFeatures: [
        {
          eyebrow: 'CONSISTENT GROUNDING',
          title: 'Stop sliding back into old stress when busy life resumes',
          desc: 'One workshop sparks inspiration, but gentle weekly rhythm builds lasting serenity. Gratitude Circle keeps your emotional cup full week after week.',
          image: 'assets/card_overthinking.jpg'
        },
        {
          eyebrow: 'SAFE SISTERHOOD',
          title: 'Surround yourself with calm, uplifting voices every morning',
          desc: 'Share reflections in a confidential, non-toxic admin-guided space where growth, gratitude, and quiet strength are celebrated daily.',
          image: 'assets/card_tired.jpg'
        }
      ],
      accordions: [
        {
          title: 'What Happens Inside Gratitude Circle?',
          content: '<p>Every week we gather live for 45–60 minutes of guided gratitude practice, NLP state-shifting, gentle breathwork, and sharing wins. Between live calls, our WhatsApp sangha keeps your focus anchored on calm, clarity, and appreciation.</p>'
        },
        {
          title: 'Monthly vs Quarterly vs Annual Plans',
          content: '<p>Start with the Monthly Plan at ₹555/mo to experience the rhythm, or lock in Quarterly (₹1,499) or Annual (₹5,499) for significant built-in savings across the year.</p>'
        },
        {
          title: 'Frequently Asked Questions (FAQs)',
          content: '<p><strong>What if I miss a live Zoom circle?</strong> Every session recording and weekly prompt summary is shared right inside the private Gratitude Circle group.</p>'
        }
      ],
      reviews: [
        { name: 'Priya D.', location: 'Jaipur', rating: 5, text: 'At ₹555 a month this is the gentlest gift I give myself. My anxiety around family expectations has dropped dramatically.' },
        { name: 'Sonali R.', location: 'Ahmedabad', rating: 5, text: 'I upgraded to the annual pass after my very first month. Those weekly sessions anchor my entire week.' },
        { name: 'Deepa G.', location: 'Chennai', rating: 5, text: 'Clean, peaceful, zero spam, deeply restorative. Dimple\'s voice alone relaxes my nervous system in five minutes.' }
      ],
      recommendIds: ['antarprakash', 'rishta-reset', 'karwa-chauth', 'ebook-spotlight', 'inner-circle']
    },

    'rishta-reset': {
      id: 'rishta-reset',
      category: 'Weekly Live Interactive Workshop',
      title: 'Rishta Reset Live',
      badge: '90-MIN POWER WORKSHOP',
      rating: '4.9',
      reviewCount: 386,
      shortHook: 'A high-impact 90-minute live interactive workshop to immediately stop recurring arguments, dissolve silent distance, and reset how you and your partner connect.',
      tags: ['90 Minutes Live', 'Action Guide Included', 'Live Hot-Seat Q&A'],
      price: 99,
      compareAtPrice: 499,
      priceDisplay: '₹ 99',
      isPaid: true,
      redirectAfterRegister: 'thank-you.html',
      gallery: [
        { src: 'assets/card_crossroads.jpg', alt: 'Rishta Reset Live 90-Minute Workshop', caption: 'Break recurring fight loops in just 90 focused minutes' },
        { src: 'assets/card_unheard.jpg', alt: 'Feel Truly Heard', caption: 'Learn the 3-step de-escalation dialogue framework' },
        { src: 'assets/step_tools.jpg', alt: 'Action Guide & Checklist', caption: 'Includes downloadable Communication Checklist PDF' },
        { src: 'assets/karwachauth.png', alt: 'Interactive Live Workshop', caption: 'Anonymous Q&A and live coaching with Dimple Sandhu' }
      ],
      optionGroups: [
        {
          key: 'pass',
          label: 'PASS TYPE / SEAT SIZE',
          selectedIndex: 0,
          options: [
            { label: 'Single Live Seat', sub: '1 Attendee · Action Guide', price: 99, compareAtPrice: 499, durationTag: '90-Min Single Live Pass' },
            { label: 'Couple Pass (2 Seats)', sub: 'Attend Together · Save More', price: 179, compareAtPrice: 998, durationTag: '90-Min Couple Pass (2 Seats)' },
            { label: 'Seat + 7-Day Replay Pack', sub: 'Includes Workshop Recording', price: 249, compareAtPrice: 799, durationTag: '90-Min Pass + Replay Pack' }
          ]
        },
        {
          key: 'slot',
          label: 'UPCOMING SESSION FORMAT',
          selectedIndex: 0,
          options: [
            { label: 'This Week Live on Zoom (90 Mins)', sub: 'Link Sent via WhatsApp' }
          ]
        }
      ],
      bullets: [
        '90-Minute live interactive breakthrough workshop with Master Coach Dimple Sandhu',
        'Learn the exact 3-step NLP framework to de-escalate heated arguments in real time',
        'Anonymous live hot-seat Q&A to get clarity on your specific relationship crossroads',
        'Downloadable "Rishta Reset Action Guide & Communication Checklist"',
        'Immediate entry into the official RouteWithin WhatsApp attendees community'
      ],
      highlightsBar: [
        { icon: '⏱️', label: 'Duration', value: '90 Minutes Live' },
        { icon: '🛠️', label: 'Takeaway', value: '3-Step Reset Blueprint' },
        { icon: '📄', label: 'Bonus PDF', value: 'Action Checklist' },
        { icon: '💬', label: 'Live Q&A', value: 'Anonymous Hot-Seat' }
      ],
      specs: [
        { label: 'Session Duration', value: '90 Minutes (70-Min Teaching + 20-Min Live Q&A)' },
        { label: 'Format', value: 'Live Interactive Zoom Workshop' },
        { label: 'Bonus Kit', value: 'Downloadable Rishta Reset Action Guide & Communication Checklist PDF' },
        { label: 'Ideal For', value: 'Anyone experiencing repeated arguments, cold distance, or communication breakdown' },
        { label: 'Entry Logistics', value: 'Zoom link & passcode shared directly in the private WhatsApp community' },
        { label: 'Privacy', value: 'Camera optional; anonymous question submission supported' }
      ],
      zigzagFeatures: [
        {
          eyebrow: 'STOP THE CYCLE TODAY',
          title: '90 seconds is all it takes to change the direction of an argument',
          desc: 'Discover the tiny vocal, timing, and phrasing shifts that lower your partner\'s defensiveness immediately—before a small disagreement turns into three days of silence.',
          image: 'assets/card_unheard.jpg'
        },
        {
          eyebrow: 'ACTIONABLE CLARITY',
          title: 'Walk away with a clear checklist you can use tonight',
          desc: 'No vague theory. You leave with exact conversation starters and emotional boundary tools tailored for real Indian household and couple realities.',
          image: 'assets/card_alone.jpg'
        }
      ],
      accordions: [
        {
          title: 'Full Workshop Overview',
          content: '<p><strong>Rishta Reset Live</strong> is our most accessible high-clarity session for anyone wanting immediate relief from recurring conflict or emotional burnout. For less than the price of a coffee, spend 90 guided minutes with Dimple Sandhu uncovering why the same loops keep repeating and how to reset them starting today.</p>'
        },
        {
          title: 'Single Seat vs Couple Pass vs Replay Pack',
          content: '<p>Choose the <strong>Single Seat (₹99)</strong> for live attendance, upgrade to the <strong>Couple Pass (₹179)</strong> if your partner will join on the same or separate device, or pick the <strong>Replay Pack (₹249)</strong> if your schedule is tight and you want 7-day access to rewatch and take notes.</p>'
        },
        {
          title: 'Frequently Asked Questions (FAQs)',
          content: '<p><strong>How do I get the Zoom link?</strong> Right after registration, click the green WhatsApp Community button on the confirmation page—we share the Zoom link and bonus checklist directly inside that group.</p>'
        }
      ],
      reviews: [
        { name: 'Nidhi V.', location: 'Lucknow', rating: 5, text: 'I only paid ₹99 expecting a generic talk, and got practical tools I used the very same evening. Worth so much more!' },
        { name: 'Raghav & Simran', location: 'Gurugram', rating: 5, text: 'We took the Couple Pass. The 3-step pause tool alone saved us from two huge arguments this month.' },
        { name: 'Archana B.', location: 'Pune', rating: 5, text: 'So clear, compassionate, and zero blame. Loved the downloadable checklist.' }
      ],
      recommendIds: ['antarprakash', 'gratitude-circle', 'karwa-chauth', 'active-initiative', 'ebook-spotlight']
    },

    'karwa-chauth': {
      id: 'karwa-chauth',
      category: 'Special Free Live Masterclass',
      title: 'Beyond the Vrat: A Karwa Chauth Masterclass',
      badge: '100% FREE SPECIAL',
      rating: '4.9',
      reviewCount: 412,
      shortHook: 'For women who give their love every day and want to feel it back. One honest live hour dedicated to mutual respect, emotional closeness, and true partnership.',
      tags: ['Nov 2, 2026 • 4:30 PM IST', '100% Free Zoom', 'Women & Wives'],
      price: 0,
      compareAtPrice: 999,
      priceDisplay: '100% Free (Zoom)',
      isPaid: false,
      redirectAfterRegister: 'thank-you.html',
      gallery: [
        { src: 'assets/karwachauth.png', alt: 'Beyond the Vrat Karwa Chauth Masterclass', caption: 'Rebuild emotional closeness & feel genuinely valued 365 days a year' },
        { src: 'assets/coach_dimple_invitation.jpg', alt: 'Master Coach Dimple Sandhu', caption: 'Hosted live by Certified Master Coach Dimple Sandhu' },
        { src: 'assets/card_alone.jpg', alt: 'Close Emotional Distance', caption: 'Heal silent resentment without confrontation' },
        { src: 'assets/book_cover.jpg', alt: 'Companion E-Book Included', caption: 'Includes community access + companion guide notes' }
      ],
      optionGroups: [
        {
          key: 'seat',
          label: 'ADMISSION / PASS TYPE',
          selectedIndex: 0,
          options: [
            { label: 'Free Live Zoom Seat', sub: '100% Complimentary · 60 Mins', price: 0, compareAtPrice: 999, durationTag: 'Nov 2, 2026 (4:30 PM IST)' },
            { label: 'Free Seat + E-Book Access', sub: 'Zoom Seat + WhatsApp PDF Pack', price: 0, compareAtPrice: 1499, durationTag: 'Nov 2, 2026 + Free E-Book Pack' }
          ]
        },
        {
          key: 'timing',
          label: 'SESSION DATE & TIME',
          selectedIndex: 0,
          options: [
            { label: 'Monday, Nov 2 · 4:30 – 5:30 PM IST', sub: 'Live Interactive Zoom' }
          ]
        }
      ],
      bullets: [
        'Close silent emotional distance gently without walking on eggshells',
        'Feel cherished, recognized, and valued 365 days a year — not just on festivals',
        'Decode the hidden subconscious loops behind recurring household misunderstandings',
        'Reclaim your inner dignity, calm boundaries & warm partnership connection',
        '100% Free complimentary community initiative (Zoom link delivered on WhatsApp)'
      ],
      highlightsBar: [
        { icon: '🗓️', label: 'Date', value: 'Monday, Nov 2, 2026' },
        { icon: '⏰', label: 'Time', value: '4:30 – 5:30 PM IST' },
        { icon: '💻', label: 'Format', value: 'Live Interactive Zoom' },
        { icon: '🎁', label: 'Fee', value: '100% Free (Worth ₹999)' }
      ],
      specs: [
        { label: 'Event Date & Time', value: 'Monday, Nov 2, 2026 · 4:30 PM – 5:30 PM IST' },
        { label: 'Admission Fee', value: '₹ 0 (100% Free Complimentary Seat)' },
        { label: 'Host & Mentor', value: 'Dimple Sandhu — Certified Life & Relationship Coach' },
        { label: 'Ideal For', value: 'Women who give effortlessly every day and want deeper emotional reciprocity' },
        { label: 'Key Pillars Covered', value: 'Emotional Closeness, Everyday Appreciation, NLP Conflict Decoding, Self-Worth' },
        { label: 'Entry Link Delivery', value: 'Shared exclusively inside the Official WhatsApp Community after signup' }
      ],
      zigzagFeatures: [
        {
          eyebrow: 'FEEL CHERISHED EVERY DAY',
          title: 'Beyond one ceremonial day — build warmth that lasts all 365 days',
          desc: 'A relationship rarely fades because love disappears; it dims under unspoken expectations and routine exhaustion. Learn gentle gratitude-led shifts that invite recognition naturally.',
          image: 'assets/card_alone.jpg'
        },
        {
          eyebrow: 'CONFIDENTIAL WOMEN\'S CIRCLE',
          title: 'Safe, interactive, and grounded in real Indian household dynamics',
          desc: 'Join hundreds of thoughtful women in an uplifting hour where your feelings are understood without judgment.',
          image: 'assets/coach_dimple_invitation.jpg'
        }
      ],
      accordions: [
        {
          title: 'Full Masterclass Details',
          content: '<p>In this special 60-minute live masterclass, Master Coach Dimple Sandhu unpacks why emotional distance grows even in caring marriages—and shares practical NLP & gratitude frameworks to restore closeness, mutual respect, and quiet joy at home.</p>'
        },
        {
          title: 'How to Receive the Live Zoom Link',
          content: '<p>Right after completing the quick free registration form, you will see the confirmation page with our private WhatsApp Community button. Join the group immediately to receive the Zoom link, entry password, and session workbook.</p>'
        }
      ],
      reviews: [
        { name: 'Pooja S.', location: 'Noida', rating: 5, text: 'I cried happy tears during this hour. It felt like Coach Dimple was speaking directly to my heart.' },
        { name: 'Harpreet K.', location: 'Ludhiana', rating: 5, text: 'Zero sales pressure, just pure warmth and actionable wisdom. Joined AntarPrakash right after.' },
        { name: 'Swati A.', location: 'Indore', rating: 5, text: 'The easiest 1 hour investment I\'ve made all year. Completely shifted how I approach my evenings.' }
      ],
      recommendIds: ['active-initiative', 'rishta-reset', 'antarprakash', 'gratitude-circle', 'ebook-spotlight']
    },

    'active-initiative': {
      id: 'active-initiative',
      category: 'Free Weekly Masterclasses',
      title: 'Weekly Interactive Masterclasses',
      badge: 'EVERY WEDNESDAY • FREE',
      rating: '4.9',
      reviewCount: 520,
      shortHook: 'Join Dimple Sandhu every Wednesday for live interactive cohorts breaking down subconscious conflict loops, emotional triggers, and daily communication frameworks.',
      tags: ['Every Wednesday 5:30 PM', '100% Free Live Zoom', 'Interactive Q&A'],
      price: 0,
      compareAtPrice: 799,
      priceDisplay: '100% Free (Zoom)',
      isPaid: false,
      redirectAfterRegister: 'thank-you.html',
      gallery: [
        { src: 'assets/golden_banner.jpg', alt: 'Weekly Interactive Masterclasses', caption: 'Weekly live coaching cohorts every Wednesday at 5:30 PM IST' },
        { src: 'assets/dimple_sandhu.png', alt: 'Coach Dimple Sandhu Live', caption: 'Direct insights from Master NLP & Relationship Coach Dimple Sandhu' },
        { src: 'assets/step_guidance.jpg', alt: 'Communication Frameworks', caption: 'Practical tools for subconscious triggers & emotional clarity' },
        { src: 'assets/card_tired.jpg', alt: 'Restore Emotional Balance', caption: 'Stop being the only one carrying the emotional weight' }
      ],
      optionGroups: [
        {
          key: 'pass',
          label: 'SEAT SELECTION',
          selectedIndex: 0,
          options: [
            { label: 'This Wednesday Live Seat', sub: '100% Free · 5:30 PM IST', price: 0, compareAtPrice: 799, durationTag: 'Every Wednesday (5:30 PM IST)' },
            { label: 'Wednesday Pass + Clarity Assessment', sub: 'Includes Free Self-Audit', price: 0, compareAtPrice: 1299, durationTag: 'Weekly Live + Free Assessment' }
          ]
        },
        {
          key: 'mode',
          label: 'DELIVERY FORMAT',
          selectedIndex: 0,
          options: [
            { label: 'Interactive Zoom + WhatsApp Alerts', sub: 'Weekly Reminders Included' }
          ]
        }
      ],
      bullets: [
        'Fresh topic every Wednesday tackling real communication & relationship roadblocks',
        'Understand subconscious emotional triggers and break automatic fight-or-freeze loops',
        'Live interactive Q&A with Master Coach Dimple Sandhu directly on Zoom',
        '100% complimentary community initiative — open to newcomers & returning members',
        'Zoom link and reminder alerts shared in our official WhatsApp community'
      ],
      highlightsBar: [
        { icon: '📅', label: 'Schedule', value: 'Every Wednesday' },
        { icon: '⏰', label: 'Time', value: '5:30 PM IST' },
        { icon: '🎟️', label: 'Admission', value: '100% Free (Worth ₹799)' },
        { icon: '💬', label: 'Community', value: 'WhatsApp Access' }
      ],
      specs: [
        { label: 'Recurring Schedule', value: 'Every Wednesday at 5:30 PM IST' },
        { label: 'Session Length', value: '60 Minutes Interactive Live Cohort' },
        { label: 'Admission Cost', value: 'Free Community Initiative (₹0)' },
        { label: 'Topics Covered', value: 'Subconscious Loops, Emotional Triggers, Healthy Boundaries, Empathy' },
        { label: 'Ideal For', value: 'First-time visitors wanting to experience Dimple Sandhu\'s coaching style live' },
        { label: 'Next Step Support', value: 'Clear guidance on optional deeper cohorts only if you choose' }
      ],
      zigzagFeatures: [
        {
          eyebrow: 'WEEKLY MOMENTUM',
          title: 'Experience RouteWithin live before committing to any long-term cohort',
          desc: 'Our Wednesday sessions are designed as a warm open door—come listen, ask your real questions, and take home one practical shift you can apply the same week.',
          image: 'assets/step_guidance.jpg'
        },
        {
          eyebrow: 'LIVE BREAKTHROUGHS',
          title: 'Decode why smart, caring people still get stuck in communication gaps',
          desc: 'Discover how subconscious pacing and tone shape emotional safety faster than long explanations ever can.',
          image: 'assets/card_crossroads.jpg'
        }
      ],
      accordions: [
        {
          title: 'About the Wednesday Interactive Masterclasses',
          content: '<p>Every Wednesday at 5:30 PM IST, RouteWithin hosts an open, complimentary Zoom masterclass led by Dimple Sandhu. Each session spotlights one core theme—ranging from handling unspoken resentment to reclaiming emotional energy—with interactive exercises and live Q&A.</p>'
        },
        {
          title: 'Where Do I Get the Meeting Link?',
          content: '<p>Submit the free registration form and click the green WhatsApp Community button on the next screen. The Wednesday Zoom meeting link and entry updates are posted directly inside the group.</p>'
        }
      ],
      reviews: [
        { name: 'Ritika M.', location: 'Delhi', rating: 5, text: 'Attended one Wednesday out of curiosity and felt an instant sense of relief. Best 60 minutes of my week!' },
        { name: 'Shalini G.', location: 'Kolkata', rating: 5, text: 'Love that it\'s interactive and grounded—no fluff, just honest practical wisdom.' },
        { name: 'Neha K.', location: 'Surat', rating: 5, text: 'Every Wednesday feels like hitting the emotional reset button.' }
      ],
      recommendIds: ['karwa-chauth', 'rishta-reset', 'antarprakash', 'gratitude-circle', 'ebook-spotlight']
    },

    'ebook-spotlight': {
      id: 'ebook-spotlight',
      category: 'Digital Self-Alignment Guide',
      title: 'Route Within: From Conflict to Clarity',
      badge: '100% FREE PDF E-BOOK',
      rating: '4.9',
      reviewCount: 640,
      shortHook: 'A compassionate, practical pocket guide by Master Coach Dimple Sandhu to heal silent distance, rewire emotional triggers, and cultivate lasting peace from within.',
      tags: ['Instant PDF Guide', '90-Sec De-Escalation Scripts', '7 Gratitude Prompts'],
      price: 0,
      compareAtPrice: 499,
      priceDisplay: '100% Free (PDF)',
      isPaid: false,
      redirectAfterRegister: 'thank-you.html',
      gallery: [
        { src: 'assets/book_cover.jpg', alt: 'Route Within E-Book Cover', caption: 'Route Within: From Conflict to Clarity — Official Free E-Book' },
        { src: 'assets/step_tools.jpg', alt: 'Guided Journal Prompts', caption: 'Includes 7 daily gratitude & emotional grounding journal prompts' },
        { src: 'assets/couch_woman.jpg', alt: 'Read Anywhere Anytime', caption: 'Mobile & tablet friendly high-clarity digital PDF edition' }
      ],
      optionGroups: [
        {
          key: 'edition',
          label: 'EDITION / FORMAT SIZE',
          selectedIndex: 0,
          options: [
            { label: 'Digital PDF Edition', sub: '64 Pages · Instant Access', price: 0, compareAtPrice: 499, durationTag: 'Digital PDF Edition (Free)' },
            { label: 'E-Book + Masterclass Bundle', sub: 'PDF Guide + Free Wednesday Zoom', price: 0, compareAtPrice: 1298, durationTag: 'Free E-Book + Masterclass Pass' }
          ]
        },
        {
          key: 'delivery',
          label: 'DELIVERY TIMELINE',
          selectedIndex: 0,
          options: [
            { label: '7–8 Days Delivery', sub: 'Standard Pan-India Delivery' }
          ]
        }
      ],
      bullets: [
        'Uncover the 3 hidden subconscious loops that quietly create emotional distance',
        'Word-for-word de-escalation scripts to defuse heated arguments within 90 seconds',
        '7 structured Daily Gratitude Journal prompts for immediate emotional grounding',
        'Readable on any phone, tablet, or laptop in under 45 minutes',
        '100% Free gift from Master Coach Dimple Sandhu to the RouteWithin community'
      ],
      highlightsBar: [
        { icon: '📖', label: 'Length', value: 'Concise 45-Min Read' },
        { icon: '📱', label: 'Format', value: 'Mobile & Tablet PDF' },
        { icon: '✍️', label: 'Worksheets', value: '7 Journal Prompts' },
        { icon: '🎁', label: 'Price', value: '100% Free (Worth ₹499)' }
      ],
      specs: [
        { label: 'File Format', value: 'High-Resolution Digital PDF (Mobile & Print Friendly)' },
        { label: 'Author', value: 'Dimple Sandhu — Certified Master NLP & Relationship Coach' },
        { label: 'Core Chapters', value: '3 Subconscious Loops, 90-Second De-Escalation, Self-Worth Anchors' },
        { label: 'Bonus Inside', value: '7 Daily Gratitude Journal Prompts & Self-Reflection Checklist' },
        { label: 'Access Cost', value: '100% Complimentary Community Gift' },
        { label: 'Delivery Timeline', value: '7–8 days estimated delivery across India' }
      ],
      zigzagFeatures: [
        {
          eyebrow: 'PRACTICAL SCRIPTS',
          title: 'Know what to say when tension rises in 90 seconds or less',
          desc: 'Includes concrete pause phrases and tone adjustments you can bookmark on your phone and reach for whenever a conversation starts spiraling.',
          image: 'assets/step_tools.jpg'
        },
        {
          eyebrow: 'GENTLE SELF-REFLECTION',
          title: 'Seven days of calm evening journaling prompts',
          desc: 'Turn quiet resentment into gentle self-awareness with structured evening check-ins you can complete in just five minutes before bed.',
          image: 'assets/couch_woman.jpg'
        }
      ],
      accordions: [
        {
          title: 'Inside the E-Book — Chapter Summary',
          content: '<p><strong>Chapter 1:</strong> The 3 Subconscious Loops That Drive Distance.<br><strong>Chapter 2:</strong> De-Escalation Scripts Under 90 Seconds.<br><strong>Chapter 3:</strong> Boundaries Without Guilt.<br><strong>Appendix:</strong> 7 Daily Gratitude & Grounding Journal Prompts.</p>'
        },
        {
          title: 'How to Download Your Copy',
          content: '<p>Click "Claim Free E-Book" to complete your quick registration (or join the official WhatsApp group directly), where the verified PDF download link is pinned for instant access.</p>'
        }
      ],
      reviews: [
        { name: 'Aparna T.', location: 'Bengaluru', rating: 5, text: 'I read the whole PDF during my evening tea and highlighted half the pages. Those 90-second scripts are pure gold.' },
        { name: 'Nandini M.', location: 'Kochi', rating: 5, text: 'Simple, deeply compassionate, and written with real warmth—not dry textbook jargon.' }
      ],
      recommendIds: ['active-initiative', 'rishta-reset', 'antarprakash', 'gratitude-circle', 'karwa-chauth']
    }
  };

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatINR(num) {
    const n = Number(num) || 0;
    if (n === 0) return '100% Free';
    return '₹ ' + n.toLocaleString('en-IN');
  }

  function calcDiscountPct(price, compareAt) {
    const p = Number(price) || 0;
    const c = Number(compareAt) || 0;
    if (!c || c <= p) return '';
    if (p === 0) return 'FREE GIFT';
    const pct = Math.round(((c - p) / c) * 100);
    return pct > 0 ? pct + '% OFF' : '';
  }

  // Merge any CMS customizations (titles/prices/descriptions updated via admin-leads) onto rich defaults
  function getEnrichedProduct(id) {
    const base = PRODUCTS[id] || PRODUCTS['antarprakash'];
    const clone = JSON.parse(JSON.stringify(base));

    if (root.ROUTEWITHIN_CATALOG && root.ROUTEWITHIN_CATALOG[clone.id]) {
      const cat = root.ROUTEWITHIN_CATALOG[clone.id];
      if (cat.title) clone.title = cat.title;
      if (cat.description) clone.shortHook = cat.description;
      if (typeof cat.amount === 'number' && cat.amount > 0 && clone.optionGroups && clone.optionGroups[0]) {
        // Keep CMS base price aligned with default first option if customized in admin
        if (clone.price !== cat.amount) {
          clone.price = cat.amount;
          clone.priceDisplay = cat.priceDisplay || formatINR(cat.amount);
          clone.optionGroups[0].options[0].price = cat.amount;
        }
      }
    }
    return clone;
  }

  function getAllProductIds() {
    return Object.keys(PRODUCTS);
  }

  // ─── SLIDING RECOMMENDATIONS CAROUSEL ("YOU MAY ALSO LIKE") ─────────────

  function renderRecommendationsSlider(containerId, excludeId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const current = excludeId && PRODUCTS[excludeId] ? PRODUCTS[excludeId] : null;
    const orderedIds = current && current.recommendIds
      ? current.recommendIds.slice()
      : getAllProductIds().filter(function(k) { return k !== excludeId; });

    // Append any remaining products not in recommendIds
    getAllProductIds().forEach(function(k) {
      if (k !== excludeId && orderedIds.indexOf(k) === -1) orderedIds.push(k);
    });

    const cardsHtml = orderedIds.map(function(pid) {
      const item = getEnrichedProduct(pid);
      const disc = calcDiscountPct(item.price, item.compareAtPrice);
      const primaryOpt = item.optionGroups && item.optionGroups[0] && item.optionGroups[0].options[0];
      const sizePill = primaryOpt ? primaryOpt.label : item.category;

      return '<article class="rw-rec-card" data-product-id="' + escapeHtml(item.id) + '">'
        + '<a href="product.html?id=' + encodeURIComponent(item.id) + '" class="rw-rec-img-wrap" aria-label="View ' + escapeHtml(item.title) + '">'
        + '<img src="' + escapeHtml(item.gallery[0].src) + '" alt="' + escapeHtml(item.title) + '" loading="lazy">'
        + (disc ? '<span class="rw-rec-badge ' + (item.price === 0 ? 'is-free' : '') + '">' + escapeHtml(disc) + '</span>' : '')
        + '</a>'
        + '<div class="rw-rec-body">'
        + '<div class="rw-rec-meta">'
        + '<span class="rw-rec-cat">' + escapeHtml(item.category) + '</span>'
        + '<span class="rw-rec-rating">★ ' + escapeHtml(item.rating) + ' <span>(' + escapeHtml(item.reviewCount) + ')</span></span>'
        + '</div>'
        + '<h3 class="rw-rec-title"><a href="product.html?id=' + encodeURIComponent(item.id) + '">' + escapeHtml(item.title) + '</a></h3>'
        + '<p class="rw-rec-desc">' + escapeHtml(item.shortHook) + '</p>'
        + '<div class="rw-rec-tags">'
        + '<span class="rw-rec-tag">' + escapeHtml(sizePill) + '</span>'
        + (item.tags && item.tags[0] ? '<span class="rw-rec-tag">' + escapeHtml(item.tags[0]) + '</span>' : '')
        + '</div>'
        + '<div class="rw-rec-price-row">'
        + '<span class="rw-rec-price">' + escapeHtml(item.price === 0 ? 'FREE' : formatINR(item.price)) + '</span>'
        + (item.compareAtPrice > item.price ? '<span class="rw-rec-mrp">' + escapeHtml(formatINR(item.compareAtPrice)) + '</span>' : '')
        + '</div>'
        + '<div class="rw-rec-actions">'
        + '<a href="product.html?id=' + encodeURIComponent(item.id) + '" class="btn btn-secondary btn-sm rw-rec-view-btn">View Details</a>'
        + '<button type="button" class="btn btn-hero-book btn-sm rw-rec-cta-btn" onclick="openRegistrationModal(\'' + escapeHtml(item.id) + '\')">'
        + (item.isPaid ? 'Enroll →' : 'Claim Free →')
        + '</button>'
        + '</div>'
        + '</div>'
        + '</article>';
    }).join('');

    const uid = containerId + '_slider';
    container.innerHTML =
      '<div class="container">'
      + '<div class="rw-rec-header">'
      + '<div>'
      + '<span class="rw-rec-kicker">TAILORED SUGGESTIONS FOR YOUR NEXT STEP</span>'
      + '<h2 class="rw-rec-heading">Recommended For You</h2>'
      + '<p class="rw-rec-sub">Slide to explore programs, live workshops & free guides that pair naturally with your journey.</p>'
      + '</div>'
      + '<div class="rw-rec-nav-controls" aria-label="Recommendation slider controls">'
      + '<button type="button" class="rw-rec-arrow" id="' + uid + '_prev" aria-label="Slide previous recommendations">&#8249;</button>'
      + '<button type="button" class="rw-rec-arrow" id="' + uid + '_next" aria-label="Slide next recommendations">&#8250;</button>'
      + '</div>'
      + '</div>'
      + '<div class="rw-rec-viewport">'
      + '<div class="rw-rec-track" id="' + uid + '_track" tabindex="0" role="region" aria-label="Recommended programs carousel">'
      + cardsHtml
      + '</div>'
      + '</div>'
      + '<div class="rw-rec-dots" id="' + uid + '_dots" aria-hidden="true"></div>'
      + '</div>';

    wireSliderInteractions(uid);
  }

  function wireSliderInteractions(uid) {
    const track = document.getElementById(uid + '_track');
    const prevBtn = document.getElementById(uid + '_prev');
    const nextBtn = document.getElementById(uid + '_next');
    const dotsWrap = document.getElementById(uid + '_dots');
    if (!track) return;

    const cards = Array.from(track.querySelectorAll('.rw-rec-card'));
    if (cards.length === 0) return;

    function getStepWidth() {
      const card = cards[0];
      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.columnGap || style.gap || '20') || 20;
      return card.getBoundingClientRect().width + gap;
    }

    function updateDotsAndButtons() {
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      if (prevBtn) prevBtn.disabled = track.scrollLeft <= 6;
      if (nextBtn) nextBtn.disabled = track.scrollLeft >= maxScroll - 6;

      if (dotsWrap) {
        const dots = dotsWrap.querySelectorAll('.rw-rec-dot');
        if (dots.length > 0 && maxScroll > 0) {
          const ratio = track.scrollLeft / maxScroll;
          const activeIdx = Math.min(dots.length - 1, Math.round(ratio * (dots.length - 1)));
          dots.forEach(function(d, idx) {
            d.classList.toggle('active', idx === activeIdx);
          });
        }
      }
    }

    // Create pagination dots
    if (dotsWrap) {
      const dotCount = Math.min(cards.length, 4);
      let dotsHtml = '';
      for (let i = 0; i < dotCount; i++) {
        dotsHtml += '<button type="button" class="rw-rec-dot' + (i === 0 ? ' active' : '') + '" data-dot-idx="' + i + '" aria-label="Slide group ' + (i + 1) + '"></button>';
      }
      dotsWrap.innerHTML = dotsHtml;
      dotsWrap.querySelectorAll('.rw-rec-dot').forEach(function(dot) {
        dot.addEventListener('click', function() {
          const idx = Number(dot.getAttribute('data-dot-idx')) || 0;
          const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
          const target = dotCount > 1 ? (idx / (dotCount - 1)) * maxScroll : 0;
          track.scrollTo({ left: target, behavior: 'smooth' });
        });
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        track.scrollBy({ left: -getStepWidth(), behavior: 'smooth' });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        track.scrollBy({ left: getStepWidth(), behavior: 'smooth' });
      });
    }

    // Desktop drag-to-slide support
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;

    track.addEventListener('mousedown', function(e) {
      if (e.target.closest('a, button')) return;
      isDown = true;
      moved = false;
      startX = e.pageX;
      startScroll = track.scrollLeft;
      track.classList.add('is-dragging');
    });

    window.addEventListener('mousemove', function(e) {
      if (!isDown) return;
      const dx = e.pageX - startX;
      if (Math.abs(dx) > 4) moved = true;
      track.scrollLeft = startScroll - dx;
    });

    window.addEventListener('mouseup', function() {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('is-dragging');
      if (moved) {
        setTimeout(updateDotsAndButtons, 50);
      }
    });

    track.addEventListener('scroll', updateDotsAndButtons, { passive: true });
    window.addEventListener('resize', updateDotsAndButtons);
    setTimeout(updateDotsAndButtons, 100);
  }

  // ─── FULL SLEEPYCAT-STYLE PRODUCT DETAIL PAGE RENDERER ──────────────────

  function renderProductDetailPage(rootId) {
    const mount = document.getElementById(rootId || 'rwProductPageRoot');
    if (!mount) return;

    const params = new URLSearchParams(window.location.search);
    const requestedId = (params.get('id') || 'antarprakash').trim();
    const product = getEnrichedProduct(PRODUCTS[requestedId] ? requestedId : 'antarprakash');

    // Update page title & meta dynamically
    document.title = product.title + ' — RouteWithin Official';

    const state = {
      galleryIndex: 0,
      selections: product.optionGroups.map(function(g) { return g.selectedIndex || 0; })
    };

    function getActivePricingAndVariant() {
      const group0 = product.optionGroups[0];
      const opt0 = group0 && group0.options[state.selections[0]] ? group0.options[state.selections[0]] : null;
      const group1 = product.optionGroups[1];
      const opt1 = group1 && group1.options[state.selections[1]] ? group1.options[state.selections[1]] : null;

      const price = opt0 && typeof opt0.price === 'number' ? opt0.price : product.price;
      const compareAt = opt0 && typeof opt0.compareAtPrice === 'number' ? opt0.compareAtPrice : product.compareAtPrice;
      const durationTag = (opt0 && opt0.durationTag ? opt0.durationTag : product.category)
        + (opt1 ? ' · ' + opt1.label : '');
      const variantName = (opt0 ? opt0.label : '') + (opt1 ? ' • ' + opt1.label : '');

      return {
        price: price,
        compareAt: compareAt,
        priceDisplay: price === 0 ? '100% Free' : formatINR(price),
        discountBadge: calcDiscountPct(price, compareAt),
        durationTag: durationTag,
        variantName: variantName,
        subNote: opt0 && opt0.sub ? opt0.sub : ''
      };
    }

    const activeInfo = getActivePricingAndVariant();

    // Quick Product Switcher pills at top so visitor can jump across all RouteWithin products easily
    const switcherHtml = getAllProductIds().map(function(pid) {
      const p = PRODUCTS[pid];
      const isActive = pid === product.id;
      return '<a href="product.html?id=' + encodeURIComponent(pid) + '" class="rw-pdp-switch-pill' + (isActive ? ' active' : '') + '">'
        + escapeHtml(p.title)
        + '</a>';
    }).join('');

    // Tags strip
    const tagsHtml = (product.tags || []).map(function(t) {
      return '<span class="rw-pdp-tag-pill">' + escapeHtml(t) + '</span>';
    }).join('');

    // Gallery Thumbnails
    const thumbsHtml = product.gallery.map(function(img, idx) {
      return '<button type="button" class="rw-pdp-thumb' + (idx === 0 ? ' active' : '') + '" data-gallery-idx="' + idx + '" aria-label="View image ' + (idx + 1) + '">'
        + '<img src="' + escapeHtml(img.src) + '" alt="' + escapeHtml(img.alt) + '">'
        + '</button>';
    }).join('');

    // Highlights bar under gallery
    const highlightsHtml = (product.highlightsBar || []).map(function(h) {
      return '<div class="rw-pdp-highlight-box">'
        + '<span class="rw-pdp-highlight-icon">' + escapeHtml(h.icon) + '</span>'
        + '<div>'
        + '<div class="rw-pdp-highlight-lbl">' + escapeHtml(h.label) + '</div>'
        + '<div class="rw-pdp-highlight-val">' + escapeHtml(h.value) + '</div>'
        + '</div>'
        + '</div>';
    }).join('');

    // Option Groups ("Size / Cohort Track / Format" Pills)
    const optionGroupsHtml = product.optionGroups.map(function(group, gIdx) {
      const selectedIdx = state.selections[gIdx] || 0;
      const selectedOpt = group.options[selectedIdx];
      const pills = group.options.map(function(opt, oIdx) {
        return '<button type="button" class="rw-pdp-pill' + (oIdx === selectedIdx ? ' active' : '') + '" data-group-idx="' + gIdx + '" data-opt-idx="' + oIdx + '">'
          + '<span class="rw-pdp-pill-main">' + escapeHtml(opt.label) + '</span>'
          + (opt.sub ? '<span class="rw-pdp-pill-sub">' + escapeHtml(opt.sub) + '</span>' : '')
          + '</button>';
      }).join('');

      return '<div class="rw-pdp-option-group">'
        + '<div class="rw-pdp-option-header">'
        + '<span class="rw-pdp-option-label">' + escapeHtml(group.label) + ':</span>'
        + '<span class="rw-pdp-option-selected" id="rwPdpSelected_' + gIdx + '">' + escapeHtml(selectedOpt ? selectedOpt.label : '') + '</span>'
        + '</div>'
        + '<div class="rw-pdp-pill-list">' + pills + '</div>'
        + '</div>';
    }).join('');

    // Key Bullet Points
    const bulletsHtml = product.bullets.map(function(b) {
      return '<li><span class="rw-pdp-bullet-check">✓</span><span>' + escapeHtml(b) + '</span></li>';
    }).join('');

    // 4-Icon Trust Strip
    const trustHtml = DEFAULT_TRUST_STRIP.map(function(t) {
      return '<div class="rw-pdp-trust-item">'
        + '<div class="rw-pdp-trust-icon">' + escapeHtml(t.icon) + '</div>'
        + '<div class="rw-pdp-trust-title">' + escapeHtml(t.title) + '</div>'
        + '<div class="rw-pdp-trust-sub">' + escapeHtml(t.sub) + '</div>'
        + '</div>';
    }).join('');

    // Available Offers
    const offersHtml = DEFAULT_OFFERS.map(function(of) {
      return '<div class="rw-pdp-offer-card">'
        + '<span class="rw-pdp-offer-badge">' + escapeHtml(of.badge) + '</span>'
        + '<div class="rw-pdp-offer-title">' + escapeHtml(of.title) + '</div>'
        + '<p class="rw-pdp-offer-desc">' + escapeHtml(of.desc) + '</p>'
        + '</div>';
    }).join('');

    // Specs Section
    const specsHtml = product.specs.map(function(sp) {
      return '<div class="rw-pdp-spec-row">'
        + '<div class="rw-pdp-spec-key">' + escapeHtml(sp.label) + '</div>'
        + '<div class="rw-pdp-spec-val">' + escapeHtml(sp.value) + '</div>'
        + '</div>';
    }).join('');

    // Zigzag Feature Sections
    const zigzagHtml = (product.zigzagFeatures || []).map(function(zz, idx) {
      return '<div class="rw-pdp-zigzag-item' + (idx % 2 === 1 ? ' is-reversed' : '') + '">'
        + '<div class="rw-pdp-zigzag-media">'
        + '<img src="' + escapeHtml(zz.image) + '" alt="' + escapeHtml(zz.title) + '" loading="lazy">'
        + '</div>'
        + '<div class="rw-pdp-zigzag-copy">'
        + '<span class="rw-pdp-zigzag-eyebrow">' + escapeHtml(zz.eyebrow) + '</span>'
        + '<h3>' + escapeHtml(zz.title) + '</h3>'
        + '<p>' + escapeHtml(zz.desc) + '</p>'
        + '</div>'
        + '</div>';
    }).join('');

    // Accordions
    const accordionsHtml = product.accordions.map(function(acc, idx) {
      const isOpen = idx === 0;
      return '<div class="rw-pdp-acc-item' + (isOpen ? ' is-open' : '') + '">'
        + '<button type="button" class="rw-pdp-acc-btn" aria-expanded="' + (isOpen ? 'true' : 'false') + '">'
        + '<span>' + escapeHtml(acc.title) + '</span>'
        + '<span class="rw-pdp-acc-icon">' + (isOpen ? '−' : '+') + '</span>'
        + '</button>'
        + '<div class="rw-pdp-acc-panel"' + (isOpen ? '' : ' hidden') + '>'
        + '<div class="rw-pdp-acc-inner">' + acc.content + '</div>'
        + '</div>'
        + '</div>';
    }).join('');

    // Customer Reviews
    const reviewsHtml = product.reviews.map(function(rv) {
      return '<div class="rw-pdp-review-card">'
        + '<div class="rw-pdp-review-stars">' + '★'.repeat(rv.rating || 5) + '</div>'
        + '<p class="rw-pdp-review-text">“' + escapeHtml(rv.text) + '”</p>'
        + '<div class="rw-pdp-review-author">'
        + '<strong>' + escapeHtml(rv.name) + '</strong> · <span>' + escapeHtml(rv.location) + '</span>'
        + '<span class="rw-pdp-verified-pill">✓ Verified Participant</span>'
        + '</div>'
        + '</div>';
    }).join('');

    mount.innerHTML =
      // 1. Breadcrumb + Product Switcher Bar
      '<section class="rw-pdp-top-strip">'
      + '<div class="container">'
      + '<nav class="rw-pdp-breadcrumb" aria-label="Breadcrumb">'
      + '<a href="index.html">Home</a> <span>›</span> '
      + '<a href="' + (product.isPaid ? 'programs.html' : 'events.html') + '">' + (product.isPaid ? 'Programs' : 'Events & Guides') + '</a> <span>›</span> '
      + '<strong>' + escapeHtml(product.title) + '</strong>'
      + '</nav>'
      + '<div class="rw-pdp-switcher-bar" aria-label="Browse All Offerings">'
      + '<span class="rw-pdp-switcher-label">Explore All:</span>'
      + '<div class="rw-pdp-switcher-scroll">' + switcherHtml + '</div>'
      + '</div>'
      + '</div>'
      + '</section>'

      // 2. Main Split Hero (Sticky Left Gallery + Right Buy Box)
      + '<section class="rw-pdp-hero-section">'
      + '<div class="container">'
      + '<div class="rw-pdp-hero-grid">'

      // LEFT: Gallery Column
      + '<div class="rw-pdp-gallery-col">'
      + '<div class="rw-pdp-gallery-sticky">'
      + '<div class="rw-pdp-main-stage">'
      + '<span class="rw-pdp-stage-badge">' + escapeHtml(product.badge) + '</span>'
      + '<button type="button" class="rw-pdp-stage-arrow prev" id="rwPdpImgPrev" aria-label="Previous image">&#8249;</button>'
      + '<img src="' + escapeHtml(product.gallery[0].src) + '" alt="' + escapeHtml(product.gallery[0].alt) + '" id="rwPdpMainImg">'
      + '<button type="button" class="rw-pdp-stage-arrow next" id="rwPdpImgNext" aria-label="Next image">&#8250;</button>'
      + '<div class="rw-pdp-stage-caption" id="rwPdpImgCaption">' + escapeHtml(product.gallery[0].caption) + '</div>'
      + '</div>'
      + '<div class="rw-pdp-thumbs" id="rwPdpThumbs">' + thumbsHtml + '</div>'
      + '<div class="rw-pdp-highlights-grid">' + highlightsHtml + '</div>'
      + '</div>'
      + '</div>'

      // RIGHT: Buy Box Column
      + '<div class="rw-pdp-buybox">'
      + '<div class="rw-pdp-tags-row">' + tagsHtml + '</div>'
      + '<h1 class="rw-pdp-title">' + escapeHtml(product.title) + '</h1>'
      + '<a href="#rwPdpReviews" class="rw-pdp-rating-row">'
      + '<span class="rw-pdp-stars">★★★★★</span>'
      + '<strong>' + escapeHtml(product.rating) + '</strong>'
      + '<span>(' + escapeHtml(product.reviewCount) + ' Verified Reviews)</span>'
      + '</a>'
      + '<p class="rw-pdp-hook">' + escapeHtml(product.shortHook) + '</p>'

      // Pricing Block
      + '<div class="rw-pdp-price-block">'
      + '<div class="rw-pdp-price-line">'
      + '<span class="rw-pdp-price-current" id="rwPdpPrice">' + escapeHtml(activeInfo.priceDisplay) + '</span>'
      + (activeInfo.compareAt > activeInfo.price ? '<span class="rw-pdp-price-mrp" id="rwPdpMrp">' + escapeHtml(formatINR(activeInfo.compareAt)) + '</span>' : '<span class="rw-pdp-price-mrp" id="rwPdpMrp" style="display:none;"></span>')
      + (activeInfo.discountBadge ? '<span class="rw-pdp-discount-badge" id="rwPdpDiscount">' + escapeHtml(activeInfo.discountBadge) + '</span>' : '<span class="rw-pdp-discount-badge" id="rwPdpDiscount" style="display:none;"></span>')
      + '</div>'
      + '<div class="rw-pdp-tax-note" id="rwPdpSubNote">' + (activeInfo.price > 0 ? 'Inclusive of all taxes · Estimated delivery in 7–8 days' : '100% Free Community Access · Estimated delivery in 7–8 days') + '</div>'
      + '</div>'

      // Interactive Option / "Size" / Tier Selectors
      + '<div class="rw-pdp-options-wrap">' + optionGroupsHtml + '</div>'

      // Key Bullet Points
      + '<div class="rw-pdp-bullets-box">'
      + '<h2 class="rw-pdp-section-mini-title">Key Highlights & What You Receive</h2>'
      + '<ul class="rw-pdp-bullets">' + bulletsHtml + '</ul>'
      + '</div>'

      // Delivery Timeline Strip
      + '<div class="rw-pdp-delivery-banner">'
      + '<span class="rw-pdp-delivery-icon" aria-hidden="true">🚚</span>'
      + '<div>'
      + '<strong>Estimated Delivery: 7–8 days</strong>'
      + '<span>Workbooks, guides &amp; materials delivered within 7–8 days.</span>'
      + '</div>'
      + '</div>'

      // Action Buttons
      + '<div class="rw-pdp-cta-row">'
      + '<button type="button" class="btn btn-hero-book btn-lg rw-pdp-enroll-btn" id="rwPdpEnrollBtn">'
      + (activeInfo.price > 0 ? 'Enroll Now — ' + escapeHtml(activeInfo.priceDisplay) + ' →' : 'Claim Free Seat Now →')
      + '</button>'
      + '<a href="contact.html" class="btn btn-secondary btn-lg rw-pdp-call-btn">Book a Clarity Call</a>'
      + '</div>'

      // 4-Icon Trust Strip
      + '<div class="rw-pdp-trust-strip">' + trustHtml + '</div>'

      // Available Offers Cards
      + '<div class="rw-pdp-offers-wrap">'
      + '<div class="rw-pdp-section-mini-title">Available Benefits & Offers</div>'
      + '<div class="rw-pdp-offers-grid">' + offersHtml + '</div>'
      + '</div>'

      + '</div>' // end buybox
      + '</div>' // end grid
      + '</div>' // end container
      + '</section>'

      // 3. Specifications Table (SleepyCat ICONLIST / Specs Style)
      + '<section class="rw-pdp-specs-section">'
      + '<div class="container">'
      + '<div class="rw-pdp-section-head">'
      + '<span class="rw-rec-kicker">AT A GLANCE</span>'
      + '<h2>Program Format & Specifications</h2>'
      + '</div>'
      + '<div class="rw-pdp-specs-card">' + specsHtml + '</div>'
      + '</div>'
      + '</section>'

      // 4. Zigzag "Why You'll Love It" Storytelling
      + '<section class="rw-pdp-zigzag-section">'
      + '<div class="container">'
      + '<div class="rw-pdp-section-head">'
      + '<span class="rw-rec-kicker">WHY YOU\'LL LOVE IT</span>'
      + '<h2>Designed for Real, Lasting Inner Transformation</h2>'
      + '</div>'
      + '<div class="rw-pdp-zigzag-list">' + zigzagHtml + '</div>'
      + '</div>'
      + '</section>'

      // 5. Detailed Description & FAQ Accordions
      + '<section class="rw-pdp-accordion-section">'
      + '<div class="container" style="max-width: 58rem;">'
      + '<div class="rw-pdp-section-head">'
      + '<span class="rw-rec-kicker">EVERYTHING YOU NEED TO KNOW</span>'
      + '<h2>Full Description, Curriculum & FAQs</h2>'
      + '</div>'
      + '<div class="rw-pdp-accordions" id="rwPdpAccordions">' + accordionsHtml + '</div>'
      + '</div>'
      + '</section>'

      // 6. Verified Customer Reviews
      + '<section class="rw-pdp-reviews-section" id="rwPdpReviews">'
      + '<div class="container">'
      + '<div class="rw-pdp-reviews-header">'
      + '<div>'
      + '<span class="rw-rec-kicker">CLIENT EXPERIENCES</span>'
      + '<h2>What Our Participants Say</h2>'
      + '</div>'
      + '<div class="rw-pdp-reviews-summary">'
      + '<span class="rw-pdp-reviews-big-score">' + escapeHtml(product.rating) + '</span>'
      + '<div><div class="rw-pdp-stars">★★★★★</div><div style="font-size:0.85rem;color:var(--text-secondary);">Based on ' + escapeHtml(product.reviewCount) + ' verified reviews</div></div>'
      + '</div>'
      + '</div>'
      + '<div class="rw-pdp-reviews-grid">' + reviewsHtml + '</div>'
      + '</div>'
      + '</section>'

      // 7. SLIDING RECOMMENDATIONS CAROUSEL ("Recommended For You")
      + '<section class="rw-rec-section" id="rwPdpRecommendations"></section>';

    // Wire gallery controls
    function setGalleryImage(idx) {
      const len = product.gallery.length;
      state.galleryIndex = ((idx % len) + len) % len;
      const g = product.gallery[state.galleryIndex];
      const mainImg = document.getElementById('rwPdpMainImg');
      const capEl = document.getElementById('rwPdpImgCaption');
      if (mainImg) {
        mainImg.src = g.src;
        mainImg.alt = g.alt;
      }
      if (capEl) capEl.textContent = g.caption;
      mount.querySelectorAll('.rw-pdp-thumb').forEach(function(btn, i) {
        btn.classList.toggle('active', i === state.galleryIndex);
      });
    }

    const prevImgBtn = document.getElementById('rwPdpImgPrev');
    const nextImgBtn = document.getElementById('rwPdpImgNext');
    if (prevImgBtn) prevImgBtn.addEventListener('click', function() { setGalleryImage(state.galleryIndex - 1); });
    if (nextImgBtn) nextImgBtn.addEventListener('click', function() { setGalleryImage(state.galleryIndex + 1); });
    mount.querySelectorAll('.rw-pdp-thumb').forEach(function(btn) {
      btn.addEventListener('click', function() {
        setGalleryImage(Number(btn.getAttribute('data-gallery-idx')) || 0);
      });
    });

    // Wire Variant / "Size" / Tier Pill Selection
    mount.querySelectorAll('.rw-pdp-pill').forEach(function(pill) {
      pill.addEventListener('click', function() {
        const gIdx = Number(pill.getAttribute('data-group-idx'));
        const oIdx = Number(pill.getAttribute('data-opt-idx'));
        state.selections[gIdx] = oIdx;

        // Update active state inside this option group
        const groupWrap = pill.closest('.rw-pdp-option-group');
        if (groupWrap) {
          groupWrap.querySelectorAll('.rw-pdp-pill').forEach(function(p) {
            p.classList.toggle('active', Number(p.getAttribute('data-opt-idx')) === oIdx);
          });
        }
        const selectedLabelEl = document.getElementById('rwPdpSelected_' + gIdx);
        const optData = product.optionGroups[gIdx] && product.optionGroups[gIdx].options[oIdx];
        if (selectedLabelEl && optData) {
          selectedLabelEl.textContent = optData.label;
        }

        // Refresh pricing & CTA button
        const info = getActivePricingAndVariant();
        const priceEl = document.getElementById('rwPdpPrice');
        const mrpEl = document.getElementById('rwPdpMrp');
        const discEl = document.getElementById('rwPdpDiscount');
        const enrollBtn = document.getElementById('rwPdpEnrollBtn');

        if (priceEl) priceEl.textContent = info.priceDisplay;
        if (mrpEl) {
          if (info.compareAt > info.price) {
            mrpEl.textContent = formatINR(info.compareAt);
            mrpEl.style.display = 'inline';
          } else {
            mrpEl.style.display = 'none';
          }
        }
        if (discEl) {
          if (info.discountBadge) {
            discEl.textContent = info.discountBadge;
            discEl.style.display = 'inline-flex';
          } else {
            discEl.style.display = 'none';
          }
        }
        if (enrollBtn) {
          enrollBtn.textContent = info.price > 0
            ? 'Enroll Now — ' + info.priceDisplay + ' →'
            : 'Claim Free Seat Now →';
        }
      });
    });

    // Wire Enroll CTA with exact selected variant override
    const enrollBtn = document.getElementById('rwPdpEnrollBtn');
    if (enrollBtn) {
      enrollBtn.addEventListener('click', function() {
        const info = getActivePricingAndVariant();
        if (typeof root.openRegistrationModal === 'function') {
          root.openRegistrationModal(product.id, {
            title: product.title + (info.variantName ? ' — ' + info.variantName : ''),
            duration: info.durationTag,
            priceDisplay: info.priceDisplay,
            amount: info.price,
            isPaid: info.price > 0,
            badge: product.badge,
            description: product.shortHook,
            redirectAfterRegister: product.redirectAfterRegister || 'thank-you.html'
          });
        }
      });
    }

    // Wire Accordions
    mount.querySelectorAll('.rw-pdp-acc-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const item = btn.closest('.rw-pdp-acc-item');
        const panel = item ? item.querySelector('.rw-pdp-acc-panel') : null;
        const icon = btn.querySelector('.rw-pdp-acc-icon');
        if (!item || !panel) return;
        const willOpen = !item.classList.contains('is-open');
        item.classList.toggle('is-open', willOpen);
        btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        panel.hidden = !willOpen;
        if (icon) icon.textContent = willOpen ? '−' : '+';
      });
    });

    // Render Sliding Recommendations Carousel
    renderRecommendationsSlider('rwPdpRecommendations', product.id);
  }

  // Wire quick-select variant pills inside program overview cards on programs.html
  function wireProgramCardVariants(rootEl) {
    const scope = rootEl || document;
    scope.querySelectorAll('.rw-prog-variant-pill').forEach(function(pill) {
      pill.addEventListener('click', function() {
        const card = pill.closest('.rw-ecom-card');
        if (!card) return;
        const price = Number(pill.getAttribute('data-price')) || 0;
        const mrp = Number(pill.getAttribute('data-mrp')) || 0;
        const label = pill.getAttribute('data-label') || '';
        const duration = pill.getAttribute('data-duration') || '';
        const progId = card.getAttribute('data-prog-id');

        card.querySelectorAll('.rw-prog-variant-pill').forEach(function(p) {
          p.classList.toggle('active', p === pill);
        });

        const priceEl = card.querySelector('.rw-ecom-price');
        const mrpEl = card.querySelector('.rw-ecom-mrp');
        const discEl = card.querySelector('.rw-ecom-discount');
        const enrollBtn = card.querySelector('.rw-ecom-enroll-btn');
        const baseTitle = card.getAttribute('data-prog-title') || '';

        const priceDisplay = price === 0 ? '100% Free' : formatINR(price);
        if (priceEl) priceEl.textContent = priceDisplay;
        if (mrpEl) {
          if (mrp > price) {
            mrpEl.textContent = formatINR(mrp);
            mrpEl.style.display = 'inline';
          } else {
            mrpEl.style.display = 'none';
          }
        }
        if (discEl) {
          const pct = calcDiscountPct(price, mrp);
          discEl.textContent = pct;
          discEl.style.display = pct ? 'inline-flex' : 'none';
        }
        if (enrollBtn) {
          enrollBtn.textContent = price > 0 ? 'Enroll — ' + priceDisplay + ' →' : 'Claim Free Seat →';
          enrollBtn.setAttribute('data-selected-variant', label);
          enrollBtn.setAttribute('data-selected-price', String(price));
          enrollBtn.setAttribute('data-selected-duration', duration);
          enrollBtn.onclick = function() {
            const prod = getEnrichedProduct(progId);
            if (typeof root.openRegistrationModal === 'function') {
              root.openRegistrationModal(progId, {
                title: baseTitle + (label ? ' — ' + label : ''),
                duration: duration || prod.category,
                priceDisplay: priceDisplay,
                amount: price,
                isPaid: price > 0,
                badge: prod.badge,
                description: prod.shortHook
              });
            }
          };
        }
      });
    });
  }

  function autoInitProductsUI() {
    if (document.getElementById('rwProductPageRoot')) {
      renderProductDetailPage('rwProductPageRoot');
    }

    const recEl = document.getElementById('rwRecommendationsSection');
    if (recEl) {
      const excludeId = recEl.getAttribute('data-exclude') || '';
      renderRecommendationsSlider('rwRecommendationsSection', excludeId);
    }

    wireProgramCardVariants(document);
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', autoInitProductsUI);
    } else {
      autoInitProductsUI();
    }
  }

  root.ROUTEWITHIN_PRODUCTS = PRODUCTS;
  root.ROUTEWITHIN_PRODUCTS_UI = {
    getProduct: getEnrichedProduct,
    renderProductDetailPage: renderProductDetailPage,
    renderRecommendationsSlider: renderRecommendationsSlider,
    wireProgramCardVariants: wireProgramCardVariants,
    formatINR: formatINR,
    calcDiscountPct: calcDiscountPct
  };

})(typeof window !== 'undefined' ? window : globalThis);
