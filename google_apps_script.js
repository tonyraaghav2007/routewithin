/**
 * ══════════════════════════════════════════════════════════════
 *  RouteWithin — Google Sheets Backend & Auto-Email System
 * ══════════════════════════════════════════════════════════════
 *  Author: Antigravity AI for RouteWithin
 *  Version: 2.1
 *  Features:
 *    • Real-time logging of free session registrations
 *    • Real-time logging of paid plan registrations
 *    • Prominent Consumer Name tracking in Free & Paid tabs
 *    • Pure aggregate stats in Course Sales & Total Sales (no individual names)
 *    • Automated per-course analytics calculation
 *    • Automated total revenue & conversion metrics
 *    • Daily email digest to all team editors
 *    • Clean phone number formatting to prevent formula errors
 *    • CORS-safe for browser fetch calls
 * ══════════════════════════════════════════════════════════════
 */

// ─── CONFIGURATION ──────────────────────────────────────────
const CONFIG = {
  // All team member emails receiving daily digest reports
  DIGEST_EMAIL: 'shiveshgarg1407@gmail.com,sushantsinghofficialreal@gmail.com,grovixstudios.official@gmail.com,yuviikkansal@gmail.com',

  // Email subject line
  DIGEST_SUBJECT: 'RouteWithin — Daily Registration & Sales Digest',

  // ID of the target Google Spreadsheet
  SPREADSHEET_ID: '1Gm0-t4T5uRYxXbwxrQ8fmjKjOnTg-wloe8AEYgIVT1Y',

  // Tab names
  TAB_FREE: 'Free Sessions',
  TAB_PAID: 'Paid Plans',
  TAB_COURSE_SALES: 'Course Sales',
  TAB_TOTAL_SALES: 'Total Sales',
};

