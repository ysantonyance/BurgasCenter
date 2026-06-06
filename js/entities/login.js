function togglePassword(fieldId, btn) {
  var field = document.getElementById(fieldId);
  if (field.type === 'password') {
    field.type = 'text';
    btn.textContent = '🙈';
  } else {
    field.type = 'password';
    btn.textContent = '👁️';
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
