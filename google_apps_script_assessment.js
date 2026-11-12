/**
 * ══════════════════════════════════════════════════════════════
 *  RouteWithin — Assessment Form Google Sheets Backend
 * ══════════════════════════════════════════════════════════════
 *  Author: Antigravity AI for RouteWithin
 *  Version: 1.0
 * 
 *  This script handles responses from the Assessment Form (assessment.html).
 *  It logs each submission into a dedicated Google Sheet with formatted columns,
 *  bold headers, and sanitized phone numbers.
 * 
 *  HOW TO SETUP:
 *  1. Open Google Sheets (https://sheets.new) to create a new spreadsheet.
 *     Name it: "RouteWithin — Life & Relationship Assessment Responses"
 *  2. Copy its Spreadsheet ID from the browser URL:
 *     https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID_HERE/edit
 *  3. In Google Sheets, click: Extensions -> Apps Script
 *  4. Paste this entire code into Code.gs
 *  5. Paste your SPREADSHEET_ID in the CONFIG object below.
 *  6. Click "Deploy" -> "New deployment" -> Type: "Web app"
 *     - Execute as: "Me"
 *     - Who has access: "Anyone"
 *  7. Click "Deploy" and authorize permissions.
 *  8. Copy the Web app URL and paste it in app.js as GOOGLE_ASSESSMENT_SCRIPT_URL (or GOOGLE_SCRIPT_URL).
 * ══════════════════════════════════════════════════════════════
 */

const ASSESSMENT_CONFIG = {
  // Paste your dedicated Assessment Spreadsheet ID here (leave empty to use the active spreadsheet):
  SPREADSHEET_ID: '',

  // Tab Name
  TAB_NAME: 'Assessment Responses',

  // Email notifications for new assessments (comma separated)
  NOTIFICATION_EMAIL: 'ddimples736@gmail.com,shiveshgarg1407@gmail.com'
};

const ASSESSMENT_HEADERS = [
  'Submission ID',
  'Date & Time',
  'Full Name',
  'Age (years)',
  'Gender',
  'City, State, Country',
  'Contact No.',
  'WhatsApp No.',
  'Top 3 Challenges in Life',
  'Top 3 Goals to Achieve',
  'Hurdles Facing in Achieving Goals',
  'Commitment Level (1-10)',
  'Source Page'
];

function getAssessmentSpreadsheet() {
  if (ASSESSMENT_CONFIG.SPREADSHEET_ID) {
    try {
      return SpreadsheetApp.openById(ASSESSMENT_CONFIG.SPREADSHEET_ID);
    } catch (e) {
      console.warn('Could not open spreadsheet by ID, using active spreadsheet:', e.message);
    }
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

function ensureAssessmentTab() {
  const ss = getAssessmentSpreadsheet();
  let sheet = ss.getSheetByName(ASSESSMENT_CONFIG.TAB_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(ASSESSMENT_CONFIG.TAB_NAME);
    // Format headers
    sheet.appendRow(ASSESSMENT_HEADERS);
    const headerRange = sheet.getRange(1, 1, 1, ASSESSMENT_HEADERS.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#8B6F47');
    headerRange.setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
    
    // Auto-fit column widths
    for (let c = 1; c <= ASSESSMENT_HEADERS.length; c++) {
      sheet.setColumnWidth(c, c >= 9 && c <= 11 ? 280 : 160);
    }
  }
  return sheet;
}

function doGet(e) {
  const ss = getAssessmentSpreadsheet();
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'RouteWithin Assessment Backend is active.',
    sheetUrl: ss ? ss.getUrl() : null,
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const contents = e.postData ? e.postData.contents : '{}';
    let payload;
    try {
      payload = JSON.parse(contents);
    } catch (err) {
      payload = e.parameter || {};
    }

    const data = payload.data || payload;
    const sheet = ensureAssessmentTab();

    const subId = data.id || ('ASST-' + Date.now().toString(36).toUpperCase());
    const timestamp = data.submittedAt || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    function sanitize(v) {
      if (!v) return '';
      const s = String(v);
      return s.startsWith('+') ? "'" + s : s;
    }

    const row = [
      subId,
      timestamp,
      data.name || 'Anonymous',
      data.age || '',
      data.gender || '',
      data.city || '',
      sanitize(data.contact),
      sanitize(data.whatsapp),
      data.challenges || '',
      data.goals || '',
      data.hurdles || '',
      data.commitment || '',
      data.source || 'assessment.html'
    ];

    sheet.appendRow(row);

    // Optional email notification
    if (ASSESSMENT_CONFIG.NOTIFICATION_EMAIL) {
      try {
        MailApp.sendEmail({
          to: ASSESSMENT_CONFIG.NOTIFICATION_EMAIL,
          subject: '✨ New RouteWithin Assessment Submission: ' + (data.name || 'Seeker'),
          htmlBody: `
            <h3>New Assessment Form Received</h3>
            <p><strong>Name:</strong> ${data.name || 'N/A'}</p>
            <p><strong>Age:</strong> ${data.age || 'N/A'} • <strong>Gender:</strong> ${data.gender || 'N/A'}</p>
            <p><strong>Location:</strong> ${data.city || 'N/A'}</p>
            <p><strong>WhatsApp:</strong> ${data.whatsapp || 'N/A'} | <strong>Contact:</strong> ${data.contact || 'N/A'}</p>
            <hr>
            <p><strong>Top 3 Challenges:</strong><br>${data.challenges || 'N/A'}</p>
            <p><strong>Top 3 Goals:</strong><br>${data.goals || 'N/A'}</p>
            <p><strong>Hurdles:</strong><br>${data.hurdles || 'N/A'}</p>
            <p><strong>Commitment (1-10):</strong> ${data.commitment || 'N/A'}/10</p>
          `
        });
      } catch (mailErr) {
        console.warn('Could not send notification email:', mailErr.message);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      submissionId: subId,
      message: 'Assessment logged successfully to Google Sheets.'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
