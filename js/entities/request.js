var selectedUrgency = 'high';

document.getElementById('reqDesc').addEventListener('input', function() {
  var len = this.value.length;
  document.getElementById('charCount').textContent = len;
  if (len > 1000) this.value = this.value.substring(0, 1000);
});

function selectUrgency(level) {
  selectedUrgency = level;
  document.querySelectorAll('.urgency-btn').forEach(function(b) { b.classList.remove('selected'); });
  document.getElementById('urg-' + level).classList.add('selected');
}

function previewPhoto(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('photoPreview').src = e.target.result;
      document.getElementById('photoPreview').style.display = 'block';
      document.getElementById('photoPlaceholder').style.display = 'none';
      document.getElementById('photoInfo').style.display = 'flex';
      document.getElementById('photoName').textContent = input.files[0].name;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function removePhoto() {
  document.getElementById('photoInput').value = '';
  document.getElementById('photoPreview').style.display = 'none';
  document.getElementById('photoPlaceholder').style.display = 'block';
  document.getElementById('photoInfo').style.display = 'none';
}

function toggleSolver(checkbox) {
  var card = checkbox.closest('.solver-card');
  if (checkbox.checked) {
    card.classList.add('selected');
  } else {
    card.classList.remove('selected');
  }
  document.getElementById('solverWarning').style.display = 'none';
}

var typeHints = {
  food: 'Ще търсим доброволци, хранителни банки и НПО в района ти.',
  medical: 'Ще свържем с лекари доброволци и здравни институции.',
  repair: 'Ще намерим майстори и доброволци готови да помогнат.',
  edu: 'Ще намерим доброволци учители и образователни организации.',
  transport: 'Ще намерим доброволци с автомобили в района.',
  legal: 'Ще те свържем с правни клиники и адвокати доброволци.',
  social: 'Ще уведомим социалните служби и НПО в твоя район.',
  other: 'Ще разгледаме обращението и ще намерим подходящо решение.'
};

function updateTypeHint() {
  var val = document.getElementById('reqType').value;
  var hint = document.getElementById('typeHint');
  hint.textContent = typeHints[val] || '';
}

document.getElementById('requestForm').addEventListener('submit', function(e) {
  e.preventDefault();

  var name = document.getElementById('reqName').value.trim();
  var phone = document.getElementById('reqPhone').value.trim();
  var email = document.getElementById('reqEmail').value.trim();
  var city = document.getElementById('reqCity').value;
  var type = document.getElementById('reqType').value;
  var desc = document.getElementById('reqDesc').value.trim();
  var agree = document.getElementById('agreeReq').checked;

  var checkedSolvers = document.querySelectorAll('input[name="solver"]:checked');

  if (!name || !phone || !email || !city || !type || !desc) {
    alert('Моля попълни всички задължителни полета!');
    return;
  }

  if (checkedSolvers.length === 0) {
    document.getElementById('solverWarning').style.display = 'block';
    document.getElementById('solverWarning').scrollIntoView({ behavior: 'smooth' });
    return;
  }

  if (!agree) {
    alert('Трябва да се съгласиш с Общите условия!');
    return;
  }

  var overlay = document.getElementById('successOverlay');
  overlay.style.display = 'flex';
});

function hideSuccess() {
  document.getElementById('successOverlay').style.display = 'none';
  document.getElementById('requestForm').reset();
  document.querySelectorAll('.solver-card').forEach(function(c) { c.classList.remove('selected'); });
  document.getElementById('charCount').textContent = '0';
  selectedUrgency = 'high';
  document.getElementById('urg-high').classList.add('selected');
  removePhoto();
}
