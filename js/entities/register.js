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

  document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var password = document.getElementById('password').value;
  var confirm = document.getElementById('confirm_password').value;
  var terms = document.getElementById('terms').checked;

  if (password !== confirm) {
  alert('Паролите не съвпадат!');
  return;
}

  if (password.length < 6) {
  alert('Паролата трябва да е поне 6 символа!');
  return;
}

  if (!terms) {
  alert('Моля, съгласи се с Общите условия!');
  return;
}

  alert('Успешна регистрация! Добре дошъл в общността');
});