function getSpreadsheet() {
  if (CONFIG.SPREADSHEET_ID) {
    try {
      return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    } catch (e) {
      console.warn('Could not open by ID, using active spreadsheet:', e.message);
    }
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

// ─── SHEET HEADERS ──────────────────────────────────────────
const HEADERS = {
  // Consumer Name placed prominently in Column C
  FREE: [
    'Registration ID',
    'Date & Time',
    'Consumer Name',
    'Email Address',
    'WhatsApp / Phone',
    'Session / Event Name',
    'City / Location',
    'Life Challenge / Focus',
    'Source Page',
    'Status'
  ],
  // Consumer Name placed prominently in Column C
  PAID: [
    'Registration ID',
    'Date & Time',
    'Consumer Name',
    'Email Address',
    'WhatsApp / Phone',
    'Course / Package Name',
    'Amount Paid (₹)',
    'Payment Status',
    'Payment Method',
    'City / Location',
    'Life Challenge / Focus',
    'Source Page',
    'Status'
  ],
  // Aggregated analytics ONLY (No individual consumer names)
  COURSE_SALES: [
    'Course Name',
    'Type (Free/Paid)',
    'Price (₹)',
    'Total Registrations',
    'Total Revenue (₹)',
    'Last Registration Date',
    'Status'
  ],
  // Overall system metrics ONLY (No individual consumer names)
  TOTAL_SALES: [
    'Metric',
    'Value',
    'Last Updated'
  ]
};

// ─── ENTRY POINTS ───────────────────────────────────────────

/**
 * Handles GET requests (used for health checks / testing).
 */
function doGet(e) {
  const output = {
    status: 'ok',
    message: 'RouteWithin Backend is active.',
    timestamp: new Date().toISOString()
  };
  return ContentService
    .createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handles POST requests from the website forms.
 */
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const action = body.action || 'register_free';
    const data = body.data || {};

    // Ensure all tabs exist
    ensureAllTabs();

    let result;

    switch (action) {
      case 'register_free':
        result = logFreeRegistration(data);
        break;
      case 'register_paid':
        result = logPaidRegistration(data);
        break;
      case 'contact':
        result = logFreeRegistration({
          ...data,
          course: data.course || 'Contact Form Inquiry',
          type: 'Contact'
        });
        break;
      default:
        result = { success: false, error: 'Unknown action: ' + action };
    }

    // Update aggregate tabs
    updateCourseSales();
    updateTotalSales();

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    const errorResult = { success: false, error: err.message };
    return ContentService
      .createTextOutput(JSON.stringify(errorResult))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ─── REGISTRATION LOGGING ───────────────────────────────────

function sanitizePhone(phone) {
  if (!phone) return '';
  const s = String(phone);
  return s.startsWith('+') ? "'" + s : s;
}

function logFreeRegistration(data) {
  const ss = getSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.TAB_FREE);

  const regId = generateRegId('FREE');
  const timestamp = new Date().toISOString();

  // Column C is Consumer Name
  const row = [
    regId,
    timestamp,
    data.name || 'Anonymous User',
    data.email || '',
    sanitizePhone(data.phone),
    data.course || 'Free Session',
    data.city || '',
    data.challenge || '',
    data.sourcePage || 'webinar-register.html',
    'Registered'
  ];

  sheet.appendRow(row);

  return {
    success: true,
    registrationId: regId,
    type: 'free',
    consumerName: data.name || '',
    message: 'Free session registration logged successfully.'
  };
}

function logPaidRegistration(data) {
  const ss = getSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.TAB_PAID);

  const regId = generateRegId('PAID');
  const timestamp = new Date().toISOString();

  // Column C is Consumer Name
  const row = [
    regId,
    timestamp,
    data.name || 'Client',
    data.email || '',
    sanitizePhone(data.phone),
    data.course || 'Paid Course',
    data.amount || 0,
    data.paymentStatus || 'Pending',
    data.paymentMethod || 'N/A',
    data.city || '',
    data.challenge || '',
    data.sourcePage || 'programs.html',
    'Enrolled'
  ];

  sheet.appendRow(row);

  return {
    success: true,
    registrationId: regId,
    type: 'paid',
    consumerName: data.name || '',
    message: 'Paid plan registration logged successfully.'
  };
}

// ─── AGGREGATE TABS (NO CONSUMER NAMES) ──────────────────────

/**
 * Rebuilds the "Course Sales" tab with per-course metrics.
 * Note: Purely aggregate statistics — does not display individual consumer names.
 */
function updateCourseSales() {
  const ss = getSpreadsheet();
  const salesSheet = ss.getSheetByName(CONFIG.TAB_COURSE_SALES);

  // Gather data from both free and paid tabs
  const courseMap = {};

  // Free sessions (Course name is at index 5)
  const freeSheet = ss.getSheetByName(CONFIG.TAB_FREE);
  const freeData = freeSheet.getDataRange().getValues();
  for (let i = 1; i < freeData.length; i++) {
    const courseName = freeData[i][5] || 'Unknown Free Session';
    if (!courseMap[courseName]) {
      courseMap[courseName] = { type: 'Free', price: 0, count: 0, revenue: 0, lastDate: '' };
    }
    courseMap[courseName].count++;
    courseMap[courseName].lastDate = freeData[i][1] || courseMap[courseName].lastDate;
  }

  // Paid plans (Course name is at index 5, Amount is at index 6)
  const paidSheet = ss.getSheetByName(CONFIG.TAB_PAID);
  const paidData = paidSheet.getDataRange().getValues();
  for (let i = 1; i < paidData.length; i++) {
    const courseName = paidData[i][5] || 'Unknown Paid Course';
    const amount = parseFloat(paidData[i][6]) || 0;
    if (!courseMap[courseName]) {
      courseMap[courseName] = { type: 'Paid', price: amount, count: 0, revenue: 0, lastDate: '' };
    }
    courseMap[courseName].count++;
    courseMap[courseName].revenue += amount;
    if (amount > courseMap[courseName].price) courseMap[courseName].price = amount;
    courseMap[courseName].lastDate = paidData[i][1] || courseMap[courseName].lastDate;
  }

  // Clear and rewrite the course sales tab
  const lastRow = salesSheet.getLastRow();
  if (lastRow > 1) {
    salesSheet.getRange(2, 1, lastRow - 1, HEADERS.COURSE_SALES.length).clear();
  }

  const courseNames = Object.keys(courseMap).sort();
  courseNames.forEach(name => {
    const c = courseMap[name];
    salesSheet.appendRow([
      name,
      c.type,
      c.price,
      c.count,
      c.revenue,
      c.lastDate,
      'Active'
    ]);
  });
}

/**
 * Rebuilds the "Total Sales" tab with overall summary metrics.
 * Note: Purely aggregate statistics — does not display individual consumer names.
 */
function updateTotalSales() {
  const ss = getSpreadsheet();
  const totalSheet = ss.getSheetByName(CONFIG.TAB_TOTAL_SALES);

  const freeSheet = ss.getSheetByName(CONFIG.TAB_FREE);
  const paidSheet = ss.getSheetByName(CONFIG.TAB_PAID);

  const freeCount = Math.max(0, freeSheet.getLastRow() - 1);
  const paidCount = Math.max(0, paidSheet.getLastRow() - 1);
  const totalCount = freeCount + paidCount;

  // Calculate total revenue from paid tab (Amount is at index 6)
  let totalRevenue = 0;
  if (paidCount > 0) {
    const paidData = paidSheet.getDataRange().getValues();
    for (let i = 1; i < paidData.length; i++) {
      totalRevenue += parseFloat(paidData[i][6]) || 0;
    }
  }

  // Count unique courses
  const courseSheet = ss.getSheetByName(CONFIG.TAB_COURSE_SALES);
  const courseCount = Math.max(0, courseSheet.getLastRow() - 1);

  const now = new Date().toISOString();

  // Clear and rewrite
  const lastRow = totalSheet.getLastRow();
  if (lastRow > 1) {
    totalSheet.getRange(2, 1, lastRow - 1, HEADERS.TOTAL_SALES.length).clear();
  }

  const metrics = [
    ['Total Registrations (Free + Paid)', totalCount, now],
    ['Free Session Registrations', freeCount, now],
    ['Paid Plan Enrollments', paidCount, now],
    ['Total Unique Courses/Events', courseCount, now],
    ['Total Revenue (₹)', totalRevenue, now],
    ['Average Revenue per Paid User (₹)', paidCount > 0 ? Math.round(totalRevenue / paidCount) : 0, now],
    ['Conversion Rate (Paid / Total %)', totalCount > 0 ? ((paidCount / totalCount) * 100).toFixed(1) + '%' : '0%', now],
  ];

  metrics.forEach(m => totalSheet.appendRow(m));
}

// ─── TAB SETUP ──────────────────────────────────────────────

function ensureAllTabs() {
  const ss = getSpreadsheet();

  ensureTab(ss, CONFIG.TAB_FREE, HEADERS.FREE);
  ensureTab(ss, CONFIG.TAB_PAID, HEADERS.PAID);
  ensureTab(ss, CONFIG.TAB_COURSE_SALES, HEADERS.COURSE_SALES);
  ensureTab(ss, CONFIG.TAB_TOTAL_SALES, HEADERS.TOTAL_SALES);
}

function ensureTab(ss, tabName, headers) {
  let sheet = ss.getSheetByName(tabName);
  if (!sheet) {
    sheet = ss.insertSheet(tabName);
    sheet.appendRow(headers);

    // Style the header row with RouteWithin brand colors
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#8B6F47');
    headerRange.setFontColor('#FFFFFF');
    headerRange.setHorizontalAlignment('center');

    // Freeze header row
    sheet.setFrozenRows(1);

    // Auto-resize columns
    for (let i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }
  }
  return sheet;
}

// ─── DAILY EMAIL DIGEST ─────────────────────────────────────

function setupDailyDigest() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'sendDailyDigest') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger('sendDailyDigest')
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .create();

  Logger.log('✅ Daily digest trigger set for 9:00 AM.');
}

