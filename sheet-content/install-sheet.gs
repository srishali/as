/**
 * =================================================================
 *  Bengaluru Auto Expo — SITE DATA SHEET INSTALLER
 * =================================================================
 *  Creates all 15 CONTENT tabs with exact headers, default data,
 *  checkboxes, freeze panes, and table styling.
 *
 *  This sheet provides DYNAMIC SITE CONTENT only (Highlights,
 *  Sectors, Sponsors, FAQs, etc.). It does NOT handle form
 *  submissions — those use separate standalone scripts in
 *  sheet-content/apps-script/.
 *
 *  NO DEPLOYMENT NEEDED — just run installSheet() once.
 *
 *  HOW TO USE:
 *  ----------
 *  1. Open the Google Sheet → Extensions ▸ Apps Script.
 *  2. Paste this entire code.
 *  3. Run ▸ installSheet.
 *  4. Share the sheet: File ▸ Share ▸ "Anyone with the link → Viewer".
 *  5. Copy the Sheet ID from the URL and paste into
 *     src/config/link-config.ts → SHEETS.spreadsheetId
 * =================================================================
 */

/* ---------- Theme ------------------------------------------------ */
const THEME = {
  headerBg: '#270585',
  headerFg: '#ffffff',
  altRow: '#f2f1fb',
  font: 'Inter, Arial, sans-serif',
  headerFont: 'Sora, Arial, sans-serif',
};

function ensureSheet(ss, name) {
  let sheet = ss.getSheetByName(name);
  if (sheet) { sheet.clear(); return { sheet }; }
  sheet = ss.insertSheet(name);
  return { sheet };
}

function styleTab(sheet, headers, rows, opts) {
  opts = opts || {};
  const lastCol = headers.length;
  const lastRow = Math.max(rows.length + 1, 1);
  const dataRange = sheet.getRange(1, 1, lastRow, lastCol);

  const headerRange = sheet.getRange(1, 1, 1, lastCol);
  headerRange
    .setValues([headers])
    .setFontFamily(THEME.headerFont)
    .setFontWeight('bold')
    .setFontColor(THEME.headerFg)
    .setBackground(THEME.headerBg)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 34);

  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, lastCol)
      .setValues(rows)
      .setFontFamily(THEME.font)
      .setVerticalAlignment('top')
      .setWrap(true);
    for (var i = 0; i < rows.length; i++) {
      if (i % 2 === 1) sheet.getRange(i + 2, 1, 1, lastCol).setBackground(THEME.altRow);
    }
  }

  sheet.setFrozenRows(1);
  if (headers.includes('Status') && headers.includes('Order')) sheet.setFrozenColumns(2);

  dataRange.setBorder(true, true, true, true, true, true, '#e2e8f0', SpreadsheetApp.BorderStyle.SOLID);

  for (var c = 1; c <= lastCol; c++) {
    sheet.autoResizeColumn(c);
    if (sheet.getColumnWidth(c) < 110) sheet.setColumnWidth(c, 110);
    var h = headers[c - 1];
    if (/Description|Answer|Quote|Features|Perks|Address|Blurb/i.test(h)) sheet.setColumnWidth(c, 400);
    else if (/Name|Title|Email|Company|Category/i.test(h)) sheet.setColumnWidth(c, 240);
  }

  if (opts.checkboxCol != null) {
    var rule = SpreadsheetApp.newDataValidation().requireCheckbox().build();
    sheet.getRange(2, opts.checkboxCol + 1, Math.max(rows.length, 1), 1).setDataValidation(rule);
  }
  if (opts.orderCol != null) {
    sheet.getRange(2, opts.orderCol + 1, Math.max(rows.length, 1), 1).setHorizontalAlignment('center');
  }

  try {
    headerRange.protect().setDescription('Header row').setWarningOnly(true);
  } catch (e) {}
}

function seedTab(ss, name, headers, rows, opts) {
  var s = ensureSheet(ss, name);
  styleTab(s.sheet, headers, rows, opts);
}

/* =================================================================
 *  CONTENT TAB DEFINITIONS (15 tabs)
 * ================================================================= */

