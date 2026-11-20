# Blasuu Beauty Lounge 💅✨

A premium, mobile-first web application for **Blasuu Beauty Lounge** located in Madina, Accra. 

Built with React, TypeScript, Vite, Tailwind CSS v4, and Supabase. Features a luxurious, modern design system using Elephant Gray, Burnt Orange, White, and Gold.

 

## 🚀 Features

### Public Facing
- **Luxury UI/UX:** Custom design system with smooth animations, responsive layouts, and native-app feel (SF Font).
- **Services & Packages:** Dynamic filtering by category, with custom images and notes for every service (e.g., Skin Tag Consultation).
- **Multi-Service Booking:** Customers can select multiple services in one booking. The system automatically calculates the total price, duration, and the 25% booking fee.
- **Live Availability:** Visual calendar showing available, filling fast, fully booked, and holiday slots.
- **Authentic Google Reviews:** Fetches live reviews from Google Places API, combined with manual verified text reviews and author photos.
- **Moolre Payments:** Secure deposit collection via Moolre Hosted Checkout. Bookings are only marked as `confirmed` after Moolre's webhook verifies the payment.
- **Careers & Training:** Academy application flow highlighting owner-led mentorship.
- **Contact & Map:** Integrated Google Maps (free iframe), WhatsApp float, and contact details.
- **Policies:** Centralized Terms, Privacy, Booking Fee, and Cancellation policies.
- **PWA Ready:** Installable on mobile devices with a service worker and custom icons.
- **Performance:** All images converted to `.webp` format and lazy-loaded for instant page loads.

### Admin Dashboard
- **Secure Login:** Google OAuth and Email/Password.
- **Booking Management:** View, confirm, cancel, or delete appointments. Unpaid bookings show as "Awaiting Payment".
- **Calendar Sync:** Automatically sync confirmed bookings to the owner's Google Calendar via OAuth.
- **WhatsApp Integration:** Direct chat links to customers.

 

## 🛠️ Tech Stack
- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4 (CSS-first configuration)
- **Routing:** React Router v7
- **Icons:** Lucide React, React Icons
- **Backend & DB:** Supabase (PostgreSQL, Edge Functions, Auth)
- **Integrations:** Google Places API, Google Calendar API, WhatsApp, Moolre (Payments)

 

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

 

## 🔐 Supabase Setup

### Database Tables
You need to run the following SQL in your Supabase SQL Editor to set up the schema:

**1. Appointments Table**
```sql
create type booking_status as enum ('pending', 'pending_payment', 'confirmed', 'cancelled', 'completed');

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


**3. RLS Policies & Functions**
*(Run the policies provided in the setup guide to allow anon inserts, public availability reads, and admin-only updates).*


## 🔗 Edge Functions

You need to deploy these Edge Functions in Supabase:

### 1. `save-calendar-token`
Receives the Google OAuth refresh token from the frontend and securely saves it to the `owner_integrations` table using the Service Role key.

### 2. `sync-booking-to-calendar`
Called when the owner confirms a booking. It fetches the saved refresh token, exchanges it for an access token, and creates an event on the owner's Google Calendar.

### 3. `get-google-reviews`
Fetches your business rating and top 5 reviews from the Google Places API.

### 4. `create-moolre-link`
Creates a secure payment link via Moolre for the 25% deposit. Saves the booking as `pending_payment`.

### 5. `moolre-webhook`
Listens for Moolre's payment confirmation. Verifies the transaction and updates the booking status to `confirmed`.



## 🌐 Deployment (Netlify)

1. Connect your GitHub repository to Netlify.
2. Set the Build Command to: `npm run build`
3. Set the Publish directory to: `dist`
4. Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the Environment Variables in Netlify.
5. Ensure your `netlify.toml` is configured for SPA routing and caching:

toml
[build]
  command = "npm run build"
  publish = "dist"

# 1. Serve the Service Worker
[[redirects]]
  from = "/sw.js"
  to = "/sw.js"
  status = 200
  force = false

# 2. Serve assets directly
[[redirects]]
  from = "/assets/*"
  to = "/assets/:splat"
  status = 200
  force = false

# 3. Fallback for React Router
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = false



## 🎨 Design System

- **Colors:**
  - `elephant` (Dark Gray): `#2E2E2E`
  - `burnt` (Burnt Orange): `#C6511B`
  - `white-pure` (Pure White): `#FFFFFF`
  - `gold` (Accent Gold): `#D4AF37`
- **Typography:** Native San Francisco (SF) font stack for a premium app feel.
- **Icons:** Lucide React, React Icons.
- **Images:** All served in `.webp` format for optimal performance.



## 📄 License
This project is proprietary and built exclusively for Blasuu Beauty Lounge. All rights reserved.