function sendDailyDigest() {
  const ss = getSpreadsheet();
  const ssUrl = ss.getUrl();

  const freeSheet = ss.getSheetByName(CONFIG.TAB_FREE);
  const paidSheet = ss.getSheetByName(CONFIG.TAB_PAID);

  const freeCount = Math.max(0, freeSheet.getLastRow() - 1);
  const paidCount = Math.max(0, paidSheet.getLastRow() - 1);
  const totalCount = freeCount + paidCount;

  // Calculate revenue (Amount at index 6)
  let totalRevenue = 0;
  if (paidCount > 0) {
    const paidData = paidSheet.getDataRange().getValues();
    for (let i = 1; i < paidData.length; i++) {
      totalRevenue += parseFloat(paidData[i][6]) || 0;
    }
  }

  // Get today's registrations
  const today = new Date();
  const todayStr = Utilities.formatDate(today, Session.getScriptTimeZone(), 'yyyy-MM-dd');

  let todayFree = 0, todayPaid = 0, todayRevenue = 0;

  if (freeCount > 0) {
    const freeData = freeSheet.getDataRange().getValues();
    for (let i = 1; i < freeData.length; i++) {
      const dateStr = String(freeData[i][1]).substring(0, 10);
      if (dateStr === todayStr) todayFree++;
    }
  }

  if (paidCount > 0) {
    const paidData = paidSheet.getDataRange().getValues();
    for (let i = 1; i < paidData.length; i++) {
      const dateStr = String(paidData[i][1]).substring(0, 10);
      if (dateStr === todayStr) {
        todayPaid++;
        todayRevenue += parseFloat(paidData[i][6]) || 0;
      }
    }
  }

  // Get recent registrations (Consumer name at index 2, Course at index 5)
  let recentHtml = '';
  const allRecent = [];

  if (freeCount > 0) {
    const freeData = freeSheet.getDataRange().getValues();
    for (let i = Math.max(1, freeData.length - 3); i < freeData.length; i++) {
      allRecent.push({ type: '🟢 Free', name: freeData[i][2], course: freeData[i][5], date: freeData[i][1] });
    }
  }
  if (paidCount > 0) {
    const paidData = paidSheet.getDataRange().getValues();
    for (let i = Math.max(1, paidData.length - 3); i < paidData.length; i++) {
      allRecent.push({ type: '🟡 Paid', name: paidData[i][2], course: paidData[i][5], date: paidData[i][1], amount: paidData[i][6] });
    }
  }

  allRecent.sort((a, b) => String(b.date).localeCompare(String(a.date)));
  const top5 = allRecent.slice(0, 5);

  if (top5.length > 0) {
    recentHtml = '<h3 style="color:#8B6F47;margin-top:24px;">Recent Registrations</h3><table style="width:100%;border-collapse:collapse;font-size:14px;">';
    recentHtml += '<tr style="background:#8B6F47;color:white;"><th style="padding:8px;text-align:left;">Type</th><th style="padding:8px;text-align:left;">Consumer Name</th><th style="padding:8px;text-align:left;">Course / Event</th></tr>';
    top5.forEach(r => {
      recentHtml += `<tr><td style="padding:8px;border-bottom:1px solid #eee;">${r.type}</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">${r.name || 'Anonymous'}</td><td style="padding:8px;border-bottom:1px solid #eee;">${r.course}</td></tr>`;
    });
    recentHtml += '</table>';
  }

  const emailBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #faf5ef; color: #333;">
      <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #8B6F47;">
        <h1 style="color: #8B6F47; margin: 0; font-size: 24px;">RouteWithin</h1>
        <p style="color: #666; margin: 5px 0 0 0;">Daily Registration & Sales Digest</p>
      </div>

      <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
        <h2 style="color: #2D4030; margin-top: 0; font-size: 18px;">Today's Summary (${todayStr})</h2>
        <div style="display: flex; gap: 15px; margin: 15px 0;">
          <div style="flex: 1; background: #e8ded2; border-radius: 6px; padding: 12px; text-align: center;">
            <div style="font-size: 24px; font-weight: bold; color: #8B6F47;">${todayFree}</div>
            <div style="font-size: 12px; color: #666;">Free Registrations</div>
          </div>
          <div style="flex: 1; background: #e8ded2; border-radius: 6px; padding: 12px; text-align: center;">
            <div style="font-size: 24px; font-weight: bold; color: #8B6F47;">${todayPaid}</div>
            <div style="font-size: 12px; color: #666;">Paid Enrollments</div>
          </div>
          <div style="flex: 1; background: #e8ded2; border-radius: 6px; padding: 12px; text-align: center;">
            <div style="font-size: 24px; font-weight: bold; color: #2D4030;">₹${todayRevenue.toLocaleString()}</div>
            <div style="font-size: 12px; color: #666;">Today's Revenue</div>
          </div>
        </div>

        <h3 style="color: #8B6F47; margin-top: 25px; font-size: 16px;">All-Time Performance</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Total Registrations</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; text-align: right;">${totalCount}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Free Sessions</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; text-align: right;">${freeCount}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Paid Enrollments</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; text-align: right;">${paidCount}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Total Revenue</td>
            <td style="padding: 8px 0; font-weight: bold; color: #2D4030; font-size: 16px; text-align: right;">₹${totalRevenue.toLocaleString()}</td>
          </tr>
        </table>

        ${recentHtml}

        <div style="text-align: center; margin-top: 25px;">
          <a href="${ssUrl}" style="background: #8B6F47; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">Open Google Sheet</a>
        </div>
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: CONFIG.DIGEST_EMAIL,
    subject: CONFIG.DIGEST_SUBJECT + ' — ' + Utilities.formatDate(today, Session.getScriptTimeZone(), 'MMM d, yyyy'),
    htmlBody: emailBody
  });

  Logger.log('✅ Daily digest sent to ' + CONFIG.DIGEST_EMAIL);
}

