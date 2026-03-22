// js/dashboard.js

function getSupabase() {
  return window.supabaseClient;
}

// ✅ CHECK USER LOGIN
async function checkUser() {
  const supabase = getSupabase();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = "login.html";
  }
}

checkUser();


// ✅ ADD SCORE
async function addScore() {
  const supabase = getSupabase();

  const scoreValue = document.getElementById("score").value;

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    alert("User not logged in");
    return;
  }

  let removedOld = false;

  // 1️⃣ Get scores (oldest first)
  const { data: scores } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  // 2️⃣ Delete oldest if >= 5
  if (scores.length >= 5) {
    removedOld = true;

    await supabase
      .from("scores")
      .delete()
      .eq("id", scores[0].id);
  }

  // 3️⃣ Insert new score
  await supabase
    .from("scores")
    .insert([
      {
        user_id: user.id,
        score: parseInt(scoreValue)
      }
    ]);

  // 4️⃣ Reload UI (IMPORTANT 🔥)
  await loadScores();

  // 5️⃣ Show message
  if (removedOld) {
    alert("Oldest score removed, new score added!");
  } else {
    alert("Score added!");
  }
}


// ✅ LOAD SCORES
async function loadScores() {
  const supabase = getSupabase();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const list = document.getElementById("scoresList");

  // ✅ CLEAR OLD UI FIRST
  list.innerHTML = "";

  // ✅ RENDER FRESH DATA ONLY
  data.forEach(item => {
    const li = document.createElement("li");
    li.innerText = "🏌️ Score: " + item.score;
    list.appendChild(li);
  });
}

function goToSubscription() {
  window.location.href = "subscription.html";
}

async function checkSubscription() {
  const supabase = getSupabase();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    alert("User not logged in");
    window.location.href = "login.html";
    return;
  }

  const { data: profile, error: err } = await supabase
    .from("profiles")
    .select("subscription")
    .eq("id", data.user.id)
    .single();

  if (err) {
    console.log(err);
    return;
  }

  if (!profile || profile.subscription === "none") {
    alert("Please subscribe first!");
    window.location.href = "subscription.html";
  }
}



// jjn
// Make sure supabase is already initialized
// const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

let selected = null;
let user = null;

// 🔹 Get logged-in user
async function getUser() {
  const supabase = getSupabase();
  const { data } = await supabase.auth.getUser();
  user = data.user;
}

// 🔹 Select Charity
function selectCharity(name) {
  selected = name;

  const buttons = document.querySelectorAll('#charityList button');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.innerText === name) {
      btn.classList.add('active');
    }
  });

  document.getElementById('selectedCharity').innerText =
    "Selected: " + name;
}

// 🔹 Save to Supabase
async function saveCharity() {
  const supabase = getSupabase();
  const donation = document.getElementById("donation").value;

  if (!selected) {
    alert("Please select a charity");
    return;
  }

  if (donation < 10) {
    alert("Minimum donation is 10%");
    return;
  }

  const { error } = await supabase
    .from("user_charity")
    .upsert([
      {
        user_id: user.id,
        charity_name: selected,
        donation_percent: donation
      }
    ]);

  if (error) {
    console.error(error);
    alert("Error saving data");
  } else {
    alert("Saved successfully ✅");
  }
}

// 🔹 Load from Supabase
async function loadCharity() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("user_charity")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (data) {
    selected = data.charity_name;

    selectCharity(selected);
    document.getElementById("donation").value =
      data.donation_percent;
  }
}

// 🔹 On Page Load
window.onload = async function () {
  await getUser();
  await loadCharity();
};


