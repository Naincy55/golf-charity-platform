// js/supabaseClient.js

const SUPABASE_URL = "https://vuuumeffjjmqrgqqnsxq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1dXVtZWZmamptcXJncXFuc3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNjg2MTIsImV4cCI6MjA4OTY0NDYxMn0.d7BGYVXMezoWhR6b5R-c7QrT1cFcYn9PgfxUzhlYyiE";

// ✅ ONLY THIS (NO const supabase)
window.supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);