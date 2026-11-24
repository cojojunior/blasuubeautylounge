
---

### 2. `docs/INTEGRATIONS.md`
*This documents how the 3rd party services (Moolre, Google, WhatsApp) are connected.*

```markdown
# 🔗 Third-Party Integrations

This project relies on several external services. Here is how they are integrated.

## 1. Moolre (Payments)
Moolre handles both Mobile Money (MoMo) and Bank Collections.
- **Checkout Link**: `create-moolre-link` generates a payment URL for MoMo deposits.
- **Bank Collections**: `create-bank-account` generates a permanent virtual bank account linked to the Moolre wallet. Customers transfer to this account, and Moolre sends a webhook.
- **Webhook**: `moolre-webhook` listens for `P01` success codes. It updates the Supabase database and triggers the Google Calendar sync.
- **Fees**: Moolre charges a network fee for bank collections (e.g., 1% capped at GHS 5.00).

## 2. Google Calendar & Tasks
- **OAuth**: Admin authenticates via Google OAuth. The `save-calendar-token` Edge Function stores the `refresh_token`.
- **Syncing**: When a booking is confirmed, `sync-booking-to-calendar` creates an event on the Admin's calendar.
- **Client Invites**: The event includes the client's email as an attendee, sending them an invite automatically.
- **Reminders**: The event is configured with a 1-hour popup and email reminder for both the Admin and the Client.
- **Deletion**: When an appointment is deleted, the `delete-calendar-event` function (if created) removes the event from the calendar.

## 3. WhatsApp
- We use standard `wa.me` links to generate pre-filled messages.
- Used for manual booking fallbacks and admin-customer communication.