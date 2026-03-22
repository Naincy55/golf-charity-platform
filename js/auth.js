// js/auth.js

// ✅ Always use this function (no redeclaration issue)
function getSupabase() {
  return window.supabaseClient;
}

//
// 🔐 SIGNUP USER
//
async function signupUser() {
  const supabase = getSupabase();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  // if email confirmation enabled
  if (!data.user) {
    alert("Signup successful! Please verify your email.");
    return;
  }

  // ✅ Insert into USERS table
  await supabase.from("users").insert({
    id: data.user.id,
    email: email
  });

  alert("User signup successful!");
  window.location.href = "dashboard.html";
}

//
// 👨‍💼 SIGNUP ADMIN
//
async function signupAdmin() {
  const supabase = getSupabase();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  if (!data.user) {
    alert("Signup successful! Please verify your email.");
    return;
  }

  // ✅ Insert into ADMINS table
  await supabase.from("admins").insert({
    id: data.user.id,
    email: email
  });

  alert("Admin signup successful!");
  window.location.href = "admin.html";
}

//
// 🔐 LOGIN USER
//
async function loginUser() {
  const supabase = getSupabase();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  message.innerText = "Logging in...";

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    if (error.message.includes("Email not confirmed")) {
      message.innerText = "⚠️ Please verify your email before logging in.";
    } else {
      message.innerText = error.message;
    }
    return;
  }

  const userId = data.user.id;

  // ✅ Check USERS table
  const { data: userData } = await supabase
    .from("users")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (!userData) {
    message.style.color = "red";
    message.innerText = "❌ This email is NOT registered as USER";
    return;
  }

  message.style.color = "green";
  message.innerText = "✅ User login successful!";

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1000);
}

//
// 👨‍💼 LOGIN ADMIN
//
async function loginAdmin() {
  const supabase = getSupabase();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  message.innerText = "Logging in...";

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    if (error.message.includes("Email not confirmed")) {
      message.innerText = "⚠️ Please verify your email before logging in.";
    } else {
      message.innerText = error.message;
    }
    return;
  }

  const userId = data.user.id;

  // ✅ Check ADMINS table
  const { data: adminData } = await supabase
    .from("admins")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (!adminData) {
    message.style.color = "red";
    message.innerText = "❌ This email is NOT registered as ADMIN";
    return;
  }

  message.style.color = "green";
  message.innerText = "✅ Admin login successful!";

  setTimeout(() => {
    window.location.href = "admin.html";
  }, 1000);
}

//
// 🚪 LOGOUT
//
async function logout() {
  const supabase = getSupabase();

  await supabase.auth.signOut();

  alert("Logged out!");
  window.location.href = "login.html";
}


