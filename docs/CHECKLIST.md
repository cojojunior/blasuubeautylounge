# ✅ Production Checklist

Before deploying a new version or going live, ensure the following are checked:

## Frontend
- [ ] All hardcoded test data (emails, names) have been removed.
- [ ] The `sw.js` (Service Worker) cache version has been bumped (e.g., `v3` to `v4`).
- [ ] Mobile responsiveness is verified on the Booking form and Admin Dashboard.
- [ ] Error states (network failure, double booking) are showing correctly.

## Backend / Supabase
- [ ] RLS policies are active on all tables.
- [ ] The `moolre-webhook` is deployed with JWT verification **disabled**.
- [ ] The `MOOLRE_WEBHOOK_SECRET` is correctly set in Supabase Secrets.
- [ ] The `admin_notes` and `payment_method` columns exist in the `appointments` table.

## Integrations
- [ ] Moolre API keys (User, Public Key, Account Number) are correct.
- [ ] Google OAuth refresh token is active (re-connect if needed).
- [ ] A live test payment via MoMo successfully updates the database and creates a calendar event.

## Deployment (Netlify/Vercel)
- [ ] Environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) are set in the hosting platform.
- [ ] `netlify.toml` redirect rules are working (SPA fallback to `index.html`).