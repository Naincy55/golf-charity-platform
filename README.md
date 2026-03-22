# golf-charity-platform
Golf Charity Platform is a web application that allows users to participate in golf events, track their scores, contribute to charities, and participate in draws, while admins manage users, charities, and winnings. Built with a modern stack and Supabase as the backend database.



👤 User Panel

Users can:

Signup / Login – Secure authentication and account management.
Dashboard – Access personalized information.
Add Scores – Enter golf scores (only last 5 scores saved; new scores replace the oldest).
View Details – Track score history, charity contributions, and draw participation.

🛠 Admin Panel

Admins can:

Manage Users – View, edit, or delete user data.
Manage Charities – Add, edit, or remove charities.
Run Draw System – Select winners for events.
Verify Winners – Approve or review draw outcomes.
🗄 Database
The platform uses Supabase for database and authentication.
Stores user profiles, scores, subscriptions, charities, and draw information.
💳 Subscription System

Two plans are available:

Monthly
Yearly
Users can choose a plan and simulate payments (for demo purposes).
Subscription status is displayed on the user dashboard.
🧾 Score System
Users enter golf scores.
Only the last 5 scores are saved.
New scores replace the oldest score automatically.
❤️ Charity System
Users select a charity for contributions.
Minimum 10% donation required.
Features:
List of available charities
Selected charity displayed on the dashboard
📊 User Dashboard

The dashboard includes:


Score entry system
Charity selected
Draw participation status
Winnings (dummy for demo)
🛠 Admin Dashboard

Admin dashboard features:

View all users
Edit the user scores
Run draw system
Add and Manage Charities – Buttons are present in the UI but functionality not implemented yet.


⚡ Tech Stack
Frontend: HTML, CSS, and JavaScript – clean, responsive, and interactive UI.
Backend: Lightweight server-side logic (custom JavaScript backend).
Database & Authentication: Supabase – storing user data, scores, charities, subscriptions, and secure authentication.
Deployment: Vercel – fast and reliable hosting for the platform.
