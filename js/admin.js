const supabase = window.supabaseClient;

/* Switch Sections */
function showSection(id) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('hidden');
  });

  document.getElementById(id).classList.remove('hidden');
}


/* Load Users */
async function loadUsers() {
  const { data, error } = await supabase.from('users').select('*');

  const list = document.getElementById('usersList');
  list.innerHTML = '';

  data.forEach(user => {
    const li = document.createElement('li');
    li.textContent = user.email + ' | Score: ' + user.score;
    list.appendChild(li);
  });
}


/* Update Score */
async function updateScore() {
  const id = document.getElementById('userId').value;
  const score = document.getElementById('newScore').value;

  await supabase
    .from('users')
    .update({ score: score })
    .eq('id', id);

  alert('Score Updated Successfully');
}


/* Add Charity */
async function addCharity() {
  const name = document.getElementById('charityName').value;

  await supabase.from('charities').insert([{ name }]);

  alert('Charity Added');
  loadCharities();
}


/* Load Charities */
async function loadCharities() {
  const { data } = await supabase.from('charities').select('*');

  const list = document.getElementById('charityList');
  list.innerHTML = '';

  data.forEach(charity => {
    const li = document.createElement('li');
    li.textContent = charity.name;
    list.appendChild(li);
  });
}


/* Run Draw */
async function runDraw() {
  const { data } = await supabase.from('users').select('*');

  const winner = data[Math.floor(Math.random() * data.length)];

  document.getElementById('winnerResult').innerText =
    'Winner: ' + winner.email;

  await supabase.from('winners').insert([
    { user_id: winner.id, verified: false }
  ]);
}


/* Verify Winner */
async function verifyWinner() {
  const id = document.getElementById('winnerId').value;

  await supabase
    .from('winners')
    .update({ verified: true })
    .eq('id', id);

  alert('Winner Verified');
}


/* Auto Load */
loadUsers();
loadCharities();
