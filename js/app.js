// ===== NAVBAR — меняет фон при скролле =====
var navbar = document.querySelector('nav');

window.addEventListener('scroll', function() {
  if (window.scrollY > 30) {
    navbar.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
  } else {
    navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
  }
});

// ===== ПЛАВНАЯ ПРОКРУТКА по якорям =====
var navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    var targetId = this.getAttribute('href');
    var target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== КНОПКИ — теперь ведут на страницы =====
var helpButtons = document.querySelectorAll('.btn-help');
helpButtons.forEach(function(btn) {
  btn.addEventListener('click', function() {
    window.location.href = 'request.html';
  });
});

var seekButtons = document.querySelectorAll('.btn-seek');
seekButtons.forEach(function(btn) {
  btn.addEventListener('click', function() {
    window.location.href = 'request.html';
  });
});

var offerButtons = document.querySelectorAll('.btn-offer');
offerButtons.forEach(function(btn) {
  btn.addEventListener('click', function() {
    window.location.href = 'register.html';
  });
});

// ===== СЧЁТЧИК — анимирует число в герое =====
function animateCounter(element, target, duration) {
  var start = 0;
  var step = target / (duration / 16);

  var timer = setInterval(function() {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(start).toLocaleString() + '+';
  }, 16);
}

var counterEl = document.getElementById('counter');

if (counterEl) {
  var counterStarted = false;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !counterStarted) {
        counterStarted = true;
        animateCounter(counterEl, 1200, 1500);
      }
    });
  });

  observer.observe(counterEl);
}

// ===== КАРТОЧКИ — появляются при скролле =====
var cards = document.querySelectorAll('.card, .feature-card, .job-card, .testimonial-card');

var cardObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

cards.forEach(function(card) {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  cardObserver.observe(card);
});

// ===== КНОПКИ ВХОДА И РЕГИСТРАЦИИ — ведут на страницы =====
var loginBtn = document.getElementById('loginBtn');
var registerBtn = document.getElementById('registerBtn');

if (loginBtn) {
  loginBtn.addEventListener('click', function() {
    window.location.href = 'login.html';
  });
}

if (registerBtn) {
  registerBtn.addEventListener('click', function() {
    window.location.href = 'register.html';
  });
}

