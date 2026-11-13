/**
 * ═════════════════════════════════════════════════════════════════════════
 *  RouteWithin — "Routewithin assessment" Google Sheets Full Automation
 * ═════════════════════════════════════════════════════════════════════════
 *  Version: 2.0 (Multi-Tab Analytics, Dynamic Formulas & Visual Charts)
 *  Author: Antigravity AI for RouteWithin
 * 
 *  AUTOMATICALLY CREATES & MANAGES 4 DEDICATED TABS:
 *  1. "Personal Information"    -> Name, Age, Gender, Address, WhatsApp, Contact No.
 *  2. "Questionnaire Responses" -> All in-depth questionnaire responses (Challenges, Goals, Hurdles, Rating)
 *  3. "Analytics & Summary"     -> Dynamic formulas calculating:
 *                                  • "x out of y chose this" (e.g. 4 out of 10 chose this)
 *                                  • "% of how much % chose what" (e.g. 40.0%)
 *  4. "Visual Charts"           -> Embedded interactive charts for each question:
 *                                  • 1-10 Commitment Level Column Chart
 *                                  • Gender Breakdown 3D Pie Chart
 *                                  • Age Demographics Bar Chart
 * 
 *  HOW TO RUN:
 *  1. In Apps Script, select "setupAssessmentSheet" from the function dropdown at top.
 *  2. Click "▷ Run". (Authorizes permissions on first run).
 *  3. Open your Google Sheet — it will be renamed "Routewithin assessment"
 *     and all 4 tabs, formulas, and charts will appear immediately!
 * ═════════════════════════════════════════════════════════════════════════
 */

const CONFIG = {
  // Spreadsheet Name
  SHEET_NAME: 'Routewithin assessment',

  // Tab Names
  TAB_PERSONAL: 'Personal Information',
  TAB_RESPONSES: 'Questionnaire Responses',
  TAB_ANALYTICS: 'Analytics & Summary',
  TAB_CHARTS: 'Visual Charts',

  // Brand Colors
  COLOR_PRIMARY: '#8B6F47',    // RouteWithin Warm Taupe/Gold
  COLOR_ACCENT: '#D4A373',     // Warm Terracotta
  COLOR_DARK: '#2B2118',       // Deep Espresso
  COLOR_LIGHT: '#FBF8F4',      // Soft Parchment

  // Email Notification Recipients
  NOTIFICATION_EMAIL: 'ddimples736@gmail.com,shiveshgarg1407@gmail.com'
};

// ─── HEADERS DEFINITIONS ──────────────────────────────────────────────

const HEADERS_PERSONAL = [
  'Submission ID',
  'Date & Time',
  'Full Name',
  'Age',
  'Gender',
  'Address (City, State, Country)',
  'WhatsApp No.',
  'Contact No.',
  'Source Page'
];

const HEADERS_RESPONSES = [
  'Submission ID',
  'Full Name',
  'Q1. Top 3 Challenges in Life at Present',
  'Q2. Top 3 Goals to Achieve in Life',
  'Q3. Hurdles Facing in Achieving Goals',
  'Q4. Commitment Level (1-10)',
  'Gender',
  'Age'
];

// ─── HELPER: GET SPREADSHEET ──────────────────────────────────────────

function getSpreadsheet() {
  let ss;
  try {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  } catch (e) {
    console.warn('getActiveSpreadsheet failed:', e.message);
  }
  return ss;
}

// ─── MASTER SETUP: BUILDS ALL 4 TABS, FORMULAS & CHARTS ───────────────

