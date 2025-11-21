# ManchX - The Unofficial College Life Hub

ManchX is an exclusive, student-only social and events platform designed to bridge the gap between students and campus societies. It features a premium, 3D-enhanced UI with glassmorphism effects.

## 🚀 Features

- **Dual Login System**: Dedicated portals for Students and Society Admins.
- **Live Events & Hackathons**: Real-time updates on campus fests and coding competitions.
- **Social Feed**: LinkedIn-style feed for sharing achievements, project updates, and campus news.
- **Real-time Messenger**: Connect with Society Heads and Seniors directly.
- **Society Management**: Admin dashboard for creating events, managing members, and awarding points.
- **Student Profile**: Showcase GitHub projects, earn badges, and track XP/Level.
- **Gamification**: Earn points for attending events and engagement.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion (Animations), Lucide React (Icons)
- **State/Data**: React Query, Zod (Validation), React Hook Form
- **Backend Integration**: Supabase (Ready)

## ⚙️ Setup & Installation

1. **Install Dependencies**
   ```bash
   yarn install
   ```

2. **Environment Configuration**
   The project includes a `.env` file. Add your Supabase credentials there to enable real data persistence.
   
   *Note: If you leave the keys empty, the application runs in **Demo Mode** using in-memory mock data.*

3. **Run Development Server**
   ```bash
   yarn run dev
   ```

## 🔑 Environment Variables

To enable the real backend, update the `.env` file:

```env
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key"
```

## 🧪 Demo Credentials

**Student Login:**
- College Code: `DTU2025`
- College ID: `2K21/SE/045`
- Password: `password123`

**Society Admin Login:**
- College Code: `DTU2025`
- Admin ID: `ADMIN/CSI/001`
- Password: `password123`

## 📂 Project Structure

- `/src/components`: Reusable UI components (Buttons, Cards, 3D elements).
- `/src/pages`: Main route views (Dashboard, Events, Feed, etc.).
- `/src/lib/api.ts`: Central API service that handles data fetching (switches between Mock and Supabase).
- `/src/context`: Global state management (Auth).
