function togglePassword(fieldId, btn) {
  var field = document.getElementById(fieldId);
  var img = btn.querySelector('img');

  if (field.type === 'password') {
    field.type = 'text';
    img.src = 'eye.png';
    img.alt = 'скрий';
  } else {
    field.type = 'password';
    img.src = 'eye-crossed.png';
    img.alt = 'покажи';
  }
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var email = document.getElementById('email').value;
  var pass = document.getElementById('password').value;

  if (!email || !pass) {
    alert('Моля попълни всички полета!');
    return;
  }

  alert('Успешен вход! Добре дошъл');
});
