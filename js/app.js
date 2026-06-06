// ── STATE ──────────────────────────────────────────────
let lang = 'bg';
let allInstitutions = [];
let activeFilter = 'all';
let map = null;
let markers = [];

// JSONBin config — public bin for demo
const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/665f1e1c1cd6cb3491cf81f1';
const JSONBIN_KEY = '$2a$10$placeholder'; // read-only public, write needs key

// ── I18N HELPERS ───────────────────────────────────────
const t = (el) => {
  const key = `data-${lang}`;
  return el.getAttribute(key) || el.textContent;
};

function applyLang() {
  document.querySelectorAll('[data-bg]').forEach(el => {
    el.textContent = t(el);
  });
  document.getElementById('langBtn').textContent = lang === 'bg' ? 'EN' : 'БГ';
  renderCards(activeFilter);
  updateFormSelect();
}

document.getElementById('langBtn').addEventListener('click', () => {
  lang = lang === 'bg' ? 'en' : 'bg';
  applyLang();
});

// ── CATEGORY META ──────────────────────────────────────
const CAT = {
  municipality: { color: '#2563EB', bg: 'Община',  en: 'Municipality' },
  police:       { color: '#1D4ED8', bg: 'МВР',     en: 'Police' },
  social:       { color: '#7C3AED', bg: 'НОИ',     en: 'Social' },
  tax:          { color: '#D97706', bg: 'НАП',     en: 'Tax' },
  health:       { color: '#DC2626', bg: 'Здраве',  en: 'Health' },
  employment:   { color: '#059669', bg: 'Труд',    en: 'Employment' },
  registry:     { color: '#0891B2', bg: 'Регистри',en: 'Registry' },
};

const ICONS = {
  address: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  phone:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.15 2.82 2 2 0 012.11 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.27 8.91a16 16 0 006.72 6.72l1.06-1.06a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>`,
  clock:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  web:     `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`,
  mail:    `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
};

// ── LOAD DATA ──────────────────────────────────────────
async function loadData() {
  const resp = await fetch('data/institutions.json');
  allInstitutions = await resp.json();
  renderCards('all');
  initMap();
  updateFormSelect();
}

// ── RENDER CARDS ───────────────────────────────────────
function renderCards(cat) {
  activeFilter = cat;
  const grid = document.getElementById('institutionsGrid');
  const data = cat === 'all' ? allInstitutions : allInstitutions.filter(i => i.category === cat);

  grid.innerHTML = data.map((inst, idx) => {
    const name    = lang === 'bg' ? inst.name_bg    : inst.name_en;
    const address = lang === 'bg' ? inst.address_bg : inst.address_en;
    const hours   = lang === 'bg' ? inst.hours_bg   : inst.hours_en;
    const services= lang === 'bg' ? inst.services_bg: inst.services_en;
    const catMeta = CAT[inst.category] || {};
    const badge   = lang === 'bg' ? catMeta.bg : catMeta.en;

    return `
      <div class="inst-card cat-${inst.category}" style="animation-delay:${idx * 0.05}s">
        <div class="card-top">
          <div class="card-name">${name}</div>
          <div class="card-badge">${badge}</div>
        </div>
        <div class="card-info">
          <div class="card-row">${ICONS.address}<span>${address}</span></div>
          <div class="card-row">${ICONS.phone}<span>${inst.phone}</span></div>
          <div class="card-row">${ICONS.clock}<span>${hours}</span></div>
        </div>
        <div class="card-services">
          ${services.map(s => `<span class="service-tag">${s}</span>`).join('')}
        </div>
        <div class="card-links">
          <a class="card-link" href="https://${inst.website.replace('https://','')}" target="_blank" rel="noopener">
            ${ICONS.web} ${lang === 'bg' ? 'Сайт' : 'Website'}
          </a>
          <a class="card-link" href="mailto:${inst.email}">
            ${ICONS.mail} ${inst.email}
          </a>
        </div>
      </div>`;
  }).join('');
}

// ── FILTER BUTTONS ─────────────────────────────────────
document.getElementById('filterBar').addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCards(btn.dataset.cat);
});