const INSTITUTIONS = [
  { id:1, category:"municipality", name:"Община Бургас – Център за административно обслужване", address:"ул. 'Александровска' 26", phone:"056 907 200", email:"obshtina@burgas.bg", website:"https://www.burgas.bg", hours:"Пон–Пет: 08:30–17:30", services:["Лична карта","Регистрация адрес","Строителни разрешения","Социални услуги"] },
  { id:2, category:"municipality", name:"Дирекция 'Местни данъци и такси'", address:"ул. 'Конт Андрованти' 1", phone:"056 907 222", email:"mdt@burgas.bg", website:"https://www.burgas.bg", hours:"Пон–Пет: 08:30–17:30", services:["Данък имоти","Такса смет","МПС данък"] },
  { id:3, category:"state", name:"Областна администрация – Бургас", address:"ул. 'Цар Петър' 1", phone:"056 842 044", email:"governor@bsregion.org", website:"https://www.bs.government.bg", hours:"Пон–Пет: 09:00–17:30", services:["Концесии","Областни стратегии","Административни услуги"] },
  { id:4, category:"police", name:"ОДМВР – Бургас", address:"ул. 'Христо Ботев' 46", phone:"056 871 111", email:"od_burgas@mvr.bg", website:"https://www.mvr.bg/burgas", hours:"Пон–Пет: 08:30–17:30", services:["Паспорти","Шофьорски книжки","Регистрация МПС"] },
  { id:5, category:"police", name:"КАТ – Сектор 'Пътна полиция'", address:"ул. 'Янко Комитов' 34", phone:"056 856 347", email:"trafficpoliceburgas@mvr.bg", website:"https://www.mvr.bg/burgas", hours:"Пон–Пет: 08:30–17:30", services:["Регистрация МПС","КАТ глоби","Шофьорски книжки"] },
  { id:6, category:"tax", name:"НАП – ТД Бургас", address:"пл. 'Жени Патева' 1", phone:"056 878 481", email:"td_burgas@nra.bg", website:"https://www.nra.bg", hours:"Пон–Пет: 09:00–17:30", services:["Данъчни декларации","ДДС регистрация","Удостоверения"] },
  { id:7, category:"social", name:"ДСП – Дирекция 'Социално подпомагане'", address:"ул. 'Цар Петър' 5Б", phone:"056 813 820", email:"dsp_burgas@mlsp.government.bg", website:"https://www.asp.government.bg", hours:"Пон–Пет: 08:30–17:00", services:["Социални помощи","Детски надбавки","Хора с увреждания"] },
  { id:8, category:"social", name:"НОИ – ТП Бургас", address:"бул. 'Ст. Стамболов' 126", phone:"056 803 720", email:"burgas@nssi.bg", website:"https://www.nssi.bg", hours:"Пон–Пет: 08:00–16:30", services:["Пенсии","Болничен лист","Майчинство"] },
  { id:9, category:"health", name:"РЗОК – Бургас", address:"ул. 'Христо Ботев' 66", phone:"056 871 501", email:"burgas@nhif.bg", website:"https://www.nhif.bg", hours:"Пон–Пет: 08:30–17:00", services:["Здравни осигуровки","Избор на лекар","Направления"] },
  { id:10, category:"employment", name:"Бюро по труда – Бургас", address:"ул. 'Сан Стефано' 105А", phone:"056 842 700", email:"burgas@az.government.bg", website:"https://www.az.government.bg", hours:"Пон–Пет: 09:00–17:30", services:["Регистрация безработни","Посредничество","Обучения"] },
  { id:11, category:"registry", name:"Агенция по вписванията – Бургас", address:"ул. 'Александровска' 101", phone:"056 820 810", email:"burgas@registryagency.bg", website:"https://www.registryagency.bg", hours:"Пон–Пет: 09:00–17:30", services:["Имотен регистър","Търговски регистър","БУЛСТАТ"] },
  { id:12, category:"justice", name:"Окръжен съд – Бургас", address:"ул. 'Александровска' 101", phone:"056 825 411", email:"judge@os-burgas.org", website:"http://www.os-burgas.org", hours:"Пон–Пет: 09:00–17:00", services:["Граждански дела","Наказателни дела","Съдебни удостоверения"] },
  { id:13, category:"justice", name:"Административен съд – Бургас", address:"ул. 'Александровска' 101", phone:"056 825 416", email:"admincourtbs@abv.bg", website:"https://burgas-adms.justice.bg", hours:"Пон–Пет: 09:00–17:00", services:["Обжалване актове","Административни спорове"] },
  { id:14, category:"environment", name:"РИОСВ – Бургас", address:"ул. 'Перущица' 67, к-с Лазур", phone:"056 813 205", email:"office@riosv-burgas.bg", website:"https://riosv-burgas.bg", hours:"Пон–Пет: 09:00–17:30", services:["ОВОС оценки","Разрешителни води","Сигнали замърсяване"] },
  { id:15, category:"agriculture", name:"ОД 'Земеделие' – Бургас", address:"ул. 'Цар Иван Шишман' 8", phone:"056 844 303", email:"zemedelie@odzburgas.com", website:"https://www.mzh.government.bg/odz-burgas", hours:"Пон–Пет: 09:00–17:30", services:["Субсидии","Поземлени имоти","Животновъдство"] },
  { id:16, category:"education", name:"РУО – Бургас", address:"ул. 'Гео Милев' 17", phone:"056 820 315", email:"rio_burgas@mon.bg", website:"https://www.ruo-burgas.com", hours:"Пон–Пет: 09:00–17:30", services:["Записване в училище","Нострификация дипломи","Детски градини"] }
];

const CAT_META = {
  municipality: { label:"Общинска",   icon:"🏛️", bg:"#eef4ff", color:"#2255aa" },
  state:        { label:"Държавна",   icon:"🏢", bg:"#e8edf2", color:"#35546E" },
  police:       { label:"МВР / КАТ",  icon:"🚔", bg:"#fff0f0", color:"#cc0000" },
  tax:          { label:"Данъци",     icon:"💰", bg:"#fffbe6", color:"#8a6200" },
  social:       { label:"Социална",   icon:"🤝", bg:"#edfff0", color:"#2a7a30" },
  employment:   { label:"Заетост",    icon:"💼", bg:"#edfff0", color:"#479438" },
  registry:     { label:"Регистри",   icon:"📋", bg:"#eef4ff", color:"#2255aa" },
  justice:      { label:"Правосъдие",icon:"⚖️", bg:"#f5f0ff", color:"#6633aa" },
  health:       { label:"Здраве",     icon:"🏥", bg:"#fff3e0", color:"#c05500" },
  environment:  { label:"Екология",  icon:"🌿", bg:"#edfff0", color:"#2a7a30" },
  agriculture:  { label:"Земеделие", icon:"🌾", bg:"#fffbe6", color:"#7a6000" },
  education:    { label:"Образование",icon:"🎓",bg:"#f5f0ff", color:"#6633aa" },
};

