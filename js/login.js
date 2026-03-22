const params = new URLSearchParams(window.location.search);
const role = params.get("role");

console.log(role); // "user" or "admin"


async function login() {
  const supabase = window.supabaseClient;

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const params = new URLSearchParams(window.location.search);
  const role = params.get("role"); // "admin" or "user"

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  // ✅ Redirect based on role (NO localStorage)
  if (role === "admin") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "dashboard.html";
  }
}

const redirect = params.get("redirect");

// After login success
if (redirect === "addScore") {
  window.location.href = "dashboard.html#add-score";
} 
else if (redirect === "rewards") {
  window.location.href = "dashboard.html#rewards";
} 
else {
  window.location.href = "dashboard.html";
}