function setupAssessmentSheet() {
  const ss = getSpreadsheet();
  if (!ss) {
    throw new Error('No active spreadsheet found. Open Extensions -> Apps Script from your Google Sheet.');
  }

  // 1. Rename Spreadsheet to "Routewithin assessment"
  try {
    ss.rename(CONFIG.SHEET_NAME);
  } catch (e) {
    console.log('Rename note:', e.message);
  }

  // 2. Setup Tab 1: Personal Information
  const personalSheet = getOrCreateSheet(ss, CONFIG.TAB_PERSONAL);
  setupPersonalTab(personalSheet);

  // 3. Setup Tab 2: Questionnaire Responses
  const responsesSheet = getOrCreateSheet(ss, CONFIG.TAB_RESPONSES);
  setupResponsesTab(responsesSheet);

  // 4. Setup Tab 3: Analytics & Summary (Formulas: x out of y & %)
  const analyticsSheet = getOrCreateSheet(ss, CONFIG.TAB_ANALYTICS);
  setupAnalyticsTab(analyticsSheet);

  // 5. Setup Tab 4: Visual Charts (Graphs)
  const chartsSheet = getOrCreateSheet(ss, CONFIG.TAB_CHARTS);
  setupChartsTab(chartsSheet, analyticsSheet);

  // 6. Remove default "Sheet1" if it exists and is empty
  const sheet1 = ss.getSheetByName('Sheet1');
  if (sheet1 && ss.getSheets().length > 1) {
    try {
      if (sheet1.getLastRow() <= 1 && sheet1.getLastColumn() <= 1) {
        ss.deleteSheet(sheet1);
      }
    } catch (e) {
      console.warn('Could not delete Sheet1:', e.message);
    }
  }

  // Set Personal Information as active
  ss.setActiveSheet(personalSheet);

  return {
    success: true,
    message: 'Spreadsheet "Routewithin assessment" configured with 4 tabs, formulas, and charts.',
    url: ss.getUrl()
  };
}

// ─── TAB 1: PERSONAL INFORMATION SETUP ────────────────────────────────

function setupPersonalTab(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS_PERSONAL);
  } else {
    sheet.getRange(1, 1, 1, HEADERS_PERSONAL.length).setValues([HEADERS_PERSONAL]);
  }

  // Format Header
  const headerRange = sheet.getRange(1, 1, 1, HEADERS_PERSONAL.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground(CONFIG.COLOR_PRIMARY);
  headerRange.setFontColor('#FFFFFF');
  headerRange.setHorizontalAlignment('center');
  headerRange.setVerticalAlignment('middle');
  sheet.setRowHeight(1, 38);
  sheet.setFrozenRows(1);

  // Column Widths
  const widths = [140, 160, 180, 80, 100, 240, 150, 150, 140];
  widths.forEach((w, i) => sheet.setColumnWidth(i + 1, w));
}

// ─── TAB 2: QUESTIONNAIRE RESPONSES SETUP ─────────────────────────────

function setupResponsesTab(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS_RESPONSES);
  } else {
    sheet.getRange(1, 1, 1, HEADERS_RESPONSES.length).setValues([HEADERS_RESPONSES]);
  }

  // Format Header
  const headerRange = sheet.getRange(1, 1, 1, HEADERS_RESPONSES.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground(CONFIG.COLOR_PRIMARY);
  headerRange.setFontColor('#FFFFFF');
  headerRange.setHorizontalAlignment('center');
  headerRange.setVerticalAlignment('middle');
  sheet.setRowHeight(1, 38);
  sheet.setFrozenRows(1);

  // Column Widths
  const widths = [140, 180, 320, 320, 320, 180, 100, 80];
  widths.forEach((w, i) => sheet.setColumnWidth(i + 1, w));

  // Wrap text for responses
  sheet.getRange('C:E').setWrap(true);
}

// ─── TAB 3: ANALYTICS & SUMMARY SETUP ─────────────────────────────────