var TABS = {
  HIGHLIGHTS: {
    name: 'Highlights',
    headers: ['Status', 'Order', 'Icon', 'Custom Icon URL', 'Title', 'Description'],
    opts: { checkboxCol: 0, orderCol: 1 },
    rows: [
      [true,  1, 'Store',        '', '500+ Exhibitors',           'OEMs, component makers, EV pioneers and allied industries across 80,000+ sq.m. of premium showcase space.'],
      [true,  2, 'Rocket',       '', '50+ Global Launches',       'Witness world & India premieres, concept unveilings and next-gen model debuts on a grand stage.'],
      [true,  3, 'Zap',          '', 'EV & Future Mobility Zone', 'Electric, hybrid, hydrogen and autonomous vehicles charting the road to a sustainable tomorrow.'],
      [true,  4, 'Crown',        '', 'Classic & Vintage Pavilion','A curated hall of restored legends and rare classics celebrating a century of motoring heritage.'],
      [true,  5, 'Flame',        '', 'Live Stunt & Drift Arena',  'Heart-pounding precision driving, drift battles and stunt shows by champion international drivers.'],
      [true,  6, 'Presentation', '', 'Global Mobility Summit',    '150+ speakers across 20 sessions decoding policy, technology and the future of transportation.'],
      [true,  7, 'Car',          '', 'Test Drive Track',          'Get behind the wheel. Experience the latest cars and EVs on a purpose-built handling circuit.'],
      [true,  8, 'Users',        '', 'B2B Networking Lounge',     'Pre-screened buyer-seller meetings with 10,000+ delegates and curated deal rooms.'],
      [true,  9, 'Lightbulb',    '', 'Startup & Innovation Hub',  '50+ mobility startups showcase breakthrough tech to investors and industry leaders.'],
      [true, 10, 'Briefcase',    '', 'Career & Talent Fair',      'Connect top engineering and EV talent with leading employers across the automotive value chain.'],
    ],
  },
  SECTORS: {
    name: 'Sectors',
    headers: ['Status', 'Order', 'Icon', 'Custom Icon URL', 'Title', 'Description'],
    opts: { checkboxCol: 0, orderCol: 1 },
    rows: [
      [true,  1, 'Car',             '', 'Passenger & Commercial Vehicles', 'OEMs, CV makers and body builders showcasing new models and platforms.'],
      [true,  2, 'BatteryCharging', '', 'Electric & Hybrid Vehicles',      'EV manufacturers, battery cell makers and drivetrain innovators.'],
      [true,  3, 'Bike',            '', 'Two-Wheelers & Micro-Mobility',   'Motorcycles, scooters, e-rickshaws and last-mile mobility solutions.'],
      [true,  4, 'Cpu',             '', 'Auto Components & Electronics',   'Tier-1-3 suppliers, ECUs, sensors and connected-car technology.'],
      [true,  5, 'Settings2',       '', 'Tyres, Batteries & Consumables',  'Tyre brands, energy storage, lubricants and aftermarket parts.'],
      [true,  6, 'PlugZap',         '', 'Charging & Energy Infrastructure','Charging networks, swappable stations and grid technology.'],
      [true,  7, 'Truck',           '', 'Logistics & Supply Chain',        'Freight, warehousing, EV fleet operators and 3PL providers.'],
      [true,  8, 'ShieldCheck',     '', 'Finance, Leasing & Insurance',    'Auto finance, fleet leasing, insurance and warranty providers.'],
      [true,  9, 'Wrench',          '', 'Service, Repair & Aftermarket',   'Workshop equipment, diagnostics, accessories and detailing.'],
      [true, 10, 'FlaskConical',    '', 'R&D, Design & Engineering',       'Design houses, testing labs, simulation and prototyping firms.'],
      [true, 11, 'Banknote',        '', 'Investors & Venture Capital',     'Funds and accelerators backing the next mobility unicorns.'],
      [true, 12, 'Globe2',          '', 'Government & Trade Bodies',       'Policy makers, embassies, consulates and industry associations.'],
    ],
  },
  INDUSTRY_STATS: { name: 'Industry Stats', headers: ['Status', 'Order', 'Value', 'Label', 'Subtext'], opts: { checkboxCol: 0, orderCol: 1 }, rows: [
    [true, 1, '#3', 'Largest Auto Market', 'in the world by volume'], [true, 2, '$300B+', 'Industry Value', 'projected by 2026'],
    [true, 3, '37M+', 'Jobs Supported', 'direct & indirect'], [true, 4, '7.1%', 'Share of GDP', 'and rising fast'],
    [true, 5, '100%', 'FDI Permitted', 'under automatic route'], [true, 6, '#1', 'Two-Wheelers Globally', 'largest producer'],
  ]},
  FACTS: { name: 'Facts', headers: ['Status', 'Order', 'Icon', 'Custom Icon URL', 'Title', 'Description'], opts: { checkboxCol: 0, orderCol: 1 }, rows: [
    [true, 1, 'Factory', '', 'Manufacturing Powerhouse', 'India is the 4th largest vehicle manufacturer with one of the deepest auto-component ecosystems.'],
    [true, 2, 'Gauge', '', 'EV Revolution', 'India is the 3rd largest automobile market and among the fastest-growing EV ecosystems globally.'],
    [true, 3, 'Cog', '', 'Self-Reliant Supply Chain', 'From steel to semiconductors, the allied industry fuels a complete, scalable manufacturing value chain.'],
  ]},
  SPONSORS: { name: 'Sponsors', headers: ['Status', 'Order', 'Category', 'Category Icon', 'Category Color', 'Name', 'Full Name', 'Role', 'Logo URL', 'Custom Icon URL', 'Website'], opts: { checkboxCol: 0, orderCol: 1 }, rows: [
    [true, 1, 'Title Sponsor', 'Crown', 'bg-brand-700', 'Velocity Motors', 'Velocity Motors Pvt. Ltd.', 'Title Sponsor', '', '', ''],
    [true, 2, 'Platinum Partner', 'Gem', 'bg-accent-700', 'NovaDrive', 'NovaDrive Automotive', 'Platinum Partner', '', '', ''],
    [true, 3, 'Gold Partner', 'Award', 'bg-gold-500', 'Aether EV', 'Aether Electric Vehicles Ltd.', 'Mobility Partner', '', '', ''],
  ]},
  EXHIBITORS: { name: 'Exhibitors', headers: ['Status', 'Order', 'Category', 'Category Icon', 'Category Blurb', 'Category Color', 'Company Name', 'Full Name', 'Booth Number', 'Logo URL', 'Custom Icon URL'], opts: { checkboxCol: 0, orderCol: 1 }, rows: [
    [true, 1, 'Passenger Vehicles', 'Car', 'Leading OEMs and new-model launches.', 'bg-brand-700', 'Velocity Motors', 'Velocity Motors Pvt. Ltd.', 'H-01', '', ''],
    [true, 2, 'Electric Vehicles', 'BatteryCharging', 'EV manufacturers and charging innovators.', 'bg-accent-700', 'Aether EV', 'Aether Electric Vehicles Ltd.', 'E-01', '', ''],
  ]},
  CLIENTS: { name: 'Clients', headers: ['Status', 'Order', 'Category', 'Name', 'Full Name', 'Logo URL', 'Custom Icon URL', 'Website'], opts: { checkboxCol: 0, orderCol: 1 }, rows: [
    [true, 1, 'OEM', 'Velocity Motors', 'Velocity Motors Pvt. Ltd.', '', '', ''],
    [true, 2, 'EV Brand', 'Aether EV', 'Aether Electric Vehicles Ltd.', '', '', ''],
  ]},
  TESTIMONIALS: { name: 'Testimonials', headers: ['Status', 'Order', 'Quote', 'Name', 'Role', 'Initials', 'Photo URL'], opts: { checkboxCol: 0, orderCol: 1 }, rows: [
    [true, 1, 'The scale and professionalism were outstanding. We closed supply deals worth more than the whole year\'s pipeline in four days.', 'Rajiv Menon', 'Managing Director, Helix Components', 'RM', ''],
    [true, 2, 'By far the most credible mobility platform in South Asia.', 'Ananya Iyer', 'Founder & CEO, Aether EV', 'AI', ''],
    [true, 3, 'From global launches to the vintage pavilion, there is simply nothing like it.', 'Daniel Brooks', 'Editor-in-Chief, GlobalAuto Review', 'DB', ''],
  ]},
  TIMELINE: { name: 'Timeline', headers: ['Status', 'Order', 'Day', 'Title', 'Description'], opts: { checkboxCol: 0, orderCol: 1 }, rows: [
    [true, 1, 'Day 1 · Thu 8 Oct', 'Grand Opening & Premieres', 'Inaugural ceremony, red-carpet model unveilings and the CEO keynote.'],
    [true, 2, 'Day 2 · Fri 9 Oct', 'Business & B2B Day', 'Dedicated trade hours, buyer-seller meet and policy roundtables.'],
    [true, 3, 'Day 3 · Sat 10 Oct', 'Tech, EV & Innovation', 'EV zone spotlight, startup pitches, test drives.'],
    [true, 4, 'Day 4 · Sun 11 Oct', 'Public Festival & Stunts', 'Drift arena finals, classic car parade, awards night.'],
  ]},
  BOOTH_PLANS: { name: 'Booth Plans', headers: ['Status', 'Order', 'Name', 'Price', 'Unit', 'Tagline', 'Features', 'Featured'], opts: { checkboxCol: 0, orderCol: 1 }, rows: [
    [true, 1, 'Shell Scheme', '₹14,500', '/ sq.m.', 'Turnkey booth for first-time exhibitors', 'Walls, fascia & carpet | 2 spotlights + 1 counter | Standard power | Directory listing | 2 badges', false],
    [true, 2, 'Premium Space', '₹11,200', '/ sq.m.', 'Bare space for custom-built pavilions', 'Min 54 sq.m. | Prime locations | Upgraded power | Priority listing | Liaison manager | 10 badges', true],
    [true, 3, 'Pavilion Partner', 'Custom', '', 'Title or co-presenting sponsor packages', 'Country pavilion | Mainstage branding | Lounge access | Full media campaign | Unlimited badges', false],
  ]},
  WHY_EXHIBIT: { name: 'Why Exhibit', headers: ['Status', 'Order', 'Icon', 'Custom Icon URL', 'Title', 'Description'], opts: { checkboxCol: 0, orderCol: 1 }, rows: [
    [true, 1, 'Users', '', '150,000+ Footfall', 'Reach a massive, high-intent audience of buyers, dealers and enthusiasts.'],
    [true, 2, 'Target', '', 'Qualified Leads', 'Our matchmaking platform pre-screens B2B meetings so you close faster.'],
    [true, 3, 'Rocket', '', 'Mainstage Launches', 'Unveil new models and products to 500+ media and millions of followers.'],
    [true, 4, 'Megaphone', '', 'Premium Visibility', 'Brand exposure across signage, the event app, digital campaigns and PR.'],
    [true, 5, 'Handshake', '', 'Smart Networking', 'Access exclusive lounges, awards nights and curated deal rooms.'],
    [true, 6, 'Globe2', '', 'Global Reach', 'Connect with buyers and partners from 35+ countries in one place.'],
  ]},
  OPPORTUNITY_POINTS: { name: 'Opportunity Points', headers: ['Status', 'Order', 'Title', 'Description'], opts: { checkboxCol: 0, orderCol: 1 }, rows: [
    [true, 1, 'Reach 150,000+ Buyers', 'Engage decision-makers from across India and 35+ countries.'],
    [true, 2, 'Launch on a Global Stage', 'Unveil products to 500+ journalists and millions of followers.'],
    [true, 3, 'Generate Qualified Leads', 'Pre-screened B2B meetings, less chasing, more closing.'],
  ]},
  SPONSORSHIP_PLANS: { name: 'Sponsorship Plans', headers: ['Status', 'Order', 'Name', 'Accent Gradient', 'Featured', 'Perks'], opts: { checkboxCol: 0, orderCol: 1 }, rows: [
    [true, 1, 'Title Sponsor', 'from-accent-700 to-accent-600', true, 'Naming rights & mainstage branding | Keynote slot | Largest pavilion | Full media campaign'],
    [true, 2, 'Platinum Partner', 'from-brand-700 to-brand-600', false, 'Co-presenting branding | Award-night sponsorship | Premium lounge | Large pavilion'],
  ]},
  PARTNERS: { name: 'Partners', headers: ['Status', 'Order', 'Category', 'Category Icon', 'Category Blurb', 'Category Color', 'Short Name', 'Full Name', 'Role', 'Logo URL'], opts: { checkboxCol: 0, orderCol: 1 }, rows: [
    [true, 1, 'Government Partners', 'Landmark', 'Backed by ministries driving India\'s mobility policy.', 'bg-brand-700', 'MHI', 'Ministry of Heavy Industries, Govt. of India', 'Principal Government Partner', ''],
    [true, 2, 'Industry Associations', 'Handshake', 'Leading trade bodies of the auto industry.', 'bg-accent-700', 'SIAM', 'Society of Indian Automobile Manufacturers', 'Strategic Partner', ''],
  ]},
  FAQS: { name: 'FAQs', headers: ['Status', 'Order', 'Question', 'Answer'], opts: { checkboxCol: 0, orderCol: 1 }, rows: [
    [true, 1, 'When and where is the expo held?', 'Bengaluru Auto Expo 2026 runs 8–11 October 2026 at BIEC, Bengaluru. Doors open 10:00 AM – 7:00 PM daily.'],
    [true, 2, 'How do I register as an exhibitor?', 'Submit the exhibitor enquiry form on the Exhibitors or Contact page.'],
    [true, 3, 'Is there an entry fee for visitors?', 'Visitor passes are available online at early-bird rate. Children under 8 enter free.'],
  ]},
};

