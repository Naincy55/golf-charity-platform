function getSupabase() {
  return window.supabaseClient;
}

async function subscribe(plan) {

    // Fake Payment Simulation
    let confirmPay = confirm("Proceed to pay for " + plan + " plan?");

    if (!confirmPay) return;

    alert("Payment Successful (Demo)");

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first!");
      return;
    }

    // Update subscription in DB
    const { error } = await supabase
      .from("profiles")
      .update({ subscription: plan })
      .eq("id", user.id);

    if (error) {
      alert("Error updating subscription");
      console.log(error);
    } else {
      alert("Subscription Activated: " + plan);
      window.location.href = "dashboard.html";
    }
  }

  

async function setPlan(plan) {

  const supabase = getSupabase();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    alert("Login required");
    return;
  }

  const confirmPay = confirm("Fake payment for " + plan + "?");

  if (!confirmPay) return;

  const { error: err } = await supabase
    .from("profiles")
    .update({ subscription: plan })
    .eq("id", data.user.id);

  if (err) {
    console.log(err);
    alert("Error updating plan");
  } else {
    alert("Plan updated to " + plan);
    loadPlan(); // refresh UI
  }
}


async function loadPlan() {

  const supabase = getSupabase();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) return;

  const { data: profile, error: err } = await supabase
    .from("profiles")
    .select("subscription")
    .eq("id", data.user.id)
    .single();

  if (err) {
    console.log(err);
    return;
  }

  document.getElementById("plan").innerText =
    "Current Plan: " + (profile?.subscription || "none");
}