function setupAnalyticsTab(sheet) {
  sheet.clear();

  // Title Banner
  sheet.getRange('A1:E1').merge();
  sheet.getRange('A1')
    .setValue('ROUTEWITHIN — LIFE & RELATIONSHIP ASSESSMENT ANALYTICS')
    .setFontWeight('bold')
    .setFontSize(14)
    .setBackground(CONFIG.COLOR_DARK)
    .setFontColor('#F5EDE3')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 40);

  // ──────────────────────────────────────────────────────────
  // SECTION 1: QUESTION 10 (COMMITMENT LEVEL 1 TO 10)
  // ──────────────────────────────────────────────────────────
  sheet.getRange('A3:E3').merge();
  sheet.getRange('A3')
    .setValue('📊 Question: "How committed are you to transform your life?" (1 to 10 Scale)')
    .setFontWeight('bold')
    .setFontSize(11)
    .setBackground('#E8DFC8')
    .setFontColor(CONFIG.COLOR_DARK);
  sheet.setRowHeight(3, 28);

  const q10Headers = [
    'Commitment Rating / Option',
    'Responses (Count)',
    'Total Submissions',
    'x out of y Chose This',
    '% of Responders Who Chose'
  ];
  sheet.getRange('A4:E4').setValues([q10Headers])
    .setFontWeight('bold')
    .setBackground(CONFIG.COLOR_PRIMARY)
    .setFontColor('#FFFFFF')
    .setHorizontalAlignment('center');
  sheet.setRowHeight(4, 30);

  // Ratings 10 down to 1
  const ratings = [
    ['Rating 10 (Highest Commitment)', 10],
    ['Rating 9', 9],
    ['Rating 8', 8],
    ['Rating 7', 7],
    ['Rating 6', 6],
    ['Rating 5 (Moderate Commitment)', 5],
    ['Rating 4', 4],
    ['Rating 3', 3],
    ['Rating 2', 2],
    ['Rating 1 (Lowest Commitment)', 1]
  ];

  ratings.forEach((r, idx) => {
    const row = 5 + idx;
    const ratingVal = r[1];
    const label = r[0];

    sheet.getRange(`A${row}`).setValue(label).setFontWeight('500');
    // Count of responders who chose this rating
    sheet.getRange(`B${row}`).setFormula(`=COUNTIF('${CONFIG.TAB_RESPONSES}'!F$2:F, ${ratingVal})`);
    // Total responders
    sheet.getRange(`C${row}`).setFormula(`=COUNTA('${CONFIG.TAB_RESPONSES}'!F$2:F)`);
    // "x out of y chose this" text format
    sheet.getRange(`D${row}`).setFormula(`=IF(C${row}>0, B${row} & " out of " & C${row} & " chose this", "0 out of 0 chose this")`);
    // "% of how much % chose what" percentage format
    sheet.getRange(`E${row}`).setFormula(`=IF(C${row}>0, B${row}/C${row}, 0)`);
    sheet.getRange(`E${row}`).setNumberFormat('0.0%');
  });

  // Total Summary Row for Q10
  const q10TotalRow = 15;
  sheet.getRange(`A${q10TotalRow}`).setValue('Total Responses').setFontWeight('bold');
  sheet.getRange(`B${q10TotalRow}`).setFormula(`=SUM(B5:B14)`).setFontWeight('bold');
  sheet.getRange(`C${q10TotalRow}`).setFormula(`=C5`).setFontWeight('bold');
  sheet.getRange(`D${q10TotalRow}`).setValue('100% Accounted').setFontWeight('bold');
  sheet.getRange(`E${q10TotalRow}`).setFormula(`=SUM(E5:E14)`).setFontWeight('bold').setNumberFormat('0.0%');
  sheet.getRange(`A${q10TotalRow}:E${q10TotalRow}`).setBackground('#F3ECE2');

  // ──────────────────────────────────────────────────────────
  // SECTION 2: GENDER BREAKDOWN
  // ──────────────────────────────────────────────────────────
  sheet.getRange('A17:E17').merge();
  sheet.getRange('A17')
    .setValue('👥 Demographics: Gender Breakdown')
    .setFontWeight('bold')
    .setFontSize(11)
    .setBackground('#E8DFC8')
    .setFontColor(CONFIG.COLOR_DARK);
  sheet.setRowHeight(17, 28);

  const genderHeaders = [
    'Gender Category',
    'Responses (Count)',
    'Total Submissions',
    'x out of y Chose This',
    '% of Responders Who Chose'
  ];
  sheet.getRange('A18:E18').setValues([genderHeaders])
    .setFontWeight('bold')
    .setBackground(CONFIG.COLOR_PRIMARY)
    .setFontColor('#FFFFFF')
    .setHorizontalAlignment('center');
  sheet.setRowHeight(18, 30);

  const genders = ['Female', 'Male', 'Other'];
  genders.forEach((g, idx) => {
    const row = 19 + idx;
    sheet.getRange(`A${row}`).setValue(g).setFontWeight('500');
    sheet.getRange(`B${row}`).setFormula(`=COUNTIF('${CONFIG.TAB_PERSONAL}'!E$2:E, "${g}")`);
    sheet.getRange(`C${row}`).setFormula(`=COUNTA('${CONFIG.TAB_PERSONAL}'!E$2:E)`);
    sheet.getRange(`D${row}`).setFormula(`=IF(C${row}>0, B${row} & " out of " & C${row} & " chose this", "0 out of 0 chose this")`);
    sheet.getRange(`E${row}`).setFormula(`=IF(C${row}>0, B${row}/C${row}, 0)`);
    sheet.getRange(`E${row}`).setNumberFormat('0.0%');
  });

  // ──────────────────────────────────────────────────────────
  // SECTION 3: AGE GROUP BREAKDOWN
  // ──────────────────────────────────────────────────────────
  sheet.getRange('A23:E23').merge();
  sheet.getRange('A23')
    .setValue('🎂 Demographics: Age Group Breakdown')
    .setFontWeight('bold')
    .setFontSize(11)
    .setBackground('#E8DFC8')
    .setFontColor(CONFIG.COLOR_DARK);
  sheet.setRowHeight(23, 28);

  const ageHeaders = [
    'Age Group',
    'Responses (Count)',
    'Total Submissions',
    'x out of y Chose This',
    '% of Responders Who Chose'
  ];
  sheet.getRange('A24:E24').setValues([ageHeaders])
    .setFontWeight('bold')
    .setBackground(CONFIG.COLOR_PRIMARY)
    .setFontColor('#FFFFFF')
    .setHorizontalAlignment('center');
  sheet.setRowHeight(24, 30);

  const ageGroups = [
    ['18 - 25 years (Young Adults)', '>=18', '<=25'],
    ['26 - 35 years (Prime Career & Relationships)', '>=26', '<=35'],
    ['36 - 45 years (Mid-Life Transformation)', '>=36', '<=45'],
    ['46 - 55 years (Mature Growth)', '>=46', '<=55'],
    ['56+ years (Wisdom & Reflection)', '>=56', '']
  ];

  ageGroups.forEach((a, idx) => {
    const row = 25 + idx;
    sheet.getRange(`A${row}`).setValue(a[0]).setFontWeight('500');
    if (a[2]) {
      sheet.getRange(`B${row}`).setFormula(`=COUNTIFS('${CONFIG.TAB_PERSONAL}'!D$2:D, "${a[1]}", '${CONFIG.TAB_PERSONAL}'!D$2:D, "${a[2]}")`);
    } else {
      sheet.getRange(`B${row}`).setFormula(`=COUNTIF('${CONFIG.TAB_PERSONAL}'!D$2:D, "${a[1]}")`);
    }
    sheet.getRange(`C${row}`).setFormula(`=COUNTA('${CONFIG.TAB_PERSONAL}'!D$2:D)`);
    sheet.getRange(`D${row}`).setFormula(`=IF(C${row}>0, B${row} & " out of " & C${row} & " chose this", "0 out of 0 chose this")`);
    sheet.getRange(`E${row}`).setFormula(`=IF(C${row}>0, B${row}/C${row}, 0)`);
    sheet.getRange(`E${row}`).setNumberFormat('0.0%');
  });

  // Auto-fit column widths
  sheet.setColumnWidth(1, 280); // Option name
  sheet.setColumnWidth(2, 140); // Count
  sheet.setColumnWidth(3, 140); // Total
  sheet.setColumnWidth(4, 210); // x out of y
  sheet.setColumnWidth(5, 180); // % of responders

  // Center align columns B through E
  sheet.getRange('B4:E32').setHorizontalAlignment('center');
}