// ── MAP ────────────────────────────────────────────────
function initMap() {
  map = L.map('map-container').setView([42.497, 27.468], 14);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO',
    maxZoom: 19
  }).addTo(map);

  const legend = document.getElementById('mapLegend');
  legend.innerHTML = '';

  allInstitutions.forEach(inst => {
    const catMeta = CAT[inst.category] || { color: '#D4450C' };
    const color   = catMeta.color;

    // Custom icon
    const icon = L.divIcon({
      className: '',
      html: `<div style="
        width:14px;height:14px;
        background:${color};
        border:2.5px solid #fff;
        border-radius:50%;
        box-shadow:0 2px 8px rgba(0,0,0,0.4);
      "></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });

    const name = lang === 'bg' ? inst.name_bg : inst.name_en;
    const m = L.marker([inst.lat, inst.lng], { icon })
      .addTo(map)
      .bindPopup(`<strong style="font-family:sans-serif;font-size:13px">${inst.name_bg}</strong><br><small>${inst.address_bg}</small><br><small>${inst.phone}</small>`);

    markers.push({ marker: m, inst });

    // Legend item
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `<span class="legend-dot" style="background:${color}"></span><span>${inst.name_bg}</span>`;
    item.addEventListener('click', () => {
      map.setView([inst.lat, inst.lng], 16);
      m.openPopup();
    });
    legend.appendChild(item);
  });
}

// ── FORM ───────────────────────────────────────────────
function updateFormSelect() {
  const sel = document.getElementById('f-institution');
  sel.innerHTML = allInstitutions.map(i =>
    `<option value="${i.id}">${lang === 'bg' ? i.name_bg : i.name_en}</option>`
  ).join('');
}

document.getElementById('submitBtn').addEventListener('click', async () => {
  const name    = document.getElementById('f-name').value.trim();
  const email   = document.getElementById('f-email').value.trim();
  const instId  = document.getElementById('f-institution').value;
  const subject = document.getElementById('f-subject').value.trim();
  const desc    = document.getElementById('f-description').value.trim();
  const status  = document.getElementById('formStatus');
  const btn     = document.getElementById('submitBtn');

  if (!name || !email || !subject || !desc) {
    status.className = 'form-status error';
    status.textContent = lang === 'bg'
      ? '⚠ Моля попълнете всички полета.'
      : '⚠ Please fill in all fields.';
    return;
  }

  const institution = allInstitutions.find(i => i.id === parseInt(instId));
  const payload = {
    timestamp: new Date().toISOString(),
    name, email, subject, description: desc,
    institution_id: instId,
    institution_name: institution?.name_bg || '',
  };

  btn.disabled = true;
  btn.querySelector('span').textContent = lang === 'bg' ? 'Изпраща...' : 'Sending...';

  try {
    // Store complaint in localStorage (works offline, no API key needed)
    const existing = JSON.parse(localStorage.getItem('burgas_complaints') || '[]');
    existing.push(payload);
    localStorage.setItem('burgas_complaints', JSON.stringify(existing));

    // Try JSONBin (will work if you add your own API key above)
    // await fetch(JSONBIN_URL, { method:'PUT', headers:{'Content-Type':'application/json','X-Master-Key':JSONBIN_KEY}, body: JSON.stringify(existing) });

    status.className = 'form-status success';
    status.textContent = lang === 'bg'
      ? `✓ Обращението е записано! Общо обращения: ${existing.length}`
      : `✓ Request saved! Total complaints: ${existing.length}`;

    // Reset
    ['f-name','f-email','f-subject','f-description'].forEach(id => {
      document.getElementById(id).value = '';
    });

  } catch (err) {
    status.className = 'form-status error';
    status.textContent = lang === 'bg' ? '✗ Грешка при изпращане.' : '✗ Error submitting.';
  }

  btn.disabled = false;
  btn.querySelector('span').textContent = lang === 'bg' ? 'Изпрати' : 'Send';
});

// ── INIT ───────────────────────────────────────────────
loadData();
