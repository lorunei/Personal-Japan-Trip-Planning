# Stripe setup — LORUNEI v57

## Products

- Quick Help — $49 USD
- Japan Answer — $99 USD
- Japan Research — $299 USD
- Private Japan Planning — from $999 USD, custom written quote

Launch with one public Stripe Payment Link for Quick Help. Keep the higher tiers on the inquiry → written scope → payment path until their scope and delivery timing can be standardized.

## Quick Help configuration

1. Create the real Quick Help product and one-time $49 USD Payment Link in Stripe.
2. Collect customer email in Stripe.
3. Set the post-payment redirect to the live equivalent of:
   `https://lorunei.github.io/personal-japan-trip-planning/thank-you.html?plan=quick`
4. Open `assets/js/payments.js` and paste the real URL into `STRIPE_QUICK_PAYMENT_LINK`.
5. Do not add quotation marks inside the URL and do not use a test URL in production.

When the configuration is blank, all `[data-quick-checkout]` buttons safely route to the inquiry section. When configured, they route to Stripe.

## Required test

1. Use Stripe test mode first.
2. Confirm every Quick Help button opens the same Stripe product at $49 USD.
3. Complete a test payment.
4. Confirm the success redirect opens `thank-you.html?plan=quick`.
5. Confirm “Continue to trip details” opens `intake.html?plan=quick` with Quick Help selected.
6. Submit a test intake and confirm Formspree receives it and the customer sees a LORUNEI reference number.
7. Repeat once on mobile and once in Japanese.

## Upgrade credit

If a request is clearly better suited to Japan Answer before deeper individualized work begins, the customer may keep the Quick Help scope or apply the full $49 toward Japan Answer. Collect only the $50 balance after explicit customer approval. Never upgrade or charge automatically.

## URL migration — 2026-10-07

The current live Quick Help checkout link in `assets/js/payments.js` is unchanged. The canonical website URL now uses lowercase.

The Stripe dashboard's actual post-payment redirect was not accessible or modified during the migration. Both legacy `Personal-Japan-Trip-Planning/intake.html` and `Personal-Japan-Trip-Planning/thank-you.html` paths are retained by the compatibility site and forward to the matching lowercase pages, preserving query parameters and fragments. The setup instructions above describe the intended flow, not a verified dashboard setting. See [URL-MIGRATION.md](URL-MIGRATION.md).