// ─── TAB 4: VISUAL CHARTS (GRAPHS) SETUP ──────────────────────────────

function setupChartsTab(sheet, analyticsSheet) {
  // Clear any existing charts to prevent duplicates
  const existingCharts = sheet.getCharts();
  for (let i = 0; i < existingCharts.length; i++) {
    sheet.removeChart(existingCharts[i]);
  }
  sheet.clear();

  // Title Banner
  sheet.getRange('A1:N1').merge();
  sheet.getRange('A1')
    .setValue('ROUTEWITHIN — ASSESSMENT VISUAL DASHBOARD & GRAPHS')
    .setFontWeight('bold')
    .setFontSize(14)
    .setBackground(CONFIG.COLOR_DARK)
    .setFontColor('#F5EDE3')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 40);

  // 1. CHART 1: Commitment Level Distribution (Column Chart)
  // Data range: Analytics & Summary A4:B14 (Rating vs Count)
  const q10Range = analyticsSheet.getRange('A4:B14');
  const chart1 = sheet.newChart()
    .asColumnChart()
    .addRange(q10Range)
    .setPosition(3, 1, 10, 10)
    .setOption('title', 'Commitment Level Distribution (1 to 10 Scale)')
    .setOption('titleTextStyle', { color: '#2B2118', fontSize: 13, bold: true })
    .setOption('colors', [CONFIG.COLOR_PRIMARY])
    .setOption('legend', { position: 'none' })
    .setOption('hAxis', { title: 'Commitment Rating' })
    .setOption('vAxis', { title: 'Number of Seekers', minValue: 0 })
    .setOption('width', 580)
    .setOption('height', 360)
    .build();
  sheet.insertChart(chart1);

  // 2. CHART 2: Gender Demographics (3D Pie Chart)
  // Data range: Analytics & Summary A18:B21
  const genderRange = analyticsSheet.getRange('A18:B21');
  const chart2 = sheet.newChart()
    .asPieChart()
    .addRange(genderRange)
    .setPosition(3, 8, 10, 10)
    .setOption('title', 'Seeker Demographics: Gender Breakdown')
    .setOption('titleTextStyle', { color: '#2B2118', fontSize: 13, bold: true })
    .setOption('is3D', true)
    .setOption('colors', [CONFIG.COLOR_PRIMARY, CONFIG.COLOR_ACCENT, '#82C99B'])
    .setOption('width', 480)
    .setOption('height', 360)
    .build();
  sheet.insertChart(chart2);

  // 3. CHART 3: Age Group Distribution (Bar Chart)
  // Data range: Analytics & Summary A24:B29
  const ageRange = analyticsSheet.getRange('A24:B29');
  const chart3 = sheet.newChart()
    .asBarChart()
    .addRange(ageRange)
    .setPosition(22, 1, 10, 10)
    .setOption('title', 'Seeker Demographics: Age Group Breakdown')
    .setOption('titleTextStyle', { color: '#2B2118', fontSize: 13, bold: true })
    .setOption('colors', [CONFIG.COLOR_ACCENT])
    .setOption('legend', { position: 'none' })
    .setOption('hAxis', { title: 'Number of Seekers', minValue: 0 })
    .setOption('vAxis', { title: 'Age Group' })
    .setOption('width', 580)
    .setOption('height', 340)
    .build();
  sheet.insertChart(chart3);
}