/* =================================================================
 *  MAIN ENTRY POINT
 * ================================================================= */
function installSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  var defaultSheet = ss.getSheets()[0];

  var TAB_ORDER = [
    TABS.HIGHLIGHTS, TABS.SECTORS, TABS.INDUSTRY_STATS, TABS.FACTS,
    TABS.SPONSORS, TABS.EXHIBITORS, TABS.CLIENTS,
    TABS.TESTIMONIALS, TABS.TIMELINE,
    TABS.BOOTH_PLANS, TABS.WHY_EXHIBIT, TABS.OPPORTUNITY_POINTS,
    TABS.SPONSORSHIP_PLANS, TABS.PARTNERS, TABS.FAQS,
  ];

  TAB_ORDER.forEach(function(t) { seedTab(ss, t.name, t.headers, t.rows, t.opts); });

  try {
    if (defaultSheet && ss.getSheets().length > 1) {
      if (defaultSheet.getLastRow() === 0 && defaultSheet.getLastColumn() === 0) {
        ss.deleteSheet(defaultSheet);
      }
    }
  } catch (e) {}

  var first = ss.getSheetByName(TABS.HIGHLIGHTS.name);
  if (first) ss.setActiveSheet(first);

  if (/^Untitled|^Copy of/i.test(ss.getName())) {
    ss.renameSpreadsheet('Bengaluru Auto Expo — Site Data');
  }

  ui.alert(
    'Site Data Sheet — Ready ✅',
    'All 15 content tabs are ready.\n\n' +
    'Next steps:\n' +
    '1. Share: File ▸ Share ▸ "Anyone with the link → Viewer"\n' +
    '2. Copy the Sheet ID from the URL\n' +
    '3. Paste into src/config/link-config.ts → SHEETS.spreadsheetId\n' +
    '4. Set SHEETS.enabled = true\n\n' +
    'NO deployment needed — this sheet is read-only by the website.\n' +
    'Form submissions use separate scripts in sheet-content/apps-script/',
    ui.ButtonSet.OK
  );
}

function uninstallSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.values(TABS).forEach(function(t) {
    var sh = ss.getSheetByName(t.name);
    if (sh) ss.deleteSheet(sh);
  });
  SpreadsheetApp.getUi().alert('All content tabs removed.');
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🚗  Site Data CMS')
    .addItem('Install / Refresh all content tabs', 'installSheet')
    .addItem('Uninstall all content tabs', 'uninstallSheet')
    .addToUi();
}
