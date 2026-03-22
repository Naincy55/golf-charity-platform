// admin.js
// Use the global supabase created in supabaseClient.js
// DO NOT redeclare supabase
function getSupabase() {
  return window.supabaseClient;
}

// ----------------- CHECK ADMIN -----------------
async function checkAdmin() {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error(error);
    alert("Error checking session");
    window.location.href = "/login.html";
    return;
  }

  const user = data.session?.user;

  if (!user) {
    alert("Login first");
    window.location.href = "/login.html";
    return;
  }

  const { data: adminData, error: adminError } = await supabase
    .from("admins")
    .select("*")
    .eq("id", user.id)
    .single();

  if (adminError || !adminData) {
    alert("Access Denied: Not an Admin");
    window.location.href = "/dashboard.html";
    return;
  }

  console.log("Welcome Admin:", user.email);
}

// ----------------- SECTION SWITCH -----------------
function showSection(id) {
  document.querySelectorAll('.main > div').forEach(div => div.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// ----------------- LOAD USERS -----------------
async function loadUsers() {
  const supabase = getSupabase();
  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    console.error(error);
    alert("Error loading users");
    return;
  }

  const list = document.getElementById('usersList');
  list.innerHTML = '';

  data.forEach(user => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${user.email} | Score: ${user.score || 0}
      <button onclick="fillUser('${user.id}')">Edit</button>
    `;
    list.appendChild(li);
  });
}

// ----------------- FILL USER ID -----------------
function fillUser(id) {
  document.getElementById('userId').value = id;
  showSection('scoreSection');
}

// ----------------- UPDATE SCORE -----------------
async function updateScore() {
  const supabase = getSupabase();
  const id = document.getElementById('userId').value;
  const score = document.getElementById('newScore').value;

  if (!id || !score) {
    alert("Enter User ID and Score");
    return;
  }

  const { error } = await supabase
    .from('users')
    .update({ score: Number(score) })
    .eq('id', id);

  if (error) {
    console.error(error);
    alert("Error updating score");
    return;
  }

  alert("Score updated!");
  loadUsers(); // refresh list
}



// ----------------- ADD CHARITY -----------------
async function addCharity() {
  const supabase = getSupabase();

  // Get input element
  const nameInput = document.getElementById('users-charity');
  if (!nameInput) {
    console.error('Input element not found!');
    return;
  }

  const charityName = nameInput.value.trim();
  if (!charityName) {
    alert("Enter charity name");
    return;
  }

  // Insert into the correct table and column
  const { error } = await supabase
    .from('user_charity') // your table name
    .insert([{ charity_name: charityName }]); // your exact column name

  if (error) {
    console.error(error);
    alert("Error adding charity");
    return;
  }

  alert("Charity added!");
  nameInput.value = ''; // Clear input after adding
  loadCharities(); // Refresh the list
}

// ----------------- LOAD CHARITIES -----------------
async function loadCharities() {
  const supabase = getSupabase();

  // Select from correct table and column
  const { data, error } = await supabase
    .from('user_charity') // your table name
    .select('*');

  if (error) {
    console.error(error);
    return;
  }

  const list = document.getElementById('charityList');
  if (!list) {
    console.error('Charity list element not found!');
    return;
  }

  // Clear existing list
  list.innerHTML = '';

  // Populate list
  data.forEach(c => {
    const li = document.createElement('li');
    li.textContent = c.charity_name; // your exact column name
    list.appendChild(li);
  });
}

// ----------------- RUN DRAW -----------------
async function runDraw() {
  const supabase = getSupabase();
  const { data, error } = await supabase.from('users').select('*');

  if (error || !data.length) {
    alert("No users found");
    return;
  }

  const winner = data[Math.floor(Math.random() * data.length)];

  document.getElementById('winnerResult').innerText = "Winner: " + winner.email;

  await supabase.from('winners').insert([{ user_id: winner.id }]);
}

// ----------------- VERIFY WINNER -----------------
async function verifyWinner() {
  const supabase = getSupabase();
  const id = document.getElementById('winnerId').value;
  if (!id) {
    alert("Enter winner ID");
    return;
  }

  const { error } = await supabase
    .from('winners')
    .update({ verified: true })
    .eq('id', Number(id));

  if (error) {
    console.error(error);
    alert("Error verifying winner");
    return;
  }

  alert("Winner verified!");
}

// ----------------- INITIAL LOAD -----------------
window.addEventListener("DOMContentLoaded", async () => {
  await checkAdmin();
  loadUsers();
  loadCharities();
});