# blasuubeautylounge

A premium, mobile-first web application for **Blasuu Beauty Lounge** located in Madina, Accra.

Built with React, TypeScript, Vite, Tailwind CSS v4, and Supabase. Features a luxurious, modern design system using Elephant Gray, Burnt Orange, White, and Gold.

---

## 🚀 Features

### Public Facing

- **Luxury UI/UX:** Custom design system with smooth animations, responsive layouts, and native-app feel (SF Font).
- **Services & Packages:** Dynamic filtering by category.
- **Interactive Booking Flow:** Full monthly calendar, real-time slot blocking, policy consent modal, and automated WhatsApp booking confirmation.
- **Live Availability:** Visual calendar showing available, filling fast, fully booked, and holiday slots.
- **Authentic Google Reviews:** Real-time fetch of your Google Business Profile rating and top reviews.
- **Careers & Training:** Academy application flow highlighting owner-led mentorship.
- **Contact & Map:** Integrated Google Maps, WhatsApp float, and contact details.
- **Policies:** Centralized Terms, Privacy, Booking Fee, and Cancellation policies.
- **PWA Ready:** Installable on mobile devices with a service worker.

### Admin Dashboard

- **Secure Login:** Google OAuth and Email/Password.
- **Booking Management:** View, confirm, or cancel appointments.
- **Calendar Sync:** Automatically sync confirmed bookings to the owner's Google Calendar via OAuth.
- **WhatsApp Integration:** Direct chat links to customers.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4 (CSS-first configuration)
- **Routing:** React Router v7
- **Icons:** Lucide React
- **Backend & DB:** Supabase (PostgreSQL, Edge Functions, Auth)
- **Integrations:** Google Places API, Google Calendar API, WhatsApp

---

## 📦 Setup & Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd blasuu-beauty-lounge
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

---

## 🔐 Supabase Setup

### Database Tables

You need to run the following SQL in your Supabase SQL Editor to set up the schema:

**1. Appointments Table**

```sql
create type booking_status as enum ('pending', 'confirmed', 'cancelled', 'completed');

create table public.appointments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  service_id text not null,
  service_name text not null,
  appointment_date date not null,
  appointment_time time not null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  total_price numeric not null,
  deposit_amount numeric not null,
  status booking_status default 'pending'::booking_status not null
);

alter table public.appointments enable row level security;
```

**2. Owner Integrations Table (For Google Calendar Tokens)**

```sql
create table if not exists public.owner_integrations (
  id uuid default gen_random_uuid() primary key,
  provider text not null unique,
  refresh_token text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.owner_integrations enable row level security;
```

**3. RLS Policies & Functions**
_(Run the policies provided in the setup guide to allow anon inserts, public availability reads, and admin-only updates)._

---

## 🔗 Edge Functions

You need to deploy two Edge Functions in Supabase:

### 1. `save-calendar-token`

Receives the Google OAuth refresh token from the frontend and securely saves it to the `owner_integrations` table using the Service Role key.

### 2. `sync-booking-to-calendar`

Called when the owner confirms a booking. It fetches the saved refresh token, exchanges it for an access token, and creates an event on the owner's Google Calendar.

_(See the project documentation for the full code of these functions)._

---

## 🌐 Deployment (Netlify)

1. Connect your GitHub repository to Netlify.
2. Set the Build Command to: `npm run build`
3. Set the Publish directory to: `dist`
4. Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the Environment Variables in Netlify.
5. Ensure your `netlify.toml` is configured for SPA routing:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/sw.js"
  to = "/sw.js"
  status = 200
  force = false

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🎨 Design System

- **Colors:**
  - `elephant` (Dark Gray): `#2E2E2E`
  - `burnt` (Burnt Orange): `#C6511B`
  - `white-pure` (Pure White): `#FFFFFF`
  - `gold` (Accent Gold): `#D4AF37`
- **Typography:** Native San Francisco (SF) font stack for a premium app feel.
- **Icons:** Lucide React.

---

## 📄 License

This project is proprietary and built exclusively for Blasuu Beauty Lounge. All rights reserved.

````

### Push to GitHub
```bash
git add README.md
git commit -m "docs: created comprehensive README with setup and deployment instructions"
git push
````