// ─── UTILITIES & RESET ──────────────────────────────────────

function generateRegId(prefix) {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Reset / Reformat the spreadsheet tabs to apply the new column structure
 * (Puts Consumer Name as Column C, auto-formats column widths).
 */
function reformatAllTabs() {
  const ss = getSpreadsheet();

  // Reset Free tab header
  const freeSheet = ss.getSheetByName(CONFIG.TAB_FREE);
  if (freeSheet) {
    freeSheet.clear();
    freeSheet.appendRow(HEADERS.FREE);
    styleHeader(freeSheet, HEADERS.FREE.length);
  }

  // Reset Paid tab header
  const paidSheet = ss.getSheetByName(CONFIG.TAB_PAID);
  if (paidSheet) {
    paidSheet.clear();
    paidSheet.appendRow(HEADERS.PAID);
    styleHeader(paidSheet, HEADERS.PAID.length);
  }

  // Course Sales
  const courseSheet = ss.getSheetByName(CONFIG.TAB_COURSE_SALES);
  if (courseSheet) {
    courseSheet.clear();
    courseSheet.appendRow(HEADERS.COURSE_SALES);
    styleHeader(courseSheet, HEADERS.COURSE_SALES.length);
  }

  // Total Sales
  const totalSheet = ss.getSheetByName(CONFIG.TAB_TOTAL_SALES);
  if (totalSheet) {
    totalSheet.clear();
    totalSheet.appendRow(HEADERS.TOTAL_SALES);
    styleHeader(totalSheet, HEADERS.TOTAL_SALES.length);
  }

  Logger.log('✅ Tabs reformatted with Consumer Name in Column C.');
}

function styleHeader(sheet, numCols) {
  const range = sheet.getRange(1, 1, 1, numCols);
  range.setFontWeight('bold');
  range.setBackground('#8B6F47');
  range.setFontColor('#FFFFFF');
  range.setHorizontalAlignment('center');
  sheet.setFrozenRows(1);
  for (let i = 1; i <= numCols; i++) {
    sheet.autoResizeColumn(i);
  }
}

function testRegistration() {
  reformatAllTabs();

  logFreeRegistration({
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    challenge: 'Karwa Chauth',
    course: 'Beyond the Vrat: A Karwa Chauth Masterclass',
    sourcePage: 'webinar-register.html'
  });

  logPaidRegistration({
    name: 'Pooja Verma',
    email: 'pooja.verma@example.com',
    phone: '+91 98111 22334',
    city: 'Delhi',
    challenge: 'Executive 1:1 Life Alignment',
    course: 'Signature 1:1 Relationship Alignment',
    amount: 15000,
    paymentStatus: 'Completed',
    paymentMethod: 'UPI',
    sourcePage: 'programs.html'
  });

  updateCourseSales();
  updateTotalSales();

  Logger.log('✅ Test records created with Consumer Names clearly listed.');
}

function initializeSheet() {
  ensureAllTabs();
  updateCourseSales();
  updateTotalSales();
  Logger.log('✅ Sheet initialized.');
}