// ─── HELPER: GET OR CREATE SHEET TAB ──────────────────────────────────

function getOrCreateSheet(ss, tabName) {
  let sheet = ss.getSheetByName(tabName);
  if (!sheet) {
    sheet = ss.insertSheet(tabName);
  }
  return sheet;
}

// ─── WEB APP ENTRY POINTS (doGet & doPost) ────────────────────────────

/**
 * Handles GET requests (Verification, Health check, or manual setup trigger).
 */
function doGet(e) {
  const ss = getSpreadsheet();
  const action = e && e.parameter ? e.parameter.action : '';

  // Allow triggering setup via URL: ?action=setup
  if (action === 'setup') {
    const res = setupAssessmentSheet();
    return ContentService.createTextOutput(JSON.stringify(res))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'RouteWithin Assessment Backend v2.0 is active.',
    sheetName: ss ? ss.getName() : null,
    sheetUrl: ss ? ss.getUrl() : null,
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handles POST requests from website (assessment.html).
 * Automatically logs data to BOTH:
 * 1. "Personal Information"
 * 2. "Questionnaire Responses"
 * The formulas in "Analytics & Summary" and charts in "Visual Charts" update automatically!
 */
function doPost(e) {
  try {
    const ss = getSpreadsheet();
    if (!ss) {
      throw new Error('Spreadsheet not found.');
    }

    // Ensure all 4 tabs exist
    let personalSheet = ss.getSheetByName(CONFIG.TAB_PERSONAL);
    let responsesSheet = ss.getSheetByName(CONFIG.TAB_RESPONSES);
    let analyticsSheet = ss.getSheetByName(CONFIG.TAB_ANALYTICS);
    let chartsSheet = ss.getSheetByName(CONFIG.TAB_CHARTS);

    if (!personalSheet || !responsesSheet || !analyticsSheet || !chartsSheet) {
      setupAssessmentSheet();
      personalSheet = ss.getSheetByName(CONFIG.TAB_PERSONAL);
      responsesSheet = ss.getSheetByName(CONFIG.TAB_RESPONSES);
    }

    // Parse incoming payload
    const contents = e.postData ? e.postData.contents : '{}';
    let payload;
    try {
      payload = JSON.parse(contents);
    } catch (err) {
      payload = e.parameter || {};
    }
    const data = payload.data || payload;

    const subId = data.id || ('ASST-' + Date.now().toString(36).toUpperCase());
    const timestamp = data.submittedAt ? new Date(data.submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    function sanitize(v) {
      if (!v) return '';
      const s = String(v).trim();
      return s.startsWith('+') ? "'" + s : s;
    }

    // Parse commitment rating as numeric (1-10) for clean formula matching
    const commitmentNum = parseInt(data.commitment, 10) || 10;
    const ageNum = parseInt(data.age, 10) || data.age || '';

    // 1. APPEND TO PERSONAL INFORMATION TAB
    const personalRow = [
      subId,
      timestamp,
      data.name || 'Anonymous',
      ageNum,
      data.gender || 'Female',
      data.city || '',
      sanitize(data.whatsapp),
      sanitize(data.contact),
      data.source || 'assessment.html'
    ];
    personalSheet.appendRow(personalRow);

    // 2. APPEND TO QUESTIONNAIRE RESPONSES TAB
    const responsesRow = [
      subId,
      data.name || 'Anonymous',
      data.challenges || '',
      data.goals || '',
      data.hurdles || '',
      commitmentNum,
      data.gender || 'Female',
      ageNum
    ];
    responsesSheet.appendRow(responsesRow);

    // 3. SEND EMAIL NOTIFICATION TO COACH & TEAM
    if (CONFIG.NOTIFICATION_EMAIL) {
      try {
        MailApp.sendEmail({
          to: CONFIG.NOTIFICATION_EMAIL,
          subject: '🌟 New RouteWithin Assessment: ' + (data.name || 'Seeker') + ' (Score: ' + commitmentNum + '/10)',
          htmlBody: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; color: #2B2118;">
              <h2 style="color: #8B6F47; border-bottom: 2px solid #8B6F47; padding-bottom: 8px;">
                New Life & Relationship Assessment Received
              </h2>
              <p><strong>Submission ID:</strong> ${subId}<br>
                 <strong>Date:</strong> ${timestamp}</p>
              
              <h3 style="color: #8B6F47; margin-top: 20px;">👤 Personal Details</h3>
              <p><strong>Name:</strong> ${data.name || 'N/A'}<br>
                 <strong>Age:</strong> ${data.age || 'N/A'} | <strong>Gender:</strong> ${data.gender || 'N/A'}<br>
                 <strong>Location:</strong> ${data.city || 'N/A'}<br>
                 <strong>WhatsApp:</strong> <a href="https://wa.me/${String(data.whatsapp||'').replace(/\D/g,'')}">${data.whatsapp || 'N/A'}</a><br>
                 <strong>Contact No:</strong> ${data.contact || 'N/A'}</p>

              <h3 style="color: #8B6F47; margin-top: 20px;">📝 Questionnaire Answers</h3>
              <p><strong>1. Top 3 Challenges in Life:</strong><br>${(data.challenges || 'N/A').replace(/\n/g, '<br>')}</p>
              <p><strong>2. Top 3 Goals to Achieve:</strong><br>${(data.goals || 'N/A').replace(/\n/g, '<br>')}</p>
              <p><strong>3. Hurdles Facing in Achieving Goals:</strong><br>${(data.hurdles || 'N/A').replace(/\n/g, '<br>')}</p>
              <p><strong>4. Transformation Commitment Rating:</strong> <span style="font-size: 1.2rem; color: #8B6F47; font-weight: bold;">${commitmentNum}/10</span></p>

              <p style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #ddd; font-size: 12px; color: #777;">
                Logged automatically into spreadsheet: <strong>${CONFIG.SHEET_NAME}</strong>
              </p>
            </div>
          `
        });
      } catch (mailErr) {
        console.warn('Email notification note:', mailErr.message);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      submissionId: subId,
      message: 'Assessment logged successfully to both Personal Information and Questionnaire tabs.'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