// ── СТЕЙТ ────────────────────────────────────────────
let activeCategory = null;
let searchQuery = '';

// ── МОДАЛ ────────────────────────────────────────────
function openModal() {
  document.getElementById('institutionsModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  if (!document.getElementById('modalFilters').hasChildNodes()) buildFilters();
  renderCards();
}

function closeModal() {
  document.getElementById('institutionsModal').classList.remove('open');
  document.body.style.overflow = '';
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('institutionsModal')) closeModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── ФИЛТРИ ───────────────────────────────────────────
function buildFilters() {
  const wrap = document.getElementById('modalFilters');

  const allBtn = document.createElement('button');
  allBtn.className = 'filter-chip active';
  allBtn.id = 'chip-all';
  allBtn.textContent = 'Всички';
  allBtn.onclick = () => setCategory(null);
  wrap.appendChild(allBtn);

  const usedCats = [...new Set(INSTITUTIONS.map(i => i.category))];
  usedCats.forEach(cat => {
    const m = CAT_META[cat];
    const btn = document.createElement('button');
    btn.className = 'filter-chip';
    btn.id = `chip-${cat}`;
    btn.textContent = `${m.icon} ${m.label}`;
    btn.onclick = () => setCategory(cat);
    wrap.appendChild(btn);
  });
}

function setCategory(cat) {
  activeCategory = cat;
  document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
  document.getElementById(cat ? `chip-${cat}` : 'chip-all').classList.add('active');
  renderCards();
}

function filterInstitutions() {
  searchQuery = document.getElementById('modalSearch').value.toLowerCase();
  renderCards();
}

function renderCards() {
  const grid = document.getElementById('modalGrid');
  const filtered = INSTITUTIONS.filter(item => {
    if (activeCategory && item.category !== activeCategory) return false;
    if (searchQuery) {
      const hay = [item.name, item.address, ...item.services].join(' ').toLowerCase();
      if (!hay.includes(searchQuery)) return false;
    }
    return true;
  });

  document.getElementById('modalCount').textContent = `Намерени: ${filtered.length} институции`;

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="modal-empty">Няма намерени институции. Опитай с друго търсене.</div>';
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const m = CAT_META[item.category];
    const tags = item.services.map(s => `<span class="tag tag-gray">${s}</span>`).join('');
    return `
    <div class="inst-card">
      <div class="inst-card-header">
        <div class="card-icon" style="background-color:${m.bg}">${m.icon}</div>
        <div>
          <div class="card-title">${item.name}</div>
          <span class="tag" style="background:${m.bg};color:${m.color};margin-top:4px;display:inline-block">${m.label}</span>
        </div>
      </div>
      <div class="inst-info">
        <div class="inst-row">📍 ${item.address}, Бургас</div>
        <div class="inst-row">🕐 ${item.hours}</div>
        <div class="inst-row"><a href="tel:${item.phone.replace(/\s/g,'')}" class="inst-link">📞 ${item.phone}</a></div>
        <div class="inst-row"><a href="mailto:${item.email}" class="inst-link">✉️ ${item.email}</a></div>
      </div>
      <div class="card-tags" style="margin-bottom:14px">${tags}</div>
      <a href="${item.website}" target="_blank" class="btn-navy" style="display:block;text-align:center;font-size:13px;padding:9px">🌐 Официален сайт</a>
    </div>`;
  }).join('');
}

// ===== АНИМАЦИЯ НА PROGRESS БРОЯЧА =====
function animateProgressCounter() {
  const counterElement = document.getElementById('progressCounter');
  const progressFill = document.getElementById('progressFill');

  if (!counterElement) {
    console.log('progressCounter не е намерен');
    return;
  }

  const target = 1200; // колко души са помогнали
  const goal = 5000;   // целта
  const percent = Math.floor((target / goal) * 100);

  let current = 0;
  const duration = 2000; // 2 секунди
  const increment = target / (duration / 16);

  function updateCounter() {
    current += increment;
    if (current < target) {
      counterElement.textContent = Math.floor(current);
      if (progressFill) {
        progressFill.style.width = (current / goal) * 100 + '%';
      }
      requestAnimationFrame(updateCounter);
    } else {
      counterElement.textContent = target;
      if (progressFill) {
        progressFill.style.width = percent + '%';
      }
    }
  }

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        updateCounter();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(counterElement);
}

// Стартирай анимацията
document.addEventListener('DOMContentLoaded', function() {
  animateProgressCounter();
});
