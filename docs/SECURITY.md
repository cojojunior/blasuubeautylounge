# 🔒 Security & RLS Policies

Security is handled primarily through Supabase Row Level Security (RLS). 

## 1. Database Rules
- **`appointments`**:
  - `INSERT`: Allowed for `anon` (public booking form).
  - `SELECT`: Allowed for `authenticated` (admin dashboard) and via the `get_booking_by_ref` RPC for `anon` (to view their own booking confirmation).
  - `UPDATE/DELETE`: Only allowed for `authenticated` (admin).
- **`blocked_slots`**:
  - `SELECT`: Allowed for `anon` and `authenticated`.
  - `INSERT/DELETE`: Only allowed for `authenticated` via secure RPCs (`admin_add_block`, `admin_delete_block`) to prevent public tampering.
- **`owner_integrations`**:
  - No public access. Only `service_role` (Edge Functions) can read/write.

## 2. Sensitive Data
- **Never expose the `SERVICE_ROLE_KEY`**: This key bypasses RLS and should only be used inside Edge Functions.
- **Webhook Security**: The `moolre-webhook` verifies the `MOOLRE_WEBHOOK_SECRET` to ensure requests are genuinely from Moolre.
- **Authentication**: The Admin dashboard is protected by Supabase Auth (Email/Password + Google OAuth). Ensure public signups are disabled in Supabase Auth settings.