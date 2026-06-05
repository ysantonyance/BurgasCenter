async function loadInstitutions() {
  const res = await fetch('http://localhost:3000/institutions');
  const data = await res.json();

  document.getElementById('list').innerHTML =
    data.map(i => `<p>${i.name || 'No name'}</p>`).join('');
}

async function sendComplaint() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  await fetch('http://localhost:3000/complaints', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description })
  });

  alert('Complaint sent!');
}
